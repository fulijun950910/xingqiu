<template>
    <div>
        <!-- 客户关怀编辑 -->
        <record-edit></record-edit>
    </div>
</template>
<script>
export default {
    name: 'return-visit-edit',
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
