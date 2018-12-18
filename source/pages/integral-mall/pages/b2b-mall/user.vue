<template>
    <div class="user" v-title="'我的'" style="overflow:hidden">
        <div class="userInfo">
            <div class="userInfo-top" layout="row" v-show="userInfo.merchantInfo">
                <img :src="userInfo.merchantInfo.logoFileId | mSrc2(require('assets/imgs/avatar.png'))" alt="">
                <div class="info">
                    <div layout="row" layout-align="start center" style="position: relative;">
                        <p class="p1">{{userInfo.merchantInfo.nickName}}</p>
                        <p class="p2" v-show="userInfo.merchantInfo.authStatus == 1">已认证</p>
                        <p class="p2" v-show="userInfo.merchantInfo.authStatus == 2">未认证</p>
                        <div class="ic" @click="LinkTo(1)">
                            <m-icon class="w" link="icon-11"></m-icon>
                        </div>
                    </div>
                    <p style="color:#888888;font-size:13px;margin-top:4px">{{userInfo.merchantInfo.brandName}}</p>
                </div>
            </div>
            <div class="money" layout="row">
                <div class="box" flex style="border-right:1px solid #ccc">
                    <span class="s1">收入:&nbsp;</span>
                    <span class="s2">{{ userInfo.sellMoney | fen2yuan | wan}}</span>
                    <span class="s3" v-show="this.sellMoney >= 10000">&nbsp;万元</span>
                    <span class="s3" v-show="this.sellMoney < 10000">&nbsp;元</span>
                </div>
                <div class="box" flex @click="LinkTo(2)">
                    <span class="s1">美豆豆:&nbsp;</span>
                    <span class="s2">{{userInfo.doudouCounts}}</span>
                    <span class="s3">&nbsp;个</span>
                </div>
            </div>
        </div>
        <div class="nav" style="margin-top:20px" layout="row" layout-align="start center">
            <div layout="column" layout-align="center center" @click="toast">
                <img :src="require('assets/imgs/b2b-mall/youli.png')" alt="">
                <span>邀请返利</span>
            </div>
            <div layout="column" layout-align="center center" @click="toast">
                <img :src="require('assets/imgs/b2b-mall/doudou.png')" alt="">
                <span>美豆豆商场</span>
            </div>
            <div layout="column" layout-align="center center" @click="toast2">
                <img :src="require('assets/imgs/b2b-mall/kefu.png')" alt="">
                <span>在线客服</span>
            </div>
        </div>
        <div style="height:64px;background:#F5F5F5;padding:10px" @click="jump(userInfo.midBanner.url)">
                <!-- <img style="width:355px;border-radius:4px" :src="require('assets/imgs/b2b-mall/2018120601.jpg')" alt=""> -->
                <img style="width:100%;height:100%;border-radius:4px" :src="userInfo.midBanner.imageId | mSrc2(require('assets/imgs/b2b-mall/2018120601.jpg'))" alt="">
        </div>

        <!-- 订单管理 -->
        <div @click="goOrderListPublish" class='cell cell-box bg-white border-bottom' layout='row' layout-align='start center'>
            <div flex class='fs32 fwb'>订单管理</div>
            <div class='color-gray'>查看全部<m-icon style="margin-left:5px" link='icon-zuojiantou'></m-icon></div>
        </div>

        <div class="nav" style="margin:10px 0px" layout="row" layout-align="start center">
            <div @click="goOrderListPublish" layout="column" layout-align="center center">
                <p style="font-size:24px">{{ userInfo.onlineCount }}</p>
                <span style="font-size:13px;color:#666">我发布的</span>
            </div>
            <div @click="goOrderListSell" layout="column" layout-align="center center">
                <p style="font-size:24px">{{userInfo.sellCount}}</p>
                <span style="font-size:13px;color:#666">我卖出的</span>
            </div>
            <div @click="goOrderListBuy" layout="column" layout-align="center center">
                <p style="font-size:24px">{{userInfo.hasBuyCounts}}</p>
                <span style="font-size:13px;color:#666">我买到的</span>
            </div>
        </div>
        <p style="background:#F5F5F5;height:10px"></p>
        <!-- 我的优惠券 -->
        <!-- <div class='cell cell-box bg-white' layout='row' layout-align='start center'>
            <div flex class='fs32 fwb'>我的优惠券</div>
            <div class='color-gray youhui'>
                <span></span>
                10张待使用<m-icon style="margin-left:5px" link='icon-zuojiantou'></m-icon></div>
        </div> -->
        <p class="p"></p>
        <navBar type="2"></navBar>
    </div>
</template>

<script>
import navBar from './modules/nav-bar';
import { MessageBox } from 'mint-ui';
import Vue from 'vue';
import apigetInfo from 'services/api.b2bmall';
export default {
    name: 'user',
    data() {
        return {
            userInfo: {
                merchantInfo: {},
                midBanner: {}
            },
            sellMoney: null
        };
    },
    components: {
        navBar
    },
    mounted() {
        this.getInfo();
    },
    methods: {
        async getInfo() {
            var data = {
                merchantId: this.$store.state.party.merchantId,
                partyId: this.$store.state.party.partyId
            };
            this.$indicator.open();
            apigetInfo.getMyInfo(data).then(
                res => {
                    this.$indicator.close();
                    this.userInfo = res.data;
                    this.sellMoney = (Vue.filter('fen2yuan')(this.userInfo.sellMoney));
                },
                error => {
                    console.log(error);
                }
            );
        },
        LinkTo(t) {
            switch (t) {
                case 1:
                    this.$router.push('/b2b-mall-userinfo');
                    break;
                case 2:
                    this.$router.push('rule-entry');
                    break;
                default:
                    break;
            }
        },
        goOrderListPublish() {
            this.$router.push({
                name: 'b2b-mall-order-list-publish'
            });
        },
        goOrderListBuy() {
            this.$router.push({
                name: 'b2b-mall-order-list-buy'
            });
        },
        goOrderListSell() {
            this.$router.push({
                name: 'b2b-mall-order-list-sell'
            });
        },
        jump(url) {
            location.href = url;
        },
        toast() {
            this.$toast('敬请期待哦~');
        },
        toast2() {
            MessageBox('提示', '请拨打客服电话:400-006-2020');
        }
    }
};
</script>

<style lang='less'>
@import '~styles/_agile';
    .mint-msgbox-wrapper{
        .mint-msgbox{
            .mint-msgbox-btns{
                .mint-msgbox-confirm {
                    color:#854399;
                }
            }
        }
    }
.user {
    margin: auto;
    @color-primary: #854399;
    .color-primary {
        color: @color-primary;
    }
    .userInfo{
        height: 200px;
        width: 100%;
        padding-top: 20px;
        position: relative;
        .userInfo-top{
            margin-left: 16px;
            img{
                width: 49px;
                height: 49px;
                border-radius: 50%;
                margin-right: 11px;
            }
            .info{
                width: 100%;
                margin-bottom: 40px;
                .p1{
                    color: #030303;
                    font-size: 18px;
                    font-weight: bold;
                    margin-right: 8px;
                }
                .p2{
                    width: 49px;
                    height: 19px;
                    text-align: center;
                    line-height: 19px;
                    color: @white;
                    border-radius: 2px;
                    background:linear-gradient(155deg,rgba(180,63,140,1) 0%,rgba(173,55,139,1) 28%,rgba(143,34,130,1) 100%);
                    font-size: 12px;
                }
                .ic{
                    width: 25px;
                    height: 25px;
                    position: absolute;
                    text-align: center;
                    line-height: 25px;
                    right: 20px;
                    .w{
                        width: 20px;
                        height: 20px;
                    }
                }
            }
        }
        .money{
            padding-left: 0;
            .box{
                height: 49px;
                line-height: 49px;
                text-align: center;
                .s1{
                    color:@extra-black;
                    font-size:13px;
                    font-weight:500;
                }
                .s2{
                    color: @color-black;
                    font-size: 20px;
                    font-weight: bold;
                }
                .s3{
                    color: @color-black;
                    font-size: 14px;
                    font-weight:bold;
                }
            }
        }
    }
    .userInfo:after {
        width: 180%;height: 190px;
        position: absolute;
        left: -35%;top:0;
        z-index: -1;
        content: '';
        border-radius: 0 0 50% 50%;
        margin: auto;
        box-shadow:0px 11px 17px 0px rgba(75,110,150,0.11),0px 1px 6px 0px rgba(0,0,0,0.07);
    }
    .nav{
        margin-bottom: 10px;
        div{
            height: 54px;
            flex:33.33;
        }
        div:not(:last-child) {
            border-right: 1px solid @light-gray; /*no*/
        }
        img{
            width: 30px;
            height: 27px;
            margin-bottom: 10px;
        }
        span {
            font-size: 13px;
            color: @extra-black;
        }
    }
    .youhui{
        position: relative;
        span{
            display: block;
            width: 6px;
            height: 6px;
            background: red;
            border-radius: 50%;
            position: absolute;
            top: -5px;
            left: -5px;
        }
    }
    .p{
        background: #F5F5F5;
        min-height: 150px;
    }
}
</style>
