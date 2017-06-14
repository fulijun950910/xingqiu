<template>
    <div>
        <div class="btn-fixed btn-edit" @click="$router.push({name:'record'})">
            编辑
        </div>
        <div class="btn-fixed btn-go-top">
            顶
        </div>
        员工动态圈 
        <p>
            <span>搜索</span>
            <span @click="$router.push({name:'data'})">查看数据</span>
        </p>
    </div>
</template>
<script>
    export default {
        components: {
        },
        data() {
            return {
            };
        },
        methods: {
        }
    };
</script>
<style lang="less">
    @import '~styles/_agile.less';

    .btn-fixed{
        position: fixed;
        border-radius: 50%;
        text-align: center;
        z-index: 10086;
    }
    .btn-edit{
        font-size: 16px;
        bottom: 40vw;
        right: 7vw;
        height: 16vw;
        line-height: 16vw;
        width: 16vw;
        background-color: @color-primary;
        color: white;
        box-shadow: 0 0 15px 1px fade(@color-primary, 50%);
    }
    .btn-go-top{
        font-size: 16px;
        bottom: 25vw;
        right: 10vw;
        height: 10vw;
        line-height: 10vw;
        width: 10vw;
        background-color: @extra-shadow;
        color: white;
        box-shadow: 0 0 15px 1px @extra-shadow;
    }

</style>
