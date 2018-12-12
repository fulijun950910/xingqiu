<template>
    <div class="b2b-mall-order-list-sell">
        <div v-for="item in orderList" :key="item.id" class="list-item cell cell-box">
            <div class="item-card">
                <div class="p-t-2 p-b-2" layout="row" layout-align="space-around center">
                    <div>
                        <span>购买人数</span>
                        <span>&nbsp;</span>
                        <span class="fs48">{{item.sellCount}}</span>
                    </div>
                    <div>
                        <span>购买人数</span>
                        <span>&nbsp;</span>
                        <span>￥</span>
                        <span class="fs48">{{item.sellMoney | bigNumber}}元</span>
                    </div>
                </div>
                <div class="bg-default br1 p-l-2 p-r-2 p-t-4 p-b-4" layout="row" layout-align="start center">
                    <img class="title-img m-r-2" :src="item.imageId | mSrc2(require('assets/imgs/nullimg.jpg'))" alt="">
                    <div class="mall-content" flex layout="column">
                        <div flex>
                            <div class="no-wrap title-width">{{item.title}}</div>
                        </div>
                        <!--<div class="color-gray fs12">规格 大型60cm *1</div>-->
                    </div>
                    <m-icon xlink='#icon-zuojiantou'></m-icon>
                </div>
            </div>
            <div @click="goDetail(item)" class="color-primary p-t-5 p-b-2 text-center">查看详情</div>
        </div>

    </div>
</template>

<script>
import api_b2bmall from 'services/api.b2bmall';
export default {
    name: 'sell',
    data() {
        return {
            orderList: []
        };
    },
    mounted() {
        this.queryData();
    },
    methods: {
        async queryData() {
            let data = {
                merchantId: this.$store.state.party.merchantId
            };
            this.$indicator.open();
            let res = await api_b2bmall.getPurchaseMallSell(data);
            this.$indicator.close();
            this.orderList = res.data;
        },
        goDetail(item) {
            this.$store.state.b2bMallData.selectSellOrder = item;
            this.$router.push({
                name: 'b2b-mall-order-list/sell-detail',
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
.b2b-mall-order-list-sell{
    .list-item{

    }
    .item-card {
        box-shadow:0px 4px 17px 0px rgba(75,110,150,0.11);
        border-radius:2px;
        background:@white;
        padding: 4px;
        .title-img{
            width: 44px;
            height:44px;
            border-radius: 2px;
        }
        .title-width{
            width: 240px;
        }
    }
}
</style>
