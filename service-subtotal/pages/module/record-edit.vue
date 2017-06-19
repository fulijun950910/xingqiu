<template>
    <div class="record-edit">
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
                    <p class="c-card-subtitle ft-light" layout="row" layout-align="start center">
                        <span class="dian" flex="10">●</span> 
                        <span class="ft-light no-wrap" flex="40">黄金黄金会员会员</span>&nbsp;&nbsp;
                        <span class="dian" flex="10">●</span> 
                        <span class="ft-light no-wrap" flex="40">持卡3254145张</span>
                    </p>
                </div>
            </div>
            <div class="c-card-call text-right ft-light"  flex="30">
                <span class="btn btn-xs">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-tel-alt"></use>
                    </svg> 联系Ta
                </span>
            </div>
        </div>

        <!-- Ta的标签 -->
        <m-tags :tags="tagList" @add="addTag" @remove="removeTag"></m-tags>
        
        <!-- 评价正文 -->
        <div class="c-content">
            <textarea rows="5" maxlength="200" placeholder="输入客人的要求和习惯"></textarea>
        </div>

        <!-- 配图 -->
        <m-pictures class="c-picture" :pictures="pictureList" @remove="removePicture"></m-pictures>

        <!-- 日期提醒 -->
        <div class="c-warn">
            <mt-cell title="添加预约提醒">
                <mt-switch v-model="isWran"></mt-switch>
            </mt-cell>
            <transition name="slide-fade">
                <div v-show="isWran" class="c-warn-content">
                    <textarea rows="3" maxlength="200" 
                    placeholder="请输入要提醒自己的话。
    例如：今天要通知客户来电服务~">
                    </textarea>
                    <mt-cell title="选择提示时间" is-link :value="warnDate.formatDate('yyyy-MM-dd hh:mm')" @click.native="$refs.warnTimer.open()">
                    </mt-cell>
                </div>
            </transition>
            <mt-datetime-picker
                ref="warnTimer"
                type="datetime"
                v-model="warnDate">
            </mt-datetime-picker>
        </div>

        <!-- 完成记录 -->
        <div class="c-btn-radius">
            <a class="btn-finish" @click="recordFinish">完成记录</a>
        </div>
    </div>
</template>
<script>
    import { Switch, Cell, DatetimePicker, Popup } from 'mint-ui';
    /**
    * type:编辑类型（1：服务小计   2：客户维护）
    */
    export default {
        props: {
            type: {
                type: Number,
                default: 1
            }
        },
        components: {
            'm-tags': require('components/m-tags'),
            'm-pictures': require('components/m-pictures'),
            [Switch.name]: Switch,
            [Cell.name]: Cell,
            [DatetimePicker.name]: DatetimePicker,
            [Popup.name]: Popup
        },
        data() {
            return {
                // 图片列表
                pictureList: [{
                    base64: null,
                    id: null
                }, {
                    base64: null,
                    id: null
                }, {
                    base64: null,
                    id: null
                }, {
                    base64: null,
                    id: null
                }],
                tagList: [],
                isWran: false,
                warnDate: new Date().formatDate('yyyy-MM-dd hh:mm')
            };
        },
        methods: {
            // 完成记录
            recordFinish() {
                this.$router.push({name: 'record-finish', query: {type: this.type}});
            },
            // 删除图片
            removePicture(cid) {
                this.pictureList.splice(cid, 1);
            },
            // 添加标签
            addTag(tag) {
                if (!this.tagList.map(x => {return x.value;}).includes(tag.value)) {
                    this.tagList.push(tag);
                }
            },
            // 移除标签
            removeTag(tag) {
                this.tagList = this.tagList.filter(x => {return x.value !== tag.value;});
            }
        }
    };
</script>
<style lang="less">
    @import '~styles/_agile.less';
    .mgb{
        margin-bottom: @l16 ;
    }
    .record-edit{
        width: 100%;
        padding: 0;
        margin: 0;
    }
    .txt-tips{
        color: @extra-light-gray;
        text-align: right;
        padding: 10px @l32;
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
                color: @color-main;
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
                border: 1px solid #979797;
            }
        }
    }

    // Ta的标签
    .c-tag{
        .mgb;
    }

    // 评价正文
    .c-content{
        .mgb;
        background-color: white;
        textarea{
            font-size: @fs32;
            width: 100%;
            padding: @l32;
            resize: none;
        }
    }

    // 配图
    .c-picture{
        .mgb;
        background-color:white;
    }

    // 预约提醒
    .c-warn{
        background-color:white;
        .mint-cell-text {
            font-size: @fs32;
        }
        .mint-switch-input:checked + .mint-switch-core {
            border-color: @color-main;
            background-color: @color-main;
        }
        .c-warn-content{
            border-top: 1px solid #e4e4e4;
            textarea{
                font-size: @fs32;
                width: 100%;
                padding: @l32;
                resize: none;
            }
        }
    }

    // 完成记录
    .c-btn-radius{
        margin: 20px;
        text-align: center;
    }
</style>
