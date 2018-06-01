<template>
    <div class="integral-confirm" ng-if="confirmText.show">
        <div class="integral-confirm-con">
        <div class="text fs28 color-black text-center" layout="row" layout-align="center center">{{confirmText.main}}</div>
        <div class="button-con" layout="row" layout-align="start center">
            <div flex="50" class="text-center quite fs34 color-gray" @click="confirmClick(1)" layout="row" layout-align="center center">{{confirmText.quiet}}</div>
            <div flex="50" class="text-center confirm fs34" layout="row" @click="confirmClick(2)" layout-align="center center">{{confirmText.confirm}}</div>
        </div>
        </div>
    </div>
</template>

<script>
import Q from 'q';
export default {
    props: {
        confirmText: {
            type: Object,
            default: function() {
                return {
                    main: '确认执行此操作？',
                    confirm: '确定',
                    quiet: '取消',
                    show: false
                };
            }
        }
    },
    methods: {
        confirmFun(type) {
            var deferred = Q.defer();
            if (type == 1) {
                // 取消
                deferred.reject();
            } else if (type == 2) {
                deferred.resolve();
            };
            return deferred.promise;
        },
        confirmClick(type) {
            this.$emit('integraConfirm', this.confirmFun(type));
        }
    }
};
</script>



<style lang="less" scoped>
@import '~styles/_style';
.integral-confirm{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: rgba(0,0,0,.5);
    z-index: 10;
    .integral-confirm-con{
        position: absolute;
        width: 280px;
        height: 150px;
        left: 50%;
        top: 50%;
        margin-left: -140px;
        margin-top: -75px;
        background: white;
        border-radius: 14px;
        overflow: hidden;
        .text{
            height: 100px;
            padding: 15px;
        }
        .button-con{
            height: 50px;
            border: 1px solid @border-gay;
            div{
                height: 100%;
            }
            .quite{
                border-right: 1px solid @border-gay;
            }
            .confirm{
                color: #EC3F6D;
            }
        }
    }
}
</style>

