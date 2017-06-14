<template>
    <div class="record-edit">
        <!-- 头部名片 -->
        <div class="c-card" layout="row" layout-align="space-between stretch">
            <div layout="row" layout-align="space-between center">
                <img src="" alt="">
                <div>
                    <p class="c-card-title">王女士</p>
                    <p class="c-card-subtitle">美白基础护理</p>
                </div>
            </div>
            <div class="c-card-call">
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
            <div class="c-picture-item" :class="['picture'+cid]" layout="column" layout-align="center center" 
                v-for="(item,cid) in pictures" :key="cid" 
                :ref="'picture'+cid">
                <!-- 合同图片 -->
                <div class="ava">
                    {{cid+1}}
                    <img class="img-cont" :src="item | fileSrc" v-show="item.base64 ||item.id" alt="">
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

        <!-- 日期提醒 -->
        <div class="c-warn">

        </div>

        <!-- 完成记录 -->
        <div class="c-btn-success">

        </div>
    </div>
</template>
<script>
    import api_file from 'services/api.file';
    export default {
        components: {
            'file': require('components/file-slice')
        },
        data() {
            return {
                // 图片列表
                pictures: [{
                    base64: null,
                    id: null
                }]
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
                    newdiv2.style.height = '35px';
                }, res => {
                    // 上传失败
                    newdiv2.innerText = '上传失败！';
                    self.pictures[idx].content = null;
                    self.pictures[idx].base64 = null;
                    window.setTimeout(() => {
                        newdiv2.style.height = '35px';
                    }, 1500);
                });
            },
            // 删除合同图片
            removePicture(cid, item) {
                var successTips = document.getElementsByClassName('img-loading');
                for (var i = 0; successTips.length > 0;) {
                    successTips[i].parentNode.removeChild(successTips[i]);
                }
                this.merchant.contractFileIds = this.merchant.contractFileIds.filter(x => {return x !== item.id;});
                this.contractFileIds.splice(cid, 1);
            }
        }
    };
</script>
<style lang="less">
    @import '~styles/_agile.less';
    @import '~styles/_flex.less';
    .mt2{
        margin-top: 20px;
    }
    .record-edit{
        width: 100%;
        padding: 0;
        margin: 0;
    }
    .c-card{
        background-color: white;
        font-size: 28px;
        padding: 20px;
        border-bottom: 1px solid #ccc;
        img {
            border-radius: 50%;
            width: 100px;
            height: 100px;
            margin: 0 20px;
        }
        .c-card-title{
            font-size: 36px;
        }
        .c-card-subtitle{
            color: @dark-gray;
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
            border-bottom: 1px solid #ccc;
        }
    }

    .c-picture{
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
    
</style>
