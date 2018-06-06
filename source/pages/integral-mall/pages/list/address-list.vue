<template>
    <div class="address-list">
        <div class="color-black fs40 fwb address-title">收货地址</div>
        <div class="data-list" flex>
            <div class="data-item" v-for="(item, index) in dataList.rows" :key="index" @click="choose(item)">
    <div layout="row" layout-align="space-between center">
    <span class="color-black fs30">{{item.contactPersion}}</span>
    <span class="color-black fs30">{{item.contactMobile}}</span>
    </div>
    <div class="color-gray detail-address">
    {{item.fullAddress}}
    </div>
    <div layout="row" layout-align="space-between center">
    <div @click="addDefault(item)" layout="row" layout-align="center center" class="default-address" :class="{'default' : item.isDefault}">
        默认&nbsp;&nbsp;<m-icon class="fs40" xlink="#icon-gouicon1"></m-icon>
    </div>
    <div layout="row" layout-align="center center">
        <span class="color-yellow-orange" @click="controllItem(item,1)"><m-icon class="fs34" xlink="#icon-shanchu1"></m-icon></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span class="color-blue" @click="controllItem(item,2)"><m-icon class="fs34" xlink="#icon-bianji"></m-icon></span>
    </div>
    </div>
            </div>
        </div>
        <div class="add-address" layout="row" @click="addAddress()" layout-align="center center">
            <div><m-icon xlink="#icon-jia"></m-icon>新增地址</div>
        </div>
        <integral-confirm @integraConfirm="integraConfirm" :confirmText="confirmText"></integral-confirm>
    </div>
</template>
<script>
import api_party from 'services/api.party';
import Vue from 'vue';
import { Indicator, Toast } from 'mint-ui';
import integralConfirm from 'components/integral-mall/integral-confirm';
export default {
    data() {
        return {
            dataList: [],
            employee: JSON.parse(localStorage.getItem('employee')),
            type: this.$route.params.type,
            confirmText: {},
            selectAddress: null
        };
    },
    components: {
        integralConfirm
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
        },
        addDefault(item) {
            Vue.set(item, 'isDefault', !item.isDefault);
            api_party.deliveryAddress(item).then(msg=> {
                Toast('已设置默认');
                this.loadData();
            }, msg=> {

            });

        },
        controllItem(item, type) {
            if (type == 1) {
                // 删除
                this.selectAddress = item;
                this.confirmText = {
                    message: '确认删除地址？',
                    confirm: '确定',
                    quiet: '取消',
                    show: true
                };
            } else if (type == 2) {
                // 编辑
                this.$router.push('/edite-address/' + item.id);
            }
        },
        choose(item) {
            if (this.type == 'choose') {
                this.$router.push(`/product-detail/finished/${this.$route.params.productId}/${item.id}`);
            }
        },
        deleteAddress(item) {
            api_party.deleteAddress(item.id).then(msg=> {
                Toast('地址已删除啦！');
                this.confirmText.show = false;
                this.loadData();
            }, msg=> {
            });

        },
        integraConfirm(msg) {
            msg.then(res=> {
                this.deleteAddress(this.selectAddress);
            }, res=> {
                this.confirmText.show = false;
            });
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
            .default-address.default {
                color: @color-pink;                
            }
            .color-blue{
                color: #4A90E2;
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


