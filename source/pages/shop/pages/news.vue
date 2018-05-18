<template>
    <div class="container news">
        <div class="search-bar">
        <shop-search placeholder="搜产品、分类、内容"></shop-search>
        </div>
        <h3 class="title">资讯</h3>
        <div class="main-container" flex>
            <div class="main-item" v-for="(item,index) in datdaList" :key="index" @click="loading">
            <div class="content-box" layout="row">
                <div class="left-des" flex="65">
                 <h3 class="only-two-line">{{item.title}}</h3>
                 <p class="only-two-line">{{item.des}}</p>
                </div>
                <div class="right-img" flex="30" flex-offset="5">
                    <img :src="item.img" alt="">
                </div>
            </div>
            <div class="bottom-detail" layout="row">
               <div class="person" flex layout="row" layout-align="space-between center">
                   <div class="person-face" layout="row" layout-align="center center">
                    <span class="face-con"><img :src="item.person.face" alt=""></span>
                    <span>{{item.person.name}}</span>
                   </div>
                   <div flex></div>
                   <div class="like-num" :class="{active:item.person.isLike}" layout="row" layout-align="center center" @click="likeClick(item)">
                       <m-icon xlink="#icon-huabanfuben"></m-icon>
                       <span>{{item.person.like}}</span>
                   </div>
               </div>
            </div>
            </div>

        </div>
            <shop-bottom-nav active-type="3" class="bottom-nav"></shop-bottom-nav>
            <stop-pages></stop-pages>
    </div>
</template>
<script>
import shopSearch from 'components/shop-search';
import shopBottomNav from 'components/shop-bottom-nav';
import stopPages from 'components/stop-pages';
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            datdaList: [
                {
                    title: '最前沿的时尚潮流，施华蔻专业2018春夏新季风中国发布会圆满落幕！',
                    des: '5月14日，施华蔻专业在乌镇，举行了2018春夏新季风中国发布会，发布会现场大咖云集。',
                    img: require('assets/imgs/shop/shop-news-4.png'),
                    person: {
                        name: '沈艳茹',
                        face: require('assets/imgs/shop/shop-news-1.png'),
                        like: 2000,
                        isLike: false
                    }
                },
                {
                    title: 'TONI&GUY助阵I.T2018春夏精选时装秀，潮玩太古摩登派对！',
                    img: require('assets/imgs/shop/shop-news-5.png'),
                    des: 'I.T潮牌携手TONI&GUY中国，在5月11日在无数帝都潮人的期待下，上演了2018春夏时装秀。',
                    person: {
                        name: '冯紫萱',
                        face: require('assets/imgs/shop/shop-news-face1.jpg'),
                        like: 2000,
                        isLike: false
                    }
                },
                {
                    title: '王朝刚博士受邀出席第六届亚洲毛发移植大会，脱发的你有救啦！',
                    img: require('assets/imgs/shop/shop-news-6.png'),
                    des: '200余位来自世界各地的毛发移植精英与600余位从事毛发相关的国内专家共同探讨毛发移植最新修复技术。',
                    person: {
                        name: '吉海波',
                        face: require('assets/imgs/shop/shop-news-face2.jpg'),
                        like: 2000,
                        isLike: false
                    }
                },
                {
                    title: '容大生物金纳斯点亮纽约时代广场“世界第一屏”纳斯达克大屏！',
                    img: require('assets/imgs/shop/shop-news-4.png'),
                    des: '中国品牌日当天，深圳市容大生物技术有限公司旗下 " 金纳斯 " 品牌，在纽约时代广场纳斯达克大屏。',
                    person: {
                        name: '丁力',
                        face: require('assets/imgs/shop/shop-news-face3.jpg'),
                        like: 2000,
                        isLike: false
                    }
                },
                {
                    title: '心机嗨趴不间断，双面心机比西安的天气更hot',
                    img: require('assets/imgs/shop/shop-news-5.png'),
                    des: '上周”双面心机染“终于落足火热的古城西安，在这座历史名城中，心机潮流将如何呈现，又将如何接力呢？',
                    person: {
                        name: '李克伟',
                        face: require('assets/imgs/shop/shop-news-face4.jpg'),
                        like: 2000,
                        isLike: false
                    }
                }
            ]
        };
    },
    components: {
        shopSearch,
        shopBottomNav,
        stopPages
    },
    methods: {
        likeClick(item) {
            item.person.isLike = true;
            item.person.like++;
        },
        loading() {
            Toast('程序猿正在加速开发中，敬请期待...');
        }
    }
};
</script>
<style lang="less">
@import '~styles/_agile';
.only-two-line{
    width: 100%;

    word-break: break-all;

    text-overflow: ellipsis;

    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/

    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/

    -webkit-line-clamp: 2; /** 显示的行数 **/

    overflow: hidden;  /** 隐藏超出的内容 **/
}
.container.news{
    padding: 70px 10px 50px 10px;
    background: white;
    position: relative;
    box-sizing: border-box;
    height: 100vh;
    overflow-y: scroll;
    .color-7{
        color: #777777;
    }
    .search-bar{
        position: fixed;
        padding: 0 10px;
        left: 0;
        right: 0;
        top: 0;
        background: white;
        z-index: 999;
    }
    .title{
        font-size: 34px;
        font-weight: normal;
        color: #222;
    }
    .bottom-nav{
        position: fixed;
        z-index: 999;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .main-container{
        position: relative;
        width: 100%;
        .main-item{
            padding: 10px 0;
            border-bottom: 1px solid #eee;
            .content-box{
                padding-bottom: 18px;
                .left-des{
                    h3{
                        font-size: 16px;
                        color: #222;
                    }
                    p{
                        font-size: 12px;
                        color:#aaa;
                    }
                }
                .right-img{
                    height: 100px;
                    border-radius: 10px;
                    overflow: hidden;
                    img{
                        width: 100%;
                        height: auto;
                    }
                }
            }
        }
        .bottom-detail{
            .person{
                .person-face{
                   .face-con{
                       display: block;
                       width: 25px;
                       height: 25px;
                       border-radius: 100%;
                       overflow: hidden;
                       margin-right: 10px;
                   }
                   span{
                       font-size: 12px;
                       color: #aaa;
                   }
                }
                .like-num{
                    color: #aaa;
                    .icon{
                       font-size: 14px;
                    }
                    span{
                        font-size: 12px;
                    }
                }
                .like-num.active{
                    color: #8C5EE5;
                }
            }
        }
    }
}
</style>


