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
                <div v-for="(item,index) in data.promotionInstance.promotionRuleGroup.promotionRuleGroupExts" flex="30" :class="{'buyTypeItem1':index==0,'buyTypeItem2':index==1,'buyTypeItem3':index==2}" class="buyTypeItem">
                    <div class="typeTitle fs24">{{ item.levelName }}</div>
                    <div class="fs32 m-t-1 m-b-1"><span class="fs24">￥</span>{{ item.sellingPrice | fen2yuan }}</div>
                </div>
            </div>
            <div class="color-gray m-t-3">
                <m-icon xlink="#icon-xiangqing"></m-icon>
                支付并邀请好友开团，{{ data.promotionInstance.promotionRuleGroup.liveTime }}小时内人数不足自动退款
            </div>
        </div>
        <!--特色描述-->
        <div v-if="data.promotionInstance.featrueDescription" class="cell cell-box bg-white m-t-3">
            <div class="m-b-3">特色描述</div>
            <div v-html="data.promotionInstance.featrueDescription.replace(/\n/ig, '<br>')"></div>
        </div>
        <!--可参与的团-->
        <div v-if="data.promotionInstance.featrueDescription" class="cell cell-box bg-white m-t-3">
            <div class="m-b-3">
                <span v-if="groupList && groupList.length == 0"> 暂无可参与的团 </span>
                <span v-else> 你的小伙伴正在等你抱团 </span>
            </div>
            <div>
                <div v-for="item in groupList" class="listItem cell cell-box" layout="row">
                    <!--<div><img :src="item | mSrc2(require('assets/imgs/nullimg.jpg'))"></div>-->
                    <div class="m-r-1"><img :src="require('assets/imgs/nullimg.jpg')"></div>
                    <div flex layout="column" layout-align="center start">
                        <div>团长:123</div>
                        <div class="color-gray"><m-icon xlink="#icon-shalou"></m-icon>12:12:12</div>
                    </div>
                    <div  layout="column" layout-align="center end">
                        <span class="btn">来抱团</span>
                    </div>
                </div>

            </div>
            <div v-if="groupCount && groupCount > 2" class="text-center m-t-3">
                <span class="color-primary">查看更多...</span>
            </div>
            <div v-else class="text-center m-t-3">
                <span class="color-gray">活动刚开始，快来抢沙发</span>
            </div>
        </div>
        <!--我的团拼记录-->
        <div class="cell cell-box bg-white m-t-3" layout="row" layout-align="start center">
            <div flex>我的团拼记录</div>
            <m-icon class="fs32" xlink="#icon-zuojiantou"></m-icon>
        </div>
        <!--可参与的团-->
        <div v-if="data.promotionInstance.featrueDescription" class="cell cell-box bg-white m-t-3">
            <div class="m-b-3">适用门店</div>
            <div>
                <div v-for="item in groupList" class="listItem cell cell-box" layout="row">
                    <div flex layout="column" layout-align="center start">
                        <div>团长:123</div>
                        <div class="fs24"><m-icon xlink="#icon-shalou"></m-icon>12:12:12</div>
                    </div>
                    <div class="p-l-1 p-r-1" layout="column" layout-align="center end">
                        <m-icon class="color-primary" xlink="#icon-telephone"></m-icon>
                    </div>
                </div>

            </div>
        </div>
        <!-- 活动内容 -->
        <!--todo-->
        <!--我的团拼记录-->
        <div class="cell cell-box bg-white m-t-3" >
            <div class="m-b-3">拼团玩法 <m-icon class="color-primary" xlink="#icon-xunwen"></m-icon></div>
            <div class="rule-item" layout="row" layout-align="space-between start">
                <div flex="20" layout="column" layout-align="center center">
                    <m-icon class="color-primary rule-icon" xlink="#icon-tuangou1"></m-icon>
                    <span class="fs22">开团或参团</span>
                </div>
                <m-icon class="fs32 color-gray m-t-4" flex="5" xlink="#icon-zuojiantou"></m-icon>
                <div flex="20" layout="column" layout-align="center center">
                    <m-icon class="color-primary rule-icon" xlink="#icon-zhifu"></m-icon>
                    <span class="fs22">付款</span>
                </div>
                <m-icon class="fs32 color-gray m-t-4" flex="5" xlink="#icon-zuojiantou"></m-icon>
                <div flex="23" layout="column" layout-align="center center">
                    <m-icon class="color-primary rule-icon" xlink="#icon-wangzhan-pintuan"></m-icon>
                    <span class="fs22">邀请好友拼团</span>
                </div>
                <m-icon class="fs32 color-gray m-t-4" flex="5" xlink="#icon-zuojiantou"></m-icon>
                <div flex="20" layout="column" layout-align="center center">
                    <m-icon class="color-primary rule-icon" xlink="#icon-xiaolian2"></m-icon>
                    <span class="fs22">拼团成功</span>
                </div>
            </div>
        </div>
        <!--活动详情-->
        <div class="cell cell-box bg-white m-t-3" >
            <div class="m-b-4">
                <div>活动有效期</div>
                <p>{{ data.promotionInstance.startDate | date('yyyy-MM-dd') }} 至 {{ data.promotionInstance.startDate | date('yyyy-MM-dd') }}</p>
            </div>
            <div v-if="data.promotionInstance.validTime" class="m-b-4">
                <div>优惠券有效期</div>
                <p>{{ data.promotionInstance.validTime | couponDate }}</p>
            </div>

            <!-- 预约信息 -->
            <div v-if="data.promotionInstance.groupInfo.appoint" class="m-b-4">
                <p >预约信息</p>
                <p v-for="item in data.promotionInstance.groupInfo.appoint">
                    · {{ item.content }}
                </p>
            </div>

            <!-- 适用人群 -->
            <div v-if="data.promotionInstance.groupInfo.suit" class="m-b-4">
                <p >预约信息</p>
                <p v-for="item in data.promotionInstance.groupInfo.suit">
                    · {{ item.content }}
                </p>
            </div>

            <!-- 规则提醒 -->
            <div v-if="data.promotionInstance.groupInfo.rule" class="m-b-4">
                <p >预约信息</p>
                <p v-for="item in data.promotionInstance.groupInfo.rule">
                    · {{ item.content }}
                </p>
            </div>

            <div class="m-b-4">
                <div>温馨提示</div>
                <p>· 如果需要发票，请您在消费时向商户咨询；</p>
                <p>· 活动图片由商户提供，若侵害到您的权益请联系我们，若情况属实，我们将第一时间删除所有相关图片；</p>
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
                groupList: [{}, {}],
                groupCount: 1,
                data: {
                    promotionInstance: {
                        promotionRuleGroup: {},
                        groupInfo: {}
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

                        // 规则分组
                        result.data.promotionInstance.groupInfo = {};
                        // 活动规则
                        if (result.data.promotionInstance.promotionRuleGroup.promotionRuleDescriptions && result.data.promotionInstance.promotionRuleGroup.promotionRuleDescriptions) {
                            result.data.promotionInstance.promotionRuleGroup.promotionRuleDescriptions.forEach((v, i) => {
                                if (v.code && v.code.indexOf('_') > -1) {
                                    var name = v.code.split('_')[0];
                                    if (!result.data.promotionInstance.groupInfo[name] || result.data.promotionInstance.groupInfo[name].lenth < 1) {
                                        result.data.promotionInstance.groupInfo[name] = [];
                                    }
                                    result.data.promotionInstance.groupInfo[name].push(v);
                                } else if (v.content && v.content != '') {
                                    if (!result.data.promotionInstance.groupInfo.rule || result.data.promotionInstance.groupInfo.rule.lenth < 1) {
                                        result.data.promotionInstance.groupInfo.rule = [];
                                    }
                                    result.data.promotionInstance.groupInfo.rule.push(v);
                                }
                            });
                        }
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
        .buyTypeItem2{
            background:#307BC1;
        }
        .buyTypeItem3{
            background:#13A59E;
        }
        .listItem{
            background:@bg-gray;
            margin-top: @l16;
            img{
                width:60px;
                height:60px;
                border-radius: 50%;
                display:block;
            }
            .btn{
                padding: 2px 6px;
                border:1px solid @color-primary;
                color:@color-primary;
            }
        }
        .rule-item{
            .rule-icon{
                font-size:42px;
                border: 1px solid @color-primary;
                border-radius: 50%;
                margin-bottom:10px;
            }
        }
    }

</style>
