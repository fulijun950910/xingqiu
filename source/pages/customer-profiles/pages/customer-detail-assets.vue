<template>
    <div class="customer-detail-assets">
        <!--会员卡-->
        <div class="card">
            <p class="title" layout="row" layout-align="space-between center" @click="showMemberCard = !showMemberCard">
                <span><m-icon class="mr8" xlink="#icon-card"/> 会员卡</span>
                <span class="light-gray ft12">
                    有效 <span class="color-primary ft16">7</span> 张
                    <span class="ml8 color-gray"><m-icon :xlink="showMemberCard?'#icon-arrow-up':'#icon-arrow-down'"/></span>
                </span>
            </p>
            <transition name="slide-up" mode="out-in">
                <div v-show="showMemberCard" class="content">
                    <div v-for="(item, index) in 4" :key="index" class="item" layout="row" layout-align="space-between center">
                        <div flex="70">
                            <p class="no-wrap">
                                <span class="badge-card" :class="['back'+index]">{{cardSlot[index]}}</span>
                                <span>2017年紫魅会员卡</span>
                            </p>
                            <p class="ft12 dark-gray">有效期：2016.06.06 ~ 2017.09.30</p>
                        </div>
                        <div flex="30">
                            <p class="ft12 dark-gray text-right">剩余</p>
                            <p v-if="index==0" class="ft16 text-right no-wrap">{{100000 | currency}}</p>
                            <p v-else-if="index==1" class="ft16 text-right no-wrap">{{8}}<span class="ft12 dark-gray">次</span></p>
                            <p v-else-if="index==2" class="ft16 text-right no-wrap">{{7}}<span class="ft12 dark-gray">折</span></p>
                            <p v-else-if="index==3" class="ft16 text-right no-wrap">{{365}}<span class="ft12 dark-gray">天</span></p>
                        </div>
                    </div>
                </div>
            </transition>
        </div>

        <!--赠品/券-->
        <div class="coupon card">
            <p class="title" layout="row" layout-align="space-between center" @click="showMemberCoupon = !showMemberCoupon">
                <span><m-icon class="mr8" xlink="#icon-coupon"/> 赠品/券</span>
                <span class="light-gray ft12">
                    有效 <span class="color-primary ft16">7</span> 张
                    <span class="ml8 color-gray"><m-icon :xlink="showMemberCoupon?'#icon-arrow-up':'#icon-arrow-down'"/></span>
                </span>
            </p>
            <transition name="slide-up" mode="out-in">
                <div v-show="showMemberCoupon" class="content">
                    <div v-for="(item, index) in 4" :key="index" class="item" layout="row" layout-align="space-between center">
                        <div flex="70">
                            <p class="no-wrap color-primary">
                                100元现金券
                            </p>
                            <p class="ft12 dark-gray">有效期：2016.06.06 ~ 2017.09.30</p>
                        </div>
                        <div flex="30">
                            <p class="ft12 dark-gray text-right">剩余</p>
                            <p class="ft16 text-right no-wrap">{{1000000100 | currency}}</p>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    name: 'customer-detail-assets',
    components: {},
    data() {
        return {
            cardSlot: ['储值卡', '疗程卡', '折扣卡', '时段卡'],
            showMemberCard: true,
            showMemberCoupon: true
        };
    },
    methods: {
    }
};
</script>

<style lang="less">
    @import '~styles/_agile.less';
    .customer-detail-assets {
        padding: 12px 0;
        font-size: 14px;
        .badge-card {
            display: inline-block;
            font-size: 12px;
            line-height: 20px;
            padding: 0 6px;
            background-color: #ddd;
            color: white;
            border-radius: 10px;
        }
        .back-blue, .back0 {
            background-color: #3ecdc8;
        }
        .back-pink, .back1 {
            background-color: #fa958b;
        }
        .back-red, .back2 {
            background-color: #de53b7;
        }
        .back-green, .back3 {
            background-color: #3dcd9a;
        }
        .card {
            background-color: white;
            .title {
                padding: 12px;
                border-bottom: 1px solid #eee;
            }
            .content {
                padding-bottom: 12px;
                .item {
                    border: 1px solid #eee;
                    border-radius: 4px;
                    padding: 8px 12px;
                    margin: 12px;
                    line-height: 24px;
                }
            }
        }
        .coupon {
            margin-top: 12px;
            .content {
                .item {
                    border: none;
                    background-color: #f9f9f9;
                    position: relative;
                    padding: 8px 16px;
                    &:before {
                        content: "";
                        display: inline-block;
                        width: 16px;
                        height: 16px;
                        position: absolute;
                        left: -8px;
                        top: 50%;
                        margin-top: -8px;
                        border-radius: 50%;
                        background-color: white;
                    }
                    &:after {
                        content: "";
                        display: inline-block;
                        width: 16px;
                        height: 16px;
                        position: absolute;
                        right: -8px;
                        top: 50%;
                        margin-top: -8px;
                        border-radius: 50%;
                        background-color: white;
                    }
                }
            }
        }
    }
</style>
