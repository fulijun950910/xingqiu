<template>
    <div class="customer-manage-group">
        <!-- 给客户分组 -->
        <div class="head text-center">
            <h5>
                <span class="fs40">给客户分组</span>
            </h5>
            <p class="color-gray m-b-5">
                <span v-if="customerId">正在给 {{ currentCustomer.name }} 分组</span>
                <span v-else-if="customerCount">正在对{{ customerCount }}位客户分组</span>
                <span v-else>分组之前请选择客户！</span>
            </p>
            <div class="input-box"
                 layout="row"
                 layout-align="space-between center">
                <input flex ref="searchInput"
                       v-model="keyword"
                       type="text"
                       placeholder="新建或搜索分组">
                <span class="btn color-primary" @click="createGroup">
                    <m-icon xlink="#icon-add" />
                </span>
            </div>
        </div>

        <!-- 分组列表 -->
        <div class="history">
            <p class="color-gray text-center m-b-2">
                分组列表
            </p>
            <div class="groups">
                <!-- 已选标签 -->
                <span v-for="item in groups"
                      :key="item.id"
                      class="tag no-wrap"
                    :class="{ selected: item.id === selected }"
                      @click="groupClickHandle(item)"
                      >
                    <m-icon v-if="item.id === selected" xlink="#icon-xuanzhonggou" />
                    <m-icon v-else xlink="#icon-quan1" />
                    <span>{{ item.name }}</span>
                </span>
            </div>
            <p class="text-center p-5">
                <span class="btn add-tag" :class="{ disabled: !selected || submitting }" @click="submit()">确定</span>
            </p>
        </div>
    </div>
</template>

<script>
/**
 * query: 使用优先级为 1 > 2 > 3
 *  1. customerId=[a] a为客户Id eg：111
 *  2. customers=[a] a为客户Id逗号分隔字符串 eg：111,222,333
 *  3. body=[a] a为有效JSON字符串, 序列化结果将直接用于客户查询接口, eg: body=encodeURIComponent(JSON.stringify(body))
 */
import { mapState } from 'vuex';
import apiCustomer from 'services/api.customer';

export default {
    name: 'customer-manage-group',
    components: {},
    data() {
        return {
            loading: false,
            creating: false,
            submitting: false,
            keyword: null,
            // 标签库
            // 选中的分组
            selected: null,
            groups: []
        };
    },
    computed: {
        ...mapState({
            currentCustomer: state => state.customers.currentCustomer
        }),
        // 路由参数
        customerId() {
            return this.$route.query.customerId;
        },
        customerIds() {
            let customerIds = this.$route.query.customers;
            return customerIds ? customerIds.split(',').map(x => window.parseInt(x)) : [];
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
        this.loadData();
        // 单用户时可以取消选中
        if (this.customerId) {
            this.$store.dispatch('customers/LOAD_CURRENT_CUSTOMER', {
                customerId: this.customerId,
                refresh: false
            }).then(res => {
                if (this.currentCustomer.promotionCustomerGroupId) {
                    this.selected = this.currentCustomer.promotionCustomerGroupId;
                }
            });
        }
    },
    methods: {
        async loadData() {
            if (this.loading) return;
            try {
                this.loading = true;
                let { data } = await apiCustomer.customerGroups();
                this.groups = data;
            } catch (error) {
            } finally {
                this.loading = false;
            }
        },
        async submit() {
            if (!this.selected || this.submitting) return;
            try {
                this.submitting = true;
                let promise;
                if (this.customerId) {
                    let paramData = {
                        promotionCustomerGroupId: this.selected
                    };
                    promise = apiCustomer.customerUpdate(this.customerId, paramData);
                } else {
                    if (!this.customerCount) {
                        this.$toast('发券之前请选择客户！');
                        return;
                    }
                    promise = apiCustomer.batchMoveCustomer(this.selected, this.customerIds);
                }
                await promise;
                this.$toast('分组成功');
                this.$router.go(-1);
            } catch (error) {
            } finally {
                this.submitting = false;
            }
        },
        async createGroup() {
            if (this.creating || !this.keyword) return;
            try {
                this.creating = true;
                let paramData = {
                    merchantId: this.$store.getters.merchantId,
                    name: this.keyword
                };
                let { data } = await apiCustomer.customerAddGroup(paramData);
                this.$toast('分组成功');
                this.groups.unshift({
                    id: data,
                    name: this.keyword
                });
                this.keyword = '';
                if (this.customerId && this.selected) {
                    let customer = this.currentCustomer;
                    customer.promotionCustomerGroupId = this.selected;
                }
            } catch (error) {
            } finally {
                this.creating = false;
            }
        },
        // 点击
        groupClickHandle(item) {
            this.selected = item.id;
        }
    }
};
</script>
<style lang="less">
@import '~styles/_agile';

.customer-manage-group {
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
        .groups {
            font-size: 0;
            margin-bottom: 36px;
            .tag {
                margin: 2% 3% 0 0;
                padding: 0 12px;
                display: inline-block;
                font-size: 14px;
                height: 30px;
                line-height: 29px;
                overflow: hidden;
                &:nth-child(3n) {
                    margin-right: 0;
                }
                &.selected {
                    color: @color-primary;
                }
            }
        }
        .add-tag {
            height: 45px;
            line-height: 44px;
            width: 190px;
            padding: 0 24px;
            background-color: @color-primary;
            color: white;
            border-radius: 25px;
            box-shadow:0px 7px 8px 0px rgba(180,77,206,0.21);
            &.disabled {
                opacity: 0.4;
            }
        }
    }
}
</style>
