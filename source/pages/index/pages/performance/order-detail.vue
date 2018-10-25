<template>
    <div style="width:100%;height:100%;background:#f4f4fc;font-size: 0.35rem;padding: 8px 0 0 0;;line-height: 2;">
        <div class="orderList-detail"
             v-title="'订单详情'">
            <div class="detailUser">
                <div class="detailUserH"
                     layout="row"
                     layout-align="start center">
                    <div flex="85"
                         layout="row"
                         layout-align="start center">
                        <img class="e-avatar"
                             :src="this.list.member.avatarId | mSrc(30, 30, require('assets/imgs/default_female.png'))">
                        <span>{{this.list.member.memberName}}</span>&nbsp;
                        <span>{{this.list.member.memberMobile}}</span>
                    </div>
                    <div :class="Sta">{{parseInt(this.list.status) | messageType2}}</div>
                </div>
                <div class="lineOrder"
                     layout="column">
                    <div>订单编号：
                        <span class="font-primary-color">{{this.list.orderNo}}</span>
                    </div>
                    <div>下单时间：
                        <span class="font-primary-color">{{this.list.orderDate}}</span>
                    </div>
                    <div>订单备注：
                        <span class="font-primary-color">{{this.list.remark}}</span>
                    </div>
                </div>
            </div>
            <div class="orderInfo" v-show="this.list.orderKind ==1 || this.list.orderKind ==7">
                <div style="color:#888;border-top:1px solid #e5e5e5;padding-top:4px">订单内容</div>
                <div class="orderItem" v-for="(item,index) in this.list.orderItems" :key="index" >
                    <div class="itemCell"
                         layout="row"
                         layout-align="space-between start"
                         style="position:relative">
                        <div layout="column"
                             flex="80">
                            <div style="font-size:0.3rem">{{item.itemName}}
                                <span v-show="item.overtime">(加钟)</span>
                                <span v-show="item.amount">x</span>{{item.amount}}</div>
                            <div style="font-size:0.3rem"
                                 layout="row"
                                 layout-align="start center"
                                 flex-wrap="wrap"
                                 >
                                <span>支付方式：</span>
                                <div layout="column" layout-align="start center" v-for="(item2,index) in item.orderItemPays" :key="index">
                                    <div style="width:100%"
                                         layout="column"
                                         layout-align="start center">
                                        <div class=""
                                             style="margin-top: -1vw;">{{item2.paymentName}}&nbsp;&nbsp;
                                            <span class="primary-color">
                                                <span>{{ item2.realPayMoney | fen2yuan | currency('￥',2)}}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div flex="40"
                             class="primary-color"
                             style="position:absolute;right:0px">
                            <span style="font-size:0.5rem">{{(toNumber(item.actualPerPrice))[0] | currency('￥',0)}}</span>.
                            <span>{{(toNumber(item.actualPerPrice))[1]}}</span>
                        </div>
                    </div>
                    <div class="itemEmployee" v-for="(item3,index) in item.orderEmployees" :key="index">
                        <div layout="row" v-for="item4 in item3.orderEmployeePerformances" :key="item4.id"
                             layout-align="space-between center"
                             warp="no-warp">
                             <div>{{item3.employeeName}}
                             <span v-show="item3.isAppoint==2">(轮牌)</span>
                             <span v-show="item3.isAppoint==1">(点钟)</span></div>
                                <span>业绩:{{item4.achievementTotalAmount | fen2yuan | currency('￥',2)}}</span>
                                <span>卡耗:{{item4.cardConsumeTotalAmountt | fen2yuan | currency('￥',2)}}</span>
                                <span>提成:{{item4.commissionAmountt | fen2yuan | currency('￥',2)}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="orderInfo" v-show="this.list.orderKind ==2 || this.list.orderKind ==4 || this.list.orderKind ==5">
                <div style="color:#888;border-top:1px solid #e5e5e5;padding-top:4px">订单内容</div>
                <div class="orderItem" v-for="(item,index) in this.list.orderCardItems" :key="index" >
                    <div class="itemCell"
                         layout="row"
                         layout-align="space-between start"
                         style="position:relative">
                        <div layout="column"
                             flex="80">
                            <div style="font-size:0.3rem">{{item.itemName}}
                                <span v-show="item.overtime">(加钟)</span>
                                <span v-show="item.amount">x</span>{{item.amount}}</div>
                            <div style="font-size:0.3rem"
                                 layout="row"
                                 layout-align="start center"
                                 flex-wrap="wrap"
                                 >
                                <span>支付方式：</span>
                                <div layout="column" layout-align="start center" v-for="(item2,index) in item.orderItemPays" :key="index">
                                    <div style="width:100%"
                                         layout="column"
                                         layout-align="start center">
                                        <div class=""
                                             style="margin-top: -1vw;">{{item2.paymentName}}&nbsp;&nbsp;
                                            <span class="primary-color">
                                                <span>{{ item2.realPayMoney | fen2yuan | currency('￥',2)}}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div flex="40"
                             class="primary-color"
                             style="position:absolute;right:0px">
                            <span style="font-size:0.5rem">{{(toNumber(item.actualPerPrice))[0] | currency('￥',0)}}</span>.
                            <span>{{(toNumber(item.actualPerPrice))[1]}}</span>
                        </div>
                    </div>
                    <div class="itemEmployee" v-for="(item3,index) in item.orderEmployees" :key="index">
                        <div layout="row" v-for="item4 in item3.orderEmployeePerformances" :key="item4.id"
                             layout-align="space-between center"
                             warp="no-warp">
                             <div>{{item3.employeeName}}
                             <span v-show="item3.isAppoint==2">(轮牌)</span>
                             <span v-show="item3.isAppoint==1">(点钟)</span></div>
                                <span>业绩:{{item4.achievementTotalAmount | fen2yuan | currency('￥',2)}}</span>
                                <span>卡耗:{{item4.cardConsumeTotalAmountt | fen2yuan | currency('￥',2)}}</span>
                                <span>提成:{{item4.commissionAmountt | fen2yuan | currency('￥',2)}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="orderInfo" v-show="this.list.orderKind ==3">
                <div style="color:#888;border-top:1px solid #e5e5e5;padding-top:4px">订单内容</div>
                <div class="orderItem" v-for="(item,index) in this.list.orderRechargeItems" :key="index" >
                    <div class="itemCell"
                         layout="row"
                         layout-align="space-between start"
                         style="position:relative">
                        <div layout="column"
                             flex="80">
                            <div style="font-size:0.3rem">{{item.itemName}}</div>
                            <div style="font-size:0.3rem"
                                 layout="row"
                                 layout-align="start center"
                                 flex-wrap="wrap"
                                 >
                                 <span v-show="item.amount">数量:{{item.amount}}</span>
                                <span>支付方式：</span>
                                <div layout="column" layout-align="start center" v-for="(item2,index) in item.orderItemPays" :key="index">
                                    <div style="width:100%"
                                         layout="column"
                                         layout-align="start center">
                                        <div class=""
                                             style="margin-top: -1vw;">{{item2.paymentName}}&nbsp;&nbsp;
                                            <span class="primary-color">
                                                <span>{{ item2.realPayMoney | fen2yuan | currency('￥',2)}}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div flex="40"
                             class="primary-color"
                             style="position:absolute;right:0px">
                            <span style="font-size:0.5rem">{{(toNumber(item.actualPerPrice))[0] | currency('￥',0)}}</span>.
                            <span>{{(toNumber(item.actualPerPrice))[1]}}</span>
                        </div>
                    </div>
                    <div class="itemEmployee" v-for="(item3,index) in item.orderEmployees" :key="index">
                        <div layout="row" v-for="item4 in item3.orderEmployeePerformances" :key="item4.id"
                             layout-align="space-between center"
                             warp="no-warp">
                             <div>{{item3.employeeName}}</div>
                                <span>业绩:{{item4.achievementTotalAmount | fen2yuan | currency('￥',2)}}</span>
                                <span>卡耗:{{item4.cardConsumeTotalAmountt | fen2yuan | currency('￥',2)}}</span>
                                <span>提成:{{item4.commissionAmountt | fen2yuan | currency('￥',2)}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import getOrderDetail from 'services/api.performance';
import { Indicator } from 'mint-ui';
export default {
    name: 'order-detail',
    data() {
        return {
            list: {}
        };
    },
    methods: {
        toNumber(val) {
            return Vue.filter('fen2yuan')(val).split('.');
        }
    },
    mounted() {
        Indicator.open('加载中...');
        getOrderDetail.getOrderDetail(this.$route.params.orderId).then(res => {
            Indicator.close();
            this.list = res.data;
        });
    },
    computed: {
        Sta() {
            return `status-${this.list.status}`;
        }
    }
};
</script>
<style lang="less">
@import '~@/styles/_agile';
.orderList-detail {
    background: @white;
    width: 96%;
    margin: auto;
    .detailUser {
        padding: 4px 15px;
        .detailUserH {
            padding: 8px 0;
            border-bottom: 1px solid #e5e5e5; /*no*/
            .e-avatar {
                width: 30px;
                height: 30px;
                border-radius: 15px;
                margin-right: 8px;
            }
            .status-20 {
                height: 19px;
                padding: 0 8px;
                line-height: 18px;
                border-radius: 2px;
                color: #f7aa25;
                border: 1px solid #f7aa25; /*no*/
            }
            .status-61,.status-40,.status-11 {
                height: 19px;
                padding: 0 8px;
                line-height: 18px;
                border-radius: 2px;
                color: @extra-light-black;
                border: 1px solid @extra-light-black; /*no*/
            }
            .status-70 {
                height: 19px;
                padding: 0 8px;
                line-height: 18px;
                border-radius: 2px;
                color: @color-primary-dark;
                border: 1px solid @color-primary-dark; /*no*/
            }
        }
        .lineOrder > div {
            margin-top: 4px;
            line-height: 26px;
            color: @extra-light-black;
            .font-primary-color {
                color: #333;
            }
        }
    }
    .orderInfo {
        .primary-color {
            color: @color-primary;
        }
        padding: 4px 15px;
        margin: auto;
        .orderItem:not(:last-child) {
            border-bottom: 1px solid #e5e5e5; /*no*/
        }
        .orderItem {
            line-height: 0.8rem;
            text-indent: 15px;
        }
        .itemEmployee {
            color: @extra-light-black;
            font-size: 11px;
            text-align: left;
            line-height: 2;
        }
    }
}
</style>
