<template>
    <!-- Ta的标签 -->
    <div class="c-tag">
        <p class="c-tag-title" layout="row" layout-align="space-between center">
            <span>
                <m-icon xlink="#icon-tag-alt"></m-icon>
                Ta的标签
            </span>
            <span @click="tagVisible = true" class="more-tag">
                更多 <m-icon xlink="#icon-right-bold"></m-icon>

            </span>
        </p>

        <!-- 平台标签 -->
        <div class="c-tag-box ft-light" :class="{'bdb': tagArr2.length!=0}" flex-wrap="wrap" layout="row" layout-align="start center">
            <div class="c-tag-item no-wrap" :class="{choose: tagArr.includes(item.id.toString())}"
             v-for="(item, index) in tagLib" :key="index" @click="chooseTagLib(item.id)">
                {{item.tagName}}
                <m-icon v-show="tagArr.includes(item.id.toString())" xlink="#icon-choose-on"></m-icon>
            </div>
        </div>
        <div class="c-tag-box ft-light" flex-wrap="wrap" layout="row" layout-align="start center">
            <div class="c-tag-item no-wrap choose" @click="chooseTagOut(item.id)" v-for="(item, index) in tagArr2" :key="index">
                {{item.tagName}}
                <m-icon xlink="#icon-choose-on"></m-icon>
            </div>
        </div>

        <!-- 商户标签 -->
        <mt-popup class="tag-popup" v-model="tagVisible" position="bottom">
            <div class="tag-input" layout="row" layout-align="space-between center">
                <input flex="75" type="text" class="tag-name"  @keyup.enter="createTag" v-model="tagName" placeholder="花粉过敏、开朗健谈...">
                <span flex="20" class="add-tag text-center" @click="createTag">添加</span>
            </div>
            <div class="tag-title">
                <m-icon xlink="#icon-hot-tag-alt"></m-icon>
                 热门标签
            </div>
            <div class="c-tag-box ft-light hot-tags" flex-wrap="wrap" layout="row" layout-align="start center">
                <div class="no-tag" v-if="!merchantTagLib.length">
                    暂无任何标签...
                </div>
                <div v-else class="c-tag-item no-wrap" @click="chooseTagIn(item.id)" v-for="(item, index) in merchantTagLib" :key="index">
                    {{item.tagName}}
                </div>
            </div>
        </mt-popup>
    </div>
</template>

<script>
import { Popup } from 'mint-ui';
import api_tag from 'services/api.tag';
import Q from 'q';
/** 标签组件
    * tags：标签列表
    *
    * add: 添加tag
    * remove : 移除tag
    */
export default {
    name: 'm-tags',
    props: {
        memberId: {
            default: null
        },
        tags: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    components: {
        [Popup.name]: Popup
    },
    data() {
        return {
            memberTag: [], // 会员的标签
            merchantTagLib: [], // 商户级标签
            tagLib: [], // 平台标签
            tagVisible: false,
            tagName: ''
        };
    },
    mounted() {
        this.initTagList();
    },
    computed: {
        // 用户的平台级标签
        tagArr() {
            if (this.tags) {
                return this.tags.filter(x => {
                    return this.tagLib.map(y => { return y.id.toString(); }).includes(x);
                }).slice(0, 4);
            } else {
                return [];
            }
        },
        // 用户的商户级标签
        tagArr2() {
            if (this.tags) {
                return this.merchantTagLib.filter(x => {
                    return this.tags.includes(x.id.toString());
                });
            } else {
                return [];
            }
        }
    },
    methods: {
        // 初始化标签
        initTagList(func) {
            let deferred = Q.defer();
            let merchantId = this.$store.getters.merchantId;
            let memberId = this.memberId;
            api_tag.getMemberTagList(merchantId, memberId).then(res => {
                this.tagLib = res.data.tagLib.slice(0, 8);
                this.merchantTagLib = res.data.merchantTagLib.slice(0, 20);
                this.memberTag = res.data.memberTag.slice(0, 20);
                deferred.resolve(res.data);
                return deferred.promise;
            }, err => {
                deferred.reject(err);
                return deferred.promise;
            }).then(resp => { func(resp); });
        },
        // 选中平台标签
        chooseTagLib(tagId) {
            tagId = tagId.toString();
            if (this.tagArr.includes(tagId)) {
                this.$emit('remove', tagId);
            } else {
                if (this.tagArr.length < 4) {
                    this.$emit('add', tagId);
                }
            }
        },
        // 选中商户标签
        chooseTagIn(tagId) {
            tagId = tagId.toString();
            if (this.tagArr2.length < 4 && !this.tagArr2.map(x => { return x.id.toString(); }).includes(tagId)) {
                this.$emit('add', tagId);
            }
        },
        // 选除商户标签
        chooseTagOut(tagId) {
            this.$emit('remove', tagId.toString());
        },
        // 立flag
        createTag() {
            if (this.tagName.trim().length > 0) {
                var tag = {
                    merchantId: this.$store.getters.merchantId,
                    tagLevel: 2, // 1=平台级，2=商户级
                    tagType: 2, // 1=门店标签，2=会员标签，3=员工标签， 4=技师标签
                    tagName: this.tagName.trim()
                };
                api_tag.createMemberTag(tag).then(res => {
                    this.tagName = '';
                    console.log('res', res);
                    // 更新标签库 => 选中标签
                    this.initTagList(resp => {
                        this.chooseTagIn(res.data);
                    });
                }, err => {
                    this.$toast('网络延迟，请稍后重试~ ╮(╯▽╰)╭');
                });
            }
        }
    }
};
</script>
<style lang="less">
    @import '~styles/_agile.less';
    @import '~styles/_flex.less';
    [flex="75"] {
        .flex-percentge(75%);
    }
    // Ta的标签
    .c-tag {
        background-color: white;
        font-size: @fs28;
        padding: @l32;
        .c-tag-title {
            .more-tag {
                color: @color-tiffany-blue;
            }
        }
        .bdb {
            padding-bottom: 4vw;
            border-bottom: 1px solid #eee;
        }
        .c-tag-box {
            .no-tag {
                padding: @l16;
                color: #BABABA;
            }
            .c-tag-item{
                .flex-percentge(21%);
                margin: 3% 5% 0 0;
                border: 1px solid #979797;
                color: #333;
                padding: 2px 5px;
                text-align: center;
                font-size: @fs24;
                &.choose{
                    color: @color-primary;
                    border: 1px solid @color-primary;
                    position: relative;
                    .icon {
                        position: absolute;
                        top: -1px;
                        right: -1px;
                        font-size: @fs32;
                    }
                }
            }
            .c-tag-item:nth-child(4n+0){
                margin-right:0;
            }
            &.hot-tags{
                .c-tag-item:nth-child(1){
                    border: 1px solid @color-danger;
                    color: @color-danger;
                }
                .c-tag-item:nth-child(2){
                    border: 1px solid fade(@color-danger, 80%);
                    color: fade(@color-danger, 80%);
                }
            }
        }

        .tag-popup {
            width: 100%;
            padding: @l32;
            color: #6a6a6a;
            .tag-input{
                padding: 5px 0;
                .tag-name {
                    font-size: @fs28;
                    height: 36px;
                    padding: 6px 10px;
                    border: 1px solid #979797;
                    border-radius: 2px;
                }
                .add-tag {
                    background: #F8F8F8;
                    border: 1px solid #D6D6D6;
                    border-radius: 2px;
                    font-size: @fs28;
                    padding: 6px 10px;
                }
            }
            .tag-title{
                 color: @color-danger;
                .icon { font-size: 18px; vertical-align: middle;}
                padding-top: @l16;
            }
        }

    }
</style>
