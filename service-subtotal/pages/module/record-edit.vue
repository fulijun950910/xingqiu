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
                    <p class="c-card-subtitle" layout="row" layout-align="start center">
                        <span class="dian" flex="10">●</span> 
                        <span class="ft-light no-wrap" flex="40">黄金黄金会员会员</span>&nbsp;&nbsp;
                        <span class="dian" flex="10">●</span> 
                        <span class="ft-light no-wrap" flex="40">持卡3254145张</span>
                    </p>
                </div>
            </div>
            <div class="c-card-call text-right ft-light"  flex="30">
                <span class="btn btn-xs ft-light">
                    <m-icon xlink="#icon-tel-alt"></m-icon> 联系Ta
                </span>
            </div>
        </div>

        <!-- Ta的标签 -->
        <m-tags :tags="model.tags" @add="addTag" @remove="removeTag"></m-tags>
        
        <!-- 评价正文 -->
        <div class="c-content">
            <textarea rows="5" maxlength="200" placeholder="输入客人的要求和习惯" v-model="model.content"></textarea>
        </div>

        <!-- 配图 -->
        <m-pictures class="c-picture" :column="3" :pictures="pictureList" 
        @add="pictureAdd" @remove="pictureRemove"></m-pictures>

        <!-- 日期提醒 -->
        <div class="c-warn">
            <mt-cell title="添加预约提醒">
                <mt-switch v-model="isWran"></mt-switch>
            </mt-cell>
            <transition name="slide-up">
                <div v-show="isWran" class="c-warn-content">
                    <mt-cell title="选择提醒事项" is-link :value="warnContent" @click.native="warnVisible = true">
                    </mt-cell>
                    <mt-cell title="选择提示时间" is-link :value="warnDate.formatDate('yyyy-MM-dd hh:mm')" @click.native="$refs.warnTimer.open()">
                    </mt-cell>
                </div>
            </transition>
            <!-- 提醒事项 弹出框 -->
            <mt-popup class="popup-bottom" v-model="warnVisible" position="bottom">
                <p> 提醒项列表： </p>
                <p class="no-wrap" v-for="(item, index) in warnItems" 
                @click="chooseWarnItem(item)" 
                :key="item.value" v-text="item.name"></p>
            </mt-popup>
            <!-- 提醒时间 弹出框 -->
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
    import { Switch, Cell, DatetimePicker, Popup, Checklist } from 'mint-ui';
    import { WARN_ITEMS } from 'config/mixins';
    /**
    * type:编辑类型（1：服务小计   2：客户维护）
    */
    export default {
        name: 'record-edit',
        props: {
            type: {
                type: Number,
                default: 1
            },
            model: {
                type: Object,
                default: null
            }
        },
        components: {
            'm-tags': require('components/m-tags'),
            'm-pictures': require('components/m-pictures'),
            'm-icon': require('components/m-icon'),
            [Switch.name]: Switch,
            [Cell.name]: Cell,
            [DatetimePicker.name]: DatetimePicker,
            [Popup.name]: Popup,
            [Checklist.name]: Checklist
        },
        data() {
            return {
                // 图片列表
                pictureList: [],
                isWran: false,
                warnDate: new Date().formatDate('yyyy-MM-dd hh:mm'),
                warnValue: null,
                warnItems: WARN_ITEMS,
                warnVisible: false
            };
        },
        computed: {
            warnContent() {
                if (this.model.remindContent && this.model.remindContent != '') {
                    let obj = this.warnItems.find(x => {return x.value == this.model.remindContent.toString();});
                    return obj ? obj.name : '请选择';
                } else {
                    return '请选择';
                }
            }
        },
        methods: {
            // 选择提醒事项
            chooseWarnItem(item) {
                this.warnVisible = false;
                this.model.remindContent = item.value;
            },
            // 完成记录
            recordFinish() {
                this.$router.push({name: 'record-finish', query: {type: this.type}});
            },
            // 删除图片
            pictureRemove(cid) {
                this.pictureList.splice(cid, 1);
            },
            // 添加图片（pic：要添加的图片, index：插入指定的下标）
            pictureAdd(pic, index) {
                if (index === null) {
                    this.pictureList.push(pic);
                } else {
                    this.pictureList.splice(index + 1, 0, pic);
                }
            },
            // 移除标签
            addTag(tagId) {
                let arr = this.model.tags.split(',');
                arr.push(tagId);
                this.model.tags = arr.join(',');
                console.log(this.model.tags);
            },
            // 移除标签
            removeTag(tagId) {
                let tagArr = this.model.tags.split(',').filter(x => {return x != tagId;});
                this.model.tags = tagArr.join(',');
                console.log(this.model.tags);
            }
        }
    };
</script>
<style lang="less">
    @import '~styles/_agile.less';

    // mint-ui 样式覆盖
    .mint-cell-value {
        max-width: 60%;
        span {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
    .popup-bottom {
        height: auto;
        width: 100%;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
        p {
            padding: 8px 10px;
            font-size: @fs32;
            border-top: 1px solid #eee;
            &.no-wrap {
                text-indent: 1em;
                color: @dark-gray;
            }
        }
        
    }
    .mgb {
        margin-bottom: @l16 ;
    }
    .record-edit{
        background-color: @color-bg;
        width: 100%;
        min-height: 100vh;
        padding: 0;
        margin: 0;
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
            border-color: @color-tiffany-blue;
            background-color: @color-tiffany-blue;
        }
        .c-warn-content{
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
        padding: 20px;
        text-align: center;
    }
</style>
