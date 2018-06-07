<template>
    <div class="exchange-message">
        <div class="exchange-banner">
            <img class="img-auto" :src="require('assets/imgs/integral-mall/recharge-banner-min.png')" alt="">
        </div>
        <div class="exchange-title">
            <span class="fs40 fwb color-black">充值套餐</span>
        </div>
        <div class="exchange-serviceItem-list" layout="row" layout-align="start center" flex-wrap="wrap">
              <div class="exchange-serviceItem-item" @click="chooseItem(item)" :class="{'active':item.isActive == 2}" v-for="(item,index) in dataList" :key="index" layout="row" layout-align="center center">
                 <m-icon class="fs48" xlink="#icon-shouyeicon"></m-icon>
                 <div class="right-des">
                     <span class="color-pink fs22" >{{item.description}}</span>
                     <p class="fs30">{{item.name}}</p>
                 </div>
              </div>
        </div>
        <div class="exchange-btn color-white fs38" @click="confirm" layout="row" layout-align="center center">
            确认
        </div>
        <buy-message type="1" @update="update" :selected-item="chooseServiceItem" :show-buy="showBuy"></buy-message>
    </div>
</template>
<script>
import api_party from 'services/api.party';
import buyMessage from 'components/integral-mall/buy-message';
import { Indicator } from 'mint-ui';
export default {
    data() {
        return {
            dataList: [],
            employee: JSON.parse(localStorage.getItem('employee')),
            chooseServiceItem: null,
            showBuy: false
        };
    },
    methods: {
        loadData() {
            Indicator.open('loading...');
            api_party.goodsList(1).then(msg=> {
                Indicator.close();
                this.dataList = msg.data;
                this.dataList.map((item, index)=> {
                    if (index != 0) {
                        item.isActive = 1;
                    } else {
                        item.isActive = 2;
                    }
                });
            }, msg=> {

            });
        },
        chooseItem(item) {
            this.dataList.map((item, index)=> {
                item.isActive = 1;
            });
            item.isActive = 2;
        },
        confirm() {
            let temp = this.dataList.filter((item, index)=> {
                return item.isActive == 2;
            });
            this.chooseServiceItem = temp[0];
            this.showBuy = true;
        },
        update(val) {
            this.showBuy = val;
        }
    },
    mounted() {
        this.loadData();
    },
    components: {
        buyMessage
    }
};
</script>

<style lang="less" scoped>
@import '~styles/_style';
.exchange-message{
    .img-auto{
        width: 100%;
        height: auto;
    }
    padding: 15px;
    .exchange-banner{
         width: 345px;
         height: 150px;
         box-shadow:0px 19px 40px 0px rgba(0,0,0,0.08);
         border-radius:7px;
         overflow: hidden;
         margin-bottom: 15px;
    }
    .exchange-title{
        padding-bottom: 15px;
        border-bottom: 1px solid @border-gay;
    }
    .exchange-serviceItem-list{
        padding: 20px 0;
        .exchange-serviceItem-item{
            padding: 10px 15px;
            border: 1px solid @border-gay;
            border-radius: 7px;
            width: 49%;
            margin-right:2%; 
            margin-bottom: 2%;     
        .icon{
               color: #FBE945;
           }       
        .right-des{
            margin-left: 10px;
           }
        }
        .exchange-serviceItem-item:nth-of-type(2n){
            margin-right: 0;
        }
        .exchange-serviceItem-item.active{
           background:linear-gradient(-135deg,rgba(255,136,27,1),rgba(255,151,27,1),rgba(255,165,27,1),rgba(255,180,27,1),rgba(255,193,27,1),rgba(255,207,27,1));
           box-shadow:0px 9px 27px 0px rgba(0,0,0,0.05);
           span{
               color: white;
           }
           p{
               color: white;
           }
        }
    }
    .exchange-btn{
        height: 60px;
        width: 100%;
       background:linear-gradient(180deg,rgba(255,153,216,1),rgba(252,93,192,1),rgba(255,53,104,1));
       border-radius: 7px;
       font-size: 15px;
    }
}
</style>

