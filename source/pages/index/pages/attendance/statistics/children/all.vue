<template>
    <div class="cp-all-panel">
        <div class="cp-query-cent"
             layout="row"
             layout-align="start start">
            <div flex
                 layout="row"
                 layout-align="start start"
                 flex-wrap="wrap"
                 class="p-l-4 p-b-2">
                <div class="cp-chip"
                     v-for="item in 1"
                     :key="item">2019-10-20 <m-icon link="icon-close"></m-icon>
                </div>
            </div>
            <div class="m-r-4 p-b-3 color-primary">
                筛选 <m-icon link="icon-weibiaoti34"></m-icon>
            </div>
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
            <div class="cp-arr">
                <m-icon link="icon-arrow-down"></m-icon>
            </div>
            <div class="cp-card">
                <div class="cp-head no-line fwb">考勤人数占比</div>
                <v-chart class="cp-charts"
                         :options="chartOptions" />
                <div class="cp-legend"
                     layout="row"
                     layout-align="space-around center">
                    <div v-for="(item, index) in chartOptions.series[0].data"
                         :key="index"
                         class="cp-title"
                         layout="row"
                         layout-align="start center">
                        <div :style="{background: chartOptions.color[index]}"></div>
                        <div class="extra-light-black">{{item.name}}</div>
                    </div>
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
    name: 'statistics-all',
    mixins: [],
    props: {},
    components: {},
    computed: {},
    data() {
        return {
            chartOptions: {
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
        .cp-chip {
            font-size: 12px;
            background: rgba(224, 155, 210, 0.07);
            padding: 4px 8px;
            color: @color-primary;
            line-height: 1.5;
            margin-right: 12px;
            margin-bottom: 4px;
            border-radius: 2px; /*no*/
        }
    }
    .cp-line-b {
        border-bottom: 1px solid @light-gray; /*no*/
    }
    .cp-cont {
        padding: 16px;
        padding-bottom: 80px;
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
        width: 24px;
        height: 24px;
        text-align: center;
        box-sizing: content-box;
        line-height: 24px;
        margin: 20px auto 36px auto;
        background-color: white;
        opacity: 0.3;
        border-radius: 50%;
    }
    .cp-title {
        margin-bottom: 36px;
        :nth-child(1) {
            border-radius: 50%;
            width: 8px;
            height: 8px;
            margin-right: 4px;
        }
    }
}
</style>
