<template>
    <div id="echartsMember" v-title='"顾客分析"'>
        <div class="tool-tab">
            <mt-navbar v-model="selected" style="position:relative">
                <mt-tab-item :id="1">顾客来源</mt-tab-item>
                <mt-tab-item :id="2">顾客未到店</mt-tab-item>
                <mt-tab-item :id="3">顾客到店频次</mt-tab-item>
            </mt-navbar>
        </div>
        <div style="height:67px;background:#fff;z-index:6"></div>
        <div style="background:#fff;min-height: 550px !important;">
            <mt-tab-container v-model="selected">
                <mt-tab-container-item :id="1" style="width:100%">
                    <div class="errorBox"
                         layout="row"
                         layout-align="center center">
                        <m-icon class="ic"
                                xlink="#icon-cuowu"></m-icon>
                        <p>亲~您当前的权限还不能看数据哦~</p>
                    </div>
                    <div style="height:67px;background:#fff;z-index:6"></div>
                </mt-tab-container-item>

                <mt-tab-container-item :id="2" style="width:100%">
                    <div class="errorBox"
                         layout="row"
                         layout-align="center center">
                        <m-icon class="ic"
                                xlink="#icon-cuowu"></m-icon>
                        <p>亲~您当前的权限还不能看数据哦~</p>
                    </div>
                    <div style="height:67px;background:#fff;z-index:6"></div>
                </mt-tab-container-item>

                <mt-tab-container-item :id="3" style="width:100%">
                    <div class="errorBox"
                         layout="row"
                         layout-align="center center">
                        <m-icon class="ic"
                                xlink="#icon-cuowu"></m-icon>
                        <p>亲~您当前的权限还不能看数据哦~</p>
                    </div>
                    <div style="height:67px;background:#fff;z-index:6"></div>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>

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
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { Navbar, TabItem, TabContainer, TabContainerItem, DatetimePicker, Actionsheet } from 'mint-ui';
import mPicker from 'components/m-picker';
import mDateRangePicker from 'components/m-date-range-picker';

Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Actionsheet.name, Actionsheet);

export default {
    name: 'echartsMember',
    components: {
        mPicker,
        mDateRangePicker
    },
    data() {
        return {
            selected: 1
        };
    },
    methods: {
        goback() {
            this.$router.go(-1);
        }
    }
};
</script>

<style lang="less">
@import '~@/styles/_agile';
#echartsMember{
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
        min-height: 550px !important;
        margin: 0 15px;
        overflow: hidden;
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
            font-size: 0.4rem;
            height: 56px;
        }
    }
}
</style>
