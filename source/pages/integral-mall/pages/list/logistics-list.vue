<template>
    <div class="logistics-list m-l-4 m-r-4 m-t-4" v-title="'查看物流'">
        <div class="fs24 color-gray logisticsInfo" layout="row" layout-align="start center">
            <div class="m-r-2"><img :src="null | mSrc2(require('assets/imgs/nullimg.jpg'))" alt=""></div>
            <div>
                <div>物流公司：申通快递</div>
                <div>物流单号：12345</div>
                <div>物流电话：12345</div>
            </div>
        </div>
        <div class="logistics-box m-t-4" >
            <div class="fs32 fwb m-b-4">物流状态</div>
            <div class="logisticsItem" layout="row" layout-align="start stretch">
                <div class="left m-l-5 m-r-5"><m-icon class="icon color-green" xlink="#icon-webicon318"></m-icon></div>
                <div flex class="border-top color-gray p-t-1 p-b-1">
                    <div>123121231223123123</div>
                    <div class="fs22">2010-10-10 02:11:12</div>
                </div>
            </div>
            <div class="logisticsItem" layout="row" layout-align="start stretch">
                <div class="left m-l-5 m-r-5"><m-icon class="icon color-gray" xlink="#icon-webicon318"></m-icon></div>
                <div flex class="border-top color-gray p-t-1 p-b-1">
                    <div>123121231223123123</div>
                    <div class="fs24">2010-10-10 02:11:12</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'logistics-list',
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

    .logistics-list{
        min-height:100vh;
        background:@white;
        .logisticsInfo{
            img{
                width: 60px;
                height: 60px;
                display: block;
            }
        }
        .border-top {
            border-top: 1px solid @border-gay;
        }
        .color-green {
            color: @color-success;
        }
        .logistics-box{
            border:1px solid @border-gay;
            box-shadow: 0 2px 17px 0 rgba(44, 45, 51, 0.11);
            margin-bottom: 20px;
            border-radius: 7px;
            padding: 10px;
        }
        .logisticsItem{
            padding-right: @l16;
            .left{
                border-left:1px solid @border-gay;
                position:relative;
                .icon{
                    position:absolute;
                    left:-0.5em;
                    top:5px;
                }
            }
        }
    }
</style>
