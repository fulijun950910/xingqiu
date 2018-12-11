<template>
    <div class="b2b-mall-userinfo" v-title="'设置'">
        <div class="m-b-2" style="background:#fff;padding:0 15px">
            <div class="border-bottom cell cell-box bg-white" layout="row" layout-align="space-between center" style="padding-right:0;padding-top:18px;padding-bottom:18px" @click="goEdit(1)">
                <div>
                    <span class="fs">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</span>
                </div>
                <div>
                    <span class="fs extra-light-black">{{userInfo.merchantInfo.nickName}}</span>
                    <m-icon class="color-gray m-l-1" xlink="#icon-zuojiantou"></m-icon>
                </div>
            </div>
            <div class="cell cell-box bg-white" layout="row" layout-align="space-between center" style="padding-right:0;padding-top:18px;padding-bottom:18px">
                <div>
                    <span class="fs">地址管理</span>
                </div>
                <div>
                    <m-icon class="color-gray" xlink="#icon-zuojiantou"></m-icon>
                </div>
            </div>
        </div>

        <div class="m-b-2" style="background:#fff;padding:0 15px">
            <div class="border-bottom cell cell-box bg-white" layout="row" layout-align="space-between center" style="padding-right:0;padding-top:18px;padding-bottom:18px" @click="goEdit(2)">
                <div>
                    <span class="fs">品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;牌</span>
                </div>
                <div>
                    <span class="fs extra-light-black">{{userInfo.merchantInfo.brandName}}</span>
                    <m-icon class="color-gray m-l-1" xlink="#icon-zuojiantou"></m-icon>
                </div>
            </div>
            <div class="border-bottom cell cell-box bg-white" layout="row" layout-align="space-between center" style="padding-right:0;padding-top:18px;padding-bottom:18px">
                <div>
                    <span class="fs">品牌logo</span>
                </div>
                <div>
                    <span v-show="!userInfo.merchantInfo.logoFileId" class="fs extra-light-black">待上传</span>
                    <img v-show="userInfo.merchantInfo.logoFileId" style="width:29px;height:29px" :src="userInfo.merchantInfo.logoFileId" alt="">
                    <m-icon class="color-gray m-l-1" xlink="#icon-zuojiantou"></m-icon>
                </div>
            </div>
            <div class="border-bottom cell cell-box bg-white" layout="row" layout-align="space-between center" style="padding-right:0;padding-top:18px;padding-bottom:18px" @click="goEdit(3)">
                <div>
                    <span class="fs">从属行业</span>
                </div>
                <div>
                    <span v-show="!userInfo.merchantInfo.industry" class="fs extra-light-black">未选择</span>
                    <span class="fs extra-light-black">{{userInfo.merchantInfo.industry}}</span>
                    <m-icon class="color-gray m-l-1" xlink="#icon-zuojiantou"></m-icon>
                </div>
            </div>
            <div class="cell cell-box bg-white" layout="row" layout-align="space-between center" style="padding-right:0;padding-top:18px;padding-bottom:18px" @click="goEdit(4)">
                <div flex=35>
                    <span class="fs">店铺简介</span>
                </div>
                <div layout="row" layout-align="space-between center">
                    <span v-show="!userInfo.merchantInfo.shopShortDesc" class="fs extra-light-black">为您的店铺写句话吧~</span>
                    <span class="fs extra-light-black">{{userInfo.merchantInfo.shopShortDesc}}</span>
                    <m-icon class="color-gray" xlink="#icon-zuojiantou"></m-icon>
                </div>
            </div>
        </div>

        <div class="m-b-2" style="background:#fff;padding:0 15px">
            <div class="border-bottom cell cell-box bg-white" layout="row" layout-align="space-between center" style="padding-right:0;padding-top:18px;padding-bottom:18px" >
                <div>
                    <span class="fs">认证店铺</span>
                </div>
                <div>
                    <span class="fs extra-light-black">未认证</span>
                    <m-icon class="color-gray m-l-1" xlink="#icon-zuojiantou"></m-icon>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import apigetInfo from 'services/api.b2bmall';
export default {
    name: 'b2b-mall-userinfo',
    data() {
        return {
            userInfo: {
                merchantInfo: {}
            }
        };
    },
    components: {
    },
    mounted() {
        this.getInfo();
    },
    methods: {
        async getInfo() {
            var data = {
                merchantId: this.$store.state.party.merchantId,
                partyId: this.$store.state.party.partyId
            };
            this.$indicator.open();
            apigetInfo.getMyInfo(data).then(
                res => {
                    this.$indicator.close();
                    this.userInfo = res.data;
                    this.$store.state.userInfo = this.userInfo.merchantInfo;
                },
                error => {
                    console.log(error);
                }
            );
        },
        goEdit(type) {
            this.$router.push({ name: 'b2b-mall-editUserInfo', params: { type: type } });
        }
    }
};
</script>

<style scoped lang='less'>
@import '~styles/_agile';
.b2b-mall-userinfo{
    font-size: 13px;
    min-height: 100vh;
    background: @bg-gray;
    .fs{
        font-size: 14px;
    }
}
</style>
