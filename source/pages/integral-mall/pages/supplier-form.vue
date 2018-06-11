<template>
    <div class="supplier-form">
             <div class="banner">
         <img :src="require('assets/imgs/integral-mall/activity-list-min.png')" alt="">
         <div class="text">
         <div class="fs50 color-white">
             推荐商户美豆豆
         </div>
         <div class="color-white fs30">好东西，要分享</div>
         </div>
     </div>
     <div class="form-con">
         <div class="form-item">
             <div class="fs24 color-black label">
                 商户名称<span class="color-pink">*</span>
             </div>
             <div class="fs30 dark-gray">
             <input placeholder="请输入商户名称" v-model="parameter.merchantName" type="text">
             </div>
         </div>
          <div class="form-item">
             <div class="fs24 color-black label">
                 商户所在地<span class="color-pink">*</span>
             </div>
             <div class="fs30 dark-gray">
             <input placeholder="请选择地址" readonly @click="chooseAddress" v-model="parameter.address" type="text">
             </div>
         </div>
          <div class="form-item">
             <div class="fs24 color-black label">
                 商户联系方式<span class="color-pink">*</span>
             </div>
             <div class="fs30 dark-gray">
             <input placeholder="请输入联系方式" v-model="parameter.contactMobile" type="text">
             </div>
         </div>
          <div class="form-item">
             <div class="fs24 color-black label">
                 商户所属行业<span class="color-pink">*</span>
             </div>
             <div class="fs30 dark-gray">
             <input placeholder="选择行业" readonly @click="chooseIndusty" v-model="parameter.industry" type="text">
             </div>
         </div>
     </div>
     <div class="bottom-btn fs40 color-pink fwb" @click="save" layout="row" layout-align="center center">
         提交
     </div>
     <m-picker v-model="show" :type="pickerType" :slots="slots" valueKey="name" @confirm="onValuesChange"></m-picker>
    </div>
</template>
<script>
import api_party from 'services/api.party';
import mPicker from 'components/m-picker';
import { Toast, Indicator } from 'mint-ui';
export default {
    data() {
        return {
            parameter: {
                merchantId: this.$store.state.party.merchantId,
                partyId: this.$store.state.party.partyId,
                userId: this.$store.state.party.id
            },
            address: {},
            show: false,
            slots: [
                {
                    flex: 1,
                    values: [],
                    className: 'slot1',
                    textAlign: 'center'
                }
            ],
            pickerType: '1',
            chooseType: '1', // 1地址 2行业
            clickTime: 0
        };
    },
    methods: {
        chooseIndusty() {
            Indicator.open('loading...');
            api_party.searchIndustry().then(msg=> {
                Indicator.close();
                this.show = true;
                this.slots[0].values = msg.data;
                this.chooseType = 2;
            }, msg=> {
            });
        },
        loadProvince() {
            Indicator.open('loading...');
            api_party.getProvince().then(msg=> {
                Indicator.close();
                this.show = true;
                this.slots[0].values = msg.data;
                this.chooseType = 1;
                this.clickTime++;
            }, msg=> {

            });

        },
        loadCity(id) {
            api_party.getCity(id).then(msg=> {
                this.clickTime++;
                this.slots[0].values = msg.data;
            }, msg=> {

            });

        },
        init() {
            this.loadIndustry();
        },
        save() {
            if (!this.check()) {
                return;
            };
            debugger;
            let parameter = this.parameter;
            parameter.province = this.address.province.name;
            parameter.city = this.address.city.name;
            console.log(parameter);
            api_party.addIntroduction(parameter).then(msg=> {
                this.$router.push('/supplier-list');
            }, msg=> {

            });
        },
        check() {
            let flag = true;
            if (!this.parameter.merchantName) {
                flag = false;
                Toast('请填写商户名称');
            };
            if (!this.address.province || !this.address.city) {
                flag = false;
                Toast('请选择地址');
            };
            if (!this.parameter.contactMobile) {
                flag = false;
                Toast('请填写联系方式');
            };
            if (!this.parameter.merchantName) {
                flag = false;
                Toast('请选择行业');
            };
            return flag;
        },
        onValuesChange(value) {
            if (this.pickerType == 2) {
                if (this.clickTime == 1) {
                    this.address.province = value[0];
                    this.loadCity(value[0].code);
                } else if (this.clickTime == 2) {
                    this.clickTime = 0;
                    this.address.city = value[0];
                    this.pickerType = '1';
                    this.show = false;
                };
                this.parameter.address = this.$set(this.parameter, 'address', this.address.province.name + (this.address.city ? this.address.city.name : ''));
                // console.log(this.parameter.address);
            } else if (this.pickerType == 1) {
                this.pickerType = '1';
                this.parameter.industry = value[0].name;
                this.parameter.industryId = value[0].id;
                this.show = false;
            };
        },
        chooseAddress() {
            this.pickerType = '2';
            this.loadProvince();
        }
    },
    mounted() {

    },
    components: {
        mPicker
    }
};
</script>
<style lang="less" scoped>
@import '~styles/_style';
.supplier-form{
    padding: 150px 15px 15px 15px;
    position: relative;
        .banner{
        position: absolute;
        height: 120px;
        top: 15px;
        left: 15px;
        right: 15px;
        background: @gray;
        border-radius: 7px;
        overflow: hidden;
        img{
            position: relative;
        }
        .text{
            position: absolute;
            left: 15px;
            top:30px;
            bottom: 30px;
            right: 15px;
            z-index: 1;
            .fs50{
                font-size: 30px;
            }
        }
    }
    .form-con{
        .form-item{
            padding: 15px 0;
            border-bottom: 1px solid @dark-gray;
            .label{
                margin-bottom: 15px;
            }

        }

    }
    .bottom-btn{
        height: 50px;
        border-top: 1px solid @dark-gray;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
    }
}
</style>

