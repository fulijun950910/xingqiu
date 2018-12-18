<template>
    <div class="">
        <div class="cp-content">
            <div class="cp-card">
                <div>考勤人数80人</div>
                <div v-for="(item, index) in 5"
                     :key="index">
                    <span>迟到人数</span>
                    <span>20</span>
                    <m-icon link="icon-weibiaoti34"></m-icon>
                </div>
            </div>
            <div class="cp-card">
                <div>考勤人数占比</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: '',
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
</style>
