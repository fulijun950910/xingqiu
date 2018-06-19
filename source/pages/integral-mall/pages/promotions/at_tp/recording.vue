<template>
    <div class="tp-recording">
        <div class="cell cell-box border-bottom" layout="row" >
            <div class="img" layout="row" layout-align="center cneter"><img :src="null | mSrc2(require('assets/imgs/nullimg.jpg'))" alt=""></div>
            <div flex layout="column" layout-align="space-between stretch">
                <div>
                    <div class="fs32">11月1日测试活动</div>
                    <div class="color-gray">处理中&nbsp;&nbsp;<span class="color-orange">3</span>人团</div>
                </div>
                <div>
                    <span class="color-gray fs24">团号：</span>
                    <span class="color-primary">11125</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'recording',
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
    .tp-recording {
        .border-bottom{
            border-bottom:1px solid @border-gay;
        }
        .img{
            width:80px;
            height:80px;
            border-radius: 4px;
            margin-right:@l16;
            img{
                display:block;
                height: 100%;
                width: auto;
            }

        }
        .color-orange{
            color:#EEA637;
        }
    }
</style>
