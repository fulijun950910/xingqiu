<template>
    <div class="b2b-mall-order-list-buy">
        <div layout="row" class="nav-bar">
            <div @click="typeChange(-1)" :class="{'act': type == -1}" class="nav-item" flex="20" layout="column" layout-align="center center">
                <div class="text">全部</div>
                <div class="shadow-line"></div>
            </div>
            <div @click="typeChange(0)" :class="{'act': type == 0}" class="nav-item" flex="20" layout="column" layout-align="center center">
                <div class="text">待付款</div>
                <span class="shadow-line"></span>
            </div>
            <div @click="typeChange(1)" :class="{'act': type == 1}" class="nav-item" flex="20" layout="column" layout-align="center center">
                <div class="text">待发货</div>
                <span class="shadow-line"></span>
            </div>
            <div @click="typeChange(6)" :class="{'act': type == 6}" class="nav-item" flex="20" layout="column" layout-align="center center">
                <div class="text">待收货</div>
                <span class="shadow-line"></span>
            </div>
            <div @click="typeChange(5)" :class="{'act': type == 5}" class="nav-item" flex="20" layout="column" layout-align="center center">
                <div class="text">已完成</div>
                <span class="shadow-line"></span>
            </div>
        </div>
        <div class="order-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-immediate-check="false" infinite-scroll-distance="10">
            <div @click.stop="goDetaill(item)" v-for="(item,index) in orderList" :key="item.id" class="order-item m-t-3 card-style cell-box">
                <div class="p-t-5 p-b-3 border-bottom" layout="row">
                    <div class="fwb fs28" flex>{{item.merchantName}}</div>
                    <div>
                        <span class="color-primary">{{item.status | orderStatus}}</span>
                    </div>
                </div>
                <div v-for="mall in item.supplierOrderItemList" :key="mall.id" class="cell border-bottom" layout="row">
                    <img class="product-img m-r-2" :src="mall.goodsImage | mSrc2(require('assets/imgs/nullimg.jpg'))" alt="">
                    <div layout="row" flex>
                        <div layout="column" flex="75">
                            <div flex>{{mall.goodsName}}</div>
                            <!--<div class="fs24 extra-black">规格 大型60cm</div>-->
                        </div>
                        <div flex class="text-right extra-black">
                            <div>*{{mall.quantity}}</div>
                            <div>￥{{mall.price | fen2yuan}}</div>
                        </div>
                    </div>
                </div>
                <div class="cell" layout="row">
                    <div class="extra-black" flex>
                        <span v-if="item.status==0||item.status==2||item.status==3||item.status==4">实际需支付</span>
                        <span v-else>实际支付</span>
                    </div>
                    <div class="">￥{{item.needPayAmount | fen2yuan}}</div>
                </div>
                <div class="btn-box cell" layout="row" layout-align="end center">
                    <button @click.stop="goDetaill(item)" class="order-btn btn-default">查看详情</button>
                    <div v-if="item.status == 0" layout="row" layout-align="start center">
                        <button @click.stop="cancelOrder(item,index)" class="order-btn btn-default">取消订单</button>
                        <button @click.stop="goDetaill(item)" class="order-btn btn-primary">去付款</button>
                    </div>
                    <div v-else-if="item.status == 1" layout="row" layout-align="start center">
                        <button @click.stop="refundOrder(item,index)" class="order-btn btn-primary">退款</button>
                    </div>
                    <div v-else-if="item.status == 6" layout="row" layout-align="start center">
                        <button @click.stop="subOrder(item,index)" class="order-btn btn-primary">确认收货</button>
                    </div>
                    <div v-else-if="item.status == 5" layout="row" layout-align="start center">
                        <button @click.stop="goOrder(item, index)" class="order-btn btn-primary">再来一单</button>
                    </div>
                </div>
            </div>
            <m-load-more :loading="isLoadOver"></m-load-more>

        </div>

    </div>
</template>

<script>
import Vue from 'vue';
import {
    InfiniteScroll
} from 'mint-ui';

Vue.use(InfiniteScroll);
import api_b2bmall from 'services/api.b2bmall';
import mLoadMore from 'components/m-load-more';
export default {
    name: 'buy',
    data() {
        return {
            type: -1, // 状态
            orderList: [],
            loading: false,
            isLoadOver: false, // false已加载完所有数据
            query: {
                page: 1,
                size: 10
            }
        };
    },
    components: {
        mLoadMore
    },
    mounted() {
        this.loadData();
    },
    methods: {
        loadMore() {
            if (this.isLoadOver) {
                this.loadData();
            }
        },
        typeChange(type) {
            this.type = type;
            this.resetQuery();
            this.loadData();
        },
        resetQuery() {
            this.query.page = 1;
            this.orderList = [];
        },
        async loadData() {
            let data = {
                query: [
                    {
                        field: 'userMerchantId',
                        value: this.$store.state.party.merchantId
                    },
                    {
                        field: 'partyId',
                        value: this.$store.state.party.partyId
                    },
                    {
                        field: 'userId',
                        value: this.$store.state.party.id
                    }
                ],
                page: this.query.page,
                size: this.query.size
            };
            if (this.type > -1) {
                data.query.push({
                    field: 'status',
                    value: this.type
                });
            }
            this.loading = true;
            this.$indicator.open();
            let res = await api_b2bmall.searchSupplierOrderList(data);
            this.$indicator.close();
            if (res.data.rows.length < this.query.size) {
                this.isLoadOver = false;
            } else {
                this.isLoadOver = true;
            }
            this.orderList = this.orderList.concat(res.data.rows);
            this.loading = false;
            this.query.page++;
        },
        goDetaill(item) {
            this.$router.push({
                name: 'b2b-mall-order-detail',
                params: {
                    id: item.id
                }
            });
        },
        goOrder(item) {
            this.$router.push({
                name: 'b2b-mall-order',
                params: {
                    id: item.supplierOrderItemList[0].goodsId
                }
            });
        },
        orderChangeStatusEvent() {
            let len = this.orderList.length;
            this.orderList.splice(Math.max(len - this.query.size, 0));
            this.query.page--;
            this.loadData();
        },
        async subOrder(item, index) {
            this.$messageBox.confirm('确认收货？').then(async action => {
                this.$indicator.open();
                await api_b2bmall.subOrder(item.id);
                this.$indicator.close();
                this.$toast('已确认收货');
                this.orderChangeStatusEvent();
            });
        },
        async refundOrder(item, index) {
            this.$messageBox.confirm('确认退款？').then(async action => {
                this.$indicator.open();
                await api_b2bmall.refundOrder(item.id);
                this.$indicator.close();
                item.status = 7;
                this.$toast('退款成功');
                this.orderChangeStatusEvent();
            });
        },
        async cancelOrder(item, index) {
            this.$messageBox.confirm('确认取消订单？').then(async action => {
                this.$indicator.open();
                await api_b2bmall.cancelOrder(item.id);
                this.$indicator.close();
                this.$toast('已取消订单');
                this.orderChangeStatusEvent();
            });
        }
    },
    filters: {
        orderStatus(value) {
            let text = '';
            switch (value) {
                case 0:
                    text = '待付款';
                    break;
                case 1:
                    text = '待发货';
                    break;
                case 2:
                    text = '支付失败';
                    break;
                case 3:
                    text = '支付超时';
                    break;
                case 4:
                    text = '已取消';
                    break;
                case 5:
                    text = '已完成';
                    break;
                case 6:
                    text = '待收货';
                    break;
                case 7:
                    text = '退款';
                    break;
            }
            return text;
        }
    }
};
</script>

<style scoped lang='less'>
@import '~styles/_agile';
.b2b-mall-order-list-buy{
    padding-bottom:30px;
    @color-primary: #854399;
    .color-primary {
        color: @color-primary;
    }
    .nav-bar {
        height:50px;
        background:rgba(255,255,255,1);
        box-shadow:0px 3px 8px 0px rgba(49,77,83,0.28);
        width: 100%;
        .nav-item{
            position:relative;
            color:#AAAAAA;
            .text{
                padding: 0 8px;
                width: 100%;
                text-align: center;
            }
            .shadow-line{
                display: none;
                width:44px;
                height:4px;
                background:rgba(133,67,153,1);
                box-shadow:0px 1px 4px 0px rgba(164,58,142,0.36);
                border-radius:2px;
                position:absolute;
                bottom:4px;
                left: 50%;
                margin-left: -22px;
            }
            &.act{
                color:@color-primary;
                .shadow-line{
                    display:block;
                }
            }
        }
    }
    .card-style{
        box-shadow:0px 4px 17px 0px rgba(75,110,150,0.11);
        border-radius:2px;
        margin-left: 5px;
        margin-right: 5px;
        background:@white;
    }
    .order-item{
        .product-img{
            width:60px;
            height: 60px;
            border-radius: 4px;
        }
    }
    .btn-box{
        .order-btn{
            width:90px;
            height:34px;
            border: 1px solid @border-gay;
            border-radius: 4px;
            margin-left: 12px;
            background: transparent;
        }
        .btn-default{
            color: @extra-light-black;
            border-color: @extra-light-black
        }
        .btn-primary {
            color: @color-primary;
            border-color: @color-primary;
        }
    }
}
</style>
