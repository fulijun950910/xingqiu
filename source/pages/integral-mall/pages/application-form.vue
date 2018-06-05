<template>
    <div class="application-form-con">
<div class="form-title text-center">
    <div class="fs40 color-black">培训申请表</div>
    <p class="fs24 color-gray">亲爱的朋友，只有填完表但我们才能更好的为您服务哦</p>
</div>
<div class="form-con">
    <div flex class="form-item">
    <div class="label fs24 color-black">商户名称<i class="color-pink">*</i></div>
    <div flex>
        <input flex class="color-black fs30" type="text">
    </div>
    </div>
        <div class="form-item">
    <div class="label fs24 color-black">门店地址<i class="color-pink">*</i></div>
    <div>
        <input class="color-black fs30" type="text">
    </div>
    </div>
        <div class="form-item">
    <div class="label fs24 color-black">时间<i class="color-pink">*</i></div>
    <div>
   <input class="color-black fs30" type="text" v-model="date" @focus="chooseDate">
    </div>
    </div>
        <div class="form-item">
    <div class="label fs24 color-black">是否指定助手<i class="color-pink">*</i></div>
    <div>
        <input class="color-black fs30" type="text">
    </div>
    </div>
        <div class="form-item">
    <div class="label fs24 color-black">备注<i class="color-pink">*</i></div>
    <div>
        <input class="color-black fs30" type="text">
    </div>
    </div>
  <mt-datetime-picker
    ref="picker"
    type="date"
    year-format="{value} 年"
  month-format="{value} 月"
  date-format="{value} 日"
      @confirm="handleConfirm"
    v-model="date">

  </mt-datetime-picker>
</div>
    </div>
</template>
<script>
import Vue from 'vue';
import { DatetimePicker } from 'mint-ui';
Vue.component(DatetimePicker.name, DatetimePicker);
export default {
    data() {
        return {
            date: new Date()
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
    padding: 27px 15px 0 15px;
    .form-title{
        margin-bottom: 26px;
    }
    .form-con{
        width: 100%;
        .form-item{
            margin-bottom: 15px;
        }
        input{
            width: 100%;
            display: block;
            padding: 10px 5px;
            border-bottom: 1px solid @border-gay;
        }
    }

}
</style>

