<template>
    <div class="Attendance" v-title="'考勤打卡'">
        <div class="header" layout="row" layout-align="space-between center">
            <div class="time" layout="row" layout-align="center center" >
                <m-icon class="ic" xlink="icon-left-bold"></m-icon>
                <p>{{time}}</p>
                <m-icon class="ic" xlink="icon-right-bold"></m-icon>
            </div>
            <div class="Statistics" layout="row" layout-align="center center" >
                <m-icon class="ic" xlink="icon-dianzan"></m-icon>
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
                        <m-icon class="ic" xlink="icon-4" style="margin-right:4px"></m-icon>
                        <span style="font-size:13px;color:rgba(170,170,170,1);">通协路268号</span>
                    </div>
                    <p style="margin-top:12px;margin-bottom:40px;color:rgba(118,139,183,1);">更新打卡</p>
                </div>
                <!-- <div class="ka">
                    <div class="yuan">
                        <span style="color:#fff;font-size:20px;font-weight:bold;">定位中</span>
                    </div>
                    <div style="margin-top:20px;font-size:12px">
                        <m-icon style="margin-right:4px" class="ic" xlink="icon-gengduoicon"></m-icon>
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
                    <m-icon style="margin-right:4px" class="ic" xlink="icon-gengduoicon"></m-icon>
                    <span>还未获取到地址位置</span>
                    <span style="margin-left:5px;color:#768BB7">点击重试</span>
                </div>
            </div>
            <div class="ban" layout="row" layout-align="start center" @click="confirm">
                <p>A班&nbsp;9:00-18:00</p>
                <p>B班&nbsp;9:00-18:00</p>
                <m-icon class="ic" xlink="icon-pop-left"></m-icon>
            </div>
            <div class="share-box" v-if="isShowShare" @click="isShowShare = false ">
                <div class="box">

                </div>
            </div>
        </div>
        <div class="Handle" layout="row" layout-align="start center">
            <router-link tag="li" to="/newMember" layout="row" layout-align="space-between center" style="width:100%;">
                <div>
                    <p>待处理</p>
                    <span>您有<span style="color:red;margin:0 4px">14</span>条待审批申请</span>
                </div>
                <div><m-icon class="ic" xlink="icon-pop-left"></m-icon></div>
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
            isShowShare: false
        };
    },
    mounted() {
    },
    methods: {
        confirm() {
            this.isShowShare = true;
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
            background: rgba(0,0,0,0.8);
            .box {
                width: 300px;
                margin: 0 auto;
            }
        }
    }
</style>
