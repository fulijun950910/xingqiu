<template>
    <div class="pay-success" v-title="'支付成功'">
        <div class="notice-img" layout="column" layout-align="center center">
            <div class="m-b-1">
                <img :src="require('assets/imgs/integral-mall/buy-success.png')" alt=""></div>
            <div class="fs34 color-black">支付成功</div>
        </div>
        <div class="btn-group text-center " layout="row" layout-align="space-around center">
            <div class="click-link fs30 color-black" @click="linkTo(1)" layout="row" layout-align="center center">
                前往我的星球
            </div>
            <div class="click-link active text-center fs30 color-pink" @click="linkTo(2)" layout="row" layout-align="center center">
                玩转美豆豆
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        linkTo(type) {
            switch (type) {
                case 1:
                    this.$router.push('personal');
                    break;
                case 2:
                    this.$router.push('rule-entry');
                    break;
                default:
                    break;
            }
        }
    }
};
</script>
<style lang="less" scoped>
@import '~styles/_style';
.pay-success{
    height: 100%;
    .notice-img{
        padding: 72.5px 0;
        img{
            width: 120px;
            height: auto;
        }
    }
    .btn-group{
        .click-link{
            width: 125px;
            height: 49px;
            border: 1px solid @border-gay;
            border-radius: 7px;
        }
        .active{
            border: 1px solid @color-pink;
        }

    }

}

</style>


