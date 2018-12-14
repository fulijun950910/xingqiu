<template>
    <div id="echartsMember"
         v-title='"顾客分析"'>
        <div class="tool-tab">
            <mt-navbar v-model="selected"
                       style="position:relative">
                <mt-tab-item :id="1">顾客来源</mt-tab-item>
                <mt-tab-item :id="2">顾客未到店</mt-tab-item>
                <mt-tab-item :id="3">顾客到店频次</mt-tab-item>
            </mt-navbar>
        </div>
        <div style="height:56px;background:#fff;z-index:6"></div>
        <div style="background:#fff;min-height: 550px !important;">
            <mt-tab-container v-model="selected">
                <mt-tab-container-item :id="1" style="width:100%" >
                    <v-chart :options="polar" v-show="this.$store.getters.admin"/>
                    <div class="errorBox" v-show="!this.$store.getters.admin"
                         layout="row"
                         layout-align="center center">
                        <m-icon class="ic"
                                link="icon-cuowu"></m-icon>
                        <p>亲~您当前的权限还不能看数据哦~</p>
                    </div>
                    <div style="height:56px;background:#fff;z-index:6"></div>
                </mt-tab-container-item>

                <mt-tab-container-item :id="2" style="width:100%">
                    <v-chart :options="polar2" id="polar2" v-show="this.$store.getters.admin"/>
                    <div class="errorBox"  v-show="!this.$store.getters.admin"
                         layout="row"
                         layout-align="center center">
                        <m-icon class="ic"
                                link="icon-cuowu"></m-icon>
                        <p>亲~您当前的权限还不能看数据哦~</p>
                    </div>
                    <div style="height:56px;background:#fff;z-index:6"></div>
                </mt-tab-container-item>

                <mt-tab-container-item :id="3" style="width:100%">
                    <v-chart :options="polar3" id="polar2" v-show="this.$store.getters.admin"/>
                    <div class="errorBox"  v-show="!this.$store.getters.admin" layout="row"
                         layout-align="center center">
                        <m-icon class="ic"
                            link="icon-cuowu"></m-icon>
                        <p>亲~您当前的权限还不能看数据哦~</p>
                    </div>
                    <div style="height:56px;background:#fff;z-index:6"></div>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
        <m-picker v-model="storePickerVisible"
                  :slots="slots"
                  :selected-item.sync="selectedStore"
                  value-key="name"
                  @confirm="changeStore">
        </m-picker>
        <div class="Bnav"
             layout="row"
             layout-align="space-around center"
             flex>
            <div layout="row"
                 @click="goback"
                 layout-align="center center"
                 flex>
                <m-icon class="ic"
                        link="icon-left-bold"></m-icon>&nbsp;
                <p>返回</p>
            </div>
            <div layout="row"
                 layout-align="center center"
                 flex
                 @click="storePickerVisible=true">
                <m-icon class="ic"
                        link="icon-fangzi-copy"></m-icon>&nbsp;
                <p>门店</p>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { Navbar, TabItem, TabContainer, TabContainerItem, DatetimePicker, Actionsheet } from 'mint-ui';
import mPicker from 'components/m-picker';
import mDateRangePicker from 'components/m-date-range-picker';
import apigetechartsMember from 'services/api.charts';
import Echarts from 'vue-echarts/components/ECharts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title.js';
import 'echarts/lib/component/tooltip.js';

Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Actionsheet.name, Actionsheet);
Vue.component('v-chart', Echarts);

export default {
    name: 'echartsMember',
    components: {
        mPicker,
        mDateRangePicker
    },
    data() {
        return {
            polar: {},
            polar2: {},
            polar3: {},
            selected: 1,
            storePickerVisible: false,
            slots: [],
            selectedStore: {},
            store: this.$store.state.storeList,
            storeIds: [],
            memberSourceList: [],
            memberLeaveDataList: [],
            memberArrvialTimesList: [],
            params: {
                merchantId: this.$store.getters.merchantId,
                storeId: null
            }
        };
    },
    mounted() {
        this.params.merchantId = this.$store.getters.merchantId;
        this.params.storeId = JSON.parse(localStorage.getItem('performanceInfo')).performanceStoreIds;

        for (let i = 0; i < this.store.length; i++) {
            this.storeIds.push(this.store[i].id);
        }
        let tempIndex = 0;
        var tempStores = [];
        this.$knife.deepCopy(this.$store.state.storeList, tempStores);
        let tempStoreIds = tempStores.map(item => item.id);
        if (tempStores.length >= 1) {
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
        this.getMemberStatistics();
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
            this.getMemberStatistics();
        },
        getMemberStatistics() {
            if (this.params.storeId == this.storeIds.join(',')) {
                this.params = {
                    merchantId: this.$store.getters.merchantId
                };
            } else {
                this.params = {
                    merchantId: this.$store.getters.merchantId,
                    storeId: JSON.parse(localStorage.getItem('performanceInfo')).performanceStoreIds
                };
            }

            if (this.selectedStore) {
                this.params.storeId = this.selectedStore.id;
                if (this.params.storeId == this.storeIds.join(',')) {
                    this.params = {
                        merchantId: this.$store.getters.merchantId
                    };
                }
            }
            this.$indicator.open();
            apigetechartsMember.getechartsMember(this.params).then(res => {
                this.$indicator.close();
                this.memberSourceList = res.data.memberSourceList;
                this.memberLeaveDataList = res.data.memberLeaveDataList;
                this.memberArrvialTimesList = res.data.memberArrvialTimesList;
                this.MemberSourceList();
                this.MemberLeaveDataList();
                this.MemberArrvialTimesList();
            },
            erro => {
                console.log('error');
            });
        },
        MemberSourceList() {
            var legendList = [];
            var dataList = [];
            if (this.memberSourceList && this.memberSourceList.length > 0) {
                for (var i = this.memberSourceList.length - 1; i >= 0; i--) {
                    legendList.push(this.memberSourceList[i].name + '-' + this.memberSourceList[i].count + '人');
                    dataList.push({
                        value: this.memberSourceList[i].count,
                        name: this.memberSourceList[i].name + '-' + this.memberSourceList[i].count + '人'
                    });
                }
            }
            var option = {
                legend: {
                    orient: 'horizontal',
                    align: 'left',
                    data: legendList,
                    itemWidth: 20,
                    itemGap: 15,
                    top: 350,
                    left: 'center',
                    selectedMode: false
                },

                series: [{
                    name: '访问来源',
                    type: 'pie',
                    clockwise: true,
                    animationType: 'expansion',
                    startAngle: 90,
                    radius: ['50%', '69%'],
                    center: ['50%', '18%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '14',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: dataList
                }],
                color: ['#ff8c8c', '#fe77a7', '#bf70d1', '#6c90df', '#7bacf6', '#72d6f6', '#8ae18a', '#fce57a', '#ffbe5b', '#c0e570']
            };
            this.polar = option;
        },
        MemberLeaveDataList() {
            var dataList = [];
            if (this.memberLeaveDataList && this.memberLeaveDataList.length > 0) {
                for (var i = 0; i <= this.memberLeaveDataList.length - 1; i++) {
                    switch (this.memberLeaveDataList[i].name) {
                        case '1':
                            dataList[0] = this.memberLeaveDataList[i].count;
                            break;
                        case '2':
                            dataList[1] = this.memberLeaveDataList[i].count;
                            break;
                        case '3':
                            dataList[2] = this.memberLeaveDataList[i].count;
                            break;
                        case '6':
                            dataList[3] = this.memberLeaveDataList[i].count;
                            break;
                        case '12':
                            dataList[4] = this.memberLeaveDataList[i].count;
                            break;
                    }
                }
            }
            // 指定图表的配置项和数据
            var option = {
                title: {
                    subtext: '从今天开始向前推30天~1年',
                    x: 'center'
                },
                tooltip: {},
                xAxis: {
                    data: ['1个月', '2个月', '3个月', '6个月', '12个月'],
                    axisLine: {
                        lineStyle: {
                            color: '#888'
                        }
                    }
                },
                yAxis: {
                    splitLine: {
                        lineStyle: {
                            color: '#eaeaea',
                            type: 'dotted'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#888'
                        }
                    }
                },
                series: [{
                    type: 'bar',
                    barWidth: '50%',
                    itemStyle: {
                        normal: {
                            color: '#9d7ae5'
                        }
                    },
                    data: dataList
                }]
            };
            this.polar2 = option;
        },
        MemberArrvialTimesList() {
            var dataList = [];
            if (this.memberArrvialTimesList && this.memberArrvialTimesList.length > 0) {
                for (var i = 0; i <= this.memberArrvialTimesList.length - 1; i++) {
                    dataList.push(this.memberArrvialTimesList[i].count);
                }
            }
            // 指定图表的配置项和数据
            var option = {
                title: {
                    subtext: '当月1号到至今',
                    x: 'center'
                },
                tooltip: {},
                xAxis: {
                    data: ['1次', '2次', '3次', '4次', '5次及以上'],
                    axisLine: {
                        lineStyle: {
                            color: '#888'
                        }
                    }
                },
                yAxis: {
                    splitLine: {
                        lineStyle: {
                            color: '#eaeaea',
                            type: 'dotted'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#888'
                        }
                    }
                },
                series: [{
                    type: 'bar',
                    barWidth: '50%',
                    itemStyle: {
                        normal: {
                            color: '#9d7ae5'
                        }
                    },
                    data: dataList
                }]
            };
            this.polar3 = option;
        }
    }
};
</script>

<style lang="less">
@import '~@/styles/_agile';
#echartsMember {
    .tool-tab {
        position: fixed;
        top: 0;
        z-index: 6;
        background: #f4f4fc;
        box-sizing: border-box;
        width: 100%;
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
                font-size: 14px;
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
        height: 100%;
        margin: 0 15px;
        overflow: scroll;
        .mint-tab-container-wrap{
            height: 800px;
        }
        .mint-tab-container-item {
            #polar2{
                width: 350px;
                height: 500px;
            }
            .echarts{
                width: 100%;
                height: 100%;
                overflow: scroll;
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
        top: -250px;
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
