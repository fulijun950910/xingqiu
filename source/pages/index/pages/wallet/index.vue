<template>
    <div v-title="'我的钱包'" class="wallet cell-box">
        <div class="walletBox cell-box">
            <div class="top cell">
                <div class="fs24" layout="row" layout-align="space-between center">
                    <div class="color-gray">当前已有美豆豆</div>
                    <div @click="goPayNotes" class="color-green">查看收支明细<m-icon class="" xlink="#icon-right-bold"></m-icon></div>
                </div>
                <div class="blance">1970</div>
                <div @click="goGetRule" class="color-red-light">获取更多美豆豆</div>
            </div>
            <div class="cell">
                <button @click="goRecharge" class="recharge-btn fs32">充值</button>
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
        name: 'wallet',
        data() {
            return {};
        },
        mounted() {
        },
        methods: {
            goPayNotes() {
                this.$router.push({name: 'payNotes'});
            },
            goGetRule() {
                this.$router.push({name: 'getRule'});
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

    .wallet{
        min-height:100vh;
        background: url("~assets/imgs/index/20180510114801.jpg") no-repeat top center;
        background-size: 100% auto;
        padding-top:72px;
    }
    .color-green{
        color:#14CC8A;
    }
    .color-red-light{
        color:@color-red-lighten
    }
    .walletBox{
        height:180px;
        border-radius:4px;
        box-shadow: 0 2px 2px #ddd;
        background:@white;
        margin-bottom:@l16;
        .top{
            border-bottom:1px solid @border-gay;
        }
        .blance{
            font-size:30px;
        }
        .recharge-btn{
            background:@color-red-lighten;
            color:@white;
            height:36px;
            border-radius: 18px;
            width:135px;
        }
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
