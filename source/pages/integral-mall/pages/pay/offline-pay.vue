<template>
    <div class="offline-pay" v-title="'线下支付'">
        <div layout="row" layout-align="space-between center" class="p-t-3 p-b-3 m-b-3">
            <div flex="25">支付凭证：</div>
            <div flex="70" class="color-pink" flex-offset="5">
                请上传支付截图
            </div>
        </div>
        <div layout="row" layout-align="start center" flex-wrap="wrap">
            <div flex="45" :class="{'offset' : [1,3].indexOf(index) > -1}" @click="chooseImg(index)" class="upload-img m-b-3" v-for="(item, index) in imgCon" :key="index">
             <m-picture :picture="item.picture"></m-picture>
             <div class="delete" @click="deleteImg(index)">
                 <m-icon class="fs40 extra-black" xlink="#icon-huabanfuben29"></m-icon>
             </div>
            </div>
        </div>
        <div @click="submit" class="submit-btn integral-btn fs28 color-white" layout="row" layout-align="center center">提交</div>
        <integral-confirm :confirmText="confirm" @hideConfirm="hideConfirm" @integraConfirm="inteconfirm"></integral-confirm>
    </div>
</template>

<script>
import mPicture from 'components/m-picture';
import integralConfirm from 'components/integral-mall/integral-confirm';
import api_party from 'services/api.party';
import api_file from 'services/api.file';
import Q from 'q';
export default {
    data() {
        return {
            parameter: this.$route.params.parameter,
            imgCon: [
                {
                    picture: {}
                }
            ],
            picture: {},
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
                this.hideConfirm();
            });
        },
        chooseImg() {
            if (this.imgCon.length < 5) {
                this.imgCon.push({
                    picture: {}
                });
            };
        },
        uploadImg() {
            // 上传多张图
            let promise = [];
            this.imgCon.forEach(ele => {
                let imgUp = {
                    content: ele.base64,
                    contentType: ele.origin.type,
                    originalName: ele.origin.name
                };
                promise.push(api_file.uploadImage(imgUp));
            });
            Q.all(promise).then(msg => {
                msg.map(data => {
                    this.voucherImage.push(data.data);
                });
                this.submitData();
            }, msg => {
                this.$toast('图片上传失败');
            });
        },
        submitData() {
            this.parameter.voucherImage = this.voucherImage.jpin(',');
            api_party.doudouTrade(this.parameter).then(msg => {
                this.hideConfirm();
            }, msg => {
                this.hideConfirm();
            });
        },
        deleteImg(index) {
            if (this.imgCon.length < 2) {
                this.imgCon = {
                    picture: {}
                };
            } else {
                this.imgCon = this.imgCon.splice(index, 1);
            };
        }
    },
    mounted() {
        if (!this.$route.params.parameter) {
            this.$router.go(-1);
        }
    },
    watch: {
        imgCon(newValue, oldValue) {
            if (newValue) {
                if (this.imgCon.length > 1) {
                    this.imgCon.map((msg, index) => {
                        if (msg.base64 && msg.base64.length > 1024 * 5) {
                            newValue = newValue.splice(index, 1);
                            this.$toast(`${msg.origin.name}大小大于5M,请重新上传`);
                        };
                    });
                } else {
                    if (this.imgCon[0].base64 && this.imgCon[0].base64 > 1024 * 5) {
                        this.$toast(`${this.imgCon[0].origin.name}大小大于5M,请重新上传`);
                        newValue = {
                            picture: {}
                        };
                    }
                }
            }
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
        .offset{
        margin-left: 10%;
    }

}
.upload-img{
    height: 140px;
    position: relative;
    border: 1px solid @border-gay;
    .delete{
        position: absolute;
        right: -10px;
        top:-10px;
        z-index: 3;
    }
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
