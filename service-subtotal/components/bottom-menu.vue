<template>
    <div layout="row" layout-align="center center" class="fixed-bottom">
        <a @click="link(index, item)" v-for="(item, index) in clickAble" :flex="flex" layout="row" layout-align="center center" class="text-center">
            <svg class="icon" aria-hidden="true">
                <use :xlink:href="item.icon"></use>
            </svg>
            {{item.name}}
        </a>
    </div>
</template>
<script>
export default {
    name: 'bottom-menu',
    data() {
        return {};
    },
    props: {
        clickAble: {
            type: Array,
            default() {
                return [{
                    name: '返回',
                    icon: '#icon-left-bold'
                }, {
                    name: '门店',
                    icon: '#icon-fangzi-copy'
                }, {
                    name: '时间',
                    icon: '#icon-shijian'
                }, {
                    name: '状态',
                    icon: '#icon-caijitongji'
                }];
            }
        },
        flex: {
            type: Number,
            default: 25
        }
    },
    methods: {
        link(index, item) {
            this.$emit('click', index, item);
        }
    }
};
</script>
<style lang="less">
@import '~styles/_agile';
.fixed-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: @color-bg;
    z-index: 1;
    .icon {
        margin-right: @l8;
    }
    a {
        height: 49px;
        color: @color-tiffany-blue;
        border-right: 1px solid @light-gray;
        font-size: @fs16 * 2;
    }
    a:last-child {
        border-right: none;
    }
    .icon {
        color: @color-tiffany-blue;
        font-size: @fs36;
    }
}
</style>
