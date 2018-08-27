<template>
    <div class="package-detail" v-title="'美豆豆盒'">
        <div class="c-con p-t-3 p-b-3 p-l-3 p-r-3 bg-color-bg" flex layout="row" layout-align="start center">
            <div class="no-flex c-box bg-primary m-r-2" layout="column" layout-align="center center" v-for="(item, index) in goodsGroupList" :key="index">
                    <span class="fs28 color-white">{{item.groupName}}</span>
                    <span class="fs20 color-white">{{item.select.length}}/{{item.quantity ? item.quantity : '无限'}}</span>
            </div>
        </div>
        <div class="bg-color-bg" flex>
            <div flex  v-for="(item, index) in goodsGroupList" :key="index" class="m-b-3 p-3 sku bg-white" :class="{'active' : checkActive(goodsGroupList[index].select, item), 'toggle' : item.toggle}">
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
                    <div layout="row" flex layout-align="end center" v-if="sku.formType !=4 && sku.formType !=2">
                        <m-icon class="fs40 steel-gray add m-r-3" xlink="#icon-gouxuanshixin"></m-icon>
                    </div>
                    </div>
                    <div flex class="border-bottom" name="续费门店" v-if="sku.formType == 4">
                    <div class="fs24 text-center color-tiffany-blue p-t-2 p-b-2" @click="toggle(sku, 'storeToggle', 'storeIcon')">点击选择续费门店<m-icon :xlink="sku.storeIcon"></m-icon></div>
                     <div layout="row" layout-align="space-between center" :class="{'border-bottom' : storeIndex != sku.storeList.length - 1}" v-if="sku.storeToggle" class="p-t-3 p-b-3" @click="choose(sku, store, 2, item)" v-for="(store, storeIndex) in sku.storeList" :key="storeIndex">
                         <div class="fs24">{{store.name}}</div>
                         <div v-if="checkActive(sku.stores, store, 1)"><m-icon class="color-tiffany-blue" xlink="#icon-check__"></m-icon></div>
                     </div>
                    </div>                    
                    <div flex v-if="sku.goodsGroupGoodsSpecList.length > 1" class="border-bottom" name="选择规格">
                        <div class="fs24 text-center color-tiffany-blue p-t-2 p-b-2" @click="toggle(sku, 'toggle', 'icon')" flex>点击选择规格<m-icon :xlink="sku.icon"></m-icon></div>
                        <div flex class="p-b-3 border-top" v-if="sku.toggle">
                            <div class="p-b-3 p-t-3" @click="choose(sku, spec, 1)" :class="{'color-tiffany-blue' : spec.active,'border-bottom' : specIndex != sku.goodsGroupGoodsSpecList.length - 1}" v-for="(spec, specIndex) in sku.goodsGroupGoodsSpecList" :key="specIndex" layout="row" layout-align="space-between center">
                               <div class="fs24">{{spec.specName}}</div>
                               <div class="choose-circle color-tiffany-blue" v-if="checkActive(sku.specification, spec, 2)">
                                   <m-icon xlink="#icon-check__"></m-icon>
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
import api_party from 'services/api.party';
export default {
    data() {
        return {
            productId: this.$route.params.id,
            tradeGoodsGroupList: [],
            goodsGroupList: [],
            price: 0
        };
    },
    methods: {
        loadData() {
            this.$indicator.open('loading...');
            api_party.storeList(this.$store.state.party.merchantId, this.$store.getters.employeeId).then(msg=> {
                this.$indicator.close();
                // if (msg.data.length > 1) {
                //     msg.data.unshift({
                //         name: '全选',
                //         id: 'all'
                //     });
                // };
                this.productDetail(msg.data);
            }, msg=> {

            });
        },
        productDetail(data) {
            this.$indicator.open('loading...');
            api_party.productDetail(this.productId).then(msg=> {
                this.$indicator.close();
                this.price = msg.data.priceType == 2 ? msg.data.price : 0;
                if (msg.data && msg.data.goodsGroupList && msg.data.goodsGroupList.length) {
                    this.goodsGroupList = JSON.parse(JSON.stringify(msg.data.goodsGroupList));
                    this.goodsGroupList.map((item, index)=> {
                        this.$set(item, 'select', []);
                        this.$set(item, 'toggle', false);
                        this.$set(item, 'icon', '#icon-xia');
                        if (item.goodsGroupGoodsList && item.goodsGroupGoodsList.length) {
                            item.goodsGroupGoodsList.map((sku, skuIndex)=> {
                                this.$set(sku, 'specification', sku.goodsGroupGoodsSpecList[0]);
                                this.$set(sku, 'select', []);
                                this.$set(sku, 'icon', '#icon-xia');
                                this.$set(sku, 'storeIcon', '#icon-xia');
                                this.$set(sku, 'stores', []);
                                this.$set(sku, 'storeToggle', false);
                                this.$set(sku, 'toggle', false);
                                this.$set(sku, 'active', false);
                                this.$set(sku, 'storeList', data);
                                if (data.length == 1) {
                                    this.$set(sku, 'stores', [data[0]]);
                                }
                            });
                        };
                    });
                };
            }, msg=> {
            });
        },
        checkActive(list, item, type) {
            // type 1单品 2类别
            if (!item.id) {
                return false;
            };
            if (type == 1) {
                let ls = list.filter(i=> {
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
                this.$set(obj, icon, '#icon-shang');
            } else {
                this.$set(obj, icon, '#icon-xia');
            };
        },
        chooseActivity(sku, item) {
            if (sku.formType == 2 || sku.formType == 4) {
                return;
            }
            let limit = item.quantity;
            let ls = item.select.filter((single, index)=> {
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
            let ls = this.goodsGroupList.filter(ele=> {
                return ele.quantity != ele.select.length;
            });
            return ls.length;

        },
        choose(sku, spec, type, item) {
            // type 1期限 2门店
            if (type == 1) {
                this.$set(sku, 'specification', spec);
            } else if (type == 2) {
                let ls = sku.stores.filter(store=> {
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
                if (sku.stores.length == sku.storeList.length) {
                    // 门店全选
                    sku.stores = [spec];
                } else {
                    let ls = sku.stores.filter((store, index)=> {
                        return spec.id == store.id;
                    });
                    if (ls.length) {
                        sku.stores.map((store, index)=> {
                            if (store.id == spec.id) {
                                sku.stores.splice(index, 1);
                            };
                        });
                    } else {
                        sku.stores.push(spec);
                    };
                }
                let storeLs = item.select.filter((store, storeIndex)=> {
                    return spec.id == store.id;
                });
                if (storeLs.length) {
                    item.select.map((store, storeIndex)=> {
                        if (spec.id == store.id) {
                            item.select.splice(storeIndex, 1);
                        }
                    });
                } else {
                    item.select.push(spec);
                }
                console.log(this.goodsGroupList);
            }
        },
        toPay() {
            this.goodsGroupList.map((item, index)=> {
                let temp = {
                    goodsGroupId: item.id,
                    tradeGoodsGroupGoodsList: []
                };
                item.select.map((goods, goodIndex)=> {
                    let tempGoods = {
                        goodsGroupGoodsId: goods.id,
                        tradeGoodsGroupGoodsSpecList: [
                            {
                                specCode: goods.specification ? goods.specification.specCode : '',
                                quantity: 1,
                                storeId: goods.id,
                                storeName: goods.name,
                                storeAddress: goods.address,
                                provinceCode: goods.provinceCode,
                                cityCode: goods.cityCode,
                                storeContactPhone: goods.phone,
                                longitude: goods.longitude,
                                latitude: goods.latitude,
                                relationType: goods.relationType
                            }
                        ]
                    };
                    temp.tradeGoodsGroupGoodsList.push(tempGoods);
                });
                this.tradeGoodsGroupList.push(temp);
            });
            console.log(this.tradeGoodsGroupList);
            this.$router.push({
                name: 'pay-detail',
                params: {
                    itemId: this.$route.params.id,
                    tradeGoodsGroupList: this.tradeGoodsGroupList
                }
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

}
</style>


