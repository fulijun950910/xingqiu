<template>
    <div class="change-psw" v-title="'修改密码'">
        <div class="title fs40 fwb">修改密码</div>
        <div class="form-list">
            <div class="form-item">
                <mt-field label="原密码" type="password" placeholder="请输入原密码" v-model="origin.originPassword"></mt-field>
            </div>
             <div class="form-item">
                <mt-field label="新密码" type="password" placeholder="请输入新密码" v-model="newpsw.newPassword"></mt-field>
            </div>
             <div class="form-item">
                <mt-field label="确认密码" type="password" placeholder="请再次输入" v-model="confirm.confirmPassword"></mt-field>
            </div>
        </div>

        <div class="submit color-pink fs40" layout="row" @click="changePassword" layout-align="center center">确认修改</div>
    </div>
</template>
<script>
import Vue from 'vue';
import { Field, Toast } from 'mint-ui';
import api_party from 'services/api.party';
Vue.component(Field.name, Field);
export default {
    data() {
        return {
            origin: {
                originPassword: '',
                state: ''
            },
            newpsw: {
                newPassword: '',
                state: ''
            },
            confirm: {
                confirmPassword: '',
                state: ''
            },
            dataModel: {}
        };
    },
    methods: {
        checkLogin() {
            if (this.$store.state.employeeData) {
                this.dataModel = this.$store.state.employeeData;
            } else {
                this.$router.back();
            }
        },
        changePassword() {
            if (!this.origin.originPassword) {
                Toast('请输入原密码');
                return;
            };
            if (!this.newpsw.newPassword) {
                Toast('请输入新密码');
                return;
            };
            if (this.confirm.confirmPassword != this.newpsw.newPassword) {
                Toast('两次密码输入不一致');
                return;
            };
            let data = {
                newPassword: this.newpsw.newPassword,
                oldPassword: this.origin.originPassword,
                userId: this.dataModel.userId
            };
            this.$indicator.open();
            api_party.newPassword(data).then(res => {
                this.$toast('密码修改成功');
                this.$indicator.close();
                this.$router.back();
            });
        }
    },
    mounted() {
        this.checkLogin();
    }
};
</script>
<style lang="less" scoped>
@import '~styles/_style';
.change-psw{
    position: relative;
    height: 100%;
    width: 100%;
    padding: 0 15px;
    .title{
        padding: 30px 0;
    }
    .submit{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50px;
        border-top: 1px solid @border-gay;
    }
    .form-item{
        a{
            color: @color-black;
        }
    }

}
</style>
