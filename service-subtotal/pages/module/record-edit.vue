<template>
    <div class="record-edit">
        <!-- 头部名片 -->
        <div class="c-card" layout="row" layout-align="space-between stretch">
            <div class="c-card-content " flex="70" layout="row" layout-align="space-between center">
                <img src="http://img1.imgtn.bdimg.com/it/u=1022133726,1565700479&fm=214&gp=0.jpg" alt="">
                <div flex="75">
                    <p class="c-card-title no-wrap">王女士王女士王女士王女士</p>
                    <p class="c-card-subtitle no-wrap">
                        <span>●</span> 黄金会员
                        <span>●</span> 持卡3张
                    </p>
                </div>
            </div>
            <div class="c-card-call"  flex="30">
                联系Ta
            </div>
        </div>

        <!-- Ta的标签 -->
        <div class="c-tag">
            <p class="c-tag-title" layout="row" layout-align="space-between center">
                Ta的标签 
                <span>更多 ></span>
            </p>
            <div class="c-tag-box" flex-wrap="wrap" layout="row" layout-align="start center">
                <div class="c-tag-item no-wrap choose" 
                v-for="item in 8">开朗健谈</div>
            </div>
        </div>

        <!-- 评价正文 -->
        <div class="c-content mt2">
            <textarea rows="5" maxlength="200" placeholder="输入客人的要求和习惯"></textarea>
        </div>

        <!-- 配图 -->
        <div class="c-picture">
            <div layout="row" layout-align="start center" flex-wrap="wrap">
                <div class="c-picture-item" :class="['picture'+cid]" 
                    v-for="(item,cid) in pictures" :key="cid" 
                    :ref="'picture'+cid">
                    <!-- 合同图片 -->
                    <div class="ava"  layout="column" layout-align="center center">
                        {{cid+1}}
                        <img class="img-content" :src="item | fileSrc" v-show="item.base64 ||item.id" alt="">
                        <file v-model="pictures[cid]" 
                        :keyfield="'picture'+cid" 
                        @click="submitPicture" 
                        :proportion="{w:1, h:1}"></file>
                    </div>
                    <!-- 移除 合同图片 -->
                    <p class="remove-btn" @click.stop="removePicture(cid, item)">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-remove"></use>
                        </svg>
                    </p>
                </div>
            </div>
        </div>

        <!-- 日期提醒 -->
        <div class="c-warn">
            <mt-cell title="添加预约提醒">
                <mt-switch v-model="value"></mt-switch>
            </mt-cell>
        </div>

        <!-- 完成记录 -->
        <div class="c-btn-success">
            <a class="btn-finish">完成记录</a>
        </div>
    </div>
</template>
<script>
    import { Switch, Cell } from 'mint-ui';
    import api_file from 'services/api.file';
    export default {
        components: {
            'file': require('components/file-slice'),
            [Switch.name]: Switch,
            [Cell.name]: Cell
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
                value: true
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
                    newdiv2.style.height = '17px';
                }, res => {
                    // 上传失败
                    newdiv2.innerText = '上传失败！';
                    self.pictures[idx].content = null;
                    self.pictures[idx].base64 = null;
                    window.setTimeout(() => {
                        newdiv2.style.height = '17px';
                    }, 1500);
                });
            },
            // 删除合同图片
            removePicture(cid, item) {
                var successTips = document.getElementsByClassName('img-loading');
                for (var i = 0; successTips.length > 0;) {
                    successTips[i].parentNode.removeChild(successTips[i]);
                }
                this.pictures = this.pictures.filter(x => {return x.id !== item.id;});
            }
        }
    };
</script>
<style lang="less">
    @import '~styles/_agile.less';
    @import '~styles/_flex.less';
    .mt2{
        margin-top: 10px;
    }
    .record-edit{
        width: 100%;
        padding: 0;
        margin: 0;
    }
    .c-card{
        background-color: white;
        font-size: @fs28;
        padding: @l16;
        border-bottom: 1px solid #ccc;
        .c-card-content{
            padding: 10px 0;
            img {
                border-radius: 50%;
                width: 50px;
                height: 50px;
            }
            .c-card-title{
                width: 100%;
                height: @fs32;
                line-height: @fs32;
                font-size: @fs24;
            }
            .c-card-subtitle{
                font-size: @fs24;
                height: @fs20;
                line-height: @fs20;
                color: @dark-gray;
                span{
                    font-size: @fs36;
                    color: @color-main; 
                }
            }
        }
        .c-card-call{
            padding: 10px 20px;
            border-left: 1px solid #ccc;
            color: @color-main;
        }
    }

    .c-tag{
        background-color: white;
        font-size: 28px;
        padding: 0 20px;
        .c-tag-title{
            padding: 20px 0;
            font-size: 36px;
            span{
                color: @color-main;
            }
        }
        .c-tag-box{
            content-align: start;
            .c-tag-item{
                .flex-percentge(22%);
                margin: 0 4% 4% 0;
                border: 1px solid @dark-gray;
                padding: 5px;
                text-align: center;
                border-radius: 5px;
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

    .c-content{
        font-size:32px;
        textarea{
            font-size:32px;
            width: 100%;
            padding: 20px;
            resize: none;
        }
    }

    .c-picture{
        margin-bottom: 20px;
        background-color:white;
        .c-picture-item {
            position:relative;
            border: 1px solid @card-gray;
            box-shadow:0 5px 15px @card-gray;
            color:fade(@color-primary,50%);
            width:30vw;
            height:30vw;
            margin-right: 5vw;
            margin-bottom: 5vw;
            &:nth-child(3n+0){
                margin-right: 0;
            }
            display: inline-block;
            background-color:white; 
            .ava {
                width:100%;
                height:100%;
                box-sizing: border-box;
                overflow: hidden;
                text-align: center;
                .icon {
                    font-size:50px;
                    color: fade(@color-primary,50%);
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
                height:50px;
                position:absolute;
                right:0;
                top:0;
                width:50px;
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
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 28px;
            }
        }
    }

    .c-warn{
        background-color:white;
        font-size: 36px;
        .c-warn-switch{
            transform: scale(1.5);
        }
    }

    .c-btn-success{
        margin-top: 30px;
        text-align: center;
        .btn-finish{
            display: inline-block;
            width: 400px;
            height: 120px;
            line-height: 120px;
            font-size: 40px;
            border-radius: 70px;
            color: white;
            text-align: center;
            background-color: @color-main;
        }
    }
    
</style>
