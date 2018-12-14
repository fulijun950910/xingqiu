<template>
<div class="order-detail extra-light-gray" v-title="'订单详情'">
    <div class="p-l-3 p-r-3 p-t-4 p-b-4 bg-extra-light-gray border-bottom" v-if="order.tradeDelivery">
        <div flex class="m-b-2 fs24" layout="row" layout-align="start center">
            <div flex="20"><m-icon link="icon-wodedizhi" class="fs34 color-pink m-r-1"></m-icon>地址:</div>
            <div>
            {{order.tradeDelivery.fullAddress}}

            </div>
        </div>
        <div flex class="fs24" layout="row" layout-align="start center">
            <div flex="20"><m-icon link="icon-xingming" class="fs34 color-pink m-r-1"></m-icon>联系人:</div>
            <div>
             {{order.tradeDelivery.contactPersion}}

            </div>
        </div>
    </div>
    <div class="p-l-3 p-r-3">
        <div class="fs34 p-t-3 p-b-3" layout="row" layout-align="start center">
            <div>{{order.itemName}}<span class="fs24">&nbsp;*&nbsp;{{order.quantity}}</span> </div></div>
        <div v-if="tradeGoodsGroupList.length">
            <div flex class="p-t-2 p-b-2 border-bottom extra-light-black fs24" v-for="(item, index) in tradeGoodsGroupList" :key="index" layout="row" layout-align="start center">
                <div flex="70">{{item.name}}</div>
                <div flex="30" v-if="item.time">{{item.time}} *&nbsp;{{item.quantity}}</div>
            </div>
        </div>
    </div>
    <div class="crack flex m-t-2 m-b-2"></div>
    <div class="p-l-3 p-r-3">
        <div class="title p-b-3 fs28 m-b-3">
            <m-icon link="icon-danju" class="fs34 m-r-1"></m-icon>订单信息详情
        </div>
        <div flex>
            <div layout="row" class="p-t-1 p-b-1 fs24" layout-align="start center">
                <div flex="20" class="color-black">订单编号:</div>
                <div class="extra-light-black" flex>{{order.tradeNo}}</div>
            </div>
                        <div layout="row" class="p-t-1 p-b-1 fs24" layout-align="start center">
                <div flex="20" class="color-black">订单状态:</div>
                <div class="extra-light-black color-pink" flex>{{order.status | payStatus}}</div>
            </div>
                        <div layout="row" class="p-t-1 p-b-1 fs24" layout-align="start center">
                <div flex="20" class="color-black">合同单号:</div>
                <div class="extra-light-black" flex>{{order.odooOrderNo}}</div>
            </div>
            <div layout="row" class="p-t-1 p-b-1 fs24" layout-align="start center">
                <div flex="20" class="color-black">创建时间:</div>
                <div class="extra-light-black" flex>{{order.createdTime}}</div>
            </div>
                        <div layout="row" class="p-t-1 p-b-1 fs24" layout-align="start center">
                <div flex="20" class="color-black">创建人:</div>
                <div class="extra-light-black" flex>{{order.nickName}}</div>
            </div>
        </div>
    </div>
        <div class="crack flex m-t-3 m-b-3"></div>
        <div class="p-l-3 p-r-3">
                    <div class="title p-b-3 fs28 m-b-3">
                        <m-icon link="icon-zhifu1" class="fs34 m-r-1"></m-icon>
            支付信息
        </div>
            <div flex>
                <div layout="row" class="p-t-1 p-b-1 fs24" layout-align="start center">
                <div flex="20" class="color-black">支付金额：</div>
                <div class="extra-light-black" flex>￥{{order.payMoney | fen2yuan}}</div>
            </div>
                            <div layout="row" class="p-t-1 p-b-1 fs24" layout-align="start center">
                <div flex="20" class="color-black">豆豆支付：</div>
                <div class="extra-light-black" flex>{{order.payDoudouAmount}}个</div>
            </div>
                                        <div layout="row" class="p-t-1 p-b-1 fs24" layout-align="start center">
                <div flex="20" class="color-black">优惠券：</div>
                <div class="extra-light-black" flex>￥{{order.couponMoney | fen2yuan}}</div>
            </div>
            </div>
        </div>
        <div class="crack flex m-t-3 m-b-3"></div>
                <div class="p-l-3 p-r-3">
                    <div class="title p-b-3 fs28 m-b-3">
                        <m-icon link="icon-beizhu" class="fs34 m-r-1"></m-icon>
            其他信息
        </div>
            <div flex>
                <div layout="row" class="p-t-1 p-b-1 fs24" layout-align="start center">
                <div flex="20" class="color-black">订单备注：</div>
                <div class="extra-light-black" flex>{{order.remark ? order.remark : '无'}}</div>
            </div>
            </div>
        </div>
        <div class="back-btn m-t-4 p-b-4" layout="row" layout-align="center center">
         <div @click="pay" class="bottom-btn steel-gray fs28 m-r-4" v-if="order.status == '0'" layout="row" layout-align="center center">去支付&nbsp;<m-icon class="fs34" link="icon-zhifu1"></m-icon></div>
         <div @click="cancelPay" class="bottom-btn steel-gray fs28 m-r-4" v-if="order.status == '0'" layout="row" layout-align="center center">取消&nbsp;<m-icon class="fs34" link="icon-huabanfuben29"></m-icon></div>
         <div @click="goBack" class="bottom-btn steel-gray fs28" layout="row" layout-align="center center">返回&nbsp;<m-icon link="icon-zuojiantou"></m-icon></div>
        </div>
        <integral-confirm :confirmText="confirm" @hideConfirm="hideConfirm" @integraConfirm="inteconfirm"></integral-confirm>
</div>
</template>

<script>
import api_party from 'services/api.party';
import integralConfirm from 'components/integral-mall/integral-confirm';
export default {
    data() {
        return {
            orderId: this.$route.params.id,
            order: {},
            tradeGoodsGroupList: [],
            confirm: {
                show: false,
                message: '即将抵扣豆豆',
                confirm: '确认',
                quiet: '再考虑下'
            }
        };
    },
    components: {
        integralConfirm
    },
    methods: {
        loadData() {
            this.$indicator.open('加载中...');
            api_party.orderDetail(this.orderId).then(msg => {
                this.$indicator.close();
                this.order = msg.data;
                if (this.order.tradeGoodsGroupList.length) {
                    this.order.tradeGoodsGroupList.forEach(element => {
                        element.tradeGoodsGroupGoodsList.forEach(sku => {
                            if (sku.tradeGoodsGroupGoodsSpecList.length) {
                                sku.tradeGoodsGroupGoodsSpecList.forEach(spec => {
                                    let t = {
                                        name: spec.storeName ? `${spec.storeName}(${sku.goodsName})` : sku.goodsName,
                                        time: spec.specName ? spec.specName : '无限期',
                                        quantity: spec.quantity ? spec.quantity : 1
                                    };
                                    this.tradeGoodsGroupList.push(t);
                                });
                            } else {
                                let t = {
                                    name: sku.goodsName,
                                    time: '',
                                    quantity: ''
                                };
                                this.tradeGoodsGroupList.push(t);
                            }
                        });
                    });
                }
            }, msg => {
            });
        },
        goBack() {
            this.$router.go(-1);
        },
        pay() {
            if (this.order.payMoney > 0) {
                location.href = this.order.payUrl + '?url=' + location.protocol + '//' + location.host + this.$rootPath + encodeURIComponent('integral-mall.html#/pay-success');
            } else {
                this.hideConfirm();
            }
        },
        hideConfirm() {
            this.confirm.show = !this.confirm.show;
        },
        inteconfirm(msg) {
            msg.then(data => {
                this.doudouPay();
                this.hideConfirm();
            }, data => {
                this.hideConfirm();
            });
        },
        doudouPay() {
            api_party.doudouPay(this.order.id).then(msg => {
                this.loadData();
                this.$toast('支付成功');
            }, msg => {
                console.log('网络错误');
            });
        },
        cancelPay() {
            api_party.cancelOrder(this.order.id).then(msg => {
                this.resetSearch();
                this.loadData();
                this.$toast('订单已取消');
            }, msg => {
            });
        },
        init() {
            this.loadData();
        }
    },
    mounted() {
        this.init();
    }
};
</script>

<style lang="less">
@import '~styles/_style';
.order-detail{
    .bg-white{
        background: white;
    }
    .border-top{
        border-top: 1px solid @border-gay;
    }
    .border-bottom{
        border-bottom: 1px solid @border-gay;
    }
    .bg-dark-gray{
        background: @dark-gray;
    }
    .title{
        border-bottom: 1px solid @border-gay;
    }
    .crack{
        height: 5px;
        background: @extra-light-gray;
    }
    .bg-extra-light-gray{
        background: @extra-light-gray;
    }
    .bottom-btn{
        width: 90px;
        height: 40px;
        border-radius: 10px;
        border: 1px solid @color-primary-dark;
    }

}
</style>
