<template>
    <div class="main" v-title="'美问星球'">
        <div class="headBox cell cell-box">
            <div @click="goLink1" class="bannerBox"><img  :src="require('assets/imgs/index/20180509184001.jpg')" alt=""></div>
            <div class="iconList" layout="row" layout-align="space-between center">
                <div @click="goBbsPage">
                    <div class="iconBox iconBox1" layout="row" layout-align="center center"><m-icon class="icon"  xlink="#icon-wenda2"></m-icon></div>
                    <div class="fs24 color-gray">美问美答</div>
                </div>
                <div>
                    <div @click="goMbh" class="iconBox" layout="row" layout-align="center center"><img :src="require('assets/imgs/index/20180509184002.jpg')" alt=""></div>
                    <div class="fs24 color-gray">美博汇</div>
                </div>
                <div>
                    <div @click="goWxbus" class="iconBox iconBox3" layout="row" layout-align="center center"><m-icon class="icon"  xlink="#icon-mendianguanli"></m-icon></div>
                    <div class="fs24 color-gray">店务助手</div>
                </div>
                <div @click="goAllianceBeta">
                    <div class="iconBox iconBox4" layout="row" layout-align="center center"><m-icon class="icon"  xlink="#icon-hezuo"></m-icon></div>
                    <div class="fs24 color-gray">异业共赢</div>
                </div>
                <div @click="goCheckIn">
                    <div class="iconBox iconBox5" layout="row" layout-align="center center"><m-icon class="icon"  xlink="#icon-qiandao"></m-icon></div>
                    <div class="fs24 color-gray">每日签到</div>
                </div>
            </div>
        </div>
        <div class="mainBox cell-box">
            <div class="cell"><strong>精华推荐</strong></div>
            <div>
                <div @click="goBbs(item.url)" class="list-item cell" v-for="item in bbsData">
                    <div layout="row" layout-align="space-between center">
                        <div layout="row" layout-align="start center">
                            <div><img  class="avatar" :src="item.authorImage" alt=""></div>
                            <div class="fs24 color-gray">{{item.author || '匿名'}}</div>
                        </div>
                        <div class="light-gray fs24">{{item.forum}}</div>
                    </div>
                    <div class="mt16" layout="row" layout-align="start stretch">
                        <div flex layout="column" layout-align="space-between start">
                            <div>{{item.subject}}</div>
                            <div>
                                <m-icon class="fs32 color-gray" xlink="#icon-dianzan"></m-icon>
                                <span class="color-gray">{{item.recommendAdd}}</span>
                                &nbsp;&nbsp;
                                <m-icon class="fs32 color-gray" xlink="#icon-huifu"></m-icon>
                                <span class="color-gray">{{item.replies}}</span>
                                &nbsp;&nbsp;
                                <m-icon class="fs32 color-gray" xlink="#icon-yanjing"></m-icon>
                                <span class="color-gray">{{item.views}}</span>
                            </div>
                        </div>
                        <div class="imgBox" layout="row" layout-align="center center">
                            <img  :src="item.attachment" alt="">
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="bottomBarPadding"></div>
        <div class="bottomBar color-gray" layout="row">
            <div class="item act " flex layout="column" layout-align="center center">
                <div><m-icon class="icon "  xlink="#icon-qiandao"></m-icon></div>
                <div class="fs20 ">首页</div>
            </div>
            <div @click="goUserInfo" class="item" flex layout="column" layout-align="center center">
                <div><m-icon class="icon "  xlink="#icon-qiandao"></m-icon></div>
                <div class="fs20 ">我的</div>
            </div>
        </div>
    </div>
</template>

<script>
    import api_party from 'services/api.party';
    export default {
        name: 'main',
        data() {
            return {
                bbsData: []
            };
        },
        mounted() {
            this.loadData();
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
                    size: 5
                };
                api_party.getBbsList(data).then(res => {
                    this.bbsData = res.data;
                });
            },
            checkUser() {
                let flag = false;
                if (!this.$store.state.user || !this.$store.state.party || !this.$store.state.party.partyId) {
                    window.location.href = this.$signLocation;
                    window.location.reload();
                    flag = true;
                }
                return flag;
            },
            goBbs(url) {
                window.location.href = url;
            },
            goLink1() {
                window.location.href = 'https://mp.weixin.qq.com/s/vM_8KeGoOYiGrJfXDTmuCQ';
            },
            goBbsPage() {
                this.$router.push({name: 'bbsPage'});
            },
            goAllianceBeta() {
                this.$router.push({name: 'alliance'});
            },
            goMbh() {
                window.location.href = '/service/shop.html#/index';
            },
            goWxbus() {
                if (this.checkUser()) {
                    return;
                }
                if (this.$store.state.user.merchant && this.$store.state.user.merchant.functionVersion == 4) {
                    window.location.href = '/lite/index.html';
                } else {
                    window.location.href = '/main.html#/index';
                }
            },
            alertMessage() {
                this.$toast('开发中，敬请期待');
            },
            goCheckIn() {
                if (this.checkUser()) {
                    return;
                }
                this.$router.push({name: 'checkIn'});
            },
            goUserInfo() {
                if (this.checkUser()) {
                    return;
                }
                this.$router.push({name: 'userinfo'});
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
    .bannerBox{
        box-shadow: 0 2px 2px #ddd;
        border-radius: 12px;
        overflow:hidden;
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
            width:32px;
            height:32px;
            border-radius: 16px;
            margin:0 auto @l8;
            .icon{
                color:#fff;
                font-size:22px;
            }
            &.iconBox0{
                background: linear-gradient(-45deg, #777, #ccc);
            }
            &.iconBox1{
                background: linear-gradient(-45deg, #7484F3, #CB94F4);
            }
            &.iconBox3{
                background: linear-gradient(-45deg, #848ADD, #64D4FB);
            }
            &.iconBox4{
                background: linear-gradient(-45deg, #F8DA6F, #F2A617);
            }
            &.iconBox5{
                background: linear-gradient(-45deg, #45DCD7, #3FEAB7);
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
                width:28px;
                height:28px;
                display:block;
                border-radius: 50%;
                margin-right:@l8;
            }
            .imgBox{
                width:78px;
                height:78px;
                border-radius: 4px;
                overflow: hidden;
                margin-left: @l16;
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
</style>
