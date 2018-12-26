<template>
    <div class="b2b-mall-ticket-index">
        <div class="cell cell-box">
            <div class="total-box" layout="row" layout-align="start end">
                <div flex>
                    <div>待验券人数</div>
                    <div class="m-t-1"><span class="fwb fs52">{{$store.state.b2bMallData.verifyTicketNum}}</span> 人</div>
                </div>
                <div>
                    <button @click="gonVerityTicket" class="goVerifyTicketBtn">去验券</button>
                </div>
            </div>
        </div>
        <div class="cell cell-box m-t-4 fs28 extra-light-black" layout="row">
            <div flex>{{query.total}}条订单</div>
            <div @click="showQuery" class="p-l-2">筛选<m-icon link='icon-xia'></m-icon></div>
        </div>
        <div class="order-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-immediate-check="false" infinite-scroll-distance="10">
            <div v-for="(item, key) in promotionList" :key="key" class="list-item bg-white cell-box">
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
            <div class="query-box">
                <div class="query-content">
                    <div class="m-b-3">
                        <div class="title p-t-4 p-b-4 fs32 fwb">验券状态</div>
                        <div >
                            <div @click="searchData.ticketStatus = item.value" v-for="(item, key) in ticketStatuList" :key="key" class="query-item" :class="{'act': searchData.ticketStatus==item.value}">{{item.name}}</div>
                        </div>
                    </div>
                </div>
                <div class="query-content">
                    <div class="m-b-3">
                        <div class="title p-t-4 p-b-4 fs32 fwb">时间周期</div>
                        <div class="date-input" layout="row" layout-align="center center">
                            <input flex v-model="searchData.startTime" type="date" placeholder="开始日期">
                            <div class="cell-box">至</div>
                            <input flex v-model="searchData.endTime" type="date" placeholder="结束日期">
                        </div>
                    </div>
                </div>
                <div class="btn-box-padding"></div>
                <div class="btn-box" layout="row">
                    <button @click="showView = false;" flex class="btn-back">取消</button>
                    <button @click="search" flex class="btn-submit">确定</button>
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
    name: 'ticket-index',
    data() {
        return {
            showView: false,
            promotionData: {},
            promotionList: [],
            ticketStatuList: [
                { name: '全部', value: null },
                { name: '未使用', value: 1 },
                { name: '已使用', value: 4 }
            ],
            loading: false,
            isLoadOver: false, // false已加载完所有数据
            query: {
                merchantId: this.$store.state.party.merchantId,
                page: 1,
                size: 10,
                total: 0
            },
            searchData: {
                ticketStatus: null,
                startTime: null,
                endTime: null
            }
        };
    },
    components: {
        popupRight,
        mLoadMore
    },
    mounted() {
        if (this.$store.state.b2bMallData.verifyTicketNum || this.$store.state.b2bMallData.verifyTicketNum == 0) {
            this.loadData();
        } else {
            this.back();
        }
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
            this.showView = false;
            this.loadData();
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
            this.promotionList = this.promotionList.concat(res.data.rows);
            this.loading = false;
            this.query.total = res.data.total;
            this.query.page++;
        },
        resetQuery() {
            this.query.page = 1;
            this.promotionList = [];
        },
        back() {
            this.$router.replace({
                name: 'b2b-mall-index'
            });
        },
        showQuery() {
            this.showView = true;
        },
        gonVerityTicket() {
            window.location.href = '/lite/index.html#/verityCoupoon';
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
@import 'b2b-mall-style';
.b2b-mall-ticket-index {
    font-size: 13px;
    min-height: 100vh;
    background: @bg-gray;
    .total-box {
        box-shadow:0px 4px 17px 0px rgba(75,110,150,0.11);
        border-radius:4px;
        background:@white;
        padding: 24px 20px;
        .plain1{
            padding: 8px;
        }
        .title-img{
            width: 34px;
            height:34px;
            border-radius: 2px;
        }
    }
    .goVerifyTicketBtn{
        background: @color-primary;
        border-radius: 2px;
        font-size: 14px;
        color: #fff;
        padding: 4px 16px;
        font-weight: bold;
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
        .query-content{
            padding: 20px;
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
}
</style>
