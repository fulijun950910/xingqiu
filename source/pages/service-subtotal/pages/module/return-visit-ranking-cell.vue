<template>
    <div class="return-visit-ranking-cell" layout="row" layout-align="center center" @click="cellClick">
        <div layout="row" layout-align="center center" class="index-panel" :class="[`icon-${this.index}`]">
            <span>{{index}}</span>
            <m-icon xlink="#icon-medal" v-if="index < 4"></m-icon>
        </div>
        <img :src="mData.employeeAvatarId | mSrc(80, 80, require('assets/imgs/avatar.png'))" class="avatar">
        <div flex class="content">
            <span class="fs24 dark-gray">No.{{mData.code}}</span>
            <p class="extra-light-black">{{mData.employeeName}}</p>
        </div>
        <p class="steel-gray fs32">{{mData.total}}条</p>
        <m-icon xlink="#icon-right-bold" class="dark-gray" v-if="mode != 'none'"></m-icon>
        <span v-else class="arr"></span>
        <span class="h-line"></span>
    </div>
</template>
<script>
import Vue from 'vue';

export default {
    name: 'return-visit-ranking-cell',
    props: ['mData', 'index', 'mode'],
    data() {
        return {};
    },
    mounted() {},
    methods: {
        cellClick() {
            if (this.mode == 'none') {
                return;
            }
            this.$emit('cellClick', this.mData);
        }
    },
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
        position: relative;
        .icon {
            position: absolute;
            font-size: 30px;
            left: 0;
        }
        span {
            z-index: 2;
            position: relative;
            padding-bottom: 2px;
        }
    }
    .icon- {
        &1 {
            color: @white;
            .icon {
                color: #FC5D51;
            }
        }
        &2 {
            color: @white;
            .icon {
                color: #F6A623;
            }
        }
        &3 {
            color: @white;
            .icon {
                color: #D0D0D0;
            }
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
    .arr {
        width: @fs28;
    }
}
</style>
