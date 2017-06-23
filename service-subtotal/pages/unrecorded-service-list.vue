<template>
    <div v-title="'未记录服务'">
        <m-top-search v-model="query.keyword" placeholder="搜索我要回访/维护的客户" @search="search"></m-top-search>
    </div>
</template>
<script>
import mTopSearch from 'components/m-top-search';
export default {
    name: 'unrecorded-service-list',
    components: {
        mTopSearch
    },
    data() {
        return {
            query: {
                keyword: ''
            }
        };
    },
    methods: {
        loadData() {
            // TODO: 加载数据
        },
        search(keyword) {
            this.loadData();
        }
    }
};
</script>
<style lang="less">
@import '~styles/_agile.less';
</style>
