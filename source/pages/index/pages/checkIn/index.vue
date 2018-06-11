<template>
    <div class="checkIn cell-box">
        <!-- <div class="infoBox cell">
            <div class="text-right color-white" @click="showRule"><m-icon xlink="#icon-wendang" class="fs36"></m-icon> 签到规则</div>
            <div class="text-center">
                <div class="fs24 color-light-white">当前已有美豆豆</div>
                <div class="blance color-white">{{blanceTotal.doudouBalance}}</div>
            </div>
        </div> -->
        <div class="checkInBox">
            <div >
                <div flex layout="row" layout-align="end center"><div @click="showRule"><m-icon class="fs36 color-gray" xlink="#icon-xiangqing"></m-icon></div></div>
                <div class="goal-champion" layout="row" layout-align="center center">
                <img :src="require('assets/imgs/goal-champion.png')" alt="">
                </div>
                <div flex layout="row" layout-align="center center" class="color-yellow-orange text-center">已连续签到{{lastDay.continueDays}}天，连续签到有更多惊喜哦</div>
            </div>
            <!-- <div class="cell text-center fs24 color-yellow-orange">已连续签到{{lastDay.continueDays}}天，连续签到有更多惊喜哦</div> -->
            <div class="numBox">
                <div class="top" layout="row" layout-align="center center">
                    <div v-for="item in list1" :key="item" :class="{'act':lastDay.continueDays>=item.day}" class="check-item fs24" layout="row" layout-align="center center">
                        <span>+{{item.num}}</span>
                        <div class="day fs20 extra-light-black">第{{item.day}}天</div>
                        <div v-if="lastDay.continueDays>=item.day" class="tag-act"></div>
                    </div>
                </div>
                <div class="bottom" layout="row" layout-align="center center">
                    <div v-for="item in list2" :key="item" :class="{'act':lastDay.continueDays>=item.day}" class="check-item fs24" layout="row" layout-align="center center">
                        <span>+{{item.num}}</span>
                        <div class="day fs20 extra-light-black">第{{item.day}}天</div>
                        <div v-if="lastDay.continueDays>=item.day" class="tag-act"></div>
                        <div v-if="item.tag_present" class="tag-present"></div>
                    </div>
                </div>
            </div>
        </div>
                    <div class="sign-in-circle" layout="row" layout-align="center center"><button :disabled="state == 2" @click="submit" class="checkInSubmit color-light-red">
                <div v-if="state == 1" class="color-white fs46"><span>签到</span></div>
                <div v-else class="color-white fs46"><m-icon xlink="#icon-yes" class="fs36 color-white"></m-icon> <span>已签到</span></div>
            </button></div>
            <div layout="row" layout-align="center center" class="to-more">
                <a @click="toMorePlay">更多玩法</a>
            </div>
        <!-- <recommendBuy></recommendBuy> -->
        <mt-popup v-model="showPopup" position="right" class="popup-pay">
            <div @click="showPopup=false" class="popup-pay-box">
                <h4>连续签到，获得更多奖励！</h4>
                <ul>
                    <li>1.签到每天可获得1美豆豆，连续签到7天可获得16美豆豆，7天为一个周期。</li>
                    <li>2.如签到中途中断，则连续签到天数重新计算。</li>
                    <li>3.最终解释权归美问所有。</li>
                </ul>
            </div>
        </mt-popup>
    </div>
</template>

<script>
    import Vue from 'vue';
    import api_party from 'services/api.party';
    import recommendBuy from '../../models/recommend-buy';
    import { Popup } from 'mint-ui';
    Vue.component(Popup.name, Popup);

    export default {
        name: 'checkIn',
        data() {
            return {
                showPopup: false,
                blanceTotal: 0,
                state: 1, // 1 未签到 2已签到
                lastDay: {continueDays: 0},
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
        components: {
            recommendBuy
        },
        mounted() {
            this.loadData();
        },
        methods: {
            loadData() {
                this.$indicator.open();
                api_party.listLastUserSign(this.$store.state.party.partyId).then(res => {
                    this.$indicator.close();
                    if (res.data && res.data.length > 0) {
                        res.data.forEach((item, index) => {
                            if (index < 3) {
                                this.list1[index].num = item.rewardDouDouAmount;
                            } else {
                                this.list2[6 - index].num = item.rewardDouDouAmount;
                            }
                        });
                        this.lastDay = res.data[res.data.length - 1];
                        if (this.lastDay.todayDate === this.lastDay.signDate) {
                            this.state = 2;
                        }
                    }
                });
                api_party.getAccount(this.$store.state.party.partyId).then(res => {
                    this.blanceTotal = res.data;
                });
            },
            submit() {
                this.$indicator.open();
                api_party.userSign(this.$store.state.party.partyId, this.$store.state.party.id).then(res => {
                    this.$indicator.close();
                    this.loadData();
                });
            },
            showRule() {
                this.showPopup = true;
            },
            toMorePlay() {
                location.href = `${this.$rootPath}integral-mall.html#/rule-entry`;
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
        // background: url("~assets/imgs/index/20180511110501.jpg") no-repeat top center;
        background-size: 100% auto;
    }
    .sign-in-circle{
        width: 150px;
        height: 150px;
        background:linear-gradient(-143deg,rgba(255,55,108,1),rgba(255,58,232,1),rgba(231,101,255,1));
        border-radius: 100%;
        margin: 50px auto 0 auto;
        button{
            background: transparent;
        }
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
    .color-white{
        color:@white;
    }
    .blance{
        font-size:30px;
    }
    .infoBox{
        height:180px;
    }
    .to-more{
        padding: 10px 0;
        a{
            color: #4A90E2;
        }
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
        height:300px;
        border-radius:4px;
     box-shadow:0px 2px 29px 0px rgba(0,0,0,0.1);
        background:@white;
        margin-bottom:@l16;
        margin-top: 15px;
        padding: 15px;

    }
    .popup-pay{
        height: 100%;
        width: 90%;
        .popup-pay-box{
            width: 95%;
            margin: auto;
        }
    }
    .goal-champion{
        padding: 10px 0;
        img{
        height: 90px;
        width: auto;
        }
    }
</style>
