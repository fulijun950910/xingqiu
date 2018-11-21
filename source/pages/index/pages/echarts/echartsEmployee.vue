<template>
    <div class="echartsEmployee"
         v-title='"员工业绩分析"'>
        <div class="orderEmployeeData-box">
            <div class="listData">
                <div class="dataItem"
                     v-for="(item,index) in list"
                     :key="index"
                     layout="row"
                     @click="jump(item.employeeId)"
                     layout-align="space-between center">
                    <div class="img">
                        <img :src="item.employeeImageId | mSrc(35, 35, require('assets/imgs/avatar.png'))">
                    </div>
                    <div class="Itemright"
                         layout="row"
                         layout-align="space-between center"
                         flex>
                        <div class="EmployeeInfo"
                             layout="column"
                             flex="25">
                            <span class="name">{{item.employeeName}}</span>
                            <span>No.{{index+1}}</span>
                        </div>
                        <div class="amount"
                             flex="50"
                             layout="column">
                            <span>
                                <span>业绩:</span>
                                <span class="Pcolor">
                                    <span>￥</span>
                                    <span class="Psize">{{(toNumber(item.achievementTotalAmount))[0]}}</span>
                                    <span>.{{(toNumber(item.achievementTotalAmount))[1]}}</span>
                                </span>
                            </span>
                            <span>
                                <span>卡耗:</span>
                                <span class="Pcolor">
                                    <span>￥</span>
                                    <span class="Psize">{{(toNumber(item.cardConsumeTotalAmount))[0]}}</span>
                                    <span>.{{(toNumber(item.cardConsumeTotalAmount))[1]}}</span>
                                </span>
                            </span>
                        </div>
                        <div class="amount"
                             layout="column"
                             flex=20>
                            <span style="white-space:nowrap">
                                <span>客数:</span>
                                <span class="Psize Pcolor">{{item.serviceMemberCount + item.serviceUnMemberCount}}</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div style="height:56px;"></div>
            </div>
            <div class="errorBox"
                 v-show="!list.length"
                 layout="row"
                 layout-align="center center">
                <m-icon class="ic"
                        xlink="#icon-cuowu"></m-icon>
                <p>亲~,该门店还没有员工哦</p>
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
    </div>
</template>

<script>
import Vue from 'vue';
import apiEmployee from 'services/api.echartsProduct';
import mPicker from 'components/m-picker';
import mDateRangePicker from 'components/m-date-range-picker';
import { DatetimePicker, Actionsheet } from 'mint-ui';

Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Actionsheet.name, Actionsheet);
export default {
    name: 'echartsEmployee',
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
            vm: {
                pickerValue: '',
                selectedStoreId: this.$route.query.storeId,
                timeInterval: {
                    startDate: null,
                    endDate: null,
                    storeId: null
                }
            },
            status: [
                {
                    values: [
                        {
                            name: '业绩从高到低',
                            orderBy: 1,
                            orderByType: 'desc'
                        },
                        {
                            name: '业绩从低到高',
                            orderBy: 1,
                            orderByType: 'asc'
                        },
                        {
                            name: '卡耗从高到低',
                            orderBy: 2,
                            orderByType: 'desc'
                        },
                        {
                            name: '卡耗从低到高',
                            orderBy: 2,
                            orderByType: 'asc'
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
        this.selectedstatus = { orderBy: null, orderByType: null };
        this.vm.timeInterval.startDate = JSON.parse(localStorage.getItem('performanceInfo')).startDate;
        this.vm.timeInterval.endDate = JSON.parse(localStorage.getItem('performanceInfo')).endDate;
        this.selectedstatus.orderBy = 1;
        this.selectedstatus.orderByType = 'desc';
        for (let i = 0; i < this.store.length; i++) {
            this.storeIds.push(this.store[i].id);
        }

        this.vm.timeInterval.storeId = JSON.parse(localStorage.getItem('performanceInfo')).performanceStoreIds;

        let tempIndex = 0;
        var tempStores = [];
        this.$knife.deepCopy(this.$store.state.storeList, tempStores);
        if (this.$store.getters.permissionStoreAll) {
            tempStores.unshift({
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
                    startDate: this.$moment()
                        .startOf('day')
                        .format(tempFormat),
                    endDate: this.$moment()
                        .endOf('day')
                        .format(tempFormat)
                }
            },
            {
                name: '昨日',
                method: this.selectedDateRange,
                value: {
                    startDate: this.$moment()
                        .subtract(1, 'days')
                        .startOf('days')
                        .format(tempFormat),
                    endDate: this.$moment()
                        .subtract(1, 'days')
                        .endOf('days')
                        .format(tempFormat)
                }
            },
            {
                name: '本月',
                method: this.selectedDateRange,
                value: {
                    startDate: this.$moment()
                        .startOf('month')
                        .format(tempFormat),
                    endDate: this.$moment()
                        .endOf('month')
                        .format(tempFormat)
                }
            },
            {
                name: '自定义',
                method: this.selectedDateRange
            }
        ];
        this.messageOrderList();
    },
    methods: {
        goback() {
            this.$router.go(-1);
        },
        changeStore(item) {
            this.selectedStore = item[0];
            if (!this.selectedStore) {
                this.vm.timeInterval.storeId = undefined;
            }
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
                startDate: this.$moment(start).format('YYYY-MM-DD HH:mm:ss'),
                endDate: this.$moment(end).format('YYYY-MM-DD HH:mm:ss'),
                storeId: JSON.parse(localStorage.getItem('performanceInfo')).performanceStoreIds
            };
            this.resetSreach();
        },
        selectedDateRange(item) {
            var tempItem = item.value;
            if (tempItem) {
                this.vm.timeInterval = tempItem;
                this.vm.timeInterval.storeId = JSON.parse(localStorage.getItem('performanceInfo')).performanceStoreIds;
                this.resetSreach();
            } else {
                this.dateRangeVisible = true;
            }
        },
        messageOrderList() {
            let data = JSON.parse(localStorage.getItem('performanceInfo'));
            // 创建sessionStorage
            var parameter = {
                merchantId: this.$store.getters.merchantId
            };
            let Storage = {
                startDate: data.startDate,
                endDate: data.endDate,
                orderBy: 1,
                orderByType: 'desc',
                merchantId: this.$store.getters.merchantId,
                storeId: data.performanceStoreIds
            };

            if (this.vm.timeInterval.storeId == this.storeIds.join(',')) {
                parameter.storeId = (this.storeIds.join(',').split(','))[0];
            } else {
                parameter.storeId = this.vm.timeInterval.storeId;
            }
            if (this.selectedStore) {
                parameter.storeId = this.selectedStore.id;
                Storage.storeId = this.selectedStore.id;
            }
            if (this.selectedstatus) {
                parameter.orderBy = this.selectedstatus.orderBy;
                parameter.orderByType = this.selectedstatus.orderByType;
                Storage.orderBy = this.selectedstatus.orderBy;
                Storage.orderByType = this.selectedstatus.orderByType;
            }
            if (this.vm.timeInterval.startDate) {
                parameter.startDate = this.vm.timeInterval.startDate;
                Storage.startDate = this.vm.timeInterval.startDate;
            }
            if (this.vm.timeInterval.endDate) {
                parameter.endDate = this.vm.timeInterval.endDate;
                Storage.endDate = this.vm.timeInterval.endDate;
            }
            let str = JSON.stringify(Storage);
            sessionStorage.setItem('employeeParam', str);
            this.$indicator.open();
            try {
                this.parameter.startDate = data.startDate;
                this.parameter.endDate = data.endDate;
                this.parameter.storeId = data.performanceStoreIds;
            } catch (error) {}
            apiEmployee.getEchartsEmployee(parameter).then(
                res => {
                    this.$indicator.close();
                    this.list = res.data.rows || [];
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
            this.$router.push('/employeeCharts/' + val);
        }
    }
};
</script>

<style lang="less" scoped>
@import '~@/styles/_agile';
.orderEmployeeData-box {
    .errorBox {
        width: 100%;
        height: 300px;
        line-height: 300px;
        color: #8c8c8c;
        .ic {
            font-size: 23px;
        }
        p {
            font-size: 15px;
        }
    }
    height: 100%;
    min-height: 800px;
    overflow: scroll;
    background: @white;
    .listData {
        width: 95%;
        margin: auto;
        .dataItem {
            text-align: center;
            color: #666;
            .img > img {
                width: 49px;
                height: 49px;
                border-radius: 50%;
            }
            .Itemright {
                border-bottom: 1px solid #e5e5e5; /*no*/
                padding: 11px 0;
                margin-left: 12px;
                .EmployeeInfo {
                    text-align: left;
                }
                .name {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    color: black;
                    font-size: 13.5px;
                }
                .amount {
                    text-align: left;
                    .Pcolor {
                        color: @color-primary;
                    }
                    .Psize {
                        font-size: 18px;
                    }
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
}
</style>
