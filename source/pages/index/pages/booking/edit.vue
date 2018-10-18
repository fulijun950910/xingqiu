<template>
    <div class="booking-edit-panel"
         v-title="title">
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
                        title="会员姓名"
                        :subTitle="booking.name"
                        @click.native="popupMemberVisible = true"></m-cell>
                <m-cell icon="#icon-dianhua1"
                        title="会员手机号"
                        :subTitle="booking.phone | mobileHide(showFullMobile)"
                        @click.native="popupMemberVisible = true"></m-cell>
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
                    @click.native="$store.getters.bookingManage && (popupStoreVisible = true)">
                <template slot="foot"
                          v-if="!$store.getters.bookingManage">
                    <div></div>
                </template>
            </m-cell>
            <m-cell :title="$store.getters.nounName('worker')"
                    :subTitle="empName"
                    :placeholder="`选择${$store.getters.nounName('worker')}`"
                    @click.native="$store.getters.bookingManage && (popupEmpVisible = true)">
                <template slot="foot"
                          v-if="!$store.getters.bookingManage">
                    <div></div>
                </template>
            </m-cell>
            <m-cell title="房间"
                    :subTitle="roomName"
                    placeholder="选择房间"
                    @click.native="popupRoomVisible = true"></m-cell>
            <div layout="row"
                 layout-align="space-between center"
                 class="be-title">
                <div>{{$store.getters.nounName('project')}}</div>
            </div>
            <m-cell :title="$store.getters.nounName('project')"
                    :placeholder="`选择预约${$store.getters.nounName('project')}`"
                    :subTitle="itemsName"
                    @click.native="popupItemsVisible = true"></m-cell>
            <div layout="row"
                 layout-align="space-between center"
                 class="be-title">
                <div>时间</div>
            </div>
            <m-cell title="日期"
                    :subTitle="startDate | amDateFormat('YYYY-MM-DD')"
                    @click.native="$refs.picker.open()"></m-cell>
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
                     v-show="item.expand">
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
                      v-model="booking.information"
                      rows="4"></mt-field>
            <button class="be-btn"
                    @click="saveClick">确定</button>
        </div>
        <!-- 会员 -->
        <m-popup-right v-model="popupMemberVisible"
                       class="be-popup-panel">
            <div class="bp-cont"
                 v-infinite-scroll="loadMoreMember"
                 infinite-scroll-disabled="memberQuery.loading"
                 infinite-scroll-distance="10"
                 infinite-scroll-immediate-check="false">
                <div class="bp-title">选择预约会员</div>
                <div class="bp-search"
                     layout="row">
                    <form action=""
                          flex>
                        <input type="search"
                               @keydown.enter="searchMember"
                               v-model="memberKeyword"
                               placeholder="搜索会员">
                    </form>
                    <a @click="searchMember">搜索</a>
                </div>
                <div class="bp-cell"
                     :class="{'bp-cell-s': booking.memberId == item.memberId}"
                     v-for="item in memberList"
                     :key="item.id"
                     @click="memberClick(item)"
                     layout="row"
                     layout-align="space-between center">
                    <div flex
                         layout="row"
                         layout-align="space-between center">
                        <span class="m-r-1">{{item.name}}</span>
                        <span class="fs24">{{item.mobile | mobileHide(showFullMobile)}}</span>
                    </div>
                    <m-icon class="fs24 bp-check"
                            v-if="booking.memberId == item.memberId"
                            xlink="#icon-queding"></m-icon>
                </div>
                <m-load-more :loading="!memberQuery.scrollDisabled"></m-load-more>
            </div>
        </m-popup-right>

        <!-- 门店 -->
        <m-popup-right v-model="popupStoreVisible"
                       class="be-popup-panel">
            <div class="bp-cont">
                <div class="bp-title">选择服务门店</div>
                <div class="bp-search"
                     layout="row">
                    <form action=""
                          flex>
                        <input type="search"
                               v-model="storeKeyword"
                               placeholder="搜索">
                    </form>
                </div>
                <div class="bp-cell"
                     :class="{'bp-cell-s': booking.storeId == item.id}"
                     v-for="item in filterStoreList"
                     :key="item.id"
                     @click="storeClick(item)"
                     layout="row"
                     layout-align="space-between center">
                    <div flex>{{item.name}}</div>
                    <m-icon class="fs24 bp-check"
                            v-if="booking.storeId == item.id"
                            xlink="#icon-queding"></m-icon>
                </div>
            </div>
        </m-popup-right>

        <!-- 技师 -->
        <m-popup-right v-model="popupEmpVisible"
                       class="be-popup-panel">
            <div class="bp-cont">
                <div class="bp-title">选择{{$store.getters.nounName('worker')}}</div>
                <div class="bp-search"
                     layout="row">
                    <form action=""
                          flex>
                        <input type="text"
                               v-model="empKeyword"
                               placeholder="搜索">
                    </form>
                </div>
                <div class="bp-cell"
                     :class="{'bp-cell-s': booking.employeeId == item.id}"
                     v-for="item in filterEmpList"
                     :key="item.id"
                     @click="empClick(item)"
                     layout="row"
                     layout-align="space-between center">
                    <div flex>{{item.name}} {{item.code}}</div>
                    <m-icon class="fs24 bp-check"
                            v-if="booking.employeeId == item.id"
                            xlink="#icon-queding"></m-icon>
                </div>
            </div>
        </m-popup-right>

        <!-- 房间 -->
        <m-popup-right v-model="popupRoomVisible"
                       class="be-popup-panel">
            <div class="bp-cont">
                <div class="bp-title">选择房间</div>
                <div class="bp-search"
                     layout="row">
                    <form action=""
                          flex>
                        <input type="text"
                               v-model="roomKeyword"
                               placeholder="搜索">
                    </form>
                </div>
                <div class="bp-cell"
                     :class="{'bp-cell-s': booking.roomId == item.id}"
                     v-for="item in filterRoomList"
                     :key="item.id"
                     @click="roomClick(item)"
                     layout="row"
                     layout-align="space-between center">
                    <div flex>{{item.name}}</div>
                    <m-icon class="fs24 bp-check"
                            v-if="booking.roomId == item.id"
                            xlink="#icon-queding"></m-icon>
                </div>
            </div>
        </m-popup-right>
        <!-- 日期 -->
        <mt-datetime-picker ref="picker"
                            type="date"
                            year-format="{value} 年"
                            month-format="{value} 月"
                            date-format="{value} 日"
                            :startDate="pickerOptions.startDate"
                            :endDate="pickerOptions.endDate"
                            @confirm="pickerConfirm"
                            v-model="pickerOptions.date">
        </mt-datetime-picker>
        <!-- 选择项目 -->
        <m-tree-select v-model="popupItemsVisible"
                       :heads="categoryList"
                       :rows="itemList"
                       :items="booking.items"
                       :page.sync="itemPage"
                       :keyword.sync="itemKeyword"
                       :loading="itemLoading"
                       :scrollDisabled="itemScrollDisabled"
                       @headClick="loadItemList"
                       @loadMore="item => loadItemList(item, true)"
                       @confirm="itemConfirm"></m-tree-select>
    </div>
</template>

<script>
import Vue from 'vue';
import { Switch, Cell, Field, InfiniteScroll, DatetimePicker } from 'mint-ui';
import mField from './components/field';
import mCell from './components/cell';
import mTreeSelect from './components/tree-select';
import mPopupRight from '@/components/popup-right';
import mLoadMore from '@/components/m-load-more';
import apiBooking from '@/services/api.booking';
Vue.component(Switch.name, Switch);
Vue.component(Cell.name, Cell);
Vue.component(Field.name, Field);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.use(InfiniteScroll);

export default {
    name: 'booking-edit',
    props: {},
    components: {
        mField,
        mCell,
        mPopupRight,
        mLoadMore,
        mTreeSelect
    },
    computed: {
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
        filterRoomList() {
            return this.roomList.filter(
                val =>
                    val.name.toLocaleLowerCase().indexOf(this.roomKeyword.toLocaleLowerCase()) !== -1 ||
                    val.code.toLocaleLowerCase().indexOf(this.roomKeyword.toLocaleLowerCase()) !== -1
            );
        },
        storeName() {
            if (this.booking.storeId) {
                return this.storeList.find(val => val.id === this.booking.storeId).name;
            }
        },
        empName() {
            if (this.booking.employeeId) {
                let item = this.empList.find(val => val.id === this.booking.employeeId);
                return item ? item.name : this.booking.employeeName;
            }
        },
        roomName() {
            if (this.booking.roomId) {
                let item = this.roomList.find(val => val.id === this.booking.roomId);
                return item ? item.name : this.booking.roomName;
            }
        },
        itemsName() {
            if (this.booking.items) {
                return this.booking.items.map(val => val.name).join('、');
            }
        },
        showFullMobile() {
            return this.$store.getters.permissions.indexOf('member_phone_view_full') !== -1;
        },
        title() {
            return this.$route.params.bookingId ? '预约编辑' : '预约新增';
        }
    },
    data() {
        return {
            isMember: true,
            customer: {
                name: '',
                phone: ''
            },
            pickerOptions: {
                date: this.$moment().toDate(),
                startDate: this.$moment()
                    .startOf('d')
                    .toDate(),
                endDate: this.$moment()
                    .endOf('y')
                    .add(1, 'y')
                    .toDate()
            },
            times: [],
            store: {},
            memberList: [],
            memberKeyword: '',
            popupMemberVisible: false,
            memberQuery: {
                size: 20,
                page: 1,
                loading: false,
                scrollDisabled: false
            },
            storeList: [],
            storeKeyword: '',
            popupStoreVisible: false,
            empList: [],
            empKeyword: '',
            popupEmpVisible: false,
            roomList: [],
            roomKeyword: '',
            popupRoomVisible: false,
            itemPage: 1,
            itemList: [],
            itemLoading: false,
            itemKeyword: '',
            categoryList: [],
            itemScrollDisabled: false,
            popupItemsVisible: false,
            startDate: '',
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
                storeId: this.$store.getters.storeId,
                merchantId: this.$store.getters.merchantId,
                roomId: '',
                information: ''
            }
        };
    },
    mounted() {
        if (this.$route.params.bookingId) {
            this.loadData();
        } else {
            this.init();
        }
    },
    methods: {
        init() {
            // 默认门店
            this.initStore();
            // 默认员工
            this.initEmp();
            this.loadEmpList();
            // 会员
            this.loadMemberList();
            // 房间
            this.loadRoomList();
            // 项目
            this.loadCategories();
            // 日期时间
            this.initTimes(this.$route.query.date ? this.$moment(this.$route.query.date, 'YYYYMMDD') : this.booking.startTime);
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
            let store = this.storeList.find(val => val.id === this.booking.storeId);
            if (store) {
                this.store = store;
            } else {
                this.store = this.storeList[0];
            }
        },
        initEmp() {
            this.booking.employeeId = this.$store.getters.employeeId;
        },
        initTimes(date) {
            if (!this.times.length) {
                this.times = [
                    { label: '上午', expand: false, rows: [], icon: '#icon-shangwu1' },
                    { label: '下午', expand: false, rows: [], icon: '#icon-xiawu' },
                    { label: '晚上', expand: false, rows: [], icon: '#icon-wanshang' }
                ];
            } else {
                this.times.forEach(val => {
                    val.rows = [];
                });
            }
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
            let startTime = this.$moment(date)
                .startOf('d')
                .add(start[0], 'h')
                .add(start[1], 'm');
            let endTime = this.$moment(date)
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
            this.pickerOptions.date = tempTime.toDate();
            this.startDate = this.$moment(tempTime);

            // 默认展开
            if (this.times.filter(val => val.expand).length === 0) {
                if (!this.booking.startTime) {
                    let dateTime = this.$moment(date)
                        .startOf('d')
                        .add(start[0], 'h')
                        .add(start[1], 'm');
                    let dateNow = this.$moment();
                    if (dateTime.isBefore(dateNow)) {
                        dateTime = this.$moment(dateNow)
                            .startOf('m')
                            .add(15 - (dateNow.minute() % 15), 'm');
                    }
                    this.booking.startTime = dateTime.format('YYYY-MM-DD HH:mm:ss');
                }
                if (this.$moment(this.booking.startTime).diff(tempTime, 'm') < 12 * 60) {
                    this.times[0].expand = true;
                } else if (this.$moment(this.booking.startTime).diff(tempTime, 'm') < 18 * 60) {
                    this.times[1].expand = true;
                } else {
                    this.times[2].expand = true;
                }
            }
        },
        searchMember() {
            this.memberQuery.scrollDisabled = false;
            this.memberQuery.page = 1;
            this.memberList = [];
            this.loadMemberList();
        },
        loadData() {
            this.$indicator.open();
            // 加载预约数据
            apiBooking.getAppointment({ id: this.$route.params.bookingId }).then(
                res => {
                    this.booking.appointmentId = res.data.id;
                    this.booking.memberType = res.data.memberType;
                    this.booking.memberCount = res.data.memberCount;
                    this.booking.employeeId = res.data.employeeId;
                    this.booking.employeeName = res.data.employeeName;
                    this.booking.roomName = res.data.roomName;
                    this.booking.startTime = res.data.startTime;
                    this.booking.endTime = res.data.endTime;
                    this.booking.items = res.data.itemVos;
                    this.booking.storeId = res.data.storeId;
                    this.booking.merchantId = this.$store.getters.merchantId;
                    this.booking.roomId = res.data.roomId;
                    this.booking.information = res.data.information;

                    if (res.data.memberId) {
                        this.booking.memberId = res.data.memberId;
                        this.booking.memberNo = res.data.memberNo;
                        this.booking.name = res.data.name;
                        this.booking.phone = res.data.phone;
                        this.isMember = true;
                    } else {
                        this.customer.name = res.data.name;
                        this.customer.phone = res.data.phone;
                    }
                    this.init();
                    this.$indicator.close();
                },
                err => {
                    this.$indicator.close();
                }
            );
        },
        loadMoreMember() {
            if (this.memberQuery.loading) {
                return;
            }
            this.loadMemberList();
        },
        loadMemberList() {
            if (this.memberQuery.scrollDisabled) {
                return;
            }
            this.memberQuery.loading = true;
            let params = {
                size: this.memberQuery.size,
                page: this.memberQuery.page,
                query: [
                    { field: 'merchantId', value: this.booking.merchantId },
                    { field: 'storeIds:', value: this.booking.storeId },
                    { field: 'keyword', value: this.memberKeyword }
                ],
                sort: [{ field: 'storeId', sort: 'desc' }]
            };
            apiBooking.memberSearch(params).then(
                res => {
                    this.memberList = [...this.memberList, ...res.data.rows];
                    if (this.memberList.length === res.data.total) {
                        this.memberQuery.scrollDisabled = true;
                    } else {
                        this.memberQuery.scrollDisabled = false;
                    }
                    this.memberQuery.loading = false;
                    this.memberQuery.page++;
                },
                err => {
                    this.memberQuery.loading = true;
                }
            );
        },
        loadEmpList() {
            apiBooking.getEmployees(this.store.id).then(
                res => {
                    this.empList = res.data.map(val => {
                        return {
                            id: val.id,
                            name: val.name,
                            acronym: val.acronym || '',
                            avatarFileId: val.avatarFileId,
                            code: val.code || '',
                            pinyin: val.pinyin || ''
                        };
                    });
                },
                err => {}
            );
        },
        loadRoomList() {
            apiBooking.getRooms(this.$store.getters.merchantId, this.store.id).then(
                res => {
                    this.roomList = res.data.map(val => {
                        return {
                            id: val.id,
                            name: val.name,
                            code: val.code || ''
                        };
                    });
                },
                err => {}
            );
        },
        loadCategories() {
            let params = { query: [{ field: 'merchantId', value: this.$store.getters.merchantId, operation: 'eq' }] };
            apiBooking.itemCategory(params).then(
                res => {
                    this.categoryList = res.data.childNodes;
                    this.loadItemList(this.categoryList[0]);
                },
                err => {}
            );
        },
        loadItemList(item, more) {
            if (this.itemLoading) {
                return;
            }
            let params = {
                page: this.itemPage,
                size: 20,
                query: [{ field: 'merchantId', value: this.$store.getters.merchantId }],
                sort: [{ field: 'code', sort: 'desc' }]
            };
            if (this.itemKeyword) {
                params.query.push({
                    field: 'keyword',
                    value: this.itemKeyword
                });
            }
            if (item) {
                let categoryLevel = item.code;
                params.query.push({
                    field: 'categoryLevel',
                    value: categoryLevel
                });
            }
            this.itemLoading = true;
            if (!more) {
                this.itemScrollDisabled = false;
                this.itemList = [];
            }
            apiBooking.itemSearch(params).then(
                res => {
                    this.itemLoading = false;
                    let rows = res.data.rows.map(val => {
                        return {
                            amount: 1,
                            itemId: val.id,
                            name: val.name,
                            price: val.sellingPrice,
                            serviceDuration: val.serviceDuration,
                            type: 'SERVICE_ITEM'
                        };
                    });
                    if (more) {
                        this.itemList = [...this.itemList, ...rows];
                    } else {
                        this.itemList = rows;
                    }
                    if (this.itemList.length === res.data.total) {
                        this.itemScrollDisabled = true;
                    } else {
                        this.itemScrollDisabled = false;
                    }
                    this.itemPage++;
                },
                err => {
                    this.itemLoading = false;
                }
            );
        },
        itemConfirm(items) {
            if (items && items.length) {
                this.booking.items = [...items];
            } else {
                this.booking.items = [];
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
        memberClick(item) {
            this.booking.name = item.name;
            this.booking.phone = item.mobile;
            this.booking.memberId = item.memberId;
            this.booking.memberNo = item.memberNo;
            this.popupMemberVisible = false;
        },
        storeClick(item) {
            if (item.id !== this.booking.storeId) {
                // 切换门店清空已选员工、房间
                this.booking.employeeId = undefined;
                this.booking.roomId = undefined;
            }
            this.booking.storeId = item.id;
            this.store = item;
            this.popupStoreVisible = false;
            // 门店可预约时间更新
            this.initTimes(this.startDate);
            this.loadEmpList();
            this.loadRoomList();
        },
        empClick(item) {
            this.booking.employeeId = item.id;
            this.popupEmpVisible = false;
        },
        roomClick(item) {
            this.booking.roomId = item.id;
            this.popupRoomVisible = false;
        },
        saveClick() {
            // 会员校验
            if (this.isMember && !this.booking.memberId) {
                this.$toast('请选择会员');
                return;
            }
            if (!this.isMember) {
                if (!this.customer.name || !this.customer.phone) {
                    this.$toast('请输入预约人信息');
                    return;
                }
            }
            // 时间校验
            if (!this.booking.startTime) {
                this.$toast('请选择预约时间');
                return;
            }
            // 备注校验
            if (this.booking.information && this.booking.information.length > 150) {
                this.$toast('备注信息最多150字');
                return;
            }
            this.$indicator.open();
            let params = {
                appointmentId: this.booking.appointmentId,
                merchantId: this.booking.merchantId,
                storeId: this.booking.storeId,
                employeeId: this.booking.employeeId,
                employeeName: this.empName,
                information: this.booking.information,
                items: this.booking.items,
                memberCount: this.booking.memberCount,
                roomId: this.booking.roomId,
                roomName: this.roomName,
                startTime: this.booking.startTime,
                endTime: this.$moment(this.booking.startTime)
                    .add(1, 'h')
                    .format('YYYY-MM-DD HH:mm:ss')
            };
            // 是否会员
            if (this.isMember) {
                params.name = this.booking.name;
                params.phone = this.booking.phone;
                params.memberId = this.booking.memberId;
                params.memberNo = this.booking.memberNo;
                params.memberType = 1;
            } else {
                params.name = this.customer.name;
                params.phone = this.customer.phone;
            }
            // 结束时间
            if (params.items.length) {
                let endTime = this.$moment(params.startTime);
                params.items.forEach(val => {
                    endTime.add(val.serviceDuration ? val.serviceDuration : 0, 'm');
                });
                params.endTime = endTime.format('YYYY-MM-DD HH:mm:ss');
            }
            apiBooking.saveBooking(params).then(
                res => {
                    this.$indicator.close();
                    this.$toast('预约保存成功');
                    this.$router.go(-1);
                    sessionStorage.setItem('reservations', JSON.stringify(params));
                    // 存储预约用户的数据
                    // sessionStorage.setItem('reservations', JSON.stringify(params));
                },
                err => {
                    this.$indicator.close();
                }
            );
        },
        pickerConfirm() {
            this.startDate = this.$moment(this.pickerOptions.date);
            this.initTimes(this.startDate);
            if (this.booking.startTime) {
                let startTime = this.$moment(this.booking.startTime);
                this.booking.startTime = this.$moment(this.startDate)
                    .set({ h: startTime.hour(), m: startTime.minute() })
                    .format('YYYY-MM-DD HH:mm:ss');
            }
        }
    },
    filters: {
        mobileHide(val, isShow) {
            if (val && val.length > 5 && !isShow) {
                let len = val.length - 4;
                if ((len - 4) % 2 === 1) {
                    len++;
                }
                return `${val.substr(0, Math.min(parseInt((val.length - 4) / 2), 3))} **** ${val.substring(
                    val.length - Math.min(len / 2, 4),
                    val.length
                )}`;
            }
            return val;
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
            a {
                line-height: 35px;
                padding-left: 12px;
                padding-right: 12px;
                margin-right: -12px;
                font-size: 13px;
                color: @extra-black;
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
        .bp-check {
            position: absolute;
            right: 8px;
        }
    }
}
</style>
