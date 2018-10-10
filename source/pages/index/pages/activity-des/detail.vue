<template>
    <div class="activity-detail">
        <div v-if="type == 1">
            <img class="img-auto" :src="require('assets/imgs/activity-des/mmj.jpg')" alt="">
        </div>
        <div v-if="type == 2">
             <img class="img-auto" :src="require('assets/imgs/activity-des/krissy.jpg')" alt="">
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            type: this.$route.params.type // 1:mmj 2:krissy
        };
    }
};
</script>
<style lang="less" scoped>
.img-auto{
    width: 100%;
    height: auto;
}
</style>
