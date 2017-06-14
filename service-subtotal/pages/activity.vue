<template>
    <div>
        员工动态圈
        <record-edit></record-edit>
    </div>
</template>
<script>
    export default {
        components: {
            'record-edit': require('pages/module/record-edit')
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
