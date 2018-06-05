<template>
    <div class="address-list">
        <div class="color-black fs40 fwb address-title">收货地址</div>
        <div class="data-list" flex>
            <div class="data-item">
<div layout="row" layout-align="space-between center">
    <span class="color-black"></span>
    <span class="color-black"></span>
</div>
<div class="color-gray"></div>
<div layout="row" layout-align="space-between center">
    <div layout="row" layout-align="center center">
        默认
    </div>
    <div layout="row" layout-align="center center">
        <m-icon xlink="#icon-duanxin"></m-icon>
         <m-icon xlink="#icon-duanxin"></m-icon>
    </div>
</div>
            </div>
        </div>
        <div class="add-address" layout="row" @click="addAddress()" layout-align="center center">
            <div><m-icon xlink="#icon-jia"></m-icon>新增地址</div>
        </div>
    </div>
</template>
<script>
import api_party from 'services/api.party';
import { Indicator } from 'mint-ui';
export default {
    data() {
        return {
            dataList: [],
            employee: JSON.parse(localStorage.getItem('employee'))
        };
    },
    methods: {
        loadData() {
            let parameter = {
                merchantId: this.employee.party.merchantId,
                partyId: this.employee.party.partyId,
                userId: this.employee.party.id
            };
            Indicator.open('loading...');
            api_party.addressSearch(parameter).then(msg=> {
                Indicator.close();
                this.dataList = msg.data;
            }, msg=> {

            });
        },
        addAddress() {
            this.$router.push('/edite-address');
        }
    },
    mounted() {
        this.loadData();
    }
};
</script>

<style lang="less" scoped>
@import '~styles/_style';
.address-list{
    padding: 30px 15px;
    .address-title{
        margin-bottom: 25px;
    }
    .data-list{
        .data-item{
            box-shadow:0px 10px 28px 0px rgba(0,0,0,0.08);
            border-radius: 7px;
        }
    }
}
</style>


