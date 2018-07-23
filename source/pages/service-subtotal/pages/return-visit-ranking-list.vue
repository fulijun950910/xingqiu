<template>
    <div class="return-visit-ranking-list" v-title="'客户关怀统计'" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-immediate-check="false" infinite-scroll-distance="10">
        <div v-if="admin">
            <m-top-search v-show="!searchVisiable" :icon="employee.name ? '#icon-close' : '#icon-search2'" v-model="employee.name" placeholder="搜索员工" @iconClick="clearSearch" type="2" @searchClick="showSearchBar"></m-top-search>
            <auto-search-bar :visiable.sync="searchVisiable" :search-text="employeeQuery.employeeName" :employee-list="employeeList" @itemClick="selectedEmployee" @change="searchEmployees"></auto-search-bar>
        </div>
        <div v-else>
            <return-visit-ranking-cell class="employee-info" :m-data="employeeInfo.info" :index="employeeInfo.index" @cellClick="editClick"></return-visit-ranking-cell>
            <div></div>
        </div>
        <div>
            <return-visit-ranking-cell :m-data="item" v-for="(item, index) in dataList" :key="index" :index="index+1" :mode="cellMode" @cellClick="editClick"></return-visit-ranking-cell>
            <m-load-more :loading="!scrollDisabled"></m-load-more>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import {
    InfiniteScroll
} from 'mint-ui';
Vue.use(InfiniteScroll);
import mLoadMore from 'components/m-load-more';
import mTopSearch from 'components/m-top-search';
import autoSearchBar from 'components/auto-search-bar';
import api_service_note from 'services/api.serviceNote';
import returnVisitRankingCell from './module/return-visit-ranking-cell';

export default {
    name: 'return-visit-ranking-list',
    components: {
        mLoadMore,
        mTopSearch,
        autoSearchBar,
        returnVisitRankingCell
    },
    data() {
        return {
            query: {
                merchantId: this.$store.getters.merchantId,
                storeIds: this.$route.params.storeIds,
                startDate: this.$route.params.startDate,
                endDate: this.$route.params.endDate,
                status: 1,
                type: 2,
                page: 1,
                rows: 20
            },
            employeeQuery: {
                employeeName: '',
                employeeId: this.$store.state.user.id,
                storeIds: this.$store.getters.storeIds,
                merchantId: this.$store.getters.merchantId
            },
            employee: {},
            dataList: [],
            loading: false,
            employeeList: [],
            employeeInfo: {
                info: {
                    code: this.$store.state.user.code,
                    employeeId: this.$store.state.user.id,
                    employeeName: this.$store.state.user.name,
                    employeeAvatarId: this.$store.state.user.avatarFileId
                }
            },
            searchVisiable: false,
            scrollDisabled: false,
            admin: this.$store.getters.admin,
            cellMode: this.$store.getters.admin ? '' : 'none'
        };
    },
    mounted() {
        this.loadData();
    },
    methods: {
        loadData() {
            this.loading = true;
            api_service_note.returnVisitRankingList(this.getQuery()).then(res => {
                if (res.data.rows.length < this.query.rows) {
                    this.scrollDisabled = true;
                } else {
                    this.scrollDisabled = false;
                }
                this.dataList = this.dataList.concat(res.data.rows);
                this.loading = false;
                this.query.page++;
                this.loadSelfInfo();
            }, err => {
                this.loading = false;
            });
        },
        getQuery() {
            return this.query;
        },
        resetQuery() {
            this.query.page = 1;
            this.scrollDisabled = false;
            this.dataList = [];
        },
        loadMore() {
            this.loadData();
        },
        search(keyword) {
            this.loadData();
        },
        searchEmployees(keyword) {
            this.employeeQuery.employeeName = keyword;
            api_service_note.employeeList(this.employeeQuery).then(res => {
                this.employeeList = res.data;
            }, err => {});
        },
        selectedEmployee(item) {
            this.resetQuery();
            this.employee = item;
            this.query.employeeId = item.id;
            this.loadData();
        },
        showSearchBar() {
            this.searchVisiable = true;
            if (!this.employeeList.length) {
                this.searchEmployees();
            }
        },
        clearSearch() {
            if (!this.admin) {
                return;
            }
            if (this.query.employeeId) {
                this.query.employeeId = '';
                this.employee = {};
                this.resetQuery();
            }
            this.loadData();
        },
        loadSelfInfo() {
            if (!this.admin) {
                for (var i = 0, len = this.dataList.length; i < len; i++) {
                    if (this.dataList[i].employeeId == this.employeeInfo.info.employeeId) {
                        this.employeeInfo.info = this.dataList[i];
                        this.employeeInfo.index = i + 1;
                        break;
                    }
                }
            }
        },
        editClick(item) {
            this.$router.push({
                name: 'service-dynamics',
                params: {
                    employeeId: item.employeeId,
                    endDate: this.query.endDate,
                    startDate: this.query.startDate,
                    employeeName: item.employeeName,
                    type: 2
                }
            });
        }
    }
};
</script>
<style lang="less">
@import '~styles/_agile';
.return-visit-ranking-list {
    .employee-info+div {
        width: 100%;
        height: @l16;
        background-color: @color-bg;
    }
    .employee-info {
        .h-line {
            display: none;
        }
    }
}
</style>
