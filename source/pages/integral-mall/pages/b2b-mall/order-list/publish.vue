<template>
    <div class="b2b-mall-order-list-publish">
        <div class='mall-list p-t-3'>
            <div v-for="item in mallList" :key="item.id" class='mall-item bg-white cell-box'>
                <div class='cell' layout='row'>
                    <!--<div class="mall-tag">2000人正在卖</div>-->
                </div>
                <div class="bg-default cell p-l-1 p-r-1" layout="row">
                    <img class="title-img m-r-2" :src="item.imageId | mSrc2(require('assets/imgs/nullimg.jpg'))" alt="">
                    <div class="mall-content" flex layout="column">
                        <div flex>
                            <div class="no-wrap">{{item.title}}</div>
                            <!--<div class="color-gray fs12">规格 大型60cm *1</div>-->
                        </div>
                        <div layout="row">
                            <div flex>团购价: ¥{{item.minPrice | fen2yuan}} - ¥{{item.maxPrice | fen2yuan}}</div>
                            <div>销量 {{item.sellCount}}</div>
                        </div>
                    </div>
                </div>
                <div class="btn-box" layout='row' layout-align='space-between center'>
                    <div @click="goShowView(item)" class="btn-item">预览</div>
                    <div @click="goCollectDetail(item)" class="btn-item">编辑</div>
                    <div @click="showShare(item)" class="btn-item">分享</div>
                    <div @click="goOrder(item)" class="btn-item">采购</div>
                </div>
            </div>
        </div>
        <div class="fix-box" v-if="isShowShare" @click="isShowShare = false">
            <div class="color-white fs40 cell text-right close-box" ><m-icon link="icon-guanbiicon"></m-icon></div>
            <div @click.stop="" id="downloadBox" v-if="!popImg" class="share-box text-center color-white">
                <div class="container">
                    <img class="img1" :src="require('assets/imgs/b2b-mall/activity-c-t1.png')" alt="">
                    <div class="text-box1 fs24 color-white">多人团拼，尽享优惠</div>
                    <div class="img2">
                        <img :src="shareData.promotionInstance.promotionRuleGroup.titleImages[0] | mSrc2(require('assets/imgs/nullimg.jpg'))" alt="">
                    </div>
                    <div class="text-box2 fs24">{{shareData.promotionInstance.title}}</div>
                </div>
                <div class="text-box3 fs32">¥{{shareData.promotionInstance.minPrice | fen2yuan}}！<s class="fs24">{{shareData.promotionInstance.originPrice | fen2yuan}}</s></div>
                <div class="text-box4 text-left" layout="row" layout-align="start center">
                    <span>{{shareData.merchantName}}</span>
                </div>
                <div class="qrcode-img">
                    <qrcode :link="shareData.promotionInstance.shortLink"></qrcode>
                </div>
                <div class="fs20">长按扫码查看活动</div>
                <div class="fs20">名额先到先得</div>
            </div>
            <img @click.stop="" class="share-box-img" v-else :src="popImg" alt=""/>
            <div @click.stop="" layout="row" layout-align="center center"  class="share-tip-box">
                <m-icon class="fs40 color-8C76AD m-r-2" link="icon-xiazaitupianicon"></m-icon>
                <div>长按图片保存</div>
                <m-icon class="fs48 color-eee m-l-3 m-r-3" link="icon-web__bitebiyoujiantou"></m-icon>
                <m-icon class="fs40 color-8C76AD m-r-2" link="icon-weixinicon"></m-icon>
                <div>分享到微信</div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import {
    InfiniteScroll
} from 'mint-ui';

Vue.use(InfiniteScroll);
import qrcode from 'components/qrcode';
import api_b2bmall from 'services/api.b2bmall';
import HtmlCuter from 'plugin/HtmlCuter';

export default {
    name: 'publish',
    data() {
        return {
            mallList: [],
            shareData: {},
            popImg: null,
            groupShareUrl: '',
            isShowShare: false
        };
    },
    components: {
        qrcode
    },
    mounted() {
        this.loadData();
    },
    methods: {
        async loadData() {
            let data = {
                merchantId: this.$store.state.party.merchantId
            };
            this.$indicator.open();
            let res = await api_b2bmall.getPurchaseMallSellList(data);
            this.mallList = res.data.mallSellList;
            this.$indicator.close();
        },
        goOrder(item) {
            this.$router.push({
                name: 'b2b-mall-order',
                params: {
                    id: item.supplierItemId
                }
            });
        },
        async goShowView(item) {
            this.$indicator.open();
            let res = await api_b2bmall.getPromotionView({ id: item.typeId });
            this.$indicator.close();
            location.href = res.data.promotionInstance.shortLink;
        },
        async showShare(item) {
            this.popImg = null;
            this.$indicator.open();
            let result = await api_b2bmall.getPromotionView({ id: item.typeId });
            result.data.promotionInstance.originPrice = 0;
            result.data.promotionInstance.minPrice = Number.POSITIVE_INFINITY;
            result.data.promotionInstance.promotionRuleGroup.promotionRuleGroupContentExts.forEach(function(item) {
                result.data.promotionInstance.originPrice += item.itemPrice;
                result.data.promotionInstance.minPrice = Math.min(result.data.promotionInstance.minPrice, item.itemPrice);
            });
            this.shareData = result.data;
            this.isShowShare = true;
            setTimeout(() => {
                HtmlCuter.htmlToCanvas(document.querySelector('#downloadBox'), img => {
                    this.$indicator.close();
                    this.popImg = img;
                });
            }, 800);
        },
        goCollectDetail(item) {
            window.location.href = `/lite/index.html#/collect-goods/${item.purchaseMallItemId}`;
        }
    }
};
</script>

<style scoped lang='less'>
@import '~styles/_agile';

.b2b-mall-order-list-publish{
    @color-primary: #854399;
    .color-primary {
        color: @color-primary;
    }
    .color-8C76AD{
        color:#8C76AD;
    }
    .color-eee{
        color:#eee;
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
    .fix-box{
        position:fixed;
        width:100vw;
        height:100vh;
        top: 0;
        left:0;
        background: rgba(0,0,0,0.8);
        z-index: 2000;
    }
    .close-box{
        width:250px;
        margin: 0 auto;
    }
    .share-box-img{
        width:250px;
        height: 440px;
        margin: 0 auto;
        display: block;
    }
    .share-box{
        width:250px;
        height: 440px;
        padding: 0 15px;
        box-sizing: border-box;
        background:url('~assets/imgs/b2b-mall/poster-bg-01.jpg') top center no-repeat;
        background-size: 100.2% 100.2%;
        margin: 0 auto;
        .container{
            margin: 0 11px;
        }
        .img1{
            width: 150px;
            margin-top: 40px;
        }
        .text-box1 {
            margin: 6px 0 23px;
        }
        .img2{
            width: 200px;
            height: 100px;
            border-radius: 4px;
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .text-box2{
            height: 40px;
            margin: 5px 0;
            text-align: left;
        }
        .text-box3{
            width:170px;
            height: 20px;
            background:url('~assets/imgs/b2b-mall/poster-price-bg-01.png') no-repeat;
            background-size: 100% 100%;
            margin-left: -6px;
        }
        .text-box4{
            height: 32px;
            background:url('~assets/imgs/b2b-mall/poster-01-merchant.png') top left no-repeat;
            background-size: auto 100%;
            box-sizing: border-box;
            padding-left: 30px;
            margin-left: -4px;
            margin-top: 4px;
            font-size: 12px;
        }
        .qrcode-img{
            padding: 2px;
            background:#fff;
            box-sizing: content-box;
            width:40px;
            height: 40px;
            margin: 10px auto 4px;
        }
    }
    .share-tip-box{
        height: 80px;
        position:absolute;
        bottom:0;
        left:0;
        background: #fff;
        width: 100%;
    }
}
</style>
