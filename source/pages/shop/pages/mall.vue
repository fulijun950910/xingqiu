<template>
    <div class="container mall">
        <div class="search-bar">
        <shop-search placeholder="搜产品、分类、内容"></shop-search>
        </div>
        <h3 class="title">商城</h3>
        <div class="main-container" layout="row">
             <div class="left-menu" flex="25">
                 <div class="tab-item" @click="selectMenu(item)" :class="{active:item.active == item.value}" v-for="(item,index) in tabList" :key="item.value" layout="column" layout-align="center center">
                              <m-icon :xlink="item.icon" class="fs24 color-7"></m-icon>
                              <span class="color-7">{{item.name}}</span>
                 </div>
             </div>
             <div class="right-container" flex="75">
                  <div class="top-banner">
                      <img :src="require('assets/imgs/shop/shop-mail1.png')" alt="">
                  </div>
                  <div class="main-content">
                      <div class="content-box" v-for="(item,index) in mainContent" :key="index" @click="loading">
                            <div class="content-title" layout="row" layout-align="center center">
                                <i></i>&nbsp;&nbsp;{{item.title}}&nbsp;&nbsp;<i></i></div>
                            <div class="content-item" layout="row" flex-wrap="wrap" layout-align="center center">
                                <div flex="30" v-for="(detail,detailIndex) in item.data" :key="detailIndex" class="text-center item-data">
                                      <span class="img-con">
                                          <img :src="detail.img" alt="">
                                      </span>
                                      <span class="des">{{detail.name}}</span>
                                </div>
                                   
                            </div>
                      </div>
                  </div>
             </div>
        </div>
            <shop-bottom-nav active-type="2" class="bottom-nav"></shop-bottom-nav>
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
            tabList: [
                {
                    name: '美甲',
                    value: 1,
                    icon: '#icon-huabanfuben21',
                    active: 1
                },
                {
                    name: '美瞳',
                    value: 2,
                    icon: '#icon-huabanfuben22',
                    active: 1
                },
                {
                    name: '美发',
                    value: 3,
                    icon: '#icon-huabanfuben23',
                    active: 1
                },
                {
                    name: '美容',
                    value: 4,
                    icon: '#icon-huabanfuben20',
                    active: 1
                },
                {
                    name: 'SPA',
                    value: 5,
                    icon: '#icon-huabanfuben24',
                    active: 1
                },
                {
                    name: '耗品',
                    value: 6,
                    icon: '#icon-huabanfuben25',
                    active: 1
                }
            ],
            mainContent: [
                {
                    title: '发现兴趣',
                    data: [
                        {
                            name: '亮片',
                            img: require('assets/imgs/shop/shop-mail2.png')
                        },
                        {
                            name: '珍珠',
                            img: require('assets/imgs/shop/shop-mail3.png')
                        },
                        {
                            name: '镶钻',
                            img: require('assets/imgs/shop/shop-mail4.png')
                        }
                    ]
                },
                {
                    title: '热门选择',
                    data: [
                        {
                            name: '亮片',
                            img: require('assets/imgs/shop/shop-mail2.png')
                        },
                        {
                            name: '珍珠',
                            img: require('assets/imgs/shop/shop-mail3.png')
                        },
                        {
                            name: '镶钻',
                            img: require('assets/imgs/shop/shop-mail4.png')
                        },
                        {
                            name: '亮片',
                            img: require('assets/imgs/shop/shop-mail5.png')
                        },
                        {
                            name: '高光',
                            img: require('assets/imgs/shop/shop-mail6.png')
                        },
                        {
                            name: '珍珠',
                            img: require('assets/imgs/shop/shop-mail7.png')
                        },
                        {
                            name: '镶钻',
                            img: require('assets/imgs/shop/shop-mail8.png')
                        },
                        {
                            name: '亮片',
                            img: require('assets/imgs/shop/shop-mail9.png')
                        },
                        {
                            name: '镶钻',
                            img: require('assets/imgs/shop/shop-mail8.png')
                        }
                    ]
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
        selectMenu(item) {
            item.active = item.value;
            this.tabList.map((item1, index1) => {
                if (item1 != item) {
                    item1.active = 0;
                }
            });
        },
        loading() {
            Toast('程序猿正在加速开发中，敬请期待...');
        }
    }
};
</script>
<style lang="less">
@import '~styles/_agile';
.container.mall{
    padding: 70px 10px 50px 10px;
    background: white;
    position: relative;
    box-sizing: border-box;
    height: 100vh;
    overflow-y: hidden;
    .color-7{
        color: #777777;
    }
    .search-bar{
        position: fixed;
        padding: 0 10px;
        left: 0;
        right: 0;
        top: 0;
    }
    .title{
        font-size: 34px;
        font-weight: normal;
        color: #222;
    }
    .bottom-nav{
        position: absolute;
        z-index: 999;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .main-container{
        position: relative;
        width: 100%;
        height: 100%;
        padding-bottom: 50px;
        border:1px solid #eee;
        border-radius: 5px;
        .left-menu{
            position: relative;
            width: 100px;
            overflow-y: scroll;
            height: 100%;
            background: #F7F7F7;
            .tab-item{
                padding: 15px 0;
                border-left: 2px solid #fff;
                .icon{
                    font-size: 24px;
                    margin-bottom: 13px;
                }
                span{
                    font-size: 12px;
                }
            }
            .tab-item.active{
                border-left: 2px solid #8C5EE5;
                background: #fff;
                .icon{
                    color: #8C5EE5;
                }
                span{
                    color: #8C5EE5;
                }
            }
        }
        .right-container{
            height: 100%;
            overflow-y: scroll;
            .top-banner{
                height: 90px;
                width: 100%;
                margin: 13px 0;
                margin-bottom:23px;
                overflow: hidden;
                border-radius: 10px;
                img{
                    height: auto;
                    width: 100%;
                }
            }
            .main-content{
            }
        }
        .content-box{
           .content-title{
               color: #aaa;
               font-size: 12px;
               i{
                   width: 50px;
                   height: 1px;
                   background: #eee;
               }
           }
           .content-item{
               margin: 22px 0;
               .item-data{
                   .img-con{
                       display: block;
                       margin: 0 auto;
                       width: 50px;
                       height: 50px;
                       overflow: hidden;
                       border-radius: 100%;
                       border:1px solid #eee;
                       img{
                           width: 100%;
                           height: auto;
                       }
                   }
                   .des{
                       font-size: 12px;
                       color: #222;
                   }
               }
           }
        }
    }
}
</style>


