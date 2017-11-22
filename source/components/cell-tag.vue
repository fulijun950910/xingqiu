<template>
    <div class="cell-tag" layout="row" layout-align="end center" flex-wrap="wrap">
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
    margin-top:5px;
    margin-bottom:5px;
    .cell-m-tag{
        margin:5px;
        padding: 10px 20px!important;
        border-radius: 10px;
        font-size:12px;
        background-color: @color-bg;
    }
}
</style>
