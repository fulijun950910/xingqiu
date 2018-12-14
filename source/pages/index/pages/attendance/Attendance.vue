<template>
    <div class="Attendance" v-title="'考勤打卡'">
        <div class="header" layout="row" layout-align="space-between center">
            <div class="time" layout="row" layout-align="center center" >
                <m-icon class="ic" xlink="#icon-left-bold"></m-icon>
                <p>{{time}}</p>
                <m-icon class="ic" xlink="#icon-right-bold"></m-icon>
            </div>
            <div class="Statistics" layout="row" layout-align="center center" >
                <m-icon class="ic" xlink="#icon-dianzan"></m-icon>
                <p>统计</p>
            </div>
        </div>
        <div class="main">
            <p style="padding-top:20px;font-size:13px;line-height:19px">今天继续朝着梦想出发吧~</p>
            <div class="info">
                <span class="yuan1"></span>
                <p style="font-size:13px;color:#aaa;position:absolute;top:-8px">上班时间09:00</p>
                <div class="success" layout="column" layout-align="start start">
                    <div layout="row" layout-align="start center" style="margin-top:14px">
                        <h3 style="margin-right:8px">打卡时间9:00</h3>
                        <p style="margin-right:8px" class="Late">迟到</p>
                        <!-- <p style="margin-right:8px" class="abnormal">异常定位</p> -->
                    </div>
                    <div style="margin-top:12px">
                        <m-icon class="ic" xlink="#icon-4" style="margin-right:4px"></m-icon>
                        <span style="font-size:13px;color:rgba(170,170,170,1);">通协路268号</span>
                    </div>
                    <p style="margin-top:12px;margin-bottom:40px;color:rgba(118,139,183,1);">更新打卡</p>
                </div>
                <!-- <div class="ka">
                    <div class="yuan">
                        <span style="color:#fff;font-size:20px;font-weight:bold;">定位中</span>
                    </div>
                    <div style="margin-top:20px;font-size:12px">
                        <m-icon style="margin-right:4px" class="ic" xlink="#icon-gengduoicon"></m-icon>
                        <span>还未获取到地址位置</span>
                        <span style="margin-left:5px;color:#768BB7">点击重试</span>
                    </div>
                </div> -->
                <p style="font-size:13px;color:#aaa;position:absolute;bottom:-8px">下班时间18:00</p>
                <span class="yuan2"></span>
            </div>
            <div class="ka">
                <div class="yuan">
                    <span style="color:#fff;font-size:20px;font-weight:bold;">定位中</span>
                </div>
                <div style="margin-top:20px;font-size:12px">
                    <m-icon style="margin-right:4px" class="ic" xlink="#icon-gengduoicon"></m-icon>
                    <span>还未获取到地址位置</span>
                    <span style="margin-left:5px;color:#768BB7" @click="confirm2">点击重试</span>
                </div>
            </div>
            <div class="ban" layout="row" layout-align="start center" @click="confirm">
                <p>A班&nbsp;9:00-18:00</p>
                <p>B班&nbsp;9:00-18:00</p>
                <m-icon class="ic" xlink="#icon-pop-left"></m-icon>
            </div>
            <div class="share-box" v-if="isShowShare" @click.stop="isShowShare = false ">
                <div class="box" style="z-index:999">
                    <div style="position:relative;padding:15px 17px 0 20px">
                        <m-icon class="ic color-gray" xlink="#icon-close" @click.stop="isShowShare = false" ></m-icon>
                        <div style="line-height:30px">
                            <p class="fs30 fwb">发送申请给潘金莲</p>
                            <p style="color:#888" class="fs16">考勤时间:2018.12.14 9:32</p>
                            <p style="color:#888" class="fs16">状态：迟到2分钟</p>
                        </div>
                        <p class="fwb fs24" style="margin-top:44px;margin-bottom:8px">申请事由</p>
                    </div>
                    <div style="width:100%;height187px;background:rgba(245,245,245,1);padding:20px;position:relative">
                        <textarea ref="text" autofocus style="height:187px;background:rgba(245,245,245,1);font-size:16px" @click.stop="conso" @input.stop="alert" cols="30" rows="10" maxlength="300"></textarea>
                        <div style="position:absolute;right:20px;bottom:20px">
                            <span style="color:#781A75">{{this.length}}</span>
                            <span> / 300</span>
                        </div>
                    </div>
                    <div style="height:49px;line-height:49px;text-align:center;color:#781A75" class="fwb">提交申请</div>
                </div>
            </div>
            <div class="share-box" v-if="isShowShare2" @click.stop="isShowShare2 = false ">
                <div class="box" style="z-index:999">
                    <div style="position:relative;padding:15px 17px 0 20px">
                        <m-icon class="ic color-gray" xlink="#icon-close" @click.stop="isShowShare2 = false" ></m-icon>
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
            <router-link tag="li" to="/newMember" layout="row" layout-align="space-between center" style="width:100%;">
                <div>
                    <p>待处理</p>
                    <span>您有<span style="color:red;margin:0 4px">14</span>条待审批申请</span>
                </div>
                <div><m-icon class="ic" xlink="#icon-pop-left"></m-icon></div>
            </router-link>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { Cell } from 'mint-ui';
Vue.component(Cell.name, Cell);

export default {
    name: 'Attendance',
    components: {
    },
    data() {
        return {
            time: this.$moment().startOf('day').format('YYYY.MM.DD'),
            isShowShare: false,
            isShowShare2: false,
            length: 0
        };
    },
    mounted() {
    },
    methods: {
        confirm() {
            this.isShowShare = true;
        },
        confirm2() {
            this.isShowShare2 = true;
        },
        alert() {
            this.length = this.$refs.text.value.length;
        },
        conso() {
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
            padding-left: 15px;
            border-radius: 4px;
            position: relative;
            height: 486px;
            box-shadow: 0px 4px 17px 0px rgba(75,110,150,0.18);
            .info{
                border-left: 1px solid #ccc; /*no*/
                margin-top: 28px;
                position: relative;
                padding-left: 10px;
                margin-left: 5px;
                .Late{
                    color: #F76A24;
                    border: 1px solid #F76A24; /*no*/
                    padding: 2px 10px;
                    border-radius: 2px;
                    font-size: 12px;
                }
                .abnormal{
                    color: #45B1BF;
                    font-size: 12px;
                    border: 1px solid #45B1BF; /*no*/
                    padding: 2px 10px;
                    border-radius: 2px;
                }
                .yuan1{
                    position: absolute;
                    border-radius: 50%;
                    width: 8px;
                    height: 8px;
                    background: #ccc;
                    left: -4px;
                    top: -4px;
                }
                .yuan2{
                    position: absolute;
                    border-radius: 50%;
                    width: 8px;
                    height: 8px;
                    background: #ccc;
                    left: -4px;
                    bottom: -4px;
                }
                .ka{
                    margin: 20px auto;
                    text-align: center;
                    .yuan{
                        width: 125px;
                        height: 125px;
                        border-radius: 50%;
                        margin: 0 auto;
                        background:linear-gradient(270deg,rgba(193,59,147,1) 0%,rgba(140,27,127,0) 75%);
                        text-align: center;
                        line-height: 125px;
                    }
                }
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
                left: 0;
                bottom: 0;
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
