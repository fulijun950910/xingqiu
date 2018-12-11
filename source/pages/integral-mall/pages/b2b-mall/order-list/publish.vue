<template>
    <div class="b2b-mall-order-list-publish">
        <div class='mall-list p-t-3' v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-immediate-check="false" infinite-scroll-distance="10">
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
                    <div class="btn-item">编辑</div>
                    <div class="btn-item">分享</div>
                    <div @click="goOrder(item)" class="btn-item">采购</div>
                </div>
            </div>
            <m-load-more v-if="mallList && mallList.length>0"  :loading="isLoadOver"></m-load-more>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import {
    InfiniteScroll
} from 'mint-ui';

Vue.use(InfiniteScroll);
import api_b2bmall from 'services/api.b2bmall';
import mLoadMore from 'components/m-load-more';

export default {
    name: 'publish',
    data() {
        return {
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
        mLoadMore
    },
    mounted() {
        this.loadData();
    },
    methods: {
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
        }
    }
};
</script>

<style scoped lang='less'>
@import '~styles/_agile';

.b2b-mall-order-list-publish{
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
