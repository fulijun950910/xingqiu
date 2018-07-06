<template>
<div class="pay-detail" v-title="'确认订单'">
    <div class="top-des" flex layout="column" layout-align="center center">
        <div class="item-img m-b-1">
            <img :src="item.image | nSrc(require('assets/imgs/female.png'))" alt="">
        </div>
        <div class="color-black fs30 fwb">{{item.name}}</div>
    </div>
    <div flex class="address p-t-5 p-b-5" layout="row" layout-align="start center">
        <div flex="80">
            <div layout="row" layout-align="start center" class="color-black fwb fs28 m-b-1">
                <div>{{address.contactPersion}}</div>&nbsp;&nbsp;
                <div>{{address.contactMobile}}</div>
            </div>
            <div layout="row" layout-align="start center" class="fs28 extra-light-black">
                <div>{{address.province}}&nbsp;{{address.city}}&nbsp;{{address.fullAddress}}</div>
            </div>
        </div>
        <div flex="20" layout="row" layout-align="end center" @click="chooseAddress">
            <m-icon class="fs40 color-gray" xlink="#icon-zuojiantou"></m-icon>
        </div>
    </div>
    <div flex>
        <div class="p-b-5 p-t-5 border-b">
            <div layout="row" class="m-b-3" layout-align="space-between center">
                <div class="fs28 extra-light-black">商品总价</div>
                <div class="color-black fwb">￥{{item.price | fen2yuan}} / {{item.price | fen2dou}}美豆豆</div>
            </div>
            <div layout="row" layout-align="space-between center">
                <div class="fs28 extra-light-black">购买数量</div>
                <div><integral-input @numOut="changeNum" @changeAmount="changeNum"></integral-input></div>
            </div>
        </div>
        <div class="p-b-5 p-t-5 border-b">
            <div layout="row" class="m-b-3" layout-align="space-between start">
                <div flex="80">
                    <div class="fs28 extra-light-black">美豆豆数量</div>
                    <div class="fs28 extra-light-black">您共有<span class="color-black">{{account.doudouBalance}}</span>美豆豆，可<span class="color-pink">抵￥{{account.doudouBalance | dou2fen}}</span><m-icon class="fs30" xlink="#icon-xunwen"></m-icon></div>
                    </div>
                <div class="color-black"><input class="input-style p-1" pattern="[0-9]*" v-model="payDetail.payDoudouAmount" type="number"></div>
            </div>
            <div layout="row" layout-align="space-between center">
                <div class="fs28 extra-light-black">优惠券</div>
                <div v-if="payDetail.tradeCouponList.length"></div>
                <div class="color-black" @click="clickToVoucher">
                    <div v-if="payDetail.tradeCouponList.length == 0">点击选择可用券<m-icon xlink="#icon-gengduoicon"></m-icon></div>
                    <div v-if="payDetail.tradeCouponList.length">2342435</div>
                    </div>
            </div>
        </div>
        <div class="p-b-5 p-t-5">
            <div layout="row" class="m-b-3" layout-align="space-between center">
                <div flex="80">
                    <div class="fs28 extra-light-black">商品总价</div>
                    </div>
                <div class="color-black">￥{{item.price | fen2yuan}}</div>
            </div>
             <div layout="row" class="m-b-3" layout-align="space-between center">
                <div flex="80">
                    <div class="fs28 extra-light-black">美豆豆换算金额</div>
                    </div>
                <div class="color-black">￥{{payDetail.payDoudouAmount | dou2fen}}</div>
            </div>
             <div layout="row" class="m-b-3" layout-align="space-between center">
                <div flex="80">
                    <div class="fs28 extra-light-black">优惠券抵扣金额</div>
                    </div>
                <div class="color-black"></div>
            </div>
            <div layout="row" class="m-b-3" layout-align="space-between center">
                <div flex="80">
                    <div class="fs30 color-black fwb">需支付</div>
                    </div>
                <div class="color-black fs40 color-pink">￥{{payDetail.payMoney | fen2yuan}}</div>
            </div>
            <div flex class="textarea">
               <textarea class="p-1" placeholder="备注"></textarea>
            </div>
        </div>
<div class="integral-btn fwb fs38 color-white m-t-3 m-b-3" @click="buy" layout="row" layout-align="center center">
支付
</div>
    </div>
    <voucher :mw-item="payDetail" :vocher-show="vocherShow" @update="clickToVoucher" @mClose="clickToVoucher"></voucher>
</div>
</template>
<script>
        /*
        @router
          itemId // 商品Id
        */
        import voucher from 'components/integral-mall/voucher';
        import integralInput from 'components/integral-mall/integral-input';
        import api_party from 'services/api.party';
        export default {
            data() {
                return {
                    itemId: this.$route.params.itemId, // 商品ID
                    item: {}, // 商品详情
                    address: {}, // 默认地址
                    account: {}, // 账户详情
                    totalPay: 3000,
                    selectVoucher: {},
                    payDetail: {
                        merchantId: this.$store.state.party.merchantId,
                        partyId: this.$store.state.party.partyId,
                        userId: this.$store.state.party.id,
                        payDoudouAmount: 0,
                        payMoney: 0,
                        itemId: this.$route.params.itemId,
                        quantity: 1,
                        tradeType: 6,
                        deliverAddressId: null,
                        serviceApply: {},
                        tradeCouponList: []
                    },
                    vocherShow: false
                };
            },
            methods: {
                getDetail() {
                    this.$indicator.open('Loading...');
                    api_party.productDetail(this.itemId).then(msg=> {
                        this.$indicator.close();
                        this.item = msg.data;
                        this.loadPersonal();
                    }, msg=> {
                        console.log('网络错误');
                    });
                },
                loadPersonal() {
                    this.$indicator.open('Loading...');
                    api_party.getAccount(this.$store.state.party.partyId).then(msg=> {
                        this.$indicator.close();
                        this.account = msg.data;
                        let price2dou = this.item.price / 10;
                        let payDou = 0;
                        let payMoney = 0;
                        if (this.account.doudouBalance > price2dou) {
                            payDou = price2dou;
                            payMoney = 0;
                        } else {
                            payDou = this.account.doudouBalance;
                            payMoney = (price2dou - payDou) / 10; // 豆豆转分
                        };
                        this.payDetail.payDoudouAmount = payDou;
                        this.payDetail.payMoney = payMoney;
                    }, msg=> {
                    });
                },
                loadDefaultAddress() {
                    this.$indicator.open('Loading...');
                    if (this.$route.params.addressId) {
                        console.log(this.$route.params.addressId);
                    } else {
                        api_party.getDefaultAddress(this.$store.state.party.partyId, this.$store.state.party.id).then(msg=> {
                            this.address = msg.data;
                        }, msg=> {});
                    }
                },
                changeNum(val) {
                    this.quality = val;
                },
                clickToVoucher(data) {
                    this.vocherShow = !this.vocherShow;
                    if (this.vocherShow == false) {
                        if (data) {
                            this.payDetail = data;
                        }
                    };
                },
                chooseAddress() {
                    this.$router.push(`/address-list/choose/${this.itemId}`);
                },
                initParameter() {
                    if (this.$route.params.addressId) {
                        // 选择地址
                        this.payDetail.deliverAddressId = this.$route.params.address.id;
                        this.address = this.$route.params.address;
                    };
                },
                buy() {
                    console.log(this.payDetail);
                },
                init() {
                    this.getDetail(); // 获取商品详情
                    this.loadDefaultAddress(); // 获取默认地址
                    this.initParameter(); // 加载默认传进来的参数
                }
            },
            mounted() {
                this.init();
            },
            components: {
                voucher,
                integralInput
            }
        };
</script>
<style lang="less" scoped>
@import '~styles/_style';
.pay-detail{
    .border-b{
        border-bottom: 1px solid @border-gay;
    }
    .input-style{
        width: 92.5px;
        height: 30px;
        display: block;
        background: @extra-light-gray;
        border-radius: 7px;
    }
    padding: 0 15px;
    .top-des{
        height: 151px;
        .item-img{
            width: 64px;
            height: 64px;
            border-radius: 7px;
            overflow: hidden;
            img{
                width: auto;
                height: 100%;
            }
        }        
    }
    .address{
        background: url("~assets/imgs/integral-mall/address-bg-min.png") repeat-x bottom;
        background-size: 20px auto;
    }
    .textarea{
        textarea{
            display: block;
            height: 60px;
            width: 100%;
            resize: none;
            background: @extra-light-gray;
            border-radius: 7px;
        }
    }
}
</style>
