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
                    title: '我是怎么让一个客户一下子办了30张会员卡的',
                    des: '在一个月黑风高的夜晚，浑身疲惫的我决定提前关门回家。这时候进来了一位',
                    img: require('assets/imgs/shop/shop-news-4.png'),
                    person: {
<<<<<<< HEAD
                        name: '苏更生',
=======
                        name: '沈艳茹',
>>>>>>> c269109... fix[美博汇]
                        face: require('assets/imgs/shop/shop-news-1.png'),
                        like: 2000,
                        isLike: false
                    }
                },
                {
                    title: '我是怎么让一个客户一下子办了30张会员卡的',
                    img: require('assets/imgs/shop/shop-news-5.png'),
                    des: '在一个月黑风高的夜晚，浑身疲惫的我决定提前关门回家。这时候进来了一位',
                    person: {
<<<<<<< HEAD
                        name: '苏更生',
                        face: require('assets/imgs/shop/shop-news-1.png'),
=======
                        name: '冯紫萱',
                        face: require('assets/imgs/shop/shop-news-face1.jpg'),
>>>>>>> c269109... fix[美博汇]
                        like: 2000,
                        isLike: false
                    }
                },
                {
                    title: '我是怎么让一个客户一下子办了30张会员卡的',
                    img: require('assets/imgs/shop/shop-news-6.png'),
                    des: '在一个月黑风高的夜晚，浑身疲惫的我决定提前关门回家。这时候进来了一位',
                    person: {
<<<<<<< HEAD
                        name: '苏更生',
                        face: require('assets/imgs/shop/shop-news-1.png'),
=======
                        name: '吉海波',
                        face: require('assets/imgs/shop/shop-news-face2.jpg'),
>>>>>>> c269109... fix[美博汇]
                        like: 2000,
                        isLike: false
                    }
                },
                {
                    title: '我是怎么让一个客户一下子办了30张会员卡的',
                    img: require('assets/imgs/shop/shop-news-4.png'),
                    des: '在一个月黑风高的夜晚，浑身疲惫的我决定提前关门回家。这时候进来了一位',
                    person: {
<<<<<<< HEAD
                        name: '苏更生',
                        face: require('assets/imgs/shop/shop-news-1.png'),
=======
                        name: '丁力',
                        face: require('assets/imgs/shop/shop-news-face3.jpg'),
>>>>>>> c269109... fix[美博汇]
                        like: 2000,
                        isLike: false
                    }
                },
                {
                    title: '我是怎么让一个客户一下子办了30张会员卡的',
                    img: require('assets/imgs/shop/shop-news-5.png'),
                    des: '在一个月黑风高的夜晚，浑身疲惫的我决定提前关门回家。这时候进来了一位',
                    person: {
<<<<<<< HEAD
                        name: '苏更生',
                        face: require('assets/imgs/shop/shop-news-1.png'),
=======
                        name: '李克伟',
                        face: require('assets/imgs/shop/shop-news-face4.jpg'),
>>>>>>> c269109... fix[美博汇]
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


