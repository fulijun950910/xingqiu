<template>
    <div v-title="'充值短信'" class="recharge">
        <div v-if="state == 1">
            <div class="border-bottom cell-box">
                <div class="blanceBox" layout="column" layout-align="center start">
                    <div><span class="blance">5288</span>&nbsp;<span class="dark-gray">美豆豆</span></div>
                    <div class="fs24 dark-gray">其中充值余额2680</div>
                </div>
            </div>
            <div class="cell-box">
                <div class="cell">
                    选择充值金额
                </div>
                <div layout="row" layout-align="start center" flex-wrap="wrap">
                    <div @click="selectType(item.id)" v-for="item in list" :class="{'act': item.id == act}" class="list-item" layout="column" layout-align="center center">
                        <div>{{item.num}}美豆豆</div>
                        <div class="fs24 dark-gray">售价{{item.price}}元</div>
                        <div v-if="item.tag == 1" class="tag fs24 color-white">推荐</div>
                    </div>
                </div>
                <div>
                    <button class="fs32 subBtn">充值</button>
                </div>
            </div>
        </div>
        <div v-else class="text-center">
            <div class="icon-success-box" layout="row" layout-align="center center">
                <m-icon class="" xlink="#icon-yes"></m-icon>
            </div>
            <div class="fs36">充值成功！</div>
            <div class="dark-gray fs24">已成功充值1000美豆豆</div>
            <button @click="goWallet" class="fs32 subBtn">我知道了</button>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'recharge',
        data() {
            return {
                state: 2, // 1充值 2 充值成功
                act: 1,
                list: [
                    {
                        num: 100,
                        price: 10,
                        tag: null,
                        id: 1
                    },
                    {
                        num: 500,
                        price: 49,
                        tag: null,
                        id: 2
                    },
                    {
                        num: 1000,
                        price: 98,
                        tag: 1,
                        id: 3
                    },
                    {
                        num: 2000,
                        price: 196,
                        tag: null,
                        id: 4
                    },
                    {
                        num: 5000,
                        price: 490,
                        tag: null,
                        id: 5
                    },
                    {
                        num: 10000,
                        price: 980,
                        tag: null,
                        id: 6
                    }
                ]
            };
        },
        mounted() {
        },
        methods: {
            goWallet() {
                this.$router.go(-1);
            },
            selectType(id) {
                this.act = id;
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
