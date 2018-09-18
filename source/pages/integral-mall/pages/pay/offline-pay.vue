<template>
    <div class="offline-pay" v-title="'线下支付'">
        <div layout="row" layout-align="space-between center" class="p-t-3 p-b-3 border-bottom">
            <div flex="25">豆豆支付：</div>
            <div flex="70" class="color-black" flex-offset="5">
                {{parameter.payDoudouAmount}}个(￥{{Number(parameter.payDoudouAmount/10).toFixed(2)}})
            </div>
        </div>
                <div layout="row" layout-align="space-between center" class="p-t-3 p-b-3 border-bottom">
            <div flex="25">线下需付：</div>
            <div flex="70" class="color-tiffany-blue" flex-offset="5">
                ￥{{parameter.payMoney | fen2yuan}}
            </div>
        </div>
        <div layout="row" layout-align="space-between center" class="p-t-3 p-b-3 m-b-4 border-bottom">
            <div flex="25">支付凭证：</div>
            <div flex="70" class="color-pink" flex-offset="5">
                请上传支付截图
            </div>
        </div>
        <div layout="row" layout-align="space-between center" flex-wrap="wrap">
            <div flex="45" :ref="'picture_'+index" class="upload-img m-b-3" v-for="(item, index) in uploadPics" :key="index">
                <div class="m-pic">
             <m-picture :picture="item"></m-picture>
                </div>
             <div class="delete" @click.stop="deleteImg(index)">
                 <m-icon class="fs40 extra-black fwb" xlink="#icon-huabanfuben29"></m-icon>
             </div>
             <div class="upload-mask" layout="column" layout-align="center center" v-if="item.base64">
                 <div v-show="!item.id" class="img-btn fs28 bg-tiifini-blue m-b-2" layout="row" @click="upLoadImg(item)" layout-align="center center">
                     上传
                 </div>
                 <div class="img-btn fs28 bg-green" layout="row" layout-align="center center">
                     重新选择
                     <m-picture :picture="item"></m-picture>
                 </div>
             </div>
            </div>
            <div class="upload-img m-b-3" flex="45" layout="row" layout-align="center center" @click="chooseImg()" v-if="uploadPics.length < 5">
                <m-icon xlink="#icon-jia" class="fs40 color-tiffany-blue"></m-icon>
            </div>
        </div>
        <div @click="hideConfirm" class="submit-btn integral-btn fs28 color-white" layout="row" layout-align="center center">提交</div>
        <integral-confirm :confirmText="confirm" @hideConfirm="hideConfirm" @integraConfirm="inteconfirm"></integral-confirm>
    </div>
</template>

<script>
import mPicture from 'components/m-picture';
import integralConfirm from 'components/integral-mall/integral-confirm';
import api_party from 'services/api.party';
import api_file from 'services/api.file';
import $ from 'jquery';
// import Q from 'q';
export default {
    data() {
        return {
            parameter: this.$route.params.parameter,
            uploadPics: [{
                id: null
            }],
            confirm: {
                show: false,
                message: '确认支付？',
                confirm: '确认',
                quiet: '取消'
            },
            voucherImage: []
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
            msg.then(data => {
                this.hideConfirm();
                this.pay();
            }, data => {
                this.hideConfirm();
            });
        },
        deleteImg(index) {
            let ava = this.$refs['picture_' + index];
            $(ava).find('.img-loading').remove();
            this.uploadPics.splice(index, 1);
            this.voucherImage.splice(index, 1);
        },
        chooseImg() {
            if (this.uploadPics.length < 5) {
                this.uploadPics.push({
                    id: null
                });
            };
        },
        upLoadImg(item, index) {
            if (item.id) {
                return;
            };
            if (item.origin.size / (1024 * 1024) > 5) {
                this.$toast('文件超过5M，请重新选择文件');
                return;
            };
            this.$indicator.open('waitting...');
            api_file.uploadImage(item).then(msg => {
                this.$indicator.close();
                this.$set(item, 'id', msg.data);
                this.voucherImage.push(msg.data);
            }, msg => {
            });
        },
        pay() {
            let ls = this.uploadPics.filter(msg => {
                return msg.base64;
            });
            if (ls.length != this.voucherImage.length) {
                this.$toast('请上传已选择图片');
                return;
            };
            if (!this.voucherImage.length) {
                this.$toast('请至少上传一张支付凭证');
                return;
            };
            this.parameter.voucherImages = this.voucherImage.join(',');
            this.parameter.payType = '2';
            api_party.doudouTrade(this.parameter).then(msg => {
                this.$router.push('pay-success');
            }, msg => {
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
    .border-bottom{
        border-bottom: 1px solid @border-gay;
    }
    .offset{
        margin-left: 10%;
    }
    .bg-tiifini-blue{
        background: @color-tiffany-blue;
    }
    .bg-green{
        background: @color-success;
    }

}
.upload-img{
    height: 140px;
    position: relative;
    border: 1px solid @border-gay;
    .upload-mask{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(0,0,0,.7);
        z-index: 3;
        .img-btn{
            width: 90px;
            height: 35px;
            color: white;
            border-radius: 10px;
            position: relative;
            .ava{
                opacity: 0;
                position: absolute;
            }
        }
    }
    .delete{
        position: absolute;
        right: -10px;
        top:-10px;
        z-index: 4;
    }
    .icon{
        position: relative;
        z-index: 0;
    }
    .m-pic {
                z-index: 2;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }

}

</style>
