<template>
    <div class="order-list">
        <div class="top-tab" flex layout="row" layout-align="start center">
            <div class="tab-left" flex="95" layout="row" layout-align="start center">
            <div class="tab-index fs30 color-gray" @click="tabClick(item)" :class="{'active':item.value == isActive}" v-for="(item,index) in tabList" :key="index">
                {{item.name}}
            </div>
            </div>
            <div class="menu" flex="5" @click="menuClick">
                <m-icon class="fs35" xlink="#icon-shaixuan1"></m-icon>
            </div>
            <div class="right-menu" :class="{'display': rightTab}">
                <div class="mask" @click="menuClick"></div>
                <div class="right-menu-con" :class="{'display': rightTab}">
                    <div>
                        <div v-for="(item, index) in rightMenu" :key="index" class="type-item">
                        <div class="color-black fs40 fwb tab-title">{{item.name}}</div>
                        <div v-if="index == 0" layout="row" class="tab-item" layout-align="start center" flex-wrap="wrap">
                            <span v-for="(tab,tIndex) in item.tab" :key="tIndex" :class="{'active': item.typeselect == tab.value}" class="fs22 extra-light-black" @click="choose(item,tIndex)">
                                {{tab.name}}
                            </span>
                        </div>
                        <div flex v-if="index == 1">
                            <div class="time">
                            <input type="text" readonly v-model="item.startTime" @click="showDatePicker(1)">

                            </div>
                            <div class="time">
                            <input type="text" v-model="item.endTime" readonly @click="showDatePicker(2)">

                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="temp-con">
        <div class="list-container" v-infinite-scroll="loadMore"  :infinite-scroll-disabled="loading"  infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
            <div class="list-box" v-for="(item, index) in dataList" :key="index">
                <div class="top" layout="row" layout-align="space-between center">
                <div class="fs24">{{item.nickName}}</div><div class="fs24 color-orange-yellow">{{item.notes}}</div>
                </div>
                <div class="middle" layout="row" layout-align="space-between center">
                  <div flex="70">
                      <div class="fs34 color-black">{{item.itemName}}&nbsp;&nbsp;&nbsp;{{item.quantity}}个</div>
                      <div class="fs28 color-gray">合计：{{item.payDoudouAmount}}美豆豆&nbsp;/&nbsp;{{item.payMoney | fen2yuan}}元</div>
                  </div>
                  <div flex="30">
                      <span><img class="img-auto"  alt=""></span>
                  </div>
                </div>
                <div layout="row" layout-align="space-between center" class="bottom">
                    <div class="fs24 color-gray">{{item.createdTime | amDateFormat}}</div>
                    <div class="payStatus fs30" :class="{'color-pink fwb' : item.tradeType == 0}">{{item.tradeType | payStatus}}<m-icon xlink="#icon-zuojiantou"></m-icon></div>
                </div>
            </div>
        <no-more :show-more="dataList.length == 0 && !loading" more-text="不要再看了，我是有底线的"></no-more>
            
        </div>
        </div>
<buy-message type="2"  @update="update" :selected-item="chooseServiceItem" :show-buy="showBuy"></buy-message>
         <mt-datetime-picker
    ref="picker"
    type="datetime"
     @confirm="handleConfirm">
  </mt-datetime-picker>
    </div>
</template>
<script>
import noMore from 'components/integral-mall/no-more';
import { Indicator, DatetimePicker, InfiniteScroll } from 'mint-ui';
import buyMessage from 'components/integral-mall/buy-message';
import Vue from 'vue';
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.use(InfiniteScroll);
import api_party from 'services/api.party';
export default {
    data() {
        return {
            showBuy: false,
            chooseServiceItem: null,
            tabList: [
                {
                    name: '全部',
                    value: 1
                },
                {
                    name: '待支付',
                    value: 2
                },
                {
                    name: '待确认',
                    value: 3
                },
                {
                    name: '已完成',
                    value: 4
                }
            ],
            pageChange: {
                page: 1,
                size: 20
            },
            showNomore: true,
            loading: false,
            isActive: 1,
            dataList: [],
            rightTab: false,
            scrollDisabled: false,
            rightMenu: [
                {
                    name: '订单类型',
                    type: 1,
                    typeselect: '',
                    tab: [
                        {
                            name: '全部',
                            value: ''
                        },
                        {
                            name: '短信充值',
                            value: 1
                        },
                        {
                            name: '购买短信签名',
                            value: 2
                        },
                        {
                            name: '购买沙龙入场券',
                            value: 3
                        },
                        {
                            name: '购买硬件',
                            value: 4
                        },
                        {
                            name: '购买服务',
                            value: 5
                        },
                        {
                            name: '充值豆豆',
                            value: 6
                        }
                    ]
                },
                {
                    name: '购买时间',
                    type: 2,
                    startTime: '',
                    endTime: ''
                }
            ],
            pickerType: null
        };
    },
    methods: {
        loadData(type) {
            if (this.scrollDisabled && type) {
                return;
            }
            if (!type) {
                this.dataList = [];
                this.resetSearch();
            }
            let parameter = {
                query: [
                    {
                        field: 'merchantId',
                        value: this.$store.state.party.merchantId
                    },
                    {
                        field: 'partyId',
                        value: this.$store.state.party.partyId
                    },
                    {
                        field: 'status',
                        value: this.isActive
                    }
                ],
                page: this.pageChange.page,
                size: this.pageChange.size
            };
            if (this.rightMenu[0].typeselect) {
                parameter.query.push(
                    {
                        field: 'tradeType',
                        value: this.rightMenu[0].typeselect
                    }
                );
            };
            if (this.rightMenu[1].startTime) {
                parameter.query.push(
                    {
                        field: 'startTime',
                        value: this.rightMenu[1].startTime ? this.$moment(this.rightMenu[1].startTime).format('YYYY-MM-DD HH:mm:ss') : this.rightMenu[1].startTime
                    }
                );
            };
            if (this.rightMenu[1].endTime) {
                parameter.query.push(
                    {
                        field: 'startTime',
                        value: this.rightMenu[1].endTime ? this.$moment(this.rightMenu[1].endTime).format('YYYY-MM-DD HH:mm:ss') : this.rightMenu[1].endTime
                    }
                );
            };
            Indicator.open('loading...');
            this.loading = true;
            api_party.orderList(parameter).then(res=> {
                Indicator.close();
                if (res.data.rows.length < this.pageChange.size) {
                    this.scrollDisabled = true;
                } else {
                    this.scrollDisabled = false;
                }
                this.dataList = this.dataList.concat(res.data.rows);
                this.loading = false;
                this.pageChange.page++;
            }, res=> {

            });
        },
        tabClick(item) {
            this.isActive = item.value;
            this.loadData();
        },
        choose(item, index) {
            item.typeselect = item.tab[index].value;
            this.resetSearch();
            this.loadData();
            this.menuClick();
        },
        showDatePicker(type) {
            this.pickerType = type;
            this.$refs.picker.open();
        },
        handleConfirm(date) {
            if (this.pickerType == 1) {
                this.rightMenu[1].startTime = this.$moment(date).format('YYYY-MM-DD');
            } else if (this.pickerType == 2) {
                this.rightMenu[1].endTime = this.$moment(date).format('YYYY-MM-DD');
                this.resetSearch();
                this.loadData();
                this.menuClick();
            };
        },
        menuClick() {
            this.rightTab = !this.rightTab;
        },
        loadMore() {
            this.loadData(1);
        },
        update() {
            this.showBuy = false;
        },
        clickToPay(item) {
            if (item.tradeType == 0) {
                this.chooseServiceItem = item;
                this.showBuy = true;
            }
        },
        resetSearch() {
            this.pageChange.page = 1;
        }
    },
    mounted() {
        this.loadData();
    },
    components: {
        noMore,
        buyMessage
    }
};
</script>
<style lang="less" scoped>
@import '~styles/_style';
.order-list {
    padding: 0 15px;
    height: 100vh;
    overflow: hidden;
    .top-tab{
        border-bottom: 1px solid @border-gay;
        position: fixed;
        left: 15px;
        right: 15px;
        top:0;
        padding-top: 27px;
        background: #fff;
        z-index: 2;
        .tab-left{
            width: 95%;
            overflow-x: scroll;
        }
        .tab-index{
            padding: 10px 18px;
            flex: none;
        }
        .tab-index.active{
            color: @color-pink;
            font-weight: bold;
        }
        .menu{
            color: #4F97FF;
            position: relative;
            z-index: 2;
        }
        .right-menu{
            position: fixed;
            left: 0;
            top:0;
            bottom: 0;
            right: 0;
            z-index: 1;
            transform: translateX(100%);
            .mask{
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                top: 0;
                background: rgba(0,0,0,0);
                z-index: 1;
            }
            .right-menu-con{
                position: absolute;
                height: 100%;
                width: 50%;
                top:0;
                right: 0;
                bottom: 0;
                z-index: 2;
                background: white;
                padding: 60px 15px 0 15px;
                border-radius:14px 0px 0px 14px;
                transform: translateX(100%);
                transition: all ease .8s;
                .type-item{
                    margin-bottom: 20px;
                }
                .tab-title{
                    margin-bottom: 25px;
                }
                .tab-item{
                    span{
                        padding: 10px;
                        border-radius: 7px;
                        background: @extra-light-gray;
                        margin-right: 10px;
                        border: 1px solid @extra-light-gray;
                        margin-bottom: 10px;
                    }
                    .active{
                        border: 1px solid @color-pink;
                    }
                }
                .time{
                    background: @extra-light-gray;
                    padding: 5px;
                    margin-bottom: 15px;
                    input{
                        width: 100%;
                        padding: 5px 10px;
                        color: @extra-light-black;
                        text-align: center;
                    }

                }
            }
            .display.right-menu-con{
                transform: translateX(0);
            }
        }
        .right-menu.display{
            transform: translateX(0);
            .mask{
                    background: rgba(0,0,0,.5);
                }
        }
    }
    .temp-con{
        height: 100%;
        overflow: hidden;
        padding-top: 90px;
    }
    .list-container{
        height: 100%;
        overflow-y: scroll;
        .list-box{
            box-shadow:0px 10px 28px 0px rgba(44,45,51,0.08);
            margin-bottom: 10px;
            border-radius: 7px;
            padding:10px;
            .bottom,.moddle,.top{
                padding: 10px;
            }
            .bottom{
                .payStatus{
                    color: #4F97FF;
                }
            }
        }
    }
}
</style>

