<template>
<div class="applicationMarket-form">
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
    <div class="form-con">
        <div class="form-box">
            <div flex class="form-item p-b-3" data-for-des="适用门店" v-if="formType == 2 || formType == 4">
                <div class="label fs24 color-black fwb">适用门店</div>
                <div flex>
                    <div layout="row" :class="{'color-tiffany-blue' : checkStoreSelect(item)}" layout-align="start center" @click="clickChooseSpecCode(item, 1)" v-for="(item, index) in storeList" :key="index" class="p-t-3 p-b-3 select-li">
                        <m-icon class="fs36 m-r-2" xlink="#icon-gouicon1"></m-icon>
                        <span class="fs24">{{item.name}}</span>
                    </div>
                </div>
            </div>
            <div flex class="form-item p-b-3 no-border" data-for-des="续约时间" v-if="formType == 2 || formType == 4">
                <!-- <div class="label fs24 color-black">续约时间</div> -->
                <div flex>
                    <div layout="row" :class="{'color-tiffany-blue' : item.specCode == baseParameter.specCode}" layout-align="space-between center" @click="clickChooseSpecCode(item, 3)" v-for="(item, index) in contractTime" :key="index" class="p-t-3 p-b-3 select-li">
                        <span class="fs24">{{item.specName}}</span>
                        <m-icon class="fs32" v-if="item.specCode == baseParameter.specCode" xlink="#icon-check__"></m-icon>
                    </div>
                </div>
            </div>
            <div v-for="(item, index) in addStoreData" :key="index" v-if="formType == 3" class="add-store-group p-2 m-b-3">
                <div flex class="form-item" data-for-des="门店名称">
                    <div class="label fs24 color-black fwb">门店名称</div>
                    <div flex>
                        <input flex class="color-black fs30" type="text" v-model="item.storeName">
                    </div>
                </div>
                <div flex class="form-item" data-for-des="门店地址">
                    <div class="label fs24 color-black fwb">门店地址</div>
                    <div flex>
                        <input flex class="color-black fs30" readonly type="text" @click="chooseAddress(item ,index)" readonly v-model="item.storeAddress">
                    </div>
                </div>
                <div flex class="form-item" data-for-des="联系电话">
                    <div class="label fs24 color-black fwb">联系电话</div>
                    <div flex>
                        <input flex class="color-black fs30" type="number" pattern="[0-9]" v-model="item.storeContactPhone">
                    </div>
                </div>
                <div flex class="form-item p-b-3 no-border" data-for-des="门店类型">
                    <div class="label fs24 color-black fwb m-b-2">门店类型</div>
                    <div flex>
                        <div layout="row" layout-align="space-between center" @click="clickChooseSpecCode(storeType, 2, item)" v-for="(storeType, index) in relationType" :key="index" class="p-t-3 p-b-3 select-li">
                            <span class="fs24">{{storeType.name}}</span>
                            <m-icon class="fs32 color-tiffany-blue" v-if="storeType.value == item.relationType" xlink="#icon-check__"></m-icon>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="label fs24 color-black fwb m-b-2">规格</div>
                <div layout="row" :class="{'color-tiffany-blue' : item.specCode == time.specCode}" layout-align="space-between center" @click="clickChooseSpecCode(item, 4,time)" v-for="(time, timeIndex) in contractTime" :key="timeIndex" class="p-t-3 p-b-3 select-li">
                    <span class="fs24">{{time.specName}}(￥{{time.price | fen2yuan}})</span>
                    <m-icon class="fs32" v-if="item.specCode == time.specCode" xlink="#icon-check__"></m-icon>
                </div>
                </div>

                <div flex class="text-center" @click="removeStore(index)" v-if="addStoreData.length > 1">
                    <m-icon class="fs28 color-tiffany-blue" xlink="#icon-shanchu1"></m-icon>
                </div>
            </div>
        </div>
    </div>
    <div class="add-tradeItemSpecList p-4 m-b-3" layout="row" v-if="formType == 3" layout-align="center center" @click="add">
        <div layout="row" layout-align="center center">
            增加门店&nbsp;&nbsp;
            <m-icon class="fs24" xlink="#icon-jia"></m-icon>
        </div>
        <div layout="row" layout-align="center center" flex-offset="5">

        </div>

    </div>
    <div class="submit color-pink fs40" layout="row" layout-align="center center" @click="toPay" flex>
        提交
    </div>
    <m-picker v-model="show" :type="pickerType" :slots="slots" valueKey="name" @confirm="onValuesChange"></m-picker>
</div>
</template>
<script>
/**
 * 1：系统续费
 * 2：活动使用权
 * 3：新增门店
 * 4：门店续费
 */
import Vue from 'vue';
import mPicker from 'components/m-picker';
import { Indicator, Swipe, SwipeItem } from 'mint-ui';
import api_party from 'services/api.party';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
export default {
    data() {
        return {
            value: false,
            employee: JSON.parse(localStorage.getItem('employee')),
            relationType: [
                {
                    name: '直营店',
                    value: '1'
                },
                {
                    name: '加盟店',
                    value: '2'
                }
            ],
            chooseServiceItem: {},
            contractTime: [],
            storeList: [],
            formShowType: 1,
            chooseStore: [],
            addStoreData: [
                {
                    storeName: null,
                    storeAddress: null,
                    storeContactPhone: null,
                    relationType: 1,
                    specCode: '3m',
                    longitude: null,
                    latitude: null,
                    quantity: 1
                }
            ],
            baseParameter: {
                specCode: null,
                quantity: 1,
                storeId: null,
                storeName: null,
                storeAddress: null,
                storeContactPhone: null,
                relationType: null
            },
            formType: null,
            slots: [
                {
                    flex: 1,
                    values: [],
                    className: 'slot1',
                    textAlign: 'center'
                }
            ],
            pickerType: '1',
            show: false,
            address: {},
            clickTime: 0,
            addresssIndex: ''
        };
    },
    methods: {
        loadStoreList() {
            Indicator.open('loading...');
            api_party.storeList(this.$store.state.party.merchantId, this.$store.getters.employeeId).then(msg=> {
                Indicator.close();
                this.storeList = msg.data;
                this.parameter.storeId = this.storeList[0].id;
            }, msg=> {

            });
        },
        init() {
            this.loadStoreList();
            this.loadActivityDetail();
        },
        toPay() {
            if (!this.checkForm()) {
                return;
            };
            let parameter = [];
            this.insertParameter(parameter);
            sessionStorage.tradeItemSpecList = JSON.stringify(parameter);
            this.$router.push({
                name: 'pay-detail',
                params: {
                    itemId: this.chooseServiceItem.id,
                    tradeItemSpecList: parameter,
                    type: 2
                }
            });
        },
        loadActivityDetail() {
            Indicator.open('loading...');
            api_party.productDetail(this.$route.params.id).then(msg=> {
                Indicator.close();
                this.chooseServiceItem = msg.data;
                this.contractTime = this.chooseServiceItem.goodsSpecList;
                this.chooseServiceItem.images = this.chooseServiceItem.images ? this.chooseServiceItem.images.split(',') : this.chooseServiceItem.images;
                this.formType = this.chooseServiceItem.formType;
                if (this.formType == 2) {
                    this.baseParameter.specCode = '1y';
                }
            }, msg=> {

            });
        },
        clickChooseSpecCode(item, type, data) {
            switch (type) {
                case 1:
                    let tempIndex;
                    this.chooseStore.map((store, index)=> {
                        if (store == item) {
                            tempIndex = index;
                        }
                    });
                    if (tempIndex || tempIndex == 0) {
                        this.chooseStore.splice(tempIndex, 1);
                    } else {
                        this.chooseStore.push(item);
                    };
                    break;
                case 2:
                    data.relationType = item.value;
                    break;
                case 3:
                    this.baseParameter.specCode = item.specCode;
                    break;
                case 4:
                    item.specCode = data.specCode;
                    break;
            }
        },
        add() {
            this.addStoreData.push(
                {
                    storeName: null,
                    storeAddress: null,
                    storeContactPhone: null,
                    relationType: null,
                    specCode: '3m'
                }
            );
        },
        removeStore(index) {
            if (this.addStoreData.length == 1) {
                this.$messageBox('只有一家门店咯~');
                return;
            }
            this.addStoreData.splice(index, 1);
        },
        checkStoreSelect(item) {
            let ls = this.chooseStore.filter((store, index)=> {
                return store == item;
            });
            return ls.length;
        },
        checkForm() {
            switch (this.formType) {
                case '1':
                // 系统续费
                    return true;
                case '3':
                // 新增门店
                    let result = true;
                    this.addStoreData.map((item, index)=> {
                        if (!item.storeName) {
                            this.$toast('记得填写门店名称哦~');
                            result = false;
                            return result;
                        };
                        if (!item.storeAddress) {
                            this.$toast('门店地址为必填哦~');
                            result = false;
                            return result;
                        };
                        if (!item.storeContactPhone) {
                            this.$toast('记得填写联系电话哦~');
                            result = false;
                            return result;
                        }
                        if (!item.relationType) {
                            this.$toast('请选择门店类型哦~');
                            result = false;
                            return result;
                        }
                    });
                    return result;
                case '4':
                case '2':
                // 门店续费
                    if (!this.chooseStore.length) {
                        this.$toast('至少选择一个门店哦~');
                        return false;
                    };
                    break;
            }
            return true;
        },
        insertParameter(insertCon) {
            switch (this.formType) {
                case '2' :
                case '4' :
                    this.chooseStore.map((item, index)=> {
                        let temp = {};
                        Object.assign(temp, this.baseParameter);
                        temp.storeName = item.name;
                        temp.storeId = item.id;
                        temp.storeAddress = item.address;
                        temp.storeContactPhone = item.phone;
                        insertCon.push(temp);
                    });
                    break;
                case '3' :
                    this.addStoreData.map((item, index)=> {
                        delete item.index;
                        insertCon.push(item);
                    });
                    break;
            }
        },
        onValuesChange(value) {
            if (this.pickerType == 2) {
                if (this.clickTime == 1) {
                    this.address.province = value[0];
                    this.loadCity(value[0].code);
                } else if (this.clickTime == 2) {
                    this.loadTown(value[0].code);
                    this.address.city = value[0];
                } else if (this.clickTime == 3) {
                    this.clickTime = 0;
                    this.address.area = value[0];
                    this.pickerType = '1';
                    this.show = false;
                    this.addStoreData[this.addresssIndex].storeAddress = `${this.address.province.name}${this.address.city.name}${this.address.area.name}`;
                    this.addStoreData[this.addresssIndex].provinceCode = this.address.province.code;
                    this.addStoreData[this.addresssIndex].cityCode = this.address.city.code;
                    this.addStoreData[this.addresssIndex].areaCode = this.address.area.code;
                }
            } else if (this.pickerType == 1) {
                this.pickerType = '1';
                this.parameter.industry = value[0].name;
                this.parameter.industryId = value[0].id;
                this.show = false;
            };
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
        loadTown(id) {
            api_party.getTown(id).then(msg=> {
                this.clickTime++;
                this.slots[0].values = msg.data;
            }, msg=> {
            });

        },
        chooseAddress(item, index) {
            this.pickerType = '2';
            this.loadProvince();
            this.addresssIndex = index;
        }
    },
    mounted() {
        this.init();
        try {
            let localData = JSON.parse(sessionStorage.tradeItemSpecList);
            // 反显数据
            if (localData.length) {
                this.addStoreData = [];
                for (let i = 0; i < localData.length; i++) {
                    let now = localData[i];
                    let temp = {
                        storeName: now.storeName,
                        storeAddress: now.storeAddress,
                        storeContactPhone: now.storeContactPhone,
                        relationType: now.relationType,
                        specCode: now.specCode,
                        longitude: null,
                        latitude: null,
                        quantity: 1
                    };
                    this.addStoreData.push(temp);
                }
            }
        } catch (e) {

        };
    },
    components: {
        mPicker
    }
};
</script>
<style lang="less" scoped>
@import '~styles/_style';
.applicationMarket-form{
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
            .select-li{
                border-bottom: 1px solid @border-gay;
            }
        }
        .no-border{
            border: none;
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
.add-store-group{
    border: 1px solid @light-gray;
    border-radius: 5px;
}
}
</style>

