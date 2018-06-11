<template>
    <div class="buy-message" :class="{'active' : currentValue}" layout="column" layout-align="end start">
        <div class="con-mask" @click="hideMask"></div>
        <div class="buy-message-con">
        <!-- <div class="seleted-serverce-item" layout="row" layout-align="center center">
             <m-icon  class="fs48 color-white" xlink="#icon-gerenxinxi"></m-icon>
             <div class="select-right color-white">
                 <p class="fs22">{{selectedItem.description}}</p>
                 <span class="fs30">{{selectedItem.name}}</span>
             </div>
            <div class="selected-shadow"></div>
        </div> -->
        <div class="select-title">
            <span class="color-black fs40 fwb">购买信息</span>
        </div>   
        <div class="location" layout="row" layout-align="start center" v-if="type ==2">
            <div class="lest-detail" flex="90" @click="chooseAddress">
             <div layout="row" layout-align="space-between center">
                 <span class="fs28 color-black">收货人：</span>
                 <span class="fs28 color-black">{{address.person}}</span>
             </div>
             <div class="loca-address color-gray fs28" flex>
                 收货地址：{{address.name}}
             </div>
            </div>
            <div class="buy-more" flex="10" layout="row" layout-align="center center">
                <m-icon xlink="#icon-zuojiantou"></m-icon>
            </div>
            </div>   
            <div class="amount" layout="row" layout-align="space-between center" v-if="type ==2">
                <div class="fs28 color-black">数量</div>
                <integral-input @numOut="changeNum" @changeAmount="changeNum"></integral-input>
            </div>     
            <div class="list-data" layout="row" layout-align="start center">
             <span class="color-gray fs30">商品总价</span>
             <span flex></span>
             <span class="color-gray fs30">{{selectedItem.price | fen2yuan}}元/{{selectedItem.price | fen2dou}}美豆豆</span>
            </div>
            <div class="list-data" layout="column">
                <div flex layout-align="start center" layout="row">
                                 <span class="color-gray fs30">使用美豆豆数量</span>
             <span flex></span>
             <span class="color-gray"><input @change="inputBean(useBean)" class="color-pink text-center" type="text" v-model="useBean">个</span>
                </div>
                <div layout-align="start center" layout="row">
                    <span flex></span>
                    <span class="color-gray fs24">（您共有{{avaliableBean}}个美豆豆可使用）</span>
                </div>
            </div>
            <div class="pay" layout="row" layout-align="start center">
                <span class="fs30 color-black fwb">还需支付</span>
                <span flex></span>
                <span class="fs30 color-black fwb">{{pay | fen2yuan}}元</span>
            </div>
            <div class="remark" v-if="type == 2">
                <textarea placeholder="备注" v-model="remark"></textarea>
            </div>
            <div flex @click="buy" class="confirm-pay fs38 color-white" layout="row" layout-align="center center">
                支付
            </div>
        </div>
        <buy-finished v-if="success"></buy-finished>
    </div>
</template>
<script>
import mIcon from 'components/m-icon';
import integralInput from 'components/integral-mall/integral-input';
import api_party from 'services/api.party';
import { Indicator, Toast } from 'mint-ui';
import buyFinished from 'components/integral-mall/buy-finished';
export default {
    data() {
        return {
            employee: JSON.parse(localStorage.getItem('employee')),
            avaliableBean: 0,
            useBean: 0,
            pay: 0,
            quantity: 1,
            realAvaliable: 0,
            success: false,
            address: {},
            remark: '',
            localAddressId: this.addressId
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
        },
        type: {
            type: String,
            default: '0'  // 1买短信 2买商品
        },
        location: {
            type: Object,
            default() {
                return {};
            }
        },
        productId: String,
        payType: {
            type: String,
            default: ''
        },
        addressId: String,
        formParameter: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    components: {
        mIcon,
        integralInput,
        buyFinished
    },
    methods: {
        searchBalance(price, quantity) {
            Indicator.open('loading...');
            api_party.doudouAccount(this.$store.state.party.partyId).then(msg=> {
                Indicator.close();
                this.realAvaliable = msg.data.doudouBalance;
                this.caculateResult(price, quantity);
            }, msg => {

            });
        },
        buy() {
            let parameter = {
                'merchantId': this.$store.state.party.merchantId,
                'partyId': this.$store.state.party.partyId,
                'userId': this.$store.state.party.id,
                'payDoudouAmount': this.useBean,
                'payMoney': this.pay,
                'itemId': this.selectedItem.id,
                'quantity': this.quantity,
                'tradeType': this.selectedItem.type,
                'deliverAddressId': this.addressId,
                remark: this.remark
            };
            if (this.formParameter) {
                this.formParameter.applyServiceDate = this.$moment(this.formParameter.applyServiceDate).format('YYYY-MM-DD HH:mm:ss');
                parameter.serviceApply = this.formParameter;
                // this.formParameter = {};
            };
            Indicator.open('loading...');
            api_party.doudouTrade(parameter).then(msg=> {
                Indicator.close();
                if (msg.data.status == 0) {
                    location.href = msg.data.payUrl + '?url=' + encodeURIComponent(location.protocol + '//' + location.host + this.$rootPath + 'integral-mall.html#/order-list');
                    // location.href = msg.data.payUrl + '?url=' + encodeURIComponent(this.$rootPath + 'integral-mall.html#/order-list');
                } else {
                    this.success = true;
                }
                Toast('购买成功');
            }, msg=> {

            });
        },
        inputBean(value) {
            if (value > this.realAvaliable) {
                Toast('豆豆不足');
                this.useBean = this.realAvaliable;
            } else if (value > this.selectedItem.price / 10 * this.quantity) {
                this.useBean = this.selectedItem.price / 10 * this.quantity;
                this.pay = 0;
                return;
            }
            this.changeDouCaculate(value);
            // this.caculateResult(this.selectedItem.price, this.quantity);
        },
        changeDouCaculate(bean) {
            this.pay = ((this.selectedItem.price * this.quantity) / 10 - bean) * 10;
            this.avaliableBean = this.realAvaliable - bean;
        },
        hideMask(e) {
            this.currentValue = false;
        },
        changeNum(val) {
            if (val < 0) {
                Toast('数量不能为负');
                return;
            }
            this.quantity = val;
            this.caculateResult(this.selectedItem.price, this.quantity);
        },
        caculateResult(price, quantity) {
            let unitPrice = 1 / 10; // 一个豆豆值0.1元
            let value = (price / 100) / unitPrice * quantity; // 这个商品价值多少颗豆豆
            if (this.realAvaliable >= value) {
                this.useBean = Number(value).toFixed(0);
                this.avaliableBean = this.realAvaliable - this.useBean;
                this.pay = Number(value - this.useBean).toFixed(2) * 100;
                this.pay = this.pay < 0 ? 0 : this.pay;
                // console.log();
            } else {
                this.useBean = this.realAvaliable;
                this.avaliableBean = 0;
                this.pay = (quantity * price) - this.realAvaliable * 10;
            }
        },
        loadFirstAddress() {
            Indicator.open('loading...');
            api_party.getDefaultAddress(this.$store.state.party.partyId, this.$store.state.party.id).then(msg=> {
                Indicator.close();
                this.address = {
                    name: msg.data.fullAddress,
                    id: msg.data.id,
                    person: msg.data.contactPersion
                };
                // this.addressId = msg.data.id;
            }, msg=> {

            });
        },
        chooseAddress() {
            this.$router.push(`/address-list/choose/${this.productId}`);
        },
        loadChooseAddress() {
            if (this.addressId) {
                Indicator.open('loading...');
                api_party.getAddress(this.addressId).then(msg=> {
                    Indicator.close();
                    this.address = {
                        name: msg.data.fullAddress,
                        id: msg.data.id,
                        person: msg.data.contactPersion
                    };
                }, msg=> {

                });

            }
        }
    },
    mounted() {
        this.searchBalance(this.selectedItem.price, this.quantity);
        if (this.payType == 'finished') {
            this.loadChooseAddress();
        } else {
            this.loadFirstAddress();
        }
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
    },
    watch: {
        showBuy: {
            handler: function(newValue, oldValue) {
                if (newValue != oldValue) {
                    this.searchBalance(this.selectedItem.price, this.quantity);
                }
            }
        }
    }
};
</script>
<style lang="less" scoped>
@import '~styles/_style';
.buy-message{
    position: fixed;
    z-index: 10;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    transform: translateY(-100%);
    transition: all ease 1s;
    .con-mask{
    background: rgba(0,0,0,.5);        
        position: fixed;
        z-index: 1;
        top:0;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .buy-message-con{
        position: relative;
        width: 100%;
        background: white;
        padding: 15px 15px 140px 15px;
        z-index: 2;
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
        .location{
            background: url("~assets/imgs/integral-mall/address-bg-min.png") repeat-x top,url("~assets/imgs/integral-mall/address-bg-min.png") repeat-x bottom;
            background-size: 10% auto;
            margin-bottom: 10px;
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
        .location{
            padding: 15px 0;
        }
        .remark{
            padding: 15px 0;
            textarea{
                width: 100%;
            background: rgba(249,249,249,1);
            height: 35px;
            padding: 10px;
            resize: none;
                
            }
        }
    }
}
.buy-message.active{
    transform: translateY(0);
}
</style>


