<template>
    <div v-if="showMore" class="no-more color-gray fs24 text-center" flex>
        {{moreText}}
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    props: {
        showMore: {
            default: false,
            type: Boolean
        },
        moreText: {
            default: '没有更多啦...',
            type: String
        }
    }
};
</script>
<style lang="less" scoped>
@import '~styles/_style';
.no-more{
padding: 10px 0;
}
</style>
