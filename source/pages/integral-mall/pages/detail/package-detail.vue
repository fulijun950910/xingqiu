<template>
<div class="package-detail" v-title="'美豆豆盒'">
    <div class="c-con p-t-3 p-b-3 p-l-3 p-r-3 bg-color-bg" flex layout="row" layout-align="start center">
        <div class="no-flex c-box bg-primary m-r-2" layout="column" layout-align="center center" v-for="(item, index) in goodsGroupList" :key="index">
            <span class="fs28 color-white">{{item.groupName}}</span>
            <span class="fs20 color-white">{{item.select.length}}/{{item.quantity ? item.quantity : '无限'}}</span>
        </div>
    </div>
    <div class="bg-color-bg" flex>
        <div flex v-for="(item, index) in goodsGroupList" :key="index" class="m-b-3 p-3 sku bg-white" :class="{'active' : checkActive(goodsGroupList[index].select, item), 'toggle' : item.toggle}">
            <div layout="column" layout-align="center center" class="toggle p-t-2 p-b-2" @click="toggle(item, 'toggle', 'icon')">
                <div flex layout="row" layout-align="center center">
                    <span class="fs28 fwb">-选择{{item.groupName}}-</span>
                    <span class="toggle-icon"><m-icon class="fs40 extra-light-gray" :xlink="item.icon"></m-icon></span>
                </div>
                <div class="fs20">{{item.goodsGroupGoodsList.length}}个{{item.groupName}}中选择{{item.quantity}}个</div>
            </div>
            <div class="sku-con border-top" v-if="item.toggle">
                <div class="m-b-4 p-t-3 border-bottom" :class="{'active' : checkActive(item.select, sku, 1)}" v-for="(sku, skuIndex) in item.goodsGroupGoodsList" :key="skuIndex">
                    <div layout="row" layout-align="start center" class="p-b-3" @click="chooseActivity(sku, item)">
                        <div class="sku-img">
                            <img :src="sku.image | nSrc(require('assets/imgs/location.jpg'))" alt="">
                        </div>
                        <div flex-offset="5">
                            <div class="fwb fs24 m-b-2">{{sku.goodsName}}</div>
                            <div class="fs24">规格：{{sku.specification ? sku.specification.specName : '无'}}</div>
                        </div>
                        <div layout="row" flex layout-align="end center" v-if="sku.formType !=4 && sku.formType !=3">
                            <m-icon class="fs40 steel-gray add m-r-3" xlink="icon-gouxuanshixin"></m-icon>
                        </div>
                    </div>
                    <div flex class="border-bottom" name="续费门店" v-if="sku.formType == 4">
                        <div class="fs24 text-center color-tiffany-blue p-t-2 p-b-2" @click="toggle(sku, 'storeToggle', 'storeIcon')">点击选择续费门店
                            <m-icon :xlink="sku.storeIcon"></m-icon>
                        </div>
                        <div layout="row" layout-align="space-between center" :class="{'border-bottom' : storeIndex != sku.storeList.length - 1}" v-if="sku.storeToggle" class="p-t-3 p-b-3" @click="choose(sku, store, 2, item)" v-for="(store, storeIndex) in sku.storeList" :key="storeIndex">
                            <div class="fs24">{{store.name}}</div>
                            <div v-if="checkActive(sku.stores, store, 1)">
                                <m-icon class="color-tiffany-blue" xlink="icon-check__"></m-icon>
                            </div>
                        </div>
                    </div>
                    <div v-if="sku.formType == 3" flex name="新增门店">
                        <div class="fs24 text-center color-tiffany-blue p-t-2 p-b-2" @click="toggle(sku, 'addStoreToggle', 'addStoreIcon')">点击填写添加门店
                            <m-icon :xlink="sku.addStoreIcon"></m-icon>
                        </div>
                        <div v-if="sku.addStoreToggle">
                        <div v-for="(newStore, newStoreIndex) in sku.addStores" :key="newStoreIndex" :class="{'border-bottom' :newStoreIndex!= sku.addStores.length -1 }">
                            <div flex layout="row" layout-align="center center" v-if="newStoreIndex != 0 && priceType == 3" @click="addStore(sku, newStoreIndex, 2)" class="p-t-3 p-b-3 border-bottom">删除&nbsp;&nbsp;<m-icon xlink="icon-shanchuicon1" class="fs34"></m-icon></div>
                            <div layout="row" layout-align="start center" class="p-t-2 p-b-2 border-bottom">
                                <input flex type="text" placeholder="请填写门店名称" v-model="newStore.storeName">
                            </div>
                            <div layout="row" layout-align="start center" class="p-t-2 p-b-2 border-bottom">
                                <input flex type="number" placeholder="请填联系电话" v-model="newStore.storeContactPhone">
                            </div>
                            <div layout="row" layout-align="start center" class="p-t-2 p-b-2 border-bottom">
                                <mt-radio title="选择门店类型" v-model="newStore.relationType" class="fs24" :options="newStore.storeType">
                                </mt-radio>
                            </div>
                            <div layout="row" layout-align="start center" class="p-t-2 p-b-2 border-bottom">
                                <mt-radio title="选择规格" v-model="newStore.specCode" class="fs24" :options="newStore.specList">
                                </mt-radio>
                            </div>
                        </div>
                        <div flex layout="row" layout-align="center cneter" v-if="priceType == 3">
                            <div class="add-store fs24 p-t-3 p-b-3" @click="addStore(sku, '', 1, item)" layout="row" layout-align="center center">添加门店&nbsp;
                                <m-icon xlink="icon-xingzhuang1" class="fs24"></m-icon>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div flex v-if="sku.goodsGroupGoodsSpecList.length > 1 && sku.formType != 3" class="border-bottom" name="选择规格">
                        <div class="fs24 text-center color-tiffany-blue p-t-2 p-b-2" @click="toggle(sku, 'toggle', 'icon')" flex>点击选择规格
                            <m-icon :xlink="sku.icon"></m-icon>
                        </div>
                        <div flex class="p-b-3 border-top" v-if="sku.toggle">
                            <div class="p-b-3 p-t-3" @click="choose(sku, spec, 1)" :class="{'color-tiffany-blue' : spec.active,'border-bottom' : specIndex != sku.goodsGroupGoodsSpecList.length - 1}" v-for="(spec, specIndex) in sku.goodsGroupGoodsSpecList" :key="specIndex" layout="row"
                                layout-align="space-between center">
                                <div class="fs24">{{spec.specName}}</div>
                                <div class="choose-circle color-tiffany-blue" v-if="checkActive(sku.specification, spec, 2)">
                                    <m-icon xlink="icon-check__"></m-icon>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="submit-btn border-top" layout="row" layout-align="start stretch">
        <div flex="70" layout="row" layout-align="start center">
            <div flex-offset="5" class="color-pink">￥<span class="fs34">{{price | fen2yuan}}</span></div>
        </div>
        <button flex="30" layout="row" class="fs28" @click="toPay" layout-align="center center" :disabled="checkSubmit() ? true : false">
                {{!checkSubmit() ? '提交' : '尚未选满'}}
            </button>
    </div>
</div>
</template>

<script>
import Vue from 'vue';
import api_party from 'services/api.party';
import { Radio } from 'mint-ui';
Vue.component(Radio.name, Radio);
export default {
    data() {
        return {
            productId: this.$route.params.id,
            tradeGoodsGroupList: [],
            goodsGroupList: [],
            price: 0,
            priceType: 2,
            storeData: null
        };
    },
    methods: {
        loadData() {
            this.$indicator.open('loading...');
            api_party.storeList(this.$store.state.party.merchantId, this.$store.getters.employeeId).then(msg => {
                this.$indicator.close();
                this.productDetail(msg.data);
            }, msg => {

            });
        },
        productDetail(data) {
            this.$indicator.open('loading...');
            api_party.productDetail(this.productId).then(msg => {
                this.$indicator.close();
                this.price = msg.data.priceType == 2 ? msg.data.price : 0;
                this.priceType = msg.data.priceType;
                if (msg.data && msg.data.goodsGroupList && msg.data.goodsGroupList.length) {
                    this.goodsGroupList = JSON.parse(JSON.stringify(msg.data.goodsGroupList));
                    this.goodsGroupList.map((item, index) => {
                        this.$set(item, 'select', []);
                        this.$set(item, 'toggle', true);
                        this.$set(item, 'icon', 'icon-shang');
                        if (item.goodsGroupGoodsList && item.goodsGroupGoodsList.length) {
                            item.goodsGroupGoodsList.map((sku, skuIndex) => {
                                this.$set(sku, 'specification', sku.goodsGroupGoodsSpecList[0]);
                                this.$set(sku, 'select', []);
                                this.$set(sku, 'icon', 'icon-xia');
                                this.$set(sku, 'storeIcon', 'icon-xia');
                                this.$set(sku, 'stores', []);
                                this.$set(sku, 'addStoreToggle', false);
                                this.$set(sku, 'addStoreIcon', 'icon-xia');
                                this.$set(sku, 'storeToggle', false);
                                this.$set(sku, 'toggle', false);
                                this.$set(sku, 'active', false);
                                this.$set(sku, 'specCode', sku.goodsGroupGoodsSpecList[0].code);
                                this.$set(sku, 'storeList', data);
                                let tempStoreCon = [];
                                let storeData = {
                                    storeName: '',
                                    storeContactPhone: '',
                                    relationType: '1',
                                    specCode: sku.goodsGroupGoodsSpecList[0].specCode,
                                    storeType: [
                                        {
                                            label: '直营店',
                                            value: '1'
                                        },
                                        {
                                            label: '加盟店',
                                            value: '2'
                                        }
                                    ],
                                    specList: []
                                };
                                this.storeData = storeData;
                                sku.goodsGroupGoodsSpecList.forEach(element => {
                                    storeData.specList.push({
                                        label: element.specName,
                                        value: element.specCode
                                    });
                                });
                                tempStoreCon = [storeData];
                                if (msg.data.priceType == 2) {
                                    tempStoreCon = [];
                                    for (let i = 0; i < item.quantity; i++) {
                                        tempStoreCon.push(storeData);
                                    }
                                };
                                if (sku.formType && sku.formType == 3) {
                                    this.$set(sku, 'addStores', tempStoreCon);
                                    item.select.push(sku);
                                };
                            });
                        };
                    });
                };
            }, msg => {
            });
        },
        checkActive(list, item, type) {
            // type 1单品 2类别
            if (!item.id) {
                return false;
            };
            if (type == 1) {
                let ls = list.filter(i => {
                    return i.id == item.id;
                });
                return ls.length;
            } else if (type == 2) {
                return list.id == item.id;
            }
        },
        toggle(obj, type, icon) {
            let toggle = obj[type];
            this.$set(obj, type, !toggle);
            if (obj[type]) {
                this.$set(obj, icon, 'icon-shang');
            } else {
                this.$set(obj, icon, 'icon-xia');
            };
        },
        chooseActivity(sku, item) {
            if (sku.formType == 3 || sku.formType == 4) {
                return;
            }
            let limit = item.quantity;
            let ls = item.select.filter((single, index) => {
                return single.id == sku.id;
            });
            if (ls.length) {
                item.select.forEach((element, index) => {
                    if (element.id == ls[0].id) {
                        item.select.splice(index, 1);
                    };
                });
            } else {
                if (item.select.length > limit - 1) {
                    this.$toast(`最多选择${limit}个哦`);
                    return;
                } else {
                    item.select.push(sku);
                };
            };
        },
        checkSubmit() {
            let ls = this.goodsGroupList.filter(ele => {
                return ele.quantity != ele.select.length;
            });
            return ls.length;
        },
        choose(sku, spec, type, item) {
            // type 1期限 2续费门店 3新增门店
            if (type == 1) {
                this.$set(sku, 'specification', spec);
            } else if (type == 2) {
                spec.specCode = sku.specification.specCode;
                let ls = sku.stores.filter(store => {
                    return store.id == spec.id;
                });
                if (sku.stores.length == item.quantity && !ls.length) {
                    this.$toast(`最多选择${item.quantity}个门店哦`);
                    return;
                }
                if (spec.id == 'all') {
                    if (sku.stores.length == sku.storeList.length) {
                        sku.stores = [];
                    } else {
                        sku.stores = sku.storeList;
                    }
                    return;
                }
                // if (sku.stores.length == sku.storeList.length) {
                //     // 门店全选
                //     sku.stores = [spec];
                // } else {
                let ls1 = sku.stores.filter((store, index) => {
                    return spec.id == store.id;
                });
                if (ls1.length) {
                    // console.log(item.select);
                    sku.stores.map((store, index) => {
                        if (store.id == spec.id) {
                            sku.stores.splice(index, 1);
                        };
                    });
                    item.select.map((sel, selindex) => {
                        if (sel.pointStoreId == spec.id) {
                            item.select.splice(selindex, 1);
                        }
                    });
                } else {
                    sku.stores.push(spec);
                    sku.pointStoreId = spec.id;
                    let destroy = JSON.parse(JSON.stringify(sku));
                    item.select.push(destroy);
                    console.log(item.select);
                };
                // ;
            } else if (type == 3) {
                item.select.push(spec);
            };
        },
        addStore(obj, index, type, item) {
            if (type == 1) {
                // 添加门店
                if (item.select.length == item.quantity && this.priceType == 2) {
                    this.$toast('已选择最大数量门店！');
                    return;
                } else {
                    obj.addStores.push(this.storeData);
                    this.choose(obj, this.storeData, 3, item);
                };
            } else if (type == 2) {
                obj.addStores.splice(index, 1);
            }
        },
        check() {
            let point = 0;
            this.goodsGroupList.forEach(item => {
                item.select.forEach(element => {
                    if (element.formType == 3) {
                        element.addStores.forEach(ele => {
                            if (!ele.storeName) {
                                this.$toast('门店名称不能为空');
                                // this.toggle(item, 'addStoreToggle', 'addStoreIcon');
                                point = 1;
                                item.toggle = true;
                                item.goodsGroupGoodsList.forEach(sku => {
                                    if (sku.id == element.id) {
                                        this.$set(sku, 'toggle', true);
                                    }
                                });
                                item.icon = 'icon-xia';
                                return point;
                            };
                            if (!ele.storeContactPhone) {
                                this.$toast('请填写门店联系方式');
                                point = 1;
                                item.toggle = true;
                                item.goodsGroupGoodsList.forEach(sku => {
                                    if (sku.id == element.id) {
                                        this.$set(sku, 'toggle', true);
                                    }
                                });
                                item.icon = 'icon-xia';
                                return point;
                            };
                        });
                    };
                });
            });
            return point;
        },
        toPay() {
            if (this.check()) {
                return;
            }
            this.setData();
            this.$router.push({
                name: 'pay-detail',
                params: {
                    itemId: this.$route.params.id,
                    tradeGoodsGroupList: this.tradeGoodsGroupList
                }
            });
        },
        setData() {
            this.goodsGroupList.map((item, index) => {
                let temp = {
                    goodsGroupId: item.id,
                    tradeGoodsGroupGoodsList: []
                };
                item.goodsGroupGoodsList.forEach(sku => {
                    if (!sku.formType) {
                        // 选择微信活动和微信应用
                        let ls = item.select.filter(r => {
                            return r.id == sku.id;
                        });
                        if (!ls.length) {
                            return;
                        };
                        let select = {
                            goodsGroupGoodsId: sku.id,
                            tradeGoodsGroupGoodsSpecList: [
                                {
                                    specCode: sku.specification ? sku.specification.specCode : ''
                                }
                            ]
                        };
                        temp.tradeGoodsGroupGoodsList.push(select);
                    } else {
                        let select = {
                            goodsGroupGoodsId: sku.id,
                            tradeGoodsGroupGoodsSpecList: []
                        };
                        if (sku.addStores && sku.addStores.length) {
                            sku.addStores.forEach(store => {
                                // 新增门店
                                let storeIn = {
                                    specCode: store.specCode,
                                    quantity: 1,
                                    storeName: store.storeName,
                                    storeContactPhone: store.storeContactPhone,
                                    relationType: store.relationType
                                };
                                select.tradeGoodsGroupGoodsSpecList.push(storeIn);
                            });
                        };
                        if (sku.stores && sku.stores.length) {
                            sku.stores.forEach(store => {
                                let storeIn = {
                                    specCode: store.specCode,
                                    quantity: store.quantity,
                                    storeId: store.id,
                                    storeName: store.name,
                                    storeAddress: store.address,
                                    provinceCode: store.provinceCode,
                                    cityCode: store.cityCode,
                                    storeContactPhone: store.phone,
                                    longitude: store.longitude,
                                    latitude: store.latitude,
                                    relationType: store.relationType
                                };
                                select.tradeGoodsGroupGoodsSpecList.push(storeIn);
                            });
                        };
                        temp.tradeGoodsGroupGoodsList.push(select);
                    };
                });

                this.tradeGoodsGroupList.push(temp);
            });
        },
        init() {
            this.loadData();
        }
    },
    mounted() {
        this.init();
    }
};
</script>

<style lang="less">
@import '~styles/_style';
.package-detail{
    position: relative;
    width: 100%;
    overflow: hidden;
    padding-top:115px;
    padding-bottom: 50px;
    .mint-cell{
        label{
        font-size: @fs24;

        }
    }
    .no-flex{
        flex: none;
    }
    .bg-primary{
        background: @color-primary;
    }
    .c-con{
        overflow: hidden;
        overflow-x: scroll;
        position: fixed;
        width: 100%;
        z-index: 2;
        top: 0;
        left: 0;
        right: 0;
    }
    .c-box{
        width: 80px;
        height: 80px;
    }
    .bg-color-bg{
        background: @color-bg;
    }
    .bg-white{
        background: white;
    }
    .sku-img{
        width: 128px;
        height: 72px;
        border-radius: 10px;
        overflow: hidden;
    }
    .border-bottom{
        border-bottom: 1px solid @border-gay;
    }
    .toggle{
        position: relative;
        .toggle-icon{
            position: absolute;
            right: 20px;
        }
    }
    // .add{
    //     width: 20px;
    //     height: 20px;
    //     border-radius: 100%;
    //     border: 1px solid @border-gay;
    //     background: @border-gay;
    // }
    .choose-circle{
        width: 20px;
        height: 20px;
        border-radius: 100%;
    }
    .border-top{
        border-top: 1px solid @border-gay;
    }
    .sku-con {
        .active {
            .add{
                color: @color-tiffany-blue;
            }
        }
    }
    .submit-btn{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        height: 50px;
        z-index: 10;
        background: white;
    }
    button{
        background: @color-primary;
        color: white;
    }
    button[disabled="disabled"] {
            background: @extra-light-gray;
            color: @gray;
    }
    .add-store{
        width: 100px;
        border-radius: 10px;
        margin: 0 auto;
    }

}
</style>
