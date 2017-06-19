<template>
    <!-- Ta的标签 -->
    <div class="c-tag">
        <p class="c-tag-title" layout="row" layout-align="space-between center">
            <span>
                <svg class="icon" aria-hidden="true"><use xlink:href="#icon-tag-alt"></use></svg>
                Ta的标签
            </span>
            <span @click="tagVisible = true" class="more-tag">
                更多 <svg class="icon" aria-hidden="true"><use xlink:href="#icon-right-bold"></use></svg> 
            </span>
        </p>
        
        <div class="c-tag-box ft-light" flex-wrap="wrap" layout="row" layout-align="start center">
            <div class="no-tag" v-if="!tags.length">
                暂无任何标签...
            </div>
            <div v-else class="c-tag-item no-wrap" @click="chooseTagOut(item)" v-for="item in tags">
                {{item.name}}
            </div>
        </div>
        <mt-popup class="tag-popup" v-model="tagVisible" position="bottom">
            <div class="tag-input" layout="row" layout-align="space-between center">
                <input flex="75" type="text" class="tag-name"  @keyup.enter="addTagList" v-model="tagName" placeholder="花粉过敏、开朗健谈...">
                <span flex="20" class="add-tag text-center" @click="addTagList">添加</span>
            </div>
            <div class="tag-title">
                <svg class="icon" aria-hidden="true"><use xlink:href="#icon-hot-tag-alt"></use></svg>
                 热门标签
            </div>
            <div class="c-tag-box ft-light hot-tags" flex-wrap="wrap" layout="row" layout-align="start center">
                <div class="no-tag" v-if="!tagList20.length">
                    暂无任何标签...
                </div>
                <div v-else class="c-tag-item no-wrap" @click="chooseTagIn(item)" v-for="item in tagList20">
                    {{item.name}}
                </div>
            </div>
        </mt-popup>
    </div>
</template>

<script>
    import { Popup } from 'mint-ui';
    /** 标签组件
    * tags：标签列表
    *
    * add: 添加tag
    * remove : 移除tag
    */
    export default {
        name: 'm-tags',
        props: {
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
                tagLists: [{
                    name: '开朗健谈',
                    value: 0
                }, {
                    name: '花粉过敏',
                    value: 1
                }, {
                    name: '阿斯顿',
                    value: 2
                }],
                tagVisible: false,
                tagName: ''
            };
        },
        computed: {
            tagList20() {
                return this.tagLists.slice(0, 40);
            }
        },
        methods: {
            // 选中标签
            chooseTagIn(tag) {
                this.$emit('add', tag);
            },
            // 选除标签
            chooseTagOut(tag) {
                this.$emit('remove', tag);
            },
            // 立flag
            addTagList() {
                if (this.tagName.trim().length > 0) {
                    var obj = {
                        name: this.tagName.trim(),
                        value: this.tagLists.length + 1
                    };
                    this.tagLists.push(obj);
                    this.chooseTagIn(obj);
                    this.tagName = '';
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
                color: @color-main;
            }
        }
        .c-tag-box {
            .no-tag {
                padding-top : 10px;
                color: #BABABA;
            }
            .c-tag-item{
                .flex-percentge(21%);
                margin: 3% 5% 0 0;
                border: 1px solid #979797;
                color: #333;
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
            padding: 15px 15px 30px 15px;
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
