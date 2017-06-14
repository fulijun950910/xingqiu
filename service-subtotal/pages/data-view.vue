<template>
    <div>
        数据查看页面
        <p @click="$router.push({name:'data-c'})">客户关怀数据</p>
        <p @click="$router.push({name:'data-s'})">服务小计数据</p>
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
    @import '~styles/_style.less';
</style>
