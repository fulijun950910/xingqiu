<template>
    <div class="b2b-mall-userinfo" v-title="'设置'">
        <div class="m-b-2" style="background:#fff;padding:0 15px">
            <div class="border-bottom cell cell-box bg-white" layout="row" layout-align="space-between center" style="padding-right:0;padding-top:18px;padding-bottom:18px" >
                <div>
                    <span class="fs">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</span>
                </div>
                <div>
                    <span class="fs extra-light-black">黄教主</span>
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
            <div class="border-bottom cell cell-box bg-white" layout="row" layout-align="space-between center" style="padding-right:0;padding-top:18px;padding-bottom:18px" >
                <div>
                    <span class="fs">品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;牌</span>
                </div>
                <div>
                    <span class="fs extra-light-black">娇兰SPA</span>
                    <m-icon class="color-gray m-l-1" xlink="#icon-zuojiantou"></m-icon>
                </div>
            </div>
            <div class="border-bottom cell cell-box bg-white" layout="row" layout-align="space-between center" style="padding-right:0;padding-top:18px;padding-bottom:18px">
                <div>
                    <span class="fs">品牌logo</span>
                </div>
                <div>
                    <span class="fs extra-light-black">待上传</span>
                    <m-icon class="color-gray m-l-1" xlink="#icon-zuojiantou"></m-icon>
                </div>
            </div>
            <div class="border-bottom cell cell-box bg-white" layout="row" layout-align="space-between center" style="padding-right:0;padding-top:18px;padding-bottom:18px">
                <div>
                    <span class="fs">从属行业</span>
                </div>
                <div>
                    <span class="fs extra-light-black">未选择</span>
                    <m-icon class="color-gray m-l-1" xlink="#icon-zuojiantou"></m-icon>
                </div>
            </div>
            <div class="cell cell-box bg-white" layout="row" layout-align="space-between center" style="padding-right:0;padding-top:18px;padding-bottom:18px">
                <div>
                    <span class="fs">店铺简介</span>
                </div>
                <div>
                    <span class="fs extra-light-black">为您的店铺写句话吧~</span>
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
