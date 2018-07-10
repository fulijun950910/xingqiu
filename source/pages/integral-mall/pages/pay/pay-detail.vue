<template>
<div class="pay-detail" v-title="'确认订单'">
    <div class="top-des" flex layout="column" layout-align="center center">
        <div class="item-img m-b-1">
            <img :src="item.image | nSrc(require('assets/imgs/female.png'))" alt="">
        </div>
        <div class="color-black fs30 fwb">{{item.name}}</div>
    </div>
    <div flex class="address p-t-5 p-b-5" layout="row" layout-align="start center" v-if="item.type == 4" @click="chooseAddress">
        <div flex="80">
            <div layout="row" layout-align="start center" class="color-black fwb fs28 m-b-1">
                <div>{{address.contactPersion}}</div>&nbsp;&nbsp;
                <div>{{address.contactMobile}}</div>
            </div>
            <div layout="row" layout-align="start center" class="fs28 extra-light-black">
                <div>{{address.province}}&nbsp;{{address.city}}&nbsp;{{address.fullAddress}}</div>
            </div>
        </div>
        <div flex="20" layout="row" layout-align="end center">
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
                    <div class="fs28 extra-light-black">您共有<span class="color-black">{{account.doudouBalance}}</span>美豆豆，可<span class="color-pink">抵￥{{account.doudouBalance | dou2yuan}}</span><m-icon class="fs30" xlink="#icon-xunwen"></m-icon></div>
                    </div>
                <div class="color-black"><input class="input-style p-1 tetx-center" @change="changeDouAmount" pattern="[0-9]*" v-model="payDetail.payDoudouAmount" type="number"></div>
            </div>
            <div flex @click="clickToVoucher">                
                <div flex layout="row" layout-align="space-between center">
                    <div class="fs28 extra-light-black">优惠券</div>
                    <div layout="row" layout-align="center center">
                        <div class="color-black fwb" v-if="voucher && voucherDiscountMoney">
                            {{voucher.name}}
                        </div>
                    <div class="fwb fs28" v-if="voucherDiscountMoney && !voucher">优惠{{voucherDiscountMoney | fen2yuan}}</div>
                    <div class="fwb fs28" v-if="!voucherDiscountMoney">{{couponList.length > 0 ? '点击选择优惠券' : '无可用'}}</div>&nbsp;&nbsp;
                    <m-icon class="fs36" xlink="#icon-gengduoicon"></m-icon>
                    </div>
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
                <div class="color-black">￥{{payDetail.payDoudouAmount | dou2yuan}}</div>
            </div>
             <div layout="row" class="m-b-3" layout-align="space-between center">
                <div flex="80">
                    <div class="fs28 extra-light-black">优惠券抵扣金额</div>
                    </div>
                <div class="color-black">￥{{discountMoney | fen2yuan}}</div>
            </div>
            <div layout="row" class="m-b-3" layout-align="space-between center">
                <div flex="30">
                    <div class="fs30 color-black fwb">需支付</div>
                    </div>
                <div class="color-black fs40 color-pink">￥{{payDetail.payMoney | fen2yuan}}</div>
            </div>
            <div flex class="textarea">
               <textarea class="p-1" v-model="payDetail.remark" placeholder="备注"></textarea>
            </div>
        </div>
<button :disabled="btnClick" class="integral-btn fwb fs38 color-white m-t-3 m-b-3" @click="buy" layout="row" layout-align="center center">
支付
</button>
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
                    discountMoney: 0,
                    voucherDiscountMoney: 0,
                    discount: 1,
                    voucher: null,
                    couponList: [],
                    btnClick: false,
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
                        tradeCouponList: [],
                        remark: null
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
                        this.getCouponList();
                        if (this.item.type == 4) {
                            this.loadDefaultAddress();
                        }
                    }, msg=> {
                        console.log('网络错误');
                    });
                },
                loadPersonal() {
                    this.$indicator.open('Loading...');
                    api_party.getAccount(this.$store.state.party.partyId).then(msg=> {
                        this.$indicator.close();
                        this.account = msg.data;
                        if (this.payDetail.tradeCouponList.length) {
                            this.caculateDiscountMoney();
                        } else {
                            this.caculateResult();
                        }
                    }, msg=> {
                    });
                },
                loadDefaultAddress() {
                    if (this.$route.params.addressId) {
                        this.payDetail.deliverAddressId = this.$route.params.addressId;
                    } else {
                        this.$indicator.open('Loading...');
                        api_party.getDefaultAddress(this.$store.state.party.partyId, this.$store.state.party.id).then(msg=> {
                            this.$indicator.close();
                            this.address = msg.data;
                            this.payDetail.deliverAddressId = this.address.id;
                        }, msg=> {});
                    }
                },
                changeNum(val) {
                    // this.$set(this.payDetail, 'quantity', val);
                    let tempPayDetail = this.payDetail;
                    tempPayDetail.quantity = val;
                    this.payDetail = tempPayDetail;
                    this.caculateResult();
                    this.caculateDiscountMoney();
                },
                clickToVoucher(data, coupon) {
                    debugger;
                    this.voucher = {};
                    this.voucherDiscountMoney = 0;
                    this.vocherShow = !this.vocherShow;
                    if (this.vocherShow == false) {
                        if (data.itemId) {
                            this.payDetail = data;
                            if (data.tradeCouponList.length) {
                                this.caculateDiscountMoney();
                                if (data.tradeCouponList.length == 1) {
                                    this.voucher = coupon;
                                };
                            } else {
                                this.caculateResult();
                            }
                        } else {
                            if (this.payDetail.tradeCouponList.length) {
                                this.caculateDiscountMoney();
                                if (this.payDetail.tradeCouponList && this.payDetail.tradeCouponList.length == 1) {
                                    this.voucher = coupon;
                                };
                            };
                        }
                    };
                },
                caculateDiscountMoney() {
                    this.$indicator.open('Loading...');
                    api_party.calCouponMoney(this.payDetail).then(msg=> {
                        this.$indicator.close();
                        let discount = 0;
                        msg.data.map((item, index)=> {
                            discount += item.discountAmount;
                        });
                        // this.voucher = msg.data[0];
                        // if (this.voucher.discountType == 1) {
                        this.voucherDiscountMoney = discount;
                        // } else if (this.voucher.discountType == 2) {
                        //     this.discount = this.voucher.discount;

                        // }
                        this.caculateResult();
                    }, msg=> {
                    });
                },
                caculateResult() {
                    // 添加优惠后的需支付详情
                    let payAll = this.item.price;
                    let leftMoney = payAll;
                    // if (this.voucher) {
                        // 如果选择了优惠券
                        // if (this.voucher.discountType == 1) {
                    leftMoney = payAll - this.voucherDiscountMoney;
                    this.discountMoney = this.voucherDiscountMoney;
                        // } else if (this.voucher.discountType == 2) {
                        //     leftMoney = payAll * this.discount;
                        //     this.discountMoney = Number(payAll * (1 - this.discount)).toFixed(2);
                        // };
                    // }
                    leftMoney += this.item.price * (this.payDetail.quantity - 1);
                    if (leftMoney > 0) {
                        let balanceFen = this.translate('dou2fen', this.account.doudouBalance); // 豆豆转分
                        if (leftMoney < balanceFen) {
                            this.payDetail.payDoudouAmount = this.translate('fen2dou', leftMoney); // 分转豆豆
                            this.payDetail.payMoney = 0;
                        } else {
                            this.payDetail.payDoudouAmount = this.translate('fen2dou', balanceFen);
                            let afterLeft = leftMoney - balanceFen;
                            this.payDetail.payMoney = afterLeft;
                        }
                    }
                },
                changeDouAmount() {
                    let tempPayDetail = this.payDetail;
                    tempPayDetail.payMoney = this.item.price * tempPayDetail.quantity - this.voucherDiscountMoney - this.translate('dou2fen', tempPayDetail.payDoudouAmount);
                    this.payDetail = tempPayDetail;
                },
                chooseAddress() {
                    this.$router.push(`/address-list/choose/${this.itemId}`);
                },
                initParameter() {
                    if (this.$route.params.addressId) {
                        // 选择地址
                        this.payDetail.deliverAddressId = this.$route.params.addressId;
                        this.address = this.$route.params.address;
                    };
                },
                getCouponList() {
                    this.$indicator.open('Loading...');
                    api_party.getCouponList(this.payDetail).then(msg=> {
                        this.$indicator.close();
                        this.couponList = msg.data.filter((item, index)=> {
                            return item.canUsed;
                        });
                        if (this.couponList.length) {
                            this.payDetail.tradeCouponList = [
                                {
                                    userCouponId: this.couponList[0].id
                                }
                            ];
                            this.voucher = this.couponList[0];
                            this.caculateDiscountMoney();
                        };
                    }, msg=> {
                        console.log('网络错误');
                    });
                },
                buy() {
                    if (this.$route.params.serviceApply) {
                        this.payDetail.serviceApply = this.$route.params.serviceApply;
                    };
                    api_party.doudouTrade(this.payDetail).then(msg=> {
                        this.btnClick = true;
                        if (msg.data.status == 0) {
                            location.href = msg.data.payUrl + '?url=' + encodeURIComponent(location.protocol + '//' + location.host + this.$rootPath + 'integral-mall.html#/pay-success');
                        } else {
                            this.$router.push('pay-success');
                        };
                    }, msg=> {

                    });
                },
                init() {
                    this.getDetail(); // 获取商品详情
                    // this.loadDefaultAddress(); // 获取默认地址
                    this.initParameter(); // 加载默认传进来的参数
                },
                translate(type, num) {
                    let result;
                    if (type == 'dou2fen') {
                        result = num / 10 * 100;
                    };
                    if (type == 'fen2dou') {
                        result = num / 100 * 10;
                    };
                    return result;
                }
            },
            mounted() {
                if (!this.$route.params.itemId) {
                    this.$router.go(-1);
                };
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
