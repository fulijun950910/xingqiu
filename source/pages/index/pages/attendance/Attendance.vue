<template>
    <div class="Attendance" v-title="'考勤打卡'">
        <div class="header" layout="row" layout-align="space-between center">
            <div class="time" layout="row" layout-align="center center" >
                <m-icon class="ic" link="icon-left-bold" @click.native="changeDate(-1)"></m-icon>
                <p id="beginTime">{{time | amDateFormat('YYYY.MM.DD')}}</p>
                <m-icon class="ic" link="icon-right-bold" @click.native="changeDate(1)"></m-icon>
            </div>
            <div class="Statistics" layout="row" layout-align="center center" @click="GetAdreess">
                <m-icon class="ic" link="icon-dianzan"></m-icon>
                <p>统计</p>
            </div>
        </div>
        <span>{{time2}}</span>
        <div class="main">
            <div class="asm-card">
                <p class="p-t-4 fs16 m-b-5" style="line-height:19px">今天继续朝着梦想出发吧~</p>
                <div class="asm-list">
                    <div v-for="(item, index) in 2"
                         :key="index">
                        <p class="m-b-1 color-gray">上班时间09:00</p>
                        <div class="ka">
                            <div class="yuan">
                                <span class="fs40 fwb" style="color:white">{{dingwei}}</span>
                                <span id="latitude">{{latitude}}</span>
                                <span id="longitude">{{longitude}}</span>
                            </div>
                            <div class="m-t-4 fs24">
                                <m-icon class="m-r-2 ic" link="icon-gengduoicon"></m-icon>
                                <span>还未获取到地址位置</span>
                                <span class="m-l-2" style="color:#768BB7">点击重试</span>
                            </div>
                        </div>
                         <div class="card-info">
                            <p class="m-b-1 color-gray">上班时间09:00</p>
                            <div class="p-b-5">
                                <div class="fs32 m-b-2">
                                    <b>打卡时间08:50</b>
                                    <span class="Late">迟到</span>
                                    <span class="abnormal">异常打卡</span>
                                </div>
                                <p>
                                    <m-icon link="icon-4"
                                            class="m-r-1"></m-icon>
                                    <span class="color-gray">通协路268号</span>
                                </p>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
            <div class="ban" layout="row" layout-align="start center">
                <p>A班&nbsp;9:00-18:00</p>
                <p>B班&nbsp;9:00-18:00</p>
                <m-icon class="ic" link="icon-pop-left"></m-icon>
            </div>
            <div class="share-box" v-if="isShowShare" @click.stop="isShowShare = false ">
                <div class="box" @click.stop="" style="z-index:999">
                    <div class="msg">
                        <m-icon class="ic color-gray" link="icon-close" @click.native="isShowShare = false" ></m-icon>
                        <div style="line-height:30px">
                            <p class="fs30 fwb">发送申请给潘金莲</p>
                            <p style="color:#888" class="fs16">考勤时间:2018.12.14 9:32</p>
                            <p style="color:#888" class="fs16">状态：迟到2分钟</p>
                        </div>
                        <p class="fwb fs24 m-b-4" style="margin-top:44px;">申请事由</p>
                    </div>
                    <div style="width:100%;height187px;background:rgba(245,245,245,1);padding:20px;position:relative">
                        <textarea ref="text" autofocus style="height:187px;background:rgba(245,245,245,1);font-size:16px" @input.native="alert" cols="30" rows="10" maxlength="300"></textarea>
                        <div style="position:absolute;right:20px;bottom:20px">
                            <span style="color:#781A75">{{this.length}}</span>
                            <span> / 300</span>
                        </div>
                    </div>
                    <div style="height:49px;line-height:49px;text-align:center;color:#781A75" class="fwb">提交申请</div>
                </div>
            </div>

            <div class="share-box" v-if="isShowShare2" @click.stop="isShowShare2 = false ">
                <div class="box" @click.stop="" style="z-index:999">
                    <div class="msg">
                        <m-icon class="ic color-gray" link="icon-close" @click.native="isShowShare2 = false" ></m-icon>
                        <div style="line-height:30px">
                            <p class="fs30 fwb">发送申请给潘金莲</p>
                            <p style="color:#888" class="fs16">考勤时间:2018.12.14 9:32</p>
                            <p style="color:#888" class="fs16">状态：迟到2分钟</p>
                        </div>
                        <div class="Reason" layout="row" layout-align="start start">
                            <p style="white-space:nowrap;" class="m-r-2 extra-light-black">申请事由:</p>
                            <p class="color-black">早上起来晚了。。。好到么哦啊</p>
                        </div>
                    </div>
                    <div style="padding:10px 40px 100px 40px;margin-top:40px">
                        <div class="m-t-4" style="border-left:1px solid #ccc;padding:0 30px;position:relative;height:80px">
                                <div>
                                    <img class="img1" :src="require('assets/imgs/avatar.png')" alt="">
                                    <div style="position:absolute;top:-10px">
                                        <p class="fwb">我发起请求</p>
                                        <p>2018.12.12 9:45</p>
                                    </div>
                                </div>
                                <div>
                                    <img class="img2" :src="require('assets/imgs/avatar.png')" alt="">
                                    <div style="position:absolute;top:70px">
                                        <span>潘金莲</span>&nbsp;&nbsp;<span style="color:#A43A8E" class="fwb">待审批</span>
                                        <p>已耗时 4小时</p>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="Handle" layout="row" layout-align="start center">
            <router-link tag="li" to="/Approval" layout="row" layout-align="space-between center" style="width:100%;">
                <div>
                    <p>待处理</p>
                    <span>您有<span style="color:red;margin:0 4px">14</span>条待审批申请</span>
                </div>
                <div><m-icon class="ic" link="icon-pop-left"></m-icon></div>
            </router-link>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import apiGetJSSignature from 'services/api.getJSSignature';
import { Cell } from 'mint-ui';
import wx from 'weixin-js-sdk';
Vue.component(Cell.name, Cell);

export default {
    name: 'Attendance',
    components: {
    },
    data() {
        return {
            time: this.$moment().startOf('d'),
            time2: this.$moment().format('HH:mm:ss'),
            isShowShare: false,
            isShowShare2: false,
            length: 0,
            xian: false,
            latitude: '经度',
            longitude: '纬度',
            dingwei: 'dingweizhong'
        };
    },
    async mounted() {
        await apiGetJSSignature.getJSSignature({ url: encodeURIComponent(window.location.href.split('#')[0]) });
        this.GetAdreess();
        this.getTime();
    },
    methods: {
        GetAdreess() {
            wx.ready(function() {
                wx.getLocation({
                    type: 'gcj02',
                    success: function(res) {
                        let latitude = res.latitude;
                        let longitude = res.longitude;
                        console.log(latitude, longitude, 1);
                        document.getElementById('#latitude').html(latitude);
                        document.getElementById('#longitude').html(latitude);
                    }
                });
            });
        },
        confirm2() {
            this.isShowShare2 = true;
        },
        changeDate(val) {
            this.time = this.$moment(this.time).add(val, 'd');
        },
        showHTML() {
            this.time2 = this.$moment().format('HH:mm:ss');
        },
        getTime() {
            return setInterval(this.showHTML, 1000);
        }

    }
};
</script>

<style lang="less">
@import '~@/styles/_agile';
    .Attendance{
        padding: 0 15px;
        .header{
            width:100%;
            height: 30px;
            margin: 16px 0;
            .time{
                .ic {
                    width: 10px;
                    height: 10px;
                }
                p{
                    margin: 0 8px;
                    font-size: 16px;
                    color: #222;
                }
            }
            .Statistics {
                width: 65px;
                height: 29px;
                border: 1px solid #222; /*no*/
                border-radius: 2px;
                .ic{
                    width: 13px;
                    height: 13px;
                    color: #000;
                    margin-right: 5px;
                }
            }
        }
        .main {
            padding-bottom: 20px;
            padding-left: 15px;
            border-radius: 4px;
            position: relative;
            box-shadow: 0px 4px 17px 0px rgba(75,110,150,0.18);
        .update {
            margin-top:12px;
            margin-bottom:40px;
            color:rgba(118,139,183,1);
        }
        .asm-list {
            min-height: 486px;
            padding-left: 20px;
            & > :nth-child(1),
            & > :nth-child(2) {
            position: relative;
            &::before {
                content: '';
                position: absolute;
                left: -20px;
                top: 6px;
                width: 8px;
                height: 8px;
                background-color: @dark-gray;
                border-radius: 50%;
            }
        }
        & > :nth-child(1),
        & > :nth-child(2) {
            &::after {
                content: '';
                position: absolute;
                left: -20+4px;
                top: 6px;
                bottom: 0;
                width: 1px; /*no*/
                background-color: @dark-gray;
            }
        }
        & > :nth-child(2)::after {
            top: 0;
            height: 6px;
            bottom: auto;
        }
    }
            .Late{
                color: #F76A24;
                border: 1px solid #F76A24; /*no*/
                padding: 2px 10px;
                border-radius: 2px;
                font-size: 12px;
                margin-right: 8px;
                margin-left: 8px;
            }
            .abnormal{
                color: #45B1BF;
                font-size: 12px;
                border: 1px solid #45B1BF; /*no*/
                padding: 2px 10px;
                border-radius: 2px;
                margin-right: 8px;
            }
            .ka{
                margin: 20px auto;
                text-align: center;
                .yuan{
                    width: 125px;
                    height: 125px;
                    border-radius: 50%;
                    margin: 0 auto;
                    background: @color-primary;
                    text-align: center;
                    line-height: 125px;
                }
            }
            .ban{
                padding-left: 17px;
                position: absolute;
                color: #888;
                height: 40px;
                width: 100%;
                left: 0px;
                bottom: 0px;
                border-top: 1px solid #eeeeee; /*no*/
                p {
                    margin-right:20px;
                }
            }
        }
        .Handle{
            width: 100%;
            height: 75px;
            border-radius: 4px;
            padding: 0 15px;
            margin-top: 10px;
            box-shadow:0px 4px 17px 0px rgba(75,110,150,0.11);
            list-style: none;
            p{
                font-size: 16px;
                color: #222;
                font-weight:bold;
            }
            span{
                font-size: 13px;
            }
            .ic {
                color:rgba(229,232,235,1);
            }
        }
        .share-box {
            position:fixed;
            width:100vw;
            height:100vh;
            top: 0;
            left:0;
            background: rgba(0,0,0,0.4);
            padding-top: 76px;
            .ic{
                position: absolute;
                right:17px;
            }
            .box {
                width: 300px;
                margin: 0 auto;
                border-radius: 8px;
                background: @white;
                .msg{
                    position:relative;
                    padding:15px 17px 0 20px
                }
            }
            .Reason{
                width: 100%;
                background: #f5f5f5;
                overflow: auto;
                min-height: 75px;
                padding: 10px;
            }
            .img1{
                width: 30px;
                height: 30px;
                border: 50%;
                position: absolute;
                left:-15px;
                top:-15px;
            }
            .img2{
                width: 30px;
                height: 30px;
                border: 50%;
                position: absolute;
                left:-15px;
                bottom:-15px;
            }
        }
    }
</style>
