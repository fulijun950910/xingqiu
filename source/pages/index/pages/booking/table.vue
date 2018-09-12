<template>
    <div class="bt-panel">
        <div class="bt-header"
             layout="column">
            <div class="bt-expand-btn"
                 @click="showCalendar"></div>
            <div layout="row"
                 layout-align="space-between center"
                 class="bt-week-panel"
                 flex>
                <div class="bt-week-m">
                    9月
                </div>
                <div class="bt-week-d"
                     :class="{'bt-week-d-s' : index == 3}"
                     v-for="(item, index) in 6"
                     :key="index"
                     flex>
                    <div>周一</div>
                    <div>{{index+5}}</div>
                </div>
            </div>
        </div>
        <calendar :visible.sync="visible"
                  :date.sync="params.date"
                  @cellClick="cellClick"></calendar>
        <div class="bt-content">
            <div layout="row"
                 layout-align="space-between center">
                <div>一共7条预约</div>
                <mt-button size="small"
                           type="default">返回今日</mt-button>
            </div>
            <div v-for="(item, index) in rows"
                 :key="index">
                <div layout="row"
                     layout-align="space-between center">
                    <div>{{item.label}}</div>
                    <!-- 展开 -->
                </div>
                <div v-for="(val, subindex) in item.rows"
                     :key="subindex"
                     class="bt-cell-panel">
                    <div>{{val.label}}</div>
                    <div v-for="booking in val.rows"
                         :key="booking.id">
                        <div layout="row"
                             layout-align="space-between center">
                            <div>
                                <div>08:00-09:00</div>
                                <div>无健健身积分冬至</div>
                            </div>
                            <div>
                                王教练 | 房间15
                            </div>
                        </div>
                        <div layout="row"
                             layout-align="start center">
                            <div class="bt-avatar m-r-2">
                                <img :src="'' | mSrc(80, 80, require('assets/imgs/avatar.png'))">
                            </div>
                            <div flex>
                                <div>
                                    刘小姐
                                    <span>15043243222</span>
                                </div>
                                <div>备注备注备注备注备注备注</div>
                            </div>
                            <div>
                                编辑
                            </div>
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
                     layout-align="center center">
                    <m-icon class="fs32 color-gray"
                            xlink="#icon-wsmp-complete"></m-icon>
                </div>
                <div flex
                     layout="row"
                     layout-align="center center">
                    <m-icon class="fs32 color-gray"
                            xlink="#icon-wsmp-complete"></m-icon>
                </div>
                <div flex
                     layout="row"
                     layout-align="center center">
                    <m-icon class="fs32 color-gray"
                            xlink="#icon-wsmp-complete"></m-icon>
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
import { Button } from 'mint-ui';
import Calendar from './calendar';

Vue.component(Button.name, Button);

export default {
    name: 'bookingTable',
    props: {},
    components: {
        Calendar
    },
    computed: {},
    data() {
        return {
            rows: [],
            visible: false,
            params: {
                date: this.$moment()
                    .startOf('d')
                    .format('YYYY-MM-DD HH:mm:ss')
            }
        };
    },
    mounted() {
        this.loadData();
    },
    methods: {
        loadData() {
            this.rows = [
                {
                    label: '待确认',
                    value: 1,
                    expand: true,
                    total: 1,
                    rows: [
                        {
                            label: '上午 8:00',
                            rows: [
                                {
                                    id: 1,
                                    memberName: '测试'
                                },
                                {
                                    id: 2,
                                    memberName: '测试'
                                }
                            ]
                        },
                        {
                            label: '上午 9:00',
                            rows: [
                                {
                                    id: 3,
                                    memberName: '测试'
                                },
                                {
                                    id: 4,
                                    memberName: '测试'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '已确认',
                    value: 1,
                    expand: false,
                    total: 1,
                    rows: [
                        {
                            label: '上午 8:00',
                            rows: [
                                {
                                    id: 1,
                                    memberName: '测试'
                                },
                                {
                                    id: 2,
                                    memberName: '测试'
                                }
                            ]
                        },
                        {
                            label: '上午 9:00',
                            rows: [
                                {
                                    id: 3,
                                    memberName: '测试'
                                },
                                {
                                    id: 4,
                                    memberName: '测试'
                                }
                            ]
                        }
                    ]
                }
            ];
        },
        showCalendar() {
            this.visible = true;
        },
        cellClick({ value }) {
            console.log(value);
        }
    }
};
</script>
<style lang="less" scoped>
@import '~styles/_agile';
@color1: #a43a8e;

.bt- {
    &header {
        position: fixed;
        height: 70px;
        top: 0;
        left: 0;
        right: 0;
        background-color: #fefbff;
        z-index: 2;
        box-shadow: 0 2px 23px 0 rgba(0, 0, 0, 0.07);
    }
    &expand-btn {
        height: 24px;
        background-color: #fefbff;
    }
    &week-panel {
    }
    &week-m {
        width: 60px - 13px;
        font-size: @fs30;
        text-align: center;
        color: @color-black;
    }
    &week-d {
        padding-left: 13px;
        padding-right: 13px;
        font-size: @fs24;
        text-align: center;
        color: @dark-gray;
        div {
            position: relative;
            z-index: 1;
        }
        :nth-child(2) {
            border-radius: 50%;
            width: 20px;
            height: 20px;
            line-height: 20px;
            margin: 0 auto;
        }
    }
    &week-d-s {
        :nth-child(1) {
            color: @color-black;
        }
        :nth-child(2) {
            background-color: @color-black;
        }
    }
    &content {
        padding: 70px 14px 49px 14px;
    }
    &footer {
        height: 49px;
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
            top: 10px;
            bottom: 0;
            background-color: #cad1de;
        }
        &::after {
            content: '';
            position: absolute;
            left: 1px;
            width: 7px;
            height: 7px;
            top: 8px;
            background-color: #aeb7cc;
            border-radius: 50%;
            box-shadow: 0 0 0 3px rgba(174, 183, 204, 0.17);
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
}
</style>
