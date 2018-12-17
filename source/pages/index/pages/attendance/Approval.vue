<template>
    <div class="Approval" v-title="'待审批'">
        <div class="header p-r-4" layout="row" layout-align="space-between center">
            <div>
                <mt-checklist
                    v-model="value"
                    :options="['批量处理']">
                </mt-checklist>
            </div>
            <p>目前共有15条带审批</p>
        </div>
        <div class="main">
            <div class="list" layout="row" layout-align="space-between start">
                <div layout="row" layout-align="start start">
                    <img :src="require('assets/imgs/avatar.png')" alt="">
                    <div class="m-l-3" style="white-space:nowrap;text-overflow:ellipsis;overflow:hidden;">
                        <p class="fs14">冯子轩</p>
                        <p>09/22缺卡</p>
                        <p class="w22" style="font-size:13px;color:#888;margin-top:13px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">早上起床晚了早上起床晚了早上上起床晚了早上</p>
                    </div>
                </div>
                <div style="color:#888;font-size:12px;white-space:nowrap;">2018.12.12</div>
            </div>
            <div class="list" layout="row" layout-align="space-between start">
                <div layout="row" layout-align="start start">
                    <img :src="require('assets/imgs/avatar.png')" alt="">
                    <div class="m-l-3" style="white-space:nowrap;text-overflow:ellipsis;overflow:hidden;">
                        <p class="fs14">冯子轩</p>
                        <p>09/22缺卡</p>
                        <p class="w22" style="font-size:13px;color:#888;margin-top:13px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">早上起床晚了早上起床晚了早上上起床晚了早上</p>
                    </div>
                </div>
                <div style="color:#888;font-size:12px;white-space:nowrap;">2018.12.12</div>
            </div>
            <div class="list" layout="row" layout-align="space-between start">
                <div layout="row" layout-align="start start">
                    <img :src="require('assets/imgs/avatar.png')" alt="">
                    <div class="m-l-3" style="white-space:nowrap;text-overflow:ellipsis;overflow:hidden;">
                        <p class="fs14">冯子轩</p>
                        <p>09/22缺卡</p>
                        <p class="w22" style="font-size:13px;color:#888;margin-top:13px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">早上起床晚了早上起床晚了早上上起床晚了早上</p>
                    </div>
                </div>
                <div style="color:#888;font-size:12px;white-space:nowrap;">2018.12.12</div>
            </div>
            <div class="message">
                <p class="down">以下为已审批内容,只展示一周内审批信息，更多信息请用电脑查看</p>
            </div>
            <div class="list" layout="row" layout-align="space-between start">
                <div layout="row" layout-align="start start">
                    <img :src="require('assets/imgs/avatar.png')" alt="">
                    <div class="m-l-3" style="white-space:nowrap;text-overflow:ellipsis;overflow:hidden;">
                        <p class="fs14">冯子轩</p>
                        <p>09/22缺卡</p>
                        <p class="w22" style="font-size:13px;color:#888;margin-top:13px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">早上起床晚了早上起床晚了早上上起床晚了早上</p>
                    </div>
                </div>
                <div layout="column" layout-align="center end">
                    <p style="color:#888;font-size:12px;white-space:nowrap;">2018.12.12</p>
                    <p class="p2 fwb">审批完成</p>
                </div>
            </div>
            <div class="list" layout="row" layout-align="space-between start">
                <div layout="row" layout-align="start start">
                    <img :src="require('assets/imgs/avatar.png')" alt="">
                    <div class="m-l-3" style="white-space:nowrap;text-overflow:ellipsis;overflow:hidden;">
                        <p class="fs14">冯子轩</p>
                        <p>09/22缺卡</p>
                        <p class="w22" style="font-size:13px;color:#888;margin-top:13px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">早上起床晚了早上起床晚了早上上起床晚了早上</p>
                    </div>
                </div>
                <div layout="column" layout-align="center end">
                    <p style="color:#888;font-size:12px;white-space:nowrap;">2018.12.12</p>
                    <p class="p2 fwb">审批完成</p>
                </div>
            </div>
            <div class="list" layout="row" layout-align="space-between start">
                <div layout="row" layout-align="start start">
                    <img :src="require('assets/imgs/avatar.png')" alt="">
                    <div class="m-l-3" style="white-space:nowrap;text-overflow:ellipsis;overflow:hidden;">
                        <p class="fs14">冯子轩</p>
                        <p>09/22缺卡</p>
                        <p class="w22" style="font-size:13px;color:#888;margin-top:13px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">早上起床晚了早上起床晚了早上上起床晚了早上</p>
                    </div>
                </div>
                <div layout="column" layout-align="center end">
                    <p style="color:#888;font-size:12px;white-space:nowrap;">2018.12.12</p>
                    <p class="p2 fwb">审批完成</p>
                </div>
            </div>
            <div class="list" layout="row" layout-align="space-between start">
                <div layout="row" layout-align="start start">
                    <img :src="require('assets/imgs/avatar.png')" alt="">
                    <div class="m-l-3" style="white-space:nowrap;text-overflow:ellipsis;overflow:hidden;">
                        <p class="fs14">冯子轩</p>
                        <p>09/22缺卡</p>
                        <p class="w22" style="font-size:13px;color:#888;margin-top:13px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">早上起床晚了早上起床晚了早上上起床晚了早上</p>
                    </div>
                </div>
                <div layout="column" layout-align="center end">
                    <p style="color:#888;font-size:12px;white-space:nowrap;">2018.12.12</p>
                    <p class="p2 fwb">审批完成</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Cell, Checklist } from 'mint-ui';
export default {
    name: 'Approval',
    data() {
        return {
            value: []
        };
    },
    components: {
        [Checklist.name]: Checklist,
        [Cell.name]: Cell
    },
    mounted() {
    }
};
</script>
<style lang="less">
@import '~@/styles/_agile';
.Approval{
    .fs14{
        font-size: 14px;
    }
    .w22{
        width: 220px;
    }
    min-width: 100vw;
    min-height: 100vh;
    background: #F5F5F5;
    padding-top: 60px;
    .mint-checklist-title{
        display: none;
    }
    // .mint-checkbox-input:checked + .mint-checkbox-core{
    //     background: red;
    //     border: red;
    // }
    .header{
        background: @white;
        width: 100%;
        height: 49px;
        position: fixed;
        top: 0;
        left: 0;
        box-shadow:0px 3px 8px 0px rgba(49,77,83,0.28);
        border:1px solid rgba(204,204,204,1);
    }
    .main{
        width:95%;
        margin: 0 auto;
        overflow: hidden;
        border-radius: 4px;
        .list{
            .p2{
                margin-top: 35px;
                font-size: 14px;
                color:#1CBB68;
            }
            background: @white;
            margin-bottom: 8px;
            padding: 12px 12px 12px 16px;
            img{
                width: 29px;
                height: 29px;
                border-radius: 50%;
            }
        }
        .message{
            width: 100%;
            margin-top:29px;
            margin-bottom: 12px;
        }
        .down{
            width:240px;
            text-align: center;
            margin: 0 auto;
            font-size: 12px;
            color:#aaa;
        }
    }
}
</style>
