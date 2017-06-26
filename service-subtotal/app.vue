<template>
    <transition :name="transitionName" mode="out-in">
        <router-view></router-view>
    </transition>
</template>
<script>
export default {
    name: 'app',
    data() {
        return {
            transitionName: 'slide-right'
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
            document.getElementsByTagName('html')[0].style['font-size'] = Math.min((w / 10).toFixed(1), 540 / 10) + 'px';
        }
    }
};
</script>
