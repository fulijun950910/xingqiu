<template>
    <div class="news-detail">
          <detail-top class="top-nav"></detail-top>
          <div class="container">
          <h3 class="news-title no-wrap font-color-2">如何做个好看的指甲</h3>
          <div class="sub-person" layout="row" layout-align="start center">
             <div class="sub-person-left" layout="row" layout-align="start center">
                 <div class="face">
                     <img :src="require('assets/imgs/shop/shop-news-1.png')" alt="">
                 </div>
                 <div class="sub-person-des">
                     <h4 class="font-color-2">美甲专家</h4>
                     <p class="no-wrap">专注于美甲行业的大师</p>
                 </div>
             </div>
             <div flex></div>
             <div class="sub-person-right">
                 <div class="circle text-center">
                     关注
                 </div>
             </div>
          </div>
          <div class="peragraph">
              <p>不知不觉我们迎接了2017，紧接着就是百花齐放春天的到来!为了迎接这充满朝气的季节，也为自己的指甲换上新装吧!</p>
                 <img :src="require('assets/imgs/shop/news-detail-1.png')" alt="">
              <p>从娇美的干燥花、2017 代表色Greenery、到依然红得火热的玫瑰金设计，下列10种 2017 春夏指甲彩绘灵感，你一定能从当中找到最适合自己的设计，新的一年就尝试这些</p>
              <img :src="require('assets/imgs/shop/news-detail-2.png')" alt="">
              <p>新装吧!不知不觉我们迎接了2017，紧接着就是百花齐放春天的到来!为了迎接这充满朝气的季节，也为自己的指甲换上新装吧!从娇美的干燥花、2017 代表色Greenery、到依然红得火热的玫瑰金设计，下列10种 2017 春夏指甲彩绘灵感，你一定能从当中找到最适合自己的设计，新的一年就尝试这些新装吧!、</p>
          </div>
          <div class="vie-message" layout="row">
            <div class="time">05-10</div>
            <div flex></div>
            <div class="view-detail" layout="row" layout-align="start center">
                <span><m-icon link="icon-huabanfuben"></m-icon>2.1万</span>
                <span><m-icon link="icon-duanxin"></m-icon>2870</span>
            </div>
          </div>
          <div class="note">
              <div class="note-title" layout="row" layout-align="start center">
                   <h3 class="font-color-2">评论</h3>
                   <div flex></div>
                   <div class="num-views">共3900条评论<m-icon link="icon-zuojiantou"></m-icon></div>
              </div>
              <div class="notes-detail" layout="row" layout-align="start start" v-for="(item,index) in notes" :key="index">
                     <div class="face">
                         <img :src="item.face" alt="">
                     </div>
                     <div class="notes-words" flex>
                         <h3>{{item.name}}</h3>
                         <div class="notes-text">
                             <div class="text font-color-2">
                                 {{item.text}}
                             </div>
                             <div class="text-bottom" layout="row" layout-align="start center">
                                 <div class="time">{{item.time}}</div>
                                 <div flex></div>
                                 <div class="right-btn" layout="row" layout-align="start center">
                                     回复 <span><m-icon link="icon-dianzan"></m-icon>{{item.like}}</span>
                                 </div>
                             </div>
                         </div>
                         <div class="sub-detail">
                             <div class="notes-detail" v-for="(sub,subIndex) in item.subNotes" :key="subIndex">
                                 <div layout="row" layout-align="start center" class="sub-face">
                                   <div class="face">
                                    <img :src="sub.face" alt="">
                                       </div>
                                    <h3>{{sub.name}}</h3>
                                 </div>
                                  <div class="notes-words" flex>
                         <div class="notes-text">
                             <div class="text">
                                 {{sub.text}}
                             </div>
                             <div class="text-bottom" layout="row" layout-align="start center">
                                 <div class="time">{{sub.time}}</div>
                                 <div flex></div>
                                 <div class="right-btn" layout="row" layout-align="start center">
                                     回复 <span><m-icon link="icon-dianzan"></m-icon>{{sub.like}}</span>
                                 </div>
                             </div>
                         </div>

                     </div>
              </div>
              <div class="total-notes" v-if="item.subNotes.length > 1">共299条回复</div>
                         </div>

                     </div>
              </div>
          </div>
                        <div class="more-notes text-center">
                  <p>查看全部2000条评论<m-icon link="icon-zuojiantou"></m-icon></p>
              </div>
          </div>
          <detail-bottom class="bottom-nav" @tabClick="tabClick"></detail-bottom>
          <shop-goods @mClose="closeGoods" :is-show="goods"></shop-goods>
          <stop-pages></stop-pages>
    </div>
</template>
<script>
import detailTop from 'components/detail-top';
import detailBottom from 'components/detail-bottom';
import shopGoods from 'components/shop-goods';
import stopPages from 'components/stop-pages';
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            goods: false,
            notes: [
                {
                    face: require('assets/imgs/shop/shop-news-face1.jpg'),
                    name: '胖子微微',
                    text: '我也好想有这样的指甲。不过如果单个人买的话，价格还是很高的。不知道有没人和我一起拼啊，我做团长啦',
                    time: '05-10',
                    like: 450,
                    subNotes: [
                        {
                            face: require('assets/imgs/shop/shop-news-face2.jpg'),
                            name: '胖子微微',
                            text: '这个主意很棒啊，你要买多少呢？一起拼的话只要拼够5个就只要19元',
                            time: '05-10',
                            like: 450
                        },
                        {
                            face: require('assets/imgs/shop/shop-news-face3.jpg'),
                            name: '胖子微微',
                            text: '算我一个吧',
                            time: '05-10',
                            like: 450
                        }
                    ]
                },
                {
                    face: require('assets/imgs/shop/shop-news-face4.jpg'),
                    name: '胖子微微',
                    text: '算我一个吧',
                    time: '05-10',
                    like: 450,
                    subNotes: [
                        {
                            face: require('assets/imgs/shop/shop-news-face1.jpg'),
                            name: '胖子微微',
                            text: '求老师翻牌。不过如果单个人买的话，价格还是很高的。不知道有没人和我一起拼啊，我做团长啦',
                            time: '05-10',
                            like: 450
                        },
                        {
                            face: require('assets/imgs/shop/shop-news-face3.jpg'),
                            name: '胖子微微',
                            text: '求老师翻牌。不过如果单个人买的话，价格还是很高的。不知道有没人和我一起拼啊，我做团长啦',
                            time: '05-10',
                            like: 450
                        }
                    ]
                },
                {
                    face: require('assets/imgs/shop/shop-news-face4.jpg'),
                    name: '胖子微微',
                    text: '我也好想有这样子的指甲。颗如果单个人买的话，价格会和高的。不知道有没有人和我一起拼啊，我做团长啦。',
                    time: '05-10',
                    like: 450,
                    subNotes: []
                }
            ]
        };
    },
    components: {
        detailTop,
        detailBottom,
        shopGoods,
        stopPages
    },
    mounted: {

    },
    methods: {
        closeGoods() {
            this.goods = !this.goods;
        },
        tabClick(val) {
            switch (val) {
                case 1:
                    this.loading();
                    break;
                case 2:
                    this.loading();
                    break;
                case 3:
                    this.closeGoods();
                    break;
            }
        },
        loading() {
            Toast('程序猿正在加速开发中，敬请期待...');
        }
    }
};
</script>
<style lang="less">
.news-detail {
    .font-color-2{
        color: #222;
    }
    .container{
    padding: 40px 15px 50px 15px;
    padding-bottom: 50px;
    .peragraph{
        p{
            line-height: 24px;
        }
        img{
            margin: 25px 0;
        }
    }
    .news-title{
       font-size: 22px;
       font-weight: 400;
    }
    .sub-person{
        padding: 14px;
        .sub-person-left{
            .face{
                width: 35px;
                height: 35px;
                overflow: hidden;
                border-radius: 100%;
                border: 1px solid #eee;
                margin-right: 10px;
                img{
                    width: 100%;
                    height: auto;
                }
            }
            .sub-person-des{
                h4{
                   padding: 0;
                   margin: 0;
                   font-size: 14px;
                   font-weight: 400;
                   margin-bottom: 7px;
                }
                p{
                    font-size: 12px;
                    color: #777;
                    width: 120px;
                }
            }
        }
        .sub-person-right{
               .circle{
                   border-radius: 7px;
                   border: 1px solid #8C5EE5;
                   width: 50px;
                   height: 22px;
                   font-size: 12px;
                   color: #8C5EE5;
               }
        }
    }
    .more-notes{
        border-top: 1px solid #eee;
        padding: 25px 0;
        p{
            font-size: 14px;
            color: #aaa;
        }
    }
    }
    .vie-message{
          font-size: 12px;
          color: #aaa;
          padding: 36px 0;
          border-bottom: 1px solid #eee;
          .view-detail{
              span{
                  margin-right: 20px;
              }
          }
          .icon{
              margin-right: 5px;
          }
    }
    .note{
        padding-top: 25px;
        .note-title{
            h3{
                font-size: 16px;
            }
            .num-views{
                color: #aaa;
                font-size: 12px;
            }
            padding-bottom: 30px;
        }
        .notes-detail{
            margin-bottom: 20px;
            .face{
                width: 35px;
                height: 35px;
                overflow: hidden;
                border-radius: 100%;
            }
            .notes-words{
                padding-left: 15px;
                h3{
                    font-size: 14px;
                    color: #777;
                }
                .notes-text{
                    .text-bottom{
                        padding: 12px 0;
                        color: #aaa;
                        font-size: 12px;
                        .right-btn{
                            span{
                                margin-left: 20px;
                                .icon{
                                    font-size: 16px;
                                }
                            }
                        }
                    }
                    .text{
                        font-size: 15px;
                        line-height: 24px;
                    }
                }
            }
        }
        .note-bottom-lin{
            border-bottom: 1px solid #aaa;
        }
        .sub-detail{
            padding: 0 10px 0 10px;
            background: rgba(249,249,249,1);
            .sub-face{
                padding: 5px 0;
            }
               .notes-detail{
                   margin-bottom: 10px;
                   .face{
                       margin-right: 10px;
                   }
                   .notes-words{
                       padding-left: 0;
                   }
               }
            .total-notes{
               color: #5A8DEA;
               font-size: 13px;
               padding: 0 0 10px 0;
               .icon{
                   font-size: 18px;
               }
            }
        }
    }
}
.top-nav{
  position: fixed;
  top:0;
  left: 0;
  right: 0;
  z-index: 99;
}
.bottom-nav{
   position: fixed;
   bottom:0;
   left: 0;
   right: 0;
   z-index: 99;
}
</style>
