<template>
    <div>
        {{$route.params.recordId}}
        <record-edit></record-edit>
        <p @click="$router.push({name:'record-edit-success', query: query})">保存</p>
    </div>
</template>
<script>
    export default {
        components: {
            'record-edit': require('pages/module/record-edit')
        },
        data() {
            return {
                query: {
                    recordId: this.$route.params.recordId,
                    type: 'service',
                    name: 'jczzq',
                    sex: '男'
                }
            };
        },
        methods: {
        }
    };
</script>
<style lang="less">
    @import '~styles/_style.less';
</style>
