<template>
    <div class="popup-right-list" layout="column" layout-align="space-between center">
        <div class="popup-right-list-title" layout="row" layout-align="space-between start">
            <div >{{title}}</div>
            <slot name="addSlot"></slot>
        </div>
        <!-- 主体-->
        <div class="popup-right-box" flex>
            <div v-for="item in options"  class="popup-right-list-cell" >
                <check-box :name="name" @click="emitEvent($event,item)" :type="multiple?'checkbox':'radio'" :option="item" v-model="currentValue"></check-box>
            </div>
            <slot name="descSlot" ></slot>
        </div>
        <!-- 低层区-->
        <sumit-btn v-if="multiple" class="submitBtn" @click="popupSubmit">确认</sumit-btn>
    </div>
</template>
<script>
/*
 :options {
 value    返回value
 label    label name
 }
 name:  name区分box
 title title
 multiple true false 是否多选
 只用于popup-right里
 */
import checkBox from 'components/check-radio';
import sumitBtn from 'components/fixed-submit-btn';
export default {
    name: '',
    data() {
        return {
        };
    },
    props: {
        value: null,
        options: Array,
        title: String,
        name: {
            type: String,
            default: 'name'
        },
        multiple: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
    },
    methods: {
        emitEvent(evt, item) {
            // 响应父层事件
            this.$emit('change', item);
            // 传递父层
            if (!this.multiple) {
                this.popupSubmit(evt);
            }
        },
        popupSubmit() {
            this.popupValue = false;
        }
    },
    components: {
        'check-box': checkBox,
        'sumit-btn': sumitBtn
    },
    computed: {
        currentValue: { // 绑定值
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            }
        },
        popupValue: { // 父节点popup-right绑定值
            get() {
                return this.$parent.value;
            },
            set(val) {
                this.$parent.$emit('input', val);
            }
        }
    }
};
</script>
<style lang="less">
@import '../styles/_agile';
.popup-right-list{
    width:100%;
    height:100%;
    .popup-right-box{
        width:100%;
        overflow-y:auto;
    }
    .H{
        height:120px;
    }
    .hTitle{
        height:80px;
    }
    .popup-right-list-title {
        padding:@l8*2;
        border-bottom: 1px solid @border-gay;
        background:@bg-gray;
        box-sizing: border-box;
        width: 100%;
    }
    .popup-right-list-cell {
        border-bottom: 1px solid @border-gay;
        .check-raiuo{
            padding:@l24;
            margin-right:0;
        }
    }
    .submitBtn{
        position: static!important;
    }
}
</style>
