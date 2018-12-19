<template>
    <div class="cp-all-panel">
        <div class="cp-query-cent">

        </div>
        <div class="cp-cont">
            <div class="cp-card">
                <div class="cp-head fwb">考勤人数 80 人</div>
                <div v-for="(item, index) in 5"
                     :key="index"
                     class="cp-cell"
                     layout="row"
                     layout-align="start center">
                    <span flex>迟到人数</span>
                    <span class="m-r-3 fs32">20</span>
                    <m-icon link="icon-weibiaoti34"></m-icon>
                </div>
            </div>
            <div class="cp-arr"></div>
            <div class="cp-card">
                <div class="cp-head no-line fwb">考勤人数占比</div>
                <v-chart class="cp-charts"
                         :options="chartOptions" />
                <div class="cp-legend">

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import ECharts from 'vue-echarts/components/ECharts.vue';
import 'echarts/lib/chart/pie';
Vue.component('v-chart', ECharts);
export default {
    name: '',
    mixins: [],
    props: {},
    components: {},
    computed: {},
    data() {
        return {
            chartOptions: {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['48%', '75%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                formatter(data) {
                                    return `{top|${data.percent.toFixed(0)}%}\n{bottom|${data.name}}`;
                                },
                                show: true,
                                rich: {
                                    top: {
                                        color: '#222222',
                                        fontSize: 36,
                                        lineHeight: 52,
                                        fontWeight: 'bold'
                                    },
                                    bottom: {
                                        color: '#888888',
                                        fontSize: 13
                                    }
                                }
                            }
                        },
                        data: []
                    }
                ],
                color: ['#AEB7CC', '#EE2E2D', '#FF9224', '#F76A24', '#3186E9']
            }
        };
    },
    mounted() {
        this.loadData();
    },
    methods: {
        loadData() {
            this.chartOptions.series[0].data = [
                { value: 1548, name: '正常' },
                { value: 234, name: '缺卡' },
                { value: 335, name: '迟到' },
                { value: 310, name: '早退' },
                { value: 135, name: '打卡异常' }
            ];
        }
    }
};
</script>
<style lang="less" scoped>
@import '~@/styles/_agile';
.cp-all-panel {
    .cp-query-cent {
        background-color: white;
    }
    .cp-line-b {
        border-bottom: 1px solid @light-gray; /*no*/
    }
    .cp-cont {
        padding: 16px;
    }
    .cp-card {
        border-radius: 4px;
        background-color: white;
        .cp-head {
            line-height: 55px;
            padding-left: 20px;
            font-size: 16px;
            .cp-line-b;
        }
        .cp-cell {
            margin: 0 20px;
            padding: 16px 0;
            .cp-line-b;
            &:last-child {
                border-bottom-width: 0px;
            }
        }
        .no-line {
            border-bottom: none;
        }
    }
    .cp-charts {
        width: 100%;
        height: 300px;
    }
    .cp-arr {
        width: 38px;
        height: 38px;
        margin-top: 12px;
        margin-bottom: 28px;
    }
}
</style>
