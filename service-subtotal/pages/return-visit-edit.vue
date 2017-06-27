<template>
    <div>
        <!-- 头部名片 -->
        <div class="c-card" layout="row" layout-align="space-between end">
            <div class="c-card-content " flex="70" layout="row" layout-align="space-between center">
                <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1904751778,1640431221&fm=117&gp=0.jpg" alt="">
                <div flex="75">
                    <p class="c-card-title " layout="row" layout-align="start center">
                        <span class="c-card-name no-wrap">王女士王女士王女士</span>
                        <span class="c-card-number no-wrap text-center" flex="30">
                            <span class="dian">●</span> 
                            <span class="ft-light">12345</span>
                        </span>
                    </p>
                    <p class="c-card-subtitle" layout="row" layout-align="start center">
                        <span class="dian" flex="10">●</span> 
                        <span class="ft-light no-wrap" flex="40">黄金黄金会员会员</span>&nbsp;&nbsp;
                        <span class="dian" flex="10">●</span> 
                        <span class="ft-light no-wrap" flex="40">持卡3254145张</span>
                    </p>
                </div>
            </div>
            <div class="c-card-call text-right ft-light"  flex="30">
                <a :href="'tel:'+dataModel.merchantId" class="btn btn-xs ft-light">
                    <m-icon xlink="#icon-tel-alt"></m-icon> 联系Ta
                </a>
            </div>
        </div>
        <!-- 客户关怀编辑 -->
        <record-edit :model="dataModel" :type="2"></record-edit>
    </div>
</template>
<script>
import recordEdit from './module/record-edit.vue';
export default {
    name: 'return-visit-edit',
    components: {
        recordEdit
    },
    data() {
        return {
            dataModel: {
                id: 138239242342,
                merchantId: 138239242342,
                storeId: 123322333547,
                content: '土豪客户',
                imageIds: '6605438994151606',
                type: 2, // 1=小计，2=客户关怀
                employeeId: 138239242342,
                employeeName: '张及时',
                memberId: 19344397394,
                memberName: '李老板',
                orderId: 19344397394,
                tags: '107,106,104',
                remind: 1, // 0=不提醒，1=提醒
                remindTime: '2017-5-01 00:00:00', // remind=1时必传
                remindContent: '2' // remind=1时必传
            }
        };
    },
    methods: {}
};
</script>
<style lang="less">
    @import '~styles/_agile.less';

    // 头部名片
    .c-card{
        background-color: white;
        font-size: @fs28;
        padding: @l32;
        border-bottom: 1px solid #e4e4e4;
        .c-card-content{
            padding: 5px 0;
            img {
                border-radius: 50%;
                width: 52px;
                height: 52px;
            }
            .dian {
                text-align: left;
                height: 100%;
                line-height: 100%;
                font-size: @fs36;
                color: @color-tiffany-blue;
            }
            .c-card-title{
                width: 100%;
                height: 34px;
                line-height: 34px;
                font-size: @fs24;
                .c-card-name{
                    min-width: 20%;
                    max-width: 70%;
                    font-size: @fs40;
                }
            }
            .c-card-subtitle{
                font-size: @fs24;
                height: 20px;
                line-height: 20px;
                color: @dark-gray;
            }
        }
        .c-card-call{
            height: 100%;
            padding: 5px;
            color: @extra-light-black;
            .btn{
                color: @extra-light-black;
                border: 1px solid #979797;
            }
        }
    }
</style>
