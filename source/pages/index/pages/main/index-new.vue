<template>
<div class="new-index" v-title="'美问星球'">
    <div class="direction">
        <div class="fs68 p-t-4 p-b-4 color-black fwb p-l-4 p-r-4">发现</div>
        <div layout="row" layout-align="start center" class="p-l-4 p-r-4 m-b-4">
            <div flex="20" layout="column" layout-align="center center" v-for="(item, index) in menu" :key="index" class="menu">
                <img :src="item.src" alt="">
                <span class="extra-light-black fs24 m-t-2">{{item.name}}</span>
            </div>
        </div>
        <div class="banner">
            <swiper :options="swiperOption">
                <swiper-slide v-for="(item, index) in bannerList" :key="index">
                    <img :src="item.image | nSrc(require('assets/imgs/female.png'))" alt="">
                </swiper-slide>
            </swiper>
        </div>
        <div class="break-line" flex></div>
        <div class="bbs-list p-l-4 p-r-4" flex>
            <div class="fs40 color-black fwb qiu-title">星球课题</div>
            <div layout="row" layout-align="start center" class="bbs-menu">
                <div class="p-r-3 p-b-4 item m-r-2" v-for="(item, index) in bbsMenu" :key="index" @click.stop="choosePart(item)" :class="{'active': item.id == parameter.forumId}">
                    <span class="fs28 color-gray">{{item.name}}</span>
                    <i class="line"></i>
                </div>
            </div>
            <div class="list">
                <div class="list-box p-b-3 m-t-2" v-for="(item, index) in dataList" :key="index">
                    <div flex class="only-two-line fwb color-black fs34 m-b-3">{{item.subject}}</div>
                    <div layout="row" layout-align="start start" class="m-b-2">
                        <div flex="70" class="only-three fs28 extra-light-black">{{item.description}}</div>
                        <div flex="30">
                            <div class="img-con">
                                <img :src="item.attachment | imgDetail(require('assets/imgs/female.png'))" alt="">
                            </div>
                        </div>
                    </div>
                    <div layout="row" layout-align="space-between center" class="p-t-2">
                    <div layout="row" layout-align="start cneter" class="color-gray fs24">
                        <!-- <div>{{item.author}}</div>&nbsp;&nbsp; -->
                        <div>{{item.dateline | amCalendar('YYYY-MM-DD')}}</div>&nbsp;&nbsp;|&nbsp;&nbsp;
                        <div>{{item.views | bigNumber}}热度</div>
                    </div>
                    <div layout="row">
                        <m-icon xlink="#icon-gengduoicon" class="fs34 color-pink"></m-icon>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Vue from 'vue';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
Vue.use(VueAwesomeSwiper);
import api_party from 'services/api.party';
export default {
    data() {
        return {
            employee: this.$store.state,
            menu: [
                {
                    name: '美豆豆',
                    src: require('assets/imgs/index/icon-img1.png')
                },
                {
                    name: '美博汇',
                    src: require('assets/imgs/index/icon-img2.png')
                },
                {
                    name: '美问美答',
                    src: require('assets/imgs/index/icon-img3.png')
                },
                {
                    name: '店务助手',
                    src: require('assets/imgs/index/icon-img4.png')
                },
                {
                    name: '异业共赢',
                    src: require('assets/imgs/index/icon-img5.png')
                }
            ],
            bbsMenu: [],
            dataList: [],
            parameter: {
                page: 1,
                pageSize: 10,
                partyId: this.$store.state.party.partyId,
                forumId: ''
            },
            bannerList: [],
            swiperOption: {
                slidesPerView: 2,
                spaceBetween: 20
            }
        };
    },
    methods: {
        loadBbsMenu() {
            api_party.bbsForumList(this.employee.party.partyId, this.employee.party.id).then(msg=> {
                this.bbsMenu = msg.data;
                this.parameter.forumId = this.bbsMenu[0].id;
                this.loadData();
            });
        },
        choosePart(item) {
            this.parameter.forumId = item.id;
            this.loadData();
        },
        loadData() {
            api_party.loadBBSMessage(this.parameter).then(msg=> {
                this.dataList = msg.data;
            }, msg=> {
            });
        },
        loadBanner() {
            let partyId = '0';
            if (this.$store.state) {
                if (this.$store.state.party) {
                    partyId = this.$store.state.party.id;
                }
            }
            api_party.listBanner('00001', partyId).then(msg=> {
                this.bannerList = msg.data;
                console.log(this.bannerList);
            }, msg=> {
            });

        },
        init() {
            // 加载bbs菜单
            this.loadBbsMenu();
            // 加载banner
            this.loadBanner();
        }
    },
    mounted() {
        this.init();
    }
};
</script>

<style lang="less" scoped>
    @import '~styles/_style';
    .new-index{
        .only-three{
             width: 100%;
             word-break: break-all;
             text-overflow: ellipsis;
             display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
             -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
             -webkit-line-clamp: 3; /** 显示的行数 **/
             overflow: hidden;  /** 隐藏超出的内容 **/
        }
        width: 100vw;
        .direction{
            background: white;
        }
        .menu{
            img{
                width: 35px;
                height: auto;
            }
        }
        .banner{
            height: 135px;
            width: 100%;
            overflow: hidden;
            .swiper-container{
                height: 110px;
                width: 100%;
                 img{
                height: 100%;
                width: auto;
            }
            }
        }
        .qiu-title{
            padding: 20px 0;
        }
        .break-line{
            height: 10px;
            background: #f8f8f8;
        }
        .bbs-menu{
            border-bottom: 1px solid @border-gay;
            overflow-x:scroll;
            ::-webkit-scrollbar{
                display:none;
                }
            .item{
                flex: none;
                position: relative;
                .line{
                    position: absolute;
                    width: 40px;
                    bottom: -1px;
                    left: 2px;
                    border-bottom:3px solid @color-pink;
                    height: 3px;
                    z-index: 1;
                    opacity: 0;
                    transition: all ease .4s;
                }
            }
            .item.active{
                span{
                   color: @color-black;
                }
                .line{
                    opacity: 1;
                }
            }
        }
        .bbs-list{
            width: 100%;
        }
        .list{
            .list-box{
                border-bottom: 1px solid @border-gay;
                .img-con{
                    height: 70px;
                    width: 105px;
                    position: relative;
                    overflow: hidden;
                    border-radius: 10px;
                    img{
                        width: 248px;
                        height: 140px;
                        position: absolute;
                        margin-left: 50%;
                        left: -124px;
                        top:50%;
                        margin-top: -70px;
                    }
                }
            }
        }
    }

</style>

