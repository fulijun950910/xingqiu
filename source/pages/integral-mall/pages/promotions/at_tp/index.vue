<template>
    <div class="tp-index">
        <div class="swipe-box">
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="item in data.promotionInstance.promotionRuleGroup.titleImages" :key="item">
                    <img :src="item | mSrc2(require('assets/imgs/nullimg.jpg'))" alt="">
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="cell cell-box bg-white">
            <div class="fs32">{{data.promotionInstance.title}}</div>
            <div class="mt5 fs24 color-gray">{{data.promotionInstance.description}}</div>
            <div class="color-gray border-bottom" layout="row" layout-align="space-between center">
                <div>
                    <span class="color-primary fs32">￥{{ data.promotionInstance.originPrice }}</span> 市场价
                </div>
                <div class="cell">{{data.promotionInstance.allBuyCount | buyCount}}+ 人购买</div>
            </div>
            <div class="m-t-4" layout="row" layout-align="space-between center">
                <div v-for="(item,index) in data.promotionInstance.promotionRuleGroup.promotionRuleGroupExts" flex="30" class="buyTypeItem buyTypeItem1">
                    <div class="typeTitle fs24">{{ item.levelName }}</div>
                    <div class="fs32 m-t-1 m-b-1"><span class="fs24">￥</span>{{ item.sellingPrice | fen2yuan }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import apiPromotion from 'services/api.promotion';
    import {Swipe, SwipeItem} from 'mint-ui';
    Vue.component(Swipe.name, Swipe);
    Vue.component(SwipeItem.name, SwipeItem);
    export default {
        name: 'index',
        data() {
            return {
                data: {
                    promotionInstance: {
                        promotionRuleGroup: {}
                    }
                }
            };
        },
        filters: {
            buyCount(val) {
                return Math.floor(val / 10) * 10 + 10;
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                let data = {
                    id: 6608533494806256
                };
                this.$indicator.open();
                apiPromotion.view(data).then(result => {
                    this.$indicator.close();
                    if (result && result.data) {
                        this.data = result.data;
                        // 计算活动原价（活动内容价目之和）
                        this.data.promotionInstance.originPrice = 0;
                        this.data.promotionInstance.promotionRuleGroup.promotionRuleGroupContentExts.forEach(item => {
                            this.data.promotionInstance.originPrice += item.itemPrice;
                        });
                    }
                });
            }
        }
    };
</script>

<style scoped lang='less'>
    @import '~styles/_style';

    .tp-index{
        font-size: 14px;
        min-height:100vh;
        background:@bg-gray;
        .swipe-box {
            padding: 0;
            height: 180px;
            img {
                width: 100%;
                height: 180px;
            }
        }
        .border-bottom{
            border-bottom:1px solid @border-gay;
        }
        .buyTypeItem{
            color:@white;
            text-align:center;
            border-radius: 4px;
            .typeTitle{
                background:rgba(255,255,255,0.1);
                padding:1px 0;
            }
        }
        .buyTypeItem1{
            background:#854399;
        }
    }

</style>
