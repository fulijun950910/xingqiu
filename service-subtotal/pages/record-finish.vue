<template>
    <div class="record-finish">
        <!-- 展示图 -->
        <div class="record-finish-img text-center">
            <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1904751778,1640431221&fm=117&gp=0.jpg" alt="">
        </div>

        <!-- 再记录一笔 -->
        <div class="c-btn-success">
            <a class="btn-finish" @click="$router.push({name:''})">再记录一笔</a>
        </div>
        <!-- 再记录一笔 -->
        <div class="c-btn-success">
            <a class="btn-finish bg-transparent" @click="">查看我的记录</a>
        </div>
    </div>
</template>
<script>
export default {
    name: 'record-finish',
    components: {},
    data() {
        return {};
    },
    methods: {}
};
</script>
<style lang="less">
@import '~styles/_agile.less';
.record-finish{
    .record-finish-img{
        border: 1px solid #616161;
        height: 60vh;
        margin: 30px 0;
    }
    .c-btn-success{
        .bg-transparent{
            border: 1px solid #616161;
            color: #616161;
            background-color: transparent;
        }
    }
}
</style>
