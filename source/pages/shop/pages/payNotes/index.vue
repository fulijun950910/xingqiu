<template>
    <div v-title="'收支明细'" class="payNotes cell-box">
        <div class="blanceBox" layout="column" layout-align="center center">
            <div class="fs24 color-white-light">当前账户美豆豆</div>
            <div class="blance color-white">4980</div>
        </div>
        <div class="cell" layout="row" layout-align="space-between center">
            <div>
                <m-icon class="fs36" xlink="#icon-datezhuanhuan"></m-icon>
                <span class="fs24">2018.03</span>
            </div>
            <div class="fs24 color-gray">
                <span>收入:</span>
                <span class="color-success">1450</span>
                <span>&nbsp;&nbsp;</span>
                <span>支出:</span>
                <span class="color-error">700</span>
            </div>
        </div>
        <div>
            <div class="list-item success cell cell-box" layout="row" layout-align="space-between center">
                <div layout="row" layout-align="start start">
                    <div class="iconBox" layout="row" layout-align="center center">
                        <m-icon class="" xlink="#icon-jiantou-copy-copy"></m-icon>
                    </div>
                    <span>&nbsp;&nbsp;</span>
                    <div>
                        <div>购买短信包</div>
                        <div class="fs24 light-gray">03.28</div>
                    </div>
                </div>
                <div class="price">
                    +1000
                </div>
            </div>
            <div class="list-item error cell cell-box" layout="row" layout-align="space-between center">
                <div layout="row" layout-align="start start">
                    <div class="iconBox" layout="row" layout-align="center center">
                        <m-icon class="" xlink="#icon-jiantou-copy-copy"></m-icon>
                    </div>
                    <span>&nbsp;&nbsp;</span>
                    <div>
                        <div>购买短信包</div>
                        <div class="fs24 light-gray">03.28</div>
                    </div>
                </div>
                <div class="price">
                    +1000
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'payNotes',
        data() {
            return {};
        },
        mounted() {
        },
        methods: {}
    };
</script>

<style scoped lang='less'>
    @import '~styles/_style';
    @color-red-lighten: #EC3F6D;
    @color-success:#EE5253;
    @color-error:#14CC8A;

    .color-white-light{
        color: rgba(255,255,255,0.6);
    }
    .color-success{
        color:@color-success;
    }
    .color-error{
        color:@color-error;
    }
    .blanceBox{
        margin-top:@l32;
        height:147px;
        background:url("~assets/imgs/index/20180510155101.png") no-repeat top center;
        background-size:100% 100%;
        margin-bottom:@l16;
        .blance{
            font-size:30px;
        }
    }
    .list-item{
        border: 1px solid @border-gay;
        margin-bottom:@l32;
        .iconBox{
            width:24px;
            height:24px;
            border-radius: 12px;
            background: lighten(@color-success, 32%);
            .icon{
                color:@color-success;
            }
        }
        &.success{
            .iconBox{
                background: lighten(@color-success, 34%);
                .icon{
                    transform:rotate(180deg);
                    color:@color-success;
                }
            }
            .price{
                color:@color-success;
            }
        }
        &.error{
            .iconBox{
                background: lighten(@color-error, 48%);
                .icon{
                    color:@color-error;
                }
            }
            .price{
                color:@color-error;
            }
        }
    }

</style>
