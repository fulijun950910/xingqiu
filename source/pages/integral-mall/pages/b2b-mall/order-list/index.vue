<template>
    <div class="b2b-mall-order-list" v-title="'订单管理'">
        <div layout="row" class="nav-bar">
            <div @click="goPublish" :class="{'act': index == 1}" class="nav-item" flex="33" layout="column" layout-align="center center">
                <div class="text">已发布</div>
                <div class="shadow-line"></div>
            </div>
            <div @click="goSell" :class="{'act': index == 2}" class="nav-item" flex="33" layout="column" layout-align="center center">
                <div class="text border-left">已卖出</div>
                <span class="shadow-line"></span>
            </div>
            <div @click="goBuy" :class="{'act': index == 3}" class="nav-item" flex="33" layout="column" layout-align="center center">
                <div class="text border-left">已购买</div>
                <span class="shadow-line"></span>
            </div>
        </div>
        <div class="nav-bar-padding"></div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'publish',
    data() {
        return {
            index: 3
        };
    },
    mounted() {
    },
    methods: {
        goPublish() {
            this.index = 1;
            this.$router.push({
                name: 'b2b-mall-order-list-publish'
            });
        },
        goSell() {
            this.index = 2;
            this.$router.push({
                name: 'b2b-mall-order-list-sell'
            });
        },
        goBuy() {
            this.index = 3;
            this.$router.push({
                name: 'b2b-mall-order-list-buy'
            });
        }

    }
};
</script>

<style scoped lang='less'>
@import '~styles/_agile';
.b2b-mall-order-list{
    font-size: 13px;
    min-height: 100vh;
    background: @bg-gray;

    .nav-bar-padding{
        height: 50px;
    }
    .nav-bar {
        height:50px;
        background:rgba(255,255,255,1);
        box-shadow:0px 3px 8px 0px rgba(49,77,83,0.28);
        position:fixed;
        top: 0;
        left:0;
        width: 100%;
        z-index: 2;
        .nav-item{
            position:relative;
            color:#AAAAAA;
            .text{
                font-size: 16px;
                padding: 0 8px;
                width: 100%;
                text-align: center;
            }
            .shadow-line{
                display: none;
                width:60px;
                height:4px;
                background:rgba(133,67,153,1);
                box-shadow:0px 1px 4px 0px rgba(164,58,142,0.36);
                border-radius:2px;
                position:absolute;
                bottom:4px;
                left: 50%;
                margin-left: -30px;
            }
            &.act{
                color:@color-primary;
                .shadow-line{
                    display:block;
                }
            }
        }
    }
}

</style>
