<template>
    <div layout="row" layout-align="center center" class="fiexd-bottom">
        <a:flex="{{flex}}" @click="link" v-for="item in clickAble">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-left"></use>
            </svg>
            {{text}}
        </a>
    </div>
</template>
<script>
export default {
    name: '',
    data() {
        return {};
    },
    props: {
        clickAble: {
            type: Array,
            default: [{
                name: '返回',
                icon: 'icon-left'
            }, {
                name: '门店',
                icon: 'icon-fangzi-copy'
            }, {
                name: '时间',
                icon: 'icon-shijian'
            }, {
                name: '状态',
                icon: 'icon-caijitongji'
            }]
        },
        flex: {
            type: Number,
            default: 25
        }
    },
    methods: {
        link(evt) {
            this.$emit('click', evt);
        }
    }
};
</script>
<style lang="less">
@import '../styles/_agile';
.fiexd-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    .icon {
        color: @color-blue;
    }
}
</style>
