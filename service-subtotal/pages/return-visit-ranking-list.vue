<template>
    <div class="return-visit-ranking-list" v-title="'客户关怀统计'" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-immediate-check="false" infinite-scroll-distance="10">
        <!-- <m-top-search v-model="keyword" placeholder="搜索员工" @search="search" type="2" @click.native="showSearchBar"></m-top-search> -->
        <!-- <auto-search-bar :searchvisiable="searchVisiable" :search-text="keyword" :employee-list="employeeList"></auto-search-bar> -->
        <div>
            <return-visit-ranking-cell :m-data="item" v-for="(item, index) in dataList" :key="index" :index="index+1" @click.native="editClick(item)"></return-visit-ranking-cell>
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
import returnVisitRankingCell from 'pages/module/return-visit-ranking-cell';

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
                storeIds: this.$route.query.storeIds,
                employeeId: '',
                startDate: this.$route.query.startDate,
                endDate: this.$route.query.endDate,
                page: 1,
                rows: 20
            },
            keyword: '',
            dataList: [],
            loading: false,
            employeeList: [],
            searchVisiable: false,
            scrollDisabled: false
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
        showSearchBar() {
            this.searchVisiable = true;
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
.return-visit-ranking-list {}
</style>
