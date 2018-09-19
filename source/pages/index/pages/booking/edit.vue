<template>
    <div class="booking-edit-panel">
        <div>
            <img :src="require('@/assets/imgs/booking-banner.png')"
                 alt="">
        </div>
        <div class="be-content">
            <div layout="row"
                 layout-align="space-between center"
                 class="be-title">
                <div>是否为会员</div>
                <mt-switch v-model="isMember"></mt-switch>
            </div>
            <div v-if="isMember">
                <m-cell icon="#icon-xingming1"
                        title="会员姓名"></m-cell>
                <m-cell icon="#icon-dianhua1"
                        title="会员手机号"></m-cell>
            </div>
            <div v-else>
                <m-field icon="#icon-xingming1"
                         placeholder="请输入预约人姓名"
                         v-model="customer.name"></m-field>
                <m-field icon="#icon-dianhua1"
                         placeholder="请输入预约人手机号"
                         v-model="customer.phone"></m-field>
            </div>
            <div layout="row"
                 layout-align="space-between center"
                 class="be-title">
                <div>预约信息</div>
            </div>
            <m-cell title="服务门店"
                    :subTitle="store.name"
                    @click.native="popupStoreVisible = true"></m-cell>
            <m-cell title="技师"
                    :subTitle="emp.name"
                    @click.native="popupEmpVisible = true"></m-cell>
            <m-cell title="房间"
                    placeholder="默认">
                <div class="ex-color">（不选择则默认分配）</div>
            </m-cell>
            <div layout="row"
                 layout-align="space-between center"
                 class="be-title">
                <div>项目</div>
            </div>
            <m-cell title="项目"
                    placeholder="选择预约项目">
            </m-cell>
            <div layout="row"
                 layout-align="space-between center"
                 class="be-title">
                <div>时间</div>
            </div>
            <m-cell title="日期"
                    subTitle="2018-09-20">
            </m-cell>
            <div v-for="(item, index) in times"
                 :key="index">
                <div class="be-time-head"
                     layout="row"
                     layout-align="space-between center"
                     @click="timeHeadClick(item)">
                    <m-icon class="fs28"
                            :xlink="item.icon"></m-icon>
                    <div class="be-time-title"
                         flex>{{item.label}}</div>
                    <m-icon class="fs24 be-tt"
                            :class="{rotate180: item.expand}"
                            xlink="#icon-shangla"></m-icon>
                </div>
                <div layout="row"
                     layout-align="start center"
                     flex-wrap="wrap"
                     class="be-time-cont"
                     :class="{'be-time-expand': item.expand}">
                    <div flex="25"
                         v-for="(time, index) in item.rows"
                         :key="index"
                         class="be-item"
                         :class="{'be-item-s': booking.startTime === time}"
                         @click="selectedStartTime(time)">
                        <div>{{time | amDateFormat('HH:mm')}}</div>
                    </div>
                </div>
            </div>
            <div layout="row"
                 layout-align="space-between center"
                 class="be-title">
                <div>备注</div>
            </div>
            <mt-field label=""
                      placeholder="备注信息"
                      type="textarea"
                      class="be-text"
                      rows="4"></mt-field>
            <button class="be-btn">确定</button>
        </div>
        <!-- 门店 -->
        <m-popup-right v-model="popupStoreVisible"
                       class="be-popup-panel">
            <div class="bp-cont">
                <div class="bp-title">选择服务门店</div>
                <div class="bp-search">
                    <input type="text"
                           v-model="storeKeyword"
                           placeholder="搜索">
                </div>
                <div class="bp-cell"
                     :class="{'bp-cell-s': booking.storeId == item.id}"
                     v-for="item in filterStoreList"
                     :key="item.id"
                     @click="storeClick(item)"
                     layout="row"
                     layout-align="space-between center">
                    <div flex>{{item.name}}</div>
                    <m-icon class="fs24 be-tt color-black"
                            v-if="booking.storeId == item.id"
                            xlink="#icon-queding"></m-icon>
                </div>
            </div>
        </m-popup-right>

        <!-- 技师 -->
        <m-popup-right v-model="popupEmpVisible"
                       class="be-popup-panel">
            <div class="bp-cont">
                <div class="bp-title">选择技师</div>
                <div class="bp-search">
                    <input type="text"
                           v-model="empKeyword"
                           placeholder="搜索">
                </div>
                <div class="bp-cell"
                     :class="{'bp-cell-s': booking.employeeId == item.id}"
                     v-for="item in filterEmpList"
                     :key="item.id"
                     @click="empClick(item)"
                     layout="row"
                     layout-align="space-between center">
                    <div flex>{{item.name}}</div>
                    <m-icon class="fs24 be-tt color-black"
                            v-if="booking.employeeId == item.id"
                            xlink="#icon-queding"></m-icon>
                </div>
            </div>
        </m-popup-right>
    </div>
</template>

<script>
import Vue from 'vue';
import { Switch, Cell, Field } from 'mint-ui';
import mField from './field';
import mCell from './cell';
import mPopupRight from '@/components/popup-right';
Vue.component(Switch.name, Switch);
Vue.component(Cell.name, Cell);
Vue.component(Field.name, Field);

export default {
    name: 'booking-edit',
    props: {},
    components: {
        mField,
        mCell,
        mPopupRight
    },
    computed: {
        filterStoreList() {
            return this.storeList.filter(val => val.name.indexOf(this.storeKeyword) !== -1);
        },
        filterEmpList() {
            return this.empList.filter(val => val.name.indexOf(this.storeKeyword) !== -1);
        },
        storeName() {
            if (!this.booking.storeId) {
                return '';
            }
            return this.storeList.find(val => val.id === this.booking.storeId).name;
        }
    },
    data() {
        return {
            isMember: false,
            customer: {
                name: '',
                phone: ''
            },
            times: [],
            store: {},
            storeList: [],
            storeKeyword: '',
            popupStoreVisible: false,
            emp: {},
            empList: [],
            empKeyword: '',
            popupEmpVisible: false,
            booking: {
                name: '',
                phone: '',
                memberType: 3,
                memberId: '',
                memberNo: '',
                memberCount: 1,
                employeeId: '',
                employeeName: '',
                roomName: '',
                startTime: '',
                endTime: '',
                items: [],
                storeId: '',
                merchantId: '',
                roomId: '',
                information: ''
            }
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            // 默认门店
            this.initStore();
            // 默认员工
            this.initEmp();
            // 房间
            // 项目
            // 日期
            // 时间
            this.initTimes();
        },
        initStore() {
            this.storeList = this.$store.state.storeList.map(val => {
                return {
                    id: val.id,
                    name: val.name,
                    appoinmentTimeStart: val.appoinmentTimeStart,
                    appoinmentTimeEnd: val.appoinmentTimeEnd
                };
            });
            let store = this.storeList.find(val => val.id === this.$store.getters.storeId);
            if (store) {
                this.store = store;
            } else {
                this.store = this.storeList[0];
            }
            this.booking.storeId = this.store.id;
        },
        initEmp() {
            this.booking.employeeId = this.$store.getters.employeeId;
        },
        initTimes() {
            this.times = [
                { label: '上午', expand: false, rows: [], icon: '#icon-shangwu1' },
                { label: '下午', expand: false, rows: [], icon: '#icon-xiawu' },
                { label: '晚上', expand: false, rows: [], icon: '#icon-wanshang' }
            ];
            // TODO: 默认展开当前范围
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
            let startTime = this.$moment(this.$route.query.date)
                .startOf('d')
                .add(start[0], 'h')
                .add(start[1], 'm');
            let endTime = this.$moment(this.$route.query.date)
                .startOf('d')
                .add(end[0], 'h')
                .add(end[1], 'm');
            let tempTime = this.$moment(startTime).startOf('d');

            while (!startTime.isAfter(endTime)) {
                if (startTime.diff(tempTime, 'm') < 12 * 60) {
                    this.times[0].rows.push(startTime.format('YYYY-MM-DD HH:mm:ss'));
                } else if (startTime.diff(tempTime, 'm') < 18 * 60) {
                    this.times[1].rows.push(startTime.format('YYYY-MM-DD HH:mm:ss'));
                } else {
                    this.times[2].rows.push(startTime.format('YYYY-MM-DD HH:mm:ss'));
                }
                startTime.add(15, 'm');
            }
        },
        timeHeadClick(item) {
            if (item.expand) {
                return;
            }
            item.expand = !item.expand;
            this.times.forEach(val => {
                if (val !== item) {
                    val.expand = false;
                }
            });
        },
        selectedStartTime(time) {
            this.booking.startTime = time;
        },
        storeClick(item) {
            this.booking.storeId = item.id;
            this.store = item;
            this.popupStoreVisible = false;
            // 门店可预约时间更新
            this.initTimes();
        }
    }
};
</script>
<style lang="less">
@import '~styles/_agile';
@ex-color-primary: #a43a8e;

.booking-edit-panel {
    .ex-color {
        color: #f68439;
    }
    .ex-fs13 {
        font-size: 13px;
    }
    .be-content {
        padding: 0 14px;
        margin-top: -15px;
    }
    .be-title {
        font-size: 17px;
        font-weight: bold;
        margin-top: 25px;
    }
    .be-time-head {
        color: @color-black;
        height: 45px;
    }
    .be-time-title {
        font-size: 13px;
    }
    .icon + .be-time-title {
        margin-left: 6px;
    }
    .be-tt {
        transition: all 0.28s;
    }
    .rotate180 {
        transform: rotate(-180deg);
    }
    .be-time-cont {
        .be-tt;
        overflow: hidden;
        max-height: 0;
        .be-item {
            line-height: 30px;
            font-size: 13px;
            text-align: center;
            padding-left: 1px; /*no*/
            padding-bottom: 1px; /*no*/
            & > div {
                border: 1px solid @light-gray; /*no*/
                border-radius: 2px; /*no*/
            }
            &-s > div {
                border-color: @ex-color-primary;
                background-color: #fff8fd;
            }
        }
        .be-item[disable] > div {
            border-color: @light-gray;
            color: @dark-gray;
        }
    }
    .be-time-expand {
        max-height: 1000px;
    }
    .mint-switch-input:checked + .mint-switch-core {
        border-color: @ex-color-primary;
        background-color: @ex-color-primary;
    }
    .be-text {
        margin-top: 16px;
        background-color: @color-bg;
        .mint-cell-wrapper {
            background-image: none;
        }
        textarea {
            background-color: transparent;
            font-size: 12px;
        }
    }
    .be-btn {
        width: 50%;
        margin-left: 25%;
        margin-top: 28px;
        margin-bottom: 50px;
        background-color: @ex-color-primary;
        color: white;
        box-shadow: 0px 4px 8px 0px fade(@ex-color-primary, 25%);
        border-radius: 26px;
        line-height: 44px;
        font-size: 15px;
        &:active {
            background-color: darken(@ex-color-primary, 10%);
        }
    }
    .be-popup-panel {
        width: 82%;
        .bp-title {
            line-height: 60px;
            padding: 0 20px;
            font-size: 15px;
            font-weight: bold;
            color: @color-black;
            background-color: @bg-gray;
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
            padding: 0 20px;
            border-bottom: 1px solid @light-gray; /*no*/
            input {
                height: 50px;
                width: 100%;
                padding: 0;
                font-size: 13px;
            }
        }
        .bp-cell {
            font-size: 13px;
            border-bottom: 1px solid @light-gray; /*no*/
            padding: 12px 20px;
            color: @extra-black;
            &-s {
                color: @color-black;
            }
        }
    }
}
</style>
