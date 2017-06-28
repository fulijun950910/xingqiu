<template>
    <div @click="handleClick" class="fixed-sumbit-btn" :class="{primary:type==='primary'}">
        <slot></slot>
    </div>
</template>
<script>
/*
 type  样式类型 暂只有一种
 */
export default {
    name: '',
    data() {
        return {};
    },
    props: {
        type: {
            type: String,
            default: 'primary'
        }
    },
    methods: {
        handleClick(evt) {
            this.$emit('click', evt);
        }
    }
};
</script>
<style lang="less">
@import '../styles/_agile';
.fixed-sumbit-btn{
    position:fixed;
    bottom:0;
    left:0;
    font-size: 36px;
    padding: 24px 0;
    width:100%;
    color:white !important;
    text-align:center;
    transition:background .3s;
    &.primary{
        background:@color-primary;
    }
    &.disabled{
        background:fade(@color-primary,80%);
    }
}
</style>
