<template>
    <div class="record-finish">
        <!-- 展示图 -->
        <div class="record-finish-img text-center">
            <img :src="require('assets/imgs/record-finish.png')" alt="">
        </div>

        <!-- 再记录一笔 -->
        <div class="once-again">
            <span class="btn-finish" @click="goList">再记录一笔</span>
        </div>
        <!-- 查看我的记录 -->
        <div class="my-record">
            <span class="btn-finish bg-transparent" @click="$router.push({name: 'service-dynamics'})">查看我的记录</span>
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
    methods: {
        goList() {
            let type = this.$route.query.type;
            let toName = type == 1 ? 'service-record-list' : 'member-list';
            this.$router.push({ name: toName });
        }
    }
};
</script>
<style lang="less">
@import '~styles/_agile.less';
.record-finish{
    background-color: white;
    height: 100vh;
    padding-top: 10px;
    .record-finish-img {
        img {
            margin: 50px auto;
            width: 80vw;
        }
    }
    .my-record,
    .once-again{
        margin: 20px;
        text-align: center;
        .bg-transparent{
            border: 1px solid #616161;
            color: #616161;
            background-color: transparent;
        }
    }
}
</style>
