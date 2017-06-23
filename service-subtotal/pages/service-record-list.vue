<template>
    <div v-title="'服务记录'" class="service-record-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-immediate-check="false" infinite-scroll-distance="10">
        <div class="header">
            <img :src="require('assets/imgs/service-header.png')" class="bg-img">
            <div class="text-center">
                <p class="top-title">本周服务</p>
            </div>
            <div layout="row" class="option-panel">
                <div class="text-center" :class="{ 'option-selected': query.type == 1 }" flex @click="changeType(1)">
                    <p>45</p>
                    <p>待记录</p>
                </div>
                <span class="interval-line"></span>
                <div class="text-center" :class="{ 'option-selected': query.type == 2 }" flex @click="changeType(2)">
                    <p>45</p>
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
                type: 1
            },
            dataList: [],
            loading: false,
            scrollDisabled: false
        };
    },
    mounted() {
        this.loadData();
    },
    methods: {
        loadData() {
            // TODO: 加载数据
            this.loading = true;
            setTimeout(() => {
                for (var i = 10; i >= 0; i--) {
                    this.dataList.push({
                        id: i + '2313'
                    });
                }
                this.loading = false;
            }, 1000);
        },
        loadMore() {
            this.loadData();
        },
        changeType(type) {
            this.dataList = [];
            this.query.type = type;
            this.loadData();
        },
        editClick(item) {
            if (this.query.type != 1) {
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
