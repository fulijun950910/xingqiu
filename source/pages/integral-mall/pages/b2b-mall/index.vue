<template>
    <div class='b2b-mall-index'>
        <div class="banner1-box">
            <div class="swipe-box">
                <mt-swipe :auto="4000">
                    <mt-swipe-item v-for="item in indexData.topBanner" :key="item.id">
                        <img :src="item.imageId | mSrc2(require('assets/imgs/nullimg.jpg'))" alt="">
                        <!--<img :src="6609984741633299 | mSrc2(require('assets/imgs/nullimg.jpg'))" alt="">-->
                    </mt-swipe-item>
                </mt-swipe>
            </div>
        </div>
        <div class='cell cell-box bg-white border-bottom' layout='row' layout-align='start center'>
            <div flex class='fs32 fwb'>经营数据</div>
        </div>
        <div class="bg-white p-t-2 p-b-2 text-center" layout="row">
            <div class="p-t-1 p-b-1" flex="33">
                <div class="fwb fs40">{{indexData.yesterdayIncome|fen2yuan}}</div>
                <div class="extra-light-black">昨日收入</div>
            </div>
            <div class="p-t-1 p-b-1 border-left" flex="33">
                <div class="fwb fs40">{{indexData.unVerifyTicketCount}}</div>
                <div class="extra-light-black">待验券</div>
            </div>
            <div class="p-t-1 p-b-1 border-left" flex="33">
                <div class="fwb fs40">{{indexData.waitSuccessGroupCount}}</div>
                <div class="extra-light-black">待成团</div>
            </div>
        </div>
        <!--参与活动-->
        <div class='m-t-3 cell cell-box bg-white border-bottom' layout='row' layout-align='start center'>
            <div flex class='fs32 fwb'>参与活动</div>
        </div>
        <div class="bg-white cell cell-box">
            <div layout="row">
                <div flex>预售商品销售金额</div>
                <div>¥9000.00</div>
            </div>
            <div class="extra-light-black fs24">占位文案占位文案占位文案占位文案</div>
        </div>

        <div @click="goBannerUrl" class="m-t-3 banner2-box">
            <img :src="indexData.midBanner.imageId | mSrc2(require('assets/imgs/nullimg.jpg'))" alt="">
        </div>
        <!--商品管理-->
        <div class='m-t-3 cell cell-box bg-white border-bottom' layout='row' layout-align='start center'>
            <div flex class='fs32 fwb'>商品管理</div>
            <div @click="goCollect" class='color-gray'>发现商品<m-icon xlink='#icon-zuojiantou'></m-icon></div>
        </div>
        <div class='mall-list' v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-immediate-check="false" infinite-scroll-distance="10">
            <div v-for="item in mallList" :key="item.id" class='mall-item bg-white cell-box'>
                <div class='cell' layout='row'>
                    <!--<div class="mall-tag">2000人正在卖</div>-->
                </div>
                <div class="bg-default cell p-l-1 p-r-1" layout="row">
                    <img class="title-img m-r-2" :src="item.image | mSrc2(require('assets/imgs/nullimg.jpg'))" alt="">
                    <div class="mall-content" flex layout="column">
                        <div flex>
                            <div class="no-wrap">{{item.name}}</div>
                            <!--<div class="color-gray fs12">规格 大型60cm *1</div>-->
                        </div>
                        <div layout="row">
                            <!--<div flex>团购价: ¥20.00 - ¥120.00</div>-->
                            <div flex></div>
                            <div>销量 {{item.salesCount}}</div>
                        </div>
                    </div>
                </div>
                <div class="btn-box" layout='row' layout-align='space-between center'>
                    <div class="btn-item">预览</div>
                    <div @click="goCollectDetail(item)" class="btn-item">编辑</div>
                    <div class="btn-item">分享</div>
                    <div @click="goOrder(item)" class="btn-item">采购</div>
                </div>
            </div>
            <m-load-more v-if="mallList && mallList.length>0"  :loading="isLoadOver"></m-load-more>
        </div>

        <navBar></navBar>
    </div>
</template>

<script>
import Vue from 'vue';
import {
    Swipe,
    SwipeItem,
    InfiniteScroll
} from 'mint-ui';

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.use(InfiniteScroll);
import api_b2bmall from 'services/api.b2bmall';
import navBar from './modules/nav-bar';
import mLoadMore from 'components/m-load-more';

export default {
    name: 'index',
    data() {
        return {
            indexData: {
                midBanner: {}
            },
            mallList: [],
            loading: false,
            isLoadOver: false, // false已加载完所有数据
            query: {
                page: 1,
                size: 10
            }
        };
    },
    components: {
        navBar,
        mLoadMore
    },
    mounted() {
        this.loadData();
        this.init();
    },
    methods: {
        async init() {
            let data = {
                merchantId: this.$store.state.party.merchantId
            };
            this.$indicator.open();
            let res = await api_b2bmall.getPurchaseMerchantIndexInfo(data);
            this.$indicator.close();
            this.indexData = res.data;
        },
        loadMore() {
            if (this.isLoadOver) {
                this.loadData();
            }
        },
        async loadData() {
            let data = {
                query: [
                    {
                        field: 'merchantId',
                        value: this.$store.state.party.merchantId
                    }
                ],
                page: this.query.page,
                size: this.query.size
            };
            this.loading = true;
            this.$indicator.open();
            let res = await api_b2bmall.searchForWx(data);
            this.$indicator.close();
            if (res.data.rows.length < this.query.size) {
                this.isLoadOver = false;
            } else {
                this.isLoadOver = true;
            }
            this.mallList = this.mallList.concat(res.data.rows);
            this.loading = false;
            this.query.page++;
        },
        goOrder(item) {
            this.$router.push({
                name: 'b2b-mall-order',
                params: {
                    id: item.id
                }
            });
        },
        goCollect() {
            window.location.href = '/lite/index.html#/b2b';
        },
        goCollectDetail(item) {
            window.location.href = `/lite/index.html#/collect-goods/${item.id}`;
        },
        goBannerUrl() {
            window.location.href = this.indexData.midBanner.url;
        }
    }
};
</script>

<style scoped lang='less'>
@import '~styles/_agile';

.b2b-mall-index{
    font-size: 13px;
    min-height: 100vh;
    background: @bg-gray;
    .banner1-box{
        padding: 10px;
        .swipe-box{
            height: 90px;
            width: 355px;
            padding: 0;
            position:relative;
            border-radius: 4px;
            overflow: hidden;
            img {
                width: 100%;
                height: 100%;
            }
        }

    }
    .banner2-box{
        height: 64px;
        img{
            width:100%;
            height:100%;
        }
    }
    .mall-item{
        margin-bottom: 10px;
        .title-img{
            width:75px;
            height:75px;
            border-radius: 4px;
        }
        .mall-tag{
            background:#F6F1F7;
            padding: 4px 12px;
            border-radius: 2px;
            color: @color-primary;
            font-size: 12px;
        }
        .mall-content{
            width: 260px;
        }
        .btn-box{
            padding: 16px 12px;
            .btn-item{
                width:75px;
                padding: 2px 0;
                background: @white;
                border-radius:2px;
                border:1px solid rgba(102,102,102,1);
                text-align:center;
            }
        }
    }
}
</style>
