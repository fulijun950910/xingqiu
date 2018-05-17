<template>
    <div>
        <div class="cell">推荐购买</div>
        <div v-if="type == 1">
            <div @click="goRechargeMessage" class="list-item cell cell-box" layout="row" layout-align="space-between center">
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
            <div @click="goMwSalon" class="list-item cell cell-box" layout="row" layout-align="space-between center">
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
        name: 'recommend-buy',
        data() {
            return {
                type: this.$store.state.party.userType // 1:saas商户用户、2:saas员工用户、3:bbs账户、4:b2b账户
            };
        },
        mounted() {
        },
        methods: {
            goRechargeMessage() {
                this.$router.push({name: 'rechargeMessage'});
            },
            goMwSalon() {
                window.location.href = this.$wxc_url + '/pay/pay/mwsalon.html';
            }
        }
    };
</script>

<style scoped lang='less'>
    @import '~styles/_style';

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
