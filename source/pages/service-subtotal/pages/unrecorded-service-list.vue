<template>
    <div class="unrecorded-service-list" v-title="'未记录服务'" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-immediate-check="false" infinite-scroll-distance="10">
        <div v-if="admin">
            <m-top-search v-show="!searchVisiable" :icon="employee.name ? '#icon-close' : '#icon-search2'" v-model="employee.name" placeholder="搜索员工" @iconClick="clearSearch" type="2" @searchClick="showSearchBar"></m-top-search>
            <auto-search-bar :visiable.sync="searchVisiable" :search-text="employeeQuery.employeeName" :employee-list="employeeList" @itemClick="selectedEmployee" @change="searchEmployees"></auto-search-bar>
        </div>
        <div>
            <service-record-cell :m-data="item" v-for="(item, index) in dataList" :key="index" @click.native="editClick(item)"></service-record-cell>
            <m-load-more :loading="!scrollDisabled" v-show="dataList.length != 0 || loading"></m-load-more>
        </div>
        <no-data :visible="dataList.length == 0 && !loading" :showButton="false"></no-data>
    </div>
</template>
<script>
import Vue from 'vue';
import {
    InfiniteScroll
} from 'mint-ui';
Vue.use(InfiniteScroll);
import noData from 'components/no-data';
import mLoadMore from 'components/m-load-more';
import mTopSearch from 'components/m-top-search';
import autoSearchBar from 'components/auto-search-bar';
import api_service_note from 'services/api.serviceNote';
import serviceRecordCell from './module/service-record-cell';

export default {
    name: 'unrecorded-service-list',
    components: {
        noData,
        mLoadMore,
        mTopSearch,
        autoSearchBar,
        serviceRecordCell
    },
    data() {
        return {
            query: {
                merchantId: this.$store.getters.merchantId,
                storeIds: this.$route.query.storeIds,
                employeeId: '',
                startDate: this.$route.query.startDate,
                endDate: this.$route.query.endDate,
                status: 0,
                type: 1,
                page: 1,
                rows: 20
            },
            employeeQuery: {
                merchantId: this.$store.getters.merchantId,
                storeIds: this.$store.getters.storeIds,
                employeeId: this.$store.state.user.id,
                employeeName: ''
            },
            employee: {},
            dataList: [],
            loading: false,
            employeeList: [],
            admin: true,
            searchVisiable: !true,
            scrollDisabled: false
        };
    },
    mounted() {
        if (!this.admin) {
            this.query.employeeId = this.$store.state.user.id;
        }
        this.loadData();
    },
    methods: {
        loadData() {
            if (this.scrollDisabled) {
                return;
            }
            this.loading = true;
            api_service_note.queryServiceRecord(this.getQuery()).then(res => {
                if (res.data.rows.length < this.query.rows) {
                    this.scrollDisabled = true;
                } else {
                    this.scrollDisabled = false;
                }
                this.dataList = this.dataList.concat(res.data.rows);
                this.loading = false;
                this.query.page++;
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
        search() {
            this.loadData();
        },
        searchEmployees(keyword) {
            this.employeeQuery.employeeName = keyword;
            api_service_note.employeeList(this.employeeQuery).then(res => {
                this.employeeList = res.data;
            }, err => {

            });
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
            if (this.query.employeeId) {
                this.query.employeeId = '';
                this.employee = {};
                this.resetQuery();
            }
            this.loadData();
        },
        editClick(item) {
            if (item.employeeId != this.$store.state.user.id) {
                return;
            }
            this.$router.push({
                name: 'service-record-create',
                params: {
                    serviceId: item.id
                },
                query: {
                    memberId: item.memberId
                }
            });
        }
    }
};
</script>
<style lang="less">
@import '~styles/_agile';
.unrecorded-service-list {
    .searchBar-main {}
}
</style>
