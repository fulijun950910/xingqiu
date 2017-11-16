<template>
    <div class="customer-detail-record">
        <div class="loading color-tiffany-blue" v-show="isLoading">
            <span style="display: inline-block;"><mt-spinner  color="#00CBC7" type="fading-circle"></mt-spinner></span>
        </div>
        <div class="card">
            <p class="title" layout="row" layout-align="space-between center">
                <span><m-icon class="mr8" xlink="#icon-record"/> 护理记录</span>
                <span class="back-primary" @click="toCreateRecord">
                    <m-icon xlink="#icon-add-border"/>
                </span>
            </p>
            <div class="content" v-if="timeDataList && timeDataList.length">
                <m-timeline :values="timeDataList"></m-timeline>
            </div>
        </div>
    </div>
</template>

<script>
import api_customerProfiles from 'services/api.customerProfiles';
import mTimeline from 'components/m-timeline';
import moment from 'moment';
export default {
    name: 'customer-detail-record',
    components: {
        mTimeline
    },
    data() {
        return {
            timeDataList: [],
            isLoading: false,
            pageIndex: 1,
            total: 0,
            param: {
                storeId: this.$store.getters.storeId,
                merchantId: this.$store.getters.merchantId,
                memberId: this.$route.params.customerId,
                startDate: null,
                endDate: null,
                type: '1',
                keyword: null
            },
            sort: {
                field: 'recordTime',
                sort: 'desc'
            }
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            var paramData = {
                query: [],
                sort: [],
                page: this.pageIndex,
                size: 20
            };
            this.param.startDate = moment().subtract(10, 'year').format('YYYY-MM-DD hh:mm:ss');
            this.param.endDate = new Date().formatDate('yyyy-MM-dd hh:mm:ss');
            Object.keys(this.param).forEach(key => {
                paramData.query.push({
                    field: key,
                    value: this.param[key]
                });
            });
            if (this.sort) {
                paramData.sort.push(this.sort);
            };
            this.isLoading = true;
            api_customerProfiles.serviceCenter(paramData).then(res => {
                this.isLoading = false;
                let data = res.data.rows.map(x => {
                    return {
                        name: x.employeeName,
                        time: x.recordTime,
                        desc: x.content,
                        orderContent: x.orderContent,
                        images: x.imageIds ? x.imageIds.split(',') : []
                    };
                });
                this.timeDataList = this.timeDataList.concat(data);
                this.total = res.data.total;
            }, err => {
                this.$toast('加载失败');
                this.isLoading = false;
            });
        },
        toCreateRecord() {
            window.location.href = '/service/service-subtotal.html#/service-record-list';
        }
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
                padding: 12px;
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
