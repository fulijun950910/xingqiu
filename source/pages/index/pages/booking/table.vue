<template>
    <div class="bt-panel">
        <calendar :visible.sync="visible"
                  :date.sync="params.date"
                  @cellClick="cellClick"></calendar>
        <div class="bt-content"
             :class="[statusClass]">
            <!-- <div layout="row"
                 layout-align="space-between center"
                 class="bt-c-head"
                 ref="head">
                <div flex>一共{{total}}条预约</div>
                <mt-spinner type="triple-bounce"
                            v-show="loading"></mt-spinner>
                <div flex
                     class="text-right">
                    <mt-button size="small"
                               type="default">返回今日</mt-button>
                </div>
            </div> -->
            <div class="bt-tab-panel">
                <div layout="row"
                     layout-align="start center"
                     class="bt-tab-cont"
                     :class="{'bt-tab-cont-fixed': fiexdHead}">
                    <div :class="{'bt-tab-s': index === tabIndex}"
                         flex
                         v-for="(item, index) in tabs"
                         :key="index"
                         @click="tabClick(index)">
                        <div class="bt-tab-title">{{item.label}}({{item.total}}条)</div>
                    </div>
                </div>
            </div>
            <div v-for="(val, index) in selectedTab.rows"
                 :key="index"
                 class="bt-cell-panel">
                <div class="bt-section-title">{{val.value | amDateFormat('HH:mm')}}</div>
                <div v-for="booking in val.rows"
                     :key="booking.id"
                     class="bt-cell-cont">
                    <div layout="row"
                         layout-align="space-between center"
                         class="cc-head">
                        <div>
                            <div>{{booking.startTime | amDateFormat('HH:MM')}}-{{booking.endTime | amDateFormat('HH:MM')}}</div>
                            <div>
                                <span v-for="(item, index) in booking.items"
                                      :key="index">
                                    {{item.name}}
                                </span>
                            </div>
                        </div>
                        <div>
                            <span>{{booking.employeeName}}</span>
                            <span v-if="booking.employeeName && booking.roomName">●</span>
                            <span class="fs13">{{booking.roomName}}</span>
                        </div>
                    </div>
                    <div layout="row"
                         layout-align="start center"
                         class="cc-cont">
                        <div class="bt-avatar m-r-2">
                            <img :src="booking.avatarId | mSrc(80, 80, require('assets/imgs/avatar.png'))">
                        </div>
                        <div flex>
                            <div>
                                <span class="m-r-2">{{booking.name}}</span>
                                <span class="fs24 color-gray">{{booking.phone}}</span>
                            </div>
                            <div class="fs24 color-gray">{{booking.information}}</div>
                        </div>
                        <div>
                            <m-icon class="fs28 color-black"
                                    xlink="#icon-bianji"></m-icon>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bt-footer">
            <div flex="70"
                 layout="row"
                 class="bt-h100">
                <div flex
                     layout="row"
                     layout-align="center center"
                     class="bt-tool-btn"
                     v-for="(item, index) in tools"
                     :key="index">
                    <m-icon class="fs40 color-black"
                            :xlink="item.icon"></m-icon>
                </div>
            </div>
            <div class="bt-add-btn">
                <m-icon class="fs32"
                        xlink="#icon-add"></m-icon>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { Button, Spinner } from 'mint-ui';
import Calendar from './calendar';
import apiBooking from '@/services/api.booking';
Vue.component(Button.name, Button);
Vue.component(Spinner.name, Spinner);

export default {
    name: 'bookingTable',
    props: {},
    components: {
        Calendar
    },
    computed: {
        store() {
            return this.$store.state.store;
        },
        selectedTab() {
            return this.tabs[this.tabIndex] || [];
        },
        statusClass() {
            return `bt-status-${this.tabIndex}`;
        }
    },
    data() {
        return {
            tabs: [],
            visible: false,
            total: 0,
            tabIndex: 0,
            params: {
                date: this.$moment()
                    .startOf('d')
                    .format('YYYY-MM-DD HH:mm:ss')
            },
            tools: [],
            fiexdHead: false,
            loading: false
        };
    },
    mounted() {
        this.init();
        this.loadData();
    },
    methods: {
        init() {
            this.tools = [{ icon: '#icon-qiehuanmoshi', index: 0 }, { icon: '#icon-yuyuedingdan', index: 1 }, { icon: '#icon-shaixuan', index: 2 }];
            this.initTabs();
            // window.addEventListener('scroll', this.scroll);
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
        loadData() {
            this.initTabs();
            this.loading = true;
            apiBooking.bookingSearch(this.queryFormat()).then(
                res => {
                    this.loading = false;
                    res.data.rows.forEach(booking => {
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
                err => {
                    this.loading = false;
                }
            );
        },
        queryFormat() {
            // if (this.store) {
            //     let { appoinmentTimeStart, appoinmentTimeEnd } = this.store;
            //     if (!appoinmentTimeStart) {
            //         appoinmentTimeStart = '8:00';
            //     }
            //     if (appoinmentTimeEnd) {
            //         appoinmentTimeStart = '23:00';
            //     }
            // }
            let params = {
                page: 1,
                size: 10000,
                query: [
                    { field: 'startTime', value: this.params.date },
                    {
                        field: 'endTime',
                        value: this.$moment(this.params.date)
                            .endOf('d')
                            .format('YYYY-MM-DD HH:mm:ss')
                    },
                    {
                        field: 'merchantId',
                        value: this.$store.getters.merchantId
                    },
                    {
                        field: 'storeId',
                        value: this.$store.getters.storeId
                    },
                    { field: 'holderType', value: 1 }
                ],
                sort: []
            };
            return params;
        },
        showCalendar() {
            this.visible = true;
        },
        cellClick(date) {
            this.loadData();
        },
        tabClick(index) {
            this.tabIndex = index;
        },
        scroll() {
            if (!this.$refs.head) {
                return;
            }
            this.fiexdHead = window.scrollY > this.$refs.head.offsetHeight;
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
    &content {
        min-height: 100vh;
        padding: @header-h 14px @footer-h+22px 14px;
        background-color: #f9f7fc;
        :nth-child(2)::before {
            top: 10px;
        }
        :nth-last-child(1)::before {
            height: 10px;
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
    &status- {
        &0 .cc-head {
            background-color: @status-0;
        }
        &1 .cc-head {
            background-color: @status-1;
        }
        &2 .cc-head {
            background-color: @status-2;
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
    &avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
        }
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
    &cell-cont {
        padding-bottom: 16px;
        .cc-head {
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            padding: 6px 14px;
            font-size: @fs24;
            color: white;
        }
        .cc-cont {
            background-color: white;
            padding: 16px;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
        }
    }
    &h100 {
        height: 100%;
    }
    &add-btn {
        position: absolute;
        width: 44px;
        height: 44px;
        top: -22px;
        right: 26px;
        border-radius: 50%;
        text-align: center;
        line-height: 44px;
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
}
</style>
