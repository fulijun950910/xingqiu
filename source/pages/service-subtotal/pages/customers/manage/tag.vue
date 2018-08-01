<template>
    <div class="customer-manage-tag">
        <!-- 添加标签 -->
        <div class="head text-center">
            <h5>
                <span class="fs40" @click="addTags">添加标签</span>
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
                       @blur="keyword = null"
                       type="text"
                       placeholder="新建或搜索标签">
                <span class="btn color-primary" @click="createTag">
                    <m-icon xlink="#icon-add" />
                </span>

                <ul v-show="filterTags.length"
                    class="search-rasult">
                    <li v-for="tag in filterTags"
                        :key="tag.id"
                        @click="selectTagHandle(tag)"
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
            <p class="color-gray text-center m-b-2">
                最近标签
            </p>
            <div class="tags">
                <span class="tag no-wrap" :class="{ choose: selectTagIdList.includes(tag.id) }"
                      flex="33"
                      @click="selectTagHandle(tag)"
                      v-for="tag in tags"
                      :key="tag.id">
                    <m-icon :xlink="`#icon-${selectTagIdList.includes(tag.id) ? 'yes' : 'add'}`" />
                    <span>{{ tag.name }}</span>
                </span>
            </div>
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
    computed: {
        ...mapState({
            currentCustomer: state => state.customers.currentCustomer
        }),
        ...mapGetters({
            currentCustomerTags: 'customers/currentCustomerTags'
        }),
        visibleTags() {
            let selectTagIdList = this.selectTagIdList;
            return this.tags.filter(x => !selectTagIdList.includes(x.id));
        },
        filterTags() {
            if (this.keyword) {
                return this.visibleTags.filter(x => x.name.includes(this.keyword));
            } else {
                return [];
            }
        },
        selectTagIdList() {
            return this.selectTags.map(x => x.id);
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
    data() {
        return {
            keyword: null,
            // 标签库
            tags: [],
            // 选中的标签
            selectTags: []
        };
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
                // this.$knife.deepCopy(this.currentCustomerTags);
                this.selectTags = this.currentCustomerTags.map(t => {
                    return {
                        createdTime: t.createdTime,
                        id: t.tagId,
                        merchantId: t.merchantId,
                        name: t.tagName
                    };
                });
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
                this.selectTagHandle(data);
                this.keyword = null;
            } catch (error) {
                this.$toast('标签创建失败~ 过一会儿再试试吧 (๑•́ ₃ •̀๑)');
            } finally {
                this.$indicator.close();
            }
        },
        selectTagHandle(tag) {
            if (this.selectTagIdList.includes(tag.id)) {
                this.selectTags = this.selectTags.filter(x => x.id !== tag.id);
            } else {
                this.selectTags.unshift(tag);
            }
        },
        // 客户批量打标签
        async addTags() {
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
                    tags: this.selectTags,
                    employeeId: this.$store.getters.employeeId,
                    employeeName: this.$store.getters.employeeName
                };
                await apiCustomer.customerAddTags(paramData);
                this.$router.go(-1);
            } catch (error) {
            }
        }
    }
};
</script>
<style lang="less">
@import '~styles/_agile';

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
        .tags {
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
                    background-color: @color-primary;
                    color: white;
                }
            }
        }
    }
}
</style>
