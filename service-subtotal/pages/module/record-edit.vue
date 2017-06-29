<template>
    <div class="record-edit">
        <!-- Ta的标签 -->
        <m-tags :member-id="model.memberId" :tags="tagList" @add="addTag" @remove="removeTag"></m-tags>
        
        <!-- 评价正文 -->
        <div class="c-content">
            <textarea rows="5" maxlength="300" placeholder="输入客人的要求和习惯" v-model="model.content"></textarea>
            <p> <span>{{model.content?model.content.length:0}} / 300字</span></p>
        </div>

        <!-- 配图 -->
        <m-pictures class="c-picture" :column="3" :pictures="pictureList" 
        @add="pictureAdd" @remove="pictureRemove" @update="updateImageIds"></m-pictures>

        <!-- 日期提醒 -->
        <div class="c-warn">
            <mt-cell title="添加日期提醒">
                <mt-switch v-model="isWran"></mt-switch>
            </mt-cell>
            <transition name="slide-up">
                <div v-show="isWran" class="c-warn-content">
                    <mt-cell title="选择提醒事项" is-link :value="warnContent" @click.native="warnVisible = true">
                    </mt-cell>
                    <mt-cell title="选择提示时间" is-link :value="warnDate?warnDate.formatDate('yyyy-MM-dd hh:mm:ss'):'请选择'" @click.native="$refs.warnTimer.open()">
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
    * model: 数据
    */
    export default {
        name: 'record-edit',
        props: {
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
                remindContent: '1',
                tagList: [],
                isWran: false,
                warnDate: new Date(),
                warnItems: WARN_ITEMS,
                warnVisible: false
            };
        },
        computed: {
            // 提醒事项
            warnContent() {
                if (this.model.remindContent && this.model.remindContent != '') {
                    let obj = this.warnItems.find(x => {return x.value == this.model.remindContent.toString();});
                    return obj ? obj.name : '请选择';
                } else {
                    return '请选择';
                }
            },
            imageIds() {
                return this.model.imageIds;
            },
            serviceSmallNote() {
                return this.model.serviceSmallNote;
            }
        },
        watch: {
            // 是否提醒
            isWran(val, oldVal) {
                if (val) {
                    this.model.remind = 1;
                } else {
                    this.model.remind = 0;
                }
            },
            // 提醒时间
            warnDate(val, oldVal) {
                if (val) {
                    this.model.remindTime = this.warnDate.formatDate('yyyy-MM-dd hh:mm:ss');
                }
            },
            remindContent(val) {
                this.model.remindContent = val;
            },
            // 标签
            tagList(val, oldVal) {
                this.model.tags = val.join(',');
            },
            imageIds(val) {
                if (val && val != '') {
                    this.pictureList = val.split(',').map(x => {
                        return {
                            id: x,
                            base64: null
                        };
                    });
                } else {
                    this.pictureList = [];
                }
            },
            serviceSmallNote(val) {
                if (val) {
                    // 是否提醒
                    this.isWran = val.remind === 1;
                    // 提醒时间
                    if (val.remindTime && val.remindTime != '') {
                        this.warnDate = val.remindTime;
                    }
                    this.remindContent = val.remindContent;
                    // 标签列表
                    this.tagList = (val.tags && val.tags != '') ? val.tags.split(',') : [];
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
                // 提交
                this.$emit('click');
            },
            // 删除图片
            pictureRemove(cid) {
                this.pictureList.splice(cid, 1);
                this.updateImageIds();
            },
            // 添加图片（pic：要添加的图片, index：插入指定的下标）
            pictureAdd(pic, index) {
                if (index === null) {
                    this.pictureList.push(pic);
                } else {
                    this.pictureList.splice(index + 1, 0, pic);
                }
            },
            // 更新图片属性
            updateImageIds() {
                this.model.imageIds = this.pictureList.map(x => {
                    return x.id;
                }).join(',');
            },
            // 移除标签
            addTag(tagId) {
                this.tagList.push(tagId);
            },
            // 移除标签
            removeTag(tagId) {
                this.tagList = this.tagList.filter(x => {return x != tagId;});
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
        width: 100%;
        padding: 0;
        margin: 0;
    }
    
    // Ta的标签
    .c-tag{
        .mgb;
    }

    // 评价正文
    .c-content{
        .mgb;
        background-color: white;
        p {
            color: @dark-gray;
            text-align: right;
            padding: @l16 @l32;
        }
        textarea{
            font-size: @fs32;
            letter-spacing: 1px;
            width: 100%;
            padding: @l32 @l32 0 @l32;
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
