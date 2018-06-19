<template>
    <div class="tp-list">
        <div class="tabBar bg-white text-center" layout="row" layout-align="space-between center">
            <div @click="itemClick(1)" flex="33"><div :class="{'act': selected == 1}" class="tabBarItem cell">全部团</div></div>
            <div @click="itemClick(2)" flex="33"><div :class="{'act': selected == 2}" class="tabBarItem cell">团满啦</div></div>
            <div @click="itemClick(3)" flex="33"><div :class="{'act': selected == 3}" class="tabBarItem cell">团ING</div></div>
        </div>
        <div class="main cell-box">
            <div class="list-item cell cell-box" layout="row" layout-align="start center">
                <img class="img m-r-2" :src="null | mSrc2(require('assets/imgs/nullimg.jpg'))" alt="">
                <div flex>
                    <div>团长：123</div>
                    <div class="color-gray fs24">匹配中</div>
                    <div class="color-gray"><span class="color-primary">￥123</span> <s>￥123</s></div>
                </div>
                <div flex="25" class="text-center"  layout="column" layout-align="space-between stretch">
                    <div><m-icon xlink="#icon-shalou"></m-icon>12:12:12</div>
                    <button class="goDetailBtn">来抱团</button>
                </div>
            </div>
            <div class="list-item cell cell-box" layout="row" layout-align="start center">
                <img class="img m-r-2" :src="null | mSrc2(require('assets/imgs/nullimg.jpg'))" alt="">
                <div flex>
                    <div>团长：123</div>
                    <div class="color-gray fs24">匹配中</div>
                    <div class="color-gray"><span class="color-primary">￥123</span> <s>￥123</s></div>
                </div>
                <div flex="25" class="text-center"  layout="column" layout-align="space-between stretch">
                    <div><m-icon xlink="#icon-shalou"></m-icon>12:12:12</div>
                    <button class="goDetailBtn">来抱团</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'list',
        data() {
            return {
                selected: 1
            };
        },
        mounted() {
        },
        methods: {
            itemClick(index) {
                this.selected = index;
            }
        }
    };
</script>

<style scoped lang='less'>
    @import '~styles/_style';
    .tp-list{
        min-height:100vh;
        background: @bg-gray;
        .tabBar {
            position: fixed;
            width: 100%;
            top: 0;
            left:0;
            z-index: 5;
            border-bottom: 1px solid #D4D1D1;
            box-shadow: 0 0 5px 1px #D4D1D1;
            .tabBarItem{
                margin: 0 @l16;
                border-bottom:2px solid transparent;
                &.act{
                    color: @color-primary;
                    border-bottom:2px solid @color-primary;
                }
            }
        }
        .main{
            padding-top:50px;
            .list-item{
                margin-top: 5vw ;
                box-shadow: 3px 3px 4px #eaeaea;
                box-sizing: border-box;
                background: @white;
                border-radius: 2px;
                .img{
                    width: 55px;
                    height: 55px;
                    display:block;
                    border-radius: 50%;
                }
                .goDetailBtn{
                    background:transparent;
                    color: @color-primary;
                    border: 1px solid @color-primary;
                    margin-top:@l8;
                    border-radius: 4px;
                    padding:@l8 @l24;
                }
            }
        }
    }
</style>
