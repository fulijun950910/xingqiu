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
            <div class="fs36">{{data.promotionInstance.title}}</div>
            <div class="mt5 fs24 color-gray">{{data.promotionInstance.description}}</div>
            <div class="color-gray m-t-3" layout="row" layout-align="space-between center">
                <div layout="row" layout-align="start end">
                    <span class="color-primary fs32">￥{{ data.promotionInstance.originPrice | fen2yuan }}</span>
                    <span class="fs32">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                    <s class="fs24">￥{{ data.promotionInstance.originPrice | fen2yuan }}</s>
                    <span class="btn-count fs24 m-l-2">3人团</span>
                </div>
                <div class="">团号：111</div>
            </div>
        </div>
        <!--团情况-->
        <div class="cell cell-box bg-white m-t-3" >
            <div class="HotDate"><span class="hot-date">已结束</span></div>
            <div class="cell cell-box bg-default">
                <div>123</div>
            </div>
            <div class="color-gray p-t-2 p-b-2">
                <span>已经超过拼团时间了</span>
            </div>
            <button class="group-buy-category">快去别的团抢占先机</button>
        </div>
        <!--我的团拼记录-->
        <div @click="goRecording" class="cell cell-box bg-white m-t-3" layout="row" layout-align="start center">
            <div flex>我的团拼记录</div>
            <m-icon class="fs32" xlink="#icon-zuojiantou"></m-icon>
        </div>
        <!--可参与的团-->
        <div class="cell cell-box bg-white m-t-3">
            <div class="m-b-3">适用门店</div>
            <div>
                <div v-for="(item,index) in data.storeList" v-if="index < storeShowNum" class="listItem cell cell-box" layout="row">
                    <div @click="openLocation(item)" flex layout="column" layout-align="center start">
                        <div>{{item.storeName}}</div>
                        <div class="fs24">{{item.address}}</div>
                    </div>
                    <div  layout="column" layout-align="center end">
                        <a class="p-1" :href="'tel:' + item.mobile"><m-icon class="color-primary" xlink="#icon-telephone"></m-icon></a>
                    </div>
                </div>
            </div>
            <div v-if="data.storeList && data.storeList.length > 2" class="text-center border-top m-t-3 p-t-2">
                <div v-if="storeShowNum == 2" @click="changeShowStoreNum(1)">查看全部门店 <m-icon xlink="#icon-huabanfuben5"></m-icon></div>
                <div v-else @click="changeShowStoreNum">收起 <m-icon class="rotate180" xlink="#icon-huabanfuben5"></m-icon></div>
            </div>
        </div>
        <!-- 活动内容 -->
        <div class="cell cell-box bg-white m-t-3">
            <div class="m-b-3">活动内容</div>
            <div>
                <div class="p-t-3 p-b-3 border-bottom" v-for="item in data.promotionInstance.promotionRuleGroup.promotionRuleGroupContentExts" layout="row" layout-align="space-between center">
                    <div>{{ item.itemName }}</div>
                    <div>{{ item.itemContent }}</div>
                    <div>{{item.itemPrice | fen2yuan}}</div>
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
        <!--分享提示-->
        <div v-show="showShare" @click="showShare = false" class="share-shadow">
            <div class="jiantou"></div>
            <div class="content">
                <p>你想尽快成团吗？</p>
                <p>动动手指点击右上角“…”，</p>
                <p>邀请您的小伙伴一起来参团吧~</p>
            </div>
        </div>

        <!-- 图文详情-->
        <div v-if="data.promotionInstance.htmlContent" class="jsonHtml cell cell-box bg-white m-t-3">
            <div class="m-b-3">活动内容</div>
            <div v-html="data.promotionInstance.htmlContent"> </div>
        </div>

        <div class="btn-group-padding"></div>
        <div class="btn-group text-center" layout="row" layout-align="space-around center">
            <div>
                <div><m-icon class="icon" xlink="#icon-goumaijilu01"></m-icon></div>
                <div>消费记录</div>
            </div>
            <div @click="showShare = true">
                <div><m-icon class="icon" xlink="#icon-fenxiang"></m-icon></div>
                <div>邀请好友</div>
            </div>
            <div @click="goIndex">
                <div><m-icon class="icon" xlink="#icon-pintuan"></m-icon></div>
                <div>我要开团</div>
            </div>
        </div>
        <mt-popup v-model="buyPop" position="bottom" class="buy-popup">
            <div class="cell cell-box">
                <div class="cell"><span class="color-black fs40 fwb">购买信息</span></div>
                <div class="location" layout="row" layout-align="start center" @click="chooseAddress">
                    <div class="lest-detail" flex="90" >
                        <div class="fs28 color-black" >
                            收货人：{{address.contactPersion}}
                        </div>
                        <div class="loca-address color-gray fs28" flex>
                            收货地址：{{address.fullAddress}}
                        </div>
                    </div>
                    <div class="buy-more" flex="10" layout="row" layout-align="center center">
                        <m-icon xlink="#icon-zuojiantou"></m-icon>
                    </div>
                </div>
                <div layout="row" layout-align="start center">
                    <span class="fs30 color-black fwb">需支付</span>
                    <span flex></span>
                    <span class="fs30 color-black fwb">{{activeBuyItem.sellingPrice | fen2yuan}}元</span>
                </div>
                <div class="pay-btn fs38 color-white" layout="row" layout-align="center center">
                    支付
                </div>
            </div>
        </mt-popup>

    </div>
</template>

<script>
    import Vue from 'vue';
    import apiPromotion from 'services/api.promotion';
    import api_party from 'services/api.party';
    import apiGetJSSignature from 'services/api.getJSSignature';
    import {Swipe, SwipeItem, Popup} from 'mint-ui';
    Vue.component(Swipe.name, Swipe);
    Vue.component(SwipeItem.name, SwipeItem);
    Vue.component(Popup.name, Popup);
    export default {
        name: 'index',
        data() {
            return {
                buyPop: false,
                storeShowNum: 2, // 默认显示门店数量
                activeBuyItem: {}, // 选中的项目
                showShare: false, // 显示分享引导
                address: {},
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
            this.loadAddress();
        },
        methods: {
            init() {
                let data = {
                    id: 6608574587825216
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
            },
            async loadAddress() {
                if (this.$store.state.integralMallActAddress) {
                    this.address = this.$store.state.integralMallActAddress;
                } else {
                    let { data } = await api_party.getDefaultAddress(this.$store.state.party.partyId, this.$store.state.party.id);
                    this.address = data;
                }
            },
            chooseAddress() {
                this.$router.push('/address-list/select');
            },
            goIndex() {
                this.$router.push('/promotion-at-tp');
            },
            goRecording() {
                this.$router.push('/promotion-at-tp-recording');
            },
            showBuy(item) {
                this.activeBuyItem = item;
                this.buyPop = true;
            },
            changeShowStoreNum(type) {
                if (type == 1) {
                    this.storeShowNum = Number.POSITIVE_INFINITY;
                } else {
                    this.storeShowNum = 2;
                }
            },
            async openLocation(item) {
                let data = {
                    latitude: item.latitude,
                    longitude: item.longitude,
                    name: item.storeName,
                    address: item.address
                };
                await apiGetJSSignature.getJSSignature({url: encodeURIComponent(window.location.href.split('#')[0])});
                apiGetJSSignature.openLocation(data);
            }
        }
    };
</script>

<style lang='less'>
    @import '~styles/_style';

    .tp-index{
        font-size: 14px;
        min-height:100vh;
        background:@bg-gray;
        .border-top{
            border-top:1px solid @border-gay;
        }
        .rotate180{
            transform: rotate(180deg);
        }
        .btn-count{
            padding: 0 2vw;
            line-height:1.4;
            box-sizing: border-box;
            border-radius: 4px;
            color: #a2a2a2;
            border: 1px solid #a2a2a2;
        }
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
        .jsonHtml{
            img{
                margin: @l8 0;
                display:block;
                box-shadow: 0 0 5px 1px #eee;
            }
            p{
                letter-spacing:.3vw;
                line-height: 1.6;
            }
        }
        .buy-popup{
            width: 100%;
            overflow: auto;
            -webkit-overflow-scrolling: touch;
            .location{
                background: url("~assets/imgs/integral-mall/address-bg-min.png") repeat-x top,url("~assets/imgs/integral-mall/address-bg-min.png") repeat-x bottom;
                background-size: 10% auto;
                margin-bottom: 10px;
                padding:15px 0;
            }
            .pay-btn{
                left: 15px;
                right: 15px;
                height: 60px;
                bottom: 15px;
                background:linear-gradient(180deg,rgba(255,153,216,1),rgba(252,93,192,1),rgba(255,53,104,1));
                border-radius:14px;
                margin-top:40px;
            }
        }
        .HotDate{
            white-space: nowrap;
            text-align: center;
            height: 36px;
            line-height: 36px;
            width:100%;
            &:before{
                content: '——— •';
                color: #ddd;
                vertical-align: middle;
            }
            &:after{
                content: '• ———';
                color: #ddd;
            }
            .hot-date{
                text-align: cnter;
                width: 150px;
                display: inline-block;
            }
        }
        .group-buy-category{
            width:100%;
            background: @color-primary;
            color:#fff;
            border-radius: 4px;
            padding: @l24 0;
            font-size:@fs32;
            text-align: center;
            display: block;
        }
        .btn-group-padding{
            height:56px;
        }
        .btn-group{
            position: fixed;
            background:@white;
            bottom: 0;
            left:0;
            border:1px solid @border-gay;
            width: 100%;
            height: 56px;
            .icon{
                font-size:28px;
            }
        }
        .share-shadow{
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: fade(black,70%);
            color: white;
            z-index: 20086;
            .content{
                p{
                    text-align: center;
                    margin: 0;
                }
            }
            .jiantou{
                margin: 10vw;
                background: url("~assets/imgs/integral-mall/jiantou.png") no-repeat top right;
                background-size: contain;
                width: 80vw;
                height: 60vw;
                align-self: flex-start;
            }
        }
    }

</style>
