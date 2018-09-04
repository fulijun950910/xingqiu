<template>
    <div class="popup-right-list" layout="column" layout-align="space-between center">
        <div class="popup-right-list-title" layout="row" layout-align="space-between start">
            <div >{{title}}</div>
            <slot name="addSlot"></slot>
        </div>
        <!-- search-->
        <div class="searchBox">
            <div class="searchMain" layout="row" layout-align="space-between center">
                <div @click="load(true)">
                    <m-icon class="color-primary fs40" xlink="#icon-search2"></m-icon>
                </div>
                <div flex>
                    <input v-model="keyword" type="text" />
                </div>
                <div @click="keyword = null">
                    <m-icon class="light-gray fs32" xlink="#icon-cuowu"></m-icon>
                </div>
            </div>
        </div>

        <!-- 主体-->
        <div class="popup-right-box" flex >
            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-immediate-check="false" infinite-scroll-distance="10" >
                <div v-for="(item, index) in dataList" :key="index" class="popup-right-list-cell" >
                    <check-box :name="name" @click="emitEvent($event,item)" :type="multiple?'checkbox':'radio'" :option="item" v-model="currentValue"></check-box>
                </div>
                <m-load-more :loading="loadOver"></m-load-more>
            </div>
        </div>

        <!-- 低层区-->
        <sumit-btn v-if="multiple" class="submitBtn" @click="popupSubmit">确认</sumit-btn>
    </div>
</template>
<script>
/*
 :options {
 value    返回value
 label    label name
 }
 name:  name区分box
 title title
 multiple true false 是否多选
 只用于popup-right里
 */
import Vue from 'vue';
import checkBox from 'components/check-radio';
import sumitBtn from 'components/fixed-submit-btn';
import mLoadMore from 'components/m-load-more';
import { InfiniteScroll } from 'mint-ui';
import api_booking from 'services/api.booking';
Vue.use(InfiniteScroll);

export default {
    name: '',
    data() {
        return {
            dataList: [],
            loading: false,
            keyword: null,
            query: {
                page: 1,
                size: 20,
                query: [
                    { field: 'merchantId', value: this.$store.getters.merchantId }
                ],
                sort: [
                    { field: 'code', sort: 'desc' }
                ]

            },
            loadOver: true
        };
    },
    props: {
        value: null,
        title: String,
        name: {
            type: String,
            default: 'name'
        },
        type: {
            type: Number,
            default: 1
        },
        multiple: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        this.load();
    },
    methods: {
        loadMore() {
            if (this.loadOver) {
                this.load();
            }
        },
        load(reset) {
            if (this.type == 1) {
                this.loadData(reset);
            } else if (this.type == 2) {
                this.loadDateEmployeeItem(reset);
            }
        },
        loadData(reset) {
            if (reset) {
                this.query.page = 1;
                this.dataList = [];
            }
            this.loading = true;
            let query = JSON.parse(JSON.stringify(this.query)); ;
            if (this.keyword) {
                query.query.push({ field: 'keyword', value: this.keyword });
            };
            api_booking.searchItem(query).then(res => {
                if (res.data.rows) {
                    res.data.rows.forEach(function(item) {
                        item.value = item.id;
                    });
                    this.dataList = this.dataList.concat(res.data.rows);
                    this.loading = false;
                    this.query.page++;
                    if (res.data.rows.length < this.query.size) {
                        this.loadOver = false;
                    } else {
                        this.loadOver = true;
                    }
                }
            });
        },
        loadDateEmployeeItem(reset) {
        },
        emitEvent(evt, item) {
            // 响应父层事件
            this.$emit('change', item);
            // 传递父层
            if (!this.multiple) {
                this.popupSubmit(evt);
            }
        },
        popupSubmit() {
            this.popupValue = false;
        }
    },
    components: {
        'check-box': checkBox,
        'm-load-more': mLoadMore,
        'sumit-btn': sumitBtn
    },
    computed: {
        currentValue: { // 绑定值
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            }
        },
        popupValue: { // 父节点popup-right绑定值
            get() {
                return this.$parent.value;
            },
            set(val) {
                this.$parent.$emit('input', val);
            }
        }
    }
};
</script>
<style lang="less">
@import '../styles/_agile';
.popup-right-list{
    width:100%;
    height:100%;
    .popup-right-box{
        width:100%;
        overflow-y:auto;
    }
    .H{
        height:120px;
    }
    .hTitle{
        height:80px;
    }
    .popup-right-list-title {
        padding:@l8*2;
        border-bottom: 1px solid @border-gay;
        background:@bg-gray;
        box-sizing: border-box;
        width: 100%;
    }
    .popup-right-list-cell {
        border-bottom: 1px solid @border-gay;
        .check-raiuo{
            padding:@l24;
            margin-right:0;
        }
    }
    .submitBtn{
        position: static!important;
    }
    .searchBox{
        padding:12px;
        width:100%;
        box-sizing: border-box;
        border-bottom:1px solid @border-gay;
        .searchMain{
            .icon{
                margin-top:4px;
            }
            input{
                width:100%;
                height:36px;
                padding:4px;
                box-sizing: border-box;
            }
            height:36px;
            padding:0 8px;
            background:@bg-gray;
            border-radius:20px;
        }
    }
}
</style>
