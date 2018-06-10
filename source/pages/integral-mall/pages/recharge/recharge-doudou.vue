<template>
    <div v-title="'充值美豆豆'" class="recharge">
        <div v-if="state == 1">
            <div class="border-bottom cell-box">
                <div class="blanceBox" layout="column" layout-align="center start">
                    <div><span class="blance">{{dataModel.doudouBalance}}</span>&nbsp;<span class="dark-gray">美豆豆</span></div>
                    <div class="fs24 dark-gray">其中充值余额{{Math.max(dataModel.doudouBalance - dataModel.doudouPresent, 0)}}</div>
                </div>
            </div>
            <div class="cell-box">
                <div class="cell">
                    选择充值金额
                </div>
                <div layout="row" layout-align="start center" flex-wrap="wrap">
                    <div @click="selectType(item)" v-for="item in list" :class="{'act': item.id == act}" class="list-item" layout="column" layout-align="center center" :key="item.id">
                        <div>{{item.description}}</div>
                        <div class="fs24 dark-gray" v-if="item.price">售价{{item.price | fen2yuan}}元</div>
                        <div v-if="item.icon" class="tag fs24 color-white">{{item.icon}}</div>
                    </div>
                </div>
                <div flex class="input-price text-center" v-if="choose.id == -1">
                    <input type="text" @change="priceChange" v-model="inputPrice" name="" placeholder="其他金额">
                </div>
                <div>
                    <button @click="submit" class="fs32 subBtn">充值</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import api_party from 'services/api.party';

    export default {
        name: 'recharge',
        data() {
            return {
                state: 1, // 1充值 2 充值成功
                act: 1,
                dataModel: {},
                list: [],
                choose: {},
                inputPrice: null
            };
        },
        mounted() {
            this.loadData();
            this.loadProduct();
        },
        methods: {
            loadData() {
                this.$indicator.open();
                api_party.getAccount(this.$store.state.party.partyId).then(res => {
                    this.$indicator.close();
                    this.dataModel = res.data;
                });
            },
            submit() {
                let parameter = {
                    merchantId: this.$store.state.party.merchantId,
                    partyId: this.$store.state.party.partyId,
                    userId: this.$store.state.party.id,
                    payDoudouAmount: 0,
                    payMoney: this.choose.price,
                    itemId: this.choose.id,
                    quantity: 1,
                    tradeType: 6
                };
                api_party.doudouTrade(parameter).then(res=> {
                    location.href = encodeURIComponent(res.data.payUrl + '?url=' + this.$rootPath + 'integral-mall.html#/order-list');
                }, res=> {

                });
            },
            goWallet() {
                this.$router.go(-1);
            },
            selectType(item) {
                this.act = item.id;
                this.choose = item;
            },
            loadProduct() {
                api_party.goodsList(6).then(res=> {
                    this.list = res.data;
                    this.act = res.data[0].id;
                    this.choose = res.data[0];
                    this.list.push({
                        description: '其他金额',
                        id: '-1'
                    });
                }, msg=> {

                });
            },
            priceChange() {
                this.choose = {
                    price: this.inputPrice * 100
                };
            }
        }
    };
</script>

<style scoped lang='less'>
    @import '~styles/_style';
    @color-red-lighten: #EC3F6D;

    .border-bottom{
        border-bottom:1px solid @border-gay;
    }
    .recharge{
        &:before{
            display:table;
            content:'';
            clear:both;
        }
        .input-price{
            margin-top: 15px;
            input{
                padding: 10px;
                border: 1px solid @border-gay;
                border-radius: 14px;
            }

        }
    }
    .blanceBox{
        height:135px;
        background:url("~assets/imgs/index/20180510173001.png") no-repeat center right;
        background-size: auto 60%;
        .blance{
            font-size:30px;
        }
    }
    .list-item{
        width:103px;
        height:103px;
        border:1px solid @border-gay;
        margin: 5px;
        border-radius:2px;
        position:relative;
        overflow:hidden;
        .tag{
            position:absolute;
            background:#14CC8A;
            padding:1px 30px;
            transform:rotate(45deg);
            top:8px;
            right:-25px;
        }
        &.act{
            background:@color-red-lighten;
            border-color:@white;
            border-radius:4px;
            & div{
                color:@white;
            }
        }
    }
    .subBtn{
        width:225px;
        height:44px;
        border-radius:22px;
        margin:40px auto 0;
        display:block;
        color:@white;
        background:@color-red-lighten
    }
    .icon-success-box{
        width:66px;
        height:66px;
        border-radius: 50%;
        border:1px solid @color-red-lighten;
        background:lighten(@color-red-lighten,40%);
        color:@color-red-lighten;
        font-size:32px;
        margin: 100px auto 20px;
    }
</style>
