<template>
    <div class="product-detail">
        <div class="goos-display">
        <mt-swipe :show-indicators="false" :auto="4000">
            <mt-swipe-item v-for="(item,index) in data.images" :key="index">
                <img class="img-auto" :src="item | nSrc" alt="">
            </mt-swipe-item>
        </mt-swipe>
        </div>
        <div class="product-detail-container">
        <div class="introduction">
            <div layout="row" layout-align="start center">
                <div flex="80">
                    <div class="fwb fs34 color-black">{{data.name}}</div>
                    <div class="fs24 color-gray">{{data.description}}</div>
                    <div class="fs34 color-pink">{{data.price | fen2dou}}美豆豆/{{data.price | fen2yuan}}元</div>
                </div>
                <div flex="20" layout="column" layout-align="space-between center">
                    <m-icon xlink="#icon-huabanfuben29"></m-icon>
                    <span class="fs22 color-gray"></span>
                </div>
            </div>
        </div>
        <div class="goods-detail" v-html="data.detail">            
        </div>
        </div>
        <div class="buy-now fs34 color-white" layout="row" layout-align="center center" @click="buyNow">
             立即购买
        </div>       
        <buy-message type="2" @update="update" :selected-item="chooseServiceItem" :show-buy="showBuy"></buy-message>       
    </div>
</template>
<script>
import api_party from 'services/api.party';
import Vue from 'vue';
import { Swipe, SwipeItem } from 'mint-ui';
import buyMessage from 'components/integral-mall/buy-message';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
export default {
    data() {
        return {
            id: this.$route.params.id,
            data: null,
            showBuy: false,
            chooseServiceItem: null
        };
    },
    methods: {
        load() {
            api_party.productDetail(this.id).then(msg=> {
                this.data = msg.data;
                this.data.images = this.data.images.split(',');
                this.chooseServiceItem = this.data;
            }, msg=>{});
        },
        init() {
            this.load();
        },
        buyNow() {
            this.showBuy = true;
        },
        update(val) {
            this.showBuy = val;
        }
    },
    mounted() {
        this.init();
    },
    components: {
        buyMessage
    }
};
</script>
<style lang="less" scoped>
@import '~styles/_style';
.product-detail{
    .goos-display{
        height: 250px;
        width: 100%;
        .mint-swipe{
            height: 100%;
            width: 100%;
        }
    }
}
.product-detail-container{
    padding: 0 15px;
    padding-bottom: 60px;
    position: relative;
    .introduction{
        padding: 15px 0;
        border-bottom: 1px solid @border-gay;
    }
    .goods-detail{
        padding: 15px 0;
    }
}
        .buy-now{
        height: 60px;
        position: fixed;
        z-index: 1;
        bottom: 0;
        left: 0;
        right: 0;
        background:linear-gradient(180deg,rgba(255,153,216,1),rgba(252,93,192,1),rgba(255,53,104,1));
        text-align: center;
    }
</style>


