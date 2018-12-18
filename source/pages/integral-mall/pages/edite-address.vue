<template>
    <div class="edite-address">
        <div class="top-con edite-title" layout="row" layout-align="space-between center">
        <div class=" fs40 color-black fwb">
            {{title}}
        </div>
        <div layout-align="start center" layout="row" class="fwb">
            默认&nbsp;&nbsp;<mt-switch v-model="isDefault"></mt-switch>
        </div>
        </div>
        <div class="form-con">
        <mt-field label="收货人" placeholder="请输入收货人" v-model.trim="formParameter.contactPersion"></mt-field>
        <mt-field label="联系电话" placeholder="请输入联系电话" v-model.trim="formParameter.contactMobile"></mt-field>
        <div class="address mint-cell" flex @click="showPicker" layout="row" layout-align="start center">
            <div class="label">所在地区</div><span class="fwb">{{address.province.name}}</span>省<span class="fwb">{{address.city.name}}</span>市<span class="fwb">{{address.town.name}}</span>区/县</div>
        <mt-field label="详细地址" placeholder="请输入详细地址" v-model.trim="formParameter.detailAddress"></mt-field>
        </div>
        <div class="form-btn fs40 fwb color-pink" layout="row" layout-align="center center" @click="submit">
            确认
        </div>
        <m-picker v-model="selectedProvince" type="2" :slots="slots" valueKey="name" @confirm="onValuesChange"></m-picker>
    </div>
</template>
<script>
import { Field, Toast, Switch } from 'mint-ui';
import Vue from 'vue';
import api_party from 'services/api.party';
import mPicker from 'components/m-picker';
Vue.component(Field.name, Field);
Vue.component(Switch.name, Switch);
export default {
    data() {
        return {
            employee: JSON.parse(localStorage.getItem('employee')),
            username: null,
            title: '新增收货地址',
            selectedProvince: false,
            slots: [
                {
                    flex: 1,
                    values: [],
                    className: 'slot1',
                    textAlign: 'center'
                }
            ],
            visibleItemCount: 5,
            historyProvince: null,
            address: {
                province: {},
                city: {},
                town: {}
            },
            type: 1, // 1省份 2城市 3县/区
            formParameter: {},
            addressId: this.$route.params.id,
            isDefault: false
        };
    },
    components: {
        mPicker
    },
    methods: {
        onValuesChange(picker) {
            let temp = picker[0];
            switch (temp.levelType) {
                case 1:
                    this.address.province = temp;
                    this.loadSystemArea(temp);
                    break;
                case 2:
                    this.address.city = temp;
                    this.loadSystemArea(temp);
                    break;
                case 3:
                    this.address.town = temp;
                    this.showPicker();
                    this.loadProvince();
                    break;
            }
        },
        loadProvince(type) {
            api_party.getProvince().then(msg => {
                this.slots[0].values = msg.data;
                if (type == 1) {
                    this.address.province = {};
                    this.address.city = {};
                    this.address.town = {};
                };
            }, msg => {

            });
        },
        loadSystemArea(item) {
            api_party.systemArea(item.code).then(msg => {
                this.slots[0].values = msg.data;
            }, msg => {
            });
        },
        showPicker() {
            this.selectedProvince = !this.selectedProvince;
        },
        check() {
            if (!this.formParameter.contactPersion) {
                Toast('请输入收货人');
                return true;
            };
            if (!this.formParameter.contactMobile) {
                Toast('请输入联系电话');
                return true;
            };
            if (!this.address) {
                Toast('请选择所在地区');
                return true;
            };
            if (!this.formParameter.detailAddress) {
                Toast('请输入详细地址');
                return true;
            };
        },
        submit() {
            if (this.check()) {
                return;
            };
            let parameter = {
                'merchantId': this.employee.party.merchantId,
                'partyId': this.employee.party.partyId,
                'userId': this.employee.party.id,
                // "alias":"听雪楼门店",
                isDefault: this.isDefault,
                province: this.address.province.name,
                city: this.address.city.name,
                town: this.address.town.name,
                detailAddress: this.formParameter.detailAddress,
                contactPersion: this.formParameter.contactPersion,
                contactMobile: this.formParameter.contactMobile
                // "tel":"021-00000012",
                // "zipCode":"0000215"
            };
            if (this.addressId) {
                parameter.id = this.addressId;
            };
            this.$indicator.open();
            api_party.deliveryAddress(parameter).then(msg => {
                this.$indicator.close();
                Toast(this.addressId ? '地址修改成功' : '地址创建成功');
                this.$router.back();
            }, msg => {

            });
        },
        getItem(id) {
            api_party.getAddress(id).then(msg => {
                this.formParameter = msg.data;
                this.address.province.name = msg.data.province;
                this.address.city.name = msg.data.city;
                this.address.town.name = msg.data.town;
                this.isDefault = msg.data.isDefault;
                this.loadProvince(0);
            }, msg => {

            });
        }
    },
    mounted() {
        if (this.addressId) {
            this.getItem(this.addressId);
            this.title = '编辑收货地址';
        } else {
            this.loadProvince(1);
        };
        console.log(this.$store.party);
        console.log(this.addressId);
    }
};
</script>

<style lang="less" scoped>
@import '~styles/_style';
.edite-address {
    padding: 30px 15px;
    .edite-title{
        margin-bottom: 25px;
    }
    .form-con{
        .mint-cell.mint-field{
            background: @extra-light-gray;
            margin-bottom: 10px;
            border-radius: 7px;
             color: @color-black;
             font-size: 15px;
            .mint-cell-title{
                color: @color-black;
            }
        }
        .address{
            padding: 10px;
            background: @extra-light-gray;
            margin-bottom: 10px;
            font-size: 15px;
            .label{
                width: 110px;
            }
        }
    }
    .form-btn{
        height: 60px;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        border-top:1px solid @border-gay;
    }
}
</style>
