<template>
    <div class="mint-msgbox-wrapper">
        <transition name="msgbox-bounce">
            <div class="mint-msgbox"
                 v-show="value">
                <div class="mbox-head">
                    <div class="img-panel">
                        <img :src="headSrc"
                             alt="">
                    </div>
                    <div class="text-center m-b-20">{{message}}</div>
                </div>
                <div layout="row"
                     class="mbox-foot">
                    <div flex
                         class="text-center mbox-b-r fs30"
                         @click="handleAction('cancel')">{{cancelTitle}}</div>
                    <div flex
                         class="text-center color-primary fs30"
                         @click="handleAction('confirm')">
                        {{confirmTitle}}
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import Popup from 'mint-ui/src/utils/popup';
export default {
    name: 'm-confirm',
    mixins: [Popup],
    props: {
        modal: {
            default: true
        }
    },
    components: {},
    computed: {},
    data() {
        return {
            callback: null,
            message: '',
            headSrc: null,
            cancelTitle: '',
            confirmTitle: ''
        };
    },
    mounted() {},
    methods: {
        handleAction(action) {
            this.value = false;
            if (this.callback) {
                this.callback(action);
            }
        }
    }
};
</script>
<style lang="less">
@import '~styles/_agile';
.mint-msgbox {
    width: 70%;
    .mbox-head {
        .img-panel {
            width: 100px;
            margin: 20px auto;
        }
        img {
            text-align: center;
        }
    }
    .m-b-20 {
        margin-bottom: 20px;
    }
    .mbox-foot {
        line-height: 50px;
        border-top: 1px solid @light-gray;
    }
    .mbox-b-r {
        border-right: 1px solid @light-gray;
    }
}
</style>
