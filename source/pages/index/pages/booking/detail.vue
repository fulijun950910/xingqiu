<template>
    <div class="mint-msgbox-wrapper booking-detail-panel">
        <transition name="msgbox-bounce">
            <div class="mint-msgbox"
                 v-show="value">
                <div layout="row"
                     layout-align="space-between center"
                     class="bd-header">
                    <div layout="row"
                         layout-align="space-between center">
                        <div class="bd-avatar"
                             @click.stop="$emit('customerDetail', booking)">
                            <img :src="booking.avatarId | mSrc(80, 80, require('assets/imgs/avatar.png'))">
                        </div>
                        <div>
                            <div class="color-black">{{booking.name}}</div>
                            <div class="color-gray">{{booking.phone}}</div>
                        </div>
                    </div>
                    <div class="bd-status"
                         :class="[`bd-status-${booking.holderStatus}`]">{{booking.holderStatus | getName(BOOKING_STATUS)}}</div>
                </div>
                <div class="bd-content">
                    <div v-for="(emp, index) in booking.employees"
                         :key="index"
                         class="p-b-1">
                        <div class="fs30">
                            <span v-for="(item, index) in emp.items"
                                :key="index">
                                <span v-if="index">、</span>{{item.name}}
                            </span>
                        </div>
                        <div class="fs30">{{emp.startTime | amDateFormat('HH:mm')}}-{{emp.endTime | amDateFormat('HH:mm')}}</div>
                        <div class="extra-light-black fs28">
                            <span>{{emp.name}}</span>
                            <span v-if="emp.name && emp.roomName">●</span>
                            <span>{{emp.roomName}}</span>
                        </div>
                        <div class="color-gray bd-fs13"
                            v-if="lastConsumeDetail && lastConsumeDetail.orderDate">上次到店:
                            <span v-for="(item, index) in lastConsumeDetail.name"
                                :key="index">
                                {{item}}
                            </span>
                            <span>{{lastConsumeDetail.orderDate | fromnow}}</span>
                        </div>
                    </div>
                </div>
                <div class="bd-line"></div>
                <div class="bd-footer">
                    <div class="m-b-2">备注：</div>
                    <div class="extra-light-black fs24">{{booking.information || '无'}}</div>
                </div>
                <div layout="row"
                     class="bd-tools-panel">
                    <div flex
                         v-show="booking.holderStatus == 1 || booking.holderStatus == 2"
                         v-if="bookingManage"
                         @click="handleAction(1)">取消预约</div>
                    <div flex
                         v-show="booking.holderStatus == 1 || booking.holderStatus == 2"
                         v-if="bookingManage"
                         @click="handleAction(2)">修改</div>
                    <div flex
                         class="color-primary"
                         v-show="booking.holderStatus == 1"
                         v-if="bookingManage"
                         @click="handleAction(3)">确认</div>
                </div>
                <div class="bd-close"
                     @click="hidden">
                    <m-icon link="icon-close"></m-icon>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import Popup from 'mint-ui/src/utils/popup';
import { BOOKING_STATUS } from 'config/mixins';
import apiBooking from '@/services/api.booking';
export default {
    name: 'booking-detail',
    mixins: [Popup],
    props: {
        modal: {
            default: true
        }
    },
    components: {},
    computed: {
        bookingManage() {
            return this.$store.getters.bookingManage || this.booking.employeeId === this.$store.getters.employeeId;
        }
    },
    data() {
        return {
            booking: {},
            BOOKING_STATUS,
            lastConsumeDetail: {}
        };
    },
    mounted() {},
    methods: {
        loadData() {
            this.lastConsumeDetail = {};
            if (this.booking && this.booking.memberId) {
                apiBooking.memberLastConsume(this.booking.memberId).then(res => {
                    this.lastConsumeDetail = res.data.lastConsumeDetail || { name: [] };
                });
            }
        },
        show(item) {
            this.$emit('input', true);
            this.booking = item;
            this.$store.commit('bookingSetData', item);
            this.loadData();
        },
        hidden() {
            this.$store.commit('bookingSetData', null);
            this.$emit('input', false);
        },
        handleAction(index) {
            this.$emit('toolsClick', {
                value: this.booking,
                index
            });
            this.hidden();
        }
    }
};
</script>
<style lang="less">
@import '~@/styles/_agile';
@status-0: #ea9d6f;
@status-1: #74c5cf;
@status-2: #888888;
@padding-def: 25px;

.booking-detail-panel {
    .mint-msgbox {
        width: 82%;
        font-size: 14px;
        overflow: visible;
    }
    .bd-header {
        padding: @padding-def;
        .bd-avatar {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 8px;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    .bd-content {
        padding: 10px @padding-def 20px @padding-def;
    }
    .bd-line {
        height: 1px; /*no*/
        background-color: @light-gray;
        margin-left: @padding-def;
        margin-right: @padding-def;
    }
    .bd-footer {
        padding: 20px @padding-def 40px @padding-def;
    }
    .bd-tools-panel {
        font-size: 15px;
        line-height: 60px;
        text-align: center;
        border-top: 1px solid @light-gray; /*no*/
        color: @extra-light-black;
        div + div {
            border-left: 1px solid @light-gray; /*no*/
        }
    }
    .bd-close {
        position: absolute;
        height: 30px;
        width: 30px;
        border-radius: 50%;
        border: 2px solid white; /*no*/
        top: -50px;
        right: 10px;
        text-align: center;
        line-height: 28px;
        color: white;
        .icon {
            font-size: 16px;
        }
    }
    .bd-status {
        line-height: 35px;
        padding: 0 16px;
        border-top-left-radius: 50px;
        border-bottom-left-radius: 50px;
        margin-right: -@padding-def;
        color: white;
        &-1 {
            background: @status-0;
        }
        &-2 {
            background: @status-1;
        }
        &-4,
        &-5 {
            background: @status-2;
        }
    }
    .bd-fs13 {
        font-size: 13px;
    }
}
</style>
