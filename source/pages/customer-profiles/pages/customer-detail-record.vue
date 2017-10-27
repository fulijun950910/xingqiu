<template>
    <div class="customer-detail-record">
        <div class="card">
            <p class="title" layout="row" layout-align="space-between center">
                <span><m-icon class="mr8" xlink="#icon-record"/> 护理记录</span>
                <span class="back-primary">
                    <m-icon xlink="#icon-add-border"/>
                </span>
            </p>
            <div class="content">
                <m-timeline :values="timeDataList"></m-timeline>
            </div>
        </div>
    </div>
</template>

<script>
import mTimeline from 'components/m-timeline';
export default {
    name: 'customer-detail-record',
    components: {
        mTimeline
    },
    data() {
        return {
            timeDataList: [
                {
                    name: '唐悠悠1',
                    time: '2017-10-02 12:12:45',
                    desc: '客户对服务非常的满意',
                    images: []
                },
                {
                    name: '唐悠悠2',
                    time: '2014-8-18 12:12:45',
                    desc: '客户对服务非常的满意',
                    images: []
                },
                {
                    name: '唐悠悠3',
                    time: '2014-8-12 12:12:45',
                    desc: '客户对服务非常的满意',
                    images: []
                },
                {
                    name: '唐悠悠4',
                    time: '2017-8-02 12:12:45',
                    desc: '客户对服务非常的满意',
                    images: []
                },
                {
                    name: '唐悠悠5',
                    time: '2014-5-18 12:12:45',
                    desc: '客户对服务非常的满意',
                    images: []
                },
                {
                    name: '唐悠悠6',
                    time: '2014-8-22 12:12:45',
                    desc: '客户对服务非常的满意',
                    images: []
                }
            ]
        };
    },
    methods: {
    }
};
</script>

<style lang="less">
    @import '~styles/_agile.less';
    .customer-detail-record {
        padding-top: 12px;
        font-size: 14px;
        .card {
            background-color: white;
            .title {
                padding: 12px;
                border-bottom: 1px solid #eee;
                .back-primary {
                    display: inline-block;
                    width: 24px;
                    height: 24px;
                    line-height: 24px;
                    text-align: center;
                    font-size: 16px;
                    border-radius: 5px;
                    background-color: @color-primary;
                    color: white;
                }
            }
            .content {
                padding-bottom: 12px;
                .item {
                    border: 1px solid #eee;
                    border-radius: 4px;
                    padding: 8px 12px;
                    margin: 12px;
                    line-height: 24px;
                }
            }
        }
    }
</style>
