<template>
    <div class="cell-tag" layout="row" layout-align="start center" flex-wrap="wrap">
        <p class="cell-m-tag" v-for="(item, index) in options" :key="index">{{item.name}}</p>
    </div>
</template>
<script>
import Vue from 'vue';
import { Popup } from 'mint-ui';
Vue.component(Popup.name, Popup);

export default {
    name: '',
    data() {
        return {
        };
    },
    props: {
        options: Array
    },
    mountd() {
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
@import '../styles/_agile';
.cell-tag{
    margin-top:1px;
    margin-bottom:1px;
    .cell-m-tag{
        margin:1px;
        padding: 2px 4px!important;
        border-radius: 4px;
        font-size:12px;
        background-color: @color-bg;
    }
}
</style>
