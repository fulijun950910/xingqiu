<template>
    <div class="m-loading-more">
        <mt-spinner type="fading-circle" v-if="loading"></mt-spinner>
        <span v-if="loading">加载中...</span>
        <span v-else>已加载全部</span>
    </div>
</template>
<script>
/**
 * loading 加载动画
 */
import Vue from 'vue';
import {
    Spinner
} from 'mint-ui';

Vue.component(Spinner.name, Spinner);
export default {
    name: 'm-load-more',
    props: {
        loading: {
            type: Boolean,
            default: false
        }
    }
};
</script>
<style lang="less">
@import '~styles/_agile';
.m-loading-more {
    text-align: center;
    height: 50px;
    line-height: 50px;
    .mint-spinner-fading-circle {
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
    }
}
</style>
