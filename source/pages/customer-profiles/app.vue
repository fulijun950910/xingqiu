<template>
    <transition :name="transitionName" mode="out-in">
        <keep-alive :exclude="excludeComp.join(',')">
            <router-view></router-view>
        </keep-alive>
    </transition>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {
            transitionName: 'slide-right',
            excludeComp: ['customer-detail']
        };
    },
    watch: {
        '$route'(to, from) {
            const toLevel = to.meta.level;
            const fromLevel = from.meta.level;
            if (fromLevel < toLevel) {
                this.transitionName = 'slide-left';
            } else {
                this.transitionName = 'slide-right';
            }
        }
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        handleResize() {
            var w = document.documentElement.clientWidth;
            document.getElementsByTagName('html')[0].style['font-size'] = Math.min((w / 10).toFixed(1), 1080 / 10) + 'px';
        }
    }
};
</script>

<style lang="less">
    .loading {
        padding: 16px 0;
        text-align: center;
    }
</style>
