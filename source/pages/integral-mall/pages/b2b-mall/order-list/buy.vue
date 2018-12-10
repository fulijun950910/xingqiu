<template>
    <div class="b2b-mall-order-list-buy">
        <div layout="row" class="nav-bar">
            <div @click="typeChange(1)" :class="{'act': type == 1}" class="nav-item" flex="20" layout="column" layout-align="center center">
                <div class="text">全部</div>
                <div class="shadow-line"></div>
            </div>
            <div @click="typeChange(2)" :class="{'act': type == 2}" class="nav-item" flex="20" layout="column" layout-align="center center">
                <div class="text">待付款</div>
                <span class="shadow-line"></span>
            </div>
            <div @click="typeChange(3)" :class="{'act': type == 3}" class="nav-item" flex="20" layout="column" layout-align="center center">
                <div class="text">待发货</div>
                <span class="shadow-line"></span>
            </div>
            <div @click="typeChange(4)" :class="{'act': type == 4}" class="nav-item" flex="20" layout="column" layout-align="center center">
                <div class="text">待收货</div>
                <span class="shadow-line"></span>
            </div>
            <div @click="typeChange(5)" :class="{'act': type == 5}" class="nav-item" flex="20" layout="column" layout-align="center center">
                <div class="text">已完成</div>
                <span class="shadow-line"></span>
            </div>
        </div>
        <div class="order-list">
            <div class="order-item m-t-3 card-style cell-box">
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
                <div class="cell" layout="row">
                    <div class="extra-black" flex>实际支付</div>
                    <div class="">￥300</div>
                </div>
                <div class="btn-box cell" layout="row" layout-align="end center">
                    <button class="order-btn btn-default">延长收货</button>
                    <button class="order-btn btn-primary">去付款</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'buy',
    data() {
        return {
            type: 1
        };
    },
    mounted() {
    },
    methods: {
        typeChange(type) {
            this.type = type;
        }
    }
};
</script>

<style scoped lang='less'>
@import '~styles/_agile';
.b2b-mall-order-list-buy{
    padding-bottom:30px;
    .nav-bar {
        height:50px;
        background:rgba(255,255,255,1);
        box-shadow:0px 3px 8px 0px rgba(49,77,83,0.28);
        width: 100%;
        .nav-item{
            position:relative;
            color:#AAAAAA;
            .text{
                padding: 0 8px;
                width: 100%;
                text-align: center;
            }
            .shadow-line{
                display: none;
                width:44px;
                height:4px;
                background:rgba(133,67,153,1);
                box-shadow:0px 1px 4px 0px rgba(164,58,142,0.36);
                border-radius:2px;
                position:absolute;
                bottom:4px;
                left: 50%;
                margin-left: -22px;
            }
            &.act{
                color:@color-primary;
                .shadow-line{
                    display:block;
                }
            }
        }
    }
    .card-style{
        box-shadow:0px 4px 17px 0px rgba(75,110,150,0.11);
        border-radius:2px;
        margin-left: 5px;
        margin-right: 5px;
        background:@white;
    }
    .order-item{
        .product-img{
            width:60px;
            height: 60px;
            border-radius: 4px;
        }
    }
    .btn-box{
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
}
</style>
