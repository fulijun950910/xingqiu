<template>
    <!-- 图片 -->
    <div class="ava"  layout="column" layout-align="center center">
        <svg class="icon" aria-hidden="true">  <use xlink:href="#icon-image"></use>  </svg>
        <img class="img-content" :src="picture | fileSrc" v-show="picture.base64 || picture.id" alt="">
        <image-slice v-model="picture"  @click="submitPicture"  :proportion="proportion"></image-slice>
    </div>
</template>

<script>
    /** 单个图片上传
    * index : 在列表中的下标
    * picture : 图片
    * proportion : 宽高比例
    *
    * submit 提交图片时触发
    */
    import { BASE_IMG_PATH } from 'config/mixins';
    export default {
        name: 'm-picture',
        props: {
            index: {
                type: Number,
                default: 0
            },
            picture: {
                type: Object,
                default() {
                    return {
                        id: null,
                        base64: null
                    };
                }
            },
            proportion: {
                type: Object,
                default() {
                    return {
                        w: 1,
                        h: 1
                    };
                }
            }
        },
        components: {
            'image-slice': require('components/image-slice')
        },
        data() {
            return {
            };
        },
        methods: {
            // 上传图片
            submitPicture(img) {
                this.$emit('submit', img, this.index);
            }
        },
        filters: {
            fileSrc(value) {
                if (value) {
                    if (value.base64) {
                        return value.base64;
                    } else if (value.id) {
                        return BASE_IMG_PATH + value.id;
                    }
                }
            }
        }
    };
</script>
<style lang="less">
    @import '~styles/_agile.less';
    // 配图
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
</style>
