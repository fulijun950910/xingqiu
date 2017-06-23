<template>
    <div v-title="'服务数据统计'" class="data-view">
        <div class="header">
            <p class="text-center fs32 extra-light-black">{{selectedStore.name}}</p>
            <div layout="row" layout-align="center center" class="fs28 color-gray">
                <p class="mr-40">{{vm.timeInterval.startDate}}</p>
                <p>{{vm.timeInterval.endDate}}</p>
            </div>
        </div>
        <span class="b-line"></span>
        <div layout="row" class="pie-panel">
            <div flex="50" layout="row" layout-align="center center" class="pie text-center">
                <img :src="require('assets/imgs/huan.png')">
                <span class="vh-center fs40 text-center color-primary fwb ff-number">{{vm.returnVisit | currency('', 0)}}<br>
                    <span class="fs20 steel-gray">条</span>
                </span>
            </div>
            <div flex="50" class="text-right">
                <p class="fs32 mb-32 fwb extra-light-black">客户关怀 条数</p>
                <p class="dark-gray">记录所有员工主动联系</p>
                <p class="mb-24 dark-gray">客户后的备注</p>
                <button class="check-btn" @click="$router.push({name:'member-list'})">查看</button>
            </div>
        </div>
        <span class="b-line"></span>
        <div layout="row" layout-align="space-between center" class="record fs32">
            <p class="extra-light-black">
                <m-icon xlink="#icon-fuwu"></m-icon>
                全部服务数
            </p>
            <p class="color-primary fwb ff-number">{{vm.record | currency('', 0)}}</p>
        </div>
        <div layout="row" layout-align="space-around center" class="link-panel">
            <div class="link-btn no-line-panel">
                <p>
                    <m-icon xlink="#icon-yipingjia"></m-icon>
                    {{vm.valued | currency('', 0)}}
                </p>
                <p>已记录</p>
            </div>
            <div class="link-btn" @click="$router.push({name:'service-record-list'})">
                <p>
                    <m-icon xlink="#icon-weipingjia"></m-icon>
                    {{vm.unvalued | currency('', 0)}}
                </p>
                <p layout="row" layout-align="space-between center">
                    未记录
                    <m-icon xlink="#icon-right-bold"></m-icon>
                </p>
            </div>
        </div>
        <bottom-menu class="bottom-menu" @click="toolbarClick" :flex="1" :click-able="clickAble"></bottom-menu>
        <m-picker v-model="popupVisible" :slots="slots" :selected-item.sync="selectedStore" value-key="name" @change="changeStore"></m-picker>
    </div>
</template>
<script>
import mPicker from 'components/m-picker';
import bottomMenu from 'components/bottom-menu';

export default {
    name: 'data-view',
    components: {
        mPicker,
        bottomMenu
    },
    data() {
        return {
            popupVisible: false,
            slots: [],
            selectedStore: {},
            vm: {
                selectedStoreId: this.$route.query.storeId,
                timeInterval: {
                    startDate: '2017-02-08',
                    endDate: '2017-05-08'
                },
                returnVisit: 321321,
                record: 3321,
                valued: 3213,
                unvalued: 3511
            },
            clickAble: [{
                name: '返回',
                value: '1',
                icon: '#icon-left-bold'
            }, {
                name: '门店',
                value: '2',
                icon: '#icon-fangzi-copy'
            }, {
                name: '时间',
                value: '3',
                icon: '#icon-shijian'
            }]
        };
    },
    created() {
        var tempStores = this.$store.state.storeList;
        var tempIndex = 0;
        if (tempStores.length) {
            tempStores.forEach((val, index) => {
                if (val.id == this.vm.selectedStoreId) {
                    tempIndex = index;
                    this.selectedStore = val;
                }
            });
            if (!this.selectedStore || !this.selectedStore.name) {
                this.selectedStore = tempStores[0];
            }
        }
        this.slots.push({
            flex: 1,
            values: tempStores,
            className: 'slot1',
            textAlign: 'center',
            defaultIndex: tempIndex
        });
    },
    methods: {
        loadData() {
            // TODO: 加载数据
        },
        changeStore(item) {
            this.selectedStore = item[0];
            this.loadData();
        },
        toolbarClick(index, item) {
            console.log(item.value);
            // TODO: change
            switch (item.value) {
                case '1':
                    this.$router.go(-1);
                    break;
                case '2':
                    this.popupVisible = true;
                    break;
                case '3':
                    break;
            }
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
        padding: @l8 * 8 @l8 * 6 @l8 * 8 @l40;
        .pie {
            height: 130px;
            position: relative;
            img {
                left: 50%;
                z-index: 1;
                width: 130px;
                height: 130px;
                position: absolute;
                margin-left: -130px / 2;
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
            background-color: @color-tiffany-blue;
        }
    }
    .record {
        padding: @l40 @l8 * 6 130px / 2 @l8 * 6;
        .top-penel {
            padding-top: @l40;
        }
    }
    .link-panel {
        // padding-bottom: 300px;
        p:first-child {
            font-size: @fs28;
            margin-bottom: @l8;
            color: @extra-light-black;
            .icon {
                color: @color-primary-dark;
            }
        }
        :nth-child(2) {
            color: @gray;
            font-size: @fs24;
            .icon {
                color: @gray;
            }
        }
        .link-btn {
            width: 268px / 2;
            padding: @l24 @l32;
            border-radius: 10px;
            border: 1px solid #E8E8E8;
            /*no*/
            box-shadow: 0 2px 4px 0 rgba(221, 221, 221, 0.5);
        }
    }
    .no-line-panel {
        p:first-child .icon {
            color: @color-tiffany-blue;
        }
    }
    .bottom-menu {
        z-index: 999;
    }
    .b-line {
        .ml-40;
        height: 1px;
        /*no*/
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
}
</style>
