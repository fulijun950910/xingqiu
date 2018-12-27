<template>
    <div class="b2b-mall-order-list-sell-detail">
        <div class="cell cell-box m-t-4 fs28 extra-light-black" layout="row">
            <div flex>{{query.total}}条订单</div>
            <div @click="showQuery" class="p-l-2">筛选<m-icon link='icon-xia'></m-icon></div>
        </div>
        <div class="order-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-immediate-check="false" infinite-scroll-distance="10">
            <div v-for="(item, key) in orderList" :key="key" class="list-item bg-white cell-box">
                <div class="border-bottom cell" layout="row">
                    <img class="title-img m-r-2" :src="item.avatarId | mSrc2(require('assets/imgs/nullimg.jpg'))" alt="">
                    <div flex>
                        <div layout="row">
                           <div flex>{{item.nickName}} <span v-if="item.groupRole == 'CAPTAIN'" class="group-tag">团长</span></div>
                           <div>¥{{item.buyPrice|fen2yuan}}</div>
                        </div>
                        <div>{{item.mobile}}</div>
                    </div>
                </div>
                <div class="cell" layout="row">
                    <div class="extra-light-black fs24" flex>{{item.buyDate}}</div>
                    <div class="fwb">
                        <span class="">{{item.ticketStatus|ticketStatus}}</span>
                    </div>
                </div>
            </div>
            <m-load-more :loading="isLoadOver"></m-load-more>
        </div>
        <!--筛选条件-->
        <popup-right v-model="showView">
            <div v-if="showViewType == 1" class="query-box">
                <div class="p-l-4 p-r-4">
                    <div class="m-b-3">
                        <div class="title p-t-4 p-b-4 fs32 fwb">验券状态</div>
                        <div >
                            <div @click="changeSearchData('ticketStatus', item.value)" v-for="(item, key) in ticketStatuList" :key="key" class="query-item" :class="{'act': searchData.ticketStatus==item.value}">{{item.name}}</div>
                        </div>
                    </div>
                </div>
                <div class="p-l-4 p-r-4">
                    <div class="m-b-3">
                        <div class="title p-t-4 p-b-4 fs32 fwb">时间周期</div>
                        <div class="date-input" layout="row" layout-align="center center">
                            <input flex v-model="searchData.startTime" type="date" placeholder="开始日期">
                            <div class="cell-box">至</div>
                            <input flex v-model="searchData.endTime" type="date" placeholder="结束日期">
                        </div>
                    </div>
                </div>
                <div class="p-l-4 p-r-4">
                    <div class="">
                        <div class="title p-t-4 p-b-4 fs32 fwb">活动名称</div>
                    </div>
                </div>
                <div @click="changePopupType(2)" class="bg-default cell p-l-4 p-r-4 extra-black" layout="row" layout-align="start center">
                    <div flex>
                        <span v-if="searchData.purchaseMallItemId">{{searchData.purchaseMallItemId|getName(promotionList, 'title', 'purchaseMallItemId')}}</span>
                        <span v-else>查询具体活动名称</span>
                    </div>
                    <div flex="10" class="text-right">
                        <div @click.stop="searchData.purchaseMallItemId = null" v-if="searchData.purchaseMallItemId">
                            <m-icon link="icon-huabanfuben29"></m-icon>
                        </div>
                        <div v-else>
                            <m-icon link="icon-xiangyouicon"></m-icon>
                        </div>
                    </div>
                </div>

                <div class="btn-box-padding"></div>
                <div class="btn-box" layout="row">
                    <button @click="resetQueryData" flex class="btn-back">重置</button>
                    <button @click="search" flex class="btn-submit">确定</button>
                </div>
            </div>
            <div v-else-if="showViewType == 2">
                <div class="popup-search-box" layout="row">
                    <div class="p-2" @click="changePopupType(1)">
                        <m-icon link="icon-left-bold"></m-icon>
                    </div>
                    <div flex class="p-2">
                        <input type="text" v-model="searchText" @keydown.enter="searchPromotion" class="text-center" placeholder="查询具体活动/产品名称">
                    </div>
                    <div class="p-2" @click="searchPromotion">搜索</div>
                </div>
                <div>
                    <div @click="searchData.purchaseMallItemId = item.purchaseMallItemId;changePopupType(1)" v-for="(item, index) in promotionList" :key="index" class="border-bottom cell cell-box">
                        {{item.title}}
                    </div>
                </div>
            </div>
        </popup-right>
    </div>
</template>

<script>
import Vue from 'vue';
import {
    InfiniteScroll
} from 'mint-ui';
Vue.use(InfiniteScroll);
import api_b2bmall from 'services/api.b2bmall';
import popupRight from 'components/popup-right';
import mLoadMore from 'components/m-load-more';
export default {
    name: 'sell-detail',
    props: ['id'],
    data() {
        return {
            showView: false,
            showViewType: 1,
            orderList: [],
            promotionListTemp: [],
            promotionList: [],
            searchText: '',
            ticketStatuList: [
                { name: '未使用', value: 1 },
                { name: '已使用', value: 4 }
            ],
            loading: false,
            isLoadOver: false, // false已加载完所有数据
            query: {
                merchantId: this.$store.state.party.merchantId,
                purchaseMallItemId: null,
                page: 1,
                size: 10,
                total: 0
            },
            searchData: {
                ticketStatus: null,
                startTime: null,
                endTime: null,
                purchaseMallItemId: null
            }
        };
    },
    components: {
        popupRight,
        mLoadMore
    },
    mounted() {
        this.loadData();
        this.queryPromotion();
    },
    methods: {
        search() {
            this.resetQuery();
            if (this.searchData.startTime) {
                this.query.startTime = this.$moment(this.searchData.startTime).startOf('day').format('YYYY-MM-DD HH:mm:ss');
            }
            if (this.searchData.endTime) {
                this.query.endTime = this.$moment(this.searchData.endTime).endOf('day').format('YYYY-MM-DD HH:mm:ss');
            }
            this.query.ticketStatus = this.searchData.ticketStatus;
            this.query.purchaseMallItemId = this.searchData.purchaseMallItemId;
            this.showView = false;
            this.loadData();
        },
        changeSearchData(key, value) {
            if (this.searchData[key] == value) {
                this.searchData[key] = null;
            } else {
                this.searchData[key] = value;
            }
        },
        changePopupType(type) {
            this.showViewType = type;
        },
        resetQueryData() {
            this.searchData = {
                ticketStatus: null,
                startTime: null,
                endTime: null,
                purchaseMallItemId: null
            };
        },
        loadMore() {
            if (this.isLoadOver) {
                this.loadData();
            }
        },
        async loadData() {
            let data = this.$knife.deepCopy(this.query);
            this.loading = true;
            this.$indicator.open();
            let res = await api_b2bmall.getPurchaseMallSellOrderList(data);
            this.$indicator.close();
            if (!res.data.rows) {
                res.data.rows = [];
            }
            if (res.data.rows.length < this.query.size) {
                this.isLoadOver = false;
            } else {
                this.isLoadOver = true;
            }
            this.orderList = this.orderList.concat(res.data.rows);
            this.loading = false;
            this.query.total = res.data.total;
            this.query.page++;
        },
        resetQuery() {
            this.query.page = 1;
            this.orderList = [];
        },
        async queryPromotion() {
            let data = {
                merchantId: this.$store.state.party.merchantId
            };
            this.$indicator.open();
            let res = await api_b2bmall.getPurchaseMallSell(data);
            this.$indicator.close();
            this.promotionListTemp = res.data;
            this.searchPromotion();
        },
        searchPromotion() {
            if (this.searchText) {
                this.promotionList = this.promotionListTemp.filter(item => {
                    return item.title.indexOf(this.searchText) !== -1;
                });
            } else {
                this.promotionList = this.$knife.deepCopy(this.promotionListTemp);
            }
        },
        back() {
            this.$router.back();
        },
        showQuery() {
            this.showView = true;
            this.showViewType = 1;
        }
    },
    filters: {
        ticketStatus(value) {
            let text = '';
            switch (Number(value)) {
                case 0:
                    text = '未发券';
                    break;
                case 1:
                    text = '未使用';
                    break;
                case 2:
                    text = '不可用';
                    break;
                case 3:
                    text = '已过期';
                    break;
                case 4:
                    text = '已使用';
                    break;
                case 5:
                    text = '已退款';
                    break;
            }
            return text;
        }
    }
};
</script>

<style scoped lang='less'>
@import '~styles/_agile';
.b2b-mall-order-list-sell-detail {
    @color-primary: #854399;
    .color-primary {
        color: @color-primary;
    }
    .total-box {
        box-shadow:0px 4px 17px 0px rgba(75,110,150,0.11);
        border-radius:2px;
        background:@white;
        padding: 8px;
        .plain1{
            padding: 8px;
        }
        .title-img{
            width: 34px;
            height:34px;
            border-radius: 2px;
        }
    }
    .list-item{
        margin-bottom: 12px;
        .title-img{
            width:34px;
            height:34px;
            border-radius: 50%;
        }
        .group-tag{
            padding: 0 6px;
            color: @color-primary;
            border: 1px solid @color-primary;
            border-radius: 2px;
            font-size: 12px;
        }
    }
    .query-box{
        .query-item{
            padding: 8px;
            text-align: center;
            background: @bg-gray;
            border: 1px solid @bg-gray;
            color: @extra-black;
            border-radius: 2px;
            margin-bottom: 8px;
            &.act{
                border-color: @color-primary;
                background: @white;
                color: @color-primary;
            }
        }
        .date-input{
            input {
                height:34px;
                border-radius: 2px;
                background: @bg-gray;
                color: @color-primary;
                border:1px solid #E3E3E3;
            }
        }
        .btn-box-padding{
            height: 50px;
        }
        .btn-box{
            height: 50px;
            width: 100%;
            position: absolute;
            bottom: 0;
            left:0;
            button{
                height: 100%;
                font-size: 16px;
            }
            .btn-back{
                background: @bg-gray;
            }
            .btn-submit{
                color: @white;
                background: @color-primary;
            }
        }
    }
    .popup-search-box {
        height: 49px;
        line-height: 49px - 16px;
        border: 1px solid @border-gay;
        input {
            height: 100%;
            width: 100%;
            background-color: @bg-gray;
        }
    }
}
</style>
