<template>
    <div class="tips-show" :class="{show:stop}" layout="row" layout-align="start center" @click="toHomePage">
        <m-icon v-if="!stop" xlink="icon-gengduo-right"></m-icon>
        <span v-if="stop">结束体验</span>
    </div>
</template>
<script>
import mIcon from 'components/m-icon';
export default {
    data() {
        return {
            stop: false
        };
    },
    components: {
        mIcon
    },
    methods: {
        toHomePage() {
            this.stop = !this.stop;
            if (!this.stop) {
                window.location.href = '/service/index.html#/main';
            };
        }
    }
};
</script>
<style lang="less">
@import '~styles/_agile';
    .tips-show{
        position:fixed;
        top:18px;
        transform: translateX(40px);
        right: 0;
        padding-left: 15px;
        width:90px;
        height: 40px;
        z-index: 99999;
        background: #4C4C4C;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        transition: all ease 0.5s;
        .icon{
            color: white;
            font-size: 20px;
            position: relative;
            animation:media 2s infinite;
        }
        span{
            font-size: 14px;
            color: white;
        }
    }
    .tips-show.show{
            transform: translateX(0);
           .icon{
               display: none;
           }
    }
    @keyframes media {
        0% {
            transform:translateX(0);
        }
        100% {
            transform:translateX(15px);
        }
    }
</style>
