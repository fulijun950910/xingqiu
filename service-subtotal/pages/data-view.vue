<template>
    <div v-title="'服务数据统计'" class="data-view">
        <div class="header">
            <p class="text-center fs32 c4">{{vm.selectedStoreId}}</p>
            <div layout="row" layout-align="center center" class="fs28 c2">
                <p class="mr-40">{{vm.timeInterval.startDate}}</p>
                <p>{{vm.timeInterval.endDate}}</p>
            </div>
        </div>
        <span class="b-line"></span>
        <div layout="row" class="pie-panel">
            <div flex="50" layout="row" layout-align="center center" class="pie">
                <img :src="require('assets/imgs/huan.png')">
                <span class="vh-center fs40 text-center color-primary">{{vm.returnVisit | currency('', 0)}}<br>
                    <span class="fs20 c1">条</span>
                </span>
            </div>
            <div flex="50" class="text-right">
                <p class="fs32 mb-32 fwb c4">客户关怀 条数</p>
                <p class="c3">记录所有员工主动联系</p>
                <p class="mb-24 c3">客户后的备注</p>
                <button class="check-btn">查看</button>
            </div>
        </div>
        <span class="b-line"></span>
        <div layout="row" layout-align="space-between center" class="record fs32">
            <p class="c4">
                <m-icon xlink="#icon-close"></m-icon>
                全部服务数
            </p>
            <p class="color-primary">{{vm.record | currency('', 0)}}</p>
        </div>
        <div layout="row" layout-align="space-around center" class="link-panel">
            <div class="link-btn no-line-panel">
                <p>
                    <m-icon xlink="#icon-close"></m-icon>
                    {{vm.valued | currency('', 0)}}
                </p>
                <p>已记录</p>
            </div>
            <div class="link-btn">
                <p>
                    <m-icon xlink="#icon-close"></m-icon>
                    {{vm.unvalued | currency('', 0)}}
                </p>
                <p>未记录</p>
            </div>
        </div>
        <!--         <p @click="$router.push({name:'member-list'})">客户关怀数据</p>
        <p @click="$router.push({name:'service-record-list'})">服务小计数据</p> -->
    </div>
</template>
<script>
export default {
    name: 'data-view',
    components: {},
    data() {
        return {
            vm: {
                selectedStoreId: '全部门店',
                timeInterval: {
                    startDate: '2017-02-08',
                    endDate: '2017-05-08'
                },
                returnVisit: 321321,
                record: 3321,
                valued: 3213,
                unvalued: 3511
            }
        };
    },
    methods: {
        loadData() {
            // TODO: 加载数据
        }
    }
};
</script>
<style lang="less">
@import '~styles/_agile';
.data-view {
    min-height: 100%;
    background-color: @white;
    .header {
        padding-top: @l40;
        padding-bottom: @l40;
    }
    .pie-panel {
        position: relative;
        padding-top: @l8 * 8;
        padding-right: @l8 * 6;
        padding-bottom: @l8 * 8;
        .pie {
            height: 130px;
            img {
                z-index: 1;
                width: 130px;
                height: 130px;
                position: absolute;
            }
            .vh-center {
                max-width: 130px;
                line-height: 1;
            }
        }
        .check-btn {
            color: @white;
            width: @l8 * 20;
            font-size: @fs28;
            line-height: @l8 * 8;
            border-radius: @l8 * 2.5;
            background-color: @color-blue;
        }
    }
    .record {
        padding: @l40 @l8 * 6 130px / 2 @l8 * 6;
        .top-penel {
            padding-top: @l40;
        }
    }
    .link-panel {
        padding-bottom: @l40;
        p:first-child {
            .c4;
            font-size: @fs28;
            margin-bottom: @l8;
            .icon {
                color: @color-primary-dark;
            }
        }
        :nth-child(2) {
            .c5;
            font-size: @fs24;
        }
        .link-btn {
            width: 268px / 2;
            padding: @l24 @l32;
            border-radius: 10px;
            border: 1px solid #E8E8E8;
            box-shadow: 0 2px 4px 0 rgba(221, 221, 221, 0.5);
        }
    }
    .no-line-panel {
        :nth-child(2) {
            .c2;
        }
        p:first-child .icon {
            color: @color-blue;
        }
    }
    .b-line {
        .ml-40;
        height: 1px;
        display: block;
        background-color: #E4E4E4;
    }
    .mr-40 {
        margin-right: @l40;
    }
    .ml-40 {
        margin-left: @l40;
    }
    .mb-32 {
        margin-bottom: @l32;
    }
    .mb-24 {
        margin-bottom: @l24;
    }
    .c1 {
        color: #88889C;
    }
    .c2 {
        color: @gray;
    }
    .c3 {
        color: #7C7C7C;
    }
    .c4 {
        color: @extra-light-black;
    }
    .c5 {
        color: #555555;
    }
    .c6 {
        color: #D3D3D3;
    }
}
</style>
