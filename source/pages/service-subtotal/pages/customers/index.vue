<template>
    <div class="customers-panel"
         :style="{overflow: bodyOverflow}"
         v-title="'顾客档案'">
        <div layout="row"
             class="cp-head"
             layout-align="start center">
            <div class="cp-head-item"
                 v-show="!selectedRows.length"
                 @click="customerCountVisible = !customerCountVisible;">
                <m-icon class="fs34"
                        :class="customerCountVisible ? 'color-primary' : 'extra-black'"
                        xlink="#icon-shuju1"></m-icon>
                <span class="extra-light-black">
                    查看数据
                </span>
                <m-icon class="extra-black"
                        :class="{'tf-rX180': customerCountVisible}"
                        xlink="#icon-xialacopy"></m-icon>
            </div>
            <div class="cp-head-item"
                 v-show="selectedRows.length">
                <span @click="selecteAll">
                    <m-icon class="fs36"
                            :class="{'color-primary': isChecked}"
                            :xlink="isChecked ? '#icon-xuanzhonggou' : '#icon-quan1'"></m-icon>
                    <span class="extra-black">全选</span>
                </span>
                <span class="fs20 extra-black m-r-2">已选{{selectedTotal}}人</span>
                <span @click="cancelSelect">
                    <m-icon class="fs36 color-66a"
                            xlink="#icon-close"></m-icon>
                </span>
            </div>
            <div flex></div>
            <div class="cp-head-item"
                 @click="popupVisible = true">
                <m-icon class="fs36"
                        xlink="#icon-shaixuan"></m-icon>
            </div>
            <div class="cp-head-item"
                 @click="searchVisible = true">
                <m-icon class="fs36"
                        xlink="#icon-sousuo"></m-icon>
            </div>
        </div>
        <div class="cp-cont"
             v-infinite-scroll="loadMore"
             infinite-scroll-disabled="loading"
             infinite-scroll-distance="50"
             v-show="!searchVisible">
            <div class="cp-cont-item"
                 v-for="(item, index) in rows"
                 :key="index"
                 :class="{'cp-cont-item-s': item.selected}"
                 layout="row">
                <div flex
                     @click="custoemrDetail(item)"
                     layout="row"
                     layout-align="start center">
                    <div class="cp-avatar cp-cont-cell">
                        <img :src="item.avatarId | mSrc2(require('assets/imgs/avatar.png'))" />
                    </div>
                    <div class="cp-cont-cell">
                        <div class="color-black">{{item.name}}</div>
                        <div layout="row"
                             layout-align="start center"
                             flex-wrap="wrap"
                             class="extra-light-black">
                            <m-icon class="m-r-2"
                                    xlink="#icon-biaoqian-"></m-icon>
                            <div v-for="(tag, index) in item.tags"
                                 class="fs24 m-r-2"
                                 :key="index">{{tag.tagName}}</div>
                        </div>
                    </div>
                </div>
                <div class="cp-cont-cell fs32 radio-item"
                     layout="row"
                     layout-align="center center"
                     :class="{'color-primary': item.selected}"
                     @click.stop="selectCusotmer(item)">
                    <m-icon :xlink="item.selected ? '#icon-xuanzhonggou' : '#icon-quan1'"></m-icon>
                </div>
            </div>
            <m-load-more :loading="!scrollDisabled"></m-load-more>
        </div>
        <div class="cp-foot"
             layout="row"
             v-if="selectedRows.length"
             layout-align="start center">
            <div v-for="(item, index) in toolButtons"
                 @click="toolClick(item.value)"
                 :key="index"
                 flex
                 class="text-center">
                <m-icon class="fs36"
                        :xlink="item.icon"></m-icon>
                <div class="fs24">
                    {{item.label}}
                </div>
            </div>
        </div>
        <div class="count-panel"
             v-if="customerCountVisible"
             @click.self="customerCountVisible = false;">
            <div layout="row"
                 layout-align="start center"
                 flex-wrap="wrap">
                <div flex="50"
                     v-for="(item, index) in customerCounts"
                     :key="index"
                     class="count-item">
                    <div layout="row"
                         layout-align="start start">
                        <div flex="30"
                             class="text-center fs36 lc-icon">
                            <m-icon :xlink="item.icon"></m-icon>
                        </div>
                        <div flex="70">
                            <div class="fs48 color-black">{{item.value | bigNumber}}</div>
                            <div class="fs30 color-gray">{{item.label}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="cp-search-panel"
             v-if="searchVisible">
            <div class="cp-search-head"
                 layout="row">
                <div class="input-panel"
                     flex
                     layout="row"
                     layout-align="start center">
                    <m-icon class="fs36"
                            xlink="#icon-sousuo"></m-icon>
                    <input type="text"
                           v-model="searchText"
                           @keydown.enter="searchClick()"
                           placeholder="搜索客户"
                           flex>
                    <div @click.stop="searchText = '';searchClick();"
                         v-if="searchText">
                        <m-icon class="fs28"
                                xlink="#icon-guanbi"></m-icon>
                    </div>
                </div>
                <div @click="searchVisible = false;">取消</div>
            </div>
            <div class="cp-search-cont">
                <div class="cp-search-cell hs-label"
                     layout="row"
                     layout-align="space-between center"
                     v-if="searchHistory.length">
                    <span>历史搜索</span>
                    <span @click="cleanSearchHistory">
                        <m-icon xlink="#icon-lajitong"></m-icon>
                    </span>
                </div>
                <div class="cp-search-cell"
                     v-for="(item, index) in searchHistory"
                     :key="index">
                    <div @click="searchClick(item)">
                        {{item}}
                    </div>
                </div>
            </div>
        </div>
        <popup-right v-model="popupVisible"
                     class="cp-popup-panel">
            <div class="cp-popup-header"
                 layout="row"
                 v-if="popupType === 2">
                <div class="p-2"
                     @click="setPopupType(1)">
                    <m-icon xlink="#icon-left-bold"></m-icon>
                </div>
                <div flex
                     class="p-2">
                    <input type="text"
                           v-model="ticketData.searchText"
                           @keydown.enter="loadTickets(true)"
                           class="text-center"
                           placeholder="查询券名称">
                </div>
                <div class="p-2"
                     @click="loadTickets(true)">搜索</div>
            </div>
            <div class="cp-popup-header"
                 layout="row"
                 v-else-if="popupType === 3">
                <div class="p-2"
                     @click="setPopupType(1)">
                    <m-icon xlink="#icon-left-bold"></m-icon>
                </div>
                <div flex
                     class="p-2">
                    <span class="fwb">客户标签</span>
                </div>
            </div>
            <div class="cp-popup-content"
                 v-if="popupType === 1">
                <div class="cp-popup-section">
                    <div layout="row"
                         layout-align="start center"
                         class="cp-popup-head"
                         @click="groupData.visible = !groupData.visible">
                        <div flex
                             class="color-black fwb">分组筛选</div>
                        <div class="extra-light-black">
                            <span v-show="!groupData.visible">展开</span>
                            <span v-show="groupData.visible">收起</span>
                            <m-icon class="extra-black"
                                    :class="{'tf-rX180': groupData.visible}"
                                    xlink="#icon-xialacopy"></m-icon>
                        </div>
                    </div>
                    <div layout="row"
                         layout-align="start center"
                         flex-wrap="wrap"
                         class="cp-popup-cont"
                         v-show="groupData.visible">
                        <div class="cp-popup-tag"
                             :class="{'cp-popup-tag-s': item.selected}"
                             @click="filterClick(item, 'group')"
                             v-for="(item, index) in groupData.rows"
                             :key="index">{{item.label}}</div>
                    </div>
                </div>
                <div class="cp-popup-section">
                    <div layout="row"
                         layout-align="start center"
                         class="cp-popup-head"
                         @click="timeData.visible = !timeData.visible">
                        <div flex
                             class="color-black fwb">访问时间</div>
                        <div class="extra-light-black">
                            <span v-show="!timeData.visible">展开</span>
                            <span v-show="timeData.visible">收起</span>
                            <m-icon class="extra-black"
                                    :class="{'tf-rX180': timeData.visible}"
                                    xlink="#icon-xialacopy"></m-icon>
                        </div>
                    </div>
                    <div layout="row"
                         layout-align="start center"
                         flex-wrap="wrap"
                         class="cp-popup-cont"
                         v-show="timeData.visible">
                        <div class="cp-popup-tag"
                             :class="{'cp-popup-tag-s': item.selected}"
                             @click="filterClick(item, 'lastVisitTime')"
                             v-for="(item, index) in timeData.rows"
                             :key="index">{{item.label}}</div>
                    </div>
                </div>
                <div class="cp-popup-section">
                    <div layout="row"
                         layout-align="start center"
                         class="cp-popup-head"
                         @click="activityData.visible = !activityData.visible">
                        <div flex
                             class="color-black fwb">参加活动</div>
                        <div class="extra-light-black">
                            <span v-show="!activityData.visible">展开</span>
                            <span v-show="activityData.visible">收起</span>
                            <m-icon class="extra-black"
                                    :class="{'tf-rX180': activityData.visible}"
                                    xlink="#icon-xialacopy"></m-icon>
                        </div>
                    </div>
                    <div layout="row"
                         layout-align="start center"
                         flex-wrap="wrap"
                         class="cp-popup-cont"
                         v-show="activityData.visible">
                        <div class="cp-popup-tag"
                             :class="{'cp-popup-tag-s': item.selected}"
                             @click="filterClick(item, 'activity')"
                             v-for="(item, index) in activityData.rows"
                             :key="index">{{item.label}}</div>
                    </div>
                </div>
                <div class="cp-popup-section">
                    <div layout="row"
                         layout-align="start center"
                         class="cp-popup-head"
                         @click="sourceData.visible = !sourceData.visible">
                        <div flex
                             class="color-black fwb">来源渠道</div>
                        <div class="extra-light-black">
                            <span v-show="!sourceData.visible">展开</span>
                            <span v-show="sourceData.visible">收起</span>
                            <m-icon class="extra-black"
                                    :class="{'tf-rX180': sourceData.visible}"
                                    xlink="#icon-xialacopy"></m-icon>
                        </div>
                    </div>
                    <div layout="row"
                         layout-align="start center"
                         flex-wrap="wrap"
                         class="cp-popup-cont"
                         v-show="sourceData.visible">
                        <div class="cp-popup-tag"
                             :class="{'cp-popup-tag-s': item.selected}"
                             @click="filterClick(item, 'source')"
                             v-for="(item, index) in sourceData.rows"
                             :key="index">{{item.label}}</div>
                    </div>
                </div>
                <div class="cp-popup-section">
                    <div layout="row"
                         layout-align="start center"
                         class="cp-popup-head">
                        <div flex
                             class="color-black fwb">持有券</div>
                    </div>
                    <div class="cp-popup-cell"
                         layout="row"
                         layout-align="start center"
                         @click="setPopupType(2)"
                         style="padding-right:0;">
                        <div flex>
                            <span v-if="params.ticketDefineId">{{params.ticketDefineId.label}}</span>
                            <span v-else>查询客户的券</span>
                        </div>
                        <div class="cp-w50"
                             @click.stop="ticketClear()">
                            <m-icon :xlink="params.ticketDefineId ? '#icon-guanbi' : '#icon-xiangyou'"></m-icon>
                        </div>
                    </div>
                </div>
                <div class="cp-popup-section">
                    <div layout="row"
                         layout-align="start end"
                         class="cp-popup-head"
                         @click="tagData.visible = !tagData.visible">
                        <div class="color-black fwb">
                            客户标签
                        </div>
                        <div flex
                             class="p-l-2 color-primary fs24 no-wrap">
                            {{selectedTagsStr}}
                        </div>
                        <div class="extra-light-black">
                            <span v-show="!tagData.visible">展开</span>
                            <span v-show="tagData.visible">收起</span>
                            <m-icon class="extra-black"
                                    :class="{'tf-rX180': tagData.visible}"
                                    xlink="#icon-xialacopy"></m-icon>
                        </div>
                    </div>
                    <div layout="row"
                         layout-align="start center"
                         flex-wrap="wrap"
                         v-show="tagData.visible"
                         class="cp-popup-cont">
                        <div class="cp-popup-tag"
                             :class="{'cp-popup-tag-s': item.selected}"
                             v-for="(item, index) in recommendTags"
                             @click="tagClick(item)"
                             :key="index">{{item.label}}</div>
                        <div class="cp-popup-tag cp-tag-more"
                             @click="setPopupType(3)">更多标签...</div>
                    </div>
                </div>
            </div>
            <div class="cp-popup-content cp-popup-content-p"
                 v-infinite-scroll="loadMoreTickets"
                 infinite-scroll-disabled="ticketData.loading"
                 infinite-scroll-distance="20"
                 v-else-if="popupType === 2">
                <div v-for="(item, index) in ticketData.rows"
                     :key="index"
                     @click="filterClick(item, 'ticketDefineId');setPopupType(1);"
                     class="p-3 border-b1"
                     layout="row"
                     layout-align="start center">
                    {{item.label}}
                </div>
                <m-load-more :loading="!ticketData.scrollDisabled"></m-load-more>
            </div>
            <div class="cp-popup-content cp-popup-content-p"
                 v-else-if="popupType === 3">
                <div v-for="(item, index) in tagData.rows"
                     :key="index"
                     @click="tagClick(item)"
                     class="p-3 border-b1"
                     :class="{'color-primary': item.selected}"
                     layout="row"
                     layout-align="start center">
                    <div flex>{{item.label}}</div>
                    <m-icon v-if="item.selected"
                            xlink="#icon-gouxuan"></m-icon>
                </div>
            </div>
            <div class="cp-popup-footer"
                 layout="row"
                 layout-align="start center"
                 v-if="popupType === 1">
                <div flex="50"
                     @click="resetFilter">重置</div>
                <div flex="50"
                     @click="saveFilter">确定</div>
            </div>
            <div class="cp-popup-footer"
                 layout="row"
                 layout-align="start center"
                 v-if="popupType === 2 || popupType === 3">
                <div flex="100"
                     @click="setPopupType(1)">确定</div>
            </div>
        </popup-right>
    </div>
</template>
<script>
import Vue from 'vue';
import api_customer from '@/services/api.customer';
import mLoadMore from 'components/m-load-more';
import { InfiniteScroll } from 'mint-ui';
import popupRight from 'components/popup-right';
import moment from 'moment';
import { ACTIVITY_TYPES, SOURCE_TYPES } from 'config/mixins';
Vue.use(InfiniteScroll);

const SEARCH_KEY = 'CUSTOMERS_SEARCH_HISTORY';

export default {
    name: 'customers',
    props: {},
    components: {
        mLoadMore,
        popupRight
    },
    computed: {
        selectedRows() {
            return this.rows.filter(val => val.selected);
        },
        isChecked() {
            return this.selectedRows.length && this.selectedRows.length === this.rows.length;
        },
        selectedTotal() {
            return this.isChecked ? this.total : this.selectedRows.length;
        },
        bodyOverflow() {
            if (this.popupVisible || this.customerCountVisible) {
                return 'hidden';
            }
            return 'initial';
        },
        recommendTags() {
            return this.tagData.rows.slice(0, 11);
        },
        selectedTags() {
            return this.tagData.rows.filter(val => val.selected);
        },
        selectedTagsStr() {
            return this.selectedTags.map(val => val.label).toString();
        }
    },
    data() {
        return {
            rows: [],
            total: 0,
            loading: false,
            scrollDisabled: false,
            searchVisible: false,
            customerCounts: [],
            customerCountVisible: false,
            toolButtons: [],
            searchText: '',
            searchHistory: [],
            popupVisible: false,
            popupType: 1,
            keys: ['group', 'lastVisitTime', 'activity', 'source', 'ticketDefineId'],
            groupData: {
                rows: [],
                visible: true
            },
            timeData: {
                rows: [],
                visible: true
            },
            activityData: {
                rows: [],
                visible: true
            },
            sourceData: {
                rows: [],
                visible: false
            },
            ticketData: {
                page: 0,
                size: 20,
                searchText: '',
                loading: false,
                scrollDisabled: false,
                rows: []
            },
            tagData: {
                rows: [],
                visible: false
            },
            params: {
                page: 0,
                size: 20,
                keyword: ''
            }
        };
    },
    mounted() {
        this.loadToolButtons();
        this.loadCustomerCount();
        this.loadGroups();
        this.loadFilterData();
        this.loadTags();
    },
    methods: {
        // 加载客户
        loadData(reset) {
            if (reset === true) {
                this.resetParams();
            }
            this.loading = true;
            let query = this.queryFormat();
            api_customer.myCustomers(query).then(
                res => {
                    this.rows = [...this.rows, ...res.data.rows];
                    this.total = res.data.total;
                    this.loading = false;
                    if (res.data.rows.length < query.size) {
                        this.scrollDisabled = true;
                    } else {
                        this.scrollDisabled = false;
                    }
                },
                err => {
                    this.loading = false;
                    this.scrollDisabled = false;
                }
            );
        },
        // 查询条件格式化
        queryFormat() {
            let data = {
                page: this.params.page,
                size: this.params.size,
                query: []
            };
            // 关键字
            if (this.params.keyword) {
                data.query.push({
                    field: 'keyword',
                    value: this.params.keyword
                });
            }
            this.keys.forEach(key => {
                if (this.params[key]) {
                    data.query.push({
                        field: key,
                        value: this.params[key].value
                    });
                }
            });
            // 标签
            if (this.selectedTags.length) {
                data.query.push({
                    field: 'tagIds',
                    value: this.selectedTags.map(val => val.value).toString()
                });
            }
            return data;
        },
        // 上拉加载更多
        loadMore() {
            if (this.scrollDisabled) {
                return;
            }
            this.params.page++;
            this.loadData();
        },
        // 客户详情
        custoemrDetail(item) {
            this.$router.push({
                name: 'customers-detail',
                params: {
                    customerId: item.id
                }
            });
        },
        // 选择一条数据
        selectCusotmer(item) {
            if (item) {
                this.$set(item, 'selected', !item.selected);
            }
        },
        selecteAll() {
            let selected = this.isChecked;
            this.rows.forEach(val => {
                this.$set(val, 'selected', !selected);
            });
        },
        // 取消所有选择
        cancelSelect() {
            this.rows.forEach(val => {
                this.$set(val, 'selected', false);
            });
        },
        // 加载统计数据
        loadCustomerCount(params) {
            api_customer.customerCount().then(
                res => {
                    this.customerCounts = [
                        {
                            label: '访问量',
                            value: res.data.visitCount,
                            icon: '#icon-canyuzhe'
                        },
                        {
                            label: '领券',
                            value: res.data.joinCount,
                            icon: '#icon-youhuiquan'
                        },
                        {
                            label: '参与',
                            value: res.data.ticketReceiveCount,
                            icon: '#icon-huodong'
                        },
                        {
                            label: '到店核销',
                            value: res.data.ticketVerifyCount,
                            icon: '#icon-saoma1'
                        }
                    ];
                },
                err => {}
            );
        },
        // 初始化功能按钮
        loadToolButtons() {
            this.toolButtons = [
                {
                    label: '打标签',
                    value: 'customers-manage-tag',
                    icon: '#icon-biaoqian-'
                },
                {
                    label: '移动到',
                    value: 'customers-manage-group',
                    icon: '#icon-bianzu'
                },
                {
                    label: '发短信',
                    value: 'customers-manage-message',
                    icon: '#icon-duanxin1'
                },
                {
                    label: '发券',
                    value: 'customers-manage-ticket',
                    icon: '#icon-youhuiquan'
                }
            ];
        },
        // 搜索事件
        searchClick(query) {
            if (query) {
                this.params.keyword = query;
            } else {
                this.params.keyword = this.searchText;
                // 添加搜索记录
                if (this.params.keyword) {
                    this.searchHistory.splice(0, 0, this.params.keyword);
                    // 保留20条
                    this.searchHistory = this.searchHistory.splice(0, 20);
                    window.localStorage.setItem(SEARCH_KEY, JSON.stringify(this.searchHistory));
                }
            }
            this.searchVisible = false;
            this.customerCountVisible = false;
            this.loadData(true);
        },
        // 重置参数
        resetParams() {
            this.params.page = 1;
            this.rows = [];
        },
        // 本地加载搜索历史
        loadSearchHistory() {
            try {
                this.searchHistory = JSON.parse(window.localStorage.getItem(SEARCH_KEY));
            } catch (error) {
                this.searchHistory = [];
            }
        },
        // 清空搜索历史
        cleanSearchHistory() {
            // 清空搜索记录
            this.$messageBox.confirm('确认清空历史记录?').then(
                action => {
                    this.searchHistory = [];
                    window.localStorage.clear(SEARCH_KEY);
                },
                err => {}
            );
        },
        // 加载分组数据
        loadGroups() {
            api_customer.customerGroups().then(
                res => {
                    this.groupData.rows = res.data.map(val => {
                        return {
                            label: val.name,
                            value: val.id
                        };
                    });
                },
                err => {}
            );
        },
        // 加载静态筛选数据
        loadFilterData() {
            this.timeData.rows = [
                {
                    label: '最近7天',
                    value: moment()
                        .subtract(7, 'd')
                        .format('YYYY-MM-DD')
                },
                {
                    label: '最近一个月',
                    value: moment()
                        .subtract(1, 'M')
                        .format('YYYY-MM-DD')
                },
                {
                    label: '最近两个月',
                    value: moment()
                        .subtract(2, 'M')
                        .format('YYYY-MM-DD')
                },
                {
                    label: '最近1年',
                    value: moment()
                        .subtract(1, 'y')
                        .format('YYYY-MM-DD')
                }
            ];
            this.activityData.rows = ACTIVITY_TYPES.map(val => {
                return {
                    label: val.name,
                    value: val.value
                };
            });
            this.sourceData.rows = SOURCE_TYPES.map(val => {
                return {
                    label: val.name,
                    value: val.value
                };
            });
        },
        // 筛选条件事件
        filterClick(item, key) {
            if (this.keys.indexOf(key) !== -1) {
                if (this.params[key]) {
                    this.params[key].selected = false;
                    // 反选
                    if (item === this.params[key]) {
                        this.params[key] = null;
                        return;
                    }
                }
                this.$set(item, 'selected', true);
                this.$set(this.params, key, item);
            }
        },
        // 重置筛选
        resetFilter() {
            this.keys.forEach(key => {
                if (this.params[key]) {
                    this.params[key].selected = false;
                    this.params[key] = null;
                }
            });
            this.tagData.rows.forEach(val => {
                if (val.selected) {
                    val.selected = false;
                }
            });
            this.saveFilter();
        },
        // 保存筛选条件
        saveFilter() {
            this.loadData(true);
            this.popupVisible = false;
        },
        // 设置侧边栏显示内容
        setPopupType(type) {
            this.popupType = type;
        },
        // 加载券
        loadTickets(reset) {
            if (reset === true) {
                this.ticketData.rows = [];
                this.ticketData.page = 1;
            }
            const data = {
                size: this.ticketData.size,
                page: this.ticketData.page
            };
            if (this.timeData.searchText) {
                data.query = [
                    {
                        field: 'keyword',
                        value: this.timeData.searchText,
                        operation: 'like'
                    }
                ];
            }
            this.ticketData.loading = true;
            api_customer.customerSearchTickets(data).then(
                res => {
                    const rows = res.data.rows.map(val => {
                        return {
                            label: val.name,
                            value: val.id
                        };
                    });
                    this.ticketData.rows = [...this.ticketData.rows, ...rows];
                    this.ticketData.loading = false;
                    if (res.data.rows.length < this.ticketData.size) {
                        this.ticketData.scrollDisabled = true;
                    } else {
                        this.ticketData.scrollDisabled = false;
                    }
                },
                err => {
                    this.ticketData.loading = false;
                }
            );
        },
        // 券上拉加载更多
        loadMoreTickets() {
            if (this.ticketData.scrollDisabled) {
                return;
            }
            this.ticketData.page++;
            this.loadTickets();
        },
        // 删除已选择的券
        ticketClear() {
            if (this.params.ticketDefineId) {
                this.params.ticketDefineId = null;
            } else {
                this.popupType = 2;
            }
        },
        // 加载标签
        loadTags() {
            api_customer.customerTags().then(
                res => {
                    this.tagData.rows = res.data.map(val => {
                        return {
                            value: val.id,
                            label: val.name
                        };
                    });
                },
                err => {}
            );
        },
        // 选择标签
        tagClick(item) {
            this.$set(item, 'selected', !item.selected);
        },
        // 批量操作事件
        toolClick(routeName) {
            var query = {
                customerCount: 0
            };
            if (this.isChecked) {
                // 按条件操作客户
                let search = this.queryFormat();
                delete search.page;
                delete search.size;
                query.body = encodeURIComponent(JSON.stringify(search));
                query.customerCount = this.total;
            } else if (this.selectedRows.length === 1) {
                // 只选一个客户
                query.customerCount = 1;
                query.customerId = this.selectedRows[0].id;
            } else {
                // 选择多个客户
                query.customerCount = this.selectedRows.length;
                query.customers = this.selectedRows.map(val => {
                    // 打标签只需要id
                    if (routeName === 'customers-manage-tag' || routeName === 'customers-manage-group') {
                        return val.id;
                    }
                    return {
                        id: val.id,
                        name: val.name || '',
                        phone: val.phone || ''
                    };
                });
                query.customers = encodeURIComponent(JSON.stringify(query.customers));
            }
            // 路由跳转
            this.$router.push({
                name: routeName,
                query
            });
        }
    }
};
</script>
<style lang="less">
@import '~styles/_agile';
@lheight: 49px;
.customers-panel {
    height: 100%;
    overflow: hidden;
    .border-b1 {
        border-bottom: 1px solid @border-gay; /*no*/
    }
    .color-66a {
        color: #66acff;
    }
    .cp-w50 {
        width: 50px;
        min-width: 50px;
        text-align: right;
        padding-right: 15px;
    }
    .tf-rX180 {
        transform: rotateX(180deg);
    }
    .cp-head {
        .border-b1;
        position: fixed;
        top: 0;
        height: @lheight;
        background-color: @white;
        width: 100%;
        left: 0;
        &-item {
            padding: @l28;
            font-size: @fs28;
        }
    }
    .cp-cont {
        margin-top: @lheight;
        &-item {
            .border-b1;
        }
        &-item-s {
            background-color: @light-gray;
            border-bottom-color: @extra-light-gray;
        }
        &-cell {
            padding: @l16;
        }
        .radio-item {
            width: 60px;
            min-width: 60px;
        }
    }
    .cp-avatar {
        width: 35px;
        height: 35px;
        min-width: 35px;
        overflow: hidden;
        border-radius: 50%;
        box-sizing: content-box;
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
    .cp-foot {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: @lheight;
        background: rgba(0, 0, 0, 0.6);
        color: @white;
    }
    .count-panel {
        position: fixed;
        top: @lheight;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        & > div {
            background-color: @bg-gray;
            padding: @l8;
        }
        .count-item {
            padding: @l8;
            & > div {
                background: @white;
                padding: @l24;
            }
        }
    }
    .cp-search-panel {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: @white;
    }
    .cp-search-head {
        .border-b1;
        height: @lheight;
        .input-panel {
            margin: @l16 0 @l16 @l28;
            padding-left: @l16;
            background-color: @color-bg;
            input {
                height: 100%;
                font-size: @fs28;
            }
        }
        div:last-child {
            line-height: @lheight;
            padding-right: @l28;
            padding-left: @l28;
        }
    }
    .cp-search-cont {
        position: absolute;
        top: @lheight;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: auto;
    }
    .cp-search-cell {
        padding: 0 @l28;
        & > div {
            .border-b1;
            padding: @l24 0;
        }
    }
    .hs-label {
        font-size: @fs28;
        padding-top: @l24;
    }
    .cp-customer {
        max-width: 130px;
        width: 130px;
        & > div {
            word-wrap: normal;
        }
    }
    .lc-icon {
        line-height: @fs48 * 1.6;
        color: @color-primary;
    }
    .cp-popup {
        &-panel {
            width: 80%;
            overflow: hidden;
        }
        &-section {
            padding: 0 15px;
        }
        &-head {
            div {
                padding-top: 15px;
                padding-bottom: 15px;
            }
        }
        &-cell {
            font-size: @fs28;
            margin: 0px -15px;
            line-height: 50px;
            padding: 0px 15px;
            background-color: @bg-gray;
            color: @extra-black;
        }
        &-tag {
            color: @extra-black;
            background-color: @bg-gray;
            border-radius: 15px;
            font-size: @fs28;
            padding: 0 20px;
            line-height: 30px;
            margin-right: 8px;
            margin-bottom: 8px;
            text-align: center;
            border: 1px solid @bg-gray;
            &-s {
                background-color: #fcf8ff;
                border-color: @color-primary;
                color: @color-primary;
            }
        }
        &-header {
            height: @lheight;
            line-height: @lheight - 16px;
            .border-b1;
            input {
                height: 100%;
                width: 100%;
                background-color: @bg-gray;
            }
        }
        &-content {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: @lheight;
            overflow: auto;
            &-p {
                top: @lheight;
            }
        }
        &-footer {
            border-top: 1px solid @border-gay; /*no*/
            line-height: @lheight;
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            background-color: @bg-gray;
            text-align: center;
            color: @color-black;
            div:last-child {
                background-color: @color-primary;
                color: @white;
            }
        }
    }
    .cp-tag-more {
        border: 1px solid @dark-gray; /*no*/
        color: @extra-black;
        background-color: @white;
    }
}
</style>
