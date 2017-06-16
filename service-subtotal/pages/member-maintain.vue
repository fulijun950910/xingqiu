<template>
    <div layout="column" layout-align="start center" class="maintain" @click="$router.push({name:'service-record-list'})">
        <div class="maintain-box service background-contain" layout="column" layout-align="center center">
            <div class="icon-box">
            </div>
        </div>

        <div class="maintain-box member background-contain" layout="column" layout-align="center center">
            <div class="icon-box">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'member-maintain',
    components: {},
    data() {
        return {};
    },
    methods: {}
};
</script>
<style lang="less">
    @import '~styles/_agile.less';
    .maintain{
        height: 100vh;
        .maintain-box {
            margin-top: 8vh;
            width: 90vw;
            height: 38vh;
            border-radius: 15px;
            background-repeat: no-repeat;
            color: white;
            font-size: 20px;
            &.service {
                background-image: url(../assets/imgs/service.png);
            }
            &.member {
                background-image: url(../assets/imgs/member.png);
            }
        }
    }
</style>
