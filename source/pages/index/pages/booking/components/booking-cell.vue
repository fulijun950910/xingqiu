<template>
    <div class="bc-cell-panel"
         :class="[`bc-status-${value.holderStatus}`]">
        <div class="cc-head">
            <div layout="row"
                 layout-align="space-between center">
                <div>{{value.startTime | amDateFormat('HH:mm')}}-{{value.endTime | amDateFormat('HH:mm')}}</div>
                <div>
                    <span>{{value.employeeName}}</span>
                    <span v-if="value.employeeName && value.roomName">●</span>
                    <span class="fs13">{{value.roomName}}</span>
                </div>
            </div>
            <div class="no-wrap">
                <span v-for="(item, index) in value.items"
                      :key="index">
                    <span v-if="index">、</span>{{item.name}}
                </span>
            </div>
        </div>
        <div layout="row"
             layout-align="start center"
             class="cc-cont">
            <div class="bc-avatar m-r-2">
                <img :src="value.avatarId | mSrc(80, 80, require('assets/imgs/avatar.png'))">
            </div>
            <div flex>
                <div>
                    <span class="m-r-2">{{value.name}}</span>
                    <span class="fs24 color-gray">{{value.phone}}</span>
                </div>
                <div class="fs24 color-gray">{{value.information}}</div>
            </div>
            <div class="bc-edit-btn"
                 @click="editing = !editing"
                 v-if="tools && tools.length">
                <m-icon class="fs28 color-black"
                        xlink="#icon-bianji"></m-icon>
            </div>
        </div>
        <div class="bc-modal"
             @click.self="editing = false"
             v-show="editing">
            <div class="bc-tools-panel"
                 layout="row"
                 layout-align="space-between center">
                <div v-for="(item, index) in tools"
                     :key="index"
                     class="bct-item"
                     @click="toolClick(item)">
                    <div>{{item.label}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'm-booking-cell',
    props: {
        value: {
            type: Object,
            default() {
                return {};
            }
        },
        loading: Boolean
    },
    components: {},
    computed: {
        tools() {
            switch (this.value.holderStatus) {
                case '1':
                    return [{ label: '取消预约', value: 1 }, { label: '修改', value: 2 }, { label: '确认', value: 3 }];
                case '2':
                    return [{ label: '取消预约', value: 1 }, { label: '修改', value: 2 }];
            }
        }
    },
    data() {
        return {
            editing: false
        };
    },
    mounted() {},
    methods: {
        toolClick(item) {
            this.editing = false;
            this.$emit('toolClick', {
                index: item.value,
                value: this.value
            });
        }
    }
};
</script>
<style lang="less">
@import '~styles/_agile';
@status-0: #ea9d6f;
@status-1: #74c5cf;
@status-2: #888888;
@border-radius: 4px;

.bc-cell-panel {
    padding-bottom: 16px;
    position: relative;
    .cc-head {
        border-top-left-radius: @border-radius;
        border-top-right-radius: @border-radius;
        padding: 6px 14px;
        font-size: @fs24;
        color: white;
    }
    .cc-cont {
        background-color: white;
        padding: 16px;
        border-bottom-left-radius: @border-radius;
        border-bottom-right-radius: @border-radius;
    }
    .bc-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
        }
    }

    &.bc-status- {
        &1 {
            .cc-head {
                background-color: @status-0;
            }
        }
        &2 .cc-head {
            background-color: @status-1;
        }
        &4,
        &5 {
            .cc-head {
                background-color: @status-2;
            }
        }
    }
    .bc-edit-btn {
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        position: relative;
        z-index: 1;
        background: white;
        border-radius: 50%;
        margin-right: -8px;
    }
    .bc-modal {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 16px;
        background-color: rgba(0, 0, 0, 0.34);
        border-radius: @border-radius;
    }
    .bc-tools-panel {
        background-color: white;
        box-shadow: 0px 4px 13px 0px rgba(0, 0, 0, 0.22);
        padding: 10px 16px;
        position: absolute;
        right: 60px;
        bottom: 16px;
        border-radius: 2px;
    }
    .bct-item {
        line-height: 40px;
        padding: 0 10px;
        color: @extra-light-black;
    }
}
</style>
