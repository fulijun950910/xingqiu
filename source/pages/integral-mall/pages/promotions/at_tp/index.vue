<template>
    <div class="tp-index" >
        <div class="swipe-box">
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="item in data.groupRule.titleImages" :key="item">
                    <img :src="item | mSrc2(require('assets/imgs/nullimg.jpg'))" alt="">
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="cell cell-box bg-white">
            <div class="fs36">{{data.title}}</div>
            <div class="mt5 fs24 color-gray">{{data.description}}</div>
            <div class="color-gray border-bottom cell" layout="row" layout-align="space-between center">
                <div>
                    <s class="color-primary fs32">￥{{ data.originPrice | fen2yuan }}</s> 市场价
                </div>
                <!--<div class="">{{data.allBuyCount | buyCount}}+ 人购买</div>-->
            </div>
            <div class="m-t-4" layout="row" layout-align="start center">
                <div @click="showBuy(item)" v-for="(item,index) in data.groupRule.groupRuleExts" :key="index" flex="30" :class="{'buyTypeItem1':index==0,'buyTypeItem2':index==1,'buyTypeItem3':index==2}" class="buyTypeItem">
                    <div class="typeTitle fs24">{{ item.levelName }}</div>
                    <div class="fs32 m-t-1 m-b-1"><span class="fs24">￥</span>{{ item.sellingPrice | fen2yuan }}</div>
                </div>
            </div>
            <div class="color-gray m-t-3">
                <m-icon xlink="#icon-xiangqing"></m-icon>
                支付并邀请好友开团，{{ data.groupRule.liveTime }}小时内人数不足自动退款
            </div>
        </div>
        <!--特色描述-->
        <div v-if="data.featrueDescription" class="cell cell-box bg-white m-t-3">
            <div class="m-b-3">特色描述</div>
            <div v-html="data.featrueDescription.replace(/\n/ig, '<br>')"></div>
        </div>
        <!--可参与的团-->
        <div class="cell cell-box bg-white m-t-3">
            <div class="m-b-3">
                <span v-if="groupCount == 0"> 暂无可参与的团 </span>
                <span v-else> 你的小伙伴正在等你抱团 </span>
            </div>
            <div>
                <div @click="goPromotionDetail(item.id)" v-for="(item, index) in groupList" :key="index" class="listItem cell cell-box" layout="row">
                    <div class="m-r-1"><img :src="item.captainAvatarId | mSrc2(require('assets/imgs/nullimg.jpg'))"></div>
                    <div class="m-r-4" flex layout="column" layout-align="center start">
                        <div>团长:{{item.captainName}}</div>
                        <div layout="row" class="w100">
                            <div flex v-if="item.status == 1" class="color-gray"><m-icon xlink="#icon-shalou"></m-icon>{{item.remainSecond | mTime}}</div>
                            <div flex v-if="item.status == 2" class="color-gray">已结束</div>
                            <div flex v-if="item.status == 3" class="color-gray">已成团</div>
                            <div flex v-if="item.status == 4" class="color-gray">处理中</div>
                            <span class="num m-r-4">{{item.groupLevel}}人团</span>
                        </div>

                    </div>
                    <div  layout="column" layout-align="center end">
                        <span v-if="item.status == 1" class="btn">来抱团</span>
                        <m-icon v-else-if="item.status == 3" class="success-icon color-primary" xlink="#icon-yueman"></m-icon>
                        <span v-else class="color-gray">已结束</span>
                    </div>
                </div>

            </div>
            <div @click="goPromotionList" v-if="groupCount > 2" class="text-center m-t-3">
                <span  class="color-primary">查看更多...</span>
            </div>
            <div v-else class="text-center m-t-3">
                <span class="color-gray">活动刚开始，快来抢沙发</span>
            </div>
        </div>
        <!--我的团拼记录-->
        <div @click="goRecording" class="cell cell-box bg-white m-t-3" layout="row" layout-align="start center">
            <div flex>我的团拼记录</div>
            <m-icon class="fs32" xlink="#icon-zuojiantou"></m-icon>
        </div>

        <!-- 活动内容 -->
        <div class="cell cell-box bg-white m-t-3" v-if="data.groupRule.groupRuleContentExts&&data.groupRule.groupRuleContentExts.length>0">
            <div class="m-b-3">活动内容</div>
            <div>
                <div class="p-t-3 p-b-3 border-bottom" v-for="(item, index) in data.groupRule.groupRuleContentExts" :key="index" layout="row" layout-align="space-between center">
                    <div flex="45">{{ item.itemName }}</div>
                    <div flex="25" class="text-center">{{ item.itemContent }}</div>
                    <div flex="25" class="text-right">{{item.itemPrice | fen2yuan}}</div>
                </div>
            </div>
        </div>
        <!--我的团拼记录-->
        <div class="cell cell-box bg-white m-t-3" >
            <div class="m-b-3" @click="goRule">拼团玩法 <m-icon class="color-primary" xlink="#icon-xunwen"></m-icon></div>
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
                <p>{{ data.startTime | date('yyyy-MM-dd') }} 至 {{ data.endTime | date('yyyy-MM-dd') }}</p>
            </div>

            <!-- 预约信息 -->
            <div v-if="data.groupInfo && data.groupInfo.appoint" class="m-b-4">
                <p >预约信息</p>
                <p v-for="(item, index) in data.groupInfo.appoint" :key="index">
                    · {{ item.content }}
                </p>
            </div>

            <!-- 适用人群 -->
            <div v-if="data.groupInfo && data.groupInfo.suit" class="m-b-4">
                <p >适用人群</p>
                <p v-for="(item, index) in data.groupInfo.suit" :key="index">
                    · {{ item.content }}
                </p>
            </div>

            <!-- 规则提醒 -->
            <div v-if="data.groupInfo && data.groupInfo.rule" class="m-b-4">
                <p >规则提醒</p>
                <p v-for="(item, index) in data.groupInfo.rule" :key="index">
                    · {{ item.content }}
                </p>
            </div>

            <div class="m-b-4">
                <div>温馨提示</div>
                <p>· 如果需要发票，请您在消费时向商户咨询；</p>
                <p>· 活动图片由商户提供，若侵害到您的权益请联系我们，若情况属实，我们将第一时间删除所有相关图片；</p>
            </div>
        </div>

        <!-- 图文详情-->
        <div v-if="data.htmlContent" class="jsonHtml cell cell-box bg-white m-t-3">
            <div class="m-b-3">活动内容</div>
            <div v-html="data.htmlContent"> </div>
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
                <div @click="submit" class="pay-btn fs38 color-white" layout="row" layout-align="center center">
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
import { Swipe, SwipeItem, Popup } from 'mint-ui';
import Q from 'q';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Popup.name, Popup);
export default {
    name: 'index',
    props: ['promotionId', 'openid'],
    data() {
        return {
            buyPop: false,
            storeShowNum: 2, // 默认显示门店数量
            activeBuyItem: {}, // 选中的项目
            address: {},
            groupList: [],
            groupCount: 0,
            data: {
                groupRule: {
                    groupRule: {},
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
        this.loadGroupList();
        this.dynamicTime();
        // 如果是选完地址回来；
        if (this.$store.state.promotionAtTpData && this.$store.state.promotionAtTpData.loadAddress) {
            this.loadAddress();
            this.buyPop = true;
            this.activeBuyItem = this.$store.state.promotionAtTpData.activeBuyItem;
        };
        this.$store.state.promotionAtTpData = {};
    },
    methods: {
        init() {
            let data = {
                id: this.promotionId
            };
            this.$indicator.open();
            apiPromotion.view(data).then(result => {
                this.$indicator.close();
                if (result && result.data) {
                    this.data = result.data;
                    // 计算活动原价（活动内容价目之和）
                    this.data.originPrice = 0;
                    this.data.groupRule.groupRuleContentExts.forEach(item => {
                        this.data.originPrice += item.itemPrice;
                    });
                    // 更新数据
                    let json = {
                        at_tp: {}
                    };
                    json.at_tp.title = this.data.title;
                    document.title = json.at_tp.title;
                    json.at_tp.promotionId = this.promotionId;
                    json.at_tp.merchantId = this.data.groupRule.merchantId;
                    json.at_tp.openid = this.openid;
                    json.at_tp.desc = this.data.description;
                    json.at_tp.link = this.data.promotionAuthUrl;
                    json.at_tp.imgUrl = this.data.groupRule.titleImages[0];
                    window.sessionStorage.promotionsData = JSON.stringify(json);
                    this.$store.commit('UPDATE_PROMOTION');
                    //
                    let employeeData = window.localStorage.employee || '{}';
                    employeeData = JSON.parse(employeeData);
                    employeeData.openId = json.at_tp.openid;
                    window.localStorage.employee = JSON.stringify(employeeData);
                    this.$store.commit('UPDATE_LOCAL');
                    // 规则分组
                    result.data.groupInfo = {};
                    // 活动规则
                    if (result.data.groupRule.promotionRuleDescriptions && result.data.groupRule.promotionRuleDescriptions) {
                        result.data.groupRule.promotionRuleDescriptions.forEach((v, i) => {
                            if (v.code && v.code.indexOf('_') > -1) {
                                var name = v.code.split('_')[0];
                                if (!result.data.groupInfo[name] || result.data.groupInfo[name].lenth < 1) {
                                    result.data.groupInfo[name] = [];
                                }
                                result.data.groupInfo[name].push(v);
                            } else if (v.content && v.content != '') {
                                if (!result.data.groupInfo.rule || result.data.groupInfo.rule.lenth < 1) {
                                    result.data.groupInfo.rule = [];
                                }
                                result.data.groupInfo.rule.push(v);
                            }
                        });
                    }
                    // jssdk分享
                    this.js_sdk_check();
                }
            });
        },
        async loadAddress() {
            var deferred = Q.defer();
            if (this.$store.state.integralMallActAddress) {
                this.address = this.$store.state.integralMallActAddress;
            } else {
                let { data } = await api_party.getDefaultAddress(this.$store.state.party.partyId, this.$store.state.party.id);
                this.address = data || {};
            }
            deferred.resolve(true);
            return deferred.promise;
        },
        dynamicTime() {
            setTimeout(() => {
                for (let i = 0; i < this.groupList.length; i++) {
                    if (this.groupList[i].remainSecond > 0) {
                        this.groupList[i].remainSecond -= 1;
                    }
                }
                this.dynamicTime();
            }, 1000);
        },
        async loadGroupList() {
            let queryData = {
                promotionInstanceId: this.promotionId,
                page: 1,
                size: 100
            };
            let { data } = await apiPromotion.getGroupJoinList(queryData);
            if (data && data.rows) {
                this.groupCount = data.rows.length;
                this.groupList = data.rows.filter((a) => {
                    return a.status == '1';
                }).slice(0, 2);
                if (this.groupList.length < 2) {
                    let handling = data.rows.filter((a) => {
                        return a.status == '4';
                    }).slice(0, (2 - this.groupList.length));
                    this.groupList = this.groupList.concat(handling);
                }
                if (this.groupList.length < 2) {
                    let handling = data.rows.filter((a) => {
                        return a.status == '3';
                    }).slice(0, (2 - this.groupList.length));
                    this.groupList = this.groupList.concat(handling);
                }
            }
        },
        chooseAddress() {
            this.$store.state.promotionAtTpData = {
                loadAddress: true,
                activeBuyItem: this.activeBuyItem
            };
            this.$router.push('/address-list/select');
        },
        goRecording() {
            this.$router.push('/promotion-at-tp-recording');
        },
        goRule() {
            this.$router.push('/promotion-at-tp-rule');
        },
        goPromotionList() {
            this.$router.push('/promotion-at-tp-list');
        },
        goPromotionDetail(id) {
            this.$router.push(`/promotion-at-tp-detail/${this.promotionId}/${this.openid}/${id}`);
        },
        async checkBuy() {
            var deferred = Q.defer();
            if (!this.$store.state || !this.$store.state.user || !this.$store.state.party || !this.$store.state.party.partyId) {
                if (this.$isDev) {
                    window.location.href = this.$getSignLocation(`?openid=${this.$store.state.user.openId}`);
                } else {
                    window.location.href = `/userinfo.html?type=2&openid=${this.$store.state.user.openId}#/user_login`;
                }
            }
            deferred.resolve(true);
            return deferred.promise;
        },
        async showBuy(item) {
            await this.checkBuy();
            // 没有地址加载地址
            if (!this.address.id) {
                await this.loadAddress();
            }
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
        async submit() {
            if (!this.address.id) {
                this.$toast('请选择您的收货地址');
                return;
            }
            let data = {
                merchantId: this.$store.state.at_tp.merchantId,
                partyId: this.$store.state.party.partyId,
                userId: this.$store.state.party.id,
                openid: this.openid,
                mobile: this.$store.state.party.userName,
                nickName: this.$store.state.party.nickName,
                campaignName: this.data.title,
                promotionInstanceId: this.promotionId,
                promotionRuleGroupExtId: this.activeBuyItem.id,
                groupType: 1, // 1.开团 2.参团
                createSource: 1, // 创建来源 1：美问星球
                kind: 1,
                deliveryAddressId: this.address.id
            };
            let res = await apiPromotion.purchase(data);
            this.pay(res);
        },
        pay(res) {
            let _this = this;
            apiGetJSSignature.wxPay({
                appId: res.data.appId,
                signType: res.data.signType,
                paySign: res.data.paySign,
                timeStamp: res.data.timeStamp,
                nonceStr: res.data.nonceStr,
                package: res.data.package,
                success() {
                    _this.goPromotionDetail(res.data.groupJoinId);
                }
            });
        },
        js_sdk_check() {
            this.js_sdk();
            let time = setInterval(() => {
                if (this.$store.state.isLoadSdk) {
                    this.js_sdk();
                    clearInterval(time);
                }
            }, 600);
            this.js_sdk();
        },
        async js_sdk() {
            let _this = this;
            let share = {
                title: _this.$store.state.at_tp.title,
                desc: _this.$store.state.at_tp.desc,
                link: `${window.location.origin}/api/b2bPromotionMobile/promotionAuthUrl/${_this.promotionId}`,
                imgUrl: window.location.origin + '/api/file/' + _this.$store.state.at_tp.imgUrl,
                type: 'link',
                dataUrl: '',
                success: function() {
                },
                cancel: null
            };
            apiGetJSSignature.hideMenuItems();
            apiGetJSSignature.shareAppMessage(share);
        },
        async openLocation(item) {
            let data = {
                latitude: item.latitude,
                longitude: item.longitude,
                name: item.storeName,
                address: item.address
            };
            await apiGetJSSignature.getJSSignature({ url: encodeURIComponent(window.location.href.split('#')[0]) });
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
        .w100{
            width:100%;
        }
        .border-top{
            border-top:1px solid @border-gay;
        }
        .rotate180{
            transform: rotate(180deg);
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
            margin-left: 5%;
            background:#307BC1;
        }
        .buyTypeItem3{
            margin-left: 5%;
            background:#13A59E;
        }
        .listItem{
            background:@bg-gray;
            margin-top: @l16;
            .success-icon{
                font-size: 58px;
            }
            .num{
                border: 1px solid #a2a2a2;
                color: #a2a2a2;
                font-size:@fs22;
                height:22px;
                line-height:22px;
                padding: 0 4px;
                border-radius: 4px;
            }
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
    }

</style>
