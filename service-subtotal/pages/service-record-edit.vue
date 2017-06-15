<template>
    <div>
        <!-- 服务记录编辑 -->
        <record-edit></record-edit>
    </div>
</template>
<script>
export default {
    name: 'service-record-edit',
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
