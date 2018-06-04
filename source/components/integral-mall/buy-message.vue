<template>
    <div class="buy-message" :class="{'active' : currentValue}" @click="hideMask">
        <div class="buy-message-con">
        <div class="seleted-serverce-item" layout="row" layout-align="center center">
             <m-icon  class="fs48 color-white" xlink="#icon-huabanfuben16"></m-icon>
             <div class="select-right color-white">
                 <p class="fs22">{{selectedItem.description}}</p>
                 <span class="fs30">{{selectedItem.name}}</span>
             </div>
            <div class="selected-shadow"></div>
        </div>
        <div class="select-title">
            <span class="color-black fs40 fwb">购买信息</span>
        </div>           
            <div class="list-data" layout="row" layout-align="start center">
             <span class="color-gray fs30">商品总价</span>
             <span flex></span>
             <span class="color-gray fs30">{{selectedItem.price | fen2yuan}}元</span>
            </div>
            <div class="list-data" layout="column">
                <div flex layout-align="start center" layout="row">
                                 <span class="color-gray fs30">使用美豆豆数量</span>
             <span flex></span>
             <span class="color-gray"><input @change="inputBean(useBean)" class="color-pink text-center" type="number" v-model="useBean">个</span>
                </div>
                <div layout-align="start center" layout="row">
                    <span flex></span>
                    <span class="color-gray fs24">（您共有{{avaliableBean}}个美豆豆可使用）</span>
                </div>
            </div>
            <div class="pay" layout="row" layout-align="start center">
                <span class="fs30 color-black fwb">还需支付</span>
                <span flex></span>
                <span class="fs30 color-black fwb">{{pay}}</span>
            </div>
            <div flex @click="buy" class="confirm-pay fs38 color-white" layout="row" layout-align="center center">
                支付
            </div>
        </div>
    </div>
</template>
<script>
import mIcon from 'components/m-icon';
import api_party from 'services/api.party';
import { Indicator, Toast } from 'mint-ui';
export default {
    data() {
        return {
            employee: JSON.parse(localStorage.getItem('employee')),
            avaliableBean: 0,
            useBean: 0,
            pay: 0
        };
    },
    props: {
        selectedItem: {
            type: Object,
            default: null
        },
        showBuy: {
            type: Boolean,
            default: false
        }
    },
    components: {
        mIcon
    },
    methods: {
        searchBalance(price) {
            Indicator.open('loading...');
            api_party.doudouAccount(this.employee.party.partyId).then(msg=> {
                Indicator.close();
                this.avaliableBean = msg.data.doudouBalance;
                if (this.avaliableBean >= price / 10) {
                    this.useBean = price / 10;
                } else {
                    this.useBean = this.avaliableBean;
                    this.pay = (price / 10 - this.useBean) * 10;
                }
            }, msg => {

            });
        },
        buy() {
            let parameter = {
                'merchantId': this.employee.party.merchantId,
                'partyId': this.employee.party.partyId,
                'userId': this.employee.party.id,
                'payDoudouAmount': this.pay,
                'payMoney': 0,
                'itemId': this.selectedItem.id,
                'quantity': 1,
                'tradeType': 1
            };
            api_party.doudouTrade(parameter).then(msg=> {
                Toast('购买成功');
            }, msg=> {

            });
        },
        inputBean(value) {
            if (value > this.avaliableBean) {
                Toast('豆豆不足');
                this.useBean = this.avaliableBean;
            };
        },
        hideMask() {
            this.currentValue = false;
        }
    },
    mounted() {
        this.searchBalance(this.selectedItem.price);
    },
    computed: {
        currentValue: {
            get() {
                return this.showBuy;
            },
            set(val) {
                this.$emit('update', val);
            }
        }
    }
};
</script>
<style lang="less" scoped>
@import '~styles/_style';
.buy-message{
    background: rgba(0,0,0,.5);
    position: fixed;
    z-index: 10;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    transform: translateY(-100%);
    transition: all ease 1s;
    .buy-message-con{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: white;
        height: 450px;
        padding: 0 15px;
        padding-top: 65px;
        .seleted-serverce-item{
            position: absolute;
            width: 150px;
            height: 70px;
            top:-50px;
            background:white;
            left: 50%;
            transform: translateX(-75px);
            background:linear-gradient(-135deg,rgba(255,136,27,1),rgba(255,151,27,1),rgba(255,165,27,1),rgba(255,180,27,1),rgba(255,193,27,1),rgba(255,207,27,1));
            box-shadow:0px 9px 27px 0px rgba(0,0,0,0.05);
            border-radius:7px;
            .selected-shadow{
                position: absolute;
                width:100px;
                height:7px;
                background:rgba(30,0,8,1);
                opacity:0.051500000000000004;
                left: 50%;
                transform: translateX(-50px);
                border-radius: 130%;
                bottom: -15px;
            }
        }
        .select-title{
            padding: 15px 0;
            border-bottom: 1px solid @border-gay;
        }
        .list-data{
            padding: 15px 0;
            input{
                width: 60px;
                height: 30px;
                border-radius: 7px;
                background: rgba(249,249,249,1);
            }
        }
        .confirm-pay{
            position: absolute;
            left: 15px;
            right: 15px;
            height: 60px;
            bottom: 15px;
            background:linear-gradient(180deg,rgba(255,153,216,1),rgba(252,93,192,1),rgba(255,53,104,1));
            border-radius:14px;
        }
    }
}
.buy-message.active{
    transform: translateY(0);
}
</style>


