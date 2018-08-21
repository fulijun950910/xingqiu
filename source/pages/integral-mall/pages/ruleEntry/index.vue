<template>
    <div v-title="'美豆豆'">
        <div class="plain1"><img :src="require('assets/imgs/integral-mall/2018060509.jpg')" alt=""></div>
        <div class="plain2 cell-box-this">
            <div class="listBox m-b-4">
                <div class="fwb fs40 p-t-4 p-b-4 border-bottom" layout="row" layout-align="start center">美豆豆，赚不停</div>
                <div class="boxContent list1" layout="row" layout-align="space-around start">
                    <div class="m-t-4 m-b-4 text-center" @click="linkTo(5)">
                        <div><img :src="require('assets/imgs/integral-mall/2018060505.png')" alt=""></div>
                        <div class="fs32">每日签到</div>
                        <div class="color-gray fs22 m-t-2">
                            <div>每日签到=1个</div>
                            <div>连续7天=16个</div>
                        </div>
                    </div>
                    <div class="m-t-4 m-b-4 text-center" @click="linkTo(8)"> 
                        <div class="img-right"><img :src="require('assets/imgs/integral-mall/2018060507.png')" alt=""></div>
                        <div class="fs32">推荐商户</div>
                        <div class="color-gray fs22 m-t-2">
                            <div>介绍1个商户</div>
                            <div>=2000个</div>
                        </div>
                    </div>
                    <div class="m-t-4 m-b-4 text-center" @click="linkTo(7)">
                        <div><img :src="require('assets/imgs/integral-mall/2018060502.png')" alt=""></div>
                        <div class="fs32">充值获取</div>
                        <div class="color-gray fs22 m-t-2">
                            <div>充值即可获得</div>
                            <div>更多美豆豆</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="listBox m-b-4">
                <div class="fs40 fwb p-t-4 p-b-4 border-bottom" layout="row" layout-align="start center">美豆豆，花不停</div>
                <div class="boxContent list2 border-bottom" layout="row" flex-wrap="wrap" layout-align="space-between center">
                    <div class="p-t-4 p-b-4 text-center" flex="30" @click="linkTo(1)">
                        <div><img :src="require('assets/imgs/integral-mall/2018060503.png')" alt=""></div>
                        <div class="fs32">兑换短信包</div>
                    </div>
                    <div class="p-t-4 p-b-4 text-center" flex="30" @click="linkTo(2)">
                        <div><img :src="require('assets/imgs/integral-mall/2017060501.png')" alt=""></div>
                        <div class="fs32">超级助手</div>
                    </div>
                    <div class="p-t-4 p-b-4 text-center" flex="30" @click="linkTo(3)">
                        <div><img :src="require('assets/imgs/integral-mall/2018060504.png')" alt=""></div>
                        <div class="fs32">兑换福利</div>
                    </div>
                </div>
                <div class="boxContent list2" layout="row" flex-wrap="wrap" layout-align="space-between center">
                    <div class="p-t-4 p-b-4 text-center" flex="30" @click="linkTo(4)">
                        <div><img :src="require('assets/imgs/integral-mall/2018060506.png')" alt=""></div>
                        <div class="fs32">沙龙入场券</div>
                    </div>
                    <div class="p-t-4 p-b-4 text-center" flex="30" @click="linkTo(9)">
                        <div><img :src="require('assets/imgs/integral-mall/2018060508.png')" alt=""></div>
                        <div class="fs32">大转盘</div>
                    </div>
                    <div class="p-t-4 p-b-4 text-center" flex="30" @click="linkTo(10)">
                        <div><img :src="require('assets/imgs/integral-mall/2018060509.png')" alt=""></div>
                        <div class="fs32">应用市场</div>
                    </div>
                </div>
            </div>
                    <div class="plain3 p-b-5">
            <div class="p-t-4 p-b-4 border-bottom">
                <div class=" fs40 fwb"><span class="">玩转攻略</span></div>
                <div class="fs22 color-gray">只要完成以下任务，即可获得美豆豆哟！</div>
            </div>
            <div class="p-l-2 p-r-2 m-b-5">
                <div @click="goRecharge" class="cell border-bottom" layout="row" >
                    <div flex>
                        <div>充值获取</div>
                        <div class="fs22 color-gray"></div>
                    </div>
                    <div class="fs24 color-green">
                        <span>去充值</span>
                        <m-icon class="" xlink="#icon-zuojiantou"></m-icon>
                    </div>
                </div>
                <div>
                    <div @click="goRule(item)" v-for="item in dataList" class="cell border-bottom" layout="row" layout-align="start center" :key="item.id">
                        <div flex>
                            <div><span v-html="item.missionName"></span><span v-if="item.conditionValue && item.value">（{{item.value}}/{{Math.floor(item.conditionValue) || 0}}）</span></div>
                            <div class="fs22 color-gray" v-html="item.missionDesc"></div>
                        </div>
                        <div flex="20" class="text-right">
                            <div v-if="item.completed" class="">
                                <m-icon class="fs40 color-self-main m-r-2" xlink="#icon-gouicon1"></m-icon>
                            </div>
                            <div v-else-if="item.missionCode == 'SIGN' || item.missionCode == 'RELEASE_PROMOTION'" class="fs24 color-green">
                                <span>去完成</span>
                                <m-icon class="" xlink="#icon-zuojiantou"></m-icon>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>

    </div>
</template>

<script>
    import api_party from 'services/api.party';
    import apiGetJSSignature from 'services/api.getJSSignature';

    export default {
        name: 'index',
        data() {
            return {
                dataList: []
            };
        },
        mounted() {
            this.loadData();
            this.js_sdk();
        },
        methods: {
            loadData() {
                this.$indicator.open();
                api_party.getMissionList(this.$store.state.party.partyId).then(res => {
                    this.$indicator.close();
                    console.log(res.data);
                    this.dataList = res.data;
                });
            },
            goRule(item) {
                if (item.missionCode == 'SIGN') {
                    this.goCheckIn();
                } else if (item.missionCode == 'RELEASE_PROMOTION') {
                    this.goPromotion();
                }
            },
            goCheckIn() {
                window.location.href = this.$rootPath + 'index.html#/checkIn';
            },
            goPromotion() {
                window.location.href = '/lite/index.html#/promotion-list';
            },
            goRecharge() {
                this.$router.push('/recharge-doudou');
                // window.location.href = this.$rootPath + 'index.html#/recharge';
            },
            checkParty() {
                if (this.$store.getters.isPersonLogin) {
                    this.$toast('抱歉，个人用户，无权限进入');
                    return true;
                }
            },
            linkTo(type) {
                switch (Number(type)) {
                    case 1:
                        if (this.checkParty()) {
                            return;
                        }
                        this.$router.push('/recharge-message');
                        break;
                    case 2:
                        if (this.checkParty()) {
                            return;
                        }
                        this.$router.push('/activity-list/5');
                        break;
                    case 3:
                        this.$router.push('/product-list');
                        break;
                    case 4:
                        this.$router.push('/voucher-list');
                        break;
                    case 5:
                        location.href = `${this.$rootPath}index.html#/checkIn`;
                        break;
                    case 6:
                        // this.$router.push('/voucher-list');
                        break;
                    case 7:
                        this.$router.push('/recharge-doudou');
                        break;
                    case 8:
                        this.$router.push('/supplier-form');
                        break;
                    case 9:
                        this.$router.push('/big-wheel');
                        break;
                    case 10:
                        this.$router.push('/activity-list/9');
                        break;
                }
            },
            async js_sdk() {
                let share = {
                    title: '美豆豆',
                    desc: '美豆豆，赚不停',
                    link: window.location.href,
                    imgUrl: window.location.origin + '/service/static/2018060509.jpg',
                    type: 'link',
                    dataUrl: '',
                    success: function() {
                    },
                    cancel: null
                };
                apiGetJSSignature.shareAppMessage(share);
            }
        }
    };
</script>

<style scoped lang='less'>
    @import '~styles/_style';

    @color-gold: #F8CDB8;
    @color-self-main: #EC3F6D;
    .color-green{
        color:#14CC8A;
    }
    .color-self-main{
        color: @color-self-main;
    }
    .plain1{
        img{
            display: block;
        }
    }
    .plain2{
        background: #FAF9F8;
    }
    .plain3{
        background: white;
        padding: 0 15px;
    }
    .border-bottom{
        border-bottom:1px solid @border-gay;
    }
    .border-right{
        border-right:1px solid @border-gay;
    }
    .boxTitle{
        background: url("~assets/imgs/integral-mall/2018060601.png") no-repeat top center;
        background-size:100% 100%;
        border-radius: 8px;
        height:60px;
        color: @color-gold;
    }
    .boxContent{
        border-radius: 8px;
        background: @white;
        &.list1, &.list2{
            img{
                width:60px;
                display:block;
                margin:0 auto;
            }
        }
    }
    .img-right{
        position: relative;
        img{
            position: relative;
            right: -7px!important;
        }
    }
    .listBox{
        background: white;
        padding: 0 15px;
    }
    .cell-box-this{
    }
</style>
