<template>
    <div v-title="'未记录服务'" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-immediate-check="false" infinite-scroll-distance="10">
        <!-- <m-top-search v-model="query.keyword" placeholder="搜索员工" @search="search"></m-top-search> -->
        <div>
            <service-record-cell :m-data="item" v-for="(item, index) in dataList" :key="index" @click.native="editClick(item)"></service-record-cell>
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
import api_service_note from 'services/api.serviceNote';
import serviceRecordCell from 'pages/module/service-record-cell';

export default {
    name: 'unrecorded-service-list',
    components: {
        mLoadMore,
        mTopSearch,
        serviceRecordCell
    },
    data() {
        return {
            query: {
                merchantId: this.$store.getters.merchantId,
                storeIds: this.$store.getters.storeIds,
                employeeId: '',
                startDate: '',
                endDate: '',
                status: 2,
                type: 1,
                page: 1,
                rows: 20
            },
            dataList: [],
            loading: false,
            scrollDisabled: false
        };
    },
    mounted() {
        this.loadData();
    },
    methods: {
        loadData() {
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
        loadMore() {
            this.loadData();
        },
        search(keyword) {
            this.loadData();
        },
        editClick(item) {
            this.$router.push({
                name: 'service-record-edit',
                params: {
                    recordId: item.id
                }
            });
        }
    }
};
</script>
<style lang="less">
@import '~styles/_agile';
</style>
