<template>
    <div v-title="'服务数据统计'" class="data-view min-height-100">
        <div class="header">
            <p class="text-center fs32 extra-light-black">{{selectedStore.name}}</p>
            <div layout="row" layout-align="center center" class="fs28 color-gray">
                <p class="mr-40">{{query.startDate | amDateFormat('YYYY-MM-DD')}}</p>
                <p>{{query.endDate | amDateFormat('YYYY-MM-DD')}}</p>
            </div>
        </div>
        <span class="ml-40 h-line"></span>
        <div layout="row" class="pie-panel">
            <div flex="50" layout="row" layout-align="center center" class="pie text-center">
                <img :src="require('assets/imgs/huan.png')">
                <span class="vh-center fs40 text-center color-primary fwb ff-number">{{showModel.concernCount | currency('', 0)}}<br>
                    <span class="fs20 steel-gray">条</span>
                </span>
            </div>
            <div flex="50" class="text-right">
                <p class="fs32 mb-32 fwb extra-light-black">客户关怀 条数</p>
                <p class="dark-gray">记录所有员工主动联系</p>
                <p class="mb-24 dark-gray">客户后的备注</p>
                <button class="check-btn" @click="memberList">查看</button>
            </div>
        </div>
        <span class="ml-40 h-line"></span>
        <div layout="row" layout-align="space-between center" class="record fs32">
            <p class="extra-light-black">
                <m-icon xlink="#icon-fuwu"></m-icon>
                全部服务数
            </p>
            <p class="color-primary fwb ff-number">{{showModel.allCount | currency('', 0)}}</p>
        </div>
        <div layout="row" layout-align="space-around center" class="link-panel">
            <div class="link-btn no-line-panel">
                <p>
                    <m-icon xlink="#icon-yipingjia"></m-icon>
                    {{showModel.recordCount | currency('', 0)}}
                </p>
                <p>已记录</p>
            </div>
            <div class="link-btn" @click="$router.push({name:'unrecorded-service-list', query: query})">
                <p>
                    <m-icon xlink="#icon-weipingjia"></m-icon>
                    {{showModel.waitCount | currency('', 0)}}
                </p>
                <p layout="row" layout-align="space-between center">
                    未记录
                    <m-icon xlink="#icon-right-bold"></m-icon>
                </p>
            </div>
        </div>
        <bottom-menu class="bottom-menu" @click="toolbarClick" :flex="1" :click-able="clickAble"></bottom-menu>
        <m-picker v-model="storePickerVisible" :slots="slots" :selected-item.sync="selectedStore" value-key="name" @confirm="changeStore"></m-picker>
        <mt-actionsheet :actions="actions" v-model="sheetVisible" cancel-text=""></mt-actionsheet>
        <m-date-range-picker v-model="dateRangeVisible" :start-date.sync="query.startDate" :end-date.sync="query.endDate" @confirm="changeDateRange"></m-date-range-picker>
    </div>
</template>
<script>
import Vue from 'vue';
import {
    Actionsheet,
    Popup,
    Picker
} from 'mint-ui';

Vue.component(Popup.name, Popup);
Vue.component(Picker.name, Picker);
Vue.component(Actionsheet.name, Actionsheet);
import mPicker from 'components/m-picker';
import bottomMenu from 'components/bottom-menu';
import api_service_note from 'services/api.serviceNote';
import mDateRangePicker from 'components/m-date-range-picker';

export default {
    name: 'data-view',
    components: {
        mPicker,
        bottomMenu,
        mDateRangePicker
    },
    data() {
        return {
            slots: [],
            query: {
                merchantId: this.$store.getters.merchantId,
                storeIds: this.$store.getters.storeIds,
                employeeId: this.$store.state.user.id,
                startDate: '',
                endDate: '',
                status: 2
            },
            actions: [],
            selectedStore: {},
            sheetVisible: false,
            dateRangeVisible: false,
            storePickerVisible: false,
            showModel: {
                allCount: 0,
                concernCount: 0,
                recordCount: 0,
                waitCount: 0
            },
            clickAble: [{
                name: '返回',
                value: '1',
                icon: '#icon-left-bold'
            }, {
                name: '门店',
                value: '2',
                icon: '#icon-fangzi-copy'
            }, {
                name: '时间',
                value: '3',
                icon: '#icon-shijian'
            }]
        };
    },
    mounted() {
        var tempStores = [];
        this.$knife.deepCopy(this.$store.state.storeList, tempStores);
        if (tempStores.length > 1) {
            tempStores.unshift({
                id: this.$store.getters.storeIds,
                name: '全部门店'
            });
        }
        var tempIndex = 0;
        if (tempStores.length) {
            tempStores.forEach((val, index) => {
                if (val.id == this.query.storeIds) {
                    tempIndex = index;
                    this.selectedStore = val;
                }
            });
            if (!this.selectedStore || !this.selectedStore.name) {
                this.selectedStore = tempStores[0];
            }
        }
        this.slots.push({
            flex: 1,
            values: tempStores,
            className: 'slot1',
            textAlign: 'center',
            defaultIndex: tempIndex
        });
        var tempFormat = 'YYYY-MM-DD HH:mm:ss';
        this.actions = [{
            name: '今日',
            method: this.selectedDateRange,
            value: {
                startDate: this.$moment().startOf('day').format(tempFormat),
                endDate: this.$moment().endOf('day').format(tempFormat)
            }
        }, {
            name: '本周',
            method: this.selectedDateRange,
            value: {
                startDate: this.$moment().startOf('isoWeek').format(tempFormat),
                endDate: this.$moment().endOf('isoWeek').format(tempFormat)
            }
        }, {
            name: '本月',
            method: this.selectedDateRange,
            value: {
                startDate: this.$moment().startOf('month').format(tempFormat),
                endDate: this.$moment().endOf('month').format(tempFormat)
            }
        }, {
            name: '自定义',
            method: this.selectedDateRange
        }];
        this.selectedDateRange(this.actions[0]);
    },
    methods: {
        loadData() {
            this.$indicator.open();
            api_service_note.queryStatistics(this.getQuery()).then(res => {
                this.showModel = res.data;
                this.$indicator.close();
            });
        },
        getQuery() {
            return this.query;
        },
        resetQuery() {
            this.query.page = 1;
            this.scrollDisabled = false;
            this.dataList = [];
        },
        selectedDateRange(item) {
            if (item.value) {
                this.query.startDate = item.value.startDate;
                this.query.endDate = item.value.endDate;
                this.loadData();
            } else {
                this.dateRangeVisible = true;
            }
        },
        changeStore(item) {
            this.selectedStore = item[0];
            this.loadData();
        },
        changeDateRange() {
            this.loadData();
        },
        memberList() {
            this.$router.push({
                name: 'return-visit-ranking-list',
                query: {
                    storeIds: this.query.storeIds,
                    startDate: this.query.startDate,
                    endDate: this.query.endDate
                }
            });
        },
        toolbarClick(index, item) {
            switch (item.value) {
                case '1':
                    this.$router.go(-1);
                    break;
                case '2':
                    if (this.$store.state.storeList.length > 1) {
                        this.storePickerVisible = true;
                    } else {
                        this.$toast('无可切换门店');
                    }
                    break;
                case '3':
                    this.sheetVisible = true;
                    break;
            }
        }
    }
};
</script>
<style lang="less">
@import '~styles/_agile';
.data-view {
    background-color: @white;
    padding-bottom: 49 + @l40;
    .header {
        padding-top: @l40;
        padding-bottom: @l40;
    }
    .pie-panel {
        padding: @l8 * 8 @l8 * 6 @l8 * 8 @l40;
        .pie {
            height: 130px;
            position: relative;
            img {
                left: 50%;
                z-index: 1;
                width: 130px;
                height: 130px;
                position: absolute;
                margin-left: -130px / 2;
            }
            .vh-center {
                max-width: 130px;
                line-height: 1;
            }
        }
        .check-btn {
            color: @white;
            width: @l8 * 20;
            font-size: @fs28;
            line-height: @l8 * 8;
            border-radius: @l8 * 2.5;
            background-color: @color-tiffany-blue;
        }
    }
    .record {
        padding: @l40 @l8 * 6 130px / 2 @l8 * 6;
        .top-penel {
            padding-top: @l40;
        }
    }
    .link-panel {
        p:first-child {
            font-size: @fs28;
            margin-bottom: @l8;
            color: @extra-light-black;
            .icon {
                color: @color-primary-dark;
            }
        }
        :nth-child(2) {
            color: @gray;
            font-size: @fs24;
            .icon {
                color: @gray;
            }
        }
        .link-btn {
            width: 268px / 2;
            padding: @l24 @l32;
            border-radius: 10px;
            border: 1px solid #E8E8E8;
            /*no*/
            box-shadow: 0 2px 4px 0 rgba(221, 221, 221, 0.5);
        }
    }
    .no-line-panel {
        p:first-child .icon {
            color: @color-tiffany-blue;
        }
    }
    .bottom-menu {
        z-index: 999;
    }
    .mr-40 {
        margin-right: @l40;
    }
    .ml-40 {
        margin-left: @l40;
    }
    .mb-32 {
        margin-bottom: @l32;
    }
    .mb-24 {
        margin-bottom: @l24;
    }
}
</style>
