<template>
    <div class="b2b-mall-nav-bar">
        <div class="bar-padding"></div>
        <div class="nav-bar" layout="row" layout-align="center center">
            <div @click="goIndex" :class="{'act': type==1}" flex class="text-center tab-item">
                <m-icon class="icon" xlink="icon-mendianguanli"></m-icon>
                <div>店铺</div>
            </div>
            <div @click="goUser" :class="{'act': type==2}" flex class="text-center tab-item">
                <m-icon class="icon" xlink="icon-xingming"></m-icon>
                <div>我的</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'nav-bar',
    data() {
        return {};
    },
    props: {
        type: {
            type: String,
            default: '1'
        }
    },
    mounted() {
    },
    methods: {
        goIndex() {
            this.$router.replace({
                name: 'b2b-mall-index'
            });
        },
        goUser() {
            this.$router.replace({
                name: 'b2b-mall-user'
            });
        }

    }
};
</script>

<style scoped lang='less'>
@import '~styles/_agile';
.b2b-mall-nav-bar{
    .bar-padding{
        height:50px;
    }
    .nav-bar{
        width:100%;
        height: 50px;
        background: @white;
        position:fixed;
        bottom:0;
        left:0;
        border: 1px solid @border-gay;
        .tab-item{
            color:@extra-light-black;
            font-size: 12px;
            .icon {
                font-size: 22px;
            }
            &.act {
                color: @color-primary;
            }
        }
    }
}
</style>
