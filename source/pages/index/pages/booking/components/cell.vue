<template>
    <div class="m-cell-panel"
         layout="row"
         layout-align="start center">
        <m-icon v-if="icon"
                class="fs28 dark-gray"
                :link="icon"></m-icon>
        <div class="extra-light-black mc-m-l">{{title}}</div>
        <slot></slot>
        <div class="extra-light-black text-right mc-nowrap"
             flex>
            <span v-if="subTitle"
                  class="color-black">{{subTitle}}</span>
            <span v-else>{{placeholder}}</span>
        </div>
        <slot name="foot">
            <m-icon class="fs20 dark-gray"
                    slot="right"
                    link="icon-right-bold"></m-icon>
        </slot>
    </div>
</template>
<script>
export default {
    name: 'm-cell',
    props: {
        title: String,
        subTitle: String,
        placeholder: String,
        icon: String
    },
    components: {},
    computed: {},
    data() {
        return {};
    },
    mounted() {},
    methods: {}
};
</script>
<style lang="less">
@import '~styles/_agile';
.m-cell-panel {
    height: 45px;
    border-bottom: 1px solid @light-gray; /*no*/
    font-size: 13px;
    .icon + .mc-m-l {
        margin-left: 16px;
    }
    .icon {
        margin-left: 2px;
    }
    .mc-nowrap {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
}
</style>
