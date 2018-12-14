<template>
    <div v-title="'打款详情'" class="remit-detail min-height-100">
        <div class="title">
            <div class="date" layout="row" layout-align="center center">
                <span>{{dataModel.startDate | amDateFormat('MM月DD')}} - {{dataModel.endDate | amDateFormat('MM月DD')}}</span>
            </div>
            <div class="sum" layout="row" layout-align="space-around center">
                <div class="coupon" flex="50" layout="row" layout-align="center center">
                    <m-icon xlink="icon-coupon"></m-icon>
                    <div>
                        <p>验券数量</p>
                        <p>{{dataModel.verifyTickets || '0'}}</p>
                    </div>
                </div>
                <div class="remit" flex="50" layout="row" layout-align="center center">
                    <m-icon xlink="icon-shouru"></m-icon>
                    <div>
                        <p>活动打款</p>
                        <p>{{(dataModel.income/100) | currency}}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="list">
            <div class="list-cell" v-for="(item, index) in dataModel.trades" :key="index"
             layout="row" layout-align="space-between center">
                <div flex="20" layout="row" layout-align="center center">
                    <img :src="item.avatarId | mSrc(40, 40, require('assets/imgs/avatar.png'))" @error="item.avatarId = undefined">
                </div>
                <div flex="50">
                    <p class="name">{{item.nickName}}</p>
                    <p class="no-wrap"><m-icon xlink="icon-dianhua"></m-icon> {{item.mobile}}</p>
                    <p class="no-wrap"><m-icon xlink="icon-coupon"></m-icon> {{item.tradeEntity | couponNo}}</p>
                </div>
                <div class="text-center" flex="30">
                    <p class="money no-wrap">{{(item.payAmount/100) | currency}}</p>
                    <p>{{item.tradeTime | amDateFormat('YYYY-MM-DD')}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api_merchant from 'services/api.merchant';
export default {
    name: 'remit-detail',
    data() {
        return {
            dataModel: {
                defAvatar: require('assets/imgs/avatar.png'),
                'startDate': '',
                'endDate': '',
                'verifyTickets': '',
                'income': '',
                'trades': []
            }
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            var merchantId = this.$route.params.merchantId;
            var drawMoneyId = this.$route.params.drawMoneyId;
            this.getDrawMoneyDetail(merchantId, drawMoneyId);
        },
        getDrawMoneyDetail(merchantId, drawMoneyId) {
            this.$indicator.open();
            api_merchant.getDrawMoneyDetail(merchantId, drawMoneyId).then(res => {
                this.$indicator.close();
                this.dataModel = res.data;
            }, err => {
                this.$indicator.close();
            });
        }
    },
    filters: {
        couponNo(val) {
            let newStr = '';
            if (val && typeof val == 'string' & val != '') {
                let len = Math.floor(val.length / 4);
                for (let i = 0; i < len; i++) {
                    newStr += val.substr(4 * i, 4) + ' ';
                }
            }
            return newStr;
        }
    }
};
</script>

<style lang="less">
    @import '~styles/_style.less';
    .remit-detail {
        font-size: 14px;
        .title {
            color: white;
            height: 150px;
            background-image: url(/assets/imgs/remit.png);
            .background-cover;
            .date {
                padding: 20px;
                span {
                    display: inline-block;
                    border-radius: 15px;
                    background-color: fade(white, 20%);
                    padding: 3px 10px
                }
            }
            .sum {
                div {
                    div {
                        p{
                            font-size: 18px;
                        }
                        p:first-child {
                            font-size: 14px;
                        }
                    }
                }
                .icon {
                    color: white;
                    width: 40px;
                    height: 40px;
                    margin-right: 10px;
                }
            }
        }
        .list {
            .list-cell {
                height: 85px;
                border-top: 1px solid #ededed;
                div {
                    img {
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        border: 1px solid #979797;
                    }
                    p {
                        font-size: 12px;
                        color: #666;
                    }
                    .name {
                        font-size: 16px;
                        color: #000;
                    }
                    .money {
                        font-size: 16px;
                        color: #854399;
                    }
                }
            }
        }
    }
</style>
