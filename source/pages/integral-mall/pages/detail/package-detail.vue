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
            <div layout="column" layout-align="center center" class="toggle p-t-2 p-b-2" @click="toggle(item)">
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
                    <div layout="row" flex layout-align="end center">
                        <!-- <div class="add m-r-3" layout="row" layout-align="center center"> -->
                        <m-icon class="fs40 steel-gray add m-r-3" xlink="#icon-gouxuanshixin"></m-icon>
                        <!-- </div> -->
                    </div>
                    </div>
                    <div flex v-if="sku.goodsGroupGoodsSpecList.length > 1">
                        <div class="fs24 text-center color-tiffany-blue p-t-2 p-b-2" @click="toggle(sku, item)" flex>点击选择规格<m-icon :xlink="sku.icon"></m-icon></div>
                        <div flex class="p-b-3 border-top" v-if="sku.toggle">
                            <div class="p-b-3 p-t-3 border-bottom" @click="chooseSpec(sku, spec)" :class="{'color-tiffany-blue' : spec.active}" v-for="(spec, specIndex) in sku.goodsGroupGoodsSpecList" :key="specIndex" layout="row" layout-align="space-between center">
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
                                this.$set(sku, 'toggle', false);
                                this.$set(sku, 'active', false);
                                sku.goodsGroupGoodsSpecList.map((spec, specIndex)=> {
                                    spec.active = false;
                                });
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
        toggle(obj, item) {
            let toggle = obj.toggle;
            this.$set(obj, 'toggle', !toggle);
            if (obj.toggle) {
                this.$set(obj, 'icon', '#icon-shang');
            } else {
                this.$set(obj, 'icon', '#icon-xia');
            };
        },
        chooseActivity(sku, item) {
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
            this.checkSubmit();
        },
        checkSubmit() {
            let ls = this.goodsGroupList.filter(ele=> {
                return ele.quantity != ele.select.length;
            });
            return ls.length;

        },
        chooseSpec(sku, spec) {
            this.$set(sku, 'specification', spec);
        },
        toPay() {
            console.log(this.goodsGroupList);
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
                                quantity: 1
                            }
                        ]
                    };
                    temp.tradeGoodsGroupGoodsList.push(tempGoods);
                });
                this.tradeGoodsGroupList.push(temp);
            });
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


