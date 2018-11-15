<template>
    <div class="qrconfirm-panel">
        <div class="logo">
            <img :src="require('assets/imgs/index/logo.png')"
                 alt="">
            <div class="fs32">
                美问云系统
            </div>
        </div>
        <div class="q-info">
            <div class="m-b-2">角色：<span class="extra-black">{{$store.getters.employeeName}} - {{$store.getters.storeName}}</span></div>
            <div>商户：<span class="extra-black">{{$store.getters.merchantName}}</span></div>
        </div>
        <div v-if="type == 1">
            <div class="q-head">
            </div>
            <div>
                <mt-button size="large"
                           class="m-b-4 p-btn"
                           type="primary"
                           @click="submint">确认登录</mt-button>
                <mt-button size="large"
                           type="default"
                           @click="back">取消</mt-button>
            </div>
        </div>
        <div v-else>
            <div class="q-head color-success m-t-4">
                登录成功
            </div>
            <mt-button size="large"
                       type="default"
                       @click="back">返回</mt-button>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { Button } from 'mint-ui';
import apiSignin from '@/services/api.signIn';
Vue.component(Button.name, Button);

export default {
    name: 'qrconfirm',
    mixins: [],
    props: {},
    components: {},
    computed: {},
    data() {
        return {
            type: 1
        };
    },
    mounted() {
        if (!this.$store.getters.employeeName) {
            window.location.href = this.$signLocation;
        }
    },
    methods: {
        submint() {
            this.$indicator.open();
            apiSignin.qrAuthUser(this.$route.query.token, this.$store.getters.employeeId).then(
                res => {
                    this.$indicator.close();
                    if (res.data.status === 3) {
                        this.type = 2;
                        try {
                            window.WeixinJSBridge.call('closeWindow');
                        } catch (error) {}
                    } else {
                        this.$toast('二维码已失效，请重新生成并扫码');
                    }
                },
                err => {
                    this.$toast('二维码已失效，请重新生成并扫码');
                }
            );
        },
        back() {
            this.$indicator.close();
            try {
                window.WeixinJSBridge.call('closeWindow');
            } catch (error) {
                this.$router.replace({
                    name: 'main'
                });
            }
        }
    }
};
</script>
<style lang="less" scoped>
@import '~styles/_agile';
.qrconfirm-panel {
    min-height: 100vh;
    padding: 0 16px 16px 16px;
    .q-head {
        text-align: center;
        font-size: 16px;
        margin-bottom: 20px;
    }
    .logo {
        text-align: center;
        padding: 6vh;
        img {
            width: 60px;
        }
    }
    .p-btn {
        background-color: @color-primary;
    }
    .color-success {
        color: @color-success;
    }
    .q-info {
        border-top: 1px solid @border-gay; /*no*/
        padding-top: 16px;
        padding-left: 16px;
        font-size: 13px;
        color: @extra-light-black;
    }
}
</style>
