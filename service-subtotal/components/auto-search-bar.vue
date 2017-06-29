<template>
    <div v-if="visiable">
        <div class="serchBar-mask" v-on:click="clearHide()">
        </div>
        <div class="searchBar-main" flex>
            <div layout="row" layout-align="start center" flex class="search-main">
                <svg class="icon icon-margin" aria-hidden="true" flex>
                    <use xlink:href="#icon-search2"></use>
                </svg>
                <input flex="70" type="text" name="search-text" placeholder="搜索员工/工号" v-model="keyword" @input="change">
                <span flex v-on:click="clearHide()">
                      <svg class="icon icon-close icon-margin" aria-hidden="true">
                        <use xlink:href="#icon-close"></use>
                    </svg>                        
                    </span>
            </div>
            <ul class="employee-list">
                <li v-for="item in employeeList" v-on:click="click(item)">{{item.name}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
import _ from 'lodash';
export default {
    name: 'auto-search-bar',
    data() {
        return {
            keyword: this.searchText
        };
    },
    /*
     *Visiable 搜素框出现
     *searchText 文本框的值
     *employeeList 员工列表
     */
    props: {
        visiable: {
            type: Boolean,
            default: false
        },
        searchText: {
            type: String,
            default: ''
        },
        employeeList: {
            type: Array,
            default: []
        },
        autoCallback: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        change() {
            this.expensiveOperation();
        },
        click(item) {
            this.$emit('update:visiable', false);
            this.$emit('itemClick', item);
        },
        clearHide() {
            this.$emit('update:visiable', false);
        },
        expensiveOperation: _.debounce(function() {
            setTimeout(function() {
                this.$emit('change', this.keyword);
            }.bind(this), 0);
        }, 500)
    }
};
</script>
<style lang="less">
@import '~styles/_agile';
.serchBar-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: @color-black;
    opacity: .5;
    z-index: 2;
}

.searchBar-main {
    position: relative;
    z-index: 3;
    background: @white;
    .employee-list {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: @white;
        border-top: 1px solid @light-gray;
        max-height: 220px;
        overflow-y: scroll;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
    }
    .search-main {
        .icon {
            font-size: @fs36;
            color: @color-primary;
        }
        .icon-margin {
            margin: 0 @l16*2;
        }
        .icon-close {
            color: @color-black;
        }
        input {
            padding: @l16 * 2 0;
        }
    }
    .employee-list li {
        padding: @l16 * 2;
        color: @color-black;
        font-size: @fs28;
        border-bottom: 1px solid @light-gray;
    }
}
</style>
