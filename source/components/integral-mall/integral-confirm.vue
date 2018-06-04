<template>
    <div class="integral-confirm" v-if="confirmText.show">
        <div class="mask" @click="hide"></div>
        <div class="integral-confirm-con">
        <div class="text fs28 color-black text-center" layout="column" layout-align="center center">
            <p v-if="confirmText.message" class="fwb">{{confirmText.message}}</p>
        <p v-if="confirmText.text">{{confirmText.text}}</p>            
            </div>
        <div class="button-con" layout="row" layout-align="start center">
            <div flex="50" v-if="confirmText.quiet" class="text-center quite fs34 color-gray" @click="confirmClick(1)" layout="row" layout-align="center center">{{confirmText.quiet}}</div>
            <div :flex="confirmText.quiet ? 50 : 100" class="text-center confirm fs34" layout="row" @click="confirmClick(2)" layout-align="center center">{{confirmText.confirm}}</div>
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
                    data: {
                        // message: '确认执行此操作？',
                        // confirm: '确定',
                        // quiet: '取消',
                        show: false
                    }
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
        },
        hide() {
            this.$emit('hideConfirm');
        }
    }
};
</script>



<style lang="less" scoped>
@import '~styles/_style';
.integral-confirm{
    position: fixed;
    z-index: 10;
        left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    .mask{
    background: rgba(0,0,0,.5);
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    }
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

