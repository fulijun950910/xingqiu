<template>
    <div class="customer-manage-ticket">
        <!-- 选择发出优惠券 -->
        <div class="head text-center">
            <h5>
                <span class="fs40">选择发出优惠券</span>
            </h5>
            <p class="color-gray m-b-5">
                <span v-if="customerId">正在给 {{ currentCustomer.name }} 打优惠券</span>
                <span v-else-if="customerCount">正在对{{ customerCount }}位客户打优惠券</span>
                <span v-else>打优惠券之前请选择客户！</span>
            </p>
            <div class="input-box"
                 layout="row"
                 layout-align="space-between center">
                <input flex
                       ref="searchInput"
                       v-model="keyword"
                       type="text"
                       placeholder="搜索优惠券名称">
                <span class="btn"
                      @click="searchTickets">
                    <m-icon class="fs36"
                            xlink="#icon-search2" />
                </span>
            </div>
        </div>

        <mt-popup v-model="visible"
                  position="bottom"
                  class="full-width">
            <div class="choose-panal"
                 v-if="selectTickets[0]">
                <p>
                    <strong> 发送【{{ selectTickets[0].name }}】成功后的通知方式</strong><br>
                    <span class="color-gray fs24"><m-icon xlink="#icon-xiangqing"></m-icon> 推荐同时选择两种</span>
                </p>
                <p :class="{ active: sendWechatMessage }"
                   @click.stop="sendWechatMessage = !sendWechatMessage">
                    <m-icon :xlink="`#icon-${sendWechatMessage?'xuanzhonggou':'quan1'}`" /> 微信推送给客户
                    <span class="color-gray fs24">（已关注公众号、小程序的客户）</span>
                </p>
                <p :class="{ active: sendSmsMessage }"
                   @click.stop="sendSmsMessage = !sendSmsMessage">
                    <m-icon :xlink="`#icon-${sendSmsMessage?'xuanzhonggou':'quan1'}`" /> 短信推送给客户
                    <span class="color-gray fs24">（针对没有关注公众号的客户）</span>
                </p>
                <p class="text-center m-t-3">
                    <span class="btn add-tag"
                          :class="{ disabled: submitting }"
                          @click="submit()">发送优惠券</span>
                </p>
            </div>
        </mt-popup>

        <!-- 搜索结果 -->
        <div v-show="tickets.length">
            <ul class="search-result">
                <li v-for="ticket in tickets"
                    :key="ticket.id"
                    :class="{ active: selectTicketIds.includes(ticket.id) }"
                    @click="ticketClickHandle(ticket)">
                    <p layout="row"
                       layout-align="space-between center">
                        <m-icon class="fs36"
                                xlink="#icon-diyongquan" />
                        <span flex
                              class="p-l-3">{{ ticket.name }}</span>
                        <span class="fs36">￥{{ ticket.price | fen2yuan }}
                            <!-- 现金券 -->
                            <!-- <template v-if="ticket.type === 1"></template> -->
                            <!-- 抵扣券 -->
                            <!-- <template v-else-if="ticket.type === 3"></template> -->
                        </span>
                    </p>
                </li>
            </ul>
        </div>
        <p class="p-5 text-center">
            <mt-spinner v-if="loading"
                        class="inline-block"
                        color="#B54DCE"
                        type="fading-circle"></mt-spinner>
            <span v-else-if="!tickets.length">没有可用券 (˘•ω•˘)</span>
            <span v-else-if="tickets.length >= total">加载完了 (˘•ω•˘)</span>
            <a v-else
               @click="loadTickets(page.index + 1)"
               class="btn btn-link">加载更多</a>
        </p>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import apiCustomer from 'services/api.customer';
import { Popup, Spinner } from 'mint-ui';

export default {
    name: 'customer-manage-ticket',
    components: {
        [Popup.name]: Popup,
        [Spinner.name]: Spinner
    },
    data() {
        return {
            visible: false,
            page: {
                index: 1,
                size: 10
            },
            // 发券成功是否需要推送短信通知
            sendSmsMessage: false,
            // 发券成功是否需要推送微信通知
            sendWechatMessage: false,
            loading: false,
            submitting: false,
            keyword: '',
            tickets: [],
            total: 0,
            selectTickets: []
        };
    },
    computed: {
        ...mapState({
            currentCustomer: state => state.customers.currentCustomer
        }),
        ...mapGetters(['merchantId', 'storeId']),
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
        selectTicketIds() {
            return this.selectTickets.map(x => x.id);
        }
    },
    mounted() {
        this.searchTickets();
        if (this.customerId) {
            this.$store
                .dispatch('customers/LOAD_CURRENT_CUSTOMER', {
                    customerId: this.customerId,
                    refresh: false
                })
                .then(res => {});
        }
    },
    methods: {
        // 最常使用的券
        async loadTickets(pageIndex) {
            if (this.loading) return;
            this.loading = true;
            try {
                if (pageIndex) {
                    this.page.index = pageIndex;
                }
                const paramData = {
                    page: this.page.index,
                    size: this.page.size,
                    query: [
                        { field: 'merchantId', value: this.merchantId },
                        { field: 'storeId', value: this.storeId },
                        { field: 'keyword', value: this.keyword }
                    ],
                    sort: []
                };
                let { data } = await apiCustomer.customerSearchTickets(
                    paramData
                );
                let rows = data ? data.rows || [] : [];
                this.total = data.total;
                this.tickets = this.tickets.concat(rows);
            } catch (error) {
            } finally {
                this.loading = false;
            }
        },
        searchTickets() {
            this.tickets.splice(0);
            this.page.index = 1;
            this.loadTickets();
        },
        async ticketClickHandle(ticket) {
            // 多选
            // if (this.selectTicketIds.includes(ticket.id)) {
            //     this.selectTickets = this.selectTickets.filter(x => x.id !== ticket.id);
            // } else {
            //     this.selectTickets.push(ticket);
            // }
            // 单选
            this.visible = true;
            this.selectTickets.splice(0, 1, ticket);
        },
        async submit() {
            if (this.submitting) return;
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
                this.$toast('发券之前请选择客户！');
                return;
            }
            if (!(this.selectTickets && this.selectTickets.length)) {
                this.$toast('请选择要发的券！');
                return;
            }
            try {
                this.submitting = true;
                const paramData = {
                    search: this.searchBody,
                    merchantId: this.merchantId,
                    ticketDefineId: this.selectTickets[0].id,
                    ticketDefineName: this.selectTickets[0].name,
                    sendSmsMessage: this.sendSmsMessage,
                    sendWechatMessage: this.sendWechatMessage,
                    promotionCustomerList: customers,
                    employeeId: this.$store.getters.employeeId,
                    employeeName: this.$store.getters.employeeName
                };
                await apiCustomer.customerSendTicket(paramData);
                this.$toast('发券成功！σ`∀´)σ');
                this.visible = false;
            } catch (error) {
            } finally {
                this.submitting = false;
            }
        }
    }
};
</script>
<style lang="less">
@import '~styles/_agile';

.customer-manage-ticket {
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
        }
    }
    // 搜索结果
    .search-result {
        font-size: 14px;
        display: block;
        width: 100%;
        list-style: none;
        padding: 16px;
        padding-bottom: 0;
        li {
            margin-bottom: 8px;
            background-color: white;
            text-align: left;
            padding: 12px;
        }
    }
    .choose-panal {
        padding: 12px;
        p {
            padding: 8px 0;
            &.active {
                color: @color-primary;
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
            box-shadow: 0px 7px 8px 0px rgba(180, 77, 206, 0.21);
            &.disabled {
                opacity: 0.4;
            }
        }
    }
}
</style>
