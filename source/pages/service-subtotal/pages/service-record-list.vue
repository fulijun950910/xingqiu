<template>
    <div v-title="'服务记录'" class="service-record-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-immediate-check="false" infinite-scroll-distance="10">
        <div class="header">
            <img :src="require('assets/imgs/service-header.png')" class="bg-img">
            <div class="text-center">
                <p class="top-title">本周服务</p>
            </div>
            <div layout="row" class="option-panel">
                <div class="text-center" :class="{ 'option-selected': query.status == 0 }" flex @click="changeStatus(0)">
                    <p>{{this.unrecordedModel.total}}</p>
                    <p>待记录</p>
                </div>
                <span class="interval-line"></span>
                <div class="text-center" :class="{ 'option-selected': query.status == 1 }" flex @click="changeStatus(1)">
                    <p>{{this.recordedModel.total}}</p>
                    <p>已记录</p>
                </div>
            </div>
        </div>
        <div>
            <service-record-cell v-for="(item, index) in dataList" :key="index" :mData="item" @click.native="editClick(item)"></service-record-cell>
            <m-load-more :loading="!scrollDisabled" v-show="dataList.length != 0 || loading"></m-load-more>
        </div>
        <no-data :visible="dataList.length == 0 && !loading" :showButton="false"></no-data>
    </div>
</template>
<script>
import Vue from 'vue';
import {
    InfiniteScroll
} from 'mint-ui';
Vue.use(InfiniteScroll);
import noData from 'components/no-data';
import mLoadMore from 'components/m-load-more';
import api_service_note from 'services/api.serviceNote';
import serviceRecordCell from './module/service-record-cell';

export default {
    name: 'service-record-list',
    components: {
        noData,
        mLoadMore,
        serviceRecordCell
    },
    data() {
        return {
            query: {
                merchantId: this.$store.getters.merchantId,
                startDate: '',
                endDate: '',
                employeeId: this.$store.state.user.id,
                status: -1,
                type: 1,
                page: 1,
                rows: 20
            },
            unrecordedModel: {
                list: [],
                page: 1,
                total: 0,
                scrollDisabled: false
            },
            recordedModel: {
                list: [],
                page: 1,
                total: 0,
                scrollDisabled: false
            },
            dataList: [],
            activeModel: null,
            loading: false,
            scrollDisabled: false
        };
    },
    mounted() {
        this.query.startDate = this.$moment().startOf('isoWeek').format('YYYY-MM-DD HH:mm:ss');
        this.query.endDate = this.$moment().endOf('isoWeek').format('YYYY-MM-DD HH:mm:ss');
        this.changeStatus(0);
        this.loadCount();
    },
    methods: {
        loadData() {
            if (this.activeModel.scrollDisabled) {
                return;
            }
            this.loading = true;
            api_service_note.queryServiceRecord(this.getQuery()).then(res => {
                if (res.data.rows.length < this.query.rows) {
                    this.scrollDisabled = true;
                } else {
                    this.scrollDisabled = false;
                }
                this.dataList = this.dataList.concat(res.data.rows);
                this.activeModel.scrollDisabled = this.scrollDisabled;
                this.activeModel.total = res.data.total;
                this.activeModel.list = this.dataList;
                this.activeModel.page++;

                this.loading = false;
            }, err => {
                this.loading = false;
            });
        },
        loadCount() {
            var temp = {};
            this.$knife.deepCopy(this.query, temp);
            temp.status = undefined;
            api_service_note.serviceRecordCount(temp).then(res => {
                this.unrecordedModel.total = res.data.waitCount;
                this.recordedModel.total = res.data.recordCount;
            });
        },
        getQuery() {
            this.query.page = this.activeModel.page;
            return this.query;
        },
        resetQuery() {
            this.activeModel.page = 1;
            this.activeModel.scrollDisabled = false;
            this.scrollDisabled = false;
            this.dataList = [];
        },
        loadMore() {
            this.loadData();
        },
        changeStatus(status) {
            if (this.loading) {
                return;
            }
            if (this.query.status == status) {
                this.resetQuery();
                this.loadData();
            } else {
                if (status == 0) {
                    this.activeModel = this.unrecordedModel;
                } else if (status == 1) {
                    this.activeModel = this.recordedModel;
                }
                this.query.status = status;
                this.dataList = this.activeModel.list;
                this.scrollDisabled = this.activeModel.scrollDisabled;
                if (!this.dataList.length) {
                    this.loadData();
                }
            }
        },
        editClick(item) {
            if (item && item.id) {
                let routeName = 'service-record-create';
                if (item.status == 1) {
                    routeName = 'service-record-edit';
                }
                this.$router.push({
                    name: routeName,
                    params: {
                        serviceId: item.id
                    },
                    query: {
                        memberId: item.memberId
                    }
                });
            }
        }
    }
};
</script>
<style lang="less">
@import '~styles/_agile';
.service-record-list {
    .header {
        position: relative;
        .bg-img {
            width: 100%;
            height: 100%;
            position: absolute;
        }
        .top-title {
            z-index: 1;
            color: @white;
            line-height: 1;
            font-size: @fs28;
            margin: @l40 auto;
            text-align: center;
            position: relative;
            display: inline-block;
            .line {
                content: '';
                width: @l32;
                opacity: 0.5;
                height: @l8 / 2;
                position: absolute;
                top: (@fs28 - @l8) / 2;
                background-color: @white;
            }
            &:after {
                .line;
                left: -@l32 - @l16;
            }
            &:before {
                .line;
                right: -@l32 - @l16;
            }
        }
        .option-panel {
            color: @white;
            font-size: @fs32;
            position: relative;
            z-index: 1;
            div {
                padding: @l32 0;
            }
            p {
                opacity: 0.5;
            }
        }
        .option-selected {
            position: relative;
            p {
                opacity: 1;
            }
            &:after {
                left: 50%;
                content: '';
                height: @l8;
                width: 60px;
                bottom: 0px;
                position: absolute;
                background-color: @white;
                transform: translateX(-50%);
            }
        }
        .interval-line {
            width: 1px;
            /*no*/
            max-width: 1px;
            /*no*/
            margin: @l32 0;
            background-color: @white;
        }
    }
}
</style>
