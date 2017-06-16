<template>
    <div>
        <!-- 服务小计记列表 -->
        服务小计列表
        <ul @click="goEdit($event)">
            <li title="1">服务小计列表项1</li>
            <li title="2">服务小计列表项2</li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'service-record-list',
    components: {
    },
    data() {
        return {};
    },
    methods: {
        goEdit(event) {
            this.$router.push({name: 'service-record-edit', params: {recordId: event.target.title}});
        }
    }
};
</script>
<style lang="less">
@import '~styles/_agile.less';
</style>
