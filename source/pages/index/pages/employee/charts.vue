<template>
    <div class="">
        123
        <m-icon xlink="#icon-yuyuedingdan"></m-icon>
        <div class="cs" layout="row" layout-align="space-around start">
            <div>12</div>
            <div>33</div>
            <div>55、5</div>
            <!-- <img :src="require('assets/imgs/avatar.png')"
                 alt=""> -->
        </div>
    </div>
</template>
<script>
export default {
    name: 'employee-charts',
    mixins: [],
    props: {},
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
@import '~@/styles/_agile';
.cs {
    background: url('~assets/imgs/avatar.png') no-repeat center;
}
</style>
