<template>
    <div v-title="'服务记录'" class="service-record-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-immediate-check="false" infinite-scroll-distance="10">
        <div class="header">
            <img :src="require('assets/imgs/service-header.png')" class="bg-img">
            <div class="text-center">
                <p class="top-title">本周服务</p>
            </div>
            <div layout="row" class="option-panel">
                <div class="text-center" :class="{ 'option-selected': query.status == 1 }" flex @click="changeStatus(1)">
                    <p>{{this.unrecordedModel.total}}</p>
                    <p>待记录</p>
                </div>
                <span class="interval-line"></span>
                <div class="text-center" :class="{ 'option-selected': query.status == 2 }" flex @click="changeStatus(2)">
                    <p>{{this.recordedModel.total}}</p>
                    <p>已记录</p>
                </div>
            </div>
        </div>
        <div>
            <service-record-cell v-for="(item, index) in dataList" :key="index" @click.native="editClick(item)"></service-record-cell>
            <m-load-more :loading="!scrollDisabled"></m-load-more>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import {
    InfiniteScroll
} from 'mint-ui';
Vue.use(InfiniteScroll);
import mLoadMore from 'components/m-load-more';
import api_service_note from 'services/api.serviceNote';
import serviceRecordCell from 'pages/module/service-record-cell';

export default {
    name: 'service-record-list',
    components: {
        mLoadMore,
        serviceRecordCell
    },
    data() {
        return {
            query: {
                merchantId: this.$store.getters.merchantId,
                storeIds: this.$store.getters.storeIds,
                startDate: '',
                endDate: '',
                employeeId: '',
                status: -1,
                type: 1,
                page: 1,
                rows: 20
            },
            unrecordedModel: {
                list: [],
                page: 1,
                total: 0
            },
            recordedModel: {
                list: [],
                page: 2,
                total: 0
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

        this.changeStatus(1);
    },
    methods: {
        loadData() {
            this.loading = true;
            api_service_note.queryServiceRecord(this.getQuery()).then(res => {
                if (res.data.rows.length < this.query.rows) {
                    this.scrollDisabled = true;
                } else {
                    this.scrollDisabled = false;
                }
                this.dataList = this.dataList.concat(res.data.rows);
                this.activeModel.total = res.data.total;
                this.activeModel.page++;
                this.loading = false;
            }, err => {
                this.loading = false;
            });
        },
        loadCount() {
            api_service_note.serviceRecordCount(this.getQuery()).then(res => {
                this.unrecordedModel.total = res.data.waitCount;
                this.recordedModel.total = res.data.recordCount;
            });
        },
        getQuery() {
            return this.query;
        },
        resetQuery() {
            this.query.page = 1;
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
                if (status == 1) {
                    this.activeModel = this.unrecordedModel;
                } else if (status == 2) {
                    this.activeModel = this.recordedModel;
                }
                this.query.status = status;
                this.dataList = this.activeModel.list;
                this.query.page = this.activeModel.page;
                if (!this.dataList.length) {
                    this.loadData();
                }
            }
        },
        editClick(item) {
            if (this.query.status != 1) {
                return;
            }
            this.$router.push({
                name: 'service-record-edit',
                params: {
                    recordId: item.id
                }
            });
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
