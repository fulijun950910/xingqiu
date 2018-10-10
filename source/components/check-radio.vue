<template>
    <div class="check-raiuo"   v-on:click.stop="boxClick" layout="row" layout-align="start center">
         <div v-if="type === 'radio'">
            <span class="checkbox-core" :class="{select:currentValue==option.value,isCheck:check}"></span>
        </div>
         <div v-else>
            <span class="checkbox-core" :class="{select:(currentValue&&currentValue.findIndex(function(value) {return value.value==option.value;})!=-1),isCheck:check}"></span>
        </div>
        <div >&nbsp;{{option.name}}</div>
    </div>
</template>
<script>
/*
 :option {
    value    返回value
    label    label name
 }
 :check 选项样式  默认圆形
 @emitEventBtn chu传递父级事件
 v-model value  返回value
 name  box name
 type  box type
 */
export default {
    name: '',
    data() {
        return {
        };
    },
    props: {
        option: Object,
        check: {
            type: null,
            default: false
        },
        value: null,
        type: {
            type: String,
            default: 'radio'
        },
        name: name
    },
    mounted() {
    },
    methods: {
        boxClick(evt) {
            if (this.type === 'radio') {
                this.currentValue = this.option.value;
            } else {
                if (!this.currentValue || !(this.currentValue instanceof Array)) {
                    this.currentValue = [];
                };
                this.$nextTick(function() {
                    let index = this.currentValue.findIndex((value, index, arr) => {
                        if (value && value.value) {
                            return value.value === this.option.value;
                        };
                    });
                    if (index === -1) {
                        this.currentValue.push(this.option);
                    } else {
                        this.currentValue.splice(index, 1);
                    };
                });
            };
            // 传递父层
            this.$emit('click', evt);
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
@import '../styles/_agile';
.check-raiuo{
    margin-right:@l24;
    input{
        display:none;
    }
    a{
        font-size:@fs28;
    }
    .checkbox-core{
        display: block;
        background-color: #fff;
        border: 1px solid @border-gay;
        position: relative;
        width:18px;
        height:18px;
        margin-right:2px;
        border-radius: 18px;
        vertical-align: middle;
        &:after{
            border: 2px solid transparent;
            border-left: 0;
            border-top: 0;
            content: " ";
            top: 1px;
            left: 5px;
            position: absolute;
            width:5px;
            height:10px;
            transform: rotate(45deg) scale(0);
            transition: transform .2s;
        }
    }
    .select{
        background:@color-green;
        border-color:@color-green;
        &:after{
            border-color: #fff;
            transform: rotate(45deg) scale(1);
        }
    }
    .isCheck{
        border-radius: 4px;
    }
}

</style>
