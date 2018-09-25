<template>
    <div class="product-detail" v-title="'商品详情'">
        <div class="goos-display">
        <mt-swipe :show-indicators="false" :auto="4000">
            <mt-swipe-item v-for="(item,index) in data.images" :key="index">
                <img class="img-auto" :src="item | nSrc" alt="">
            </mt-swipe-item>
        </mt-swipe>
        </div>
        <div class="product-detail-container">
        <div class="introduction">
            <div layout="row" layout-align="start stretch">
                <div flex>
                    <div class="fwb fs34 color-black">{{data.name}}</div>
                    <div class="fs24 color-gray">{{data.description}}</div>
                    <div layout="row" layout-align="space-between center"  class="price-sale">
                    <!-- <div class="fs34 color-pink">{{data.price | fen2dou}}美豆豆/{{data.price | fen2yuan}}元</div> -->
<div class="fs22 color-gray">销量{{data.salesCount}}</div>
                    </div>
                </div>
                <!-- <div flex="20" layout="column" layout-align="space-between center">
                    <m-icon xlink="#icon-huabanfuben29"></m-icon>
                    <div></div>
                    <span class="fs22 color-gray">已售{{data.seq}}</span>
                </div> -->
            </div>
        </div>
        <div class="goods-detail" v-html="data.detail">
        </div>
        </div>
        <div class="buy-now fs34 color-white" layout="row" layout-align="center center" @click="buyNow">
             立即购买
        </div>
        <!-- <buy-message :type="buyType" :pay-type="$route.params.type" :address-id="$route.params.addressId ? $route.params.addressId : ''" :product-id="id" @update="update" :selected-item="chooseServiceItem" :show-buy="showBuy"></buy-message>        -->
    </div>
</template>
<script>
import api_party from 'services/api.party';
import Vue from 'vue';
import { Swipe, SwipeItem } from 'mint-ui';
import buyMessage from 'components/integral-mall/buy-message';
import apiGetJSSignature from 'services/api.getJSSignature';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
export default {
    data() {
        return {
            id: this.$route.params.id,
            data: {},
            showBuy: false,
            chooseServiceItem: null,
            buyType: '2'
        };
    },
    methods: {
        load() {
            api_party.productDetail(this.id).then(msg => {
                this.data = msg.data;
                this.js_sdk(this.data);
                this.data.images = this.data.images.split(',');
                this.chooseServiceItem = this.data;
                this.buyType = (this.data.type == 2 ? '1' : '2');
            }, msg => {});
        },
        init() {
            this.load();
            if (this.$route.params.type == 'finished') {
                this.buyNow();
            }
        },
        buyNow() {
            // this.load();
            this.$router.push({
                name: 'pay-detail',
                params: {
                    itemId: this.$route.params.id
                }
            });
        },
        update(val) {
            this.showBuy = val;
        },
        async js_sdk(data) {
            let share = {
                title: data.name,
                desc: data.description,
                link: window.location.href,
                imgUrl: window.location.origin + '/service/static/2018060509.jpg',
                type: 'link',
                dataUrl: '',
                success: function() {
                },
                cancel: null
            };
            apiGetJSSignature.shareAppMessage(share);
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
        .price-sale{
            padding: 15px 0 0 0;
        }
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
