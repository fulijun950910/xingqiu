<template>
    <div class="customer-detail"
         v-title="'顾客档案'">
        <!-- 顾客信息 -->
        <div class="profile text-center">
            <img class="avatar round m-b-1"
                 :src="currentCustomer.avatarId | mSrc2"
                 alt="">
            <p class="name">{{ currentCustomer.name }}</p>
            <p class="phone color-gray m-b-4">{{ currentCustomer.phone | phone }}
                <m-icon xlink="#icon-tel-alt" />
            </p>
            <p class="color-gray p-l-3 p-r-3">
                <span class="inline-block"
                      v-for="item in tags"
                      :key="item.id">
                    {{ item.tagName }}
                    <span class="p-l-1 p-r-1">·</span>
                </span>
                <span class="extra-light-black"
                      @click="moreTags">更多
                    <m-icon xlink="#icon-weibiaoti34" />
                </span>
            </p>
        </div>

        <!-- 顾客中心：打标签、编组、发短信、发券 -->
        <div class="info"
             layout="row"
             layout-align="space-around center">
            <div class="item"
                 @click="goto({ name: 'customers-manage-tag', query: { customerId: customerId } })">
                <p class="m-b-2">
                    <span class="border round">
                        <m-icon xlink="#icon-tag-alt" />
                    </span>
                </p>
                <p>打标签</p>
            </div>
            <div class="item"
                 @click="goto({ name: 'customers-manage-tag' })">
                <p class="m-b-2">
                    <span class="border round">
                        <m-icon xlink="#icon-add" />
                    </span>
                </p>
                <p>编组</p>
            </div>
            <div class="item"
                 @click="goto({ name: 'customers-manage-message' })">
                <p class="m-b-2">
                    <span class="border round">
                        <m-icon xlink="#icon-add" />
                    </span>
                </p>
                <p>发短信</p>
            </div>
            <div class="item"
                 @click="goto({ name: 'customers-manage-ticket' })">
                <p class="m-b-2">
                    <span class="border round">
                        <m-icon xlink="#icon-add" />
                    </span>
                </p>
                <p>发券</p>
            </div>
        </div>

        <!-- 跟进目录 -->
        <div class="follow-up">
            <h5 layout="row"
                layout-align="space-between center">
                <span class="fs40">跟进目录</span>
                <span class="color-primary"
                      @click="noteVisible = true">
                    <m-icon xlink="#icon-add" />
                </span>
            </h5>
            <div class="content-block"
                 v-if="notes && notes.length">
                <m-timeline :values="notes"></m-timeline>
            </div>
        </div>

        <m-alert :visible="noteVisible">
            <div class="alert-box"
                 layout="column"
                 layout-align="center center">
                <div class="note-box">
                    <h5 class="text-center fs40">输入客户跟进内容</h5>
                    <textarea class="back-gray"
                              placeholder="请输入跟进内容"
                              v-model.trim="note"></textarea>
                    <p class="text-right p-r-2 color-gray back-gray">已输入{{ note.length }}个字</p>
                    <div class="p-5 text-center">
                        <span class="btn add-tag"
                              @click="submitNote()">发送</span>
                    </div>
                </div>
                <div class="close-box">
                    <m-icon @click.native="noteVisible = false"
                            xlink="#icon-close"></m-icon>
                </div>
            </div>
        </m-alert>
    </div>
</template>

<script>
import { Field } from 'mint-ui';
import apiCustomer from 'services/api.customer';
import mTimeline from 'components/m-timeline';
import mAlert from 'components/m-alert';
import { mapState, mapGetters } from 'vuex';

export default {
    name: 'customer-detail',
    props: {
        customerId: {
            required: true
        }
    },
    components: {
        [Field.name]: Field,
        mTimeline,
        mAlert
    },
    data() {
        return {
            note: '',
            noteVisible: false,
            timeDataList: []
        };
    },
    computed: {
        ...mapState({
            currentCustomer: state => state.customers.currentCustomer
        }),
        ...mapGetters({}),
        tags() {
            return this.currentCustomer.tags || [];
        },
        notes() {
            return this.currentCustomer.notes ? this.currentCustomer.notes.map(x => {
                return {
                    time: x.createdTime,
                    name: x.employeeName,
                    desc: x.note,
                    avatarId: x.avatarFileId,
                    orderContent: null
                };
            }) || [] : [];
        }
    },
    mounted() {
        this.loadCustomer();
    },
    methods: {
        loadCustomer() {
            this.$store.dispatch('customers/LOAD_CURRENT_CUSTOMER', {
                customerId: this.customerId
            });
        },
        moreTags() {
            this.$router.push({
                name: 'customers-manage-tag',
                query: { customerId: this.customerId }
            });
        },
        goto(route) {
            this.$router.push(route);
        },
        // 提交新增客户跟进
        async submitNote() {
            if (!this.note.trim()) return;
            try {
                this.noteSubmitting = true;
                const paramData = {
                    promotionCustomerId: this.customerId,
                    note: this.note,
                    avatarFileId: this.currentCustomer.avatarId,
                    employeeId: this.$store.getters.employeeId,
                    employeeName: this.$store.getters.employeeName
                };
                await apiCustomer.customerAddNote(paramData);
                this.noteVisible = false;
                this.loadCustomer();
            } catch (error) {
            } finally {
                this.noteSubmitting = false;
            }
        }
    }
};
</script>
<style lang="less">
@import '~styles/_agile';

.inline-block {
    display: inline-block;
}
@timeline: #E65317;
.customer-detail {
    border-top: 1px solid #eee;
    font-size: 14px;
    .profile {
        padding: 20px 0 16px 0;
        .avatar {
            display: inline-block;
            vertical-align: middle;
            width: 80px;
            height: 80px;
        }
        .name {
            font-size: 20px;
            color: @color-black;
            height: 28px;
            line-height: 28px;
        }
    }
    .info {
        margin: 0 12px;
        margin-bottom: 16px;
        padding: 12px 4px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 5px 33px 0px rgba(183, 183, 183, 0.25);
        border-radius: 4px;
        .item {
            text-align: center;
            .border {
                color: @color-primary;
                display: inline-block;
                width: 44px;
                height: 44px;
                line-height: 46px;
                border: 1px solid #eee;
                .icon {
                    font-size: 24px;
                }
            }
        }
    }
    .follow-up {
        background-color: white;
        padding: 12px;
        h5 {
            margin: 0;
        }
        .content-block {
            padding: 16px 0;
            .item {
                border: 1px solid #eee;
                border-radius: 4px;
                padding: 8px 12px;
                margin: 12px;
                line-height: 24px;
            }
            .m-timeline .line-node .day-block .label .line .ver-line,
            .m-timeline .line-node .day-block .label .line .dot {
                color: @timeline;
                border-color: @timeline;
            }
            .m-timeline .line-node .month-block .label-month {
                background-color: @timeline;
            }
        }
    }

    .alert-box {
        height: 100%;
        .note-box {
            margin-bottom: 35px;
            border-radius: 8px;
            background-color: white;
            width: 300px;
            font-size: 0;
            h5 {
                padding: 16px;
                margin: 0;
            }
            textarea {
                padding: 16px;
                resize: none;
                height: 240px;
                width: 100%;
            }
            p {
                font-size: 14px;
            }
            .add-tag {
                height: 45px;
                line-height: 44px;
                width: 190px;
                padding: 0 24px;
                background-color: @color-primary;
                color: white;
                border-radius: 25px;
            }
            .back-gray {
                background-color: #f5f5f5;
            }
        }
        .close-box {
            text-align: center;
            .icon {
                color: white;
                border: 1px solid white;
                border-radius: 50%;
                padding: 4px;
                font-size: 24px;
            }
        }
    }
}
</style>
