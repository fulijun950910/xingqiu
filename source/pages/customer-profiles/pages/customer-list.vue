<template>
    <div class="customer-list">
        <!--筛选栏-->
        <div class="top-filter-box" layout="row" layout-align="space-between center">
            <div flex="33" class="sort bdr-right" @click.stop="showSort = true" layout="row" layout-align="center center">
                <p class="no-wrap">{{sortSlots[currSort].label}}</p><m-icon flex="20" xlink="#icon-triangle-down"/>
            </div>
            <div flex class="filter bdr-right" @click.stop="showFilter = true">筛选 <m-icon xlink="#icon-filter"/></div>
            <div flex class="search" @click.stop="showSearch = true">搜索 <m-icon xlink="#icon-search"/></div>
        </div>

        <!--排序-->
        <mt-popup class="popup-bottom ft-light" v-model="showSort" position="top">
            <p v-for="(item, index) in sortSlots" :key="index" @click.stop="sortClick(item, index)"
                layout="row" layout-align="space-between center" :class="{active: (currSort == index)}">
                <span>{{item.label}}</span> <m-icon v-show="currSort == index" xlink="#icon-check"/>
            </p>
        </mt-popup>

        <!--筛选-->
        <mt-popup class="popup-bottom filter-box" v-model="showFilter" position="top">
            <div class="category">
                <p class="title">顾客分类</p>
                <p class="ft-light">
                    <span v-for="(item, index) in category" :key="index"
                    @click.stop="chooseCustomer(item)" :class="{active: item.active}">
                        {{item.label}}
                    </span>
                </p>
            </div>
            <div class="zombie">
                <p class="title">休眠客户</p>
                <p class="ft-light">
                    <span v-for="(item, index) in customerFilterSlots.zombie.list" :key="index"
                    @click.stop="filterClick(customerFilterSlots.zombie.field, item)" :class="{active: param[customerFilterSlots.zombie.field] == item.value}" >
                        {{item.label}}
                    </span>
                </p>
            </div>
            <div class="more">
                <p class="title">更多筛选</p>
                <p class="ft-light">
                    <span v-for="(item, index) in customerFilterSlots.hasCard.list" :key="index"
                    @click.stop="filterClick(customerFilterSlots.hasCard.field, item)" :class="{active: param[customerFilterSlots.hasCard.field] == item.value}">
                        {{item.label}}
                    </span>
                </p>
                <p class="ft-light">
                    <span v-for="(item, index) in customerFilterSlots.returnVisit.list" :key="index"
                    @click.stop="filterClick(customerFilterSlots.returnVisit.field, item)" :class="{active: param[customerFilterSlots.returnVisit.field] == item.value}">
                        {{item.label}}
                    </span>
                </p>
            </div>
            <div class="operate">
                <button @click="resetFilterParam">重置选项</button>
                <button class="color-primary" @click="filterProfiles">确定</button>
            </div>
        </mt-popup>

        <!--搜索-->
        <mt-popup class="popup-bottom search-box" v-model="showSearch" position="top">
            <div layout="row" layout-align="start stretch" class="search-main">
                <span flex>
                    <svg class="icon color-primary" aria-hidden="true" flex>
                        <use xlink:href="#icon-search"></use>
                    </svg>
                </span>
                <input flex="70" type="text" placeholder="会员号/手机号/姓名" v-model="keyword" @input="keywordChange"/>
                <span flex @click="showSearchReset">
                    <svg class="icon color-black" aria-hidden="true">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </span>
            </div>
            <div class="search-list">
                <div class="loading color-tiffany-blue" v-show="isLoadingSearch">
                    <span style="display: inline-block;"><mt-spinner  color="#00CBC7" type="fading-circle"></mt-spinner></span>
                </div>
                <p class="title" v-for="(item, index) in searchProfilesList" @click.stop="toDetail(item)" :key="index">{{item.name}} - {{item.memberNo}}</p>
                <p v-if="!searchProfilesList.length && !isLoadingSearch">没有查到数据：-（</p>
            </div>
        </mt-popup>

        <!--档案列表-->
        <div class="profiles-box">
            <customer-profiles-cell @click.native="toDetail(item)" v-for="(item, index) in profilesList" :key="index" :value="item" :show.sync="item.show"></customer-profiles-cell>
            <div v-if="idLoading" class="load-more color-tiffany-blue">
                <span style="display: inline-block;"><mt-spinner  color="#00CBC7" type="fading-circle"></mt-spinner></span>
            </div>
            <div v-else-if="profilesList.length < total" class="load-more color-tiffany-blue">
                <span @click="loadMore">加载更多</span>
            </div>
            <div v-else class="load-more color-gray">
                <span>下面没有啦╮(╯▽╰)╭</span>
            </div>
        </div>
    </div>
</template>
<script>
import customerProfilesCell from 'components/customer-profiles-cell';
import autoSearchbar from 'components/auto-search-bar';
import knife from 'vendor/knife';
import api_customerProfiles from 'services/api.customerProfiles';
import { WECHAT_BUSINESS } from 'config/mixins';
export default {
    name: 'customer-list',
    components: {
        customerProfilesCell,
        autoSearchbar
    },
    data() {
        return {
            // 参数
            param: {
                storeIds: null,
                merchantId: this.$store.getters.merchantId,
                employeeId: null,
                permissionStoreAll: this.$store.getters.permissionStoreAll ? 1 : 0,
                hasCard: null,
                leavingDays: null,
                frequency: null,
                serviceEmployeeId: null,
                returnVisitDays: null
            },
            sort: null,
            keyword: '',
            profilesList: [],
            total: 0,
            searchProfilesList: [],
            showSort: false,
            showFilter: false,
            showSearch: false,
            sortSlots: [
                { label: '默认排序' },
                { label: '最后消费时间从远到近', field: 'memberorder.lastConsumeDate', sort: 'asc' },
                { label: '最后消费时间从近到远', field: 'memberorder.lastConsumeDate', sort: 'desc' },
                { label: '未回访时间从远到近', field: 'messageservicecenter.createTime', sort: 'asc' },
                { label: '未回访时间从近到远', field: 'messageservicecenter.createTime', sort: 'desc' }
            ],
            category: [
                {
                    label: '我服务过的',
                    value: 'serviceEmployeeId',
                    active: false
                }, {
                    label: '分配给我的',
                    value: 'employeeId',
                    active: false
                }
            ],
            customerFilterSlots: {
                zombie: {
                    field: 'leavingDays',
                    list: [{
                        label: '15天未到店',
                        value: '15d'
                    }, {
                        label: '一月未到店',
                        value: '1m'
                    }, {
                        label: '三月未到店',
                        value: '3m'
                    }]
                },
                hasCard: {
                    field: 'hasCard',
                    list: [{
                        label: '未办卡客户',
                        value: '1'
                    }, {
                        label: '已办卡客户',
                        value: '2'
                    }]
                },
                returnVisit: {
                    field: 'returnVisitDays',
                    list: [{
                        label: '15天未回访',
                        value: '15d'
                    }, {
                        label: '一个月未回访',
                        value: '1m'
                    }, {
                        label: '两个月未回访',
                        value: '2m'
                    }]
                }
            },
            currSort: 0,
            pageIndex: 1,
            idLoading: false,
            isLoadingSearch: false
        };
    },
    mounted() {
        this.getCustomerList();
    },
    methods: {
        sortClick(item, index) {
            if (index == this.currSort) {
                return;
            } else {
                this.currSort = index;
                if (item && item.field && item.sort) {
                    this.sort = knife.extendCopy(item);
                    delete this.sort.label;
                    delete this.sort.uber;
                } else {
                    this.sort = null;
                }
                this.pageIndex = 1;
                this.profilesList.splice(0);
                this.showSort = false;
                this.getCustomerList();
            }
        },
        toDetail(item) {
            if (item && item.memberId) {
                this.$router.push(`/detail/${item.memberId}/assets`);
            }
        },
        keywordChange: knife.debounce(function(arg) {
            this.getCustomerListSearch();
        }, 300),
        filterClick(field, item) {
            if (this.param[field] == item.value) {
                this.param[field] = null;
            } else {
                this.param[field] = item.value;
            }
        },
        loadMore() {
            this.pageIndex++;
            this.getCustomerList();
        },
        // 模糊查询会员列表
        getCustomerListSearch() {
            var paramData = {
                query: [
                    { field: 'merchantId', value: this.$store.getters.merchantId },
                    { field: 'keyword', value: this.keyword, operation: 'like' }
                ],
                page: 1,
                size: 20
            };
            this.isLoadingSearch = true;
            api_customerProfiles.memberListSearch(paramData).then(res => {
                this.isLoadingSearch = false;
                this.searchProfilesList = res.data.rows;
            }, err => {
                this.isLoadingSearch = false;
                this.searchProfilesList = [];
            });
        },
        // 获取会员列表
        getCustomerList() {
            // 获取门店
            var storeIds = window.localStorage.performanceInfo ? JSON.parse(window.localStorage.performanceInfo) : null;
            if (storeIds && storeIds.performanceStoreIds) {
                this.param.storeIds = storeIds.performanceStoreIds;
            }
            var paramData = {
                query: [],
                sort: [],
                page: this.pageIndex,
                size: 20
            };
            Object.keys(this.param).forEach(key => {
                paramData.query.push({
                    field: key,
                    value: this.param[key]
                });
            });
            // 普通员工只能查看分配给我的会员所以employeeId固定传
            if (this.$store.state.user.role == WECHAT_BUSINESS[2].code) {
                paramData.query.forEach((item) => {
                    if (item.field == 'employeeId') {
                        item.value = this.$store.getters.employeeId;
                    }
                });
            }
            if (this.sort) {
                paramData.sort.push(this.sort);
            };

            this.idLoading = true;
            api_customerProfiles.memberList(paramData).then(res => {
                this.idLoading = false;
                let data = res.data.rows.map(x => {
                    x.show = false;
                    return x;
                });
                this.profilesList = this.profilesList.concat(data);
                this.total = res.data.total;
            }, err => {
                this.idLoading = false;
                this.$toast('查询失败');
            });
        },
        // 选择顾客分类
        chooseCustomer(item) {
            // this.param.serviceEmployeeId = null;
            // this.param.serviceEmployeeId = null;
            item.active = !item.active;
            if (item.active) {
                this.param[item.value] = this.$store.getters.employeeId;
            } else {
                this.param[item.value] = null;
            }
        },
        // 重置选择
        resetFilterParam() {
            // 清除顾客类型选中
            this.category.forEach(x => { x.active = false; });
            Object.assign(this.param, {
                employeeId: null,
                hasCard: null,
                leavingDays: null,
                serviceEmployeeId: null,
                returnVisitDays: null
            });
        },
        // 确认筛选
        filterProfiles() {
            this.pageIndex = 1;
            this.profilesList.splice(0);
            this.showFilter = false;
            this.getCustomerList();
        },
        // 重置搜索项
        showSearchReset() {
            this.showSearch = false;
            this.keyword = '';
            this.searchProfilesList.splice(0);
        }
    }
};
</script>
<style lang="less">
    @import '~styles/_agile.less';

    .customer-list {
        font-size: 14px;
        padding-top: 50px;
        .top-filter-box {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 50px;
            background: #FFFFFF;
            box-shadow: 0 1px 8px 0 rgba(142,142,142,0.50);
            &>div {
                text-align: center;
                line-height: 28px;
            }
            .bdr-right {
                border-right: 1px solid #eee;
            }
            .icon {
                margin-left: 2px;
            }
        }
        .profiles-box {
            .load-more {
                padding: 20px 0;
                text-align: center;
            }
        }
        .popup-bottom {
            p {
                color: #555;
                padding: 0 12px;
                line-height: 45px;
                border-bottom: 1px solid #eee;
                .icon {
                    color: #B44DCE;
                }
            }
            p.active {
                color: #333;
                font-weight: bold;
            }
        }
        .filter-box {
            p {
                line-height: 28px;
                border: none;
                span {
                    display: inline-block;
                    border: 1px solid #eee;
                    border-radius: 2px;
                    padding: 4px 12px;
                    margin: 0 12px 8px 0;
                    &.active {
                        border: 1px solid #B44DCE;
                        color: #B44DCE;
                    }
                }
                &.title {
                    line-height: 24px;
                    margin-bottom: 8px;
                }
            }
            & > div {
                border-bottom: 1px solid #eee;
                padding: 8px 0;
            }
            .operate {
                padding: 12px 0;
                text-align: center;
                button {
                    background-color: white;
                    border: 1px solid #333;
                    border-radius: 2px;
                    padding: 8px 16px;
                    &.color-primary {
                        margin-left: 16px;
                        width: 60%;
                        border: 1px solid @color-primary;
                        background-color: @color-primary;
                        color: white;
                    }
                }
            }
        }
        .search-box {
            .search-main {
                height: 50px;
                border-bottom: 1px solid #eee;
                .icon {
                    font-size: 18px;
                }
                span {
                    text-align: center;
                    line-height: 50px;
                }
                input {
                    padding: 8px 0;
                    border-right: 1px solid #eee;
                }
            }
            .search-list {
                max-height: 50vh;
                overflow-y: auto;
            }
        }

    }

</style>
