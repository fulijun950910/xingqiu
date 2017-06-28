<template>
    <mt-popup v-model="currentValue" position="bottom" class="picker-panel">
        <mt-picker :show-toolbar="true" :slots="slots" @change="onValuesChange" :value-key="valueKey">
            <div layout="row" layout-align="space-between center" class="toolbar">
                <a class="steel-gray picker-btn" @click="currentValue = false;">取消</a>
                <a class="picker-btn" @click="confirm">确定</a>
            </div>
        </mt-picker>
    </mt-popup>
</template>
<script>
import Vue from 'vue';
import {
    Popup,
    Picker
} from 'mint-ui';
Vue.component(Popup.name, Popup);
Vue.component(Picker.name, Picker);

export default {
    name: 'm-picker',
    data() {
        return {
            changeItem: null
        };
    },
    props: {
        slots: {
            type: Array,
            default: []
        },
        value: Boolean,
        selectedItem: null,
        valueKey: null
    },
    methods: {
        onValuesChange(picker, values) {
            this.changeItem = values;
        },
        confirm() {
            this.$emit('confirm', this.$knife.deepCopy(this.changeItem, []));
            this.currentValue = false;
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
.picker-panel {
    width: 100%;
    .toolbar {
        border-bottom: 1px solid #eee;
        /*no*/
        .picker-btn {
            padding: @l16 @l32;
        }
    }
}
</style>
