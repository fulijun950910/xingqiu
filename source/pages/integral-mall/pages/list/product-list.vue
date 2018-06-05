<template>
    <div class="product-list">
        <div class="banner">
            这个是banner
        </div>
        <div class="product-list-con" flex layout="row" layout-align="space-between center">
              <div class="product-list-item" v-for="(item,index) in dataList" :key="index" @click="buy(item)">
                  <div class="product-img">
                      <img class="img-auto" :src="item.image | nSrc(require('assets/imgs/female.png'))" alt="">
                  </div>
                  <div class="bottom-describle">
                         <div class="fs30 color-black fwb">
                             {{item.name}}
                         </div>
                         <div class="fs24 color-gray">
                             {{item.description}}
                         </div>
                  </div>
                  <div class="color-pink fs30">{{item.price | fen2dou}}美豆豆/{{item.price | fen2yuan}}元</div>
                  <div flex layout="row" layout-align="end center" class="buy" @click="buy(item)">
                      <div class="btn-integral color-white fs30">购买</div>
                  </div>
              </div>
        </div>
        <no-more :show-more="showNoMore" more-text="更多商品正在挖掘，敬请期待哦！"></no-more>      
        <integral-confirm :confirmText="confirm" @hideConfirm="hideConfirm" @integraConfirm="inteconfirm"></integral-confirm>                
    </div>
</template>
<script>
import api_party from 'services/api.party';
import { Indicator } from 'mint-ui';
import noMore from 'components/integral-mall/no-more';
import integralConfirm from 'components/integral-mall/integral-confirm';
export default {
    data() {
        return {
            employee: JSON.parse(localStorage.getItem('employee')),
            dataList: [],
            showNoMore: true,
            doudouBalance: 0,
            moneyBalance: 0,
            confirm: {}
        };
    },
    components: {
        noMore,
        integralConfirm
    },
    methods: {
        buy(item) {
            let itemMoney2dou = (item.price / 100) * 10;
            if (itemMoney2dou > this.doudouBalance) {
                this.confirm = {
                    message: '您的美豆豆余额不足啦！快去充值吧！',
                    confirm: '去充值',
                    quiet: '再想想',
                    show: true
                };
            } else {
                this.$router.push({path: `/product-detail/${item.id}`});
            };
        },
        loadData() {
            Indicator.open('loading...');
            api_party.goodsList(4).then(msg=> {
                Indicator.close();
                this.dataList = msg.data;
            }, msg=> {

            });

        },
        searchBalance() {
            Indicator.open('loading...');
            api_party.doudouAccount(this.employee.party.partyId).then(msg=> {
                Indicator.close();
                this.doudouBalance = msg.data.doudouBalance;
                this.moneyBalance = msg.data.moneyBalance;
            }, msg => {

            });
        },
        init() {
            this.loadData();
            this.searchBalance();
        },
        inteconfirm(msg) {
            msg.then(data=> {
                this.$router.push('/recharge-doudou');
            }, data=> {
                this.confirm.show = false;
            });
        },
        hideConfirm() {
            this.confirm.show = false;
        }
    },
    mounted() {
        this.init();
    }
};
</script>
<style lang="less" scoped>
@import '~styles/_style';
.product-list{
    padding: 15px;
    .banner{
        height: 120px;
        width: 100%;
        overflow: hidden;
        background: @gray;
        border-radius: 7px;
        margin-bottom: 15px;
    }
    .product-list-con{
        margin-bottom: 15px;
        .product-list-item{
            width: 48%;
            margin-right: 2%;
            padding: 10px;
            border-radius: 4px;
            margin-bottom: 2%;
            .product-img{
                height: 100px;
                padding: 25px;
                overflow: hidden;
                margin-bottom: 15px;
                img{
                    width: 100%;
                    height: auto;
                }
            }
            .bottom-describle{
                margin-bottom: 10px;
            }
            border:1px solid @border-gay;
            .buy{
                margin-top: 10px;
            }
        }
        .product-list-item:nth-of-type(2n){
            margin-right: 0;
        }
    }
}
</style>

