<template>
    <div class="statistics-panel">
        <div class="cp-header">
            <div class="cp-tab"
                 layout="row"
                 layout-align="center center">
                <div class="cp-item"
                     :class="{'cp-item-s': tabName == 'statistics-all'}"
                     @click="tabClick('statistics-all')">全部</div>
                <div class="cp-line"></div>
                <div class="cp-item"
                     :class="{'cp-item-s': tabName == 'statistics-my'}"
                     @click="tabClick('statistics-my')">我的</div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: 'statistics',
    mixins: [],
    props: {},
    components: {},
    computed: {},
    data() {
        return {
            tabName: this.$route.name
        };
    },
    mounted() {},
    methods: {
        tabClick(name) {
            this.tabName = name;
            this.$router.replace({ name });
        }
    }
};
</script>
<style lang="less">
@import '~@/styles/_agile';
.statistics-panel {
    background: #d6e7fb linear-gradient(91deg, #fafafa00 0%, #faf0ee 100%);
    min-height: 100vh;
    .cp-header {
        background-color: white;
        padding: 0 16px 20px 16px;
    }
    .cp-item {
        font-size: 16px;
        width: 60px;
        border-bottom: 3px solid;
        border-bottom-style: solid;
        text-align: center;
        line-height: 40px;
        color: @gray;
        border-bottom-color: transparent;
        &-s {
            color: @color-primary;
            border-bottom-color: @color-primary;
        }
    }
    .cp-line {
        width: 1px; /*no*/
        margin: 0 20px;
        background-color: @dark-gray;
        height: 22px;
    }
}
</style>
