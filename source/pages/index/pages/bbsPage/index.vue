<template>
    <div v-title="'美问美答'" class="bbsPage">
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-immediate-check="false" infinite-scroll-distance="10" >
            <div @click="goBbs(item.url)" class="list-item cell cell-box bg-white" v-for="item in dataList">
                <div layout="row" layout-align="space-between center">
                    <div layout="row" layout-align="start center">
                        <div><img  class="avatar" :src="item.authorImage" alt=""></div>
                        <div class="fs24 color-gray">{{item.author || '匿名'}}</div>
                    </div>
                    <div class="light-gray fs24">{{item.forum}}</div>
                </div>
                <div class="mt16" layout="row" layout-align="start stretch">
                    <div flex layout="column" layout-align="space-between start">
                        <div>{{item.subject}}</div>
                        <div>
                            <m-icon class="fs32 color-gray" xlink="#icon-dianzan"></m-icon>
                            <span class="color-gray">{{item.recommendAdd}}</span>
                            &nbsp;&nbsp;
                            <m-icon class="fs32 color-gray" xlink="#icon-huifu"></m-icon>
                            <span class="color-gray">{{item.replies}}</span>
                            &nbsp;&nbsp;
                            <m-icon class="fs32 color-gray" xlink="#icon-yanjing"></m-icon>
                            <span class="color-gray">{{item.views}}</span>
                        </div>
                    </div>
                    <div class="imgBox" layout="row" layout-align="center center">
                        <img  :src="item.attachment || require('assets/imgs/index/501657390978523645.jpg')" alt="">
                    </div>
                </div>
            </div>
            <m-load-more :loading="loadOver"></m-load-more>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import mLoadMore from 'components/m-load-more';
    import { InfiniteScroll } from 'mint-ui';
    import api_party from 'services/api.party';
    Vue.use(InfiniteScroll);

    export default {
        name: 'bbsPage',
        components: {
            'm-load-more': mLoadMore
        },
        data() {
            return {
                dataList: [],
                loading: false,
                query: {
                    page: 1,
                    size: 15,
                    partyId: 0
                },
                loadOver: true
            };
        },
        mounted() {
            this.load();
        },
        methods: {
            loadMore() {
                if (this.loadOver) {
                    this.load();
                }
            },
            load(reset) {
                if (reset) {
                    this.query.page = 1;
                    this.dataList = [];
                }
                this.loading = true;
                let query = JSON.parse(JSON.stringify(this.query));
                if (this.$store.state.party) {
                    query.partyId = this.$store.state.party.partyId;
                }
                api_party.getBbsList(query).then(res => {
                    if (res.data) {
                        this.dataList = this.dataList.concat(res.data);
                        this.loading = false;
                        this.query.page++;
                        if (res.data.length < this.query.size) {
                            this.loadOver = false;
                        } else {
                            this.loadOver = true;
                        }
                    }
                });
            },
            goBbs(url) {
                window.location.href = url;
            }
        }
    };
</script>

<style scoped lang='less'>
    @import '~styles/_style';
    @color-red-lighten: #EC3F6D;
    @color-success:#EE5253;
    @color-error:#14CC8A;
    .bbsPage{
        min-height:100%;
        background:@bg-gray;
    }
    .bg-white{
        background:@white;
    }
    .list-item{
        border-bottom:1px solid @border-gay;
        .mt16{
            margin-top: @l16;
        }
        .avatar{
            width:28px;
            height:28px;
            display:block;
            border-radius: 50%;
            margin-right:@l8;
        }
        .imgBox{
            width:78px;
            height:78px;
            border-radius: 4px;
            overflow: hidden;
            margin-left: @l16;
            img{
                height:100%;
                width:auto;
            }
        }
    }

</style>
