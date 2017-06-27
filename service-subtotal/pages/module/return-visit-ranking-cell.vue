<template>
    <div class="return-visit-ranking-cell" layout="row" layout-align="center center">
        <div layout="row" layout-align="center center" class="index-panel">
            <span>{{index}}</span>
            <m-icon xlink="#icon-TOP" class="dark-gray" v-if="index < 4"></m-icon>
        </div>
        <img :src="mData.employeeAvatarId | mSrc(require('assets/imgs/avatar.png'))" class="avatar">
        <div flex class="content">
            <span class="fs24 dark-gray">{{mData.code}}</span>
            <p class="extra-light-black">{{mData.employeeName}}</p>
        </div>
        <p class="steel-gray fs32">{{mData.total}}条</p>
        <m-icon xlink="#icon-right-bold" class="dark-gray"></m-icon>
        <span class="h-line"></span>
    </div>
</template>
<script>
import Vue from 'vue';

export default {
    name: 'return-visit-ranking-cell',
    props: ['mData', 'index'],
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
.return-visit-ranking-cell {
    @avatar_w_h: 40px;
    padding: @l24;
    position: relative;
    .index-panel {
        width: 30px;
        height: 30px;
        margin-right: @l24;
        .icon {
            position: absolute;
            font-size: 30px;
        }
        span {
            z-index: 2;
            position: relative;
        }
    }
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
        left: 0;
        position: absolute;
    }
}
</style>
