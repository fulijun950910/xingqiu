<template>
    <div class='b2b-mall-index'>
        <div class="banner1-box">
            <img :src="null | mSrc2(require('assets/imgs/nullimg.jpg'))" alt="">
        </div>
        <div class='cell cell-box bg-white border-bottom' layout='row' layout-align='start center'>
            <div flex class='fs32 fwb'>经营数据</div>
        </div>
        <div class="bg-white p-t-2 p-b-2 text-center" layout="row">
            <div class="p-t-1 p-b-1" flex="33">
                <div class="fwb fs48">45</div>
                <div class="extra-light-black">昨日收入</div>
            </div>
            <div class="p-t-1 p-b-1 border-left" flex="33">
                <div class="fwb fs48">45</div>
                <div class="extra-light-black">待验券</div>
            </div>
            <div class="p-t-1 p-b-1 border-left" flex="33">
                <div class="fwb fs48">45</div>
                <div class="extra-light-black">待成团</div>
            </div>
        </div>
        <!--参与活动-->
        <div class='m-t-3 cell cell-box bg-white border-bottom' layout='row' layout-align='start center'>
            <div flex class='fs32 fwb'>参与活动</div>
        </div>
        <div class="bg-white cell cell-box">
            <div layout="row">
                <div flex>预售商品销售金额</div>
                <div>¥9000.00</div>
            </div>
            <div class="extra-light-black fs24">占位文案占位文案占位文案占位文案</div>
        </div>

        <div class="m-t-3 banner2-box">
            <img :src="require('assets/imgs/b2b-mall/2018120601.jpg')" alt="">
        </div>
        <!--商品管理-->
        <div class='m-t-3 cell cell-box bg-white border-bottom' layout='row' layout-align='start center'>
            <div flex class='fs32 fwb'>商品管理</div>
            <div class='color-gray'>发现商品<m-icon xlink='#icon-zuojiantou'></m-icon></div>
        </div>
        <div class='mall-list'>
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

        <navBar></navBar>
    </div>
</template>

<script>
import api_b2bmall from 'services/api.b2bmall';
import navBar from './modules/nav-bar';
export default {
    name: 'index',
    data() {
        return {};
    },
    components: {
        navBar
    },
    mounted() {
        this.query();
    },
    methods: {
        init() {
        },
        async query() {
            let data = {
                query: [
                    {
                        field: 'merchantId',
                        value: this.$store.state.party.merchantId
                    }
                ],
                page: 1,
                size: 20
            };
            await api_b2bmall.searchForWx(data);
        },
        goOrder() {
            this.$router.push({
                name: 'b2b-mall-order',
                params: {
                    id: 6609974358646909
                }
            });
        }
    }
};
</script>

<style scoped lang='less'>
@import '~styles/_agile';

.b2b-mall-index{
    font-size: 13px;
    min-height: 100vh;
    background: @bg-gray;
    .banner1-box{
        height: 90px;
        img{
            width:100%;
            height:100%;
        }
    }
    .banner2-box{
        height: 64px;
        img{
            width:100%;
            height:100%;
        }
    }
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
