<template>
    <div>
        <p><span @click="$router.push({name:'record-s'})">服务跟踪评价</span></p>

        <p><span @click="$router.push({name:'record-c'})">客户关怀/回访</span></p>
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
