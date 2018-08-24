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
                <div class="m-b-4 p-t-3 border-bottom" :class="{'active' : checkActive(item.select, sku)}" v-for="(sku, skuIndex) in item.goodsGroupGoodsList" :key="skuIndex">
                    <div layout="row" layout-align="start center" class="p-b-3">
                    <div class="sku-img">
                        <img :src="sku.image | nSrc(require('assets/imgs/location.jpg'))" alt="">
                    </div>
                    <div flex-offset="5">
                        <div class="fwb fs24 m-b-2">{{sku.goodsName}}</div>
                        <div class="fs24">规格：{{sku.specification ? sku.specification.specName : '无'}}</div>
                    </div>
                    <div layout="row" flex layout-align="end center">
                        <div class="add m-r-3" layout="row" layout-align="center center">
                        <!-- <m-icon class="fs28 color-white" xlink="#icon-jia"></m-icon> -->
                        </div>
                    </div>
                    </div>
                    <div flex>
                        <div class="fs24 text-center color-tiffany-blue p-t-2 p-b-2" @click="toggle(sku, item)" flex>点击选择规格<m-icon :xlink="sku.icon"></m-icon></div>
                        <div flex class="p-t-3 p-b-3 border-top" v-if="sku.toggle">
                            <div class="p-b-3 p-t-3 border-bottom" :class="{'color-tiffany-blue' : spec.active}" v-for="(spec, specIndex) in sku.goodsGroupGoodsSpecList" :key="specIndex" layout="row" layout-align="space-between center">
                               <div class="fs24">{{spec.specName}}</div>
                               <div class="choose-circle color-tiffany-blue" v-if="checkActive(sku.goodsGroupGoodsSpecList, sku.specification)">
                                   <m-icon xlink="#icon-check__"></m-icon>
                               </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
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
            goodsGroupList: []
        };
    },
    methods: {
        loadData() {
            this.$indicator.open('loading...');
            api_party.productDetail(this.productId).then(msg=> {
                this.$indicator.close();
                if (msg.data && msg.data.goodsGroupList && msg.data.goodsGroupList.length) {
                    this.goodsGroupList = JSON.parse(JSON.stringify(msg.data.goodsGroupList));
                    this.goodsGroupList.map((item, index)=> {
                        this.$set(item, 'select', []);
                        this.$set(item, 'toggle', false);
                        item.icon = '#icon-xia';
                        this.$set(item, 'icon', '#icon-xia');
                        if (item.goodsGroupGoodsList && item.goodsGroupGoodsList.length) {
                            item.goodsGroupGoodsList.map((sku, skuIndex)=> {
                                sku.specification = sku.goodsGroupGoodsSpecList[0];
                                this.$set(sku, 'select', []);
                                this.$set(sku, 'toggle', false);
                                this.$set(sku, 'active', false);
                                if (sku.goodsGroupGoodsSpecList && sku.goodsGroupGoodsSpecList.length) {
                                    sku.goodsGroupGoodsSpecList.map((spec, specIndex)=> {
                                        spec.active = false;
                                    });
                                };
                            });
                        };
                    });
                    msg.data.goodsGroupList.map((item, index)=> {
                        let temp = {
                            goodsGroupId: item.id,
                            tradeGoodsGroupGoodsList: []
                        };
                        this.tradeGoodsGroupList.push(temp);
                    });
                };
            }, msg=> {
            });
        },
        checkActive(list, item) {
            if (!item.id) {
                return false;
            };
            let ls = list.filter(i=> {
                return i.id == item.id;
            });
            return ls.length;
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
    .add{
        width: 20px;
        height: 20px;
        border-radius: 100%;
        border: 1px solid @border-gay;
        background: @border-gay;
    }
    .choose-circle{
        width: 20px;
        height: 20px;
        border-radius: 100%;
    }
    .border-top{
        border-top: 1px solid @border-gay;
    }

}
</style>


