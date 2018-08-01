<template>
    <div class="customers-panel"
         v-title="'顾客档案'">
        <div layout="row"
             class="cp-head"
             layout-align="start center">
            <div class="cp-head-item"
                 v-show="!selectedRows.length"
                 @click="customerCountVisible = !customerCountVisible;">
                <m-icon :class="customerCountVisible ? 'color-primary' : 'extra-black'"
                        xlink="#icon-yipingjia"></m-icon>
                <span class="extra-light-black">
                    查看数据
                </span>
                <m-icon class="extra-black"
                        :xlink="customerCountVisible ? '#icon-arrow-up' : '#icon-arrow-down'"></m-icon>
            </div>
            <div class="cp-head-item"
                 v-show="selectedRows.length">
                <span @click="selecteAll">
                    <m-icon class="fs36"
                            :class="{'color-primary': isChecked}"
                            :xlink="isChecked ? '#icon-wsmp-complete' : '#icon-quan1'"></m-icon>
                    <span class="extra-black">全选</span>
                </span>
                <span class="fs20 extra-black m-r-2">已选{{selectedTotal}}人</span>
                <span @click="cancelSelect">
                    <m-icon class="fs36 color-66a"
                            xlink="#icon-close"></m-icon>
                </span>
            </div>
            <div flex></div>
            <div class="cp-head-item">
                <m-icon class="fs36"
                        xlink="#icon-yipingjia"></m-icon>
            </div>
            <div class="cp-head-item"
                 @click="searchVisible = true">
                <m-icon class="fs36"
                        xlink="#icon-search2"></m-icon>
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
                        <img :src="item.avatarId | nSrc(require('assets/imgs/avatar.png'))" />
                    </div>
                    <div class="cp-cont-cell">
                        <div class="color-black">{{item.name}}</div>
                        <div layout="row"
                             layout-align="start center"
                             flex-wrap="wrap"
                             class="extra-light-black">
                            <m-icon class="m-r-2"
                                    xlink="#icon-tag-alt"></m-icon>
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
                    <m-icon :xlink="item.selected ? '#icon-wsmp-complete' : '#icon-quan1'"></m-icon>
                </div>
            </div>
            <m-load-more :loading="!scrollDisabled"></m-load-more>
        </div>
        <div class="cp-foot"
             layout="row"
             v-if="selectedRows.length"
             layout-align="start center">
            <div v-for="(item, index) in toolButtons"
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
                            xlink="#icon-search2"></m-icon>
                    <input type="text"
                           v-model="searchText"
                           @keydown.enter="searchClick()"
                           placeholder="搜索客户"
                           flex>
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
                        <m-icon xlink="#icon-yichu"></m-icon>
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
    </div>
</template>
<script>
import Vue from 'vue';
import api_customer from '@/services/api.customer';
import mLoadMore from 'components/m-load-more';
import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);

const SEARCH_KEY = 'CUSTOMERS_SEARCH_HISTORY';

export default {
    name: 'customers',
    props: {},
    components: {
        mLoadMore
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
    },
    methods: {
        loadData(reset) {
            if (reset) {
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
                err => {}
            );
        },
        queryFormat() {
            let data = {
                page: this.params.page,
                size: this.params.size,
                query: []
            };
            if (this.params.keyword) {
                data.query.push({
                    field: 'keyword',
                    value: this.params.keyword
                });
            }
            return data;
        },
        loadMore() {
            if (this.scrollDisabled) {
                return;
            }
            this.params.page++;
            this.loadData();
        },
        custoemrDetail(item) {
            this.$router.push({
                name: 'customers-detail',
                params: {
                    customerId: item.id
                }
            });
        },
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
        cancelSelect() {
            this.rows.forEach(val => {
                this.$set(val, 'selected', false);
            });
        },
        loadCustomerCount(params) {
            api_customer.customerCount().then(
                res => {
                    this.customerCounts = [
                        {
                            label: '访问量',
                            value: res.data.visitCount,
                            icon: '#icon-yipingjia'
                        },
                        {
                            label: '领券',
                            value: res.data.joinCount,
                            icon: '#icon-yipingjia'
                        },
                        {
                            label: '参与',
                            value: res.data.ticketReceiveCount,
                            icon: '#icon-yipingjia'
                        },
                        {
                            label: '到店核销',
                            value: res.data.ticketVerifyCount,
                            icon: '#icon-yipingjia'
                        }
                    ];
                },
                err => {}
            );
        },
        loadToolButtons() {
            this.toolButtons = [
                {
                    label: '打标签',
                    value: 1,
                    icon: '#icon-tag-alt'
                },
                {
                    label: '移动到',
                    value: 2,
                    icon: '#icon-tuichu'
                },
                {
                    label: '发短信',
                    value: 3,
                    icon: '#icon-duanxin'
                },
                {
                    label: '发券',
                    value: 4,
                    icon: '#icon-weibiaoti2fuzhi02'
                }
            ];
        },
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
        resetParams() {
            this.params.page = 1;
            this.rows = [];
        },
        loadSearchHistory() {
            try {
                this.searchHistory = JSON.parse(window.localStorage.getItem(SEARCH_KEY));
            } catch (error) {
                this.searchHistory = [];
            }
        },
        cleanSearchHistory() {
            // 清空搜索记录
            this.$messageBox.confirm('确认清空历史记录?').then(
                action => {
                    this.searchHistory = [];
                    window.localStorage.clear(SEARCH_KEY);
                },
                err => {}
            );
        }
    }
};
</script>
<style lang="less">
@import '~styles/_agile';
@lheight: 49px;
.customers-panel {
    height: 100%;
    .color-66a {
        color: #66acff;
    }
    .cp-head {
        position: fixed;
        top: 0;
        height: @lheight;
        background-color: @white;
        border-bottom: 1px solid @border-gay; /*no*/
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
            border-bottom: 1px solid @border-gay; /*no*/
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
        height: @lheight;
        border-bottom: 1px solid @border-gay; /*no*/
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
            padding: @l24 0;
            border-bottom: 1px solid @border-gay; /*no*/
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
}
</style>
