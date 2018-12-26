<template>
    <div class="b2b-mall-income-data" v-title="'活动收入'">
        <div class="p-t-3"></div>
        <div class='p-t-4 p-b-4 cell-box bg-white' layout='row' layout-align='start center'>
            <div flex class='fs32 fwb'>活动收入情况</div>
            <div class="color-primary fs24"><m-icon link="icon-jingshiicon"></m-icon> 结算规则</div>
        </div>
        <div class="bg-white p-t-2 p-b-2 text-center" layout="row">
            <div class="p-t-1 p-b-1" flex="33">
                <div class="fwb fs32">1234元</div>
                <div class="m-t-1">昨日收入</div>
            </div>
            <div class="p-t-1 p-b-1 border-left" flex="33">
                <div class="fwb fs32">2234元</div>
                <div class="m-t-1">待验券</div>
            </div>
            <div class="p-t-1 p-b-1 border-left" flex="33">
                <div class="fwb fs32">3234元</div>
                <div class="m-t-1">待成团</div>
            </div>
        </div>
        <div class="bg-white m-t-3">
            <div class="p-t-4 p-b-4 cell-box" layout='row' layout-align='start center'>
                <div flex class='fs32 fwb'>收入曲线</div>
                <div class="color-primary fs24">近7天 <m-icon link="icon-huabanfuben5"></m-icon></div>
            </div>
            <div class="chart-box">
                <v-chart ref="echart" :options="chartOptions"/>
            </div>
        </div>
        <div class="bg-white m-t-3">
            <div class="p-t-4 p-b-4 cell-box border-bottom" layout='row' layout-align='start center'>
                <div flex class='fs32 fwb'>设置</div>
            </div>
            <div @click="goSettingsAccount" class="p-t-4 p-b-4 cell-box" layout='row' layout-align='start center'>
                <div flex class='fs28'>收款账号</div>
                <div class="extra-black">6887 **** **** 1544 <m-icon link="icon-xiangyouicon"></m-icon></div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import ECharts from 'vue-echarts/components/ECharts.vue';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
Vue.component('v-chart', ECharts);
export default {
    name: 'income-data',
    data() {
        return {
            chartOptions: {
                grid: {
                    left: '4%',
                    top: '5%',
                    right: '5%',
                    bottom: '5%',
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: `{b} <br/> 收入￥{c}`
                },
                xAxis: {
                    data: [ '2012-01-01', '2012-01-02', '2012-01-03', '2012-01-04', '2012-01-05', '2012-01-06', '2012-01-07', '2012-01-08', '2012-01-09', '2012-01-02', '2012-01-03', '2012-01-04', '2012-01-05', '2012-01-06', '2012-01-07', '2012-01-08', '2012-01-09' ],
                    boundaryGap: false,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#aaa'
                        }
                    }
                },
                yAxis: {
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#aaa'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#ddd',
                            type: 'dotted'
                        }
                    }
                },
                series: [{
                    type: 'line',
                    showSymbol: false,
                    data: [ 100, 110, 120, 100, 110, 120, 100, 200, 300, 110, 120, 100, 110, 120, 100, 200, 300 ]
                }],
                color: ['#854399']
            }
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            setTimeout(_ => {
                this.$refs.echart.resize();
            }, 500);
        },
        goSettingsAccount() {
            this.$router.push({
                name: 'b2b-mall-settings-account'
            });
        }
    }
};
</script>

<style scoped lang='less'>
@import '~styles/_agile';
@import 'b2b-mall-style';
.b2b-mall-income-data{
    font-size: 13px;
    min-height: 100vh;
    background: @bg-gray;
    .chart-box{
        width: 100%;
        height: 280px;
        .echarts {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
