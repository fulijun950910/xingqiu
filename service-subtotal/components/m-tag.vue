<template>
    <!-- Ta的标签 -->
    <div class="c-tag">
        <p class="c-tag-title" layout="row" layout-align="space-between center">
            Ta的标签 
            <span @click="tagVisible = true">更多 <svg class="icon" aria-hidden="true"><use xlink:href="#icon-right"></use></svg> </span>
        </p>
        <div class="c-tag-box" flex-wrap="wrap" layout="row" layout-align="start center">
            <div class="c-tag-item no-wrap choose"  v-for="item in 8">开朗健谈</div>
        </div>
        <mt-popup class="tag-popup" v-model="tagVisible" position="bottom">
            <div class="tag-input" layout="row" layout-align="space-between center">
                <input flex="75" type="text" class="tag-name" v-model="tagName" placeholder="花粉过敏、开朗健谈...">
                <span flex="20" class="add-tag text-center">添加</span>
            </div>
            <div class="tag-title">
                热门标签
            </div>
            <div class="c-tag-box" flex-wrap="wrap" layout="row" layout-align="start center">
                <div class="c-tag-item no-wrap choose"  v-for="item in 8">开朗健谈</div>
            </div>
        </mt-popup>
    </div>
</template>

<script>
    import { Popup } from 'mint-ui';
    /**
    * type:编辑类型（1：服务小计   2：客户维护）
    */
    export default {
        name: 'm-tag',
        props: {
            type: {
                type: Number,
                default: 1
            }
        },
        components: {
            [Popup.name]: Popup
        },
        data() {
            return {
                tagVisible: false,
                tagName: ''
            };
        },
        methods: {
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
            span{
                color: @color-main !important;
            }
        }
        .c-tag-box {
            .c-tag-item{
                .flex-percentge(21%);
                margin: 3% 5% 0 0;
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

        .tag-popup {
            width: 100%;
            padding: 15px;
            color: #6a6a6a;
            .tag-input{
                padding: 5px 0;
                .tag-name {
                    font-size: @fs28;
                    height: 36px;
                    padding: 6px 10px;
                    border: 1px solid #979797;
                    border-radius: 1px;
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
                padding-top: @l16;
            }
        }
        
    }
</style>
