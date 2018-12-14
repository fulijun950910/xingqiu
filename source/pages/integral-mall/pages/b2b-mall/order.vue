<template>
    <div class="b2b-mall-order" v-title="'填写采购订单'">
        <!--地址-->
        <div @click="goSelectAddress" class="address-box cell-box p-t-5 p-b-5" layout="row" layout-align="start center" >
            <div flex v-if="address && address.contactPersion">
                <div layout="row" layout-align="start center" class="color-black fwb fs32 m-b-1">
                    <div>{{address.contactPersion}}</div>&nbsp;&nbsp;
                    <div>{{address.contactMobile}}</div>
                </div>
                <div layout="row" layout-align="start center" class="fs26 extra-light-black">
                    <div>{{address.province}}&nbsp;{{address.city}}&nbsp;{{address.fullAddress}}</div>
                </div>
            </div>
            <div class="color-gray" flex v-else >
                请选择收货地址
            </div>
            <m-icon class="fs40 color-gray" link="icon-zuojiantou"></m-icon>
        </div>
        <!--商品信息-->
        <div class="product-info bg-white m-t-3 cell-box cell">
            <div class="m-b-3" layout="row">
                <div class="extra-black" flex>{{orderData.merchantName}}</div>
                <div class="color-primary"><m-icon class="" link="icon-xiangqing"></m-icon>&nbsp;在线沟通</div>
            </div>
            <div layout="row" class="bg-default br2 cell p-l-2 p-r-2">
                <img class="product-img m-r-3" :src="orderData.image | mSrc2(require('assets/imgs/nullimg.jpg'))" alt="">
                <div flex layout="column">
                    <div flex>
                        <div>{{orderData.name}}</div>
                        <!--<div class="fs24 extra-black">规格 大型60cm</div>-->
                    </div>
                    <div class="color-price">￥{{orderData.price | fen2yuan}}</div>
                </div>
            </div>
            <div class="m-t-3" layout="row" layout-align="start center">
                <div flex>购买数量</div>
                <div><integralInput @numOut="quantityChange" @changeAmount="quantityChange"></integralInput></div>
            </div>
        </div>
        <!--支付方式-->
        <!--<div class="pay-box bg-white cell cell-box m-t-3">-->
            <!--<div layout="row" layout-align="start start">-->
                <!--<div flex>-->
                    <!--<div>美豆豆数量</div>-->
                    <!--<div class="fs24">共1000美豆豆 , 抵¥20 <m-icon class="extra-black" link="icon-xiangqing"></m-icon></div>-->
                <!--</div>-->
                <!--<mt-switch ></mt-switch>-->
            <!--</div>-->
            <!--<div class="cell cell-box bg-default br1 m-t-3 m-b-4">-->
                <!--使用<input class="doudou-box" type="text">美豆豆 ,<span class="color-price">抵¥10 </span>-->
            <!--</div>-->
            <!--<div class="p-t-3 border-top" layout="row">-->
                <!--<div flex>优惠券</div>-->
                <!--<div>¥200短信包抵用券 <m-icon class="" link="icon-gengduoicon"></m-icon></div>-->
            <!--</div>-->
        <!--</div>-->
        <!--支付详情-->
        <div class="pay-info m-t-3 bg-white cell cell-box">
            <div class="p-t-2 p-b-2" layout="row">
                <div class="extra-black" flex>商品总价</div>
                <div >￥{{totalAmount | fen2yuan}}</div>
            </div>
            <div v-if="freight && freight >= 0" class="p-t-2 p-b-2" layout="row">
                <div class="extra-black" flex>运费</div>
                <div >￥{{freight|fen2yuan}}</div>
            </div>
        </div>
        <!--发票-->
        <div @click="goSelectInvoice" class="m-t-3 bg-white cell cell-box" layout="row" layout-align="start center">
            <div flex>发票</div>
            <div v-if="invoice.rise">{{invoice.rise}}</div>
            <div class="extra-light-black" v-else>请选择发票</div>
            <m-icon class="fs36 color-gray" link="icon-zuojiantou"></m-icon>

        </div>
        <!--支付按钮-->
        <div class="pay-box-padding"></div>
        <div layout="row" layout-align="start center" class="pan-btn-box">
            <div class="cell cell-box" flex>
               <span>需支付</span>&nbsp;<span class="color-price fs40 fwb">¥{{payAmount | fen2yuan}}</span>
            </div>
            <div @click="subOrder" class="pay-btn" layout="row" layout-align="center center">提交订单</div>
        </div>
    </div>
</template>

<script>
import integralInput from 'components/integral-mall/integral-input';
import apiGetJSSignature from 'services/api.getJSSignature';
import api_b2bmall from 'services/api.b2bmall';
import api_party from 'services/api.party';

import Vue from 'vue';
import { Switch } from 'mint-ui';
Vue.component(Switch.name, Switch);

export default {
    name: 'order',
    props: ['id'],
    data() {
        return {
            address: {},
            invoice: {},
            quantity: 1,
            freight: 0, // todo 上线前写死
            orderData: {}
        };
    },
    computed: {
        // 商品总价
        totalAmount() {
            return this.orderData.price * this.quantity;
        },
        // 最终支付金额
        payAmount() {
            return this.totalAmount + this.freight;
        }
    },
    components: {
        integralInput
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.query();
            this.loadAddress();
            this.loadInvoice();
            if (this.$store.state.b2bMallData.orderData) {
                this.invoiceFlag = this.$store.state.b2bMallData.orderData.invoiceFlag;
            }
        },
        quantityChange(num) {
            this.quantity = num;
        },
        async query() {
            let res = await api_b2bmall.getSupplierGoods(this.id);
            this.orderData = res.data;
        },
        async loadAddress() {
            if (this.$store.state.integralMallActAddress) {
                this.address = this.$store.state.integralMallActAddress;
            } else {
                let { data } = await api_party.getDefaultAddress(this.$store.state.party.partyId, this.$store.state.party.id);
                this.address = data || {};
            }
        },
        async loadInvoice() {
            if (this.$store.state.b2bMallInvoice) {
                this.invoice = this.$store.state.b2bMallInvoice;
            }
        },
        async subOrder() {
            let data = {
                merchantId: this.orderData.merchantId,
                userId: this.$store.state.party.id,
                deliveryAddressId: this.address.id,
                // openId: this.$store.state.user.openId,
                openId: 'ooIeqs8kgOzo0YrzHnsM5UGedrAQ', // todo
                totalAmount: this.totalAmount,
                freight: this.freight,
                supplierOrderItemList: [
                    {
                        goodsId: this.id,
                        quantity: this.quantity
                    }
                ],
                supplierOrderPayList: [
                    {
                        payType: 1, // 支付类型1：微信支付
                        payAmount: this.payAmount
                    }
                ]
            };
            if (this.invoiceFlag && this.invoice.id) {
                data.invoiceId = this.invoice.id;
                data.invoiceTitle = this.invoice.rise;
                data.taxpayerNumber = this.invoice.taxpayerNumber;
            }
            this.$indicator.open();
            let res = await api_b2bmall.supplierOrder(data);
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
                    _this.goSuccess(data.orderId);
                },
                error(err) {
                    if (err.result != 'cancel') {
                        _this.$toast('支付失败，请检查网络连接');
                    }
                }
            });
        },
        goSuccess(id) {
            this.$router.push(`/b2b-mall-order-detail/${id}`);
        },
        goSelectAddress() {
            this.$router.push('/address-list/select');
        },
        goSelectInvoice() {
            this.$store.state.b2bMallData.orderData = {
                invoiceFlag: this.invoiceFlag
            };
            this.$router.push('/b2b-mall-invoice-list');
        }
    }
};
</script>

<style lang='less'>
@import '~styles/_agile';
.b2b-mall-order{
    font-size: 13px;
    min-height: 100vh;
    background: @bg-gray;
    .mint-switch-input:checked + .mint-switch-core{
        border-color: @color-primary;
        background: @color-primary;
        &::after{
            transform: translateX(26px);
        }
    }
    .mint-switch-core{
        width:50px;
        height:24px;
        &::after{
            width:22px;
            height:22px;
            border-radius:50%;
        }
        &::before{
            width:48px;
            height:22px;
        }
    }

    .address-box{
        background: #fff url("~assets/imgs/b2b-mall/2018120602.png") repeat-x bottom;
        background-size: auto 3px;
    }
    .color-price {
        color: #D92199;
    }
    .product-info{
        .product-img{
            width:60px;
            height: 60px;
            border-radius: 4px;
        }
    }
    .doudou-box{
        width: 65px;
        height:24px;
        border-radius: 2px;
        border: 1px solid @border-gay;
        background: @white;
        margin: 0 8px;
        padding: 0 4px;
    }
    .pay-box-padding{
        height: 60px;
    }
    .pan-btn-box{
        position:fixed;
        width: 100%;
        height: 50px;
        bottom:0;
        left:0;
        background: @white;
        box-shadow:0px -3px 6px 0px rgba(49,77,83,0.14);
        .pay-btn{
            background: @color-primary;
            font-size: 16px;
            color: @white;
            height:100%;
            width: 155px;
        }
    }
}
</style>
