<template>
    <!-- 图片上传 -->
    <div class="m-pictures">
        <div layout="row" layout-align="start center" flex-wrap="wrap">
            <div :class="['c-picture-item', ('c-picture-item-'+column)]" v-for="(item,cid) in pictures" :key="cid" :ref="'picture_'+cid">
                <!-- 合同图片 -->
                <m-picture :index="cid" @submit="submitPicture" ></m-picture>
                
                <!-- 移除 合同图片 -->
                <p v-if="hasRemove" class="remove-btn" @click.stop="removePicture(cid)">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-yichu"></use>
                    </svg>
                </p>
            </div>
            <div v-if="hasAdd && pictures.length<maxCount" @click="addPicture(null)"
            :class="['c-picture-item', 'c-picture-item-add', ('c-picture-item-'+column)]" >
                <div class="ava"  layout="column" layout-align="center center">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-add"></use>
                    </svg>
                </div>
            </div>
        </div>
        <p v-if="hasCounter" class="txt-tips">{{pictures.length}} / {{maxCount}}张</p>
    </div>
</template>

<script>
    /** 多个图片上传
    * m-pictures : 照片列表
    * has-add : 能否添加照片
    * has-remove : 能否移除照片
    * has-counter : 是否需要底部状态栏
    * max-count : 最多几张图片(9)
    * min-count : 最少几张图片(0)
    * column： 每行排列几个 （1~3）
    *
    * remove ： 移除某张图片
    */
    import $ from 'jquery';
    import api_file from 'services/api.file';
    export default {
        name: 'm-pictures',
        props: {
            pictures: {
                type: Array,
                required: true,
                default() {
                    return [];
                }
            },
            hasAdd: {
                type: Boolean,
                default: true
            },
            hasRemove: {
                type: Boolean,
                default: true
            },
            hasCounter: {
                type: Boolean,
                default: true
            },
            maxCount: {
                type: Number,
                default: 9
            },
            minCount: {
                type: Number,
                default: 0
            },
            column: {
                type: Number,
                default: 3,
                validator(value) {
                    if (value > 3) {
                        return 3;
                    } else if (value < 1) {
                        return 1;
                    } else {
                        return value;
                    }
                }
            }
        },
        components: {
            'm-picture': require('components/m-picture')
        },
        data() {
            return {
            };
        },
        methods: {
            // 上传图片
            submitPicture(img, idx) {
                var self = this;
                let key = 'picture_' + idx;
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
                    self.pictures[idx].base64 = null;
                    self.pictures[idx].id = res.data;
                    newdiv2.innerText = '上传成功！';
                    newdiv2.style.height = '24px';
                }, res => {
                    // 上传失败
                    newdiv2.innerText = '上传失败！';
                    self.pictures[idx].base64 = null;
                    window.setTimeout(() => {
                        newdiv2.style.height = '24px';
                    }, 1500);
                });
            },
            // 删除图片
            removePicture(imgId) {
                // 先清除图片上的标签
                let ava = this.$refs['picture_' + imgId];
                $(ava).find('.img-loading').remove();
                // 通知父组件移除图片对象
                this.$emit('remove', imgId);
            },
            // 数组元素交换位置
            swapItems(arr, index1, index2) {
                arr[index1] = arr.splice(index2, 1, arr[index1])[0];
                return arr;
            },
            // 上移
            moveUp(index) {
                if (index !== 0) {
                    this.swapItems(this.pictures, index, index - 1);
                }
            },
            // 下移
            moveDown(index) {
                if (index !== this.pictures.length - 1) {
                    this.swapItems(this.pictures, index, index + 1);
                }
            },
            // 添加图片(最多9张)
            addPicture(index) {
                let imgNum = this.pictures.length;
                if (imgNum < 9) {
                    if (index === null) {
                        this.pictures.push({
                            id: null,
                            base64: null
                        });
                    } else {
                        this.pictures.splice(index + 1, 0, {
                            id: null,
                            base64: null
                        });
                    }
                    let ava = this.$refs['picture_' + this.pictures.length];
                    $(ava).find('input[type=file]').trigger('click');
                } else {
                    this.$toast('最多上传' + this.maxCount + '张图片');
                }
            }
        }
    };
</script>
<style lang="less">
    @import '~styles/_agile.less';
    // 配图
    .m-pictures{
        .c-picture-item {
            display: inline-block;
            position:relative;
            border: 1px solid @card-gray;
            box-shadow:0 0 5px 1px @color-bg;
            color:fade(@gray,50%);
            
            .remove-btn{
                width:24px;
                height:24px;
                line-height:24px;
                font-size: @fs32;
                position:absolute;
                right:0;
                bottom:0;
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
            &.c-picture-item-add{
                background-color: #f8f8f8;
                border: 1px dashed #ccc;
            }
        }
        .c-picture-item-1 {
            width:92vw;
            height:28vw;
            margin: 4vw 0 0 4vw;
        }
        .c-picture-item-2 {
            width:44vw;
            height:28vw;
            margin: 4vw 0 0 4vw;
        }
        .c-picture-item-3 {
            width:28vw;
            height:28vw;
            margin: 4vw 0 0 4vw;
        }
    }
</style>
