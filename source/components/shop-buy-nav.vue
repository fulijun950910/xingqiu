<template>
    <div class="shop-buy-bottom" layout="row" layout-align="start stretch">
     <div class="like text-center" flex="20" layout="row" layout-align="center center">
         <m-icon xlink="#icon-huabanfuben"></m-icon>
     </div>
     <div flex="30" class="get-present text-center" layout="row" layout-align="center center">
         <m-icon xlink="#icon-huabanfuben4"></m-icon>领取样品
     </div>
     <div flex="50" class="buy-right-now text-center" @click="buy" layout="row" layout-align="center center">
         立即抢购
     </div>
    </div>
</template>
<script>
import mIcon from 'components/m-icon';
import { Toast } from 'mint-ui';
export default {
    data() {
        return {

        };
    },
    components: {
        mIcon
    },
    methods: {
        buy() {
            Toast('程序猿正在加速开发中，敬请期待...');
        }
    }
};
</script>
<style lang="less">
@import '~styles/_agile';
.shop-buy-bottom{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 50px;
    background: white;
    z-index: 99;
    border-top:1px solid #eee;
    .like{
        border-right: 1px solid #eee;
        font-size: 20px;
        color: #aaa;
    }
    .get-present{
        border-right: 1px solid #eee; 
        font-size: 14px;
        color: #8C5EE5;    
        font-weight: 500;  
        .icon{
             margin-right: 5px;
        }
    }
    .buy-right-now{
        color: white;
        color: 16px;
        background: #8C5EE5;
    }
}
</style>

