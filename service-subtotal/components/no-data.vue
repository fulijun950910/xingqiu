<template>
    <div v-if="visible" class="text-center no-datacon">
        <h3><m-icon class="no-data" :xlink="iconName"></m-icon></h3>
        <p>暂时没有记录哦！！</p>
        <a :click="back">返回上一页</a>
    </div>
</template>
<script>
export default {
    name: 'no-data',
    data() {
        return {
            iconName: '#icon-wujilu'
        };
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        back() {
            this.$router.go(-1);
        }
    }
};
</script>
<style lang="less">
@import '~styles/_agile';
.no-datacon {
    padding: @l40*5 0;
    p {
        color: @gray;
        font-size: @fs24;
        margin-bottom: @l16 * 3;
    }
    a {
        display: inline-block;
        padding: @l16 @l16 * 5;
        border-radius: @fs48;
        background: @color-tiffany-blue;
        color: @white;
    }
}

.no-data {
    font-size: @fs48 * 8;
    margin-bottom: @l40;
}
</style>
