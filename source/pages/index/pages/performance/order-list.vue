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
                    <span class="font-priceY-size performance-priceY">
                        {{ Sumperformance | fen2yuan | currency('￥',2)}}
                    </span>
                    <span class=" performance-priceF"></span>
                </span>
            </div>
            <div class="push">
                提成:
                <span class="primary-color font-priceF-size">
                    <span class="font-priceY-size performance-priceY">
                        {{ Sumcommission | fen2yuan | currency('￥',2)}}
                    </span>
                    <span class=" performance-priceF"></span>
                </span>
            </div>
        </div>
        <div class="main"
             flex=1>
            <!-- 无数据显示 -->
            <div class="errorBox"
                 v-show="list.length<1"
                 layout="row"
                 layout-align="center center">
                <m-icon class="ic"
                        xlink="#icon-cuowu"></m-icon>
                <p>亲~抱歉,暂时没有查到数据~</p>
            </div>
            <div style="height:9vh;"></div>
            <!-- 列表 -->
            <div class="list"
                 v-for="(item,index) in list"
                 :key="index">
                <div class="activeInfo">
                    <span class="active"></span>
                    <span class="buyStatus">
                        <span>待付</span>
                    </span>
                </div>
                <div layout="row"
                     v-for="item2 in item.itemVoList"
                     :key="item2.itemId"
                     style="padding:10px 10px 10px 0">
                    <div class="left"
                         flex=25
                         layout="column"
                         layout-align="center center">
                        <img class="e-avatar"
                             :src="item.memberAvatarId | mSrc(75, 75, require('assets/imgs/avatar.png'))">
                        <span class="memberName">{{item.memberName}}</span>
                        <span class="moblie">{{item.mobile}}</span>
                    </div>
                    <div class="right"
                         flex=75
                         layout-align="space-between start">
                        <div layout="row"
                             style="padding-top:11px;width:100%;"
                             layout-align="space-between center">
                            <div layout="column">
                                <span class="memberName">{{item2.itemName}}</span>
                            </div>
                            <span class="primary-color font-priceF-size"
                                  id="total-push">
                                <span class="font-priceY-size push-priceY">{{item.realReceivableMoney | fen2yuan | currency('￥',2)}}</span>
                                <!-- <span class="push-priceF">{{(item.realReceivableMoney%100)}}</span> -->
                            </span>
                        </div>
                        <div layout="row"
                             layout-align="space-between center"
                             style="margin-top:19px;font-size:0.2rem;color:#888">
                            <div>业绩:{{item.performance | fen2yuan | currency('￥',2)}}</div>
                            <div>卡耗:{{item.cardConsume | fen2yuan | currency('￥',2)}}</div>
                            <div>提成:{{item.commission | fen2yuan | currency('￥',2)}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="height:9vh;"></div>
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
                        xlink="#icon-qia-"></m-icon>&nbsp;
                <p>返回</p>
            </div>
            <div layout="row"
                 layout-align="center center"
                 flex=25
                 @click="storePickerVisible=true">
                <m-icon class="ic"
                        xlink="#icon-qia-"></m-icon>&nbsp;
                <p>门店</p>
            </div>
            <div layout="row"
                 layout-align="center center"
                 flex=25>
                <m-icon class="ic"
                        xlink="#icon-qia-"></m-icon>&nbsp;
                <p>日期</p>
            </div>
            <div layout="row"
                 layout-align="center center"
                 flex=25>
                <m-icon class="ic"
                        xlink="#icon-qia-"></m-icon>&nbsp;
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
        <m-date-range-picker v-model="dateRangeVisible"
                             :start-date.sync="vm.timeInterval.startTime"
                             :end-date.sync="vm.timeInterval.startTime"
                             @confirm="changeDateRange"></m-date-range-picker>
    </div>
</template>
<script>
import apiPerformance from 'services/api.performance';
import mPicker from 'components/m-picker';
import mDateRangePicker from 'components/m-date-range-picker';
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
            dateRangeVisible: false,
            vm: {
                timeInterval: {
                    startTime: this.$route.params.startDate,
                    endTime: this.$route.params.endDate
                }
            }
        };
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
            this.page = 1;
            this.dataList = [];
            this.messageOrderList();
        },
        messageOrderList() {
            let self = this;
            let parameter = {
                merchantId: this.$store.getters.merchantId,
                storeIds: self.storeIds.join(','),
                type: 2,
                size: 10000,
                page: 1,
                employeeId: this.$store.getters.employeeId,
                startTime: this.$moment()
                    .startOf('day')
                    .format('YYYY-MM-DD HH:mm:ss'),
                endTime: this.$moment()
                    .endOf('day')
                    .format('YYYY-MM-DD HH:mm:ss')
            };
            if (self.selectedStore) {
                parameter.storeIds = self.selectedStore.id;
            }
            if (self.vm.timeInterval.startTime) {
                parameter.startTime = self.vm.timeInterval.startTime;
            }
            if (self.vm.timeInterval.endTime) {
                parameter.endTime = self.vm.timeInterval.endTime;
            }
            this.$indicator.open();
            apiPerformance.getPerformance(parameter).then(
                res => {
                    this.$indicator.close();
                    this.list = res.data.orderListVo;
                },
                erro => {
                    console.log('error');
                }
            );
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
        }
    },
    mounted() {
        this.selectedStore = null;
        this.selectedstatus = null;
        this.vm.timeInterval.startDate = null;
        this.vm.timeInterval.endDate = null;
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
                name: '本周',
                method: this.selectedDateRange,
                value: {
                    startTime: this.$moment()
                        .startOf('isoWeek')
                        .format(tempFormat),
                    endTime: this.$moment()
                        .endOf('isoWeek')
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
    .performance,
    .push {
        font-size: 14px;
    }
    span {
        color: @color-primary;
    }
    .font-priceY-size {
        font-size: 0.5rem;
    }
}
.main {
    overflow: auto;
    background: #f4f4fc;
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
                font-size: 0.1rem;
                left: -1px;
                -webkit-transform: rotate(-45deg);
                transform: rotate(-45deg);
                display: block;
                width: 30px;
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
                font-size: 0.4rem;
            }
            .moblie {
                font-size: 0.3rem;
            }
        }
        .right {
            margin-left: 11px;
            .memberName {
                font-size: 0.3rem;
            }
            .primary-color {
                color: @color-primary;
            }
            .font-priceY-size {
                font-size: 0.5rem;
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
        font-size: 0.5rem;
        height: 56px;
    }
}
</style>
