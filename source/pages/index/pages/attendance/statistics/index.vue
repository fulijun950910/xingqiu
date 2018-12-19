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
    background: linear-gradient(91deg, #fafafa00 0%, #faf0ee 100%), linear-gradient(287deg, #ffffff00 0%, #e7f1f9 100%);
    min-height: 100vh;
    .cp-header {
        background-color: white;
        padding: 0 16px 20px 16px;
    }
    .cp-item {
        font-size: 16px;
        width: 60px;
        text-align: center;
        line-height: 40px;
        color: @gray;
        position: relative;
        .cp-item-lien {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 3px;
            border-radius: 3px;
        }
        &-s {
            color: @color-primary;
        }
        &-s .cp-item-lien {
            background: linear-gradient(162deg, @color-primary 0%, #7d2072 100%);
            box-shadow: 0px 1px 4px 0px #a63a905c;
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
