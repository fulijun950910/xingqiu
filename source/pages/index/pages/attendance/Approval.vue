<template>
    <div class="Approval" ref="Approval" v-title="'待审批'">
        <div class="header">
            <div class="h" layout="row" layout-align="space-between center">
                <span @click="selecteAll">
                    <m-icon class="fs36 m-l-4"
                        :class="{'color-primary' : isChecked}"
                        :link="isChecked ? 'icon-xuanzhong' : 'icon-weixuanzhong'"></m-icon>
                    <span class="extra-black fwb fs32 m-l-2">批量处理</span>
                </span>
                <p v-show="this.selectedRows.length==0" style="padding-right:15px;margin-top:0px">目前共有{{this.list.length}}条带审批</p>
                <p v-show="this.selectedRows.length > 0" style="padding-right:15px;margin-top:0px">已选{{this.selectedRows.length}}条</p>
            </div>
            <div v-show="selectedRows.length" style="margin-bottom:15px" layout=row>
                <div class="d1">拒绝</div>
                <div class="d1" style="margin-left:24px">同意</div>
            </div>
        </div>
        <div class="main">
            <div class="list" layout="row" layout-align="space-between start" v-for="(item,index) in list" :key="index">
                <div layout="row" layout-align="start start">
                    <div class="cp-cont-cell fs32 radio-item"
                        layout="row"
                        layout-align="end center"
                        :class="{'color-primary': item.selected}"
                        @click.stop="selectOne(item)">
                        <m-icon style="width:29px;height:29px" v-show="item.selected" link='icon-xuanzhong'></m-icon>
                        <img v-show="!item.selected" :src="require('assets/imgs/avatar.png')" alt="" class="">
                    </div>
                    <div class="m-l-3 hang" @click="isShow=true">
                        <p class="fs14">{{item.name}}</p>
                        <p>{{item.state}}</p>
                        <p class="w22 hang extra-light-black m-t-4" style="font-size:13px">{{item.desc}}</p>
                    </div>
                </div>
                <div class="fs24 extra-light-black" style="white-space:nowrap;">{{item.time}}</div>
            </div>
            <div class="share-box" v-show="isShow" @click="isShow = false">
                <div class="box" @click.stop="">
                    <div class="msg">
                        <m-icon class="ic color-gray" link="icon-close" @click.native="isShow = false" ></m-icon>
                        <div layout=row layout-align="start start">
                            <img class="img1 m-r-2" :src="require('assets/imgs/avatar.png')" alt="">
                            <div>
                                <p class="fwb fs32">冯子轩</p>
                                <p style="font-size:13px;font-weight:500;">店长</p>
                            </div>
                        </div>
                        <div class="m-t-4 d1">
                            <div layout=row layout-align="start center"><span class="s1"></span><p>考勤时间:2018.12.14 9:40</p></div>
                            <div layout=row layout-align="start center"><span class="s1"></span><p>状态:迟到十分钟</p></div>
                            <div layout=row layout-align="start center"><span class="s1"></span><p>事由:早上起晚了</p></div>
                        </div>
                    </div>
                    <div class="Imsg">
                        <div class="m-t-4 d1">
                            <div>
                                <img class="img2" :src="require('assets/imgs/avatar.png')" alt="">
                                <div style="position:absolute;top:-10px">
                                    <p class="fwb">我发起请求</p>
                                    <p>2018.12.12 9:45</p>
                                </div>
                            </div>
                            <div>
                                <img class="img3" :src="require('assets/imgs/avatar.png')" alt="">
                                <div style="position:absolute;top:70px">
                                    <span>潘金莲</span>&nbsp;&nbsp;<span style="color:#A43A8E" class="fwb">审批中</span>
                                    <p>已耗时 4小时</p>
                                    <input type="text" placeholder="对冯子轩说点什么吧">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bottom" layout="row">
                        <div class="fs40 fwb d1" flex=50>拒绝</div>
                        <div class="fs40 fwb d2" flex=50>同意</div>
                    </div>
                </div>
            </div>
            <div class="message">
                <p class="down">以下为已审批内容,只展示一周内审批信息，更多信息请用电脑查看</p>
            </div>
            <div class="list" layout="row" layout-align="space-between start">
                <div layout="row" layout-align="start start">
                    <img :src="require('assets/imgs/avatar.png')" alt="">
                    <div class="m-l-3 hang">
                        <p class="fs14">冯子轩</p>
                        <p>09/22缺卡</p>
                        <p class="w22 hang extra-light-black m-t-4">早上起床晚了早上起床晚了早上上起床晚了早上</p>
                    </div>
                </div>
                <div layout="column" layout-align="center end">
                    <p class="fs24 extra-light-black" style="white-space:nowrap;">2018.12.12</p>
                    <p class="p2 fwb">审批完成</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { Cell, Checklist } from 'mint-ui';
import checkBox from 'components/check-radio';
Vue.component(Checklist.name, Checklist);
Vue.component(Cell.name, Cell);
Vue.component('check-box', checkBox);

export default {
    name: 'Approval',
    data() {
        return {
            list: [
                {
                    name: '123', state: '缺卡', time: '2018.12.22', desc: '早上起来洗了个头上了个厕所又洗洗脸刷刷牙所以来迟了'
                },
                {
                    name: '123', state: '缺卡', time: '2018.12.22', desc: '地铁地铁地铁地铁地铁地铁地铁地铁'
                },
                {
                    name: '123', state: '缺卡', time: '2018.12.22', desc: '星球大战爆发我去拯救银河系'
                }
            ],
            isShow: false
        };
    },
    mounted() {
    },
    methods: {
        selecteAll() {
            let selected = this.isChecked;
            this.list.forEach(val => {
                this.$set(val, 'selected', !selected);
            });
            if (this.selectedRows.length) {
                this.$refs.Approval.style.paddingTop = 110 + 'px';
            } else {
                this.$refs.Approval.style.paddingTop = 60 + 'px';
            }
        },
        selectOne(item) {
            if (item) {
                this.$set(item, 'selected', !item.selected);
            }
            console.log(this.selectedRows);
            if (this.selectedRows.length) {
                this.$refs.Approval.style.paddingTop = 110 + 'px';
            } else {
                this.$refs.Approval.style.paddingTop = 60 + 'px';
            }
        }
    },
    computed: {
        selectedRows() {
            return this.list.filter(val => val.selected);
        },
        isChecked() {
            return (
                this.selectedRows.length &&
                this.selectedRows.length === this.list.length
            );
        }
    },
    watch: {
    }
};
</script>

<style lang="less">
@import '~@/styles/_agile';
.Approval{
    .radio-item{
        color:@color-primary;
    }
    .hang {
        white-space:nowrap;
        text-overflow:ellipsis;
        overflow:hidden;
    }
    .fs14{
        font-size: 14px;
    }
    .w22{
        width: 220px;
    }
    min-width: 100vw;
    min-height: 100vh;
    background: #F5F5F5;
    padding-top: 60px;
    .header{
        background: @white;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        box-shadow:0px 3px 8px 0px rgba(49,77,83,0.28);
        min-height: 49px;
        .h{
            width: 100%;
            height: 49px;
        }
        .d1{
            margin-left: 35px;
            width: 75px;
            height: 34px;
            border-radius: 17px;
            box-shadow:0px 4px 17px 0px rgba(75,110,150,0.11);
            line-height: 34px;
            text-align: center;
            background: @white;
        }
    }
    .main{
        width:95%;
        margin: 0 auto;
        overflow: hidden;
        border-radius: 4px;
        .list{
            .p2{
                margin-top: 35px;
                font-size: 14px;
                color:#1CBB68;
            }
            background: @white;
            margin-bottom: 8px;
            padding: 12px 12px 12px 16px;
            img{
                width: 29px;
                height: 29px;
                border-radius: 50%;
            }
        }
        .share-box{
            position:fixed;
            width:100vw;
            height:100vh;
            top: 0;
            left:0;
            background: rgba(0,0,0,0.4);
            padding-top: 76px;
            .box {
                width: 300px;
                margin: 0 auto;
                border-radius: 8px;
                background: @white;
                .msg{
                    position:relative;
                    padding:15px 17px 0 20px;
                    .d1{
                        background:rgba(245,245,245,1);
                        line-height:26px;
                        padding:8px;
                    }
                }
                .Imsg {
                    padding:10px 40px 100px 40px;
                    margin-top:40px;
                    .d1{
                        border-left:1px solid #ccc; /*no*/
                        padding:0 30px;
                        position:relative;
                        height:80px
                    }
                }
                .ic{
                    position: absolute;
                    right:17px;
                }
                .img1{
                    width: 39px;
                    height: 39px;
                    border-radius: 50%;
                }
                .s1{
                    width: 5px;
                    height: 5px;
                    background:rgba(204,204,204,1);
                    margin-right: 8px;
                }
                .img2{
                    width: 30px;
                    height: 30px;
                    border: 50%;
                    position: absolute;
                    left:-15px;
                    top:-15px;
                }
                .img3{
                    width: 30px;
                    height: 30px;
                    border: 50%;
                    position: absolute;
                    left:-15px;
                    bottom:-15px;
                }
                input{
                    padding: 12px;
                    width: 210px;
                    background:rgba(245,245,245,1);
                    border-radius: 4px;
                }
                .bottom{
                    height: 50px;
                    line-height: 50px;
                    border-top: 1px solid #cccccc; /*no*/
                    margin-top: 42px;
                    .d1 {
                        text-align:center;
                        border-right:1px solid #ccc; /*no*/
                    }
                    .d2 {
                        color:#A43A8E;
                        text-align:center
                    }
                }
            }

        }
        .message{
            width: 100%;
            margin-top:29px;
            margin-bottom: 12px;
        }
        .down{
            width:240px;
            text-align: center;
            margin: 0 auto;
            font-size: 12px;
            color:#aaa;
        }
    }
}
</style>
