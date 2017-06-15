<template>
    <div>
        <!-- 服务小计记列表 -->
        <record-edit></record-edit>
    </div>
</template>
<script>
export default {
    name: 'service-record-list',
    components: {
        'record-edit': require('./module/record-edit.vue')
    },
    data() {
        return {};
    },
    methods: {}
};
</script>
<style lang="less">
@import '~styles/_agile.less';
</style>
