<template>
    <div class="application-form-con">
        <div class="activity-detail">
<div class="img-con">
   <mt-swipe :auto="4000">
  <mt-swipe-item v-for="(item, index) in chooseServiceItem.images" :key="index">
   <img class="img-auto" :src="item | nSrc(require('assets/imgs/female.png'))" alt="">      
  </mt-swipe-item>
</mt-swipe>
</div>
<div class="description">
    <div class="des-title fwb fs34 color-black">{{chooseServiceItem.name}}</div>
    <div class="des-detail fs24 color-gray" v-html="chooseServiceItem.detail"></div>
</div>
</div>
<div class="submit color-pink fs40" layout="row" layout-align="center center" @click="toPay" flex>
    提交
</div>
    </div>
</template>
<script>
import Vue from 'vue';
import { Switch, Indicator, Swipe, SwipeItem } from 'mint-ui';
import api_party from 'services/api.party';
import mPicker from 'components/m-picker';
Vue.component(Switch.name, Switch);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
export default {
    data() {
        return {
            date: new Date(),
            value: false,
            employee: JSON.parse(localStorage.getItem('employee')),
            parameter: {
                merchantId: this.$store.getters.merchantId,
                merchantName: this.$store.getters.merchantName,
                employeeName: ''
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
            this.loadActivityDetail();
        },
        update(val) {
            this.showBuy = val;
        },
        chooseStore() {
            this.showStore = true;
        },
        onValuesChange(value) {
            this.store = value[0];
        },
        toPay() {
            this.$router.push({
                name: 'pay-detail',
                params: {
                    itemId: this.chooseServiceItem.id,
                    serviceApply: this.parameter
                }
            });
        },
        loadActivityDetail() {
            Indicator.open('loading...');
            api_party.productDetail(this.$route.params.id).then(msg=> {
                Indicator.close();
                this.chooseServiceItem = msg.data;
                this.chooseServiceItem.images = this.chooseServiceItem.images.split(',');
            }, msg=> {

            });
        }
    },
    mounted() {
        this.init();
    },
    components: {
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
            textarea{
                width: 100%;
                resize: none;
                display: block;
                margin: 10px 0;
                border:1px solid @border-gay;
                border-radius: 7px;
                height: 50px;
            }
        }
        .form-item.last{
            border: none;
        }
        input{
            width: 100%;
            display: block;
            padding: 10px 5px;
        }
    }
    .submit{
        height: 60px;
        border-top:1px solid @border-gay;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        background: white;
    }
.activity-detail{
    .img-con{
        height: 170px;
        width: 100%;
        overflow: hidden;
    }
    .description{
        padding-top: 20px;
        .des-detail{
            padding: 20px 0;

        }
    }
}
}
</style>

