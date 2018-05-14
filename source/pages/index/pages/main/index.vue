<template>
    <div class="main" v-title="'美问星球'">
        <div class="headBox cell cell-box">
            <div ><img :src="require('assets/imgs/index/20180509184001.jpg')" alt=""></div>
            <div class="iconList" layout="row" layout-align="space-between center">
                <div>
                    <div class="iconBox iconBox1" layout="row" layout-align="center center"><m-icon class="icon"  xlink="#icon-wenda2"></m-icon></div>
                    <div class="fs24 color-gray">美问美答</div>
                </div>
                <div>
                    <div class="iconBox" layout="row" layout-align="center center"><img :src="require('assets/imgs/index/20180509184002.jpg')" alt=""></div>
                    <div class="fs24 color-gray">美博汇</div>
                </div>
                <div>
                    <div class="iconBox iconBox3" layout="row" layout-align="center center"><m-icon class="icon"  xlink="#icon-mendianguanli"></m-icon></div>
                    <div class="fs24 color-gray">店务助手</div>
                </div>
                <div @click="alertMessage">
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
                <div class="list-item cell" v-for="item in [{},{},{}]">
                    <div layout="row" layout-align="space-between center">
                        <div layout="row" layout-align="start center">
                            <div><img  class="avatar" :src="require('assets/imgs/index/20180509184001.jpg')" alt=""></div>
                            <div class="fs24 color-gray">小河沟里的一条咸鱼</div>
                        </div>
                        <div class="light-gray fs24">热门</div>
                    </div>
                    <div class="mt16" layout="row" layout-align="start stretch">
                        <div flex layout="column" layout-align="space-between start">
                            <div>随着门店的扩展，拥有一套属于自己的SaaS系统已经迫在眉睫。</div>
                            <div>
                                <m-icon class="fs32 color-gray" xlink="#icon-qiandao"></m-icon>
                                <span class="color-gray">1043</span>
                                &nbsp;&nbsp;
                                <m-icon class="fs32 color-gray" xlink="#icon-qiandao"></m-icon>
                                <span class="color-gray">1043</span>
                            </div>
                        </div>
                        <div class="imgBox" layout="row" layout-align="center center">
                            <img  :src="require('assets/imgs/index/20180509184001.jpg')" alt="">
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
    export default {
        name: 'main',
        data() {
            return {
            };
        },
        mounted() {
        },
        methods: {
            alertMessage() {
                this.$toast('开发中，敬请期待');
            },
            goCheckIn() {
                this.$router.push({name: 'checkIn'});
            },
            goUserInfo() {
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
                margin-top:@l16;
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
