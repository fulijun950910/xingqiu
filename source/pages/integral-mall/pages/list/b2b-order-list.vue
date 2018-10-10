<template>
    <div class="order-list" v-title="'我的采购单'">
        <div class="top-tab cell-box" layout="row" layout-align="space-between center">
            <div class="tab-index color-gray" @click="tabClick(item)" :class="{'active':item.value == isActive}" v-for="(item,index) in tabList" :key="index">
                {{item.name}}
            </div>
        </div>
        <div class="temp-con">
            <div class="list-container cell-box" v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
                <div class="list-box" v-for="(item, index) in dataList" :key="index">
                    <div layout="row" class="order-no" layout-align="space-between center">
                        <div class="color-gray fs22">订单号：{{item.orderNo}}</div>
                    </div>
                    <div class="cell" layout="row" layout-align="space-between center">
                        <div class="fs24 color-gray" >{{item.itemName}}</div>
                        <div class="fs24 color-orange">{{item.status | payStatus}}</div>
                    </div>
                    <div class="middle" layout="row" layout-align="space-between center">
                        <div flex="70">
                            <div class="fs34 color-black">{{item.holdTypeName}}</div>
                            <div class="fs28 color-gray">合计：{{item.receiveMoney | fen2yuan}}元</div>
                        </div>
                        <!--<div flex="30" class="img" layout="row" layout-align="end center" v-if="item.itemImage">-->
                            <!--<img class="img-auto" :src="item.itemImage | nSrc(require('assets/imgs/female.png'))" alt="">-->
                        <!--</div>-->
                    </div>
                    <div class="fs24 p-t-3 bottom" layout="row" layout-align="space-between center">
                        <div class="color-gray">{{item.createTime | amDateFormat}}</div>
                        <div layout="row" layout-align="end center">
                            <div v-if="item.status == 22 || item.status == 23" @click="goLogistics(item)" class="color-pink m-l-1 m-r-1" >查看物流</div>
                            <div v-if="item.status == 22" @click="receiveExpress(item, index)" class="color-blue m-l-1 m-r-1" >确认收货</div>
                        </div>

                    </div>
                </div>
                <no-more :show-more="dataList.length != 0 || loading" more-text="不要再看了，我是有底线的"></no-more>
                <no-data :visible="dataList.length == 0 && !loading" :showButton="false"></no-data>
            </div>
        </div>
    </div>
</template>
<script>
import noMore from 'components/integral-mall/no-more';
import { InfiniteScroll } from 'mint-ui';
import noData from 'components/no-data';
import Vue from 'vue';

Vue.use(InfiniteScroll);
import apiPromotion from 'services/api.promotion';

export default {
    data() {
        return {
            tabList: [
                {
                    name: '全部',
                    value: ''
                },
                {
                    name: '待付款',
                    value: '11'
                },
                {
                    name: '待发货',
                    value: '21'
                },
                {
                    name: '待收货',
                    value: '22'
                },
                {
                    name: '已收货',
                    value: '23'
                }
            ],
            isActive: '',
            queryData: {
                partyId: this.$store.state.party.partyId,
                page: 1,
                size: 20
            },
            loading: false,
            scrollDisabled: false,
            dataList: []
        };
    },
    mounted() {
        this.loadData();
    },
    methods: {
        loadMore() {
            this.loadData();
        },
        loadData(type) {
            if (type) {
                this.scrollDisabled = false;
                this.dataList = [];
                this.queryData.page = 1;
            }
            if (this.scrollDisabled) {
                return;
            }
            this.loading = true;

            let queryData = {
                partyId: this.queryData.partyId,
                page: this.queryData.page,
                size: this.queryData.size
            };
            if (this.isActive) {
                queryData.status = this.isActive;
            }
            this.$indicator.open();
            apiPromotion.getOrderList(queryData).then(res => {
                this.$indicator.close();
                if (res.data.rows.length < this.queryData.size) {
                    this.scrollDisabled = true;
                } else {
                    this.scrollDisabled = false;
                }

                this.dataList = this.dataList.concat(res.data.rows);
                this.loading = false;
                this.queryData.page++;
            });
        },
        receiveExpress(item, index) {
            this.$messageBox.confirm('确认收货？').then(action => {
                this.receiveExpressCallBack(item, index);
            });
        },
        async receiveExpressCallBack(item, index) {
            let data = {
                b2bOrderId: item.id
            };
            await apiPromotion.receiveExpress(data);
            this.dataList.splice(index, 1);
            this.$toast('收货成功');
        },
        goLogistics(item) {
            this.$router.push(`/logistics-list/${item.id}`);
        },
        tabClick(item) {
            this.isActive = item.value;
            this.loadData(true);
        }
    },
    filters: {
        payStatus(value) {
            let text = '';
            switch (Number(value)) {
                case 11:
                    text = '待付款';
                    break;
                case 21:
                    text = '待发货';
                    break;
                case 22:
                    text = '待收货';
                    break;
                case 23:
                    text = '已收货';
                    break;
                case 71:
                case 72:
                    text = '已退款';
                    break;
                case 79:
                    text = '退款失败';
                    break;
            }
            return text;
        }
    },
    components: {
        noMore,
        noData
    }
};
</script>
<style lang="less" scoped>
    @import '~styles/_style';

    .order-list {
        height: 100vh;
        overflow: hidden;
        .color-pink {
            color: @color-pink;
        }
        .color-blue {
            color: #4F97FF;
        }
        .color-orange {
            color: @color-yellow-orange;
        }
        .top-tab {
            border-bottom: 1px solid @border-gay;
            position: fixed;
            width: 100%;
            left: 0;
            top: 0;
            padding-top: 15px;
            background: #fff;
            z-index: 2;
            .tab-left {
                overflow-x: scroll;
            }
            .tab-index {
                padding: 10px 6px;
                flex: none;
            }
            .tab-index.active {
                color: @color-pink;
                font-weight: bold;
            }
            .menu {
                color: #4F97FF;
                position: relative;
                z-index: 2;
            }
            .right-menu {
                position: fixed;
                left: 0;
                top: 0;
                bottom: 0;
                right: 0;
                z-index: 1;
                transform: translateX(100%);
                .mask {
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    top: 0;
                    background: rgba(0, 0, 0, 0);
                    z-index: 1;
                }
                .right-menu-con {
                    position: absolute;
                    height: 100%;
                    width: 70%;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 2;
                    background: white;
                    padding: 60px 15px 0 15px;
                    border-radius: 14px 0px 0px 14px;
                    transform: translateX(100%);
                    transition: all ease .8s;
                    .type-item {
                        margin-bottom: 20px;
                    }
                    .tab-title {
                        margin-bottom: 25px;
                    }
                    .tab-item {
                        span {
                            padding: 10px;
                            border-radius: 7px;
                            background: @extra-light-gray;
                            margin-right: 10px;
                            border: 1px solid @extra-light-gray;
                            margin-bottom: 10px;
                        }
                        .active {
                            border: 1px solid @color-pink;
                        }
                    }
                    .time {
                        padding: 5px;
                        margin-bottom: 15px;
                        input {
                            width: 105px;
                            padding: 5px 10px;
                            color: @extra-light-black;
                            text-align: center;
                            background: @extra-light-gray;

                        }

                    }
                }
                .display.right-menu-con {
                    transform: translateX(0);
                }
            }
            .right-menu.display {
                transform: translateX(0);
                .mask {
                    background: rgba(0, 0, 0, .5);
                }
            }
        }
        .temp-con {
            height: 100%;
            overflow: hidden;
            padding-top: 70px;
        }
        .list-container {
            height: 100%;
            overflow-y: scroll;
            padding-top: 15px;
            .list-box {
                border:1px solid @border-gay;
                box-shadow: 0 2px 17px 0 rgba(44, 45, 51, 0.11);
                margin-bottom: 20px;
                border-radius: 7px;
                padding: 10px;
                .order-no {
                    padding: 10px 0;
                }
                .top {
                    .color-white {
                        padding: 3px;
                        border-radius: 14px 14px 14px 0px;

                    }
                }
                .moddle, .top {
                    padding: 10px;
                }
                .bottom {
                    border-top: 1px solid @border-gay;
                    .payStatus {
                        color: #4F97FF;
                    }
                }
                .middle {
                    padding: 15px 0;
                    .img {
                        span {
                            display: block;
                            border-radius: 14px;
                            overflow: hidden;
                        }
                        img {
                            width: auto;
                            height: 44px;
                        }
                    }
                }
            }
        }
    }
</style>
