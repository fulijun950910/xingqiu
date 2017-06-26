<template>
    <div class="member-list" v-title="'我的客户'" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-immediate-check="false" infinite-scroll-distance="10">
        <m-top-search v-model="query.memberName" placeholder="搜索我要回访/维护的客户" @search="search"></m-top-search>
        <div>
            <div layout="row" layout-align="center center" v-for="(item, index) in dataList" :key="index" @click="editClick(item)" class="member-cell">
                <img :src="item.avatarId | mSrc(require('assets/imgs/avatar.png'))" class="avatar">
                <div class="content" flex>
                    <p class="fs24 dark-gray">{{item.memberNo}}</p>
                    <p class="fs28 extra-light-black">{{item.name}}</p>
                </div>
                <m-icon xlink="#icon-right-bold" class="dark-gray"></m-icon>
                <span class="h-line"></span>
            </div>
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

export default {
    name: 'member-list',
    components: {
        mLoadMore,
        mTopSearch
    },
    data() {
        return {
            query: {
                page: 1,
                rows: 20,
                storeIds: this.$store.getters.storeIds,
                merchantId: this.$store.getters.merchantId,
                memberName: ''
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
            api_service_note.queryMembers(this.getQuery()).then(res => {
                if (res.data.rows.length < this.query.rows) {
                    this.scrollDisabled = true;
                } else {
                    this.scrollDisabled = false;
                }
                this.dataList = this.dataList.concat(res.data.rows);
                this.loading = false;
                this.query.page++;
            }, err => {
                this.loading = true;
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
        search(memberName) {
            this.resetQuery();
            this.loadData();
        },
        editClick(item) {
            this.$router.push({
                name: 'return-visit-edit',
                params: {
                    memberId: item.id
                }
            });
        }
    }
};
</script>
<style lang="less">
@import '~styles/_agile';
.member-list {
    .member-cell {
        @avatar_w_h: 40px;
        padding: @l24;
        position: relative;
        .avatar {
            width: @avatar_w_h;
            height: @avatar_w_h;
            border-radius: @avatar_w_h;
        }
        .content {
            padding-left: @l24;
            padding-right: @l16;
        }
        .h-line {
            right: 0;
            bottom: 0;
            left: @avatar_w_h + @l24*2;
            position: absolute;
        }
    }
}
</style>
