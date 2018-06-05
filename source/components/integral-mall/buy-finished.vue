<template>
    <div class="buy-finished">
        <div class="mask"></div>
        <div class="toast" layout="column"  layout-align="space-between center">
            <div class="top-show" layout="column" layout-align="center center">
                <div><m-icon xlink="#icon-jinbi"></m-icon></div>
                <div class="fs34 color-black">支付成功</div>
            </div>
<div class="bottom-link">
    <div class="link-item color-gray fs34" @click="toLink(item)" layout="row" :class="{'color-pink': index == 0}" layout-align="center center" v-for="(item, index) in backType" :key="index">
        {{item.name}}
    </div>
</div>
        </div>
    </div>
</template>

<script>
import mIcon from 'components/m-icon';
export default {
    data() {
        return {
            backType: [
                {
                    name: '更多玩法',
                    value: 1
                },
                {
                    name: '去充值',
                    value: 2
                },
                {
                    name: '查看订单',
                    value: 3
                }
            ]
        };
    },
    props: {
        fType: {
            type: Number,
            default: 1
        }
    },
    methods: {
        toLink(item) {
            if (item.value == 1) {
                // 更多玩法页面
                // this.$router.push('')
            } else if (item.value == 2) {
                this.$router.push('/recharge-doudou');
            } else if (item.value == 3) {
                this.$router.push('/order-list');
            };
        }

    },
    components: {
        mIcon
    }
};
</script>
<style lang="less" scoped>
@import '~styles/_style';
.buy-finished{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 11;
    .mask{
        position: absolute;
        z-index: 1;
        background: rgba(0,0,0,.5);
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
    .toast{
        position: absolute;
        width: 280px;
        height: 373px;
        left: 50%;
        top:50%;
        margin-left: -140px;
        margin-top: -186.5px;
        background: white;
        z-index: 2;
        border-radius: 14px;
        .top-show{
            width: 100%;
            padding: 80px 0 25px 0;
        }
        .bottom-link{
            width: 100%;
            .link-item{
                height: 50px;
                border-top:1px solid @border-gay;
            }

        }
    }
}
</style>

