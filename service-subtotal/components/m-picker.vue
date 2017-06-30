<template>
    <mt-popup v-model="currentValue" position="bottom" class="picker-panel">
        <mt-picker ref="m_picker" :show-toolbar="true" :slots="slots" @change="onValuesChange" :value-key="valueKey">
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
    mounted() {},
    watch: {
        slots: function(val, oldVal) {
            if (!this.$knife.isArray(val)) {
                return;
            }
            var _val = val;
            setTimeout(() => {
                try {
                    _val.forEach((value, index) => {
                        this.$refs.m_picker.setSlotValue(index, value.values[0]);
                    });
                } catch (e) {
                    console.error(e);
                }
            }, 0);
        }
    },
    methods: {
        onValuesChange(picker, values) {
            this.changeItem = values;
        },
        confirm() {
            if (this.changeItem) {
                this.$emit('confirm', this.$knife.deepCopy(this.changeItem, []));
                this.currentValue = false;
            } else {
                console.error('m-picker change error');
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
