<template>
    <div v-title="'美豆豆'">
        <div class="plain1"><img :src="require('assets/imgs/integral-mall/2018060509.jpg')" alt=""></div>
        <div class="plain2 cell cell-box">
            <div class="listBox">
                <div class="boxTitle fs40" layout="row" layout-align="center center">美豆豆，赚不停</div>
                <div class="boxContent list1" layout="row" layout-align="space-around start">
                    <div class="m-t-4 m-b-4 text-center">
                        <div><img :src="require('assets/imgs/integral-mall/2018060505.png')" alt=""></div>
                        <div class="fs32 fwb">每日签到</div>
                        <div class="color-gray fs22 m-t-2">
                            <div>每日签到=1个</div>
                            <div>连续7天=10个</div>
                        </div>
                    </div>
                    <div class="m-t-4 m-b-4 text-center">
                        <div><img :src="require('assets/imgs/integral-mall/2018060507.png')" alt=""></div>
                        <div class="fs32 fwb">推荐商户</div>
                        <div class="color-gray fs22 m-t-2">
                            <div>介绍1个商户</div>
                            <div>=100个</div>
                        </div>
                    </div>
                    <div class="m-t-4 m-b-4 text-center">
                        <div><img :src="require('assets/imgs/integral-mall/2018060502.png')" alt=""></div>
                        <div class="fs32 fwb">充值获取</div>
                        <div class="color-gray fs22 m-t-2">
                            <div>充值即可获得</div>
                            <div>更多美豆豆</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="listBox m-t-4">
                <div class="boxTitle fs40" layout="row" layout-align="center center">美豆豆，花不停</div>
                <div class="boxContent list2" layout="row" flex-wrap="wrap">
                    <div class="p-t-4 p-b-4 text-center border-bottom border-right" flex="50" @click="linkTo(1)">
                        <div><img :src="require('assets/imgs/integral-mall/2018060503.png')" alt=""></div>
                        <div class="fs32 fwb">兑换短信包</div>
                    </div>
                    <div class="p-t-4 p-b-4 text-center border-bottom" flex="50" @click="linkTo(2)">
                        <div><img :src="require('assets/imgs/integral-mall/2017060501.png')" alt=""></div>
                        <div class="fs32 fwb">超级助手</div>
                    </div>
                    <div class="p-t-4 p-b-4 text-center border-right" flex="50" @click="linkTo(3)">
                        <div><img :src="require('assets/imgs/integral-mall/2018060504.png')" alt=""></div>
                        <div class="fs32 fwb">兑换福利</div>
                    </div>
                    <div class="p-t-4 p-b-4 text-center" flex="50" @click="linkTo(4)">
                        <div><img :src="require('assets/imgs/integral-mall/2018060506.png')" alt=""></div>
                        <div class="fs32 fwb">沙龙入场券</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="plain3 p-b-5">
            <div class="p-t-5 p-b-5 text-center">
                <div class="color-self-main fs40">• <span class="">玩转攻略</span> •</div>
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
                    <div @click="goRule(item)" v-for="item in dataList" class="cell border-bottom" layout="row" layout-align="start center">
                        <div flex>
                            <div><span v-html="item.missionName"></span><spna v-if="item.conditionValue && item.value">（{{item.value}}/{{Math.floor(item.conditionValue) || 0}}）</spna></div>
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
</template>

<script>
    import api_party from 'services/api.party';

    export default {
        name: 'index',
        data() {
            return {
                dataList: []
            };
        },
        mounted() {
            this.loadData();
        },
        methods: {
            loadData() {
                this.$indicator.open();
                api_party.getMissionList(this.$store.state.party.partyId).then(res => {
                    this.$indicator.close();
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
                window.location.href = this.$rootPath + 'index.html#/recharge';
            },
            linkTo(type) {
                switch (Number(type)) {
                    case 1:
                        this.$router.push('/recharge-message');
                        break;
                    case 2:
                        this.$router.push('/activity-list');
                        break;
                    case 3:
                        this.$router.push('/product-list');
                        break;
                    case 4:
                        this.$router.push('/voucher-list');
                        break;
                }
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
        background: #FFFAF0;
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
                width:80px;
                display:block;
                margin:0 auto;
            }
        }
    }
</style>
