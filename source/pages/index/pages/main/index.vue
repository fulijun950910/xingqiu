<template>
 <div class="main" v-title="'美问星球'">
    <div class="headBox cell cell-box">
        <div class="bannerBox">
            <mt-swipe :show-indicators="true" class="banner-swiper">
                <mt-swipe-item v-for="(item, index) in bannerList" v-if="bannerList.length" :key="index">
                       <img @click="goLink1(item.url)" :src="item.image | nSrc(require('assets/imgs/index/20180614.jpg'))" alt="">
                       </mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="iconList" layout="row" layout-align="space-between center">
            <div @click="goBbsPage">
                <div class="iconBox iconBox1" layout="row" layout-align="center center">
                    <m-icon class="icon" xlink="#icon-huaban7"></m-icon>
                </div>
                <div class="fs24 color-gray">美问美答</div>
            </div>
            <div>
                <div @click="goMbh" class="iconBox iconBox2" layout="row" layout-align="center center">
                    <m-icon class="icon" xlink="#icon-huaban5"></m-icon>
                </div>
                <div class="fs24 color-gray">美博汇</div>
            </div>
            <div>
                <div @click="goWxbus" class="iconBox iconBox3" layout="row" layout-align="center center">
                    <m-icon class="icon" xlink="#icon-huaban3"></m-icon>
                </div>
                <div class="fs24 color-gray">店务助手</div>
            </div>
            <div @click="goAllianceBeta">
                <div class="iconBox iconBox4" layout="row" layout-align="center center">
                    <m-icon class="icon" xlink="#icon-huaban4"></m-icon>
                </div>
                <div class="fs24 color-gray">异业共赢</div>
            </div>
            <div @click="goCheckIn">
                <div class="iconBox iconBox5" layout="row" layout-align="center center">
                    <m-icon class="icon" xlink="#icon-huaban8"></m-icon>
                </div>
                <div class="fs24 color-gray">每日签到</div>
            </div>
        </div>
    </div>
    <div class="mainBox cell-box">
        <div class="cell fs40"><strong>精华推荐</strong></div>
        <div>
            <div @click="goBbs(item.url)" class="list-item cell" v-for="item in bbsData" :key="item.id">
                <div layout="row" layout-align="space-between center">
                    <div layout="row" layout-align="start center">
                        <div class="face"><img class="avatar" :src="item.authorImage" alt=""></div>
                        <div class="fs24 color-gray">{{item.author || '匿名'}}</div>
                    </div>
                    <div class="color-yellow-orange fs22">{{item.forum}}</div>
                </div>
                <div class="mt16" layout="row" layout-align="start stretch">
                    <div flex layout="column" layout-align="space-between start">
                        <div class="fs28 color-black">{{item.subject}}</div>
                    </div>
                    <div class="imgBox" layout="row" layout-align="center center">
                        <img :src="item.attachment || require('assets/imgs/index/501657390978523645.jpg')" alt="">
                    </div>
                </div>
                <div class="mt-20">
                    <m-icon class="fs32 color-gray" xlink="#icon-dianzan"></m-icon>
                    <span class="color-gray fs22">{{item.recommendAdd}}</span> &nbsp;&nbsp;
                    <m-icon class="fs32 color-gray" xlink="#icon-huifu"></m-icon>
                    <span class="color-gray fs22">{{item.replies}}</span> &nbsp;&nbsp;
                    <m-icon class="fs32 color-gray" xlink="#icon-yanjing"></m-icon>
                    <span class="color-gray fs22">{{item.views}}</span>
                </div>
            </div>
        </div>

    </div>
    <div class="bottomBarPadding"></div>
    <div class="bottomBar color-gray" layout="row">
        <div class="item act " flex layout="column" layout-align="center center">
            <div>
                <m-icon class="icon " xlink="#icon-huaban6"></m-icon>
            </div>
            <div class="fs20 ">首页</div>
        </div>
        <div @click="goUserInfo" class="item" flex layout="column" layout-align="center center">
            <div>
                <m-icon class="icon " xlink="#icon-huaban1"></m-icon>
            </div>
            <div class="fs20 ">我的</div>
        </div>
    </div>
    <new-present :show-mask="isNew" :ads-detail="adsDetail" @hideMask="hideMask"></new-present>
    <!-- <div class="go-doudou">
         <img @click="goToAuthentication('ruleEntry')" :src="require('assets/imgs/go-big-gift.png')" alt="">
    </div> -->
</div>
</template>

<script>
    import api_party from 'services/api.party';
    import newPresent from 'components/new-present';
    import api_signIn from 'services/api.signIn';
    import reLogin from '../../models/relogin';
    import Q from 'q';
    import Vue from 'vue';
    import { Toast, Swipe, SwipeItem } from 'mint-ui';
    Vue.component(Swipe.name, Swipe);
    Vue.component(SwipeItem.name, SwipeItem);

    export default {
        name: 'main',
        components: {
            newPresent
        },
        data() {
            return {
                bbsData: [],
                isNew: false,
                bean: '500',
                employee: JSON.parse(localStorage.getItem('employee')),
                adsDetail: {},
                swipeConfig: {
                    auto: 4000,
                    showIndicators: false
                },
                bannerList: []
            };
        },
        mounted() {
            this.loadData();
            this.listBanner();
            this.saveUserInfo();
            if (this.$store.state.party && this.$store.state.party.adsList && this.$store.state.party.adsList.length) {
                this.isNew = true;
                this.adsDetail = this.$store.state.party.adsList[0];
                if (this.adsDetail.code == 'home_001') {
                    this.givingBean();
                };
            };
        },
        methods: {
            loadData() {
                let id = 0;
                if (this.$store.state.party) {
                    id = this.$store.state.party.partyId;
                }
                let data = {
                    partyId: id,
                    page: 1,
                    size: 10
                };
                api_party.getBbsList(data).then(res => {
                    this.bbsData = res.data;
                });
            },
            saveUserInfo() {
                let employee = localStorage.getItem('employee');
                if (!employee) {
                    employee = '{}';
                }
                employee = JSON.parse(employee);
                if (this.$knife.keyGetValue(window.location.search, 'openid')) {
                    employee.openId = this.$knife.keyGetValue(window.location.search, 'openid');
                }
                localStorage.setItem('employee', JSON.stringify(employee));
            },
            async checkUser(type) {
                // type 1 进入对应的店务助手 2.返回当前页 3，进入美问星球用户页面
                var deferred = Q.defer();
                if ((!this.$store.state || !this.$store.state.user || !this.$store.state.user.id) && (!this.$store.state.party || !this.$store.state.party.partyId)) {
                    let res = await api_signIn.getEmployeeInfo([{type: 'type', value: type}]);
                    if (res.success && res.data) {
                        let a = await reLogin.select(JSON.stringify(res.data));
                        if (a) {
                            this.$store.commit('UPDATE_LOCAL');
                            deferred.resolve(a);
                        } else {
                            window.location.href = this.$getSignLocation(this.$knife.addSearch(window.location.search, 'type', type));
                        }
                    } else {
                        window.location.href = this.$getSignLocation(this.$knife.addSearch(window.location.search, 'type', type));
                    }
                } else {
                    deferred.resolve(true);
                }
                return deferred.promise;
            },
            checkParty() {
                if (this.$store.getters.isPersonLogin) {
                    this.$toast('抱歉，个人用户，无权限进入');
                    return true;
                }
            },
            goBbs(url) {
                window.location.href = url;
            },
            goLink1(item) {
                if (item.indexOf('html') > -1) {
                    location.href = item;
                } else {
                    this.$router.push(item);
                };
            },
            goBbsPage() {
                this.$router.push({name: 'bbsPage'});
            },
            goAllianceBeta() {
                this.$router.push({name: 'alliance'});
            },
            goMbh() {
                window.location.href = this.$rootPath + 'shop.html#/leader';
            },
            async goWxbus() {
                if (this.checkParty()) {
                    return;
                }
                window.location.href = '/api/b2bPromotionMobile/oauthURI/performance_report';
                // await this.checkUser(1);
                // if (this.$store.state.merchant && (this.$store.state.merchant.functionVersion == 4 || this.$store.state.merchant.functionVersion == 5)) {
                //     window.location.href = '/lite/index.html';
                // } else {
                //     window.location.href = '/main.html#/index';
                // }
            },
            alertMessage() {
                this.$toast('开发中，敬请期待');
            },
            async goCheckIn() {
                if (this.checkParty()) {
                    return;
                }
                window.location.href = '/api/b2bPromotionMobile/oauthURI/star_day_sign';
            },
            async goUserInfo() {
                window.location.href = '/api/b2bPromotionMobile/oauthURI/star_personal';
            },
            hideMask() {
                this.isNew = false;
                let tempLocal = JSON.parse(localStorage.getItem('employee'));
                tempLocal.party.newUser = false;
                localStorage.setItem('employee', JSON.stringify(tempLocal));
                this.$store.state.party.newUser = false;

            },
            givingBean() {
                let parameter = {
                    partyId: this.employee.party.partyId,
                    userId: this.employee.party.id
                };
                api_party.firstLoginGift(parameter).then(msg=> {
                    Toast(msg.message);
                }, msg=> {
                    Toast(msg.message);
                });
            },
            listBanner() {
                let partyId = '0';
                if (this.$store.state) {
                    if (this.$store.state.party) {
                        partyId = this.$store.state.party.id;
                    }

                }
                // console.log(this.$store.state);
                api_party.listBanner('00001', partyId).then(msg=> {
                    this.bannerList = msg.data;
                }, msg=> {
                });
            },
            goToAuthentication(route) {
                window.location.href = `/api/b2bPromotionMobile/oauthURI/${route}`;
            }
        }
    };
</script>

<style scoped lang='less'>
    @import '~styles/_style';
    @color-red-lighten: #EC3F6D;
    .main{
        min-height:100vh;
        background:@bg-gray
    }
    .mt{
        margin-top:@l16;
    }
    .mt-20{
        margin-top: @l40;
    }
    .bannerBox{
        box-shadow: 0 2px 2px #ddd;
        border-radius: 12px;
        overflow:hidden;
        height: 152px;
        width: 100%;
        .banner-swiper{
            width: 100%;
            height: 100%;
            .mint-swipe-items-wrap > div{
                border-radius: 12px;
                overflow: hidden;
            }
        }
    }
    .headBox{
        background:@white;
        img{
            display:block;
        }
        .iconList{
            margin-top:@l28;
        }
        .iconBox{
            width:39px;
            height:39px;
            border-radius: 16px;
            margin:0 auto @l8;
            .icon{
                color:#fff;
                font-size:22px;
            }
            &.iconBox0{
                background:linear-gradient(-139.5deg,rgba(255,136,27,1),rgba(255,151,27,1),rgba(255,165,27,1),rgba(255,180,27,1),rgba(255,193,27,1),rgba(255,207,27,1));
            }
            &.iconBox1{
                background: linear-gradient(-45deg, #7484F3, #CB94F4);
            }
            &.iconBox2{
                background:linear-gradient(-137.9deg,rgba(246,80,160,1),rgba(248,97,158,1),rgba(250,112,157,1),rgba(252,126,155,1),rgba(254,139,153,1),rgba(255,152,151,1));

            }
            &.iconBox3{
               background:linear-gradient(-137.9deg,rgba(246,80,160,1),rgba(248,97,158,1),rgba(250,112,157,1),rgba(252,126,155,1),rgba(254,139,153,1),rgba(255,152,151,1));
            }
            &.iconBox4{
                background:linear-gradient(135.9deg,rgba(100,232,222,1),rgba(100,187,232,1),rgba(100,115,229,1),rgba(138,100,232,1));
            }
            &.iconBox5{
                background:linear-gradient(135.9deg,rgba(100,232,222,1),rgba(100,187,232,1),rgba(100,115,229,1),rgba(138,100,232,1));
            }
        }
    }
    .mainBox{
        background:@white;
        .mt;
        .list-item{
            border-top:1px solid @border-gay;
            .mt16{
                margin-top: @l16;
            }
            .avatar{
                width:30px;
                height:30px;
                display:block;
                border-radius: 50%;
                margin-right:@l8;
                border: 1px solid @border-gay;
            }
            .imgBox{
                width:75px;
                height:50px;
                border-radius: 4px;
                overflow: hidden;
                margin-left: @l16;
                overflow: hidden;
                border-radius: 10px;
                img{
                    height:100%;
                    width:auto;
                }
            }
        }
    }
    .bottomBarPadding{
        height:60px;
    }
    .bottomBar{
        border-top:1px solid @border-gay;
        position: fixed;
        bottom:0;
        left:0;
        width:100%;
        background:@white;
        .item{
            padding:@l8;
            .icon{
                font-size:@fs48;
            }
            &:not(:first-child){
                border-left:1px solid @border-gay;
            }
            &.act{
                color: @color-red-lighten;
            }
        }
    }
    .go-doudou{
        position: fixed;
        z-index: 10;
        width: 60px;
        bottom: 80px;
        right: 31.5px;
        img{
            width: 60px;
            height: auto;
        }


    }
</style>
