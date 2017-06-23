<template>
    <div class="error-404" layout="column" layout-align="start center">
        <!-- 错误页面 -->
        <p class="fs48" v-text="errorCode"></p>
        <p class="dark-gray">您的页面走丢了</p>
        <p class="back">
            <a href="javascript: history.back()">返回</a>
        </p>
    </div>
</template>
<script>
export default {
    name: 'error',
    components: {},
    data() {
        return {
            errorCode: this.$route.params.code
        };
    },
    methods: {
    }
};
</script>
<style lang="less">
    @import '~styles/_agile.less';
    .error-404 {
        min-height: 100vh;
        p {
            &.fs48 {
                margin-top: 40px;
                font-size: 48px;
            }
            &.back {
                margin: 40px;
                    a {color: @color-tiffany-blue;}
            }
        }
    }

</style>
