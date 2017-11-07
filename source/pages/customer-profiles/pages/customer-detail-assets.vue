<template>
    <div class="customer-detail-assets">
        <div class="loading color-tiffany-blue" v-show="isLoading">
            <span style="display: inline-block;"><mt-spinner  color="#00CBC7" type="fading-circle"></mt-spinner></span>
        </div>
        <!--会员卡-->
        <div v-if="cards" class="card">
            <p class="title" layout="row" layout-align="space-between center" @click="showMemberCard = !showMemberCard">
                <span><m-icon class="mr8" xlink="#icon-card"/> 会员卡</span>
                <span class="light-gray ft12">
                    有效 <span class="color-primary ft16">{{cards.length || 0}}</span> 张
                    <span class="ml8 color-gray"><m-icon :xlink="showMemberCard?'#icon-arrow-up':'#icon-arrow-down'"/></span>
                </span>
            </p>
            <transition name="slide-up" mode="out-in">
                <div v-show="showMemberCard" class="content">
                    <div v-for="(item, index) in cards" :key="index" class="item" @click="toCardDetail(item)">
                        <p layout="row" layout-align="space-between center">
                            <span class="no-wrap">{{item.name}} <span class="badge-card" :class="['back'+item.type]">{{cardType(item.type)}}</span></span>
                            <span v-if="cardSlots.includes(item.type)" class="ft12 dark-gray pull-right">剩余</span>
                        </p>
                        <p class="ft12 dark-gray" layout="row" layout-align="space-between center">
                            <span>有效期：{{item | validDate}}</span>
                            <span v-if="item.type==2" class="ft16 text-right no-wrap">{{item.balance/100 | currency}}</span>
                            <span v-else-if="item.type==4 || item.type==5" class="ft16 text-right no-wrap">{{item.balance || 0}}<span class="ft12 dark-gray">次</span></span>
                            <!--<p v-else-if="item.type==1" class="ft16 text-right no-wrap">{{7}}<span class="ft12 dark-gray">折</span></p>-->
                            <!--<p v-else-if="item.type==3" class="ft16 text-right no-wrap">{{8}}<span class="ft12 dark-gray">天</span></p>-->
                        </p>
                    </div>
                </div>
            </transition>
        </div>

        <!--券-->
        <div v-if="tickets" class="tickets card">
            <p class="title" layout="row" layout-align="space-between center" @click="showMemberCoupon = !showMemberCoupon">
                <span><m-icon class="mr8" xlink="#icon-coupon"/> 券</span>
                <span class="light-gray ft12">
                    有效 <span class="color-primary ft16">{{tickets.length}}</span> 张
                    <span class="ml8 color-gray"><m-icon :xlink="showMemberCoupon?'#icon-arrow-up':'#icon-arrow-down'"/></span>
                </span>
            </p>
            <transition name="slide-up" mode="out-in">
                <div v-show="showMemberCoupon" class="content">
                    <div v-for="(item, index) in tickets" :key="index" class="item">
                        <p layout="row" layout-align="space-between center">
                            <span class="no-wrap">{{item.name}}</span>
                            <span class="ft12 dark-gray pull-right">剩余</span>
                        </p>
                        <p class="ft12 dark-gray" layout="row" layout-align="space-between center">
                            <span>有效期：{{item | validDate}}</span>
                            <span v-if="item.type == 1" class="ft16 text-right no-wrap">{{item.balance/100 | currency}}</span>
                            <span v-else-if="item.type == 2 || item.type == 3" class="ft16 text-right no-wrap">{{item.balance || 0}}<span class="ft12 dark-gray">次</span></span>
                        </p>
                    </div>
                </div>
            </transition>
        </div>

        <!--赠品-->
        <div v-if="presents" class="presents card">
            <p class="title" layout="row" layout-align="space-between center" @click="showMemberPresents = !showMemberPresents">
                <span><m-icon class="mr8" xlink="#icon-gift"/> 赠品</span>
                <span class="light-gray ft12">
                    有效 <span class="color-primary ft16">{{presents.length}}</span> 份
                    <span class="ml8 color-gray"><m-icon :xlink="showMemberPresents?'#icon-arrow-up':'#icon-arrow-down'"/></span>
                </span>
            </p>
            <transition name="slide-up" mode="out-in">
                <div v-show="showMemberPresents" class="content">
                    <div v-for="(item, index) in presents" :key="index" class="item">
                        <p layout="row" layout-align="space-between center">
                            <span class="no-wrap">{{item.presentName}}</span>
                            <span class="ft12 dark-gray pull-right">剩余</span>
                        </p>
                        <p class="ft12 dark-gray" layout="row" layout-align="space-between center">
                            <span>有效期：{{item | validDate}}</span>
                            <span v-if="item.presentType == 1" class="ft16 text-right no-wrap">{{item.presentAmount/100 | currency}}</span>
                            <span v-else class="ft16 text-right no-wrap">{{item.presentAmount}}份</span>
                        </p>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import api_customerProfiles from 'services/api.customerProfiles';
import { CARD_TYPE } from 'config/mixins';
export default {
    name: 'customer-detail-assets',
    components: {},
    data() {
        return {
            cardSlots: [2, 4, 5],
            CARD_TYPE,
            showMemberCard: true,
            showMemberCoupon: true,
            showMemberPresents: true,
            isLoading: false,
            dataModel: {}
        };
    },
    computed: {
        // 卡
        cards() {
            return this.dataModel.cards || [];
        },
        // 券
        tickets() {
            return this.dataModel.tickets || [];
        },
        // 赠品
        presents() {
            return this.dataModel.presents || [];
        }
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            this.isLoading = true;
            api_customerProfiles.memberDetailAssets(this.$route.params.customerId).then(res => {
                this.isLoading = false;
                this.dataModel = res.data;
            }, err => {
                this.$toast('加载失败');
                this.isLoading = false;
            });
        },
        cardType(type) {
            let obj = this.CARD_TYPE.find(x => { return x.value == type; });
            return obj ? obj.label : '-';
        },
        // 跳转卡详情页面
        toCardDetail(item) {
            // window.location.href = `https://wechat.mei1.info/views/g-card-detail/index.html?merchantid=${this.$store.getters.merchantId}&cardId=${item.id}`;
        }
    },
    filters: {
        validDate(val) {
            if (val) {
                if (val.startTime && val.endTime) {
                    return val.startTime.formatDate('yyyy.MM.dd') + '~' + val.endTime.formatDate('yyyy.MM.dd');
                } else if (val.startTime) {
                    return '永久有效';
                } else {
                    return '使用时生效';
                }
            } else {
                return '-';
            }
        }
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
        .back-blue, .back2 {
            background-color: #3ecdc8;
        }
        .back-pink, .back4, .back5 {
            background-color: #fa958b;
        }
        .back-red, .back1 {
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
                    box-shadow: 0 0 5px 0 rgba(217,217,217,0.50);
                    border-radius: 3px;
                    padding: 8px 12px;
                    margin: 12px;
                    line-height: 24px;
                }
            }
        }
        .tickets, .presents {
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
