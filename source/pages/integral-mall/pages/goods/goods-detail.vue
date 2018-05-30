<template>
    <div class="goods-detail">
    <div class="top-bar">
      <detail-top></detail-top>
      <div class="top-bg"><img :src="require('assets/imgs/shop/top-nav-bg.png')" alt=""></div>
    </div>
    <div class="main-banner">
        <img :src="require('assets/imgs/shop/goods-detail-main.png')" alt="">
    </div>
        <div class="product-text">
       <h3>日本顶级磨砂甲油</h3>
       <p>来自日本的顶级原料，营造磨砂的高级质感，环保材料。</p>
       <div class="price">
           <h4>￥9.9</h4>
           <span>￥69.9</span>
       </div>
       <div class="sale-line" layout="column">
           <div class="line-rank">
               <div class="jindu">
                   <div class="jindu-des">
                       <m-icon xlink="#icon-xiaosanjiaoup"></m-icon>
                       已有700件被认购
                   </div>
               </div>
           </div>
           <div layout="row" layout-align="start center" class="line-text">
               <span>0</span>
               <div flex></div>
               <span>1000件成团</span>
           </div>
       </div>
    </div>
    <div class="product-con">
         <img :src="require('assets/imgs/shop/good-detail-lone-1.png')" alt="">
        <img :src="require('assets/imgs/shop/good-detail-lone.png')" alt="">
    </div>
  <shop-buy-nav></shop-buy-nav>
  <stop-pages></stop-pages>
    </div>
</template>
    
<script>
import detailTop from 'components/detail-top';
import shopBuyNav from 'components/shop-buy-nav';
import stopPages from 'components/stop-pages';
export default {
    data() {
        return {

        };
    },
    components: {
        detailTop,
        shopBuyNav,
        stopPages
    }

};
</script>
<style lang="less">
.goods-detail{
    .top-bar{
        position: fixed;
        top:0;
        left: 0;
        right: 0;
        z-index: 99;
        .detail-top{
            background: none;
            z-index: 99;
            position: relative;
        }
         .top-bg{
            position: absolute;
            z-index: 95;
            top:0;
            width: 100%;
        }
    }
    .main-banner{
        z-index: 98;
        position: relative;
        height: 350px;
        overflow: hidden;
        img{
            width: 100%;
            height: auto;
        }
    }
            .product-text{
            padding: 30px 15px;
            border-top: 1px solid #eee;
            border-bottom: 1px solid #eee;
            h3{
                font-size: 16px;
                color: #222;
            }
            p{
                color: #777;
                font-size: 12px;
                margin-bottom: 30px;
            }
            .price{
                margin-bottom: 10px;
                h4{
                    margin: 0;
                    font-size: 34px;
                    color: #E65391;
                    font-weight: 400;
                    padding: 0;
                    margin-bottom: 9px;
                    line-height: 18px;
                }
                span{
                    font-size: 14px;
                    color: #AAAAAA;
                    text-decoration:line-through;
                }
            }
            .sale-line{
                .line-rank{
                    height: 15px;
                    border-radius: 7px;
                    background: #ECE8FF;
                    position: relative;
                    .jindu{
                          display: block;
                          position: absolute;
                          left: 0;
                          height: 100%;
                          bottom: 0;
                          right: 0;
                          border-radius: 7px;
                          background: #63569B;
                          width: 40%;
                          .jindu-des{
                              position: absolute;
                              bottom:-40px;
                              right: -10%;
                              background: #8C5EE5;
                              color: white;
                              font-size: 12px;
                              border-radius: 5px;
                              padding: 5px;
                              .icon{
                                  position: absolute;
                                  font-size: 20px;
                                  top: -12px;
                                  right: 15px;
                                  color: #8C5EE5;
                              }
                          }
                    }
                }
                .line-text{
                    span{
                        font-size: 12px;
                        color: #aaa;
                    }
                }
            }
        }
    .product-con{
        padding: 0 15px 50px 15px;
        img{
            width: 100%;
            height: auto;
        }
    }
}
</style>


