<template>
    <div class="customer-detail-service">
        <div class="loading color-tiffany-blue" v-show="isLoading">
            <span style="display: inline-block;"><mt-spinner  color="#00CBC7" type="fading-circle"></mt-spinner></span>
        </div>
        <div class="card">
            <p class="title">
                <span><m-icon class="mr8" xlink="#icon-tel"/> 回访关怀</span>
            </p>
            <div class="content" v-for="(item, index) in dataList" :key="index" layout="row" layout-align="space-between start">
                <div class="ava ft12 text-center" layout="column" layout-align="center center">
                    <p>{{newDate(item.lastUpdateTimestamp).formatDate('MM.dd')}}</p>
                    <p>{{newDate(item.lastUpdateTimestamp).formatDate('yyyy年')}}</p>
                </div>
                <div class="block" flex>
                    <p>技师：李某某</p>
                    <p class="ft12 ft-light dark-gray">技师：李技师：李某某技师：李某某技师：李某某技师：李某某某某</p>
                    <div class="image" layout="row" layout-align="start start" flex-wrap="wrap">
                        <img v-for="(img, index) in 1" :key="index" src="" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api_customerProfiles from 'services/api.customerProfiles';
import moment from 'moment';
export default {
    name: 'customer-detail-service',
    components: {},
    data() {
        return {
            dataList: [],
            isLoading: false,
            pageIndex: 1,
            total: 0,
            param: {
                storeId: this.$store.getters.storeId,
                merchantId: this.$store.getters.merchantId,
                startDate: null,
                endDate: null,
                type: 2,
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
            this.param.startDate = moment().subtract(1, 'year').format('YYYY-MM-DD hh:mm:ss');
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
                        time: x.createTimestamp,
                        desc: x.content,
                        images: x.imageIds
                    };
                });
                this.dataList = this.dataList.concat(data);
                this.total = res.data.total;
            }, err => {
                this.$toast('加载失败');
                this.isLoading = false;
            });
        }
    }
};
</script>

<style lang="less">
    @import '~styles/_agile.less';
    .customer-detail-service {
        padding-top: 12px;
        font-size: 14px;
        .card {
            background-color: white;
            .title {
                padding: 12px;
                border-bottom: 1px solid #eee;
            }
            .content {
                padding: 12px;
                border-bottom: 1px solid #eee;
                .ava {
                    width: 50px;
                    height: 50px;
                    background: #3FCEC9;
                    border-radius: 5px;
                    color: white;
                }
                .block {
                    padding: 0 12px;
                    .image {
                        margin-top: 8px;
                        img {
                            width: 70px;
                            height: 70px;
                            margin-bottom: 8px;
                            margin-right: 8px;
                        }
                    }
                }
            }
        }
    }
</style>
