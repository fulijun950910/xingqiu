<template>
    <div class="bt-panel"
         v-title="title">
        <m-calendar :visible.sync="visible"
                    :date.sync="params.date"
                    @cellClick="cellClick"></m-calendar>
        <div class="bt-content bt-content-list"
             v-if="showList">
            <div class="bt-tab-panel">
                <div layout="row"
                     layout-align="start center"
                     class="bt-tab-cont"
                     :class="{'bt-tab-cont-fixed': fiexdHead}">
                    <div :class="{'bt-tab-s': index === params.tabIndex}"
                         flex
                         v-for="(item, index) in tabs"
                         :key="index"
                         @click="tabClick(index)">
                        <div class="bt-tab-title">{{item.label}}({{item.total}}条)</div>
                    </div>
                </div>
            </div>
            <m-no-data :visible="!selectedTab.rows || !selectedTab.rows.length"
                       :showButton="false"></m-no-data>
            <div v-for="(val, index) in selectedTab.rows"
                 :key="index"
                 class="bt-cell-panel">
                <div class="bt-section-title">{{val.value | amDateFormat('HH:mm')}}</div>
                <m-booking-cell v-for="booking in val.rows"
                                :key="booking.holderTypeId"
                                :value="booking"
                                @toolClick="bookingToolClick"
                                @customerDetail="customerDetail"
                                @click.native="showDetail(booking)"></m-booking-cell>
            </div>
        </div>
        <div class="bt-content bt-content-calendar"
             v-else>
            <div class="bt-card-cont">
                <div v-for="item in times"
                     :key="item"
                     class="bt-card-cell">
                    <div class="time">{{item | amDateFormat('HH:mm')}}</div>
                </div>
            </div>
            <div v-for="item in rows"
                 :key="item.id"
                 :style="item.style"
                 class="bt-card-item"
                 @click.stop="showDetail(item)">
                <div :class="[`item${item.holderStatus}`]">
                    <div class="no-wrap">{{item.name}}</div>
                    <div class="no-wrap">{{item.startTime | amDateFormat('HH:mm')}}-{{item.endTime | amDateFormat('HH:mm')}}</div>
                    <div class="no-wrap">
                        <span v-for="(val, index) in item.items"
                              :key="val.id">
                            <span v-if="index">、</span>
                            {{val.name}}</span>
                    </div>
                    <div class="no-wrap">
                        <span>{{item.employeeName}}</span>
                        <span v-if="item.employeeName && item.roomName">●</span>
                        <span>{{item.roomName}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div>&nbsp;</div>
        <div class="bt-footer">
            <div flex="70"
                 layout="row"
                 class="bt-h100">
                <div flex
                     layout="row"
                     layout-align="center center"
                     class="bt-tool-btn"
                     v-for="(item, index) in tools"
                     :key="index"
                     v-show="item.index != 1 || item.index == 1 && !showList"
                     @click="toolsClick(item)">
                    <m-icon class="fs40 color-black"
                            :link="item.icon"></m-icon>
                </div>
            </div>
            <div class="bt-add-btn"
                 @click="addClick">
                <m-icon class="fs32"
                        link="icon-add"></m-icon>
            </div>
        </div>
        <m-booking-detail ref="detail"
                          :closeOnClickModal="true"
                          v-model="detailVisible"
                          @customerDetail="customerDetail"
                          @toolsClick="bookingToolClick"></m-booking-detail>
        <!-- 筛选 -->
        <m-popup-right v-model="popupFilterVisible"
                       class="bt-popup-panel">
            <div class="bt-cont"
                 v-show="popupType == 1">
                <div class="btp-section">
                    门店名称
                </div>
                <div class="btp-cell"
                     layout="row"
                     layout-align="space-between center"
                     @click="popupType = 2">
                    <span class="fs13">
                        {{store.name}}
                    </span>
                    <m-icon class="fs24 color-gray"
                            link="icon-right-bold"></m-icon>
                </div>
                <div class="btp-cont"
                     layout="row"
                     flex-wrap="wrap">
                    <div class="btp-item"
                         :class="{'btp-item-s': item.id == params.storeId}"
                         flex="50"
                         v-for="item in storeList"
                         :key="item.id"
                         @click="storeClick(item)">
                        <div class="no-wrap">{{item.name}}</div>
                    </div>
                </div>
                <div v-if="$store.getters.bookingGuest">
                    <div class="btp-section">
                        {{$store.getters.nounName('worker')}}
                    </div>
                    <div class="btp-cell"
                         layout="row"
                         layout-align="space-between center"
                         @click="popupType = 3">
                        <span class="fs13 extra-light-black">选择{{$store.getters.nounName('worker')}}</span>
                        <m-icon class="fs24 color-gray"
                                link="icon-right-bold"></m-icon>
                    </div>
                    <div class="btp-cont"
                         layout="row"
                         flex-wrap="wrap">
                        <div class="btp-item"
                             :class="{'btp-item-s' : params.employeeId === item.id}"
                             flex="50"
                             v-for="item in empTop5"
                             :key="item.id"
                             @click="empClick(item)">
                            <div class="no-wrap">{{item.name}}</div>
                        </div>
                    </div>
                </div>
                <div v-show="!showList">
                    <div class="btp-section">
                        预约状态
                    </div>
                    <div class="btp-cont"
                         layout="row"
                         flex-wrap="wrap">
                        <div class="btp-item"
                             :class="{'btp-item-s' : item.selected}"
                             flex="50"
                             v-for="item in status"
                             :key="item.value">
                            <div @click="statusClick(item)">{{item.label}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bt-cont bt-cont-sub"
                 v-show="popupType == 2">
                <div class="bp-cont">
                    <div class="bp-search"
                         layout="row">
                        <div class="bp-back"
                             @click="popupType = 1">
                            <m-icon link="icon-left-bold"></m-icon>
                        </div>
                        <form action=""
                              flex>
                            <input type="text"
                                   v-model="storeKeyword"
                                   placeholder="搜索门店">
                        </form>
                    </div>
                    <div class="bp-cell"
                         :class="{'bp-cell-s': params.storeId == item.id}"
                         v-for="item in filterStoreList"
                         :key="item.id"
                         @click="storeClick(item);popupType = 1;"
                         layout="row"
                         layout-align="space-between center">
                        <div flex>{{item.name}}</div>
                        <m-icon class="fs24 bp-check"
                                v-if="params.storeId == item.id"
                                link="icon-queding"></m-icon>
                    </div>
                    <m-no-data :visible="!filterStoreList.length"
                               :showButton="false"
                               message="暂无数据"></m-no-data>
                </div>
            </div>
            <div class="bt-cont bt-cont-sub"
                 v-show="popupType == 3">
                <div class="bp-search"
                     layout="row">
                    <div class="bp-back"
                         @click="popupType = 1">
                        <m-icon link="icon-left-bold"></m-icon>
                    </div>
                    <form action=""
                          flex>
                        <input type="text"
                               v-model="empKeyword"
                               :placeholder="`搜索${$store.getters.nounName('worker')}`">
                    </form>
                </div>
                <div class="bp-cell"
                     :class="{'bp-cell-s': params.employeeId == item.id}"
                     v-for="item in filterEmpList"
                     :key="item.id"
                     @click="empClick(item);popupType = 1;"
                     layout="row"
                     layout-align="space-between center">
                    <div flex>{{item.name}} {{item.code}}</div>
                    <m-icon class="fs24 bp-check"
                            v-if="params.employeeId == item.id"
                            link="icon-queding"></m-icon>
                </div>
                <m-no-data :visible="!filterStoreList.length"
                           :showButton="false"
                           message="暂无数据"></m-no-data>
            </div>
            <div class="bt-foot"
                 layout="row">
                <div class="btp-l"
                     v-show="popupType == 1"
                     @click="resetFilter"
                     flex>重置</div>
                <div class="btp-r"
                     v-show="popupType == 1"
                     @click="popupFilterVisible = false; loadData()"
                     flex>确定</div>
            </div>
        </m-popup-right>
        <mt-popup v-model="popupStatusVisible"
                  popup-transition="popup-fade"
                  class="bt-popup-status">
            <div class="btps-cell"
                 :class="{'btps-cell-s': item.selected}"
                 layout="row"
                 layout-align="start center"
                 v-for="(item, index) in status"
                 :key="index"
                 @click="statusClick(item, true)">
                <div class="m-r-2">{{item.label}}</div>
                <div class="btps-tag">{{item.count}}</div>
                <div class="btps-check">
                    <m-icon link="icon-queding"></m-icon>
                </div>
            </div>
        </mt-popup>
    </div>
</template>
<script>
import Vue from 'vue';
import { Button, Spinner } from 'mint-ui';
import mCalendar from './components/calendar';
import mBookingCell from './components/booking-cell';
import mBookingDetail from './detail';
import mConfirm from '@/components/m-confirm/index';
import mPopupRight from '@/components/popup-right';
import apiBooking from '@/services/api.booking';
import mNoData from '@/components/no-data';
Vue.component(Button.name, Button);
Vue.component(Spinner.name, Spinner);

export default {
    name: 'bookingTable',
    props: {},
    components: {
        mCalendar,
        mBookingCell,
        mNoData,
        mBookingDetail,
        mPopupRight
    },
    computed: {
        store() {
            return this.storeList.find(val => val.id === this.params.storeId) || {};
        },
        selectedTab() {
            return this.tabs[this.params.tabIndex] || {};
        },
        storeList() {
            return this.$store.state.storeList;
        },
        showList() {
            return this.params.viewType === 1;
        },
        empTop5() {
            return this.empList.filter((val, index) => index < 6);
        },
        filterStoreList() {
            return this.storeList.filter(val => val.name.toLocaleLowerCase().indexOf(this.storeKeyword.toLocaleLowerCase()) !== -1);
        },
        filterEmpList() {
            return this.empList.filter(val => {
                let keyword = this.empKeyword.toLocaleLowerCase();
                return (
                    (val.name && val.name.toLocaleLowerCase().indexOf(keyword) !== -1) ||
                    (val.code && val.code.toLocaleLowerCase().indexOf(keyword) !== -1) ||
                    (val.pinyin && val.pinyin.toLocaleLowerCase().indexOf(keyword) !== -1) ||
                    (val.acronym && val.acronym.toLocaleLowerCase().indexOf(keyword) !== -1)
                );
            });
        },
        params() {
            return this.$store.state.booking.params;
        }
    },
    data() {
        return {
            title: '预约列表',
            tabs: [],
            rows: [],
            empList: [],
            status: [],
            visible: false,
            total: 0,
            tools: [],
            fiexdHead: false,
            startTime: '',
            endTime: '',
            times: [],
            popupType: 1,
            detailVisible: false,
            popupStatusVisible: false,
            popupFilterVisible: false,
            storeKeyword: '',
            empKeyword: '',
            statusSelectedList: []
        };
    },
    mounted() {
        this.init();
        this.loadData();
        this.loadEmpList();
    },
    methods: {
        init() {
            this.tools = [{ icon: 'icon-qiehuanmoshi', index: 0 }, { icon: 'icon-yuyuedingdan', index: 1 }, { icon: 'icon-shaixuan', index: 2 }];
            if (!this.params.storeId) {
                this.$store.commit('bookingSetParams', { storeId: this.$store.getters.storeId });
            }
            if (!this.params.employeeId) {
                this.$store.commit('bookingSetParams', { employeeId: this.$store.getters.bookingGuest ? '' : this.$store.getters.employeeId });
            }

            this.initStatus();
            this.initTabs();
            this.initAppoinmentTime();
            this.initTimes();
            this.$nextTick(() => {
                if (this.$store.state.booking.data) {
                    this.showDetail(this.$store.state.booking.data);
                }
            });
        },
        initTabs() {
            this.tabs = [
                {
                    label: '待确认',
                    value: '1',
                    expand: true,
                    total: 0,
                    rows: []
                },
                {
                    label: '已确认',
                    value: '2',
                    expand: false,
                    total: 0,
                    rows: []
                },
                {
                    label: '已取消',
                    value: '4,5',
                    expand: false,
                    total: 0,
                    rows: []
                }
            ];
        },
        initStatus() {
            this.status = [
                { label: '待确认', value: '1', selected: true, count: 0 },
                { label: '已确认', value: '2', selected: true, count: 0 },
                { label: '已取消', value: '4,5', selected: false, count: 0 }
            ];
        },
        initAppoinmentTime() {
            let start = [8, 0];
            let end = [23, 0];
            if (this.store) {
                if (this.store.appoinmentTimeStart) {
                    start = this.store.appoinmentTimeStart.split(':');
                }
                if (this.store.appoinmentTimeEnd) {
                    end = this.store.appoinmentTimeEnd.split(':');
                }
            }
            this.startTime = this.$moment(this.params.date)
                .add(start[0], 'h')
                .add(start[1], 'm')
                .format('YYYY-MM-DD HH:mm:ss');
            this.endTime = this.$moment(this.params.date)
                .add(end[0], 'h')
                .add(end[1], 'm')
                .format('YYYY-MM-DD HH:mm:ss');
        },
        initTimes() {
            let startTime = this.$moment(this.startTime);
            let endTime = this.$moment(this.endTime);
            if (startTime.minutes()) {
                startTime.set('m', 0);
            }
            if (endTime.minutes()) {
                endTime.set('m', 0).add(1, 'h');
            }
            while (!startTime.isAfter(endTime)) {
                this.times.push(startTime.format('YYYY-MM-DD HH:mm:ss'));
                startTime.add(1, 'h');
            }
        },
        loadEmpList() {
            if (!this.$store.getters.bookingGuest) {
                return;
            }
            apiBooking.getEmployees(this.params.storeId).then(
                res => {
                    this.empList = [{ id: '', name: '全部' }, ...res.data];
                },
                err => {}
            );
        },
        loadData() {
            this.$indicator.open();
            apiBooking.bookingSearch(this.queryFormat()).then(
                res => {
                    this.sourceList = res.data.rows.map(val => {
                        // 接口兼容
                        let emp = val.employees[0];
                        val.startTime = emp.startTime;
                        val.endTime = emp.endTime;
                        val.roomId = emp.roomId;
                        val.employeeName = emp.name;
                        val.employeeId = emp.employeeId;
                        val.items = emp.items;
                        return val;
                    });
                    this.initTabs();
                    this.loadStatusCount();
                    this.listFormat(res.data.rows);
                    this.cardFormat(res.data.rows);
                    this.$nextTick(() => {
                        window.scrollTo(0, 0);
                    });
                    this.$indicator.close();
                },
                err => {
                    this.$indicator.close();
                }
            );
        },
        queryFormat() {
            let params = {
                page: 1,
                size: 10000,
                query: [
                    { field: 'startTime', value: this.startTime },
                    { field: 'endTime', value: this.endTime },
                    { field: 'merchantId', value: this.$store.getters.merchantId },
                    { field: 'storeId', value: this.params.storeId },
                    { field: 'holderType', value: 1 },
                    { field: 'holderStatus', value: '1,2,4,5', operation: 'like' }
                ],
                sort: []
            };

            if (this.params.employeeId) {
                params.query.push({
                    field: 'employeeId',
                    value: this.params.employeeId
                });
            }
            return params;
        },
        loadStatusCount() {
            this.status.forEach(val => {
                val.count = 0;
            });
            this.sourceList.forEach(val => {
                switch (+val.holderStatus) {
                    case 1:
                        this.status[0].count++;
                        break;
                    case 2:
                        this.status[1].count++;
                        break;
                    case 4:
                    case 5:
                        this.status[2].count++;
                        break;
                }
            });
        },
        showCalendar() {
            this.visible = true;
        },
        cellClick(date) {
            this.initAppoinmentTime();
            this.loadData();
        },
        tabClick(index) {
            this.$store.commit('bookingSetParams', { tabIndex: index });
        },
        toolsClick(item) {
            switch (item.index) {
                case 0:
                    this.title = this.params.viewType === 1 ? '预约安排' : '预约列表';
                    this.$store.commit('bookingSetParams', { viewType: this.params.viewType === 1 ? 2 : 1 });
                    this.$nextTick(() => {
                        window.scrollTo(0, 0);
                    });
                    break;
                case 1:
                    this.popupStatusVisible = true;
                    break;
                case 2:
                    this.popupFilterVisible = true;
                    break;
            }
        },
        bookingToolClick({ index, value }) {
            if (index === 1) {
                // 取消预约
                mConfirm(
                    {
                        headSrc: require('@/assets/imgs/booking-alert.png'),
                        message: '确定取消预约？'
                    },
                    action => {
                        if (action === 'confirm') {
                            this.$indicator.open();
                            apiBooking.cancelBooking(value.holderTypeId).then(
                                res => {
                                    this.loadData();
                                },
                                err => {
                                    this.$indicator.close();
                                }
                            );
                        }
                    }
                );
            } else if (index === 2) {
                if (value.employees.length !== 1) {
                    this.$toast('暂不支持多技师预约编辑');
                    return;
                }
                // 修改预约
                this.$router.push({
                    name: 'booking-edit',
                    params: {
                        bookingId: value.holderTypeId
                    }
                });
            } else if (index === 3) {
                // 确认预约
                this.$indicator.open();
                apiBooking.confirmBooking(value.holderTypeId).then(
                    res => {
                        this.loadData();
                    },
                    err => {
                        this.$indicator.close();
                    }
                );
            }
        },
        showDetail(item) {
            this.$refs.detail.show(item);
        },
        addClick() {
            this.$router.push({
                name: 'booking-edit',
                query: {
                    date: this.$moment(this.params.date).format('YYYYMMDD')
                }
            });
        },
        storeClick(item) {
            if (this.params.storeId === item.id) {
                return;
            }
            this.$store.commit('bookingSetParams', { storeId: item.id });
            this.loadEmpList();
        },
        empClick(item) {
            if (this.params.employeeId === item.id) {
                return;
            }
            this.$store.commit('bookingSetParams', { employeeId: item.id });
        },
        statusClick(item, reload) {
            item.selected = !item.selected;
            if (reload) {
                this.cardFormat(this.sourceList);
            }
        },
        customerDetail(item) {
            if (item && item.memberType === 1) {
                this.$router.push({
                    name: 'customer-assets',
                    params: {
                        customerId: item.memberId
                    }
                });
            }
        },
        resetFilter() {
            this.$store.commit('bookingSetParams', { employeeId: '' });
            this.initStatus();
            this.loadData();
        },
        listFormat(list) {
            list.forEach(booking => {
                let item = this.tabs.find(val => val.value.indexOf(booking.holderStatus) !== -1);
                if (item) {
                    // 时间
                    let timeItem = item.rows.find(val => val.value.isSame(booking.startTime, 'h'));
                    if (!timeItem) {
                        timeItem = {
                            value: this.$moment(booking.startTime).startOf('h'),
                            rows: []
                        };
                        item.rows.push(timeItem);
                    }
                    timeItem.rows.push(booking);
                    item.total++;
                }
            });
        },
        cardFormat(list) {
            let holderStatus = this.status
                .filter(val => val.selected)
                .map(val => val.value)
                .join(',');
            let rows = list.filter(val => holderStatus.indexOf(val.holderStatus) !== -1);
            if (!rows.length) {
                this.rows = rows;
                return;
            }
            // 按时间排序
            rows.sort((a, b) => {
                return a.startTime > b.startTime;
            });
            // 按时间分组
            let tempList = [[]];
            let startTime = rows[0].startTime;
            let tempRows = tempList[0];
            let minutes = this.$moment(this.endTime).diff(this.startTime, 'm');
            rows.forEach(val => {
                if (this.$moment(val.startTime).diff(startTime, 'm') > 30) {
                    tempList.push([]);
                    tempRows = tempList[tempList.length - 1];
                    startTime = val.startTime;
                }
                val.style = {
                    top: (this.$moment(val.startTime).diff(this.startTime, 'm') / minutes) * 100 + '%',
                    height: (this.$moment(val.endTime).diff(val.startTime, 'm') / minutes) * 100 + '%'
                };
                tempRows.push(val);
            });
            let tempBooking;
            let leftWidth = 0;
            tempList.forEach(item => {
                if (tempBooking && tempBooking.endTime > item[0].startTime) {
                    leftWidth += 1.2;
                } else {
                    leftWidth = 0;
                }
                item.sort((a, b) => {
                    return a.endTime < b.endTime;
                });
                tempBooking = item[0];
                let width = (100 - leftWidth) / item.length;
                item.forEach((val, index) => {
                    val.style.width = width + '%';
                    val.style.left = width * index + leftWidth + '%';
                });
            });
            this.rows = rows;
        }
    }
};
</script>
<style lang="less" scoped>
@import '~styles/_agile';
@color1: #a43a8e;
@extra-color-1: #7d879c;
@tab-h: 58px;
@header-h: 72px;
@footer-h: 49px;
@status-0: #ea9d6f;
@status-1: #74c5cf;
@status-2: #888888;

.fs13 {
    font-size: 13px;
}
.bt- {
    &content-list {
        min-height: 100vh;
        background-color: #f9f7fc;
        padding: @header-h 14px @footer-h+22px 14px;
        :nth-child(2)::before {
            top: 10px;
        }
        :nth-last-child(1)::before {
            height: 10px;
        }
    }
    &content-calendar {
        position: relative;
        background-color: white;
        margin-top: @header-h + 11px;
        margin-bottom: @footer-h + 30px;
        margin-left: 46px;
    }
    &card-cell {
        height: 50px;
        border-top: 1px solid @light-gray; /*no*/
        position: relative;
        .time {
            position: absolute;
            top: -11px;
            left: -46px;
            width: 46px;
            text-align: center;
            color: @extra-light-black;
        }
    }
    &card-cont {
        :nth-last-child(1) {
            height: 0;
        }
    }
    &card-item {
        position: absolute;
        padding-left: 2px; /*no*/
        font-size: 12px;
        line-height: 1.3;
        min-height: 15px;
        & > div {
            background-color: #a43a8e;
            height: 100%;
            border-left: 3px solid; /*no*/
            padding: 2px;
            overflow: hidden;
        }
        .item1 {
            // 待确认
            color: #b7683a;
            border-left-color: @status-0;
            background-color: fade(#f7d8c5, 80%);
        }
        .item2 {
            // 已确认
            color: #1f646d;
            border-left-color: @status-1;
            background-color: fade(#c7e8ec, 80%);
        }
        .item5 {
            // 取消
            color: #222222;
            border-left-color: @status-2;
            background-color: fade(#cfcfcf, 80%);
        }
    }
    &c-head {
        padding: @l32 0;
        :nth-child(1) {
            font-size: @fs22;
            color: @extra-color-1;
        }
        .mint-button--small {
            height: 20px;
            font-size: @fs20;
            color: @extra-color-1;
            border-color: @extra-color-1;
            box-shadow: 0 0 1px @extra-color-1; /*no*/
        }
    }
    &tab-panel {
        border-top: 1px solid @light-gray; /*no*/
        margin-left: -14px;
        margin-right: -14px;
        margin-bottom: 16px;
        text-align: center;
        height: @tab-h;
        color: @extra-light-black;
        z-index: 1;
    }
    &tab-cont {
        background-color: #fefbff;
        height: @tab-h;
        line-height: @tab-h;
        width: 100%;
        z-index: 1;
        &-fixed {
            position: fixed;
            top: @header-h;
        }
    }
    &tab-s {
        color: @color-black;
        .bt-tab-title::after {
            background-color: @color-black;
        }
    }
    &tab-title {
        display: inline-block;
        position: relative;
        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: -5%;
            right: -5%;
            height: 3px;
            border-radius: 3px;
        }
    }
    &footer {
        height: @footer-h;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: @white;
        border-top: 1px solid @border-gay; /*no*/
        z-index: 2;
    }
    &cell-panel {
        padding-left: 15px;
        position: relative;
        &::before {
            content: '';
            position: absolute;
            left: 4px;
            width: 1px;
            top: 0;
            bottom: 0;
            background-color: #cad1de;
        }
        &::after {
            content: '';
            position: absolute;
            left: 1px;
            width: 7px;
            height: 7px;
            top: 5px;
            background-color: #aeb7cc;
            border-radius: 50%;
            box-shadow: 0 0 0 3px rgba(174, 183, 204, 0.17);
        }
    }
    &section-title {
        color: #aeb7cc;
        font-size: @fs24;
        margin-bottom: 16px;
    }
    &h100 {
        height: 100%;
    }
    &add-btn {
        position: absolute;
        width: 50px;
        height: 50px;
        top: -25px;
        right: 26px;
        border-radius: 50%;
        text-align: center;
        line-height: 50px;
        background-color: @color1;
        box-shadow: 0px 4px 8px 0px rgba(182, 44, 168, 0.2);
        &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            border-radius: 50%;
        }
        &:active {
            background-color: darken(@color1, 10%);
            &::after {
                box-shadow: 0 0 0 8px fade(@color1, 8%);
            }
        }
        .icon {
            color: @white;
        }
    }
    &tool-btn {
        &:active {
            background-color: darken(white, 5%);
        }
    }
    &popup-panel {
        width: 82%;
        .bt-cont {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 49px;
            overflow: auto;
            &-sub {
                bottom: 0;
            }
        }
        .bt-foot {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 49px;
            line-height: 49px;
            font-size: 15px;
            text-align: center;
            .btp-l {
                background-color: @bg-gray;
            }
            .btp-r {
                color: white;
                background-color: @color-primary;
            }
        }
        .btp-section {
            line-height: 50px;
            font-size: 15px;
            font-weight: bold;
            padding-left: 20px;
        }
        .btp-cell {
            padding: 16px 20px;
            background-color: @bg-gray;
        }
        .btp-cont {
            padding-left: 16px;
            padding-top: 16px;
        }
        .btp-item {
            padding-right: 16px;
            padding-bottom: 12px;
            color: @extra-black;
            :nth-child(1) {
                text-align: center;
                padding: 7px 8px;
                border-radius: 18px;
                background-color: @bg-gray;
                border: 1px solid transparent;
            }
            &-s {
                :nth-child(1) {
                    color: @color-black;
                    border-color: @color-primary; /*no*/
                    background-color: rgba(255, 248, 253, 1);
                }
            }
        }
        .bp-cont {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: auto;
        }
        .bp-search {
            padding: 6px 12px;
            background: #f2f2f2;
            border-bottom: 1px solid @light-gray; /*no*/
            input {
                width: 100%;
                height: 35px;
                font-size: 13px;
                background: white;
                padding-left: 12px;
                border-radius: 4px;
            }
            .bp-back {
                margin-left: -12px;
                width: 40px;
                text-align: center;
                line-height: 35px;
            }
        }
        .bp-cell {
            font-size: 13px;
            border-bottom: 1px solid @light-gray; /*no*/
            padding: 12px 20px;
            color: @extra-black;
            padding-right: 30px;
            & > div :nth-of-type(2) {
                color: @gray;
            }
            &-s,
            &-s > div :nth-of-type(2),
            &-s .icon {
                color: @color-primary;
            }
        }
    }
    &popup-status {
        width: 150px;
        border-radius: 8px;
        transform: translate(-50%, 0);
        bottom: 59px;
        top: auto;
        left: 34.99%;
        box-shadow: 0px 1px 17px 0px rgba(0, 0, 0, 0.17);
        :nth-of-type(1) .btps-tag {
            background-color: @status-0;
        }
        :nth-of-type(2) .btps-tag {
            background-color: @status-1;
        }
        :nth-of-type(3) .btps-tag {
            background-color: @status-2;
        }
        .btps-cell {
            text-align: center;
            line-height: 50px;
            position: relative;
            padding-left: 35px;
            &-s {
                color: @color-primary;
                .btps-check {
                    display: block;
                }
            }
        }
        .btps-cell + .btps-cell {
            border-top: 1px solid @light-gray; /*no*/
        }
        .btps-tag {
            border-radius: 32px; /*no*/
            border-bottom-left-radius: 0px;
            line-height: 20px;
            padding: 0 8px;
            color: white;
            font-size: 12px;
        }
        .btps-check {
            position: absolute;
            left: 12px;
            color: @color-primary;
            display: none;
        }
    }
    &popup-status::before {
        display: inline-block;
        width: 0;
        height: 0;
        border: solid transparent;
        border-width: 10px;
        border-top-color: #fff;
        content: '';
        position: absolute;
        bottom: -20px;
        left: 65px;
    }
}
</style>
