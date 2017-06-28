<template>
    <div v-title="'客户关怀'" class="min-height-100 bg-gray">
        <!-- 头部名片 -->
        <div class="c-card" layout="row" layout-align="space-between end">
            <div class="c-card-content" flex="75" layout="row" layout-align="space-between center">
                <img :src="dataModel.avatarId|mSrc(60,60,require('assets/imgs/avatar.png'))" alt="">
                <div flex="75">
                    <p class="c-card-title " layout="row" layout-align="start center">
                        <span class="c-card-name no-wrap">{{dataModel.memberName}}</span>
                        <span flex="10"></span>
                        <span class="c-card-no no-wrap" flex="40">
                            <span class="dian" flex="10">●</span> {{dataModel.memberNo}}
                        </span>
                    </p>
                    <p class="c-card-subtitle" layout="row" layout-align="start center">
                        <span class="dian" flex="10">●</span> 
                        <span class="ft-light no-wrap" flex="40">{{dataModel.gradeName?dataModel.gradeName:'无会员等级'}}</span>&nbsp;&nbsp;
                        <span class="dian" flex="10">●</span> 
                        <span class="ft-light no-wrap" flex="40">持卡 {{dataModel.hasCard?dataModel.hasCard:0}} 张</span>
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
import api_member from 'services/api.member';
import api_serviceNote from 'services/api.serviceNote';
export default {
    name: 'return-visit-edit',
    components: {
        recordEdit
    },
    mounted() {
        this.initData();
    },
    data() {
        return {
            dataModel: {
                merchantId: this.$store.getters.merchantId,
                storeId: this.$store.getters.storeId,
                content: '',
                imageIds: '',
                type: 2, // 1=小计，2=客户关怀
                employeeId: this.$store.getters.employeeId,
                employeeName: this.$store.getters.employeeName,
                memberId: this.$route.params.memberId,
                memberName: '',
                hasCard: 0,
                orderId: null,
                tags: '',
                remind: 0, // 0=不提醒，1=提醒
                remindTime: new Date().formatDate('yyyy-MM-dd hh:mm:ss'), // remind=1时必传
                remindContent: '1', // remind=1时必传
                memberNo: '',
                gradeName: '',
                avatarId: ''
            }
        };
    },
    methods: {
        // 初始化信息
        initData() {
            this.getMemberInfo();
        },
        // 获取会员信息
        getMemberInfo() {
            let memberId = this.dataModel.memberId;
            api_member.getMemberById(memberId).then(res => {
                this.dataModel.memberName = res.data.name;
                this.dataModel.merchantId = res.data.merchantId;
                this.dataModel.avatarId = res.data.avatarId;
                this.dataModel.gradeName = res.data.gradeName;
                this.dataModel.memberNo = res.data.memberNo;
            });
        },
        // 验证
        checkData() {
        },
        // 提交客户关怀
        saveRecord() {
            this.$indicator.open();
            api_serviceNote.createCustomerConcern(this.dataModel).then(res => {
                this.$indicator.close();
                this.$router.push({name: 'record-finish', query: {type: this.dataModel.type}});
            }, err => {
                this.$indicator.close();
                this.$toast(err.message);
            });
        }
    }
};
</script>

<style lang="less">
    @import '~styles/_agile.less';
    .bg-gray {
        background-color: @color-bg;
    }
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
                .c-card-no {
                    font-size: @fs28;
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
