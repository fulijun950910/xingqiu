<template>
<div class="new-index" v-title="'美问星球'" v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
    <div class="direction">
        <div class="p-t-4 p-b-4  p-l-4 p-r-4" layout="row" layout-align="space-between center">
            <div  class="fs48 color-black fwb">发现</div>
        </div>
        <div layout="row" layout-align="start center" flex class="m-b-4">
            <div flex="20" layout="column" @click="linkTo(item.value)" layout-align="center center" v-for="(item, index) in menu" :key="index" class="menu">
                <img :src="item.src" alt="">
                <span class="extra-light-black fs24 m-t-1">{{item.name}}</span>
            </div>
        </div>
        <div class="banner p-l-3">
            <swiper :options="swiperOption" ref="swiperOption" v-if="bannerList && bannerList.length">
                <swiper-slide v-for="(item, index) in bannerList" :key="index">
                    <img :src="item.image | nSrc(require('assets/imgs/location.jpg'))" :mwsrc="item.image" alt="">
                </swiper-slide>
            </swiper>
            <div class="swiper-pagination p-l-3 p-r-3"></div>
        </div>
        <div class="break-line" flex></div>
    </div>
    <div class="bbs-list p-l-4 p-r-4" flex>
        <div class="qiu-title" layout="row" layout-align="space-between center">
            <div class="fs40 color-black fwb">星球课题</div>
            <div v-if="state != 2">
                <div class="sign-on color-white fs28" @click="linkTo(6)" layout="row" layout-align="start center">&nbsp;&nbsp;&nbsp;&nbsp;签到</div>
            </div>
        </div>
        <div layout="row" layout-align="start center" class="bbs-menu m-b-4">
            <div class="p-r-2 p-b-4 item m-r-2" v-for="(item, index) in bbsMenu" :key="index" @click.stop="choosePart(item)" :class="{'active': item.id == parameter.forumId}">
                <span class="fs28 color-gray">{{item.name}}</span>
                <i class="line"></i>
            </div>
        </div>
        <div class="list m-b-3" :class="{'list-min-h' : iconCircleMenu}">
            <div class="list-box p-b-3 m-t-2" v-for="(item, index) in dataList" :key="index">
                <div flex class="only-two-line fwb color-black fs34 m-b-3" @click="bbsIn(item)">{{item.subject}}</div>
                <div layout="row" layout-align="start start" class="m-b-2" @click="bbsIn(item)">
                    <div flex="70" class="only-three fs28 extra-light-black">{{item.description}}</div>
                    <div flex="30">
                        <div class="img-con">
                            <img :src="item.attachment | imgDetail(require('assets/imgs/index/501657390978523645.jpg'))" alt="">
                        </div>
                    </div>
                </div>
                <div layout="row" layout-align="space-between center" class="p-t-2">
                    <div layout="row" layout-align="start cneter" class="color-gray fs24">
                        <!-- <div>{{item.author}}</div>&nbsp;&nbsp; -->
                        <div>{{item.dateline | amCalendar('YYYY-MM-DD')}}</div>&nbsp;&nbsp;|&nbsp;&nbsp;
                        <div>{{item.views | bigNumber}}热度</div>
                    </div>
                    <div layout="row" @click.stop="showCollect(index)">
                        <m-icon link="icon-gengduoicon" class="fs34 color-pink"></m-icon>
                    </div>
                    <div class="collect" layout="row" layout-align="center center" @click.stop="collectEdite(item, index)" :class="{'like' : item.isFavorite , 'show' : item.collect}">
                        <m-icon link="icon-arrLeft-fill" class="fs40 sanjiao color-white"></m-icon>
                        <div class="extra-light-black fs30">
                            <m-icon link="icon-huodong" class="fs30"></m-icon>&nbsp;{{item.isFavorite ? '取消' : '收藏'}}
                        </div>
                    </div>
                    <div class="collect-mask" v-if="item.collect" @click.stop="showCollect(index)"></div>
                </div>
            </div>
            <div flex class="p-t-2 p-b-2 text-center light-gray" v-if="scrollDisabled"> 我是有底线的哦~</div>
        </div>
    </div>
    <new-present :show-mask="isNew" :ads-detail="adsDetail" @hideMask="hideMask"></new-present>
    <div class="main-menu" layout="row" layout-align="start stretch">
        <div flex="50" layout="column" layout-align="center center" class="extra-light-black">
            <m-icon link="icon-huaban6" class="color-pink fs48"></m-icon>
            <span class="fs24">首页</span>
        </div>
        <div flex="50" layout="column" layout-align="center center" class="fs28 extra-light-black" @click="linkTo(7)">
            <m-icon link="icon-huaban1" class="fs48"></m-icon>
            <span class="fs24">我的</span>
        </div>
    </div>
    <div class="qiu-title-fixed" v-if="iconCircleMenu">
        <div class="qiu-title m-l-3 m-r-3" layout="row" layout-align="space-between center">
            <div class="fs40 color-black fwb">星球课题</div>
            <div class="circle-menu" layout="row" layout-align="center center">
                <div class="circle-icon" layout="row" layout-align="center center" @click="showCircleMenu">
                    <m-icon class="color-white fs40" link="icon-gengduoliebiaoicon"></m-icon>
                </div>
            </div>
        </div>
        <div layout="row" layout-align="start center" class="bbs-menu p-l-3 p-r-3">
            <div class="p-r-2 p-b-4 item m-r-2" v-for="(item, index) in bbsMenu" :key="index" @click.stop="choosePart(item, 1)" :class="{'active': item.id == parameter.forumId}">
                <span class="fs28 color-gray">{{item.name}}</span>
                <i class="line"></i>
            </div>
        </div>
            <div class="circle-menu-mask" @click="showCircleMenu" v-if="circleMenu"></div>
    <div class="circle-menu-list" layout="row" layout-align="center center" v-if="circleMenu" :style="circleMenuStyle">
        <m-icon link="icon-arrLeft-fill" class="color-white"></m-icon>
        <div flex="20" layout="column" @click="linkTo(item.value)" layout-align="center center" v-for="(item, index) in menu" :key="index" class="menu">
            <img :src="item.src" alt="">
            <span class="extra-light-black fs24 m-t-2">{{item.name}}</span>
        </div>
    </div>
    </div>
    <div v-if="state == 1">
        <div class="sign-on color-white fs28" @click="linkTo(6)" layout="row" layout-align="start center">&nbsp;&nbsp;&nbsp;&nbsp;签到</div>
    </div>

    <div class="toTop" @click="goTop" v-if="showGoTop" layout="row" layout-align="center center">
        <m-icon link="icon-zhiding1" class="fs32 color-white"></m-icon>
    </div>
</div>
</template>

<script>
import Vue from 'vue';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import { InfiniteScroll } from 'mint-ui';
import 'swiper/dist/css/swiper.css';
Vue.use(VueAwesomeSwiper);
Vue.use(InfiniteScroll);
import api_party from 'services/api.party';
import newPresent from 'components/new-present';
import $ from 'jquery';
export default {
    data() {
        return {
            isNew: false,
            adsDetail: {},
            employee: this.$store.state,
            state: 2,
            lastDay: { continueDays: 0 },
            circleMenu: false,
            circleMenuTop: 0,
            showGoTop: false,
            circleMenuStyle: {},
            menu: [
                {
                    name: '美豆豆',
                    src: require('assets/imgs/index/icon-img1.png'),
                    value: 1

                },
                {
                    name: '美博汇',
                    src: require('assets/imgs/index/icon-img2.png'),
                    value: 2
                },
                {
                    name: '美问美答',
                    src: require('assets/imgs/index/icon-img3.png'),
                    value: 3
                },
                {
                    name: '店务助手',
                    src: require('assets/imgs/index/icon-img4.png'),
                    value: 4
                },
                {
                    name: '美店',
                    src: require('assets/imgs/index/icon-img5.png'),
                    value: 8
                }
            ],
            bbsMenu: [],
            dataList: [],
            parameter: {
                page: 1,
                pageSize: 10,
                // partyId: this.$store.state.party.partyId,
                forumId: ''
            },
            bannerList: [],
            swiperOption: {
                slidesPerView: 1.4,
                spaceBetween: 10,
                loop: true,
                centeredSlides: true,
                autoplay: {
                    delay: 2000
                },
                speed: 300,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                on: {
                    tap: this.bannerClick
                }
            },
            loading: false,
            scrollDisabled: false,
            collect: '',
            iconCircleMenu: false
        };
    },
    methods: {
        loadBbsMenu() {
            this.$indicator.open();
            let partyId = '0';
            let id = '0';
            if (this.employee && this.employee.party) {
                partyId = this.employee.party.partyId;
                id = this.employee.party.id;
            };
            api_party.bbsForumList(partyId, id).then(msg => {
                this.$indicator.close();
                this.bbsMenu = msg.data;
                this.parameter.forumId = this.bbsMenu[0].id;
                this.loadData();
            });
        },
        choosePart(item, type) {
            this.parameter.forumId = item.id;
            this.loadData('', type);
        },
        loadData(type, data) {
            if (!type) {
                this.resetData();
            };
            if (this.scrollDisabled) {
                return;
            };
            if (this.loading) {
                return;
            }
            this.$indicator.open();
            api_party.loadBBSMessage(this.parameter).then(msg => {
                this.$indicator.close();
                if (msg.data.length < this.parameter.pageSize) {
                    this.scrollDisabled = true;
                } else {
                    this.scrollDisabled = false;
                }
                msg.data.map((item, index) => {
                    item.collect = false;
                });
                this.dataList = this.dataList.concat(msg.data);
                this.loading = false;
                this.parameter.page++;
            }, msg => {
            });
        },
        resetData() {
            this.parameter.page = 1;
            this.scrollDisabled = false;
            this.loading = false;
            this.dataList = [];
        },
        loadBanner() {
            let partyId = '0';
            if (this.$store.state) {
                if (this.$store.state.party) {
                    partyId = this.$store.state.party.id;
                }
            }
            this.$indicator.open();
            api_party.listBanner('00001', partyId).then(msg => {
                this.$indicator.close();
                this.bannerList = msg.data;
                this.swiperOption.loopedSlides = this.bannerList.length;
            }, msg => {
            });
        },
        loadMore() {
            this.loadData(1);
        },
        linkTo(type) {
            switch (type) {
                case 1:
                // 玩转豆豆
                    window.location.href = '/api/b2bPromotionMobile/oauthURI/rule_entry';
                    break;
                case 2:
                // b2b商城
                    // if (this.checkB2bMall()) {
                    //     return;
                    // };
                    window.location.href = '/lite/index.html#/b2b';
                    // window.location.href = '/api/b2bPromotionMobile/oauthURI/b2b';
                    break;
                case 3:
                // 美问美答
                    // this.$router.push({name: 'bbsPage'});
                    let url = '';
                    if (this.$enviroment == 'production') {
                        url += 'http://bbs.mei1.info/forum.php';
                    } else {
                        url += 'http://bbs.test.mei1.info/forum.php';
                    };
                    location.href = url;
                    break;
                case 4:
                // 店务助手
                    if (this.checkParty()) {
                        return;
                    };
                    if (this.$store.state.merchant) {
                        let fv = this.$store.state.merchant.functionVersion;
                        if (fv === 7) {
                            this.$toast('抱歉,您无权限进入');
                            return;
                        }
                    }
                    window.location.href = '/api/b2bPromotionMobile/oauthURI/performance_report';
                    break;
                case 5:
                // 异业共赢
                    this.$router.push({ name: 'alliance' });
                    break;
                case 6:
                //  签到
                    if (this.checkParty()) {
                        return;
                    };
                    if (!this.$store.state || !this.$store.state.party || !this.$store.state.party.partyId) {
                        window.location.href = this.prototype.$signLocation;
                    };
                    window.location.href = '/api/b2bPromotionMobile/oauthURI/star_day_sign';
                    break;
                case 7:
                // 个人中心
                    window.location.href = '/api/b2bPromotionMobile/oauthURI/star_personal';
                    break;
                case 8:
                // b2b美店
                    if (this.checkB2bMall()) {
                        return;
                    };
                    window.location.href = '/api/b2bPromotionMobile/oauthURI/b2b_mall_index';
                    break;
            }
        },
        checkParty() {
            if (this.$store.getters.isPersonLogin) {
                this.$toast('抱歉，个人用户，无权限进入');
                return true;
            }
        },
        checkB2bMall() {
            if (this.$store.getters.isLogin) {
                if (!this.$knife.getPermission('purchase_mall_setting')) {
                    this.$toast('抱歉，无权限进入');
                    return true;
                };
            }
        },
        checkSignIn() {
            this.$indicator.open();
            api_party.listLastUserSign(this.$store.state.party.partyId).then(res => {
                this.$indicator.close();
                if (res.data && res.data.length > 0) {
                    this.lastDay = res.data[res.data.length - 1];
                    if (this.lastDay.todayDate === this.lastDay.signDate) {
                        this.state = 2;
                    }
                } else {
                    this.state = 1;
                }
            });
        },
        bbsIn(item) {
            location.href = item.url;
        },
        showCollect(index) {
            // item.collect = !item.collect;
            this.dataList[index].collect = !this.dataList[index].collect;
            // let point = this.dataList[index].collect;
            // this.$set(this.dataList[index].collect, point);
        },
        collectEdite(item, index) {
            // 1添加收藏 2取消收藏
            let type = item.isFavorite ? 2 : 1;
            let partyId = '0';
            if (this.$store.state && this.$store.state.party) {
                partyId = this.$store.state.party.partyId;
            }
            let parameter = {
                partyId: partyId,
                tid: item.tid
            };
            this.$indicator.open();
            api_party.favorite(parameter, type).then(msg => {
                this.$indicator.close();
                let text = type == 2 ? '取消收藏' : '添加收藏';
                this.$toast(text);
                let tempDataList = JSON.parse(JSON.stringify(this.dataList));
                tempDataList[index].isFavorite = !tempDataList[index].isFavorite;
                tempDataList[index].collect = false;
                this.dataList = tempDataList;
            }, msg => {
            });
        },
        hideMask() {
            this.isNew = false;
            let tempLocal = JSON.parse(localStorage.getItem('employee'));
            tempLocal.party.newUser = false;
            localStorage.setItem('employee', JSON.stringify(tempLocal));
            this.$store.state.party.newUser = false;
        },
        saveUserInfo() {
            let employee = localStorage.getItem('employee');
            if (!employee) {
                employee = '{}';
            }
            employee = JSON.parse(employee);
            if (this.$knife.keyGetValue(window.location.search, 'openid')) {
                employee.openId = this.$knife.keyGetValue(window.location.search, 'openid');
            }
            localStorage.setItem('employee', JSON.stringify(employee));
        },
        scroll() {
            // 显示圆圈菜单
            if ($(window).scrollTop() >= this.circleMenuTop) {
                this.iconCircleMenu = true;
            } else {
                this.iconCircleMenu = false;
            }
            // 显示点击跳转顶部
            if ($(window).scrollTop() >= $(window).height()) {
                this.showGoTop = true;
            } else {
                this.showGoTop = false;
            };
        },
        goTop() {
            $('html,body').animate({
                scrollTop: 0
            }, 300);
        },
        showCircleMenu(e) {
            this.circleMenu = !this.circleMenu;
            if (this.circleMenu) {
                this.circleMenuStyle = {
                    top: e.y + 45 + 'px'
                };
            };
        },
        bannerClick(evt) {
            let item = this.bannerList.find(val => val.image === evt.target.getAttribute('mwsrc'));
            if (item && item.url) {
                if (item.code == 'home_banner_005') {
                    if (this.checkB2bMall()) {
                        return;
                    };
                }
                if (item.url.indexOf('html') > -1) {
                    window.location.href = item.url;
                } else {
                    this.$router.push(item.url);
                };
            }
        },
        init() {
            this.saveUserInfo();
            // 加载banner
            this.loadBanner();
            // 监听滑动事件
            this.circleMenuTop = $('.qiu-title').offset().top;
            window.addEventListener('scroll', this.scroll);
            if (this.$store.state && this.$store.state.party) {
                this.parameter.partyId = this.$store.state.party.partyId;
                this.checkSignIn();
            } else {
                this.parameter.partyId = '0';
            }
            // 加载bbs菜单
            this.loadBbsMenu();
            if (this.$store.state.party && this.$store.state.party.adsList && this.$store.state.party.adsList.length) {
                this.isNew = true;
                this.adsDetail = this.$store.state.party.adsList[0];
                if (this.adsDetail.code == 'home_001') {
                };
            };
        }
    },
    mounted() {
        this.init();
    },
    components: {
        newPresent
    }
};
</script>

<style lang="less">
    @import '~styles/_agile';
    .new-index {
      margin-bottom: 80px;
      position: relative;
      .toTop {
          position: fixed;
          width: 44px;
          height: 44px;
          background: rgba(0,0,0,.4);
          right: 15px;
          bottom: 80px;
          z-index: 10;
          border-radius: 100%;
      }
      .circle-menu {
        //   position: fixed;
        //   right: 10px;
        //   top:20px;
          z-index: 20;
      }
      .circle-icon {
          z-index: 2;
          width: 44px;
          height: 44px;
          border-radius: 100%;
          background: @color-pink;
          opacity: .9;
      }
      .circle-menu-list {
          position: fixed;
          height: 105px;
          background: white;
          z-index: 12;
          border-radius: 7px;
          left: 10px;
          right: 10px;
          .icon {
              position: absolute;
              top: -38px;
              right: 0;
              font-size: 70px;
          }
      }
      .circle-menu-mask {
          position: fixed;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          background: rgba(0, 0, 0, .6);
          z-index: 11;
      }
      .main-menu {
          position: fixed;
          left: 0;
          right: 0;
          z-index: 10;
          height: 60px;
          bottom: 0;
          background: white;
          border-top: 1px solid @light-gray;
      }
      width: 100%;
      .only-three {
          width: 100%;
          word-break: break-all;
          text-overflow: ellipsis;
          display: -webkit-box;
          /** 对象作为伸缩盒子模型显示 **/
          -webkit-box-orient: vertical;
          /** 设置或检索伸缩盒对象的子元素的排列方式 **/
          -webkit-line-clamp: 3;
          /** 显示的行数 **/
          overflow: hidden;
          /** 隐藏超出的内容 **/
      }
      width: 100vw;
      .direction {
          background: white;
      }
      .menu {
          img {
              width: 40px;
              height: auto;
          }
      }
      .banner {
          position: relative;
           height: 140px;
           .swiper-slide {
 width: 67%;
 position: relative;
               img {
                   border-radius: 5px;
               }
           }
          .swiper-pagination {
              text-align: left;
              position: absolute;
              bottom: 10px;
              .swiper-pagination-bullet {
                  width: 20px;
                  margin-right: 5px;
                  height: 2px;
                  border-radius: 0;
                  background: @border-gay;
              }
              .swiper-pagination-bullet-active {
                  background: @extra-shadow;
              }
          }
      }
      .qiu-title {
          padding: 20px 0;
          box-sizing: border-box;
        //   width: 100%;
          overflow: hidden;
          position: relative;
      }
      .sign-on {
          width: 100px;
          height: 34px;
          right: -50px;
          top: 42%;
          background: url('~assets/imgs/index/sign-to-bg.png') no-repeat left;
          background-size: auto 100%;
          box-shadow: 0 5px 8px 0 rgba(17, 80, 169, 0.24);
          border-radius: 50px;
          position: fixed;
          z-index: 9;
      }
      .break-line {
          height: 10px;
          background: #f8f8f8;
      }
      .bbs-menu {
          border-bottom: 1px solid @border-gay;
          overflow-x: scroll;
          overflow-y: hidden;
          ::-webkit-scrollbar {
              display: none;
          }
          .item {
              flex: none;
              position: relative;
              .line {
                  position: absolute;
                  width: 40px;
                  bottom: -1px;
                  left: 2px;
                  border-bottom: 3px solid @color-pink;
                  height: 3px;
                  z-index: 1;
                  opacity: 0;
                  transition: all ease .4s;
              }
          }
          .item.active {
              span {
                  color: @color-black;
              }
              .line {
                  opacity: 1;
              }
          }
      }
      .bbs-list {
          width: 100%;
      }
      .list {
          .list-box {
              border-bottom: 1px solid @border-gay;
              position: relative;
              .img-con {
                  height: 70px;
                  width: 105px;
                  position: relative;
                  overflow: hidden;
                  border-radius: 10px!important;
                  img {
                      width: 248px;
                      height: 140px;
                      position: absolute;
                      margin-left: 50%;
                      left: -124px;
                      top: 50%;
                      margin-top: -70px;
                  }
              }
              .collect {
                  width: 0;
                  height: 0;
                  transition: all ease .3s;
                  opacity: 0;
                  position: absolute;
                  display: none;
                  right: 0;
                  border-radius: 10px;
                  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, .2);
                  bottom: -40px;
              }
              .show {
                  opacity: 1;
                  width: 86px;
                  height: 45px;
                  z-index: 2;
                  background: white;
                  z-index: 2;
                  display: flex;
                  .sanjiao {
                      position: absolute;
                      top: -5px;
                      right: -5px;
                  }
              }
              .like {
                  div {
                      .icon {
                          color: @color-pink;
                      }
                      color: @color-pink;
                  }
              }
              .collect-mask{
                  position: fixed;
                  left: 0;
                  right: 0;
                  top: 0;
                  bottom: 0;
                  z-index: 1;
              }
          }
      }
                .list-min-h{
              min-height: 500px;
          }
  }

  .no-scroll {
      overflow: hidden;
  }
  .over-hidden{
      overflow: hidden;
  }
  .bbs-fixed {

  }
  .qiu-title-fixed{
      position: fixed!important;
      top:0;
      left: 0;
      right: 0;
      background: white;
      z-index: 10;
  }

  .swiper-mask{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 10;
  }

</style>
