<template>
    <div class="customer-service" v-if="show">
        <div class="mask"></div>
        <div class="window-alert">
            <div class="feichuan" layout="row" layout-align="center center">
            <m-icon class="color-yellow-orange" link="icon-kefudianhua1"></m-icon>
            </div>
            <div class="fs34 color-black" layout="row" layout-align="center center">
                客服电话
            </div>
            <div class="tell" layout="row" layout-align="center center">
                <a class="fs34" href="tel:40049864085">40049864085</a>
            </div>
            <div class="hide-btn fs34 color-pink" layout="row" layout-align="center center" @click="toHide">知道了</div>
        </div>
    </div>
</template>
<script>
import mIcon from 'components/m-icon';
export default {
    data() {
        return {
            show: true
        };
    },
    components: {
        mIcon
    },
    methods: {
        toHide() {
            this.show = false;
        }
    }
};
</script>

<style lang="less" scoped>
@import '~styles/_style';
.customer-service{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top:0;
    .mask{
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(0,0,0,.5);
    }
    .window-alert{
        position: absolute;
        width: 300px;
        height: 280px;
        left: 50%;
        margin-left: -150px;
        top:50%;
        margin-top: -140px;
        background: white;
        border-radius: 14px;
        padding: 30px;
        .feichuan{
            font-size: 80px;
        }
        .tell{
            padding: 10px 0;
            a{
                color: #4A90E2;
            }
        }
        .hide-btn{
            position: absolute;
            height: 60px;
            left: 0;
            right: 0;
            bottom: 0;
            border-top: 1px solid @border-gay;
        }
    }
}
</style>
