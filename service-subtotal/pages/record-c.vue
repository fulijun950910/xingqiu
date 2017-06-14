<template>
    <div>
        客户关怀列表
        <ul @click="goEdit($event)">
            <li title="1">客户关怀列表项1</li>
            <li title="2">客户关怀列表项2</li>
        </ul>
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
            goEdit(event) {
                this.$router.push({name: 'record-c-edit', params: {recordId: event.target.title}});
            }
        }
    };
</script>
<style lang="less">
    @import '~styles/_agile.less';
</style>
