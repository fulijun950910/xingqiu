<template>
    <div class="offline-pay" v-title="'线下支付'">
        <div layout="row" layout-align="space-between center" class="p-t-3 p-b-3">
            <div flex="25">支付方式：</div>
            <div flex="70" flex-offset="5">
                <input type="text" readonly placeholder="请选择支付方式">
            </div>
        </div>
        <div layout="row" layout-align="space-between center" class="p-t-3 p-b-3 m-b-3">
            <div flex="25">支付凭证：</div>
            <div flex="70" class="color-pink" flex-offset="5">
                请上传支付截图
            </div>
        </div>
        <div class="upload-img" layout="row" layout-align="center center">
            <m-icon class="fs60 dark-gray" xlink="#icon-shangchuan"></m-icon>
             <m-picture :picture="picture"></m-picture>
        </div>
        <div @click="submit" class="submit-btn integral-btn fs28 color-white" layout="row" layout-align="center center">提交</div>
        <integral-confirm :confirmText="confirm" @hideConfirm="hideConfirm" @integraConfirm="inteconfirm"></integral-confirm>
    </div>
</template>

<script>
import mPicture from 'components/m-picture';
import integralConfirm from 'components/integral-mall/integral-confirm';
export default {
    data() {
        return {
            parameter: this.$route.params.parameter,
            picture: {},
            confirm: {
                show: false,
                message: '确认支付？',
                confirm: '确认',
                quiet: '取消'
            }
        };
    },
    methods: {
        submit() {
            this.hideConfirm();
        },
        hideConfirm() {
            this.confirm.show = !this.confirm.show;
        },
        inteconfirm(msg) {
            msg.then(data=> {
                this.hideConfirm();
            }, data=> {
                this.hideConfirm();
            });
        }
    },
    mounted() {
        if (!this.$route.params.parameter) {
            this.$router.go(-1);
        }
    },
    components: {
        mPicture,
        integralConfirm
    }
};
</script>

<style lang="less">
@import '~styles/_style';
.offline-pay{
    padding: 15px 15px 0 15px;
    .submit-btn{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
    }

}
.upload-img{
    height: 200px;
    width: 100%;
    position: relative;
    border: 1px solid @border-gay;
    .icon{
        position: relative;
        z-index: 0;
    }
    .ava{
        z-index: 2;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
}

</style>


