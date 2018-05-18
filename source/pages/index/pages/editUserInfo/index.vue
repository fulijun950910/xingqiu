<template>
    <div class="editUser" v-title="'修改个人信息'">
        <div class="cell">
            <div v-if="type == 1" class="textCell cell cell-box" layout="row" layout-align="start stretch">
                <div class="">用户名&emsp;</div>
                <input flex maxLength="30" type="text" v-model="dataModel.name" placeholder="请输入用户姓名"/>
            </div>
            <div @click="slectView(1)" v-else-if="type == 2" class="textCell cell cell-box" layout="row" layout-align="start stretch">
                <div class="">性别&emsp;</div>
                <div flex class="color-gray">{{dataModel.gender | getName(GENDERS)}}</div>
            </div>
            <div v-else-if="type == 3" class="textCell cell cell-box" layout="row" layout-align="start stretch">
                <div class="">生日&emsp;</div>
                <input flex type="date" v-model="dataModel.birthday" placeholder="请输入生日"/>
            </div>
            <div v-else-if="type == 4" class="textCell cell cell-box" layout="row" layout-align="start stretch">
                <div class="">地址&emsp;</div>
                <input flex type="text" v-model="dataModel.address" placeholder="请输入地址"/>
            </div>
            <div v-else-if="type == 5" class="textCell cell cell-box" layout="row" layout-align="start stretch">
                <div class="">签名&emsp;</div>
                <input flex type="text" v-model="dataModel.description" placeholder="请输入签名"/>
            </div>
            <div v-if="type == 6" class="textCell cell cell-box" layout="row" layout-align="start stretch">
                <div class="">原密码&emsp;</div>
                <input flex type="password" v-model="dataModel.oldPassword" placeholder="原密码"/>
            </div>
            <div v-if="type == 6" class="textCell cell cell-box" layout="row" layout-align="start stretch">
                <div class="">新密码&emsp;</div>
                <input flex type="password" v-model="dataModel.newPassword" placeholder="新密码"/>
            </div>
            <div v-if="type == 6" class="textCell cell cell-box" layout="row" layout-align="start stretch">
                <div class="">确认密码&emsp;</div>
                <input flex type="password" v-model="dataModel.checkPassword" placeholder="确认密码"/>
            </div>
        </div>

        <div>
            <button @click="submit" class="fs32 sub-btn">确认修改</button>
        </div>
        <popup-right v-model="showView">
            <popup-right-list v-if="selectIndex==1"  :options="GENDERS"  title="选择您的性别" v-model="dataModel.gender"></popup-right-list>
        </popup-right>
    </div>
</template>

<script>
    import popupRight from 'components/popup-right';
    import popupRightList from 'components/popup-right-list';
    import api_party from 'services/api.party';
    import {
        GENDERS
    } from 'config/mixins';

    export default {
        name: 'editUserInfo',
        props: ['type'],
        components: {
            'popup-right': popupRight,
            'popup-right-list': popupRightList
        },
        data() {
            return {
                dataModel: {},
                selectIndex: 1,
                GENDERS: GENDERS,
                showView: false
            };
        },
        mounted() {
            if (this.$store.state.employeeData) {
                this.dataModel = this.$store.state.employeeData;
            } else {
                this.$router.back();
            }
        },
        methods: {
            submit() {
                if (this.check()) {
                    return;
                }
                if (this.type == 6) {
                    this.changePass();
                } else {
                    this.changeEmpData();
                }
            },
            check() {
                let flag = false;
                switch (this.type) {
                    case 1:
                        if (!this.dataModel.name) {
                            flag = true;
                            this.$toast('请输入用户名');
                        }
                        break;
                    case 2:
                        if (!this.dataModel.gender) {
                            flag = true;
                            this.$toast('请输入性别');
                        }
                        break;
                    case 3:
                        if (!this.dataModel.birthday) {
                            flag = true;
                            this.$toast('请输入生日');
                        }
                        break;
                    case 4:
                        if (!this.dataModel.address) {
                            flag = true;
                            this.$toast('请输入地址');
                        }
                        break;
                    case 5:
                        if (!this.dataModel.description) {
                            flag = true;
                            this.$toast('请输入签名');
                        }
                        break;
                    case 6:
                        if (!this.dataModel.oldPassword || !this.dataModel.newPassword || !this.dataModel.checkPassword) {
                            flag = true;
                            this.$toast('资料请填写完整');
                            break;
                        }
                        if (this.dataModel.newPassword.length < 6) {
                            flag = true;
                            this.$toast('小主，密码安全性太弱啦~');
                            break;
                        }
                        if (this.dataModel.newPassword !== this.dataModel.checkPassword) {
                            flag = true;
                            this.$toast('小主，两次密码输入不正确');
                            break;
                        }
                        break;
                }
                return flag;
            },
            changePass() {
                let data = {
                    newPassword: this.dataModel.newPassword,
                    oldPassword: this.dataModel.oldPassword,
                    userId: this.dataModel.userId
                };
                this.$indicator.open();
                api_party.newPassword(data).then(res => {
                    this.$indicator.close();
                    this.$router.back();
                });
            },
            changeEmpData() {
                let data = {
                    id: this.dataModel.id,
                    userId: this.dataModel.userId,
                    type: this.type
                };
                switch (this.type) {
                    case 1:
                        data.name = this.dataModel.name;
                        break;
                    case 2:
                        data.gender = this.dataModel.gender;
                        break;
                    case 3:
                        data.birthday = this.$moment(this.dataModel.birthday).format('YYYY-MM-DD HH:mm:ss');
                        break;
                    case 4:
                        data.address = this.dataModel.address;
                        break;
                    case 5:
                        data.description = this.dataModel.description;
                        break;
                }
                this.$indicator.open();
                api_party.changeEmpData(data).then(res => {
                    this.$indicator.close();
                    this.$router.back();
                });
            },
            slectView(index) {
                this.selectIndex = index;
                this.showView = true;
            }
        }
    };
</script>

<style scoped lang='less'>
    @import '~styles/_style';
    @color-red-lighten: #EC3F6D;

    .editUser{
        min-height:100vh;
        background: @bg-gray;
    }
    .textCell{
        background: @white;
        border-top: 1px solid @border-gay;
        border-bottom: 1px solid @border-gay;
        margin-bottom:@l16;
    }
    .sub-btn{
        width:190px;
        height:44px;
        background:@color-red-lighten;
        border-radius: 22px;
        color:@white;
        display:block;
        margin:@l80 auto 0;
    }
</style>
