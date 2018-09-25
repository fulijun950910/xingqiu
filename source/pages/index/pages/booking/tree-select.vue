<template>
    <m-popup-right v-model="currentValue"
                   class="tree-select-panel">
        <div class="ts-head"
             layout="row">
            <div class="tsh-head"
                 @click="hidden">
                <m-icon class="fs28"
                        xlink="#icon-left-bold"></m-icon>
            </div>
            <form class="tsh-cont"
                  action=""
                  flex>
                <input type="search"
                       v-model="keyword"
                       @keydown.enter="search"
                       placeholder="输入项目名搜索">
            </form>
            <div class="tsh-foot color-primary"
                 @click="search">
                搜索
            </div>
        </div>
        <div class="ts-cont">
            <div class="ts-left">
                <div class="ts-cell"
                     v-for="(item, index) in heads"
                     :key="index"
                     :class="{'ts-cell-s': headIndex === index}"
                     @click="headClick(item, index)">
                    {{item.name}}
                </div>
            </div>
            <div class="ts-right"
                 v-infinite-scroll="loadMore"
                 infinite-scroll-disabled="loading"
                 infinite-scroll-distance="10"
                 infinite-scroll-immediate-check="false">
                <div class="ts-cell ts-sub-cell"
                     v-for="(item, index) in rows"
                     :key="index"
                     :class="{'ts-cell-s2': items.findIndex(val => val.itemId == item.itemId) != -1}"
                     @click="rowClick(item)">
                    {{item.name}}
                    <m-icon class="fs28"
                            xlink="#icon-queding"></m-icon>
                </div>
                <m-load-more :loading="!scrollDisabled"></m-load-more>
            </div>
        </div>
        <div class="ts-foot"
             @click="confirm">
            确定
        </div>
    </m-popup-right>
</template>
<script>
// 左边列表
// 点击事件
// 列表
// 加载更多？
import Vue from 'vue';
import mPopupRight from '@/components/popup-right';
import mLoadMore from '@/components/m-load-more';
import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);

export default {
    name: 'tree-select',
    props: {
        value: Boolean,
        heads: {
            type: Array,
            default() {
                return [];
            }
        },
        rows: {
            type: Array,
            default() {
                return [];
            }
        },
        selectedItems: {
            type: Array,
            default() {
                return [];
            }
        },
        page: {
            type: Number,
            default: 1
        },
        loading: Boolean,
        scrollDisabled: Boolean
    },
    components: {
        mPopupRight,
        mLoadMore
    },
    computed: {},
    data() {
        return {
            currentValue: this.value,
            keyword: '',
            headIndex: 0,
            items: []
        };
    },
    mounted() {},
    methods: {
        search() {
            this.$emit('search', this.keyword);
        },
        headClick(item, index) {
            this.headIndex = index;
            this.$emit('update:page', 1);
            this.$emit('headClick', item);
        },
        rowClick(item) {
            let index = this.items.findIndex(val => val.itemId === item.itemId);
            if (index === -1) {
                this.items.push(item);
            } else {
                this.items.splice(index, 1);
            }
        },
        hidden() {
            this.currentValue = false;
        },
        loadMore() {
            if (!this.scrollDisabled) {
                this.$emit('loadMore', this.heads[this.headIndex]);
                return;
            }
        },
        confirm() {
            this.$emit('confirm', this.items);
            this.hidden();
        }
    },
    watch: {
        value(val) {
            this.currentValue = val;
        },
        currentValue(val) {
            this.$emit('input', val);
        },
        selectedItems(val) {
            if (val && val.length) {
                this.items = [...val];
            } else {
                this.items = [];
            }
        }
    }
};
</script>
<style lang="less">
@import '~styles/_agile';
@left-w: 150px;
@head-h: 48px;
@foot-h: 49px;
.tree-select-panel {
    width: 90%;
    background-color: @bg-gray;
    .ts-head {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        background-color: white;
        border-bottom: 1px solid @border-gay; /*no*/
        z-index: 1;
        box-sizing: border-box;
        height: @head-h;
        .tsh-head {
            line-height: @head-h;
            text-align: center;
            width: 50px;
        }
        .tsh-cont {
            input {
                font-size: 13px;
                width: 100%;
                margin-top: 6px;
                line-height: @head-h - 12px;
                background-color: @extra-light-gray;
                padding: 0 6px;
                border-radius: 4px;
            }
        }
        .tsh-foot {
            line-height: @head-h;
            text-align: center;
            font-size: 13px;
            width: 50px;
        }
        .tsh-head,
        .tsh-foot {
            &:active {
                background-color: @bg-gray;
            }
        }
    }
    .ts-cont {
        position: absolute;
        left: 0;
        top: @head-h;
        right: 0;
        bottom: @foot-h;
    }
    .ts-foot {
        position: fixed;
        line-height: @foot-h;
        left: 0;
        right: 0;
        bottom: 0;
        text-align: center;
        background-color: @color-primary;
        color: white;
        font-size: 16px;
        font-weight: bold;
    }
    .ts-left {
        width: @left-w;
        position: absolute;
        height: 100%;
        overflow-y: scroll;
        background-color: white;
    }
    .ts-cell {
        padding-left: 12px;
        padding-right: 12px;
        line-height: 44px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        position: relative;
        &-s {
            background-color: @extra-light-gray;
        }
        &-s2 {
            color: @color-primary;
        }
    }
    .ts-sub-cell {
        padding-right: 40px;
        .icon {
            position: absolute;
            right: 12px;
            top: 15px;
            display: none;
        }
    }
    .ts-cell-s2.ts-sub-cell .icon {
        display: block;
    }
    .ts-right {
        margin-left: @left-w;
        height: 100%;
        overflow: auto;
    }
}
</style>
