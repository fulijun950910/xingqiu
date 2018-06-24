<template>
    <div class="tp-index">
        <div class="swipe-box">
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="item in data.groupRule.titleImages" :key="item">
                    <img :src="item | mSrc2(require('assets/imgs/nullimg.jpg'))" alt="">
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="cell cell-box bg-white group-buy-content">
            <div class="fs36">{{data.title}}</div>
            <div class="mt5 fs24 color-gray">{{data.description}}</div>
            <div class="color-gray m-t-3" layout="row" layout-align="space-between center">
                <div layout="row" layout-align="start end">
                    <span class="color-primary fs32">￥{{ data.originPrice | fen2yuan }}</span>
                    <span class="fs32">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                    <s class="fs24">￥{{ data.originPrice | fen2yuan }}</s>
                    <span class="btn-count fs24 m-l-2">{{groupData.groupLevel}}人团</span>
                </div>
                <div class="">团号：{{groupData.groupNo}}</div>
            </div>
            <m-icon v-if="groupData.status == 3" xlink="#icon-pintuanchenggong" class="color-primary icon"></m-icon>
        </div>
        <!--团情况-->
        <div class="cell cell-box bg-white m-t-3" >
            <div class="HotDate"><div class="hot-date">
                <div v-if="groupData.status == 3">团长人气太高，团满了</div>
                <div v-else-if="groupData.surplusSecond > 0" class="color-primary"><m-icon xlink="#icon-shalou"></m-icon>{{item.surplusSecond}}</div>
                <div v-else>已结束</div>
            </div></div>
            <div class="cell cell-box bg-default">
                <div class="groupImgList" layout="row" layout-align="center center" flex-wrap="wrap">
                    <div flex="20" class="img" v-for="item in groupData.groupJoinInfoList">
                        <img :src="item.avatarId | mSrc2(require('assets/imgs/female.png'))" alt="">
                        <span class="member-name">团</span>
                    </div>
                    <div v-if="groupData.status != 3" flex="20" class="img" v-for="item in groupJoinNeedNum">
                        <img :src="require('assets/imgs/integral-mall/undefindFace.png')" alt="">
                    </div>

                </div>
            </div>
            <div class="color-gray p-t-2 p-b-2">
                <div v-if="groupData.status == 3">这个团已经挤不下了，去别处看看吧</div>
                <div v-else-if="groupData.status == 1">
                    <span >还差<span class="color-primary">{{groupJoinNeedNum}}</span>人即可成团，快来加入我们吧！</span>
                </div>
                <div v-else>已经超过拼团时间了</div>
            </div>
            <div v-if="groupData.status == 1">
                <button class="group-buy-category" @click="showBuy">来抱团</button>
            </div>
            <!--<button class="group-buy-category" @click="goList" v-else>快去别的团抢占先机</button>-->
            <button class="group-buy-category" @click="showBuy" v-else>快去别的团抢占先机</button>
        </div>
        <!--我的团拼记录-->
        <div @click="goRecording" class="cell cell-box bg-white m-t-3" layout="row" layout-align="start center">
            <div flex>我的团拼记录</div>
            <m-icon class="fs32" xlink="#icon-zuojiantou"></m-icon>
        </div>

        <!-- 活动内容 -->
        <div class="cell cell-box bg-white m-t-3">
            <div class="m-b-3">活动内容</div>
            <div>
                <div class="p-t-3 p-b-3 border-bottom" v-for="item in data.groupRule.groupRuleContentExts" layout="row" layout-align="space-between center">
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
                <p>{{ data.startTime | date('yyyy-MM-dd') }} 至 {{ data.startTime | date('yyyy-MM-dd') }}</p>
            </div>

            <!-- 预约信息 -->
            <div v-if="data.groupInfo.appoint" class="m-b-4">
                <p >预约信息</p>
                <p v-for="item in data.groupInfo.appoint">
                    · {{ item.content }}
                </p>
            </div>

            <!-- 适用人群 -->
            <div v-if="data.groupInfo.suit" class="m-b-4">
                <p >预约信息</p>
                <p v-for="item in data.groupInfo.suit">
                    · {{ item.content }}
                </p>
            </div>

            <!-- 规则提醒 -->
            <div v-if="data.groupInfo.rule" class="m-b-4">
                <p >预约信息</p>
                <p v-for="item in data.groupInfo.rule">
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
        <div v-if="data.htmlContent" class="jsonHtml cell cell-box bg-white m-t-3">
            <div class="m-b-3">活动内容</div>
            <div v-html="data.htmlContent"> </div>
        </div>

        <div class="btn-group-padding"></div>
        <div class="btn-group text-center" layout="row" layout-align="space-around center">
            <div @click="goOrderList">
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
                    <span class="fs30 color-black fwb">{{groupData.sellingPrice | fen2yuan}}元</span>
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
    import {Swipe, SwipeItem, Popup} from 'mint-ui';
    import Q from 'q';
    Vue.component(Swipe.name, Swipe);
    Vue.component(SwipeItem.name, SwipeItem);
    Vue.component(Popup.name, Popup);
    export default {
        name: 'index',
        props: ['promotionId', 'openid', 'groupJoinId'],
        data() {
            return {
                buyPop: false,
                storeShowNum: 2, // 默认显示门店数量
                activeBuyItem: {}, // 选中的项目
                showShare: false, // 显示分享引导
                address: {},
                groupList: [{}, {}],
                groupCount: 1,
                groupData: {},
                groupJoinNeedNum: 0, // 参团人数
                data: {
                    groupRule: {
                        promotionRuleGroup: {}
                    },
                    groupInfo: {}
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
            this.loadDetail();
            // 如果是选完地址回来；
            if (this.$store.state.promotionAtTpData && this.$store.state.promotionAtTpData.loadAddress) {
                this.loadAddress();
                this.buyPop = true;
            }
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
                        json.at_tp.promotionId = this.promotionId;
                        json.at_tp.merchantId = this.data.groupRule.merchantId;
                        json.at_tp.openid = this.openid;
                        json.at_tp.desc = this.data.description;
                        json.at_tp.link = this.data.promotionAuthUrl;
                        json.at_tp.imgUrl = this.data.groupRule.titleImages[0];
                        window.sessionStorage.promotionsData = JSON.stringify(json);
                        this.$store.commit('UPDATE_PROMOTION');
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
            async loadDetail() {
                let { data } = await apiPromotion.getGroupDetail(this.groupJoinId);
                this.groupData = data;
                if (this.groupData.groupJoinInfoList && this.groupData.groupJoinInfoList.length > 0) {
                    this.groupJoinNeedNum = this.groupData.groupLevel - this.groupData.groupJoinInfoList.length;
                }
            },
            chooseAddress() {
                this.$store.state.promotionAtTpData = {
                    loadAddress: true
                };
                this.$router.push('/address-list/select');
            },
            goIndex() {
                this.$router.push(`/promotion-at-tp/${this.promotionId}/${this.openid}`);
            },
            goRecording() {
                this.$router.push('/promotion-at-tp-recording');
            },
            goOrderList() {
                this.$router.push('/b2b-order-list');
            },
            goList() {
                this.$router.push('/promotion-at-tp-list');
            },
            changeShowStoreNum(type) {
                if (type == 1) {
                    this.storeShowNum = Number.POSITIVE_INFINITY;
                } else {
                    this.storeShowNum = 2;
                }
            },
            async checkBuy() {
                var deferred = Q.defer();
                if (!this.$store.state || !this.$store.state.user || !this.$store.state.party || !this.$store.state.party.partyId) {
                    let { data } = await apiPromotion.login({openid: this.openid});
                    let employeeData = {
                        party: data
                    };
                    window.localStorage.employee = JSON.stringify(employeeData);
                    this.$store.commit('UPDATE_LOCAL');
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
                this.buyPop = true;
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
                    promotionRuleGroupExtId: this.groupData.groupRuleExtId,
                    groupType: 2, // 1.开团 2.参团
                    promotionGroupJoinId: this.groupData.id,
                    createSource: 1, // 创建来源 1：美问星球
                    kind: 1,
                    deliveryAddressId: this.address.id
                };
                let res = await apiPromotion.purchase(data);
                let _this = this;
                let payData = {
                    appId: res.data.appId,
                    signType: res.data.signType,
                    paySign: res.data.paySign,
                    timeStamp: res.data.timeStamp,
                    nonceStr: res.data.nonceStr,
                    package: res.data.package,
                    success(res) {
                        _this.loadDetail();
                        _this.showShare();
                    },
                    error(res) {
                    }
                };
                apiGetJSSignature.wxPay(payData);
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
        .group-buy-content{
            position:relative;
            .icon{
                position:absolute;
                right:0;
                top:0;
                font-size: 108px;
            }
        }
        .groupImgList{
            .img{
                position: relative;
                margin:6px 0;
                img{
                    width: 45px;
                    height:45px;
                    border-radius: 50%;
                    display:block;
                    margin: 0 auto
                }
                .member-name {
                    position: absolute;
                    background: @color-primary;
                    color: #FFF;
                    left: 50%;
                    top: 0;
                    display: block;
                    width: 4vw;
                    text-align: center;
                    font-size: 3vw;
                    line-height: 4vw;
                    padding: 1px;
                    box-sizing: content-box;
                    height: 4vw;
                    margin-left:8px;
                    border-radius:50%;
                    border: 1px solid white;
                    z-index: 2;
                }
            }
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
                text-align: center;
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
