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
            <div class="c-card-call text-right"  flex="30">
                <span class="btn btn-sm">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-tel-alt"></use>
                    </svg> 联系Ta
                </span>
            </div>
        </div>

        <!-- Ta的标签 -->
        <div class="c-tag">
            <p class="c-tag-title" layout="row" layout-align="space-between center">
                Ta的标签 
                <span>更多 <svg class="icon" aria-hidden="true"><use xlink:href="#icon-right"></use></svg> </span>
            </p>
            <div class="c-tag-box" flex-wrap="wrap" layout="row" layout-align="start center">
                <div class="c-tag-item no-wrap choose" 
                v-for="item in 8">开朗健谈</div>
            </div>
        </div>

        <!-- 评价正文 -->
        <div class="c-content">
            <textarea rows="5" maxlength="200" placeholder="输入客人的要求和习惯"></textarea>
        </div>

        <!-- 配图 -->
        <div class="c-picture">
            <div layout="row" layout-align="start center" flex-wrap="wrap">
                <div class="c-picture-item" :class="['picture'+cid]" 
                    v-for="(item,cid) in pictures" :key="cid" 
                    :ref="'picture_'+cid">
                    <!-- 合同图片 -->
                    <div class="ava"  layout="column" layout-align="center center">
                        <img class="img-content" :src="item | fileSrc" v-show="item.base64 ||item.id" alt="">
                        <file v-model="pictures[cid]" 
                        :keyfield="'picture_'+cid" 
                        @click="submitPicture" 
                        :proportion="{w:1, h:1}"></file>
                    </div>
                    <!-- 移除 合同图片 -->
                    <p class="remove-btn" @click.stop="removePicture(cid, item)">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-yichu"></use>
                        </svg>
                    </p>
                </div>
                <div class="c-picture-item c-picture-item-add" @click="addPicture">
                    <div class="ava"  layout="column" layout-align="center center">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-add"></use>
                        </svg>
                    </div>
                </div>
            </div>
            <p class="txt-tips">{{pictures.length}} / 9张</p>
        </div>

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
        <div class="c-btn-success">
            <a class="btn-finish" @click="recordFinish">完成记录</a>
        </div>
    </div>
</template>
<script>
    import { Switch, Cell, DatetimePicker, Popup } from 'mint-ui';
    import api_file from 'services/api.file';
    export default {
        components: {
            'file': require('components/file-slice'),
            [Switch.name]: Switch,
            [Cell.name]: Cell,
            [DatetimePicker.name]: DatetimePicker,
            [Popup.name]: Popup
        },
        data() {
            return {
                // 图片列表
                pictures: [{
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
                isWran: false,
                warnDate: new Date().formatDate('yyyy-MM-dd hh:mm')
            };
        },
        methods: {
            // 上传图片
            submitPicture(img, key) {
                var self = this;
                let idx = key.split('_')[1];
                var newdiv2;
                if (this.$refs[key][0].lastElementChild.className == 'img-loading') {
                    newdiv2 = self.$refs[key][0].lastElementChild;
                } else {
                    newdiv2 = document.createElement('div');
                    newdiv2.className = 'img-loading';
                }
                newdiv2.style.height = '100%';
                newdiv2.innerText = '正在上传...';
                self.$refs[key][0].appendChild(newdiv2);
                api_file.uploadImage(img).then(res => {
                    // 上传成功
                    self.pictures[idx].content = null;
                    self.pictures[idx].base64 = null;
                    self.pictures[idx].id = res.data;
                    newdiv2.innerText = '上传成功！';
                    newdiv2.style.height = '24px';
                }, res => {
                    // 上传失败
                    newdiv2.innerText = '上传失败！';
                    self.pictures[idx].content = null;
                    self.pictures[idx].base64 = null;
                    window.setTimeout(() => {
                        newdiv2.style.height = '24px';
                    }, 1500);
                });
            },
            // 删除图片
            removePicture(cid, item) {
                var successTips = document.getElementsByClassName('img-loading');
                for (var i = 0; successTips.length > 0;) {
                    successTips[i].parentNode.removeChild(successTips[i]);
                }
                this.pictures = this.pictures.filter(x => {return x.id !== item.id;});
            },
            // 添加图片
            addPicture() {

            },
            // 完成记录
            recordFinish() {
                this.$router.push({name: 'record-finish'});
            }
        }
    };
</script>
<style lang="less">
    @import '~styles/_agile.less';
    @import '~styles/_flex.less';
    .mgb{
        margin-bottom: @l16 ;
    }
    [flex="75"] {
        .flex-percentge(75%);
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
        background-color: white;
        font-size: @fs28;
        padding: @l32;
        .c-tag-title{
            span{
                color: @color-main !important;
            }
        }
        .c-tag-box{
            .c-tag-item{
                .flex-percentge(21%);
                margin: 5% 5% 0 0;
                border: 1px solid @dark-gray;
                padding: 2px 5px;
                text-align: center;
                border-radius: 2px;
                font-size: @fs24;
                &.choose{
                    color: @color-primary;
                    border: 1px solid @color-primary;
                }
            }
            .c-tag-item:nth-child(4n+0){
                margin-right:0;
            }
        }
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
        .c-picture-item {
            position:relative;
            border: 1px solid @card-gray;
            box-shadow:0 0 5px 1px @color-bg;
            color:fade(@gray,50%);
            width:28vw;
            height:28vw;
            margin: 4vw 0 0 4vw;
            &:nth-child(3n+1){
                margin-right: 0;
            }
            display: inline-block;
            background-color:white;
            &.c-picture-item-add{
                background-color: #f8f8f8;
                border: 1px dashed #ccc;
            }
            .ava {
                width:100%;
                height:100%;
                box-sizing: border-box;
                overflow: hidden;
                text-align: center;
                .icon {
                    font-size:40px;
                    color: fade(@gray,30%);
                }
                img {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    left: 0;
                    top: 0;
                }
                img[src=""] {
                    opacity: 0;
                }
            }
            .remove-btn{
                width:24px;
                height:24px;
                line-height:24px;
                font-size: @fs32;
                position:absolute;
                right:0;
                top:0;
                z-index:5;
                text-align:center;
                background-color:fade(black,50%);
                .icon{
                    color:white;
                }
            }
            .img-loading{
                transition: height .3s ease-in;
                position: absolute;
                top: 0;
                left: 0;
                background-color: rgba(0, 0, 0, 0.51);
                width: 100%;
                height: 100%;
                color: white;
                display: -webkit-box;
                display: -webkit-flex;
                display: flex;
                -webkit-justify-content: center;
                -webkit-align-items: center;
                justify-content: center;
                align-items: center;
                font-size: 12px;
                z-index:6;
            }
        }
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
    .c-btn-success{
        margin: 20px;
        text-align: center;
        .btn-finish{
            display: inline-block;
            width: 150px;
            height: 45px;
            line-height: 45px;
            font-size: @fs32;
            border-radius: 25px;
            color: white;
            text-align: center;
            background-color: @color-main;
        }
    }

    // cubic-bezier(1.0, 0.5, 0.8, 1.0);
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .3s ease;
    }
    .slide-fade-enter, .slide-fade-leave-active {
        transform: translateY(-10px);
        opacity: 0;
    }
</style>
