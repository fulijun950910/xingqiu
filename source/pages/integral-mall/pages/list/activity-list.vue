<template>
    <div class="activity-list" v-title="title">
     <div class="banner">
         <img :src="require('assets/imgs/integral-mall/activity-list-min.png')" alt="">
         <div class="text">
         <div class="fs50 color-white">
             {{bannerDes.title}}
         </div>
         <div class="color-white fs30">{{bannerDes.subTitle}}</div>
         </div>
     </div>
     <div class="activity-list-con">
         <div class="activity-box" v-for="(item,index) in dataList" :key="index" @click="useTo(item)">
             <div class="activity-img">
                   <img class="img-auto" :src="item.image | nSrc(require('assets/imgs/location.jpg'))" alt="">
             </div>
             <div class="activity-describle">
                 <p class="fwb fs34 color-black">{{item.name}}</p>
                 <span class="fs24 color-gray only-two-line">{{item.description}}</span>
             </div>
             <div class="box-bottom" layout="row" layout-align="space-between center">
                 <span class="fs30 color-pink fwb">{{item.price | fen2dou}}美豆豆</span>
                 <div class="btn fs30 color-white text-center"> 
                     兑换
                 </div>
             </div>
         </div>
         <div class="no-more"></div>
         <integral-confirm :confirmText="confirm" @hideConfirm="hideConfirm" @integraConfirm="inteconfirm"></integral-confirm>   
     </div>
    </div>
</template>

<script>
import api_party from 'services/api.party';
import $ from 'jquery';
import { Indicator } from 'mint-ui';
import integralConfirm from 'components/integral-mall/integral-confirm';
export default {
    data() {
        return {
            employee: JSON.parse(localStorage.getItem('employee')),
            dataList: [],
            doudouBalance: 0,
            confirm: {},
            type: 1,
            title: '美问星球',
            bannerDes: {}
        };
    },
    components: {
        integralConfirm
    },
    methods: {
        loadData() {
            Indicator.open('loading...');
            api_party.goodsList(this.$route.params.type).then(msg=> {
                Indicator.close();
                this.dataList = msg.data;
            }, msg=> {

            });

        },
        useTo(item) {
            if (this.$store.state) {
                console.log($(window).scrollTop());
                this.$store.state.scroll = $(window).scrollTop();
                this.$store.commit('UPDATE_LOCAL');
            };
            if (this.$route.params.type == 5 && item.priceType == 1) {
                this.$router.push(`/application-form/${item.id}`);
            } else if (this.$route.params.type == 9 && item.priceType == 1) {
                this.$router.push(`/applicationMarket-form/${item.id}`);
            } else if (this.$route.params.type == 9 && item.priceType == 2) {
                this.$router.push(`/package-detail/${item.id}`);
            }
        },
        init() {
            this.loadData();
            if (this.$store.state.scroll) {
                if (this.$store.state.scroll) {
                    $(window).scrollTop(this.$store.state.scroll);
                };
            };
        },
        hideConfirm() {
            this.confirm.show = false;
        },
        inteconfirm(msg) {
            msg.then(data=> {
                if (this.type == 2) {
                    // 充值
                    this.$router.push('/recharge-doudou');
                } else if (this.type == 1) {
                    this.hideConfirm();
                }

            }, data=> {
                this.hideConfirm();
            });
        }
    },
    mounted() {
        this.init();
        switch (this.$route.params.type) {
            case '5':
                this.title = '超级助手';
                this.bannerDes = {
                    title: '召唤超级助手',
                    subTitle: '再也不想为培训运营掉头发'
                };
                break;
            case '9':
                this.title = '应用市场';
                this.bannerDes = {
                    title: '应用市场',
                    subTitle: '方便，快捷'
                };
                break;
        }
    }
};
</script>

<style lang="less" scoped>
@import '~styles/_style';
.activity-list{
    position: relative;
    padding:150px 15px 15px 15px;
    .banner{
        position: absolute;
        height: 120px;
        top: 15px;
        left: 15px;
        right: 15px;
        background: @gray;
        border-radius: 7px;
        overflow: hidden;
        img{
            position: relative;
        }
        .text{
            position: absolute;
            left: 15px;
            top:30px;
            bottom: 40px;
            right: 15px;
            z-index: 1;
            .fs50{
                font-size: 25px;
            }
        }
    }
    .activity-list-con{
        .activity-box{
            border: 1px solid @border-gay;
            overflow: hidden;
            border-radius: 14px;
            margin-bottom: 15px;
            .activity-img{
                height: 200px;
                width: 100%;
                overflow: hidden;
                margin-bottom: 15px;
            }
            .activity-describle{
                padding: 10px;
            }
            .box-bottom{
                margin-bottom: 10px;
                padding: 0 10px;
                .btn{
                    height: 30px;
                    width: 75px;
                    padding: 0;
                    line-height: 30px;
                    background:linear-gradient(180deg,rgba(255,153,216,1),rgba(252,93,192,1),rgba(255,53,104,1));
                    border-radius: 7px;
                }
            }
        }
    }

}
</style>

