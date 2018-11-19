<template>
    <div class="order-list"
         v-title="'订单列表'">
        <div class="headerPerformance9"
             style="z-index:999"
             layout="row"
             layout-align="space-between center">
            <div class="performance">
                员工业绩汇总:
                <span class="primary-color font-priceF-size">
                    <span>￥</span>
                    <span class="font-priceY-size performance-priceY">{{(toNumber(Sumperformance))[0]}}.</span>
                    <span class=" performance-priceF">{{(toNumber(Sumperformance))[1]}}</span>
                </span>
            </div>
            <div class="push">
                提成:
                <span class="primary-color font-priceF-size">
                    <span>￥</span>
                    <span class="font-priceY-size performance-priceY">{{(toNumber(Sumcommission))[0]}}.</span>
                    <span class=" performance-priceF">{{(toNumber(Sumcommission))[1]}}</span>
                </span>
            </div>
        </div>
        <div class="mainOrder"
             flex=1>
            <!-- 无数据显示 -->
            <div class="errorBox"
                 v-show="!list.length"
                 layout="row"
                 layout-align="center center">
                <m-icon class="ic"
                        xlink="#icon-cuowu"></m-icon>
                <p>亲~抱歉,暂时没有查到数据~</p>
            </div>
            <div style="height:56px;"></div>
            <!-- 列表 -->
            <div class="list"
                 @click.stop="jump(item.orderId)"
                 v-for="(item,index) in list"
                 :key="index">
                <div class="activeInfo">
                    <span class="active"></span>
                    <span class="buyStatus">
                        <span>{{parseInt(item.status) | messageType2}}</span>
                    </span>
                </div>
                <div class="order-count">
                    <span class="overTimeCount"
                          v-show="item.overTimeCount">加钟×{{item.overTimeCount}}</span>
                    <span class="clockCount"
                          v-show="item.clockCount">点钟×{{item.clockCount}}</span>
                </div>
                <div layout="row"
                     :key="index"
                     style="padding:10px 10px 10px 0">
                    <div class="left"
                         style="margin-left:-5px"
                         flex=25
                         layout="column"
                         layout-align="center center">
                        <img class="e-avatar"
                             :src="item.memberAvatarId | mSrc(35, 35, require('assets/imgs/avatar.png'))">
                        <span class="memberName"
                              style="font-size:10px;margin-bottom:4px">{{item.memberName}}</span>
                        <span class="moblie">{{item.mobile}}</span>
                    </div>
                    <div class="right"
                         flex=75
                         layout-align="space-between start">
                        <div layout="row"
                             style="padding-top:11px;width:100%;"
                             layout-align="space-between center">
                            <div layout="row">
                                <span class="memberName"
                                      v-for="(item2,index) in item.itemVoList"
                                      :key="index">{{item2.itemName}}</span>
                            </div>
                            <span class="primary-color font-priceF-size"
                                  id="total-push">
                                <span>￥</span>
                                <span class="font-priceY-size push-priceY">{{item.numbers[0]}}.</span>
                                <span class="push-priceF">{{item.numbers[1]}}</span>
                            </span>
                        </div>
                        <div layout="row"
                             layout-align="space-between center"
                             style="margin-top:19px;font-size:10px;color:#888">
                            <div>业绩:{{item.performance | fen2yuan | currency('￥',2)}}</div>
                            <div>卡耗:{{item.cardConsume | fen2yuan | currency('￥',2)}}</div>
                            <div>提成:{{item.commission | fen2yuan | currency('￥',2)}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="height:56px;"></div>
        </div>
        <div class="breadCrumbs"
             layout="row"
             layout-align="space-around center"
             flex>
            <div layout="row"
                 @click="goback"
                 layout-align="center center"
                 flex=25>
                <m-icon class="ic"
                        xlink="#icon-left-bold"></m-icon>&nbsp;
                <p>返回</p>
            </div>
            <div layout="row"
                 layout-align="center center"
                 flex=25
                 @click="storePickerVisible=true">
                <m-icon class="ic"
                        xlink="#icon-fangzi-copy"></m-icon>&nbsp;
                <p>门店</p>
            </div>
            <div layout="row"
                 @click.stop="link"
                 layout-align="center center"
                 flex=25>
                <m-icon class="ic"
                        xlink="#icon-datezhuanhuan"></m-icon>&nbsp;
                <p>日期</p>
            </div>
            <div layout="row"
                 @click="change"
                 layout-align="center center"
                 flex=25>
                <m-icon class="ic"
                        xlink="#icon-shaixuan"></m-icon>&nbsp;
                <p>筛选</p>
            </div>
        </div>
        <!-- 门店 -->
        <m-picker v-model="storePickerVisible"
                  :slots="slots"
                  :selected-item.sync="selectedStore"
                  value-key="name"
                  @confirm="changeStore">
        </m-picker>
        <!-- 日期 -->
        <mt-actionsheet :actions="actions"
                        v-model="sheetVisible"
                        cancel-text=""></mt-actionsheet>
        <m-date-range-picker v-model="dateRangeVisible"
                             :start-date.sync="vm.timeInterval.startTime"
                             :end-date.sync="vm.timeInterval.endTime"
                             @confirm="changeDateRange"></m-date-range-picker>
        <!-- 筛选 -->
        <m-picker v-model="statusPickerVisible"
                  :slots="status"
                  :selected-item.sync="selectedstatus"
                  value-key="name"
                  @confirm="changestatus"></m-picker>
    </div>
</template>
<script>
import Vue from 'vue';
import apiPerformance from 'services/api.performance';
import mPicker from 'components/m-picker';
import mDateRangePicker from 'components/m-date-range-picker';
import { DatetimePicker, Actionsheet } from 'mint-ui';

Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Actionsheet.name, Actionsheet);
export default {
    name: 'order-list',
    components: {
        mPicker,
        mDateRangePicker
    },
    data() {
        return {
            storePickerVisible: false,
            slots: [],
            selectedStore: {},
            merchantId: this.$store.state.merchant.id,
            store: this.$store.state.storeList,
            storeIds: [],
            list: [],
            actions: [],
            sheetVisible: false,
            dateRangeVisible: false,
            statusPickerVisible: false,
            selectedstatus: {},
            userConfig: {},
            vm: {
                pickerValue: '',
                selectedStoreId: this.$route.query.storeId,
                timeInterval: {
                    startTime: null,
                    endTime: null
                }
            },
            parameter: {
                merchantId: this.$store.getters.merchantId,
                storeIds: JSON.parse(localStorage.getItem('performanceInfo')).performanceStoreIds,
                type: 2,
                size: 10000,
                page: 1,
                employeeId: this.$store.getters.employeeId,
                startTime: null,
                endTime: null,
                orderStatus: JSON.parse(localStorage.getItem('performanceInfo')).orderStatus
            },
            status: [
                {
                    values: [
                        {
                            name: '全部'
                        },
                        {
                            name: '尾款',
                            orderStatus: '40'
                        },
                        {
                            name: '退单',
                            orderStatus: '61'
                        },
                        {
                            name: '补卡',
                            orderStatus: '70'
                        },
                        {
                            name: '已付款',
                            orderStatus: '20'
                        },
                        {
                            name: '待付款',
                            orderStatus: '12,11,13'
                        }
                    ],
                    className: 'slot1',
                    textAlign: 'center',
                    defaultIndex: 0
                }
            ]
        };
    },
    mounted() {
        this.selectedStore = null;
        this.selectedstatus = null;
        this.vm.timeInterval.startTime = JSON.parse(localStorage.getItem('performanceInfo')).startDate;
        this.vm.timeInterval.endTime = JSON.parse(localStorage.getItem('performanceInfo')).endDate;
        for (let i = 0; i < this.store.length; i++) {
            this.storeIds.push(this.store[i].id);
        }
        let tempIndex = 0;
        var tempStores = [];
        this.$knife.deepCopy(this.$store.state.storeList, tempStores);
        let tempStoreIds = [];
        tempStores.map((item, index) => {
            tempStoreIds.push(item.id);
        });
        if (tempStores.length > 1) {
            tempStores.unshift({
                id: tempStoreIds.join(','),
                name: '全部门店'
            });
        }
        this.slots.push({
            flex: 1,
            values: tempStores,
            className: 'slot1',
            textAlign: 'center',
            defaultIndex: tempIndex
        });
        let tempFormat = 'YYYY-MM-DD HH:mm:ss';
        this.actions = [
            {
                name: '今日',
                method: this.selectedDateRange,
                value: {
                    startTime: this.$moment()
                        .startOf('day')
                        .format(tempFormat),
                    endTime: this.$moment()
                        .endOf('day')
                        .format(tempFormat)
                }
            },
            {
                name: '昨日',
                method: this.selectedDateRange,
                value: {
                    startTime: this.$moment()
                        .subtract(1, 'days')
                        .startOf('days')
                        .format(tempFormat),
                    endTime: this.$moment()
                        .subtract(1, 'days')
                        .endOf('days')
                        .format(tempFormat)
                }
            },
            {
                name: '本月',
                method: this.selectedDateRange,
                value: {
                    startTime: this.$moment()
                        .startOf('month')
                        .format(tempFormat),
                    endTime: this.$moment()
                        .endOf('month')
                        .format(tempFormat)
                }
            },
            {
                name: '自定义',
                method: this.selectedDateRange
            }
        ];
        this.messageOrderList(this.parameter);
    },
    beforeRouteEnter(to, from, next) {
        if (from.name == 'order-detail') {
            let data = JSON.parse(localStorage.getItem('userConfig'));
            let config = {
                startDate: data.startDate,
                endDate: data.endDate,
                dataType: JSON.parse(localStorage.getItem('performanceInfo')).dataType,
                performanceStoreIds: data.storeIds,
                orderStatus: data.selectedstatus
            };
            var str = JSON.stringify(config);
            localStorage.setItem('performanceInfo', str);
            next(vm => {
                vm.parameter = {
                    merchantId: vm.$store.getters.merchantId,
                    type: 2,
                    size: 10000,
                    page: 1,
                    employeeId: vm.$store.getters.employeeId,
                    startTime: data.startDate,
                    endTime: data.endDate,
                    orderStatus: data.orderStatus,
                    storeIds: data.storeIds
                };
            });
        }
        next();
    },
    methods: {
        goback() {
            this.$router.go(-1);
        },
        changeStore(item) {
            this.selectedStore = item[0];
            this.resetSreach();
        },
        resetSreach() {
            this.messageOrderList();
        },
        changestatus(item) {
            this.selectedstatus = item[0];
            this.resetSreach();
        },
        changeDateRange(start, end) {
            this.vm.timeInterval = {
                startTime: this.$moment(start).format('YYYY-MM-DD HH:mm:ss'),
                endTime: this.$moment(end).format('YYYY-MM-DD HH:mm:ss')
            };
            this.resetSreach();
        },
        selectedDateRange(item) {
            var tempItem = item.value;
            if (tempItem) {
                this.vm.timeInterval = tempItem;
                this.resetSreach();
            } else {
                this.dateRangeVisible = true;
            }
        },
        messageOrderList(data) {
            this.userConfig = {
                dataType: JSON.parse(localStorage.getItem('performanceInfo')).dataType,
                storeIds: JSON.parse(localStorage.getItem('performanceInfo')).performanceStoreIds,
                endDate: JSON.parse(localStorage.getItem('performanceInfo')).endDate,
                startDate: JSON.parse(localStorage.getItem('performanceInfo')).startDate
            };
            if (this.$store.getters.admin == true) {
                this.parameter.type = 1;
            }
            if (this.selectedStore) {
                this.parameter.storeIds = this.selectedStore.id;
                this.userConfig.storeIds = this.selectedStore.id;
            }
            if (this.selectedstatus) {
                this.parameter.orderStatus = this.selectedstatus.orderStatus;
                this.userConfig.selectedstatus = this.selectedstatus.orderStatus;
            }
            if (this.vm.timeInterval.startTime) {
                this.parameter.startTime = this.vm.timeInterval.startTime;
                this.userConfig.startDate = this.vm.timeInterval.startTime;
            }
            if (this.vm.timeInterval.endTime) {
                this.parameter.endTime = this.vm.timeInterval.endTime;
                this.userConfig.endDate = this.vm.timeInterval.endTime;
            }
            let str = JSON.stringify(this.userConfig);
            localStorage.setItem('userConfig', str);
            this.$indicator.open();
            apiPerformance.getPerformance(this.parameter).then(
                res => {
                    this.$indicator.close();
                    this.list = res.data.orderListVo || [];
                    this.list.forEach(val => {
                        val.numbers = this.toNumber(val.realReceivableMoney);
                    });
                },
                erro => {
                    console.log('error');
                }
            );
        },
        toNumber(val) {
            return Vue.filter('fen2yuan')(val).split('.');
        },
        link() {
            this.sheetVisible = true;
        },
        openPicker() {
            this.$refs.picker.open();
        },
        change() {
            this.statusPickerVisible = true;
        },
        jump(val) {
            this.$router.push('/order-detail/' + val);
        }
    },
    computed: {
        // 业绩汇总
        Sumperformance() {
            var sum = 0;
            for (var Sperformance in this.list) {
                sum += this.list[Sperformance].performance;
            }
            return sum;
        },
        // 提成汇总
        Sumcommission() {
            var sum = 0;
            for (var Scommission in this.list) {
                sum += this.list[Scommission].commission;
            }
            return sum;
        }
    }
};
</script>

<style lang="less">
@import '~@/styles/_agile';
body,
html {
    background: #f4f4fc;
    margin: auto;
}
.order-list {
    position: relative;
}
.headerPerformance9 {
    position: fixed;
    top: 0;
    background: @white;
    width: 100%;
    height: 56px;
    margin: auto;
    padding: 0 15px;
    color: @extra-black;
    box-shadow: 0 0 5px rgba(102, 102, 102, 0.1);
    .performance,
    .push {
        font-size: 14px;
    }
    span {
        color: @color-primary;
    }
    .font-priceY-size {
        font-size: 18px;
    }
}
.mainOrder {
    overflow: auto;
    background: #f4f4fc;
    .errorBox {
        width: 100%;
        height: 400px;
        line-height: 400px;
        color: #8c8c8c;
        .ic {
            font-size: 23px;
        }
        p {
            font-size: 15px;
        }
    }
    .list {
        height: 89px;
        background: @white;
        margin: auto;
        border-bottom: 1px solid #e5e5e5; /*no*/
        margin: 8px;
        position: relative;
        overflow: hidden;
        .activeInfo {
            position: absolute;
            left: 0;
            top: 0;
            .active {
                width: 0;
                height: 0;
                border-top: 34px solid @color-primary;
                border-right: 34px solid transparent;
                position: absolute;
            }
            .buyStatus {
                color: #fff;
                position: absolute;
                font-size: 10px;
                left: -1px;
                -webkit-transform: rotate(-45deg);
                transform: rotate(-45deg);
                display: block;
                width: 30px;
            }
        }
        .order-count {
            position: absolute;
            top: 0;
            right: 0;
            font-size: 10px;
            color: @white;
            .overTimeCount {
                background: #13a59e;
                padding: 2px;
                margin-left: 2px;
            }
            .clockCount {
                background: #eeab03;
                padding: 2px;
                margin-left: 2px;
            }
        }
        .left {
            border-right: 1px dotted #eaeaea; /*no*/
            .e-avatar {
                width: 35px;
                height: 35px;
                border-radius: 50%;
            }
            .memberName {
                font-size: 12px;
            }
            .moblie {
                font-size: 12px;
            }
        }
        .right {
            margin-left: 11px;
            .memberName {
                font-size: 12px;
            }
            .primary-color {
                color: @color-primary;
            }
            .font-priceY-size {
                font-size: 19px;
            }
        }
    }
}
.breadCrumbs {
    background: #f4f4fc;
    position: fixed;
    bottom: 0;
    height: 56px;
    width: 100%;
    border-top: 1px solid #eaeaea;
    div:not(:last-child) {
        border-right: 1px solid #eaeaea; /*no*/
    }
    div {
        color: #4ed9cf;
        font-size: 14px;
        height: 56px;
    }
}
</style>
