<template>
    <div class="customer-detail-service">
        <div class="p-t-4 p-b-4 text-center color-tiffany-blue"
             v-show="isLoading">
            <span style="display: inline-block;">
                <mt-spinner color="#00CBC7"
                            type="fading-circle"></mt-spinner>
            </span>
        </div>
        <div class="card">
            <p class="title"
               layout="row"
               layout-align="space-between center">
                <span>
                    <m-icon class="mr8"
                            xlink="icon-tel" /> 回访关怀</span>
                <span class="back-primary"
                      @click="toCreateRecord">
                    <m-icon xlink="icon-add-border" />
                </span>
            </p>
            <div class="content"
                 v-for="(item, index) in dataList"
                 :key="index"
                 layout="row"
                 layout-align="space-between start">
                <div class="ava ft12 text-center"
                     layout="column"
                     layout-align="center center">
                    <p>{{item.recordTime.formatDate('MM.dd')}}</p>
                    <p>{{item.recordTime.formatDate('yyyy年')}}</p>
                </div>
                <div class="block"
                     flex>
                    <p>技师：{{item.employeeName}}</p>
                    <p class="ft12 ft-light dark-gray">{{item.content}}</p>
                    <div class="image"
                         v-if="item.imageIds"
                         layout="row"
                         layout-align="start start"
                         flex-wrap="wrap">
                        <img v-for="(img, index) in item.imageIds.split(',')"
                             :key="index"
                             :src="img | mSrc(80, 80, require('assets/imgs/nullimg.jpg'))"
                             @click="showNativeImg(img)">
                    </div>
                </div>
            </div>
        </div>
        <m-gallery v-model="currentImg"
                   :show.sync="showCurrentImg"></m-gallery>
    </div>
</template>

<script>
import Vue from 'vue';
import api_customerProfiles from 'services/api.customerProfiles';
import moment from 'moment';
import mGallery from 'components/m-gallery';
import { Spinner } from 'mint-ui';
Vue.component(Spinner.name, Spinner);

export default {
    name: 'customer-detail-service',
    data() {
        return {
            currentImg: null,
            showCurrentImg: false,
            dataList: [],
            isLoading: false,
            pageIndex: 1,
            total: 0,
            param: {
                storeId: this.$store.getters.storeId,
                merchantId: this.$store.getters.merchantId,
                memberId: this.$route.params.customerId,
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
    components: {
        mGallery
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
            this.param.startDate = moment()
                .subtract(10, 'year')
                .format('YYYY-MM-DD hh:mm:ss');
            this.param.endDate = new Date().formatDate('yyyy-MM-dd hh:mm:ss');
            Object.keys(this.param).forEach(key => {
                paramData.query.push({
                    field: key,
                    value: this.param[key]
                });
            });
            if (this.sort) {
                paramData.sort.push(this.sort);
            }
            this.isLoading = true;
            api_customerProfiles.serviceCenter(paramData).then(
                res => {
                    this.isLoading = false;
                    this.dataList = this.dataList.concat(res.data.rows);
                    this.total = res.data.total;
                },
                err => {
                    this.$toast('加载失败');
                    this.isLoading = false;
                }
            );
        },
        toCreateRecord() {
            window.location.href = `/service/service-subtotal.html#/return-visit/${this.$route.params.customerId}/create`;
        },
        showNativeImg(img) {
            this.currentImg = img;
            this.showCurrentImg = true;
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
            border-bottom: 1px solid #eee;
            .ava {
                width: 50px;
                height: 50px;
                background: #3fcec9;
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
