<template>
    <div class="recharge-bean">
        <div class="to-describ" layout="row" layout-align="center center">
            <div flex="50" layout="column">
               <p class="fs24 steel-gray">
                   <span class="color-black fs48 fwb">
                       {{doudouBalance}}
                   </span>
                   美豆豆
               </p>
               <p class="steel-gray">其中充值余额{{moneyBalance | fen2yuan}}</p>
            </div>
            <div flex="50">
                <m-icon xlink="#icon-pinglun" class="fs48 color-pink"></m-icon>
            </div>
        </div>
        <div class="title color-black fs28" flex>
            选择充值金额
        </div>
        <div class="data-list" layout="row" layout-align="space-between center">
            <div class="list-data-item" flex="30" @click="select(item)" :class="{'active':selected == item}" layout="column" v-for="(item,index) in dataList" :key="index" layout-align="center center">
                <span class="color-black fs32">{{item.description}}</span>
                <p class="steel-gray fs24">{{item.name}}</p>                
            </div>
        </div>
        <div class="buy" flex layout="column" layout-align="start center">
            <div class="color-white fs32 btn" layout="row" layout-align="center center" @click="pay">充值</div>
            <div class="color-pink fs30">线下支付</div>
        </div>
    </div>
</template>
<script>
/**
 * 钱充值豆豆
 */
import api_party from 'services/api.party';
import { Indicator, Toast } from 'mint-ui';
export default {
    data() {
        return {
            dataList: [],
            employee: JSON.parse(localStorage.getItem('employee')),
            doudouBalance: 0,
            moneyBalance: 0,
            selected: null
        };
    },
    methods: {
        loadData() {
            Indicator.open('loading...');
            api_party.goodsList(6).then(msg=> {
                Indicator.close();
                this.dataList = msg.data;
                this.selected = this.dataList[0];
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
        select(item) {
            this.selected = item;
        },
        pay() {
            if (!this.check()) {
                return;
            };
            let parameter = {
                'merchantId': this.employee.party.merchantId,
                'partyId': this.employee.party.partyId,
                'userId': this.employee.party.id,
                'payDoudouAmount': 0,
                'payMoney': this.selected.price,
                'itemId': this.selected.id,
                'quantity': 1,
                'tradeType': 6
            };
            api_party.doudouTrade(parameter).then(msg=> {
                location.href = msg.data.payUrl;
            }, msg=> {

            });
        },
        check() {
            if (!this.selected) {
                Toast('请选择充值数量');
                return false;
            } else {
                return true;
            }
        },
        init() {
            this.loadData();
            this.searchBalance();
        }
    },
    mounted() {
        this.init();
    }
};
</script>

<style lang="less" scoped>
@import '~styles/_style';
.recharge-bean{
    .to-describ{
        height: 165px;
        padding: 20px 15px;
        border-bottom: 1px solid @border-gay;
    }
    .title{
        padding: 20px 15px;
    }
    .data-list{
        padding: 0 15px;
        margin-bottom: 50px;
       .list-data-item{
           border: 1px solid @border-gay;
           height: 103px;
           position: relative;
       }
       .list-data-item.active{
           background: #EC3F6D;
           span{
               color: white;               
           }
           p{
               color: white;
           }
       }
    }
    .buy{
        .btn{
            width: 225px;
            height: 44px;
            background: @color-pink;
            line-height: 44px;
            padding: 0;
            border-radius: 22px;
            margin-bottom: 20px;
        }

    }
}
</style>


