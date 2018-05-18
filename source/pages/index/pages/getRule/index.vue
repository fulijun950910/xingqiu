<template>
    <div class="getRule" v-title="'获取美豆豆'">
        <div @click="goRecharge" class="list-item success cell cell-box" layout="row" layout-align="space-between center">
            <div layout="row" layout-align="start center">
                <div class="iconBox" layout="row" layout-align="center center">
                    <img :src="require('assets/imgs/index/20180510170301.jpg')" alt="">
                </div>
                <span>&nbsp;&nbsp;</span>
                <div>
                    <div>充值获取</div>
                </div>
            </div>
            <div class="fs24 color-green">
                <span>去充值</span>
                <m-icon class="" xlink="#icon-right-bold"></m-icon>
            </div>
        </div>
        <div v-for="item in dataList">
            <div v-if="item.missionCode == 'FIRST_LOGIN'" class="list-item error cell cell-box" layout="row" layout-align="space-between center">
                <div flex layout="row" layout-align="start start">
                    <div class="iconBox iconBox2" layout="row" layout-align="center center">
                        <m-icon class="" xlink="#icon-qianyue"></m-icon>
                    </div>
                    <span>&nbsp;&nbsp;</span>
                    <div flex>
                        <div v-html="item.missionName"></div>
                        <div class="fs24 dark-gray" v-html="item.missionDesc"></div>
                    </div>
                </div>
                <div v-if="item.completed" class="light-gray">
                    已获得
                </div>
            </div>
            <div v-else-if="item.missionCode == 'YIYE'" class="list-item error cell cell-box" layout="row" layout-align="space-between center">
                <div flex layout="row" layout-align="start start">
                    <div class="iconBox iconBox3" layout="row" layout-align="center center">
                        <m-icon class="" xlink="#icon-hezuo"></m-icon>
                    </div>
                    <span>&nbsp;&nbsp;</span>
                    <div flex>
                        <div v-html="item.missionName"></div>
                        <div class="fs24 dark-gray" v-html="item.missionDesc"></div>
                    </div>
                </div>
                <div v-if="item.completed" class="light-gray">
                    已获得
                </div>
            </div>
            <div v-else-if="item.missionCode == 'SIGN'" @click="goCheckIn" class="list-item error cell cell-box" layout="row" layout-align="space-between center">
                <div flex layout="row" layout-align="start start">
                    <div class="iconBox iconBox4" layout="row" layout-align="center center">
                        <m-icon class="" xlink="#icon-qiandao"></m-icon>
                    </div>
                    <span>&nbsp;&nbsp;</span>
                    <div flex>
                        <div v-html="item.missionName"></div>
                        <div class="fs24 dark-gray" v-html="item.missionDesc"></div>
                    </div>
                </div>
                <div v-if="item.completed" class="light-gray">
                    已获得
                </div>
                <div v-else class="fs24 color-green">
                    <span>去签到</span>
                    <m-icon class="" xlink="#icon-right-bold"></m-icon>
                </div>
            </div>

            <div v-else-if="item.missionCode == 'RELEASE_PROMOTION'" @click="goPromotion" class="list-item error cell cell-box" layout="row" layout-align="space-between center">
                <div flex layout="row" layout-align="start start">
                    <div class="iconBox iconBox5" layout="row" layout-align="center center">
                        <m-icon class="" xlink="#icon-zengsong"></m-icon>
                    </div>
                    <span>&nbsp;&nbsp;</span>
                    <div flex flex>
                        <div><spna v-html="item.missionName"></spna>（{{item.value}}/{{Math.floor(item.conditionValue) || 0}}）</div>
                        <div class="fs24 dark-gray" v-html="item.missionDesc"></div>
                    </div>
                </div>
                <div v-if="item.completed" class="light-gray">
                    已获得
                </div>
                <div v-else class="fs24 color-green">
                    <span>去发布</span>
                    <m-icon class="" xlink="#icon-right-bold"></m-icon>
                </div>
            </div>
            <div v-else-if="item.missionCode == 'ORDER_COUNT'" class="list-item error cell cell-box" layout="row" layout-align="space-between center">
                <div flex layout="row" layout-align="start start">
                    <div class="iconBox iconBox6" layout="row" layout-align="center center">
                        <m-icon class="" xlink="#icon-huangguan"></m-icon>
                    </div>
                    <span>&nbsp;&nbsp;</span>
                    <div flex>
                        <div v-html="item.missionName"></div>
                        <div class="fs24 dark-gray" v-html="item.missionDesc"></div>
                    </div>
                </div>
                <div v-if="item.completed" class="light-gray">
                    已获得
                </div>
                <div class="fs24 color-green">
                </div>
            </div>
            <div v-else-if="item.missionCode == 'POS_TRADE'" class="list-item error cell cell-box" layout="row" layout-align="space-between center">
                <div flex layout="row" layout-align="start start">
                    <div class="iconBox iconBox6" layout="row" layout-align="center center">
                        <img :src="require('assets/imgs/index/20180510170401.jpg')" alt="">
                    </div>
                    <span>&nbsp;&nbsp;</span>
                    <div flex>
                        <div v-html="item.missionName"></div>
                        <div class="fs24 dark-gray" v-html="item.missionDesc"></div>
                    </div>
                </div>
                <div v-if="item.completed" class="light-gray">
                    已获得
                </div>
                <div class="fs24 color-green">
                </div>
            </div>
            <div v-else-if="item.missionCode == 'INTRODUCE'" class="list-item error cell cell-box" layout="row" layout-align="space-between center">
                <div flex layout="row" layout-align="start start">
                    <div class="iconBox iconBox7" layout="row" layout-align="center center">
                        <m-icon class="" xlink="#icon-ai246"></m-icon>
                    </div>
                    <span>&nbsp;&nbsp;</span>
                    <div flex>
                        <div v-html="item.missionName"></div>
                        <div class="fs24 dark-gray" v-html="item.missionDesc"></div>
                    </div>
                </div>
                <div v-if="item.completed" class="light-gray">
                    已获得
                </div>
                <div class="fs24 color-green">
                </div>
            </div>
            <div v-if="item.missionCode == 'YIYE_RELEASE_TICKET'" class="list-item error cell cell-box" layout="row" layout-align="space-between center">
                <div flex layout="row" layout-align="start start">
                    <div class="iconBox iconBox8" layout="row" layout-align="center center">
                        <m-icon class="" xlink="#icon-weibiaoti2fuzhi02"></m-icon>
                    </div>
                    <span>&nbsp;&nbsp;</span>
                    <div flex>
                        <div v-html="item.missionName"></div>
                        <div class="fs24 dark-gray" v-html="item.missionDesc"></div>
                    </div>
                </div>
                <div class="fs24 color-green">
                    <!--<span>去发券</span>-->
                    <!--<m-icon class="" xlink="#icon-right-bold"></m-icon>-->
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import api_party from 'services/api.party';

    export default {
        name: 'getRule',
        data() {
            return {
                dataList: [],
                dataModel: {
                    FIRST_LOGIN: {},
                    SIGN: {},
                    RELEASE_PROMOTION: {},
                    ORDER_COUNT: {},
                    POS_TRADE: {}
                }
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
                    res.data.forEach(item => {
                        if (item.missionCode) {
                            this.dataModel[item.missionCode] = item;
                        }
                    });
                });
            },
            goCheckIn() {
                this.$router.push({name: 'checkIn'});
            },
            goPromotion() {
                window.location.href = '/lite/index.html#/promotion-list';
            },
            goRecharge() {
                this.$router.push({name: 'recharge'});
            }
        }
    };
</script>

<style scoped lang='less'>
    @import '~styles/_style';
    @color-red-lighten: #EC3F6D;
    .color-green{
        color:#14CC8A;
    }
    .color-red-lighten{
        color: @color-red-lighten;
    }
    .list-item{
        border-bottom: 1px solid @border-gay;
        .iconBox{
            width:36px;
            height:36px;
            border-radius: 50%;
            .icon{
                color:#fff;
                font-size:22px;
            }
            &.iconBox1{
                background: linear-gradient(-45deg, #45DCD7, #3FEAB7);
            }
            &.iconBox2{
                background: linear-gradient(135deg, #7EBFE0, #2C96E2);
            }
            &.iconBox3{
                background: linear-gradient(135deg, #6068CE, #8E95EE);
            }
            &.iconBox4{
                background: linear-gradient(135deg, #FBD856, #EEA316);
            }
            &.iconBox5{
                background: linear-gradient(135deg, #63EAC6, #26CB90);
            }
            &.iconBox6{
                background: linear-gradient(135deg, #E278E6, #C838D2);
            }
            &.iconBox7{
                background: linear-gradient(135deg, #DE4695, #E85EB7);
            }
            &.iconBox8{
                background: linear-gradient(135deg, #45DCD7, #3FEAB7);
            }
        }
    }
</style>
