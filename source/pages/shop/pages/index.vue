<template>
    <div class="main-container index">
        <div class="search-bar" flex>
           <shop-search placeholder="搜产品、分类、内容"></shop-search>
        </div>
        <div class="tab" layout="row" layout-align="center center">
                <div v-for="(item,index) in tabList" @click="tabClick(item)" :class="{active:checkTab==item.value}" :key="item.value" class="tab-item">
                    <span class="color-7 fs14">{{item.name}}</span>
                </div>
        </div>
        <div class="list-container">
           <div class="box" v-for="(item,index) in dataList" :key="item.id">
               <div class="img-big">
                   <img :src="item.img" alt="">
               </div>
               <div class="main-des">
                   <h3 class="color-2 no-break">{{item.title}}</h3>
                   <h4 class="color-7 no-break">{{item.subTitle}}</h4>
                   <div layout="row" layout-align="start center" class="des-bottom">
                       <div class="customer" layout="row" layout-align="start center">
                           <div class="face">
                               <img :src="item.face" alt="">
                           </div>                           
                           <span class="color-2 fs16 no-break">{{item.customerName}}</span>
                       </div>
                       <div flex></div>
                       <div class="like" layout="row" layout-align="start center"  @click="likeClick(item)">
                           <m-icon :class="{active:item.likeClick}" xlink="#icon-huabanfuben"></m-icon>
                           <span>{{item.like}}</span>
                       </div>
                   </div>
               </div>
           </div>
        </div>
                <shop-bottom-nav active-type="1" class="bottom-nav"></shop-bottom-nav>
    </div>
</template>
<script>
import api_shop from 'services/api.shop';
import shopSearch from 'components/shop-search';
import shopBottomNav from 'components/shop-bottom-nav';
export default {
    name: 'index',
    components: {
        api_shop,
        shopSearch,
        shopBottomNav
    },
    data() {
        return {
            keyword: '',
            tabList: [
                {
                    name: '新手开店',
                    value: '1'
                },
                {
                    name: '大咖共享',
                    value: '2'
                },
                {
                    name: '精选',
                    value: '3'
                },
                {
                    name: '低价采集',
                    value: '4'
                },
                {
                    name: '行业动向',
                    value: '5'
                }
            ],
            checkTab: 1,
            dataList: [
                {
                    img: require('assets/imgs/shop/test-img1.png'),
                    title: '如何种凤凰尾巴的睫毛',
                    subTitle: '最科学的方法，亲测有效~',
                    face: require('assets/imgs/shop/test-img1.png'),
                    customerName: '小狐狸',
                    like: '2000',
                    id: '1',
                    likeClick: false
                },
                {
                    img: require('assets/imgs/shop/test-img2.png'),
                    title: '如何种凤凰尾巴的睫毛',
                    subTitle: '最科学的方法，亲测有效~',
                    face: require('assets/imgs/shop/test-img1.png'),
                    customerName: '小狐狸',
                    like: '2000',
                    id: '2',
                    likeClick: false
                },
                {
                    img: require('assets/imgs/shop/test-img3.png'),
                    title: '如何种凤凰尾巴的睫毛',
                    subTitle: '最科学的方法，亲测有效~',
                    face: require('assets/imgs/shop/test-img1.png'),
                    customerName: '小狐狸',
                    like: '2000',
                    id: '3',
                    likeClick: false
                },
                {
                    img: require('assets/imgs/shop/test-img4.png'),
                    title: '如何种凤凰尾巴的睫毛',
                    subTitle: '最科学的方法，亲测有效~',
                    face: require('assets/imgs/shop/test-img1.png'),
                    customerName: '小狐狸',
                    like: '2000',
                    id: '4',
                    likeClick: false
                },
                {
                    img: require('assets/imgs/shop/test-img4.png'),
                    title: '如何种凤凰尾巴的睫毛',
                    subTitle: '最科学的方法，亲测有效~',
                    face: require('assets/imgs/shop/test-img1.png'),
                    customerName: '小狐狸',
                    like: '2000',
                    id: '1',
                    likeClick: false
                },
                {
                    img: require('assets/imgs/shop/test-img3.png'),
                    title: '如何种凤凰尾巴的睫毛',
                    subTitle: '最科学的方法，亲测有效~',
                    face: require('assets/imgs/shop/test-img1.png'),
                    customerName: '小狐狸',
                    like: '2000',
                    id: '2',
                    likeClick: false
                },
                {
                    img: require('assets/imgs/shop/test-img2.png'),
                    title: '如何种凤凰尾巴的睫毛',
                    subTitle: '最科学的方法，亲测有效~',
                    face: require('assets/imgs/shop/test-img1.png'),
                    customerName: '小狐狸',
                    like: '2000',
                    id: '3',
                    likeClick: false
                },
                {
                    img: require('assets/imgs/shop/test-img1.png'),
                    title: '如何种凤凰尾巴的睫毛',
                    subTitle: '最科学的方法，亲测有效~',
                    face: require('assets/imgs/shop/test-img1.png'),
                    customerName: '小狐狸',
                    like: '2000',
                    id: '4',
                    likeClick: false
                }
            ]
        };
    },
    mounted() {},
    methods: {
        search() {
            console.log(this.keyword);
        },
        tabClick(item) {
            this.checkTab = item.value;
        },
        goBack() {
            this.$router.go(-1);
        },
        likeClick(item) {
            item.likeClick = true;
            item.like++;
        }
    }
};
</script>

<style lang="less">
@import '~styles/_agile';
.main-container.index{
    padding: 0 10px;
    padding-top: 70px;
    background: white;
    position: relative;
    .search-bar{
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        background: white;
        padding: 0 10px;
    }
    .color-7{
        color: #777;
    }
    .color-2{
        color: #222;
    }
    .no-break{
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
    }

    // tab
    .tab{
        width: 100%;
        overflow-x: scroll;
         border-bottom: 1px solid #EEEEEE;
        .tab-item{
            padding: 10px 0;
            border-bottom: 1px solid #fff;
            margin: 0 10px;
        }
        .tab-item.active{
            border-bottom: 1px solid #8C5EE5;
            span{
                color: #8C5EE5;
            }
        }
    }
    // list
    .list-container{
        column-count: 2;
        column-gap: 0;
        .box{
            break-inside: avoid;
            box-sizing: border-box;
            padding: 10px;
            .img-big{
                width: 100%;
                overflow-x: hidden;
                img{
                    width: 100%;
                    height: auto;
                }
            }
            .main-des{
                font-style: normal;
                font-weight: normal;
                h3{
                    font-size: 14px;
                }
                h4{
                    margin: 0;
                    font-size: 12px;
                }
                .des-bottom{
                  .customer{
                      .face{
                          width: 20px;
                          height: 20px;
                          overflow: hidden;
                          border-radius: 100%;
                          margin-right: 10px;
                          img{
                              width: 100%;
                              height: auto;
                          }
                      }
                      span{
                         font-size: 12px;
                         width: 40px;
                      }
                      
                  }
                  .like{
                       .icon{
                           font-size: 16px;
                       }
                       .icon.active{
                           color: #9261F0;
                       }
                  }
                }
            }
        }
    }
    .bottom-nav{
        position: fixed;
        left: 0;
        bottom: 0;
        right: 0;
    }

}
</style>



