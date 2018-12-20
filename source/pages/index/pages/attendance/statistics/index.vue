<template>
    <div class="statistics-panel">
        <div class="cp-header">
            <div class="cp-tab"
                 layout="row"
                 layout-align="center center">
                <div class="cp-item"
                     :class="{'cp-item-s': tabName == 'statistics-all'}"
                     @click="tabClick('statistics-all')">全部
                    <div class="cp-item-lien"></div>
                </div>
                <div class="cp-line"></div>
                <div class="cp-item"
                     :class="{'cp-item-s': tabName == 'statistics-my'}"
                     @click="tabClick('statistics-my')">我的
                    <div class="cp-item-lien"></div>
                </div>
            </div>
        </div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
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
    background: @color-bg;
    min-height: 100vh;
    .cp-header {
        top: 0;
        left: 0;
        right: 0;
        position: fixed;
        background-color: white;
        padding: 0 16px;
        z-index: 2;
    }
    .cp-item {
        width: 60px;
        color: @gray;
        font-size: 16px;
        line-height: 40px;
        text-align: center;
        position: relative;
        .cp-item-lien {
            left: 0;
            right: 0;
            bottom: 0;
            height: 3px;
            position: absolute;
            border-radius: 3px;
        }
        &-s {
            color: @color-primary;
            font-weight: bold;
        }
        &-s .cp-item-lien {
            background-color: @color-primary;
            box-shadow: 0px 2px 7px 0px rgba(164, 58, 142, 0.36);
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
