<template>
    <div v-title="'未记录服务'" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-immediate-check="false" infinite-scroll-distance="10">
        <m-top-search v-model="query.keyword" placeholder="搜索员工" @search="search"></m-top-search>
        <div>
            <service-record-cell v-for="(item, index) in dataList" :key="index" @click.native="editClick(item)"></service-record-cell>
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
                keyword: ''
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
            // TODO: 加载数据
            this.loading = true;
            setTimeout(() => {
                for (var i = 10; i >= 0; i--) {
                    this.dataList.push({
                        id: i + '2313'
                    });
                }
                this.loading = false;
            }, 1000);
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
