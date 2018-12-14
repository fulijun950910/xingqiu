<template>
<div v-title="'充值美豆豆'" class="recharge">
    <div v-if="state == 1">
        <div class="border-bottom cell-box">
            <div class="blanceBox" layout="column" layout-align="center center">
                <div><span class="blance">{{dataModel.doudouBalance}}</span>&nbsp;<span class="color-black">美豆豆</span></div>
                <!-- <div class="fs24 dark-gray">其中充值余额{{Math.max(dataModel.doudouBalance - dataModel.doudouPresent, 0)}}</div> -->
            </div>
        </div>
        <div class="cell-box">
            <div class="cell extra-light-black fs30">
                选择充值金额
            </div>
            <div layout="row" layout-align="space-between center" flex-wrap="wrap">
                <div @click="selectType(item)" v-for="item in list" :class="{'act': item.id == act , 'list-item' : item.code != 'custom_doudou','input-money' : item.code == 'custom_doudou'}" class="list-item m-b-4" :key="item.id">
                    <div flex v-if="item.code != 'custom_doudou'" layout="column" layout-align="center center" class="item-in">
                    <div class="fs30 color-black">{{item.description}}</div>
                    <div class="fs24 dark-gray" v-if="item.price">￥{{item.price | fen2yuan}}</div>
                    <div v-if="item.icon" class="tag fs24 color-white">{{item.icon}}</div>
                    </div>
                    <div class="item-in" flex v-if="item.code == 'custom_doudou'" layout="row" layout-align="center center">
                        <div>
                         <input type="number" v-model="item.money" @change="caculateRechargeDou(item)" class="extra-light-black" placeholder="￥请输入充值金额" pattern="[0-9]*">
                        </div>
                    </div>
                </div>
                <div class="m-l-3 extra-light-black" >可兑换<span class="color-pink">{{transDou}}</span>美豆豆</div><div flex></div>
            </div>
            <div class="rules" flex>
                <div class="color-gray fs24 rule-title">
                    <m-icon class="fs30" xlink="icon-xiangqing"></m-icon>&nbsp;&nbsp;充值说明</div>
                <div class="color-gray fs22 rule-p">1. 美豆豆为虚拟货币，没有使用权限。只可用于本平台</div>
                <div class="color-gray fs22 rule-p">2. 购买后将不退不换</div>
                <div class="color-gray fs22 rule-p">3. 10个美豆豆等于1元</div>
            </div>
            <div class="m-b-2">
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
            inputPrice: null,
            transDou: 0,
            rechargeRuleList: []
        };
    },
    mounted() {
        this.loadData();
        this.loadProduct();
        this.rechargeRule();
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
            this.$router.push({
                name: 'pay-detail',
                params: {
                    itemId: this.choose.id,
                    payMoney: this.choose.money ? (this.choose.money * 100) : this.choose.price,
                    type: this.choose.money ? 1 : 2
                }
            });
        },
        goWallet() {
            this.$router.go(-1);
        },
        selectType(item) {
            this.act = item.id;
            this.choose = item;
            this.list.map((pro, proIndex) => {
                if (pro.money) {
                    pro.money = 0;
                    this.transDou = 0;
                };
            });
        },
        loadProduct() {
            api_party.goodsList(6).then(res => {
                this.list = res.data;
                this.act = res.data[0].id;
                this.choose = res.data[0];
                this.list.map((item, index) => {
                    if (item.icon) {
                        this.act = item.id;
                        this.choose = item;
                    };
                });
                // this.list.push({
                //     description: '其他金额',
                //     id: '-1'
                // });
            }, msg => {

            });
        },
        priceChange() {
            this.choose = {
                price: this.inputPrice * 100
            };
        },
        rechargeRule() {
            api_party.rechargeRules().then(msg => {
                this.rechargeRuleList = msg.data;
            }, msg => {
            });
        },
        caculateRechargeDou(item) {
            if (!item.money) {
                return;
            }
            // console.log(this.adapterRechargeRule(item.money * 100));
            this.transDou = Number(item.money * 10 * this.adapterRechargeRule(item.money * 100)).toFixed(0);
        },
        adapterRechargeRule(money) {
            let rulePany = [];
            this.rechargeRuleList.map((item, index) => {
                let temp = {
                    index: index,
                    area: [this.rechargeRuleList[index].payMoney, this.rechargeRuleList[index + 1] ? this.rechargeRuleList[index + 1].payMoney : Infinity]
                };
                rulePany.push(temp);
            });
            if (rulePany.length) {
                // console.log(rulePany);
                let ratio;
                rulePany.map((item, index) => {
                    if (money >= item.area[0] && money < item.area[1]) {
                        ratio = this.rechargeRuleList[item.index].ratio;
                    };
                });
                return ratio;
            }
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
        .rules{
            padding: 15px 0;
            .rule-title{
                margin-bottom: 10px;
            }
            .rule-p{
                // margin-bottom: 10px;
            }
        }
    }
    .blanceBox{
        height:135px;
        // background:url("~assets/imgs/index/20180510173001.png") no-repeat center right;
        background-size: auto 60%;
        .blance{
            font-size:30px;
        }
    }
    .list-item{
        border:1px solid @border-gay;
        border-radius:7px;
        position:relative;
        width: 110px;
        height: 80px;
        overflow:hidden;
        .item-in{
            height: 100%;
        }
        .tag{
            position:absolute;
            background-image: linear-gradient(-152deg, #FAD961 0%, #F76B1C 100%);
            padding:1px 30px;
            transform:rotate(45deg);
            top:8px;
            right:-25px;
        }
        &.act{
            // background:@color-red-lighten;
            // border-color:@white;
            border-radius:4px;
            border:1px solid #F22167;
            // & div{
            //     color:@white;
            // }
        }
    }
    .input-money{
        width: 150px;
        height: 50px;
        .item-in{
        width: 150px;
        height: 50px;
        }

        input{
            width: 100%;
            height: 35px;
            padding: 0 5px;
        }
    }
    .subBtn{
        width:100%;
        height:60px;
        border-radius:14px;
        margin:15px auto 0;
        display:block;
        color:@white;
        background:linear-gradient(180deg,rgba(255,153,216,1),rgba(252,93,192,1),rgba(255,53,104,1));
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
