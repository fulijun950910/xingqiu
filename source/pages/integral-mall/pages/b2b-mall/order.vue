<template>
    <div class="b2b-mall-order" v-title="'填写采购订单'">
        <!--地址-->
        <div class="address-box cell cell-box" layout="row" layout-align="start center" >
            <div flex>
                <div layout="row" layout-align="start center" class="color-black fwb fs32 m-b-1">
                    <div>{{address.contactPersion}}123</div>&nbsp;&nbsp;
                    <div>{{address.contactMobile}}234</div>
                </div>
                <div layout="row" layout-align="start center" class="fs26 extra-light-black">
                    <div>111123{{address.province}}&nbsp;{{address.city}}&nbsp;{{address.fullAddress}}</div>
                </div>
            </div>
            <m-icon class="fs40 color-gray" xlink="#icon-zuojiantou"></m-icon>
        </div>
        <!--商品信息-->
        <div class="product-info bg-white m-t-3 cell-box cell">
            <div class="m-b-3" layout="row">
                <div class="extra-black" flex>苏州星辰美容仪器中心</div>
                <div class="color-primary"><m-icon class="" xlink="#icon-xiangqing"></m-icon>&nbsp;在线沟通</div>
            </div>
            <div layout="row" class="bg-default br2 cell p-l-2 p-r-2">
                <img class="product-img m-r-3" :src="null | mSrc2(require('assets/imgs/nullimg.jpg'))" alt="">
                <div flex layout="column">
                    <div>
                        <div>韩式雪颜光子嫩肤-逆转肌肤之龄，展现如…</div>
                        <div class="fs24 extra-black">规格 大型60cm</div>
                    </div>
                    <div class="color-price">￥500.00</div>
                </div>
            </div>
            <div class="m-t-3" layout="row" layout-align="start center">
                <div flex>购买数量</div>
                <div><integralInput></integralInput></div>
            </div>
        </div>
        <!--支付方式-->
        <div class="pay-box bg-white cell cell-box m-t-3">
            <div layout="row" layout-align="start start">
                <div flex>
                    <div>美豆豆数量</div>
                    <div class="fs24">共1000美豆豆 , 抵¥20 <m-icon class="extra-black" xlink="#icon-xiangqing"></m-icon></div>
                </div>
                <mt-switch ></mt-switch>
            </div>
            <div class="cell cell-box bg-default br1 m-t-3 m-b-4">
                使用500美豆豆 ,<span class="color-price">抵¥10 </span>
            </div>
            <div class="p-t-3 border-top" layout="row">
                <div flex>优惠券</div>
                <div>¥200短信包抵用券 <m-icon class="" xlink="#icon-gengduoicon"></m-icon></div>
            </div>
        </div>
        <!--支付详情-->
        <div class="pay-info m-t-3 bg-white cell cell-box">
            <div class="p-t-2 p-b-2" layout="row">
                <div class="extra-black" flex>商品总价</div>
                <div >￥500</div>
            </div>
            <div class="p-t-2 p-b-2" layout="row">
                <div class="extra-black" flex>运费</div>
                <div >￥500</div>
            </div>
            <div class="p-t-2 p-b-2" layout="row">
                <div class="extra-black" flex>运费</div>
                <div >￥500</div>
            </div>
        </div>
        <!--发票-->
        <div class="m-t-3 bg-white cell cell-box" layout="row" layout-align="start center">
            <div flex>发票</div>
            <mt-switch ></mt-switch>
        </div>
        <!--支付按钮-->
        <div class="pay-box-padding"></div>
        <div layout="row" layout-align="start center" class="pan-btn-box">
            <div class="cell cell-box" flex>
               <span>需支付</span>&nbsp;<span class="color-price fs40 fwb">¥290</span>
            </div>
            <div class="pay-btn" layout="row" layout-align="center center">提交订单</div>
        </div>
    </div>
</template>

<script>
import integralInput from 'components/integral-mall/integral-input';
import Vue from 'vue';
import { Switch } from 'mint-ui';
Vue.component(Switch.name, Switch);

export default {
    name: 'order',
    data() {
        return {
            address: {}
        };
    },
    components: {
        integralInput
    },
    mounted() {
    },
    methods: {}
};
</script>

<style lang='less'>
@import '~styles/_agile';
.b2b-mall-order{
    font-size: 13px;
    min-height: 100vh;
    background: @bg-gray;
    .mint-switch-input:checked + .mint-switch-core{
        border-color: @color-primary;
        background: @color-primary;
        &::after{
            transform: translateX(26px);
        }
    }
    .mint-switch-core{
        width:50px;
        height:24px;
        &::after{
            width:22px;
            height:22px;
            border-radius:50%;
        }
        &::before{
            width:48px;
            height:22px;
        }
    }

    .address-box{
        background: #fff url("~assets/imgs/b2b-mall/2018120602.png") repeat-x bottom;
        background-size: auto 3px;
    }
    .color-price {
        color: #D92199;
    }
    .product-info{
        .product-img{
            width:60px;
            height: 60px;
            border-radius: 4px;
        }
    }
    .pay-box-padding{
        height: 60px;
    }
    .pan-btn-box{
        position:fixed;
        width: 100%;
        height: 50px;
        bottom:0;
        left:0;
        background: @white;
        box-shadow:0px -3px 6px 0px rgba(49,77,83,0.14);
        .pay-btn{
            background: @color-primary;
            font-size: 16px;
            color: @white;
            height:100%;
            width: 155px;
        }
    }
}
</style>
