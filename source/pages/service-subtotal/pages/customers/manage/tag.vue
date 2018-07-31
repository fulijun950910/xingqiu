<template>
    <div class="customer-manage-tag">
        <!-- 添加标签 -->
        <div class="head text-center">
            <h5>
                <span class="fs40">添加标签</span>
            </h5>
            <p class="color-gray m-b-5">
                正在对{{ 23 }}位顾客打标签
            </p>
            <div class="input-box" layout="row" layout-align="space-between center">
                <input flex type="text" placeholder="新建或搜索标签">
                <span class="btn color-primary"><m-icon xlink="#icon-add"/></span>
            </div>
        </div>
    </div>
</template>

<script>
/**
 * query: 使用优先级为 1 > 2
 *  1. customerIds=[a] a为客户Id逗号分隔字符串 eg：111,222,333
 *  2. body=[a] a为有效JSON字符串, 序列化结果将直接用于客户查询接口
 */
import { mapState, mapGetters } from 'vuex';

export default {
    name: 'customer-manage-tag',
    components: {
    },
    computed: {

        ...mapState({
        }),
        ...mapGetters({
        })
    },
    data() {
        return {
        };
    },
    mounted() {
    },
    methods: {
    }
};
</script>
<style lang="less">
@import '~styles/_agile';

.customer-manage-tag {
    font-size: 14px;
    background-color: #F9F9F9;
    min-height: 100vh;
    .head {
        background-color: white;
        padding: 20px 0;
        h5 {
            margin: 0;
        }
        .input-box {
            margin: 0 auto;
            width: 320px;
            background: #F5F5F5;
            border-radius: 4px;
            padding: 0 0 0 16px;
            input {
                padding: 16px 0;
                &::-webkit-input-placeholder {
                    color: #aaa;
                }
            }
        }
    }
}
</style>
