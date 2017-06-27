<template>
    <div v-title="'客户关怀'">
        <!-- 头部名片 -->
        <div class="c-card" layout="row" layout-align="space-between end">
            <div class="c-card-content" flex="75" layout="row" layout-align="space-between center">
                <img :src="avatarId|mSrc(90,90,require('assets/imgs/avatar.png'))" alt="">
                <div flex="75">
                    <p class="c-card-title " layout="row" layout-align="start center">
                        <span class="c-card-name no-wrap">{{dataModel.memberName}}</span>&nbsp;&nbsp;
                        <span class="c-card-number no-wrap text-center" flex="50">
                            <span class="dian">●</span> 
                            <span class="ft-light">{{dataModel.memberId}}</span>
                        </span>
                    </p>
                    <p class="c-card-subtitle" layout="row" layout-align="start center">
                        <span class="dian" flex="10">●</span> 
                        <span class="ft-light no-wrap" flex="40">{{}}</span>&nbsp;&nbsp;
                        <span class="dian" flex="10">●</span> 
                        <span class="ft-light no-wrap" flex="40">持卡{{}}张</span>
                    </p>
                </div>
            </div>
            <div class="c-card-call text-right ft-light"  flex="20">
                <a :href="'tel:'+dataModel.merchantId" class="btn btn-xs ft-light">
                    <m-icon xlink="#icon-tel-alt"></m-icon> 联系Ta
                </a>
            </div>
        </div>
        <!-- 客户关怀编辑 -->
        <record-edit :model="dataModel" :type="2" @click="saveRecord"></record-edit>
    </div>
</template>
<script>
import recordEdit from './module/record-edit.vue';

// import api_serviceNote from 'services/api.serviceNote';
export default {
    name: 'return-visit-edit',
    components: {
        recordEdit
    },
    data() {
        return {
            dataModel: {
                id: this.$route.params.memberId,
                merchantId: this.$store.getters.merchantId,
                storeId: this.$store.getters.storeId,
                content: '',
                imageIds: '',
                type: 2, // 1=小计，2=客户关怀
                employeeId: 138239242342,
                employeeName: 'jczzq',
                memberId: this.$route.params.memberId,
                memberName: '李老板',
                orderId: 19344397394,
                tags: '',
                remind: 0, // 0=不提醒，1=提醒
                remindTime: '2017-5-01 00:00:00', // remind=1时必传
                remindContent: '2' // remind=1时必传
            },
            avatarId: '6605483877807029'
        };
    },
    methods: {
        // 初始化信息
        // 获取会员信息
        getMemberInfo() {
            // let memberId = this.dataModel.id;
            // api_serviceNote.
        },
        // 提交客户关怀
        saveRecord() {
            console.log(JSON.stringify(this.dataModel));
            this.$router.push({name: 'record-finish', query: {type: this.dataModel.type}});
        }
    }
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
            padding: 5px 0;
            color: @extra-light-black;
            .btn{
                color: @extra-light-black;
                border: 1px solid #979797;
            }
        }
    }
</style>
