<template>
    <mt-popup v-model="currentValue" class="audit-box" closeOnClickModal="true" popup-transition="popup-fade">
        <div style="width:300px;height:300px;background:red;z-index:9999" @click="change"></div>
    </mt-popup>
</template>

<script>
import Vue from 'vue';
import { Popup } from 'mint-ui';
Vue.component(Popup.name, Popup);
export default {
    name: 'audit-box',
    data() {
        return {
            show: false
        };
    },
    methods: {
        change() {
            // this.$emit('changedata', this.show);
            this.currentValue = false;
        }
    },
    props: {
        value: Boolean,
        id: Number
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
@import '~@/styles/_agile';
.audit-box {
}
</style>
