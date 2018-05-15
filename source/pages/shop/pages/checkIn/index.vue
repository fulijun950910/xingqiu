<template>
    <div class="checkIn cell-box">
        <div class="infoBox cell">
            <div class="text-right color-white"><m-icon xlink="#icon-wendang" class="fs36"></m-icon> 签到规则</div>
            <div class="text-center">
                <div class="fs24 color-light-white">当前已有美豆豆</div>
                <div class="blance color-white">990</div>
            </div>
            <div><button :disabled="state == 2" @click="checkIn" class="checkInSubmit color-light-red">
                <div v-if="state == 1"><span>签到</span></div>
                <div v-else><m-icon xlink="#icon-yes" class="fs36"></m-icon> <sapn>已签到</sapn></div>
            </button></div>
        </div>
        <div class="checkInBox">
            <div class="cell text-center fs24 dark-gray">已连续签到3天，连续签到有更多惊喜哦</div>
            <div class="numBox">
                <div class="top" layout="row" layout-align="center center">
                    <div v-for="item in list1" :class="{'act':day>=item.day}" class="check-item fs24" layout="row" layout-align="center center">
                        <span>+{{item.num}}</span>
                        <div class="day fs20 light-gray">第{{item.day}}天</div>
                        <div v-if="day>=item.day" class="tag-act"></div>
                    </div>
                </div>
                <div class="bottom" layout="row" layout-align="center center">
                    <div v-for="item in list2" :class="{'act':day>=item.day}" class="check-item fs24" layout="row" layout-align="center center">
                        <span>+{{item.num}}</span>
                        <div class="day fs20 light-gray">第{{item.day}}天</div>
                        <div v-if="day>=item.day" class="tag-act"></div>
                        <div v-if="item.tag_present" class="tag-present"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="cell">推荐购买</div>
        <div>
            <div class="list-item cell cell-box" layout="row" layout-align="space-between center">
                <div layout="row" layout-align="start center">
                    <div class="iconBox iconBox1" layout="row" layout-align="center center">
                        <m-icon class="" xlink="#icon-duanxin"></m-icon>
                    </div>
                    <span>&nbsp;&nbsp;</span>
                    <span>购买短信包</span>
                </div>
                <div class="fs24 light-gray">
                    <span>1000美豆豆</span>
                    <span>&nbsp;&nbsp;</span>
                    <m-icon class="" xlink="#icon-right-bold"></m-icon>
                </div>
            </div>
            <div class="list-item cell cell-box" layout="row" layout-align="space-between center">
                <div layout="row" layout-align="start center">
                    <div class="iconBox iconBox2" layout="row" layout-align="center center">
                        <m-icon class="" xlink="#icon-weibiaoti2fuzhi02"></m-icon>
                    </div>
                    <span>&nbsp;&nbsp;</span>
                    <span>购买沙龙入场券</span>
                </div>
                <div class="fs24 light-gray">
                    <span>800美豆豆</span>
                    <span>&nbsp;&nbsp;</span>
                    <m-icon class="" xlink="#icon-right-bold"></m-icon>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'checkIn',
        data() {
            return {
                state: 1, // 1 未签到 2已签到
                day: 4,
                list1: [
                    {
                        day: 1,
                        num: 1
                    },
                    {
                        day: 2,
                        num: 1
                    },
                    {
                        day: 3,
                        num: 1
                    }
                ],
                list2: [
                    {
                        day: 7,
                        num: 10,
                        tag_present: true
                    },
                    {
                        day: 6,
                        num: 1
                    },
                    {
                        day: 5,
                        num: 1
                    },
                    {
                        day: 4,
                        num: 1
                    }
                ]
            };
        },
        mounted() {
        },
        methods: {
            checkIn() {
                this.state = 2;
            }
        }
    };
</script>

<style scoped lang='less'>
    @import '~styles/_style';
    @color-red-lighten: #EC3F6D;
    @color-green: #14CC8A;

    .checkIn{
        min-height:100vh;
        background: url("~assets/imgs/index/20180511110501.jpg") no-repeat top center;
        background-size: 100% auto;
    }
    .color-green{
        color:@color-green;
    }
    .color-light-white{
        color: rgba(255,255,255,0.6);
    }
    .color-light-red{
        color:@color-red-lighten;
    }
    .blance{
        font-size:30px;
    }
    .infoBox{
        height:180px;
    }
    .numBox{
        width:300px;
        height:55px;
        background: url("~assets/imgs/index/line.png") no-repeat top center;
        margin:15px auto;
        background-size: 100% auto;
        .top{
            transform: translate(0, -10px);
        }
        .bottom{
            transform: translate(0, 13px);
        }
        .check-item{
            width:26px;
            height:26px;
            border-radius:50%;
            color:@color-red-lighten;
            background: lighten(@color-red-lighten, 38%);
            margin: 0 20px;
            position:relative;
            .day{
                word-break: keep-all;
                position:absolute;
                left: 0;
                bottom: -1.6em;
            }
            .tag-act{
                width:10px;
                height:10px;
                background: url("~assets/imgs/index/20180511124501.png") no-repeat top center;
                background-size:100% 100%;
                position:absolute;
                top:-2px;
                right:-2px;
            }
            .tag-present{
                width:20px;
                height:20px;
                background: url("~assets/imgs/index/20180511141701.png") no-repeat top center;
                background-size:100% 100%;
                position:absolute;
                top:-22px;
                left: 3px;
            }
            &.act{
                background: @color-red-lighten;
                color:@white;
            }
        }
    }
    .checkInSubmit{
        width:180px;
        height:44px;
        background:@white;
        margin: @l16 auto 0;
        border-radius: 22px;
        display:block;
        &[disabled]{
            opacity:0.4;
        }
    }
    .checkInBox{
        height:150px;
        border-radius:4px;
        box-shadow: 0 2px 2px #ddd;
        background:@white;
        margin-bottom:@l16;

    }
    .list-item{
        border: 1px solid @border-gay;
        margin-bottom:@l32;
        .iconBox{
            width:32px;
            height:32px;
            border-radius: 16px;
            .icon{
                color:#fff;
                font-size:22px;
            }
            &.iconBox1{
                background: linear-gradient(-45deg, #45DCD7, #3FEAB7);
            }
            &.iconBox2{
                background: linear-gradient(-45deg, #7484F3, #CB94F4);
            }
        }
    }
</style>
