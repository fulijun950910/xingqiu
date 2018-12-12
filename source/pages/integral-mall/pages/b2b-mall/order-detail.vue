<template>
    <div class="b2b-mall-order-detail" v-title="'采购单详情'">
        <div class="order-state">
            <div v-if="orderData.status == 5" class="order-state5" layout="column" layout-align="center start">
                <div class="color-white fs32">已确认收货, 订单完成</div>
            </div>
            <div v-else-if="orderData.status == 0" class="order-state0" layout="column" layout-align="center start">
                <div class="color-white fs28">等待买家付款</div>
                <div class="color-white">剩<m-timer :datetime="orderData.orderTime"/>自动关闭</div>
            </div>
            <div v-else-if="orderData.status == 1" class="order-state1" layout="column" layout-align="center start">
                <div class="color-white fs32">等待供应商发货</div>
            </div>
            <div v-else-if="orderData.status == 6" class="order-state6" layout="column" layout-align="center start">
                <div class="color-white fs32">已发货, 待签收</div>
            </div>
            <div v-else class="order-state-style" layout="column" layout-align="center start">
                <div class="color-white fs32">{{orderData.status | orderStatus}}</div>
            </div>
        </div>
        <!--物流信息-->
        <div class="card-style first-card cell-box">
            <div v-if="express.data && (orderData.status == 5||orderData.status == 6)" @click="goLogistics" class="cell border-bottom p-l-5" layout="row">
                <div flex class="m-r-3">
                    <div class="color-primary fs28">{{express.data[0].context}}</div>
                    <div class="extra-light-black fs24 m-t-1">{{express.data[0].time}}</div>
                </div>
                <div >
                    <m-icon xlink='#icon-zuojiantou'></m-icon>
                </div>
            </div>
            <div class="cell p-l-5">
                <div layout="row" layout-align="start center" class="m-b-1">
                    <div>{{orderData.userName}}</div>&nbsp;&nbsp;
                    <div>{{orderData.userPhone}}</div>
                </div>
                <div layout="row" layout-align="start center" class="">
                    <div>{{orderData.deliveryAddress}}</div>
                </div>
            </div>
        </div>
        <!--订单详情-->
        <div class="order-info m-t-3 card-style cell-box">
            <div class="p-t-5 p-b-3 border-bottom" layout="row">
                <div class="fwb fs28" flex>{{orderData.merchantName}}</div>
                <!--<div class="color-primary"><m-icon class="" xlink="#icon-kefuicon"></m-icon>&nbsp;在线沟通</div>-->
            </div>
            <div v-for="mall in orderData.supplierOrderItemList" :key="mall.id" class="cell border-bottom" layout="row">
                <img class="product-img m-r-2" :src="mall.goodsImage | mSrc2(require('assets/imgs/nullimg.jpg'))" alt="">
                <div layout="row" flex>
                    <div layout="column" flex="75">
                        <div flex>{{mall.goodsName}}</div>
                        <!--<div class="fs24 extra-black">规格 大型60cm</div>-->
                    </div>
                    <div flex class="text-right extra-black">
                        <div>*{{mall.quantity}}</div>
                        <div>￥{{mall.price | fen2yuan}}</div>
                    </div>
                </div>
            </div>
            <div class="p-t-2 p-b-2 extra-black border-bottom">
                <div class="p-t-1 p-b-1" layout="row">
                    <div class="" flex>商品总价</div>
                    <div >￥{{orderData.totalAmount | fen2yuan}}</div>
                </div>
                <div v-if="orderData.freight>=0" class="p-t-1 p-b-1" layout="row">
                    <div class="extra-black" flex>运费</div>
                    <div >+ ￥{{orderData.freight | fen2yuan}}</div>
                </div>
            </div>
            <div class="cell" layout="row">
                <div class="extra-black" flex>
                    <span v-if="orderData.status==0||orderData.status==2||orderData.status==3||orderData.status==4">实际需支付</span>
                    <span v-else>实际支付</span>
                </div>
                <div class="color-price fwb">￥{{orderData.needPayAmount | fen2yuan}}</div>
            </div>
        </div>
        <!--订单信息-->
        <div class="order-info m-t-3 card-style cell-box">
            <div class="p-t-5 p-b-3 border-bottom" layout="row">
                <div class="fwb fs28" flex>订单信息</div>
            </div>
            <div class="p-t-2 p-b-2 extra-black fs24">
                <div class="p-t-1 p-b-1" layout="row">
                    <div flex="30">订单编号</div>
                    <div >
                        <span>{{orderData.orderNo}}</span>
                        &emsp;
                        <span @click="copyUrl(orderData.orderNo)" class="color-primary">复制</span>
                    </div>
                </div>
                <div class="p-t-1 p-b-1" layout="row">
                    <div flex="30">付款时间</div>
                    <div v-if="orderData.supplierOrderPayList && orderData.supplierOrderPayList[0]">
                        {{orderData.supplierOrderPayList[0].payTime}}
                    </div>
                </div>
                <div v-if="orderData.invoiceTitle" class="p-t-1 p-b-1" layout="row">
                    <div flex="30">发&emsp;&emsp;票</div>
                    <div >{{orderData.invoiceTitle}}</div>
                </div>
            </div>
        </div>

        <!--猜你喜欢-->
        <div v-if="false" class="guess-like-box p-l-3 p-r-3">
            <div class="color-primary text-center cell">— 你可能喜欢 —</div>
            <div flex-wrap="wrap" layout="row" layout-align="space-between center">
                <div class="like-item">
                    <div class="img"><img class="" :src="null | mSrc2(require('assets/imgs/nullimg.jpg'))" alt=""></div>
                    <div layout="column" class="p-t-2 p-b-2 p-r-2 p-l-2">
                        <div flex>
                            <div>宫廷中药美颜圣品</div>
                            <div class="extra-black fs24">同仁堂七子美白保湿面膜粉150g</div>
                        </div>
                        <div class="color-price text-right fs24">￥790.00</div>
                    </div>
                </div>
                <div class="like-item">123</div>
                <div class="like-item">123</div>
            </div>
        </div>
        <!--状态按钮盒子-->
        <div class="btn-box-padding"></div>
        <div layout="row" layout-align="start center" class="btn-box cell-box">
            <div flex></div>
            <div v-if="orderData.status == 0" layout="row" layout-align="start center">
                <button @click="cancelOrder" class="order-btn btn-default">取消订单</button>
                <button @click="payOrder" class="order-btn btn-primary">付款</button>
            </div>
            <div v-else-if="orderData.status == 1" layout="row" layout-align="start center">
                <button @click="refundOrder" class="order-btn btn-primary">退款</button>
            </div>
            <div v-else-if="orderData.status == 6" layout="row" layout-align="start center">
                <button @click="subOrder" class="order-btn btn-primary">确认收货</button>
            </div>
            <div v-else-if="orderData.status == 5" layout="row" layout-align="start center">
                <button @click="goIndex" class="order-btn btn-default">返回商城</button>
                <button @click="goOrder" class="order-btn btn-primary">再来一单</button>
            </div>
            <div v-else layout="row" layout-align="start center">
                <button @click="goIndex" class="order-btn btn-default">返回商城</button>
            </div>
        </div>
    </div>
</template>

<script>
import api_b2bmall from 'services/api.b2bmall';
import apiGetJSSignature from 'services/api.getJSSignature';
import mTimer from 'components/m-timer';
export default {
    name: 'order-detail',
    props: ['id'],
    data() {
        return {
            orderData: {},
            express: {}
        };
    },
    components: {
        mTimer
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.queryData();
        },
        async queryData() {
            this.$indicator.open();
            let res = await api_b2bmall.querySupplierOrderDetail(this.id);
            this.$indicator.close();
            this.orderData = res.data;
            this.orderData.orderTime = this.$moment(this.orderData.orderTime).add(30, 'm').format('YYYY-MM-DD HH:mm:ss');
            console.log(this.orderData.orderTime);
            this.queryExpress();
        },
        async queryExpress() {
            let queryData = {
                expressCode: this.orderData.logisticsCampanyCode,
                expressNo: this.orderData.logisticsNo
            };
            this.$indicator.open();
            let res = await api_b2bmall.queryExpress(queryData);
            this.$indicator.close();
            this.express = JSON.parse(res.data);
        },
        goIndex() {
            this.$router.push({
                name: 'b2b-mall-index'
            });
        },
        goOrder() {
            this.$router.push({
                name: 'b2b-mall-order',
                params: {
                    id: this.orderData.supplierOrderItemList[0].goodsId
                }
            });
        },
        goLogistics() {
            this.$router.push({
                name: 'logistics-list',
                params: {
                    orderId: this.orderData.logisticsNo,
                    campanyCode: this.orderData.logisticsCampanyCode
                }
            });
        },
        async subOrder() {
            this.$messageBox.confirm('确认收货？').then(async action => {
                this.$indicator.open();
                await api_b2bmall.subOrder(this.orderData.id);
                this.$indicator.close();
                this.queryData();
            });
        },
        async refundOrder() {
            this.$messageBox.confirm('确认退款？').then(async action => {
                this.$indicator.open();
                await api_b2bmall.refundOrder(this.orderData.id);
                this.$indicator.close();
                this.queryData();
            });
        },
        async cancelOrder() {
            this.$messageBox.confirm('确认取消订单？').then(async action => {
                this.$indicator.open();
                await api_b2bmall.cancelOrder(this.orderData.id);
                this.$indicator.close();
                this.queryData();
            });
        },
        async payOrder() {
            this.$indicator.open();
            let res = await api_b2bmall.cancelOrder(this.orderData.id);
            this.$indicator.close();
            this.wxPay(res.data.supplierOrderWxPay);
        },
        wxPay(data) {
            var _this = this;
            apiGetJSSignature.wxPay({
                appId: data.appId,
                signType: data.signType,
                paySign: data.paySign,
                timeStamp: data.timeStamp + '',
                nonceStr: data.nonceStr,
                package: data.packageStr,
                success(resp) {
                    _this.queryData();
                },
                error(err) {
                    if (err.result != 'cancel') {
                        _this.$toast('支付失败，请检查网络连接');
                    }
                }
            });
        },
        copyUrl(text) {
            const input = document.createElement('input');
            input.setAttribute('readonly', 'readonly');
            input.setAttribute('value', text);
            document.body.appendChild(input);
            input.select();
            if (document.execCommand('copy')) {
                document.execCommand('copy');
                this.$toast('复制成功');
            }
            document.body.removeChild(input);
        }
    },
    filters: {
        orderStatus(value) {
            let text = '';
            switch (value) {
                case 0:
                    text = '待付款';
                    break;
                case 1:
                    text = '待发货';
                    break;
                case 2:
                    text = '支付失败';
                    break;
                case 3:
                    text = '支付超时';
                    break;
                case 4:
                    text = '已取消';
                    break;
                case 5:
                    text = '已完成';
                    break;
                case 6:
                    text = '待收货';
                    break;
                case 7:
                    text = '退款';
                    break;
            }
            return text;
        }
    }
};
</script>

<style scoped lang='less'>
@import '~styles/_agile';
.b2b-mall-order-detail{
    font-size: 13px;
    min-height: 100vh;
    background: @bg-gray;
    .order-state{
        background: #200746;
        height: 100px;
        box-sizing: border-box;
    }
    .order-state-style {
        padding: 0 12px 12px;
        width: 100%;
        height: 100%;
        background-size: 100% 100%;
    }
    .order-state5{
        background:url('~assets/imgs/b2b-mall/2018121101.png') no-repeat;
        .order-state-style;
    }
    .order-state6{
        background:url('~assets/imgs/b2b-mall/2018121204.png') no-repeat;
        .order-state-style;
    }
    .order-state0{
        background:url('~assets/imgs/b2b-mall/2018121103.png') no-repeat;
        .order-state-style;
    }
    .order-state1{
        background:url('~assets/imgs/b2b-mall/2018121102.png') no-repeat;
        .order-state-style;
    }
    .card-style {
        box-shadow:0px 4px 17px 0px rgba(75,110,150,0.11);
        border-radius:2px;
        margin-left: 5px;
        margin-right: 5px;
        background:@white;
    }
    .first-card{
        margin-top: -12px;
    }
    .color-5E9CFF {
        color:#5E9CFF
    }
    .color-price {
        color: #D92199;
    }
    .order-info{
        .product-img{
            width:60px;
            height: 60px;
            border-radius: 4px;
        }
    }
    .btn-box-padding{
        height: 60px;
    }
    .btn-box{
        position:fixed;
        width: 100%;
        height: 50px;
        bottom:0;
        left:0;
        background: @white;
        box-shadow:0px -3px 6px 0px rgba(49,77,83,0.14);
        .order-btn{
            width:90px;
            height:34px;
            border: 1px solid @border-gay;
            border-radius: 4px;
            margin-left: 12px;
            background: transparent;
        }
        .btn-default{
            color: @extra-light-black;
            border-color: @extra-light-black
        }
        .btn-primary {
            color: @color-primary;
            border-color: @color-primary;
        }
    }
    .guess-like-box{
        margin-top: 35px;
    }
    .like-item{
        width: 160px;
        height: 250px;
        border-radius:2px;
        box-shadow:0px 4px 17px 0px rgba(75,110,150,0.11);
        margin: 6px;
        background: #fff;
        .img{
            width:160px;
            height:160px;
        }
    }
}
</style>
