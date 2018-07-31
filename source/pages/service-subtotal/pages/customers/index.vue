<template>
    <div class="customers-panel">
        <div layout="row"
             class="cp-head"
             layout-align="start center">
            <div class="cp-head-item"
                 v-show="!selectedRows.length"
                 @click="customerCountVisible = !customerCountVisible;">
                <m-icon xlink="#icon-yipingjia"></m-icon>
                查看数据
                <m-icon :xlink="customerCountVisible ? '#icon-arrow-up' : '#icon-arrow-down'"></m-icon>
            </div>
            <div class="cp-head-item"
                 v-show="selectedRows.length">
                <span @click="selecteAll">
                    <m-icon :xlink="isChecked ? '#icon-wsmp-complete' : '#icon-quan1'"></m-icon>
                    全选</span>
                <span class="fs20">已选{{selectedTotal}}人</span>
                <span @click="cancelSelect">
                    <m-icon xlink="#icon-close"></m-icon>
                </span>
            </div>
            <div flex></div>
            <div class="cp-head-item">
                <m-icon xlink="#icon-yipingjia"></m-icon>
            </div>
            <div class="cp-head-item">
                <m-icon xlink="#icon-yipingjia"></m-icon>
            </div>
        </div>
        <div class="cp-cont"
             v-infinite-scroll="loadMore"
             infinite-scroll-disabled="loading"
             infinite-scroll-distance="50">
            <div class="cp-cont-item"
                 v-for="(item, index) in rows"
                 :key="index"
                 layout="row">
                <div flex
                     @click="custoemrDetail(item)"
                     layout="row"
                     layout-align="start center">
                    <div class="cp-avatar cp-cont-cell">
                        <img :src="item.avatarId | nSrc(require('assets/imgs/avatar.png'))" />
                    </div>
                    <div class="cp-cont-cell"
                         flex>{{item.name}}</div>
                </div>
                <div class="cp-cont-cell fs32 radio-item"
                     layout="row"
                     layout-align="center center"
                     @click.stop="selectCusotmer(item)">
                    <m-icon :xlink="item.selected ? '#icon-wsmp-complete' : '#icon-quan1'"></m-icon>
                </div>
            </div>
            <m-load-more :loading="!scrollDisabled"></m-load-more>
        </div>
        <div class="cp-foot"
             layout="row"
             v-if="selectedRows.length"
             layout-align="start center">
            <div v-for="(item, index) in toolButtons"
                 :key="index"
                 flex
                 class="text-center">
                <m-icon :xlink="item.icon"></m-icon>
                <div class="fs24">
                    {{item.label}}
                </div>
            </div>
        </div>
        <div class="count-panel"
             v-if="customerCountVisible"
             @click="customerCountVisible = false;">
            <div layout="row"
                 layout-align="start center"
                 flex-wrap="wrap">
                <div flex="50"
                     v-for="(item, index) in customerCounts"
                     :key="index"
                     class="count-item">
                    <div>
                        <div>
                            <m-icon :xlink="item.icon"></m-icon>
                            <span>{{item.value || 0}}</span>
                        </div>
                        <div>{{item.label}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import api_customer from '@/services/api.customer';
import mLoadMore from 'components/m-load-more';
import { Button, InfiniteScroll, Header } from 'mint-ui';
Vue.use(InfiniteScroll);
Vue.component(Button.name, Button);
Vue.component(Header.name, Header);

export default {
    name: 'customers',
    props: {},
    components: {
        mLoadMore
    },
    computed: {
        selectedRows() {
            return this.rows.filter(val => val.selected);
        },
        isChecked() {
            return this.selectedRows.length && this.selectedRows.length === this.rows.length;
        },
        selectedTotal() {
            return this.isChecked ? this.total : this.selectedRows.length;
        }
    },
    data() {
        return {
            rows: [],
            total: 0,
            loading: false,
            scrollDisabled: false,
            customerCounts: [],
            customerCountVisible: false,
            toolButtons: [],
            params: {
                page: 0,
                size: 20
            }
        };
    },
    mounted() {
        this.loadToolButtons();
        this.loadCustomerCount();
    },
    methods: {
        loadData() {
            this.loading = true;
            let query = this.queryFormat();
            api_customer.myCustomers(query).then(
                res => {
                    this.rows = [...this.rows, ...res.data.rows];
                    this.total = res.data.total;
                    this.loading = false;
                    if (res.data.rows.length < query.size) {
                        this.scrollDisabled = true;
                    } else {
                        this.scrollDisabled = false;
                    }
                },
                err => {}
            );
        },
        queryFormat() {
            return {
                page: this.params.page,
                size: this.params.size
            };
        },
        loadMore() {
            if (this.scrollDisabled) {
                return;
            }
            this.params.page++;
            this.loadData();
        },
        custoemrDetail(item) {
            this.$router.push({
                name: 'customers-detail',
                params: {
                    customerId: item.id
                }
            });
        },
        selectCusotmer(item) {
            if (item) {
                this.$set(item, 'selected', !item.selected);
            }
        },
        selecteAll() {
            let selected = this.isChecked;
            this.rows.forEach(val => {
                this.$set(val, 'selected', !selected);
            });
        },
        cancelSelect() {
            this.rows.forEach(val => {
                this.$set(val, 'selected', false);
            });
        },
        loadCustomerCount(params) {
            api_customer.customerCount().then(
                res => {
                    this.customerCounts = [
                        {
                            label: '访问量',
                            value: res.data.visitCount,
                            icon: '#icon-yipingjia'
                        },
                        {
                            label: '领券',
                            value: res.data.joinCount,
                            icon: '#icon-yipingjia'
                        },
                        {
                            label: '参与',
                            value: res.data.ticketReceiveCount,
                            icon: '#icon-yipingjia'
                        },
                        {
                            label: '到店核销',
                            value: res.data.ticketVerifyCount,
                            icon: '#icon-yipingjia'
                        }
                    ];
                },
                err => {}
            );
        },
        loadToolButtons() {
            this.toolButtons = [
                {
                    label: '打标签',
                    value: 1,
                    icon: '#icon-yipingjia'
                },
                {
                    label: '移动到',
                    value: 2,
                    icon: '#icon-yipingjia'
                },
                {
                    label: '发短信',
                    value: 3,
                    icon: '#icon-yipingjia'
                },
                {
                    label: '发券',
                    value: 4,
                    icon: '#icon-yipingjia'
                }
            ];
        }
    }
};
</script>
<style lang="less">
@import '~styles/_agile';
@lheight: 49px;
.customers-panel {
    height: 100%;
    .cp-head {
        position: fixed;
        top: 0;
        height: @lheight;
        background-color: @bg-gray;
        width: 100%;
        left: 0;
        &-item {
            padding: @l28;
            font-size: @fs28;
        }
    }
    .cp-cont {
        margin-top: @lheight;
        &-item {
            border-bottom: 1px solid @border-gay; /*no*/
        }
        &-cell {
            padding: @l16;
        }
        .radio-item {
            width: 60px;
            min-width: 60px;
        }
    }
    .cp-avatar {
        width: 35px;
        height: 35px;
        overflow: hidden;
        border-radius: 50%;
        box-sizing: content-box;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .cp-foot {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: @lheight;
        background: rgba(0, 0, 0, 0.6);
        color: @white;
    }
    .count-panel {
        position: fixed;
        top: @lheight;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        & > div {
            background-color: @bg-gray;
            padding: @l8;
        }
        .count-item {
            padding: @l8;
            & > div {
                background: @white;
                padding: @l24;
            }
        }
    }
}
</style>
