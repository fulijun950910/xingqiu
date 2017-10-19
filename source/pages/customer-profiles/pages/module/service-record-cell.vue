<template>
    <div class="service-record-cell" layout="row" layout-align="center center">
        <img :src="mData.memberAvatarId | mSrc(40, 40, require('assets/imgs/avatar.png'))" class="avatar">
        <div flex class="content">
            <span class="fs24 dark-gray">No.{{mData.employeeNo}} {{mData.employeeName}}</span>
            <p class="extra-light-black" v-if="mData.serviceSmallNote && mData.serviceSmallNote.item">{{mData.serviceSmallNote.item | getNames('itemName')}}</p>
            <p v-else>无项目</p>
        </div>
        <div>
            <!-- <p class="fs24 gray">{{mData.createTime | fromnow}}</p> -->
            <p class="dark-gray">{{mData.createTime | amCalendar}}</p>
        </div>
        <span class="h-line"></span>
    </div>
</template>
<script>
import Vue from 'vue';

export default {
    name: 'service-record-cell',
    props: ['mData'],
    data() {
        return {};
    },
    mounted() {},
    methods: {},
    filters: {
        getNames(value, key) {
            if (Vue.prototype.$knife.isArray(value)) {
                var temp = [];
                for (var i = 0, len = value.length; i < len; i++) {
                    temp.push(value[i][key]);
                }
                return temp.toString();
            }
        }
    }
};
</script>
<style lang="less">
@import '~styles/_agile';
.service-record-cell {
    @avatar_w_h: 40px;
    padding: @l24;
    position: relative;
    .avatar {
        width: @avatar_w_h;
        height: @avatar_w_h;
        border-radius: @avatar_w_h;
    }
    .content {
        padding-left: @l24;
        padding-right: @l16;
    }
    .h-line {
        right: 0;
        bottom: 0;
        left: @avatar_w_h + @l24*2;
        position: absolute;
    }
}
</style>
