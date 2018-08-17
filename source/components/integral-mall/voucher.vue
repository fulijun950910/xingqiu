<template>
   <div class="voucher" v-if="showMain">
    <div class="mask" @click="close"></div>
    <div class="main">
        <div class="copon-top">
            <div class="notice fs24 fwb color-white" layout="row" layout-align="center center">
                {{noticeText}}
            </div>
            <div layout="row" class="p-3" layout-align="space-between center">
                <div class="color-black fs24" layout="row" layout-align="center center">
                    <span class="fs40 fwb">优惠券</span>（共{{canUse.length}}张可用）
                </div>
                <div @click="close">
                    <m-icon class="fs40" xlink="#icon-huabanfuben29"></m-icon>
                </div>
            </div>
        </div>
            <div class="data-list p-l-4 p-r-4" flex>
                <div class="box m-b-3" v-for="(item,index) in dalaList" :key="index" layout="row" layout-align="start stretch" :class="{'box-active' : !item.canUsed}">
                    <div class="mask-box" @click="reason(item)"></div>
                    <div @click="chooseCoupon(item)" flex layout="row" layout-align="start stretch">
                    <div flex="70">
                        <div class="p-t-4">
                            <div class="color-pink fs40"><span v-if="item.discountType == 1">￥{{item.discount | fen2yuan}}</span><span v-if="item.discountType == 2">{{item.discount * 10}}折</span></div>
                            <div class="color-black fs30 m-b-2">{{item.name}}</div>
                            <div class="fs24 extra-light-black">有效期至{{item.endTime}}</div>
                        </div>
                    </div>
                    <div layout="row" layout-align="center center" flex="30">
                        <m-icon class="border-gay fs48" :class="{'select-color-pink' : item.id == selected}" xlink="#icon-gouxuanshixin"></m-icon>
                    </div>
                    </div>
                </div>
            </div>
            <div class="integral-btn bottom-btn fs34 color-white" @click="close(parameter)" layout="row" layout-align="center center">
                   确认
            </div>
    </div>
</div>
</template>
<script>
/**
 * @mwItem 已设定的确认订单详情
 * @vocherShow 是否显示
 * @
 */
    import mIcon from 'components/m-icon';
    import api_party from 'services/api.party';
    import { Indicator } from 'mint-ui';
    export default {
        props: {
            mwItem: {
                type: Object,
                default() {
                    return {};
                }
            },
            vocherShow: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                dalaList: [],
                selected: 0,
                parameter: this.mwItem,
                canUse: [],
                noticeText: '已为您选择最佳优惠券',
                chooseCouponItem: {}
            };
        },
        methods: {
            loadData(choose) {
                // this.selected = 0;
                let parameter = this.parameter;
                Indicator.open('Loading...');
                api_party.getCouponList(parameter).then(msg=> {
                    Indicator.close();
                    if (!choose) {
                        this.dalaList = msg.data;
                        if (parameter.tradeCouponList.length) {
                            this.selected = parameter.tradeCouponList[0].userCouponId;
                            this.dalaList.map((item, index)=> {
                                if (item.id == this.selected) {
                                    item.canUsed = true;
                                    this.chooseCouponItem = item;
                                }
                            });
                        } else {
                            this.selected = this.dalaList[0].canUsed ? this.dalaList[0].id : 0;
                            if (this.selected) {
                                this.chooseCouponItem = this.dalaList[0];
                                this.parameter.tradeCouponList = [
                                    {
                                        userCouponId: this.selected
                                    }
                                ];
                            }
                        }
                    } else {
                        msg.data.map((item, index)=> {
                            let ls = this.dalaList.filter((item1, index1)=> {
                                return item.id == item1.id;
                            });
                            if (ls.length) {
                                Object.assign(ls[0], item);
                            } else {
                                this.dalaList.push(item);
                            }
                        });
                        // 给到选择的那张券高亮
                        this.dalaList.map((item, index)=> {
                            if (this.selected == item.id) {
                                this.dalaList[index].canUsed = true;
                            };
                        });
                    }
                    this.canUse = this.dalaList.filter((item, index)=> {
                        return item.canUsed;
                    });

                }, msg=> {
                });
            },
            close(parameter) {
                this.$emit('mClose', parameter, this.chooseCouponItem);
            },
            chooseCoupon(item) {
                let that = this;
                if (this.selected) {
                    if (this.selected == item.id) {
                        filterCoupon();
                        this.selected = null;
                        this.chooseCouponItem = {};
                        this.noticeText = '已为您选择最佳优惠券';
                    } else {
                        this.selected = item.id;
                        this.chooseCouponItem = item;
                        this.noticeText = '共可抵扣' + item.discount / 100 + '元';
                        filterCoupon();
                        this.parameter.tradeCouponList.push({
                            userCouponId: this.selected
                        });
                    }
                } else {
                    this.selected = item.id;
                    this.chooseCouponItem = item;
                    this.parameter.tradeCouponList = []; // 只能使用一张券
                    this.noticeText = '共可抵扣' + item.discount / 100 + '元';
                    this.parameter.tradeCouponList.push({
                        userCouponId: this.selected
                    });
                };
                this.loadData('choose');
                function filterCoupon() {
                    that.parameter.tradeCouponList = that.parameter.tradeCouponList.filter((coupon, index)=> {
                        return that.userCouponId != coupon.id;
                    });
                };
                // console.log(this.parameter.tradeCouponList);
            },
            reason(item) {
                this.$toast(item.canntUsedReason);
            }

        },
        components: {
            mIcon
        },
        computed: {
            showMain: {
                get() {
                    return this.vocherShow;
                },
                set() {
                    this.$emit('update');
                }
            }

        },
        watch: {
            vocherShow(newValue, oldValue) {
                if (newValue) {
                    this.loadData();
                }
            }
        }
    };
</script>

<style lang="less" scoped>
@import '~styles/_style';
.voucher {
    position: relative;
    z-index: 10;
    .mask {
        position: fixed;
        background: rgba(0, 0, 0, .5);
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1;
        height: 100vh;
    }
    .main {
        position: fixed;
        top: 71.5px;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2;
        background: white;
        overflow-x: hidden;
        padding-top: 90px;
        padding-bottom: 70px;
        .bottom-btn{
            position: absolute;
            left: 0;
            bottom: 10px;
            left: 15px;
            right: 15px;
            width: auto;
            text-align: center;

        }
        .copon-top{
            position: absolute;
            top:0;
            left: 0;
            right: 0;
        }
        .notice {
            height: 28px;
            background: @color-pink;
        }
        .data-list {
            overflow-y: scroll;
            height: 100%;
            .box {
                height: 118px;
                background: url("~assets/imgs/integral-mall/voucher-bg.png") no-repeat center;
                background-size: 100% 100%;
                padding: 0 0 0 70px;
                position: relative;
                .mask{
                    display: none;
                }
                .select-color-pink{
                    color: @color-pink;
                }
            }
            .box-active {
                .mask-box{
                    position: absolute;
                    left: 0;
                    right: 0;
                    top:0;
                    bottom: 0;
                    background: rgba(255,255,255,.8);
                    display: block;
                }
            }
        }
    }
}
</style>

