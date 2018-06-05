<template>
    <div class="application-form-con">
<div class="form-title text-center">
    <div class="fs40 color-black">培训申请表</div>
    <p class="fs24 color-gray">亲爱的朋友，只有填完表但我们才能更好的为您服务哦</p>
</div>
<div class="form-con">
    <div flex class="form-item">
    <div class="label fs24 color-black">商户名称</div>
    <div flex>
        <input flex class="color-black fs30" type="text">
    </div>
    </div>
            <div class="form-item">
    <div class="label fs24 color-black">门店名称</div>
    <div>
        <input class="color-black fs30" type="text">
    </div>
    </div>
        <div class="form-item">
    <div class="label fs24 color-black">门店地址</div>
    <div>
        <input class="color-black fs30" type="text">
    </div>
    </div>
        <div class="form-item">
    <div class="label fs24 color-black">时间<i class="color-pink">*</i></div>
    <div>
   <input class="color-black fs30" type="date" v-model="date">
    </div>
    </div>
        <div class="form-item">
    <div class="label fs24 color-black check" layout="row" layout-align="space-between center">
        <div>
        是否指定助手<i class="color-pink">*</i>
        </div>
        <div>
              <mt-switch v-model="value"></mt-switch>
        </div>
        </div>
    <div>
        <input v-if="value" class="color-black fs30" type="text">
    </div>
    </div>
        <div class="form-item">
    <div class="label fs24 color-black">备注<i class="color-pink">*</i></div>
    <div>
        <input class="color-black fs30" type="text">
    </div>
    </div>
</div>
<div class="submit color-pink fs40" layout="row" layout-align="center center" flex>
    提交
</div>
    </div>
</template>
<script>
import Vue from 'vue';
import { Switch } from 'mint-ui';

Vue.component(Switch.name, Switch);
export default {
    data() {
        return {
            date: new Date(),
            value: false
        };
    },
    methods: {
        chooseDate() {
            this.$refs.picker.open();
        },
        handleConfirm(data) {
            // this.date = Vue.filter('amDateFormat', [data]);
        }
    }
};
</script>
<style lang="less" scoped>
@import '~styles/_style';
.application-form-con{
    padding: 27px 15px 60px 15px;
    .form-title{
        margin-bottom: 26px;
    }
    .form-con{
        width: 100%;
        .form-item{
            margin-bottom: 15px;
            border-bottom: 1px solid @border-gay;
            .check{
                padding: 10px 0;
            }
        }
        input{
            width: 100%;
            display: block;
            padding: 10px 5px;
        }
    }
    .submit{
        position: fixed;
        bottom: 0;
        left: 0;
        height: 60px;
        right: 0;
        border-top:1px solid @border-gay;
    }

}
</style>

