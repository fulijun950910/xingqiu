<template>
    <div v-title="$store.state.at_tp.title">
        <img :src="require('assets/imgs/integral-mall/process.jpg')" alt="">
    </div>
</template>

<script>
    export default {
        name: 'rule',
        data() {
            return {};
        },
        mounted() {
        },
        methods: {}
    };
</script>

<style scoped lang='less'>
    img{
        width:100%;
        display:block;
    }
</style>
