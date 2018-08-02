<template>
    <div class="customer-manage-message">
        <!-- 添加短信内容 -->
        <div class="head text-center">
            <h5>
                <span class="fs40">添加短信内容</span>
            </h5>
            <p class="color-gray m-b-3">
                <span v-if="customerId">正在给 {{ currentCustomer.name }} 发短信</span>
                <span v-else-if="customerCount">正在给{{ customerCount }}位顾客发短信</span>
                <span v-else>发短信之前请选择客户！</span>
            </p>
            <div class="input-box">
                <textarea v-model="message"
                          type="text"
                          placeholder="输入您想要发出的短信内容，每65个字算一条短信">
                </textarea>
                <p class="text-left">
                    目前编辑文字
                    <span class="color-number">{{ message.length }}个</span>字，等于
                    <span class="color-number">{{ Math.ceil(message.length / 65) }}条</span>短信
                </p>
            </div>
            <p class="text-center">
                <span class="btn add-tag"
                      :class="{ disabled: disabled || submitting }"
                      @click="submit()">发送</span>
            </p>
        </div>

        <!-- 推荐短信模版 -->
        <div class="history color-gray">
            <p class="text-center m-b-4">
                推荐短信模版
            </p>
            <div class="list">
                <div v-for="item in contentList"
                     :key="item.id"
                     class="item"
                     :class="{ active: item.id === currentTplId }"
                     layout="row"
                     layout-align="space-between start">
                    <p flex @click="() => { message = item.content; currentTplId = item.id; }">
                        {{ item.content }}
                    </p>
                    <span class="p-l-3">我</span>
                </div>
            </div>
            <p class="text-center">
                <span class="btn btn-link"
                      @click="change()">换一批
                    <m-icon xlink="#icon-exchange" />
                </span>
            </p>
        </div>

    </div>
</template>

<script>
/**
 * query: 使用优先级为 1 > 2 > 3
 *  1. customerId=[a] a为客户Id eg：111
 *  2. customers=[a] a为有效JSON字符串, 序列化结果将直接用于客户查询接口 eg：customers=encodeURIComponent(JSON.stringify(customers))
 *  3. body=[a] a为有效JSON字符串, 序列化结果将直接用于客户查询接口, eg: body=encodeURIComponent(JSON.stringify(body))
 */
import apiCustomer from 'services/api.customer';
import { mapState, mapGetters } from 'vuex';

export default {
    name: 'customer-manage-message',
    components: {},
    data() {
        return {
            currentTplId: null,
            currentIndex: 0,
            disabled: true,
            submitting: false,
            message: ''
        };
    },
    computed: {
        ...mapState({
            currentCustomer: state => state.customers.currentCustomer,
            smsMerchant: state => state.customers.smsMerchant
        }),
        ...mapGetters({}),
        // 路由参数
        customerId() {
            return this.$route.query.customerId;
        },
        customers() {
            let customers = this.$route.query.customers;
            return customers ? JSON.parse(decodeURIComponent(customers)) : null;
        },
        searchBody() {
            let body = this.$route.query.body;
            return body ? JSON.parse(decodeURIComponent(body)) : null;
        },
        customerCount() {
            return (
                Number(this.$route.query.customerCount) ||
                (this.customers && this.customers.length) ||
                0
            );
        },
        // 短信模板
        smsTplList() {
            return this.smsMerchant ? this.smsMerchant.templateList || [] : [];
        },
        contentList() {
            if (this.smsTplList.length) {
                let r = this.smsTplList[this.currentIndex];
                return r ? r.contentList || [] : [];
            } else {
                return [];
            }
        }
    },
    watch: {
        message(val) {
            if (val && val.length) {
                this.disabled = false;
            } else {
                this.disabled = true;
            }
        }
    },
    mounted() {
        // 单用户时可以取消选中
        if (this.customerId) {
            this.$store
                .dispatch('customers/LOAD_CURRENT_CUSTOMER', {
                    customerId: this.customerId,
                    refresh: false
                })
                .then(res => {});
        }
        // 加载短信模板
        this.loadSMSTpl();
    },
    methods: {
        async loadSMSTpl() {
            this.$store.dispatch('customers/LOAD_MERCHANT_SMS');
        },
        // 发送
        async submit() {
            if (this.disabled || this.submitting) return;
            let customers = [];
            if (this.customerId) {
                customers.push({
                    memberId: this.currentCustomer.id,
                    name: this.currentCustomer.name,
                    phone: this.currentCustomer.phone
                });
            } else if (this.customerCount) {
                customers = this.customers;
            }
            if (!(customers && customers.length)) {
                this.$toast('发短信之前请选择客户！');
                return;
            }
            try {
                this.submitting = true;
                const paramData = {
                    search: this.searchBody,
                    merchantId: this.$store.getters.merchantId,
                    content: this.message,
                    promotionCustomerList: customers,
                    employeeId: this.$store.getters.employeeId,
                    employeeName: this.$store.getters.employeeName
                };
                await apiCustomer.customerSendMessage(paramData);
            } catch (error) {
            } finally {
                this.submitting = false;
            }
        },
        // 换一批
        change() {
            this.currentIndex =
                (this.currentIndex + 1) % this.smsTplList.length;
        }
    }
};
</script>
<style lang="less">
@import '~styles/_agile';

.color-number {
    color: #e65317;
}
.customer-manage-message {
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
            padding: 16px;
            textarea {
                resize: none;
                box-sizing: border-box;
                padding: 16px;
                width: 100%;
                background-color: #f5f5f5;
                border-radius: 2px;
                height: 160px;
                &::-webkit-input-placeholder {
                    color: #aaa;
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

    .history {
        padding: 16px;
        .list {
            .item {
                p {
                    margin-bottom: 12px;
                    border-radius: 4px;
                    padding: 12px;
                    background-color: #eee;
                }
                &.active {
                    p {
                        background-color: #827489;
                        color: white;
                    }
                }
            }
        }
    }
}
</style>
