<template>
    <mt-popup v-model="currentValue" position="right" class="popup-right"><slot></slot></mt-popup>
</template>
<script>
/*
盒子固定宽高 右侧显示
* */
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
        value: Boolean
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
    .popup-right{
        height: 100%;
        width: 70%;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
    }
</style>
