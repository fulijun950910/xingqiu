<template>
    <div v-title="'美店'" class='b2b-mall-index'>
        <div class="banner1-box">
            <div class="swipe-box">
                <mt-swipe :auto="4000">
                    <mt-swipe-item v-for="item in indexData.topBanner" :key="item.id">
                        <img :src="item.imageId | mSrc2(require('assets/imgs/nullimg.jpg'))" alt="">
                        <!--<img :src="6609984741633299 | mSrc2(require('assets/imgs/nullimg.jpg'))" alt="">-->
                    </mt-swipe-item>
                </mt-swipe>
            </div>
        </div>
        <div class='p-t-4 p-b-4 cell-box bg-white border-bottom' layout='row' layout-align='start center'>
            <div flex class='fs32 fwb'>经营数据</div>
        </div>
        <div class="bg-white p-t-2 p-b-2 text-center" layout="row">
            <div class="p-t-1 p-b-1" flex="33">
                <div class="fwb fs40">{{indexData.yesterdayIncome|fen2yuan}}</div>
                <div class="extra-light-black">昨日收入</div>
            </div>
            <div class="p-t-1 p-b-1 border-left" flex="33">
                <div class="fwb fs40">{{indexData.unVerifyTicketCount}}</div>
                <div class="extra-light-black">待验券</div>
            </div>
            <div class="p-t-1 p-b-1 border-left" flex="33">
                <div class="fwb fs40">{{indexData.waitSuccessGroupCount}}</div>
                <div class="extra-light-black">待成团</div>
            </div>
        </div>
        <!--参与活动-->
        <div class='m-t-3 p-t-4 p-b-4 cell-box bg-white border-bottom' layout='row' layout-align='start center'>
            <div flex class='fs32 fwb'>参与活动</div>
        </div>
        <div class="bg-white cell cell-box">
            <div layout="row">
                <div flex>预售商品销售金额</div>
                <div class="fs28">¥{{indexData.currentSellMoney | fen2yuan}}</div>
            </div>
            <div class="m-t-1 text-right extra-light-black fs24">
                <span v-if="toProfit > 0">还差{{toProfit | fen2yuan}}元赚回仪器的钱啦加油！</span>
                <span v-else>您的收入已经足够您购买仪器啦</span>
            </div>
        </div>

        <div @click="goBannerUrl" class="m-t-3 banner2-box">
            <img :src="indexData.midBanner.imageId | mSrc2(require('assets/imgs/nullimg.jpg'))" alt="">
        </div>
        <!--商品管理-->
        <div class='m-t-3 bg-white border-bottom' layout='row' layout-align='start center'>
            <div flex class='fs32 fwb p-t-4 p-b-4 cell-box'>商品管理</div>
            <div @click="goCollect" class='extra-light-black p-t-4 p-b-4 cell-box'><m-icon class="color-primary" link='icon-xingzhuang1'></m-icon> 发现商品</div>
        </div>
        <div class='mall-list' >
            <div v-for="item in indexData.mallSellList" :key="item.id" class='mall-item bg-white cell-box'>
                <div class='cell' layout='row'>
                    <!--<div class="mall-tag">2000人正在卖</div>-->
                    <div flex></div>
                    <div>
                        <span v-if="item.status == '1'" class="color-gray">草稿</span>
                        <span v-if="item.status == '2'" class="color-primary">上架中</span>
                        <span v-if="item.status == '3'" class="color-gray">已下架</span>
                    </div>
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
                    <div @click="goShowView(item)" class="btn-item">查看</div>
                    <div @click="goOrder(item)" class="btn-item">采购</div>
                    <div @click="showShare(item)" class="btn-item">分享</div>
                    <div @click="showBtnBox(item)" class="btn-item">
                        <div class="btn-item-icon-box" layout="row" layout-align="center center">
                            <m-icon class="fs48"  link="icon-more"></m-icon>
                        </div>
                        <div v-if="item.showBtnBox" class="btn-fixed">
                            <div layout="row">
                                <div @click="disshelvePromotion(item)" v-if="item.status == '2'" class="btn-fixed-item" layout="row" layout-align="center center">
                                    <div>
                                        <div class="icon-box" layout="column" layout-align="center center">
                                            <m-icon link="icon-xiajia"></m-icon>
                                        </div>
                                        <div class="m-t-1 extra-black">下架</div>
                                    </div>
                                </div>
                                <div  @click="goCollectDetail(item)" v-if="item.status == '3'" class="btn-fixed-item" layout="row" layout-align="center center">
                                    <div>
                                        <div class="icon-box" layout="column" layout-align="center center">
                                            <m-icon link="icon-fabuicon"></m-icon>
                                        </div>
                                        <div class="m-t-1 extra-black">上架</div>
                                    </div>
                                </div>
                                <div @click="goCollectDetail(item)" class="btn-fixed-item" layout="row" layout-align="center center">
                                    <div>
                                        <div class="icon-box" layout="column" layout-align="center center">
                                            <m-icon class="m-l-1"  link="icon-bianji1"></m-icon>
                                        </div>
                                        <div class="m-t-1 extra-black">编辑</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="!indexData.mallSellList || indexData.mallSellList.length < 1" class="cell cell-box text-center extra-light-black">暂未采集商品。</div>
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
        <navBar></navBar>
    </div>
</template>

<script>
import Vue from 'vue';
import {
    Swipe,
    SwipeItem,
    InfiniteScroll
} from 'mint-ui';

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.use(InfiniteScroll);
import qrcode from 'components/qrcode';
import api_b2bmall from 'services/api.b2bmall';
import navBar from './modules/nav-bar';
import HtmlCuter from 'plugin/HtmlCuter';
import mLoadMore from 'components/m-load-more';
export default {
    name: 'index',
    data() {
        return {
            indexData: {
                midBanner: {}
            },
            mallPrice: 1000000, // todo
            shareData: {},
            popImg: null,
            groupShareUrl: '',
            isShowShare: false
        };
    },
    computed: {
        // 最终支付金额
        toProfit() {
            return this.mallPrice - this.indexData.currentSellMoney;
        }
    },
    components: {
        navBar,
        mLoadMore,
        qrcode
    },
    mounted() {
        if (this.$knife.getPermission('purchase_mall_setting')) {
            this.init();
        } else {
            window.history.back();
        }
    },
    methods: {
        async init() {
            let data = {
                merchantId: this.$store.state.party.merchantId
            };
            this.$indicator.open();
            let res = await api_b2bmall.getPurchaseMerchantIndexInfo(data);
            this.$indicator.close();
            this.indexData = res.data;
            this.indexData.mallSellList.forEach(item => {
                this.$set(item, 'showBtnBox', false);
            });
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
        async disshelvePromotion(item) {
            this.$messageBox.confirm('确认下架？').then(async action => {
                this.$indicator.open();
                await api_b2bmall.disshelvePromotion(item.typeId);
                this.$indicator.close();
                item.status = 3;
                this.$toast('已下架');
            });
        },
        async showShare(item) {
            this.popImg = null;
            this.$indicator.open();
            let result = await api_b2bmall.getPromotionView({ id: item.typeId });
            result.data.promotionInstance.originPrice = 0;
            result.data.promotionInstance.minPrice = Number.POSITIVE_INFINITY;
            result.data.promotionInstance.promotionRuleGroup.promotionRuleGroupContentExts.forEach(function(item) {
                result.data.promotionInstance.originPrice += item.itemPrice;
            });
            result.data.promotionInstance.promotionRuleGroup.promotionRuleGroupExts.forEach(function(item) {
                result.data.promotionInstance.minPrice = Math.min(result.data.promotionInstance.minPrice, item.sellingPrice);
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
        showBtnBox(item) {
            this.indexData.mallSellList.forEach(cell => {
                if (item.id != cell.id) {
                    cell.showBtnBox = false;
                }
            });
            if (item.showBtnBox) {
                item.showBtnBox = false;
            } else {
                item.showBtnBox = true;
            }
        },
        goCollect() {
            window.location.href = '/lite/index.html#/b2b';
        },
        goCollectDetail(item) {
            window.location.href = `/lite/index.html#/collect-goods/${item.supplierItemId}/${item.typeId}`;
        },
        goBannerUrl() {
            window.location.href = this.indexData.midBanner.url;
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
    .banner1-box{
        padding: 10px;
        .swipe-box{
            height: 90px;
            width: 355px;
            padding: 0;
            position:relative;
            border-radius: 4px;
            overflow: hidden;
            img {
                width: 100%;
                height: 100%;
            }
        }

    }
    .banner2-box{
        height: 70px;
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
                position: relative;
                width:75px;
                padding: 2px 0;
                background: @white;
                border-radius:2px;
                border:1px solid #ccc;
                text-align:center;
                .btn-item-icon-box{
                    max-height:18px;
                }
            }
            .btn-fixed{
                position: absolute;
                bottom: 26px;
                right:0;
                padding: 12px 0;
                background: #fff;
                box-shadow:0px 3px 8px 0px rgba(49,77,83,0.28);
                border-radius: 2px;
                .btn-fixed-item{
                    width: 100px;
                    padding: 2px 0;
                    &:not(:first-child) {
                        border-left: 1px solid #eee;
                    }
                }
                .icon-box{
                    width: 30px;
                    height: 30px;
                    border-radius: 15px;
                    border: 1px solid #f5f5f5;
                    padding: 2px;
                    font-size: 20px;
                    color: @extra-black;
                }
                &:before{
                    width: 12px;
                    height: 12px;
                    background: #fff;
                    content: "";
                    display: inline-block;
                    position: absolute;
                    right: 12px;
                    bottom: -6px;
                    transform: rotate(45deg);
                    box-shadow:3px 3px 2px 0px rgba(49,77,83,0.28);

                }
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
        z-index: 2;
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
