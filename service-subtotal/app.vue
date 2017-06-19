<template>
    <transition name="slide-fade" mode="out-in">
        <router-view></router-view>
    </transition>
</template>
<script>
export default {
    name: 'app',
    data() {
        return {};
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
