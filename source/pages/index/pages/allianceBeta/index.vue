<template>
    <div class="'异业共赢'">
        <img class="img" :src="require('assets/imgs/index/773998250022168713.jpg')" alt="">
        <div @click="goIndex" class="subBtn"></div>
    </div>
</template>

<script>
    export default {
        name: 'index',
        data() {
            return {};
        },
        mounted() {
        },
        methods: {
            goIndex() {
                this.$router.push({name: 'main'});
            }
        }
    };
</script>

<style scoped lang='less'>
    .img{
        display:block;
        width:100%;
    }
    .subBtn{
        position:absolute;
        width:130px;
        height: 50px;
        top:620px;
        left:120px;
    }
</style>
