<template>
    <div class="detail-top" layout="row" layout-align="start center">
         <span @click="goBack">
             <m-icon xlink="#icon-huabanfuben17"></m-icon>
         </span>
         <!-- <div flex></div>
         <span>
             <m-icon xlink="#icon-connection"></m-icon>
         </span> -->
    </div>
</template>

<script>
import mIcon from 'components/m-icon';
export default {
    components: {
        mIcon
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        }
    }
};
</script>


<style lang="less">
.detail-top{
    background: white;
    height: 40px;
    padding: 0 15px;
    margin-bottom: 15px;
    span{
        .icon{
            font-size: 16px;
        }
    }
}
</style>

