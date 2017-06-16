<template>
    <div>
        <!-- 数据查看页面 -->
        数据查看页面
        <p @click="$router.push({name:'member-list'})">客户关怀数据</p>
        <p @click="$router.push({name:'service-record-list'})">服务小计数据</p>
    </div>
</template>
<script>
export default {
    name: 'data-view',
    components: {},
    data() {
        return {};
    },
    methods: {}
};
</script>
<style lang="less">
@import '~styles/_agile.less';
</style>
