<template>
    <div v-title="'收支明细'" class="payNotes cell-box" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-immediate-check="false" infinite-scroll-distance="10">
        <div class="blanceBox" layout="column" layout-align="center center">
            <div class="blance color-white">{{blanceTotal.doudouBalance}}</div>
            <div class="fs24 color-white-light">当前账户美豆豆</div>
        </div>
        <div class="cell" layout="row" layout-align="space-between center">
            <div class="dateBox">
                <m-icon class="fs36" xlink="#icon-datezhuanhuan"></m-icon>
                <span class="fs24">{{date|amDateFormat('YYYY.MM')}}</span>
                <input class="dateInput" @change="load(true)" type="month" v-model="date">
            </div>
            <div class="fs24 color-gray">
                <span>收入:</span>
                <span class="color-success">{{dataModel.income}}</span>
                <span>&nbsp;&nbsp;</span>
                <span>支出:</span>
                <span class="color-error">{{dataModel.expenditure}}</span>
            </div>
        </div>
        <!-- 主体-->
        <div class="popup-right-box" flex >
            <div>
                <div v-for="item in dataList"  class="popup-right-list-cell" :key="item.id" >
                    <div v-if="item.changeAmount>=0" class="list-item success cell cell-box" layout="row" layout-align="space-between center">
                        <div layout="row" layout-align="start start">
                            <div class="iconBox" layout="row" layout-align="center center">
                                <m-icon class="" xlink="#icon-jiantou-copy-copy"></m-icon>
                            </div>
                            <span>&nbsp;&nbsp;</span>
                            <div>
                                <div>{{item.notes}}</div>
                                <div class="fs24 extra-light-black">{{item.changeDate | amDateFormat('MM.DD')}}</div>
                            </div>
                        </div>
                        <div class="price">
                            +{{item.changeAmount}}
                        </div>
                    </div>
                    <div v-else class="list-item error cell cell-box" layout="row" layout-align="space-between center">
                        <div layout="row" layout-align="start start">
                            <div class="iconBox" layout="row" layout-align="center center">
                                <m-icon class="" xlink="#icon-jiantou-copy-copy"></m-icon>
                            </div>
                            <span>&nbsp;&nbsp;</span>
                            <div>
                                <div>{{item.notes}}</div>
                                <div class="fs24 extra-light-black">{{item.changeDate | amDateFormat('MM.DD')}}</div>
                            </div>
                        </div>
                        <div class="price">
                            {{item.changeAmount}}
                        </div>
                    </div>
                </div>
                <m-load-more :loading="loadOver"></m-load-more>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import mLoadMore from 'components/m-load-more';
import { InfiniteScroll } from 'mint-ui';
import api_party from 'services/api.party';
Vue.use(InfiniteScroll);

export default {
    name: 'payNotes',
    props: ['accountId'],
    components: {
        'm-load-more': mLoadMore
    },
    data() {
        return {
            date: this.$moment().format('YYYY/MM/DD'),
            dataModel: {},
            blanceTotal: 0,
            dataList: [],
            loading: false,
            query: {
                page: 1,
                size: 15,
                query: [
                    { field: 'accountId', value: this.accountId }
                ]
            },
            loadOver: true
        };
    },
    mounted() {
        this.load();
        this.loadData();
    },
    methods: {
        loadData() {
            this.$indicator.open();
            api_party.getAccount(this.$store.state.party.partyId).then(res => {
                this.$indicator.close();
                this.blanceTotal = res.data;
            });
        },
        loadMore() {
            if (this.loadOver) {
                this.load();
            }
        },
        load(reset) {
            if (reset) {
                this.query.page = 1;
                this.dataList = [];
            }
            this.loading = true;
            let query = JSON.parse(JSON.stringify(this.query));
            if (this.date) {
                query.query.push({ field: 'startTime', value: this.$moment(this.date).startOf('month').format('YYYY-MM-DD HH:mm:ss') });
                query.query.push({ field: 'endTime', value: this.$moment(this.date).endOf('month').format('YYYY-MM-DD HH:mm:ss') });
            }

            api_party.getAccountList(query).then(res => {
                if (res.data.list) {
                    this.dataList = this.dataList.concat(res.data.list);
                    this.dataModel = res.data;
                    this.loading = false;
                    this.query.page++;
                    if (res.data.list.length < this.query.size) {
                        this.loadOver = false;
                    } else {
                        this.loadOver = true;
                    }
                }
            });
        }
    }
};
</script>

<style scoped lang='less'>
    @import '~styles/_style';
    @color-red-lighten: #EC3F6D;
    @color-success:#EE5253;
    @color-error:#14CC8A;

    .payNotes{
        &:before{
            content:'';
            display:table;
        }
    }

    .color-white-light{
        color: rgba(255,255,255,0.6);
    }
    .color-success{
        color:@color-success;
    }
    .color-error{
        color:@color-error;
    }
    .blanceBox{
        margin-top:@l32;
        height:147px;
        background:url("~assets/imgs/index/20180510155101.png") no-repeat top center;
        background-size:100% 100%;
        margin-bottom:@l16;
        .blance{
            font-size:30px;
        }
    }
    .list-item{
        border: 1px solid @border-gay;
        margin-bottom:@l32;
        .iconBox{
            width:24px;
            height:24px;
            border-radius: 12px;
            background: lighten(@color-success, 32%);
            .icon{
                color:@color-success;
            }
        }
        &.success{
            .iconBox{
                background: lighten(@color-success, 34%);
                .icon{
                    transform:rotate(180deg);
                    color:@color-success;
                }
            }
            .price{
                color:@color-success;
            }
        }
        &.error{
            .iconBox{
                background: lighten(@color-error, 48%);
                .icon{
                    color:@color-error;
                }
            }
            .price{
                color:@color-error;
            }
        }
    }
    .dateBox{
        position:relative;
        .dateInput{
            position:absolute;
            top:-10px;
            left:-10px;
            width:100%;
            height:100%;
            opacity: 0;
            padding:10px;
            box-sizing: content-box;
        }
    }

</style>
