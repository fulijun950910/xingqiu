<template>
    <div class="b2b-mall-order-detail" v-title="'采购单详情'">
        <div class="order-state">
            <!--<div>-->
                <!--<div class="color-white fs28">等待供应商发货</div>-->
                <!--<div class="color-5E9CFF">2天后可催促发货</div>-->
            <!--</div>-->
            <div>
                <div class="color-white fs32">已发货, 待签收</div>
            </div>
        </div>
        <!--物流信息-->
        <div class="card-style first-card cell-box">
            <div class="cell border-bottom p-l-5" layout="row">
                <div flex class="m-r-3">
                    <div class="color-primary fs28">[上海市] 到达: 淞虹路邮件集散地. 下一站上海市通协路配件部门</div>
                    <div class="extra-light-black fs24">2018.11.23 21:23:24</div>
                </div>
                <div >
                    <m-icon xlink='#icon-zuojiantou'></m-icon>
                </div>
            </div>
            <div class="cell p-l-5">
                <div layout="row" layout-align="start center" class="color-black fwb m-b-1">
                    <div>123</div>&nbsp;&nbsp;
                    <div>456</div>
                </div>
                <div layout="row" layout-align="start center" class="fs26 extra-light-black">
                    <div>1&nbsp;2&nbsp;3</div>
                </div>
            </div>
        </div>
        <!--订单详情-->
        <div class="order-info m-t-3 card-style cell-box">
            <div class="p-t-5 p-b-3 border-bottom" layout="row">
                <div class="fwb fs28" flex>苏州星辰美容仪器中心</div>
                <div class="color-primary"><m-icon class="" xlink="#icon-xiangqing"></m-icon>&nbsp;在线沟通</div>
            </div>
            <div class="cell border-bottom" layout="row">
                <img class="product-img m-r-2" :src="null | mSrc2(require('assets/imgs/nullimg.jpg'))" alt="">
                <div layout="row" flex>
                    <div layout="column" flex="75">
                        <div flex>韩式雪颜光子嫩肤-逆转肌肤之龄，展如之龄…</div>
                        <div class="fs24 extra-black">规格 大型60cm</div>
                    </div>
                    <div flex class="text-right extra-black">
                        <div>*1</div>
                        <div>￥5000</div>
                    </div>
                </div>
            </div>
            <div class="p-t-2 p-b-2 extra-black border-bottom">
                <div class="p-t-1 p-b-1" layout="row">
                    <div class="" flex>商品总价</div>
                    <div >￥500</div>
                </div>
                <div class="p-t-1 p-b-1" layout="row">
                    <div class="extra-black" flex>运费</div>
                    <div >￥500</div>
                </div>
                <div class="p-t-1 p-b-1" layout="row">
                    <div class="extra-black" flex>运费</div>
                    <div >￥500</div>
                </div>
            </div>
            <div class="cell" layout="row">
                <div class="extra-black" flex>实际支付</div>
                <div class="color-price fwb">￥300</div>
            </div>
        </div>
        <!--订单信息-->
        <div class="order-info m-t-3 card-style cell-box">
            <div class="p-t-5 p-b-3 border-bottom" layout="row">
                <div class="fwb fs28" flex>订单信息</div>
            </div>
            <div class="p-t-2 p-b-2 extra-black fs24">
                <div class="p-t-1 p-b-1" layout="row">
                    <div flex="30">订单编号</div>
                    <div >
                        <span>283748493048484038</span>
                        &emsp;
                        <span @click="copyUrl" class="color-primary">复制</span>
                    </div>
                </div>
                <div class="p-t-1 p-b-1" layout="row">
                    <div flex="30">付款时间</div>
                    <div >￥500</div>
                </div>
                <div class="p-t-1 p-b-1" layout="row">
                    <div flex="30">发&emsp;&emsp;票</div>
                    <div >已选个人发票</div>
                </div>
            </div>
        </div>

        <!--猜你喜欢-->
        <div class="guess-like-box p-l-3 p-r-3">
            <div class="color-primary text-center cell">— 你可能喜欢 —</div>
            <div flex-wrap="wrap" layout="row" layout-align="space-between center">
                <div class="like-item">
                    <div class="img"><img class="" :src="null | mSrc2(require('assets/imgs/nullimg.jpg'))" alt=""></div>
                    <div layout="column" class="p-t-2 p-b-2 p-r-2 p-l-2">
                        <div flex>
                            <div>宫廷中药美颜圣品</div>
                            <div class="extra-black fs24">同仁堂七子美白保湿面膜粉150g</div>
                        </div>
                        <div class="color-price text-right fs24">￥790.00</div>
                    </div>
                </div>
                <div class="like-item">123</div>
                <div class="like-item">123</div>
            </div>
        </div>
        <!--状态按钮盒子-->
        <div class="btn-box-padding"></div>
        <div layout="row" layout-align="start center" class="btn-box cell-box">
            <div flex></div>
            <button class="order-btn btn-default">延长收货</button>
            <button class="order-btn btn-primary">催促发货</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'order-detail',
    data() {
        return {};
    },
    mounted() {
    },
    methods: {
        copyUrl() {
            const input = document.createElement('input');
            input.setAttribute('readonly', 'readonly');
            input.setAttribute('value', '123456789');
            document.body.appendChild(input);
            input.select();
            if (document.execCommand('copy')) {
                document.execCommand('copy');
                this.$toast('复制成功');
            }
            document.body.removeChild(input);
        }
    }
};
</script>

<style scoped lang='less'>
@import '~styles/_agile';
.b2b-mall-order-detail{
    font-size: 13px;
    min-height: 100vh;
    background: @bg-gray;
    .order-state{
        background: #200746;
        padding: 30px 12px 42px;
    }
    .card-style {
        box-shadow:0px 4px 17px 0px rgba(75,110,150,0.11);
        border-radius:2px;
        margin-left: 5px;
        margin-right: 5px;
        background:@white;
    }
    .first-card{
        margin-top: -12px;
    }
    .color-5E9CFF {
        color:#5E9CFF
    }
    .color-price {
        color: #D92199;
    }
    .order-info{
        .product-img{
            width:60px;
            height: 60px;
            border-radius: 4px;
        }
    }
    .btn-box-padding{
        height: 60px;
    }
    .btn-box{
        position:fixed;
        width: 100%;
        height: 50px;
        bottom:0;
        left:0;
        background: @white;
        box-shadow:0px -3px 6px 0px rgba(49,77,83,0.14);
        .order-btn{
            width:90px;
            height:34px;
            border: 1px solid @border-gay;
            border-radius: 4px;
            margin-left: 12px;
            background: transparent;
        }
        .btn-default{
            color: @extra-light-black;
            border-color: @extra-light-black
        }
        .btn-primary {
            color: @color-primary;
            border-color: @color-primary;
        }
    }
    .guess-like-box{
        margin-top: 35px;
    }
    .like-item{
        width: 160px;
        height: 250px;
        border-radius:2px;
        box-shadow:0px 4px 17px 0px rgba(75,110,150,0.11);
        margin: 6px;
        background: #fff;
        .img{
            width:160px;
            height:160px;
        }
    }
}
</style>
