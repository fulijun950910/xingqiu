<template>
    <div class="address-list">
        <div class="color-black fs40 fwb address-title">收货地址</div>
        <div class="data-list" flex>
            <div class="data-item">
    <div layout="row" layout-align="space-between center">
    <span class="color-black">苏问</span>
    <span class="color-black">17364808764</span>
</div>
<div class="color-gray detail-address">
    上海市嘉定地区
</div>
<div layout="row" layout-align="space-between center">
    <div layout="row" layout-align="center center">
        默认&nbsp;&nbsp;<m-icon class="fs40" xlink="#icon-gouicon"></m-icon>
    </div>
    <div layout="row" layout-align="center center">
        <span><m-icon class="fs30" xlink="#icon-shanchu"></m-icon></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span><m-icon class="fs30" xlink="#icon-bianji1"></m-icon></span>
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
        padding: 20px 0;
        .data-item{
            box-shadow:0px 10px 28px 0px rgba(0,0,0,0.08);
            border-radius: 7px;
            padding: 20px 15px;
            margin-bottom: 10px;
            .detail-address{
                padding: 15px 0;
                border-bottom: 1px solid @border-gay;
                margin-bottom: 22px;
            }
        }
    }
    .add-address{
        .icon{
            margin-right: 10px;
        }
        color: #4A90E2;
    }
}
</style>


