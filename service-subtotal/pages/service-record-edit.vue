<template>
    <div v-title="'服务小计'" class="min-height-100 bg-gray">
        <!-- 头部名片 -->
        <div class="c-card" layout="row" layout-align="space-between end">
            <div class="c-card-content " flex="70" layout="row" layout-align="space-between center">
                <img :src="dataModel.memberAvatarId|mSrc(90,90,require('assets/imgs/avatar.png'))" alt="">
                <div flex="75">
                    <p class="c-card-title " layout="row" layout-align="start center">
                        <span class="c-card-name no-wrap">{{serviceName}}</span>
                    </p>
                    <p class="c-card-subtitle" layout="row" layout-align="start center">
                        <span class="dian" flex="10">●</span> 
                        <span class="ft-light no-wrap" flex="40">{{dataModel.memberName}}</span>
                    </p>
                </div>
            </div>
            <div class="c-card-call text-right ft-light"  flex="30">
                <a :href="'tel:'+dataModel.merchantId" class="btn btn-xs ft-light">
                    <m-icon xlink="#icon-tel-alt"></m-icon> 联系Ta
                </a>
            </div>
        </div>
        <!-- 服务小计编辑 -->
        <record-edit :model="dataModel" @click="saveRecord"></record-edit>
    </div>
</template>
<script>
import recordEdit from './module/record-edit.vue';
import api_serviceNote from 'services/api.serviceNote';
import Validator from 'plugin/Validator';
export default {
    name: 'service-record-edit',
    components: {
        recordEdit
    },
    mounted() {
        this.initData();
    },
    data() {
        return {
            dataModel: {
                id: this.$route.params.serviceId,
                merchantId: null,
                storeId: null,
                content: '',
                imageIds: '',
                type: 1, // 1=小计，2=客户关怀
                employeeId: null,
                employeeNo: null,
                employeeAvatarId: null,
                employeeName: '',
                memberId: this.$route.query.memberId,
                memberAvatarId: null,
                memberName: '',
                orderId: null,
                tags: '',
                remind: 0, // 0=不提醒，1=提醒
                remindTime: new Date().formatDate('yyyy-MM-dd hh:mm:ss'), // remind=1时必传
                remindContentId: null, // remind=1时必传
                remindContent: '',
                serviceSmallNote: null
            }
        };
    },
    computed: {
        serviceName() {
            return this.dataModel.serviceSmallNote ? this.dataModel.serviceSmallNote.item.map(x => {return x.itemName;}).join('+') : '无项目';
        }
    },
    methods: {
        // 初始化信息
        initData() {
            this.getServiceNoteInfo();
        },
        // 获取服务小计信息
        getServiceNoteInfo() {
            api_serviceNote.recordDetail(this.dataModel.id).then(res => {
                let serviceNote = res.data || {};
                let dm = this.dataModel || {};
                let serviceNoteKeys = Object.keys(serviceNote);
                Object.keys(dm).forEach(x => {
                    if (serviceNoteKeys.includes(x)) {
                        this.dataModel[x] = serviceNote[x];
                    }
                });
                this.remind = this.dataModel.serviceSmallNote.remind;
            });
        },
        // 验证
        checkData() {
            // 验证器
            const validator = new Validator();
            validator.add(this.dataModel.content || '', [{
                strategy: 'isNonEmpty',
                errorMsg: '关怀内容不能为空'
            }, {
                strategy: 'minLength:5',
                errorMsg: '关怀内容至少5个字'
            }]);
            if (this.dataModel.remind == 1) {
                validator.add(this.dataModel.remindTime, [{
                    strategy: 'isNullOrUndefined',
                    errorMsg: '请选择提醒时间'
                }, {
                    strategy: 'isDateTime',
                    errorMsg: '请选择提醒时间'
                }]);
                validator.add(this.dataModel.remindContentId, [{
                    strategy: 'isNull',
                    errorMsg: '请选择提醒事项'
                }]);
                validator.add(this.dataModel.remindContent || '', [{
                    strategy: 'isNonEmpty',
                    errorMsg: '请选择提醒事项'
                }]);
            }
            // 开始验证
            let errorMsg = validator.work();
            if (errorMsg) {
                this.$toast(errorMsg);
                return false;
            }
            return true;
        },
        // 完成记录
        saveRecord() {
            if (!this.checkData()) {
                return;
            }
            if (this.$route.name === 'service-record-create') {
                this.$indicator.open();
                api_serviceNote.createServiceNote(this.dataModel).then(res => {
                    this.$indicator.close();
                    this.$toast('记录成功！');
                    this.$router.push({name: 'record-finish', query: {type: this.dataModel.type}});
                }, err => {
                    this.$indicator.close();
                    this.$toast(err.message || '服务繁忙请稍后重试吧');
                });
            } else if (this.$route.name === 'service-record-edit') {
                this.$indicator.open();
                api_serviceNote.updateServiceNote(this.dataModel).then(res => {
                    this.$indicator.close();
                    this.$toast('修改成功！');
                    this.$router.push({name: 'record-finish', query: {type: this.dataModel.type}});
                }, err => {
                    this.$indicator.close();
                    this.$toast(err.message || '服务繁忙请稍后重试吧');
                });
            } else {
                this.$toast('稍后重试吧~ ╮(╯▽╰)╭');
            }
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
                    font-size: @fs36;
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
