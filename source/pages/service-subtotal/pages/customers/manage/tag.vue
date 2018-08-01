<template>
    <div class="customer-manage-tag">
        <!-- 添加标签 -->
        <div class="head text-center">
            <h5>
                <span class="fs40">添加标签</span>
            </h5>
            <p class="color-gray m-b-5">
                <span v-if="customerId">正在给 {{ currentCustomer.name }} 打标签</span>
                <span v-else-if="customerCount">正在对{{ customerCount }}位顾客打标签</span>
                <span v-else>打标签之前请选择客户！</span>
            </p>
            <div class="input-box"
                 layout="row"
                 layout-align="space-between center">
                <input flex ref="searchInput"
                       v-model="keyword"
                       @blur="blurHandle"
                       type="text"
                       placeholder="新建或搜索标签">
                <span class="btn color-primary" @click="createTag">
                    <m-icon xlink="#icon-add" />
                </span>

                <ul v-show="filterTags.length"
                    class="search-rasult">
                    <li v-for="tag in filterTags"
                        :key="tag.id"
                        @click="tagClickHandle(tag)"
                        layout="row"
                        layout-align="space-between center">
                        <span flex class="p-l-3 no-wrap">{{ tag.name }}</span>
                        <span class="btn color-primary">
                            <m-icon xlink="#icon-add" />
                        </span>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 最近标签 -->
        <div class="history">
            <p class="color-gray text-center m-b-2 tle-1">
                最近标签
                <span v-if="deleteTags.length" class="remove" @click="removeTagHandle()">
                    <m-icon xlink="#icon-yichu"/>
                    ({{ deleteTags.length }})
                </span>
            </p>
            <div class="tags">
                <!-- 已选标签 -->
                <span v-for="tag in chooseTags"
                      :key="tag.id"
                      class="tag no-wrap choose"
                    :class="{ selected: tag.selected }"
                      @click="tagClickHandle(tag)"
                      >
                    <m-icon v-if="tag.selected" xlink="#icon-close" />
                    <m-icon v-else xlink="#icon-yes" />
                    <span>{{ tag.tagName }}</span>
                </span>
                <!-- 选中标签 -->
                <span class="tag no-wrap"
                :class="{ selected: tag.selected }"
                    @click="tagClickHandle(tag)"
                      v-for="tag in visibleTags"
                      :key="tag.id">
                    <m-icon xlink="#icon-add" />
                    <span>{{ tag.name }}</span>
                </span>
            </div>
            <p class="text-center">
                <span class="btn add-tag" @click="addTagHandle()">添加标签 ({{ addTags.length }})</span>
            </p>
        </div>
    </div>
</template>

<script>
/**
 * query: 使用优先级为 1 > 2
 *  1. customerId=[a] a为客户Id eg：111
 *  2. customerIds=[a] a为客户Id逗号分隔字符串 eg：111,222,333
 *  3. body=[a] a为有效JSON字符串, 序列化结果将直接用于客户查询接口, eg: body=encodeURIComponent(JSON.stringify(body))
 */
import { mapState, mapGetters } from 'vuex';
import apiCustomer from 'services/api.customer';

export default {
    name: 'customer-manage-tag',
    components: {},
    data() {
        return {
            deleting: false,
            keyword: null,
            // 标签库
            tags: [],
            // 已选的标签
            chooseTags: [],
            // 选中的标签
            selectTags: []
        };
    },
    computed: {
        ...mapState({
            currentCustomer: state => state.customers.currentCustomer
        }),
        ...mapGetters({
            currentCustomerTags: 'customers/currentCustomerTags'
        }),
        visibleTags() {
            let chooseTagIds = this.chooseTags.map(x => x.tagId);
            return this.tags.filter(x => !chooseTagIds.includes(x.id));
        },
        filterTags() {
            if (this.keyword) {
                return this.visibleTags.filter(x => x.name.includes(this.keyword));
            } else {
                return [];
            }
        },
        // 待删除的已选中标签（customerId模式才存在）
        deleteTags() {
            return this.chooseTags.filter(x => x.selected);
        },
        // 待添加的未选中标签
        addTags() {
            return this.visibleTags.filter(x => x.selected);
        },
        // 路由参数
        customerId() {
            return this.$route.query.customerId;
        },
        customerIds() {
            let customerIds = this.$route.query.customerIds;
            return customerIds ? customerIds.split(',') : [];
        },
        searchBody() {
            let body = this.$route.query.body;
            return body ? JSON.parse(decodeURIComponent(body)) : null;
        },
        customerCount() {
            return Number(this.$route.query.customerCount) || this.customerIds.length || 0;
        }
    },
    mounted() {
        this.$store
            .dispatch('customers/LOAD_CUSTOMER_TAGS')
            .then(tags => {
                this.tags = tags;
            })
            .catch(err => {
                this.$toast();
            });
        // 单用户时可以取消选中
        if (this.customerId) {
            this.$store.dispatch('customers/LOAD_CURRENT_CUSTOMER', {
                customerId: this.customerId,
                refresh: false
            }).then(res => {
                this.chooseTags = this.currentCustomerTags;
            });
        }
    },
    methods: {
        async createTag() {
            if (!this.keyword) {
                return;
            }
            try {
                this.$indicator.open();
                const tag = {
                    name: this.keyword,
                    merchantId: this.$store.getters.merchantId
                };
                let { data } = await apiCustomer.customerAddTag(tag);
                // 加入标签库
                if (!this.tags.map(x => x.id).includes(data.id)) {
                    this.$toast('创建成功');
                    this.tags.unshift(data);
                }
                // 选中标签
                this.tagClickHandle(data);
                this.keyword = null;
            } catch (error) {
                this.$toast('标签创建失败~ 过一会儿再试试吧 (๑•́ ₃ •̀๑)');
            } finally {
                this.$indicator.close();
            }
        },
        // 客户批量打标签
        async addTagHandle() {
            if (!(this.addTags && this.addTags.length)) {
                this.$toast('请选择要添加的标签');
                return;
            }
            let customerIds = null;
            if (this.customerId) {
                customerIds = [this.customerId];
            } else {
                if (this.searchBody || this.customerCount) {
                    customerIds = this.customerIds;
                } else {
                    this.$toast('打标签之前请选择客户');
                    return;
                }
            }
            try {
                const paramData = {
                    search: this.searchBody,
                    promotionCustomerId: customerIds,
                    tags: this.addTags,
                    employeeId: this.$store.getters.employeeId,
                    employeeName: this.$store.getters.employeeName
                };
                await apiCustomer.customerAddTags(paramData);
                this.$router.go(-1);
            } catch (error) {
            }
        },
        // 移除客户标签
        async removeTagHandle() {
            if (!(this.deleteTags && this.deleteTags.length)) {
                this.$toast('请选择要移除的标签');
                return;
            }
            try {
                this.deleting = true;
                const tagIds = this.deleteTags.map(x => x.id);
                await apiCustomer.customerBatchRemoveTag(tagIds);
                this.$store.commit('customers/REMOVE_TAG', tagIds);
            } catch (error) {
                this.$toast('移除失败，请稍后重试~');
            } finally {
                this.deleting = false;
            }
        },
        blurHandle() {
            setTimeout(() => {
                this.keyword = null;
            });
        },
        // 点击标签
        tagClickHandle(tag) {
            if (tag.hasOwnProperty('selected')) {
                tag.selected = !tag.selected;
            } else {
                this.$set(tag, 'selected', true);
            }
        }
    }
};
</script>
<style lang="less">
@import '~styles/_agile';
@choose: #BFC2C7;
.customer-manage-tag {
    font-size: 14px;
    background-color: #f9f9f9;
    min-height: 100vh;
    .head {
        background-color: white;
        padding: 20px 0;
        h5 {
            margin: 0;
        }
        .input-box {
            position: relative;
            margin: 0 auto;
            width: 320px;
            background: #f5f5f5;
            border-radius: 4px;
            padding: 0 0 0 16px;
            height: 48px;
            input {
                padding: 16px 0;
                &::-webkit-input-placeholder {
                    color: #aaa;
                }
            }

            // 搜索结果
            .search-rasult {
                left: 0;
                top: 50px;
                background-color: #f5f5f5;
                list-style: none;
                position: absolute;
                width: 100%;
                max-height: 350px;
                overflow-y: auto;
                border: 1px solid #eee;
                li {
                    border-bottom: 1px solid #eee;
                    text-align: left;
                    padding: 12px 0;
                }
            }
        }
    }
    .history {
        padding: 20px;
        .tle-1 {
            position: relative;
            .remove {
                position: absolute;
                right: 0;
            }
        }
        .tags {
            font-size: 0;
            margin-bottom: 24px;
            .tag {
                margin: 2% 3% 0 0;
                padding: 0 12px;
                display: inline-block;
                font-size: 12px;
                width: 31%;
                height: 30px;
                line-height: 29px;
                background: #eee;
                border-radius: 15px;
                overflow: hidden;
                &:nth-child(3n) {
                    margin-right: 0;
                }
                &.choose {
                    background-color: @choose;
                    color: white;
                }
                &.selected {
                    background-color: @color-primary;
                    color: white;
                }
            }
        }
        .add-tag {
            height: 32px;
            line-height: 30px;
            padding: 0 24px;
            background-color: @color-primary;
            color: white;
            border-radius: 16px;
        }
    }
}
</style>
