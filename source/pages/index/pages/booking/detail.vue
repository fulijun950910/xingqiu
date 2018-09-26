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
                        <div class="bd-avatar">
                            <img :src="booking.avatarId | mSrc(80, 80, require('assets/imgs/avatar.png'))">
                        </div>
                        <div>
                            <div class="color-black">{{booking.name}}</div>
                            <div class="color-gray">{{booking.phone}}</div>
                        </div>
                    </div>
                    <div class="bd-status">待确认</div>
                </div>
                <div class="bd-content">
                    <div class="fs30">
                        <span v-for="(item, index) in booking.items"
                              :key="index">
                            <span v-if="index">、</span>{{item.name}}
                        </span>
                    </div>
                    <div class="fs30">{{booking.startTime | amDateFormat('HH:mm')}}-{{booking.endTime | amDateFormat('HH:mm')}}</div>
                    <div class="extra-light-black fs28">
                        <span>{{booking.employeeName}}</span>
                        <span v-if="booking.employeeName && booking.roomName">●</span>
                        <span>{{booking.roomName}}</span>
                    </div>
                    <div class="color-gray bd-fs13">上次到店：2个月前</div>
                </div>
                <div class="bd-line"></div>
                <div class="bd-footer">
                    <div class="m-b-2">备注：</div>
                    <div class="extra-light-black fs24">{{booking.information || '无'}}</div>
                </div>
                <div layout="row"
                     class="bd-tools-panel">
                    <div flex>取消预约</div>
                    <div flex>修改</div>
                    <div flex>确认</div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import Popup from 'mint-ui/src/utils/popup';

export default {
    name: 'booking-detail',
    mixins: [Popup],
    props: {
        modal: {
            default: true
        }
    },
    components: {},
    computed: {},
    data() {
        return {
            booking: {}
        };
    },
    mounted() {},
    methods: {
        show(item) {
            this.booking = item;
            this.value = true;
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
        div + div {
            border-left: 1px solid @light-gray; /*no*/
        }
    }
    .bd-status {
        line-height: 35px;
        padding: 0 16px;
        border-top-left-radius: 50px;
        border-bottom-left-radius: 50px;
        margin-right: -@padding-def;
        background-color: @status-0;
        color: white;
    }
    .bd-fs13 {
        font-size: 13px;
    }
}
</style>
