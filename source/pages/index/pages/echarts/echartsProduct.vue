<template>
    <div class="echartsProduct"
         v-title='"品项数据分析"'>
        <div class="tool-tab">
            <mt-navbar v-model="selected" style="position:relative">
                <mt-tab-item :id="1">项目2</mt-tab-item>
                <mt-tab-item :id="2">组合</mt-tab-item>
                <mt-tab-item :id="3">产品</mt-tab-item>
                <mt-tab-item :id="4">卡</mt-tab-item>
            </mt-navbar>
        </div>

        <div style="height:67px;background:#fff;z-index:6"></div>

        <div style="background:#fff;min-height: 550px !important;">
            <mt-tab-container v-model="selected">
                <mt-tab-container-item :id="1"
                                       style="width:100%">
                    <div>
                        <div class="data-title"
                             v-show="listItem.length">
                            <div class="data-item"
                                 style="border: none;"
                                 layout="row">
                                <span flex=5></span>
                                <span class="productName"
                                      flex="40"
                                      style="text-indent:8px;text-align:left">项目2</span>
                                <span class="amount"
                                      flex="15">销量</span>
                                <span class="amount"
                                      style="text-align:right"
                                      flex="40">收入合计</span>
                            </div>
                        </div>
                        <div class="data-list"
                             style="margin:0"
                             v-show="listItem.length">
                            <div class="data-item"
                                 style="text-align:center;"
                                 flex
                                 layout="row"
                                 layout-align="start center"
                                 v-for="(item,index)  in listItem"
                                 :key="index">
                                <div class="index">{{index+1}}</div>
                                <div class="item-right"
                                     layout="row"
                                     layout-align="space-around center"
                                     flex>
                                    <span class="font"
                                          flex=40>{{item[1]}}</span>
                                    <span class="amount"
                                          flex=20>{{item[4]}}</span>
                                    <span class="primary-color"
                                          flex=40>
                                        <span>￥</span>
                                        <span style="font-size:18px">{{(toNumber(item[2]))[0] | currency('', 0)}}</span>.
                                        <span>{{(toNumber(item[2]))[1]}}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="errorBox"
                         v-show="!listItem.length"
                         layout="row"
                         layout-align="center center">
                        <m-icon class="ic"
                                xlink="#icon-cuowu"></m-icon>
                        <p>亲~抱歉,暂时没有查到数据~</p>
                    </div>
                    <div style="height:67px;background:#fff;z-index:6"></div>
                </mt-tab-container-item>

                <mt-tab-container-item :id="2" style="width:100%">
                    <div>
                        <div class="data-title"
                             v-show="listPackage.length">
                            <div class="data-item"
                                 style="border: none;"
                                 layout="row">
                                <span flex=5></span>
                                <span class="productName"
                                      flex="40"
                                      style="text-indent:8px;text-align:left">组合</span>
                                <span class="amount"
                                      flex="15">销量</span>
                                <span class="amount"
                                      style="text-align:right"
                                      flex="40">收入合计</span>
                            </div>
                        </div>
                        <div class="data-list"
                             style="margin:0"
                             v-show="listPackage.length">
                            <div class="data-item"
                                 style="text-align:center;"
                                 flex
                                 layout="row"
                                 layout-align="start center"
                                 v-for="(item,index) in listPackage"
                                 :key="index">
                                <div class="index">{{index+1}}</div>
                                <div class="item-right"
                                     layout="row"
                                     layout-align="space-around center"
                                     flex>
                                    <span class="font"
                                          flex=40>{{item[1]}}</span>
                                    <span class="amount"
                                          flex=20>{{item[4]}}</span>
                                    <span class="primary-color"
                                          flex=40>
                                        <span>￥</span>
                                        <span style="font-size:18px">{{(toNumber(item[2]))[0] | currency('', 0)}}</span>.
                                        <span>{{(toNumber(item[2]))[1]}}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="errorBox"
                         v-show="!listPackage.length"
                         layout="row"
                         layout-align="center center">
                        <m-icon class="ic"
                                xlink="#icon-cuowu"></m-icon>
                        <p>亲~抱歉,暂时没有查到数据~</p>
                    </div>
                    <div style="height:67px;background:#fff;z-index:6"></div>
                </mt-tab-container-item>

                <mt-tab-container-item :id="3" style="width:100%">
                    <div>
                        <div class="data-title"
                             v-show="listProduct.length">
                            <div class="data-item"
                                 style="border: none;"
                                 layout="row">
                                <span flex=5></span>
                                <span class="productName"
                                      flex="40"
                                      style="text-indent:8px;text-align:left">产品</span>
                                <span class="amount"
                                      flex="15">销量</span>
                                <span class="amount"
                                      style="text-align:right"
                                      flex="40">收入合计</span>
                            </div>
                        </div>
                        <div class="data-list"
                             style="margin:0"
                             v-show="listProduct.length">
                            <div class="data-item"
                                 style="text-align:center;"
                                 flex
                                 layout="row"
                                 layout-align="start center"
                                 v-for="(item,index) in listProduct"
                                 :key="index">
                                <div class="index">{{index+1}}</div>
                                <div class="item-right"
                                     layout="row"
                                     layout-align="space-around center"
                                     flex>
                                    <span class="font"
                                          flex=40>{{item[1]}}</span>
                                    <span class="amount"
                                          flex=20>{{item[4]}}</span>
                                    <span class="primary-color"
                                          flex=40>
                                        <span>￥</span>
                                        <span style="font-size:18px">{{(toNumber(item[2]))[0] | currency('',0)}}</span>.
                                        <span>{{(toNumber(item[2]))[1]}}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="errorBox"
                         v-show="!listProduct.length"
                         layout="row"
                         layout-align="center center">
                        <m-icon class="ic"
                                xlink="#icon-cuowu"></m-icon>
                        <p>亲~抱歉,暂时没有查到数据~</p>
                    </div>
                    <div style="height:67px;background:#fff;z-index:6"></div>
                </mt-tab-container-item>

                <mt-tab-container-item :id="4" style="width:100%">
                    <div>
                        <div class="data-title"
                             v-show="listCard.length">
                            <div class="data-item"
                                 style="border: none;"
                                 layout="row">
                                <span flex=5></span>
                                <span class="productName"
                                      flex="40"
                                      style="text-indent:8px;text-align:left">卡</span>
                                <span class="amount"
                                      flex="15">销量</span>
                                <span class="amount"
                                      style="text-align:right"
                                      flex="40">收入合计</span>
                            </div>
                        </div>
                        <div class="data-list"
                             style="margin:0"
                             v-show="listCard.length">
                            <div class="data-item"
                                 style="text-align:center;"
                                 flex
                                 layout="row"
                                 layout-align="start center"
                                 v-for="(item,index) in listCard"
                                 :key="index">
                                <div class="index">{{index+1}}</div>
                                <div class="item-right"
                                     layout="row"
                                     layout-align="space-around center"
                                     flex
                                     >
                                    <span class="font"
                                          flex=40>{{item[1]}}</span>
                                    <span class="amount"
                                          flex=20>{{item[4]}}</span>
                                    <span class="primary-color"
                                          flex=40>
                                        <span>￥</span>
                                        <span style="font-size:18px">{{(toNumber(item[2]))[0] | currency('', 0)}}</span>.
                                        <span>{{(toNumber(item[2]))[1]}}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="errorBox"
                         v-show="!listCard.length"
                         layout="row"
                         layout-align="center center">
                        <m-icon class="ic"
                                xlink="#icon-cuowu"></m-icon>
                        <p>亲~抱歉,暂时没有查到数据~</p>
                    </div>
                    <div style="height:67px;background:#fff;z-index:6"></div>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
        <!-- 门店 -->
        <m-picker v-model="storePickerVisible"
                  :slots="slots"
                  :selected-item.sync="selectedStore"
                  value-key="name"
                  @confirm="changeStore">
        </m-picker>
        <!-- 日期 -->
        <mt-actionsheet :actions="actions"
                        v-model="sheetVisible"
                        cancel-text=""></mt-actionsheet>
        <m-date-range-picker v-model="dateRangeVisible"
                             :start-date.sync="vm.timeInterval.startTime"
                             :end-date.sync="vm.timeInterval.endTime"
                             @confirm="changeDateRange"></m-date-range-picker>
        <div class="Bnav"
             layout="row"
             layout-align="space-around center"
             flex>
            <div layout="row"
                 @click="goback"
                 layout-align="center center"
                 flex>
                <m-icon class="ic"
                        xlink="#icon-left-bold"></m-icon>&nbsp;
                <p>返回</p>
            </div>
            <div layout="row"
                 layout-align="center center"
                 flex
                 @click="storePickerVisible=true">
                <m-icon class="ic"
                        xlink="#icon-fangzi-copy"></m-icon>&nbsp;
                <p>门店</p>
            </div>
            <div layout="row"
                 @click.stop="link"
                 layout-align="center center"
                 flex>
                <m-icon class="ic"
                        xlink="#icon-datezhuanhuan"></m-icon>&nbsp;
                <p>日期</p>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { Navbar, TabItem, TabContainer, TabContainerItem, DatetimePicker, Actionsheet } from 'mint-ui';
import mPicker from 'components/m-picker';
import mDateRangePicker from 'components/m-date-range-picker';
import apiEchartsProduct from 'services/api.echartsProduct';

Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Actionsheet.name, Actionsheet);

export default {
    name: 'echartsProduct',
    components: {
        mPicker,
        mDateRangePicker
    },
    data() {
        return {
            selected: 4,
            storePickerVisible: false,
            slots: [],
            selectedStore: {},
            merchantId: this.$store.state.merchant.id,
            store: this.$store.state.storeList,
            storeIds: [],
            list: [],
            listCard: [],
            listProduct: [],
            listPackage: [],
            listItem: [],
            actions: [],
            sheetVisible: false,
            dateRangeVisible: false,
            vm: {
                pickerValue: '',
                selectedStoreId: this.$route.query.storeId,
                timeInterval: {
                    startDate: null,
                    endDate: null,
                    dataType: null,
                    storeIds: null
                }
            }
        };
    },
    mounted() {
        this.selectedStore = null;
        this.vm.timeInterval.startDate = JSON.parse(localStorage.getItem('performanceInfo')).startDate;
        this.vm.timeInterval.endDate = JSON.parse(localStorage.getItem('performanceInfo')).endDate;
        this.vm.timeInterval.dataType = JSON.parse(localStorage.getItem('performanceInfo')).dataType;

        this.vm.timeInterval.storeIds = JSON.parse(localStorage.getItem('performanceInfo')).performanceStoreIds;
        for (let i = 0; i < this.store.length; i++) {
            this.storeIds.push(this.store[i].id);
        }
        let tempIndex = 0;
        var tempStores = [];
        this.$knife.deepCopy(this.$store.state.storeList, tempStores);
        let tempStoreIds = tempStores.map(item => item.id);
        if (tempStores.length > 1) {
            tempStores.unshift({
                id: tempStoreIds.join(','),
                name: '全部门店'
            });
        }

        this.slots.push({
            flex: 1,
            values: tempStores,
            className: 'slot1',
            textAlign: 'center',
            defaultIndex: tempIndex
        });

        let tempFormat = 'YYYY-MM-DD HH:mm:ss';
        this.actions = [
            {
                name: '今日',
                method: this.selectedDateRange,
                value: {
                    startDate: this.$moment()
                        .startOf('day')
                        .format(tempFormat),
                    endDate: this.$moment()
                        .endOf('day')
                        .format(tempFormat),
                    dataType: 1
                }
            },
            {
                name: '昨日',
                method: this.selectedDateRange,
                value: {
                    startDate: this.$moment()
                        .subtract(1, 'days')
                        .startOf('days')
                        .format(tempFormat),
                    endDate: this.$moment()
                        .subtract(1, 'days')
                        .endOf('days')
                        .format(tempFormat),
                    dataType: 2
                }
            },
            {
                name: '本月',
                method: this.selectedDateRange,
                value: {
                    startDate: this.$moment()
                        .startOf('month')
                        .format(tempFormat),
                    endDate: this.$moment()
                        .endOf('month')
                        .format(tempFormat),
                    dataType: 3
                }
            },
            {
                name: '自定义',
                method: this.selectedDateRange
            }
        ];
        this.echartsProductList();
    },
    methods: {
        goback() {
            this.$router.go(-1);
        },
        changeStore(item) {
            this.selectedStore = item[0];
            this.resetSreach();
        },
        resetSreach() {
            this.list = [];
            this.listCard = [];
            this.listProduct = [];
            this.listPackage = [];
            this.listItem = [];
            this.echartsProductList();
        },
        changeDateRange(start, end) {
            this.vm.timeInterval = {
                startDate: this.$moment(start).format('YYYY-MM-DD HH:mm:ss'),
                endDate: this.$moment(end).format('YYYY-MM-DD HH:mm:ss'),
                dataType: 4
            };
            this.resetSreach();
        },
        selectedDateRange(item) {
            var tempItem = item.value;
            if (tempItem) {
                this.vm.timeInterval = tempItem;
                this.resetSreach();
            } else {
                this.dateRangeVisible = true;
            }
        },
        echartsProductList() {
            var parameter = {
                merchantId: this.$store.getters.merchantId,
                queryData: {
                    itemSalesDetail: true
                },
                storeIds: JSON.parse(localStorage.getItem('performanceInfo')).performanceStoreIds
            };
            if (this.vm.timeInterval.storeIds) {
                parameter.storeIds = this.vm.timeInterval.storeIds;
            }
            if (this.selectedStore) {
                parameter.storeIds = this.selectedStore.id;
            }
            if (this.vm.timeInterval.startDate) {
                parameter.startDate = this.vm.timeInterval.startDate;
            }
            if (this.vm.timeInterval.endDate) {
                parameter.endDate = this.vm.timeInterval.endDate;
            }
            if (this.vm.timeInterval.dataType) {
                parameter.dataType = this.vm.timeInterval.dataType;
            }
            this.$indicator.open();
            try {
                let data = JSON.parse(localStorage.getItem('performanceInfo'));
                this.parameter.startDate = data.startDate;
                this.parameter.endDate = data.endDate;
                this.parameter.storeIds = data.performanceStoreIds;
            } catch (error) {}
            apiEchartsProduct.getEchartsProduct(parameter).then(
                res => {
                    this.$indicator.close();
                    this.list = res.data.data.itemSalesDetail || [];
                    for (let i = 0; i < this.list.length; i++) {
                        switch (this.list[i][0]) {
                            case 'CARD':
                            case 'CARD_RECHARGE':
                            case 'WALLET_RECHARGE':
                            case 'TICKET':
                            case 'SURCHARGE':
                                this.listCard.push(this.list[i]);
                                break;
                            case 'PRODUCT':
                                this.listProduct.push(this.list[i]);
                                break;
                            case 'SERVICE_PACKAGE':
                                this.listPackage.push(this.list[i]);
                                break;
                            case 'SERVICE_ITEM':
                                this.listItem.push(this.list[i]);
                                break;
                        }
                    }
                },
                erro => {
                    console.log('error');
                }
            );
        },
        toSetUniq(arr) {
            return Array.from(new Set(arr));
        },
        toNumber(val) {
            return Vue.filter('fen2yuan')(val).split('.');
        },
        link() {
            this.sheetVisible = true;
        },
        openPicker() {
            this.$refs.picker.open();
        }
    }
};
</script>
<style lang="less">
@import '~@/styles/_agile';
.echartsProduct {
    .tool-tab {
        position: fixed;
        top: 0;
        z-index: 6;
        background: #f4f4fc;
        box-sizing: border-box;
        width: 100%;
        box-shadow: 1px 2px 2px rgba(102, 102, 102, 0.1);
        height: 56px;
        .mint-navbar {
            background: #f4f4fc;
            height: 56px;
            line-height: 56px;
        }
        .mint-navbar .mint-tab-item {
            box-sizing: border-box;
            color: #333333;
            height: 56px;
            padding: 0px;
            .mint-tab-item-label {
                font-size: 13.5px;
                height: 56px;
                line-height: 54px;
            }
        }
        .mint-navbar .mint-tab-item.is-selected {
            color: @color-primary;
            border-bottom: 2px solid @color-primary;
        }
    }
    .mint-tab-container {
        background: #fff;
        min-height: 550px !important;
        margin: 0 15px;
        overflow: hidden;
        .data-title {
            position: relative;
            border: none;
            font-size: 12px;
            padding: 19px 0 0;
            color: #888;
            margin-left: 15px;
            .data-item {
                text-align: center;
                color: #666;
            }
        }
        .data-list {
            .data-item {
                .index {
                    font-size: 12px;
                    border-radius: 50%;
                    color: @white;
                    background: #4ed9cf;
                    display: block;
                    width: 19px;
                    height: 19px;
                    line-height: 19px;
                }
                .item-right {
                    padding: 11px 0;
                    margin-left: 15px;
                    border-bottom: 1px solid #e5e5e5; /*no*/
                    .font {
                        text-align: left;
                        color: #333;
                        font-size: 12px;
                        word-break: break-all;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }
                    .amount {
                        color: #666;
                    }
                    .primary-color {
                        text-align: right;
                        font-size: 14px;
                        color: @color-primary;
                    }
                }
            }
        }
    }
    .errorBox {
        position: absolute;
        background: @white;
        width: 300px;
        height: 300px;
        line-height: 300px;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        color: #8c8c8c;
        .ic {
            font-size: 23px;
        }
        p {
            font-size: 15px;
        }
    }

    .Bnav {
        background: #f4f4fc;
        position: fixed;
        bottom: 0;
        height: 56px;
        width: 100%;
        border-top: 1px solid #eaeaea;
        div:not(:last-child) {
            border-right: 1px solid #eaeaea; /*no*/
        }
        div {
            color: #4ed9cf;
            font-size: 14px;
            height: 56px;
        }
    }
}
</style>
