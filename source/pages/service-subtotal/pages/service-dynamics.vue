<template>
    <div class="container" :class="{active:vm.mask}" v-title="'服务动态'" v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
        <!--         <div class="mask" v-if="vm.mask" v-on:click="searchStatu()">
        </div> -->
        <div class="mask" v-if="swipe.show">
        </div>
        <div class="top-bar" :class="{active:swipe.show}">
            <div layout="row" layout-align="start center" flex v-if="!vm.search.show">
                <a class="bar-btn border-r" layout="row" layout-align="center center" v-if="admin" flex v-on:click="searchStatu()">
                    <div v-if="!vm.search.main">
                        <m-icon link="icon-search2"></m-icon>
                        <span class="bar-text">搜索</span>
                    </div>
                    <span v-if="vm.search.main" flex class="text-center">
                    {{vm.search.main}}
                     </span>
                    <span v-if="!admin">{{user.name}}</span>
                    <span v-on:click.stop="clearSearch()" flex="20" v-if="vm.search.main">
                    <m-icon class="icon icon-close-grey icon-margin" link="icon-close"></m-icon>
                     </span>
                </a>
                <a class="bar-btn border-r" layout="row" layout-align="center center" flex v-if="!admin">
                    {{user.name}}
                </a>
                <a class="bar-btn see-data" layout="row" layout-align="center center" flex @click="toData">
                    <m-icon link="icon-shuju"></m-icon>

                    <span class="bar-text">查看数据</span>
                </a>
            </div>
            <!--搜索框begin-->
            <auto-searchbar :visiable.sync="vm.search.show" :employeeList="vm.employeeList" @change="getEmployeeList" @itemClick="employeeClick" :searchText="vm.search.text"></auto-searchbar>
            <!-- 搜索框end -->
        </div>
        <div class="placeholder" :class="{active1:noData}" flex>
        </div>
        <div class="dynamics" :class="{active1:noData}">
            <no-Data :visible="noData"></no-Data>
            <div class="div-box" :class="{'has-del': item.employeeId == $store.state.user.id}" v-for="(item,pIndex) in dataList" :key="item.id">
                <p class="text-right" v-if="item.employeeId == $store.state.user.id">
                    <m-icon class="icon btn-close" link="icon-close" @click.stop="delRecord(item, pIndex)"></m-icon>
                </p>
                <div class="title" layout="row" layout-align="space-between center">
                    <div class="user" layout="row" layout-align="center center">
                        <span class="view">
                            <img alt="" :src="item.employeeAvatarId | mSrc(40, 40, require('assets/imgs/avatar.png'))">
                        </span>
                        <div>
                            <h3>No.{{item.employeeNo}}</h3>
                            <h3>{{item.employeeName}}</h3>
                        </div>
                    </div>
                    <div class="text-type" layout="row" layout-align="center center">
                        <m-icon link="icon-fuwu-copy" v-if="item.type == 1"></m-icon>
                        <m-icon link="icon-dianhua" v-if="item.type == 2"></m-icon>
                        <span>{{item.type | messageType}}</span>
                    </div>
                </div>
                <div class="main-text" flex v-if="item.status == 1">
                    {{item.content}}
                </div>
                <div class="no-edit" flex v-if="item.status == 0" layout="row" layout-align="center center">
                    <span>
                        未进行记录
                    </span>
                    <span flex></span>
                    <a class="link" v-if="item.status == 0 && item.employeeId == user.id" v-on:click="addServiceNote(item)">点此进行记录<m-icon :link="'icon-right-bold'"></m-icon></a>
                </div>
                <div class="main-img" layout="row" layout-align="start center" flex-wrap="wrap" v-if="item.status == 1">
                    <span flex="30" v-for="(img,index) in item.imageIds" v-on:click="scaleImg(pIndex,index)" :key="index">
                        <img  :src="img | mSrc(200,200)" alt="">
                    </span>
                </div>
                <div flex layout="row" layout-align="start center" flex-wrap="wrap" class="project" v-if="item.type == 1">
                    <m-icon class="xiangmu" link="icon-xiangmu"></m-icon>
                    <template v-if="item.serviceSmallNote">
                        <span v-for="(project, index) in item.serviceSmallNote.item" :key="index">{{project.itemName}}<i v-if="item.serviceSmallNote.item.length > 1">,</i></span>
                    </template>
                </div>
                <div class="box-bottom" flex layout="row" layout-align="start center">
                    <span>{{item.recordTime ? item.recordTime : item.createTime | amCalendar}}</span>
                    <span flex></span>
                    <a>客户：{{item.memberName}}</a>
                </div>
            </div>
            <m-load-more :loading="!scrollDisabled"></m-load-more>
        </div>
        <bottom-menu @click="link" :flex="vm.flex"></bottom-menu>
        <!-- 图片放大 -->
        <mt-swipe :auto="0" v-if="swipe.show" :showIndicators="true" :continuous="false" :defaultIndex="swipe.index" v-on:click="scaleImg(index)">
            <mt-swipe-item v-for="(i,index) in outerImg" :key="index" >
                <div class="img-box" layout="column" layout-align="center center">
                    <img :src="i | qSrc" alt="" @click.stop="imgHide">
                </div>
            </mt-swipe-item>
        </mt-swipe>
        <!-- 底部门店显示 -->
        <m-picker v-model="storePickerVisible" :slots="slots" :selected-item.sync="selectedStore" value-key="name" @confirm="changeStore"></m-picker>
        <!-- 底部状态显示 -->
        <m-picker v-model="statusPickerVisible" :slots="status" :selected-item.sync="selectedstatus" value-key="name" @confirm="changestatus"></m-picker>
        <mt-actionsheet :actions="actions" v-model="sheetVisible" cancel-text=""></mt-actionsheet>
        <m-date-range-picker v-model="dateRangeVisible" :start-date.sync="vm.timeInterval.startDate" :end-date.sync="vm.timeInterval.endDate" @confirm="changeDateRange"></m-date-range-picker>
        <!-- 编辑 -->
        <div class="btn-fixed btn-edit" @click="$router.push({name:'member-maintain'})">
            <m-icon link="icon-edit"></m-icon>
        </div>
        <div class="btn-fixed btn-go-top" v-on:click="toTop" v-if="scroll">
            <m-icon link="icon-top"></m-icon>
        </div>
    </div>
</template>
<script>
// 引用底部的菜单
import Vue from 'vue';
import $ from 'jquery';
import {
    DatetimePicker,
    Lazyload,
    Swipe,
    SwipeItem,
    Actionsheet,
    InfiniteScroll
} from 'mint-ui';
import mLoadMore from 'components/m-load-more';
import bottomMenu from 'components/bottom-menu';
import autoSearchbar from 'components/auto-search-bar';
import mPicker from 'components/m-picker';
import mDateRangePicker from 'components/m-date-range-picker';
import service from 'services/api.serviceNote';
import noData from 'components/no-data';
Vue.use(Lazyload);
Vue.use(InfiniteScroll);
export default {
    name: 'service-dynamics',
    components: {
        bottomMenu,
        autoSearchbar,
        mPicker,
        mLoadMore,
        noData,
        [DatetimePicker.name]: DatetimePicker,
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        [Actionsheet.name]: Actionsheet,
        mDateRangePicker
    },

    data() {
        return {
            admin: this.$store.getters.admin,
            storePickerVisible: false,
            statusPickerVisible: false,
            slots: [],
            selectedStore: {},
            selectedstatus: {},
            sheetVisible: false,
            dateRangeVisible: false,
            outerImg: [],
            tempPage: 0,
            status: [{
                flex: 1,
                values: [{
                    name: '全部状态'
                }, {
                    name: '客户关怀',
                    value: 2
                }, {
                    name: '服务小计',
                    value: 1
                }],
                className: 'slot1',
                textAlign: 'center',
                defaultIndex: 0
            }],
            actions: [],
            vm: {
                employeeList: [],
                search: {
                    statu: false,
                    show: false,
                    text: '',
                    main: this.$route.params.employeeName
                },
                flex: 25,
                mask: false,
                pickerValue: '',
                selectedStoreId: this.$route.query.storeId,
                timeInterval: {
                    startDate: this.$route.params.startDate,
                    endDate: this.$route.params.endDate
                }
            },
            swipe: {
                index: '',
                show: false
            },
            dataList: [],
            merchantId: this.$store.state.merchant.id,
            store: this.$store.state.storeList,
            storeIds: [],
            page: 1,
            rows: 20,
            user: this.$store.state.user,
            scroll: false,
            routerEmployee: '',
            noData: false,
            mainEmployee: {
                id: this.$route.params.employeeId,
                name: this.$route.params.employeeName
            },
            loading: false,
            scrollDisabled: false
        };
    },
    mounted() {
        // 清楚默认筛选条件
        this.selectedStore = null;
        this.selectedstatus = null;
        this.vm.timeInterval.startDate = null;
        this.vm.timeInterval.endDate = null;

        for (let i = 0; i < this.store.length; i++) {
            this.storeIds.push(this.store[i].id);
        };
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
        this.actions = [{
            name: '重置',
            method: this.selectedDateRange,
            value: {}
        }, {
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
        window.onscroll = () => {
            var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
            if (scrolltop > 100) {
                this.scroll = true;
            } else {
                this.scroll = false;
            }
        };
        this.messageServiceList();
    },
    methods: {
        // 显示/隐藏搜索详情
        searchStatu() {
            this.vm.search.show = !this.vm.search.show;
            this.getEmployeeList();
        },
        maskHide() {
            this.vm.mask = false;
            this.vm.search.statu = false;
            this.vm.search.show = false;
        },
        backMain(item) {
            this.vm.search.main = item;
            this.searchStatu();
            this.messageServiceList();
        },
        delRecord(item, idx) {
            if (item.employeeId != this.$store.state.user.id) {
                return;
            }
            this.$messageBox.confirm('确定删除这条记录么?').then(action => {
                service.deleteCustomerConcern(item.id).then(res => {
                    this.$toast('删除成功');
                    this.dataList.splice(idx, 1);
                }, err => {
                    this.$toast('请稍后再试');
                });
            }, calcel => {});
        },
        link(index, item) {
            switch (index) {
                case 0:
                    this.$router.go(-1);
                    break;
                case 1:
                    if (this.$store.state.storeList.length > 1) {
                        this.storePickerVisible = true;
                    } else {
                        this.$toast('无可切换门店');
                    }
                    break;
                case 2:
                    this.vm.timeInterval = {
                        startDate: this.$moment().format('YYYY-MM-DD HH:mm:ss'),
                        endDate: this.$moment().format('YYYY-MM-DD HH:mm:ss')
                    };
                    this.sheetVisible = true;
                    break;
                case 3:
                    this.statusPickerVisible = true;
            }
        },
        // 清除显示的员工
        clearSearch() {
            this.vm.search.main = '';
            // this.$route.params = {};
            this.mainEmployee = '';
            this.resetSreach();
        },
        // 点击返回顶部
        toTop() {
            $('body,html').animate({
                scrollTop: 0
            }, 500);
        },
        openPicker() {
            this.$refs.picker.open();
        },
        imgHide() {
            this.vm.mask = false;
            this.swipe.show = false;
        },
        scaleImg(pIndex, index) {
            this.swipe.show = !this.swipe.show;
            this.$knife.deepCopy(this.dataList[pIndex].imageIds, this.outerImg);
            this.swipe.index = index;
        },
        handleConfirm(date) {
            let self = this;
            let parameter = {
                merchantId: self.merchantId,
                storeIds: self.storeIds.join(',')
            };
            console.log(parameter);
        },
        changeStore(item) {
            this.selectedStore = item[0];
            this.resetSreach();
        },
        resetSreach() {
            this.page = 1;
            this.scrollDisabled = false;
            this.dataList = [];
            this.messageServiceList();
        },
        changestatus(item) {
            this.selectedstatus = item[0];
            this.resetSreach();
        },
        changeDateRange(start, end) {
            // this.routerParameter.startDate = this.$moment(start).format('YYYY-MM-DD HH:mm:ss');
            // this.routerParameter.endDate = this.$moment(end).format('YYYY-MM-DD HH:mm:ss');
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
            };
        },
        employeeClick(item) {
            this.loading = false;
            this.scrollDisabled = false;
            this.page = 1;
            this.mainEmployee = item;
            this.messageServiceList();
        },
        // 获取员工列表
        getEmployeeList(text) {
            this.vm.search.text = text;
            let self = this;
            let parameter = {
                merchantId: self.merchantId,
                storeIds: self.storeIds.join(','),
                employeeId: self.user.id
            };
            if (self.vm.search.text) {
                parameter.employeeName = self.vm.search.text;
            }
            service.employeeList(parameter).then(function(res) {
                self.vm.employeeList = res.data;
            }, function(erro) {
                console.log('网络错误！');
            });
        },
        messageServiceList() {
            let self = this;
            let parameter = {
                merchantId: self.merchantId,
                storeIds: self.storeIds.join(','),
                page: self.page,
                rows: self.rows
            };
            if (self.selectedStore) {
                parameter.storeIds = self.selectedStore.id;
            };
            if (self.selectedstatus) {
                parameter.type = self.selectedstatus.value;
            };
            if (self.mainEmployee) {
                parameter.employeeId = self.mainEmployee.id ? self.mainEmployee.id : '';
                parameter.employeeName = self.mainEmployee.name ? self.mainEmployee.name : '';
            }
            if (self.vm.timeInterval.startDate) {
                parameter.startDate = self.vm.timeInterval.startDate;
            };
            if (self.vm.timeInterval.endDate) {
                parameter.endDate = self.vm.timeInterval.endDate;
            };
            if (this.$route.params.type) {
                parameter.type = this.$route.params.type;
            }
            if (this.loading) {
                return;
            }
            this.loading = true;
            service.messageServiceList(parameter).then(res => {
                if (res.data.rows.length > 0) {
                    for (let i = 0; i < res.data.rows.length; i++) {
                        if (res.data.rows[i].imageIds) {
                            res.data.rows[i].imageIds = res.data.rows[i].imageIds.split(',');
                        }
                    };
                };
                if (res.data.rows.length < self.rows) {
                    this.scrollDisabled = true;
                } else {
                    this.scrollDisabled = false;
                }
                this.dataList = this.dataList.concat(res.data.rows);
                this.loading = false;
                self.page++;
            }, erro => {
                this.loading = false;
                console.log('网络错误！');
            });
        },
        addServiceNote(item) {
            this.$router.push({
                name: 'service-record-create',
                params: {
                    serviceId: item.id
                },
                query: {
                    memberId: item.memberId
                }
            });
        },
        touchUpdate() {
            if (this.routerEmployee) {
                if (this.routerEmployee.length > 0) {
                    this.messageServiceList(this.routerEmployee);
                } else {
                    this.messageServiceList();
                }
            } else {
                this.messageServiceList();
            }
        },
        toData() {
            let routeParameter = {
                employeeId: this.mainEmployee ? this.mainEmployee.id : this.user.id
            };
            if (this.selectedStore) {
                routeParameter.storeIds = this.selectedStore.id;
            };
            if (this.vm.timeInterval.startDate) {
                routeParameter.startDate = this.$moment(this.vm.timeInterval.startDate).format('YYYY-MM-DD HH:mm:ss');
            };
            if (this.vm.timeInterval.endDate) {
                routeParameter.endDate = this.$moment(this.vm.timeInterval.endDate).format('YYYY-MM-DD HH:mm:ss');
            };
            this.$router.push({
                name: 'data-view',
                params: routeParameter
            });
        },
        loadMore() {
            this.messageServiceList();
        }
    }
};
</script>
<style lang="less">
@import '~styles/_agile.less';
.container {
    background: @color-bg;
    min-height: 100%;
    // height: 100%;
    // width: 100%;
    // overflow-x: hidden;
    position: relative;
    -webkit-overflow-scrolling: touch;
    .mask {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: @color-black;
        z-index: 2;
    }
    .top-bar {
        border-bottom: 1px solid @light-gray;
        position: relative;
        z-index: 3;
        background: @white;
        .bar-btn {
            padding: @l16 * 2 0;
            color: @extra-light-black;
            .icon-close-grey {
                color: @dark-gray;
            }
        }
        .see-data {
            color: @color-primary;
        }
        .border-r {
            border-right: 1px solid @light-gray;
        }
        .icon {
            font-size: @fs36;
            color: @color-primary;
        }
        .icon-close {
            color: @color-black;
        }
        .bar-text {
            font-size: @fs28;
            margin-left: @fs16;
        }
        .search-input {
            position: relative;
            background: @white;
            input {
                font-size: @fs28;
            }
        }
    }
    .active {
        z-index: 1;
    }
    .placeholder {
        height: @l24;
        background: @white;
    }
    .active1 {
        background: @white;
    }
    .dynamics {
        background: @color-bg;
        padding-bottom: 59px;
        .div-box {
            background: @white;
            padding: @l16 * 2;
            padding-bottom: 0;
            margin-top: 2 * @l16;
            position: relative;
            &.has-del {
                padding-top: 0;
            }
            .btn-close {
                font-size: 16px;
                margin-top: 8px;
            }
            .no-edit {
                padding: @l16 * 3 0;
                a {
                    color: @color-tiffany-blue;
                }
                span {
                    color: @gray;
                }
            }
            .title {
                position: relative;
                .view {
                    display: block;
                    width: 50.5px;
                    height: 50.5px;
                    border-radius: 100%;
                    overflow: hidden;
                    margin-right: @l16;
                    img[lazy=loading] {
                        max-width: 100%;
                        max-height: 100%;
                        min-height: 100%;
                        max-width: 100%;
                    }
                }
                h3 {
                    font-size: @fs24;
                    font-weight: normal;
                    color: @extra-light-black;
                }
                img[lazy=loading] {
                    display: block;
                    max-height: 100%;
                    max-width: 100%;
                }
            }
            .main-text {
                font-size: @fs28;
                color: @extra-light-black;
                margin: @l16 * 2 0;
                line-height: @fs24 * 2;
            }
            .main-img {
                span {
                    width: 106.5px;
                    height: 110.95px;
                    margin-bottom: 2 * @l16;
                    flex-wrap: wrap;
                    overflow: hidden;
                    margin-right: 5%;
                    img {
                        max-width: 100%;
                        max-height: 100%;
                    }
                }
                span:nth-of-type(3n) {
                    margin-right: 0;
                }
                border-bottom:1px solid @light-gray;
            }
            .project {
                margin-top: @l16;
                span {
                    font-size: @fs24;
                    color: @gray;
                }
                .xiangmu {
                    color: @light-gray;
                    margin-right: 5px;
                }
            }
            .text-type {
                // border: 1px solid @light-gray;
                border-radius: 5px;
                right: 0;
                padding: @l8;
                font-size: @fs28;
                span {
                    color: @gray;
                    margin-left: 5px;
                }
            }
            .box-bottom {
                padding: 2 * @l16 0;
                span {
                    color: @gray;
                }
                a {
                    color: @gray;
                }
                .link {
                    color: @color-tiffany-blue;
                    font-size: @fs24;
                }
            }
            &:first-child {
                margin-top: 0;
            }
        }
    }
    .dynamics.active1 {
        background: @white;
    }
    .btn-fixed {
        position: fixed;
        border-radius: 50%;
        text-align: center;
        z-index: 1;
        &.btn-edit {
            bottom: 25vw;
            right: 5vw;
            height: 14vw;
            line-height: 14vw;
            width: 14vw;
            font-size: @fs48;
            background-color: @color-primary;
            color: white;
            box-shadow: 0 0 15px 1px fade(@color-primary, 50%);
        }
        &.btn-go-top {
            font-size: @fs40;
            bottom: 40vw;
            right: 7vw;
            height: 10vw;
            line-height: 10vw;
            width: 10vw;
            background-color: @light-gray;
            color: white;
            box-shadow: 0 0 15px 1px @light-gray;
        }
    }
    .mint-swipe {
        height: 100vh;
        position: fixed;
        z-index: 3;
        width: 100%;
        color: #fff;
        top: 0;
        .img-box {
            height: 100%;
        }
    }
}

.active {
    overflow-y: hidden;
}
</style>
