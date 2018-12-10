<template>
    <div class="b2b-mall-order-list-publish">
        <div class='mall-list p-t-3'>
            <div class='mall-item bg-white cell-box'>
                <div class='cell' layout='row'>
                    <div class="mall-tag">2000人正在卖</div>
                </div>
                <div class="bg-default cell p-l-1 p-r-1" layout="row">
                    <img class="title-img m-r-2" :src="null | mSrc2(require('assets/imgs/nullimg.jpg'))" alt="">
                    <div class="mall-content" flex layout="column">
                        <div flex>
                            <div class="no-wrap">韩式雪颜光子嫩肤-逆转肌肤之龄，展现如肌肤之龄，展现如</div>
                            <div class="color-gray fs12">规格 大型60cm *1</div>
                        </div>
                        <div layout="row">
                            <div flex>团购价: ¥20.00 - ¥120.00</div>
                            <div>销量 200</div>
                        </div>
                    </div>
                </div>
                <div class="btn-box" layout='row' layout-align='space-between center'>
                    <div class="btn-item">预览</div>
                    <div class="btn-item">编辑</div>
                    <div class="btn-item">分享</div>
                    <div @click="goOrder()" class="btn-item">采购</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'publish',
    data() {
        return {};
    },
    mounted() {
    },
    methods: {}
};
</script>

<style scoped lang='less'>
@import '~styles/_agile';

.b2b-mall-order-list-publish{
    .mall-item{
        margin-bottom: 10px;
        .title-img{
            width:75px;
            height:75px;
            border-radius: 4px;
        }
        .mall-tag{
            background:#F6F1F7;
            padding: 4px 12px;
            border-radius: 2px;
            color: @color-primary;
            font-size: 12px;
        }
        .mall-content{
            width: 260px;
        }
        .btn-box{
            padding: 16px 12px;
            .btn-item{
                width:75px;
                padding: 2px 0;
                background: @white;
                border-radius:2px;
                border:1px solid rgba(102,102,102,1);
                text-align:center;
            }
        }
    }
}
</style>
