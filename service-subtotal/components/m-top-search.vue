<template>
    <div class="m-top-search" @click="searchClick">
        <div class="input-panel" layout="row" layout-align="center center">
            <input type="text" class="fs28" :placeholder="placeholder" v-model="currentValue" flex @keyup.enter="submit" :readonly="type == 2" :disabled="disabled">
            <div class="icon-panel" @click.stop="iconClick" v-show="!disabled">
                <m-icon :xlink="icon"></m-icon>
            </div>
        </div>
    </div>
</template>
<script>
/**
 * sample:
 * <m-top-search v-model="keyword" @search="search"></m-top-search>
 */
import mIcon from 'components/m-icon';
import _ from 'lodash';

export default {
    name: 'm-top-search',
    components: {
        mIcon
    },
    data() {
        return {
            keywordIsDirty: false,
            isCalculating: false
        };
    },
    props: {
        placeholder: {
            type: String,
            default: '搜索'
        },
        value: null,
        type: {
            type: String,
            default: '1'
        },
        icon: {
            type: String,
            default: '#icon-search2'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        autoCallback: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        submit() {
            if (this.disabled) {
                return;
            }
            this.$emit('search', this.currentValue);
        },
        iconClick() {
            if (this.disabled) {
                return;
            }
            this.$emit('iconClick');
        },
        searchClick() {
            if (this.disabled) {
                return;
            }
            this.$emit('searchClick');
        },
        expensiveOperation: _.debounce(function() {
            setTimeout(function() {
                this.$emit('search', this.currentValue);
            }.bind(this), 0);
        }, 500)
    },
    watch: {
        currentValue() {
            if (this.autoCallback) {
                this.expensiveOperation();
            }
        }
    },
    computed: {
        currentValue: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            }
        }
    }
};
</script>
<style lang="less">
@import '~styles/_agile';
.m-top-search {
    width: 100%;
    padding: @l32;
    position: relative;
    background-color: #F2F3F8;
    .input-panel {
        padding-left: @l16;
        border-radius: 5px;
        background-color: @white;
        border: 1px solid #BFB3C5;
        /*no*/
        input {
            padding-top: @l24;
            padding-bottom: @l24;
        }
    }
    .icon-panel {
        padding-right: @l24;
        padding-left: @l8;
        font-size: @fs40;
    }
}
</style>
