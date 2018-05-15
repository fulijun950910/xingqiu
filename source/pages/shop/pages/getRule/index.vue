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
        <div class="list-item error cell cell-box" layout="row" layout-align="space-between center">
            <div layout="row" layout-align="start start">
                <div class="iconBox iconBox2" layout="row" layout-align="center center">
                    <m-icon class="" xlink="#icon-qianyue"></m-icon>
                </div>
                <span>&nbsp;&nbsp;</span>
                <div>
                    <div>首次登陆</div>
                    <div class="fs24 dark-gray"><span class="color-red-lighten">+10</span>美豆豆</div>
                </div>
            </div>
            <div class="light-gray">
                已获得
            </div>
        </div>

        <div v-if='false' class="list-item error cell cell-box" layout="row" layout-align="space-between center">
            <div layout="row" layout-align="start start">
                <div class="iconBox iconBox3" layout="row" layout-align="center center">
                    <m-icon class="" xlink="#icon-hezuo"></m-icon>
                </div>
                <span>&nbsp;&nbsp;</span>
                <div>
                    <div>异业共赢</div>
                    <div class="fs24 dark-gray"><span class="color-red-lighten">+50</span>美豆豆</div>
                </div>
            </div>
            <div class="light-gray">
                已获得
            </div>
        </div>
        <div @click="goCheckIn" class="list-item error cell cell-box" layout="row" layout-align="space-between center">
            <div layout="row" layout-align="start start">
                <div class="iconBox iconBox4" layout="row" layout-align="center center">
                    <m-icon class="" xlink="#icon-qiandao"></m-icon>
                </div>
                <span>&nbsp;&nbsp;</span>
                <div>
                    <div>每日签到</div>
                    <div class="fs24 dark-gray">每日1豆，连续签到7天<span class="color-red-lighten">+10</span>美豆豆</div>
                </div>
            </div>
            <div class="fs24 color-green">
                <span>去充值</span>
                <m-icon class="" xlink="#icon-right-bold"></m-icon>
            </div>
        </div>

        <div @click="goPromotion" class="list-item error cell cell-box" layout="row" layout-align="space-between center">
            <div layout="row" layout-align="start start">
                <div class="iconBox iconBox5" layout="row" layout-align="center center">
                    <m-icon class="" xlink="#icon-zengsong"></m-icon>
                </div>
                <span>&nbsp;&nbsp;</span>
                <div>
                    <div>发布微信营销活动（0/2）</div>
                    <div class="fs24 dark-gray">每月完成2个营销活动<span class="color-red-lighten">+5</span>美豆豆</div>
                </div>
            </div>
            <div class="fs24 color-green">
                <span>去发布</span>
                <m-icon class="" xlink="#icon-right-bold"></m-icon>
            </div>
        </div>
        <div class="list-item error cell cell-box" layout="row" layout-align="space-between center">
            <div layout="row" layout-align="start start">
                <div class="iconBox iconBox6" layout="row" layout-align="center center">
                    <m-icon class="" xlink="#icon-huangguan"></m-icon>
                </div>
                <span>&nbsp;&nbsp;</span>
                <div>
                    <div>明星商户</div>
                    <div class="fs24 dark-gray">每月完成100个订单<span class="color-red-lighten">+5</span>美豆豆</div>
                </div>
            </div>
            <div class="fs24 color-green">
            </div>
        </div>
        <div class="list-item error cell cell-box" layout="row" layout-align="space-between center">
            <div layout="row" layout-align="start start">
                <div class="iconBox iconBox6" layout="row" layout-align="center center">
                    <img :src="require('assets/imgs/index/20180510170401.jpg')" alt="">
                </div>
                <span>&nbsp;&nbsp;</span>
                <div>
                    <div>POS交易</div>
                    <div class="fs24 dark-gray">每交易1千元<span class="color-red-lighten">+1</span>美豆豆</div>
                </div>
            </div>
            <div class="fs24 color-green">
            </div>
        </div>
        <div class="list-item error cell cell-box" layout="row" layout-align="space-between center">
            <div layout="row" layout-align="start start">
                <div class="iconBox iconBox7" layout="row" layout-align="center center">
                    <m-icon class="" xlink="#icon-ai246"></m-icon>
                </div>
                <span>&nbsp;&nbsp;</span>
                <div>
                    <div>介绍商户入驻</div>
                    <div class="fs24 dark-gray">介绍1个商户<span class="color-red-lighten">+1000</span>美豆豆</div>
                </div>
            </div>
            <div class="fs24 color-green">
            </div>
        </div>
        <div v-if="false" class="list-item error cell cell-box" layout="row" layout-align="space-between center">
            <div layout="row" layout-align="start start">
                <div class="iconBox iconBox8" layout="row" layout-align="center center">
                    <m-icon class="" xlink="#icon-weibiaoti2fuzhi02"></m-icon>
                </div>
                <span>&nbsp;&nbsp;</span>
                <div>
                    <div>作为异业宿主发券成功</div>
                    <div class="fs24 dark-gray">发券1次<span class="color-red-lighten">+10</span>美豆豆</div>
                </div>
            </div>
            <div class="fs24 color-green">
                <span>去发券</span>
                <m-icon class="" xlink="#icon-right-bold"></m-icon>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'getRule',
        data() {
            return {};
        },
        mounted() {
        },
        methods: {
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
