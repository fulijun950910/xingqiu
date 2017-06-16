<template>
    <div>
        <!-- 客户维护 -->
        <p><span @click="$router.push({name:'service-record-list'})">服务跟踪评价</span></p>

        <p><span @click="$router.push({name:'member-list'})">客户关怀/回访</span></p>
    </div>
</template>
<script>
export default {
    name: 'member-maintain',
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
