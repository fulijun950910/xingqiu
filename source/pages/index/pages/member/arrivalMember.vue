<template>
    <div class="arrivalMember" v-title="'到店客人'">
        <div class="errorBox"
                v-show="!list.length"
                layout="row"
                layout-align="center center">
            <m-icon class="ic"
                    xlink="#icon-cuowu"></m-icon>
            <p>亲~,还没有到店会员哦~</p>
        </div>
        <div class="data-list">
            <div class="financial-item" v-for="(item,index) in list" :key="index">
                <div layout="row" layout-align="space-between center">
                    <div layout="row" flex=75 layout-align="start center">
                        <div class="logo" layout="row" layout-align="center center">
                            <img class="memberImg" @click="jump(item.memberId, item.name)"
                             :src="item.avatarId | mSrc(35, 35, require('assets/imgs/avatar.png'))">
                        </div>
                        <div class="info" layout="column" layout-align="space-around start">
                            <div layout="row" style="color:#333;font-size:13px">
                                <span class="name" flex >{{item.name}}</span>
                                <span class="phone">{{item.mobile}}</span>
                                <m-icon v-show="item.gender==1" class="ic" style="color:#4ed9cf" xlink="#icon-nan"></m-icon>
                                <m-icon v-show="item.gender==2" class="ic" style="color:#f7398f" xlink="#icon-nv"></m-icon>
                            </div>
                            <span v-show="item.memberSource">来源:{{item.memberSource}}</span>
                            <div v-show="item.consumeDate">{{item.consumeDate}}</div>
                        </div>
                    </div>
                    <div layout="column">
                        <div layout="column" v-show="item.memberId==-1">
                            <span>到店总人数</span>
                            <span class="primary-color" style="text-align:center">{{item.guestCount}}</span>
                        </div>
                        <div v-show="item.memberId!=-1 && item.hasCard!=2" style="font-size:16px;top:30%;position:absolute;right:30px">无卡</div>
                        <div layout="column" v-show="item.hasCard==2">
                            <span style="text-align:center;font-size:12px">卡内余额</span>
                            <span class="primary-color" style="text-align:left" flex=28>
                                <span>￥</span>
                                <span style="font-size:18px">{{(toNumber(item.cardBalance))[0] | currency('', 0)}}.</span>
                                <span>{{(toNumber(item.cardBalance))[1]}}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div style="height:56px"></div>
        </div>
        <div class="breadCrumbs"
             layout="row"
             layout-align="space-around center"
             flex>
            <div layout="row"
                 @click="goback"
                 layout-align="center center"
                 flex=33>
                <m-icon class="ic"
                    xlink="#icon-left-bold"></m-icon>&nbsp;
                <p>返回</p>
            </div>
            <div layout="row"
                 layout-align="center center"
                 flex=33
                 @click="storePickerVisible=true">
                <m-icon class="ic"
                    xlink="#icon-fangzi-copy"></m-icon>&nbsp;
                <p>门店</p>
            </div>
            <div layout="row"
                 @click.stop="link"
                 layout-align="center center"
                 flex=33>
                <m-icon class="ic"
                    xlink="#icon-datezhuanhuan"></m-icon>&nbsp;
                <p>日期</p>
            </div>
        </div>
        <!-- 门店 -->
        <m-picker v-model="storePickerVisible"
            :slots="slots"
            :selected-item.sync="selectedStore"
            value-key="name"
            ref="storePicker"
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
    </div>
</template>

<script>
import Vue from 'vue';
import mPicker from 'components/m-picker';
import mDateRangePicker from 'components/m-date-range-picker';
import { DatetimePicker, Actionsheet } from 'mint-ui';
import apiArrivalMember from 'services/api.member';

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
            userConfig: {},
            vm: {
                timeInterval: {
                    startDate: null,
                    endDate: null
                }
            },
            parameter: {
                merchantId: this.$store.getters.merchantId,
                storeIds: JSON.parse(localStorage.getItem('performanceInfo')).performanceStoreIds,
                startDate: JSON.parse(localStorage.getItem('performanceInfo')).startDate,
                endDate: JSON.parse(localStorage.getItem('performanceInfo')).endDate
            }
        };
    },
    mounted() {
        this.selectedStore = null;
        for (let i = 0; i < this.store.length; i++) {
            this.storeIds.push(this.store[i].id);
        }
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
        let tempIndex = 0;
        tempIndex = tempStores.findIndex(val => val.id == this.parameter.storeIds);
        if (tempIndex === -1) {
            tempIndex = 0;
        }
        this.slots.push({
            flex: 1,
            values: tempStores,
            className: 'slot1',
            textAlign: 'center',
            defaultIndex: tempIndex
        });
        this.$nextTick(_ => {
            setTimeout(() => {
                this.$refs.storePicker.$refs.m_picker.setValues([tempStores[tempIndex]]);
            }, 0);
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
        this.GetMemberList();
    },
    beforeRouteEnter(to, from, next) {
        if (from.name == 'memberDetail') {
            let data = JSON.parse(localStorage.getItem('userConfig'));
            let config = {
                startDate: data.startDate,
                endDate: data.endDate,
                dataType: JSON.parse(localStorage.getItem('performanceInfo')).dataType,
                performanceStoreIds: data.storeIds
            };
            var str = JSON.stringify(config);
            localStorage.setItem('performanceInfo', str);
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
            this.GetMemberList();
        },
        changeDateRange(start, end) {
            this.vm.timeInterval = {
                startDate: this.$moment(start).format('YYYY-MM-DD HH:mm:ss'),
                endDate: this.$moment(end).format('YYYY-MM-DD HH:mm:ss')
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
        GetMemberList() {
            this.userConfig = {
                storeIds: JSON.parse(localStorage.getItem('performanceInfo')).performanceStoreIds,
                dataType: JSON.parse(localStorage.getItem('performanceInfo')).dataType,
                startDate: JSON.parse(localStorage.getItem('performanceInfo')).startDate,
                endDate: JSON.parse(localStorage.getItem('performanceInfo')).endDate
            };
            if (this.selectedStore) {
                this.parameter.storeIds = this.selectedStore.id;
                this.userConfig.storeIds = this.selectedStore.id;
            }
            if (this.vm.timeInterval.startDate) {
                this.parameter.startDate = this.vm.timeInterval.startDate;
                this.userConfig.startDate = this.vm.timeInterval.startDate;
            }
            if (this.vm.timeInterval.endDate) {
                this.parameter.endDate = this.vm.timeInterval.endDate;
                this.userConfig.endDate = this.vm.timeInterval.endDate;
            }
            let str = JSON.stringify(this.userConfig);
            localStorage.setItem('userConfig', str);
            this.$indicator.open();
            apiArrivalMember.getArrivalMember(this.parameter).then(
                res => {
                    this.$indicator.close();
                    this.list = res.data || [];
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
        jump(val, name) {
            if (name != '散客') {
                this.$router.push('/memberDetail/' + val);
            }
        }
    }
};
</script>

<style lang="less" scoped>
@import '~@/styles/_agile';
    .arrivalMember{
        font-size: 12px;
        color:@extra-light-black;
        line-height: 1.6;
        height: 100%;
        overflow-y: inherit;
        overflow: scroll;
        padding: 9px 0 0 0;
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
        .data-list{
            position: relative;
            width: 95%;
            margin: auto;
            .financial-item{
                background: @white;
                margin-bottom: 9px;
                border-radius: 5px;
                box-shadow: 0 0 5px rgba(102,102,102,.1);
                position: relative;
                padding: 11px;
                .memberImg{
                    width: 49px;
                    height: 49px;;
                    border-radius: 50%;
                }
                .info{
                    margin-left: 11px;
                    line-height: 19px;
                    .name{
                        font-size: 14px;
                        margin-right: 0;
                        overflow:hidden;
                        text-overflow:ellipsis;
                        white-space:nowrap;
                    }
                    .phone{
                        margin-left: 8px;
                        margin-right: 4px;
                        font-size: 14px;
                    }
                }
                .primary-color{
                    color: @color-primary;
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
