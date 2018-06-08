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
        <input flex class="color-black fs30" readonly type="text" v-model="parameter.merchantName">
    </div>
    </div>
            <div class="form-item">
    <div class="label fs24 color-black">门店名称</div>
    <div>
  <input type="text" @focus="chooseStore" v-model="store.name" readonly placeholder="点击选择门店">
    </div>
    </div>
        <div class="form-item">
    <div class="label fs24 color-black">门店地址</div>
    <div>
        <input placeholder="门店地址" class="color-black fs30" v-model="store.address" type="text">
    </div>
    </div>
        <div class="form-item">
    <div class="label fs24 color-black">时间<i class="color-pink">*</i></div>
    <div>
   <input placeholder="请选择时间" class="color-black fs30" type="date" v-model="parameter.applyServiceDate">
    </div>
    </div>
        <!-- <div class="form-item">
    <div class="label fs24 color-black check" layout="row" layout-align="space-between center">
        <div>
        是否指定助手<i class="color-pink"></i>
        </div>
        <div>
              <mt-switch v-model="value"></mt-switch>
        </div>
        </div>
    <div>
        <input v-if="value" placeholder="选择指定员工" v-model="parameter.employeeName" class="color-black fs30" type="text">
    </div>
    </div> -->
        <div class="form-item">
    <div class="label fs24 color-black">备注<i class="color-pink"></i></div>
    <div>
        <input class="color-black fs30" v-model="parameter.remark" type="text">
    </div>
    </div>
</div>
<div class="submit color-pink fs40" layout="row" layout-align="center center" @click="toPay" flex>
    提交
</div>
  <buy-message @update="update" :selected-item="chooseServiceItem" :form-parameter="parameter" :show-buy="showBuy"></buy-message>
  <m-picker v-model="showStore" :slots="slots" valueKey="name" @confirm="onValuesChange"></m-picker>
    </div>
</template>
<script>
import Vue from 'vue';
import { Switch, Indicator, Toast } from 'mint-ui';
import api_party from 'services/api.party';
import buyMessage from 'components/integral-mall/buy-message';
import mPicker from 'components/m-picker';
Vue.component(Switch.name, Switch);
export default {
    data() {
        return {
            date: new Date(),
            value: false,
            employee: JSON.parse(localStorage.getItem('employee')),
            parameter: {
                merchantId: this.$store.getters.merchantId,
                merchantName: this.$store.getters.merchantName,
                employeeId: this.$store.getters.employeeId,
                employeeName: this.$store.getters.employeeName
            },
            showBuy: false,
            chooseServiceItem: {},
            store: {},
            slots: [{
                flex: 1,
                values: []
            }],
            showStore: false
        };
    },
    methods: {
        chooseDate() {
            this.$refs.picker.open();
        },
        handleConfirm(data) {
            // this.date = Vue.filter('amDateFormat', [data]);
        },
        loadStoreList() {
            Indicator.open('loading...');
            api_party.storeList(this.$store.state.party.merchantId, this.$store.getters.employeeId).then(msg=> {
                Indicator.close();
                this.slots[0].values = msg.data;
            }, msg=> {

            });
        },
        init() {
            this.loadStoreList();
        },
        update(val) {
            this.showBuy = val;
        },
        chooseStore() {
            this.showStore = true;
        },
        onValuesChange(value) {
            this.store = value[0];
            console.log(this.store);
        },
        toPay() {
            if (!this.parameter.applyServiceDate) {
                Toast('请选择时间');
                return ;
            };
            this.parameter.storeId = this.store.id;
            this.parameter.storeName = this.store.name;
            debugger;
            api_party.productDetail(this.$route.params.id).then(msg=> {
                this.chooseServiceItem = msg.data;
                this.showBuy = true;
            }, msg=> {

            });
        }
    },
    mounted() {
        this.init();
    },
    components: {
        buyMessage,
        mPicker
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
            select{
                width: 100%;
                display: block;
                padding: 10px;
                background: none;
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

