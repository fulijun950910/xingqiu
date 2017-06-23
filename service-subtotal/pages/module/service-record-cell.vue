<template>
    <div class="service-record-cell" layout="row" layout-align="center center">
        <img :src="require('assets/imgs/avatar.png')" class="avatar">
        <div flex class="content">
            <span class="fs24 dark-gray">No.321 张三丰</span>
            <p class="extra-light-black">美白基础护理</p>
        </div>
        <div>
            <p class="fs24 gray">今天</p>
            <p class="dark-gray">20:00</p>
        </div>
        <span class="h-line"></span>
    </div>
</template>
<script>
export default {
    name: 'service-record-cell',
    props: ['value'],
    data() {
        return {};
    },
    mounted() {},
    methods: {}
};
</script>
<style lang="less">
@import '~styles/_agile';
.service-record-cell {
    padding: @l32;
    position: relative;
    .avatar {
        width: 50 / 2px;
        height: 50 / 2px;
        border-radius: 50 / 2px;
    }
    .content {
        padding-left: @l32;
        padding-right: @l16;
    }
    .h-line {
        right: 0;
        bottom: 0;
        left: 24 + @l32*2;
        position: absolute;
    }
}
</style>
