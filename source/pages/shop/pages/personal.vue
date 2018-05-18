<template>  
<div class="personal">
   <div class="search-bar-bg" flex>
            <div class="search-bar" layout="row" flex>
        <m-icon xlink="#icon-huabanfuben17" class="fs24" @click="goBack"></m-icon>
        <div flex></div>
        <m-icon xlink="#icon-huabanfuben1" class="fs24"></m-icon> 
            </div>
        </div>
    <div class="container">
          <div class="person" layout="row" layout-align="start center" flex>
              <span class="person-img">
                  <img :src="require('assets/imgs/shop/shop-face.png')" alt="">
              </span>
              <h3>Hi，苏生</h3>
          </div>
          <div class="main-tab" layout-align="start center" layout="row">
             <div v-for="(item,index) in tab" :key="index" :class="item.class" class="item-box" flex="45" @click="loading">
                 <div class="top-name" layout="row" flex layout-align="center center">
                     <span>{{item.name}}</span>
                     <div flex></div>
                     <m-icon xlink="#icon-zuojiantou"></m-icon>
                     </div>
                 <span>{{item.num}}</span>
             </div>
          </div>
          <h3 class="big-title">我的订单</h3>
          <div class="status-tab" layout="row" layout-align="start center" flex>
               <div class="status-item" flex="20" v-for="(item,index) in statusTab" :key="index" layout="column" layout-align="center center" @click="loading">
                   <m-icon :xlink="item.icon"></m-icon>
                   <span>{{item.name}}</span>
               </div>
          </div>
          <div layout="row" flex class="more-option">
              <div @click="loading">
                  <h3 class="big-title">更多功能</h3>
              </div>
              <div flex></div>
              <div @click="loading">
                  地址管理<m-icon xlink="icon-zuojiantou"></m-icon>
              </div>
          </div>
            <shop-bottom-nav active-type="4" class="bottom-nav"></shop-bottom-nav>
            <stop-pages></stop-pages>
    </div>
</div>
   
</template>
<script>
import shopBottomNav from 'components/shop-bottom-nav';
import stopPages from 'components/stop-pages';
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            tab: [
                {
                    name: '我的信息',
                    num: '50',
                    class: 'bg-1'
                },
                {
                    name: '我的美豆豆',
                    num: '3000',
                    class: 'bg-2'
                }
            ],
            statusTab: [
                {
                    name: '待付款',
                    icon: '#icon-huabanfuben6',
                    value: 1
                },
                {
                    name: '待发货',
                    icon: '#icon-huabanfuben11',
                    value: 2
                },
                {
                    name: '待评价',
                    icon: '#icon-huabanfuben9',
                    value: 3
                },
                {
                    name: '已发货',
                    icon: '#icon-huabanfuben8',
                    value: 4
                },
                {
                    name: '售后',
                    icon: '#icon-huabanfuben7',
                    value: 5
                }
            ]
        };
    },
    components: {
        shopBottomNav,
        stopPages
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        loading() {
            Toast('程序猿正在加速开发中，敬请期待...');
        }
    }
};
</script>
<style lang="less">
@import '~styles/_agile';
    .personal{
    .search-bar-bg{
          background:url('~assets/imgs/shop/face-bg.jpg') 100% 100%;
          height: 100px;
          position: relative;
          z-index: 1;
    }
    .search-bar{
        padding: 16px 10px;
        .icon{
            font-size: 20px;
            color: white;
        }
    }
.container{
    padding: 0 15px;
    box-sizing: border-box;
    position: relative;
    z-index: 2;
    .color-7{
        color: #777777;
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
        height: 100%;
        padding-bottom: 50px;
    }
    .person{
        margin-top: -35px;
        margin-bottom: 15px;
        position: relative;
        z-index: 2;
        .person-img{
            width: 100px;
            height: 100px;
            overflow: hidden;
            border-radius: 38px;
            background: #fff;
            margin-right: 10px;
        }
        h3{
            font-size: 16px;
            color:#222;
        }
    }
    .main-tab{
        .item-box{
            box-shadow:1px 0px 0px rgba(129,75,139,0.29);
            border-radius: 7px;
            height: 75px;
            color: white;
            box-sizing: border-box;
            padding: 13px;
            font-size: 16px;
            .top-name{
                .icon{
                    font-size: 16px;
                    color: white;
                }
            }
        }
       .bg-1{
           background: #63569B;
       }
       .bg-2{
           background: #8C4999;
           margin-left: 5%;
       }
       margin-bottom: 27px;
    }
    .big-title{
        font-size: 16px;
        color: #222;
    }
    .status-tab{
        padding-top: 27px; 
        .status-item{
            color: #8D6CB1;
            .icon{
                font-size: 20px;
            }
        }
    }
    .more-option{
       margin-top: 27px;
       padding: 25px 0;
       border-top:1px solid #eee;
       border-bottom:1px solid #eee; 
    }
       }
    }

</style>


