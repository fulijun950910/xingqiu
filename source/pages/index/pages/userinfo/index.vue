<template>
    <div class="userinfo" v-title="'个人信息'">
        <!-- <div class="box1" layout="column" layout-align="start center">
            <div class="avatarBox">
                <img class="avatar"  :src="dataModel.avatarFileId | nSrc(require('assets/imgs/female.png'))" alt="">
                <file @click="changeAvatar" v-model="logoImage" :proportion="{w:1, h:1}"></file>
            </div>

            <div class="color-white fs32">{{dataModel.name}}</div>
        </div> -->
        <!-- <div @click="goWallet" class="purseBox" layout="row" layout-align="start center">
            <div class="icon-qb" layout="row" layout-align="center center">
                <m-icon class="fs48 color-white" xlink="#icon-qianbao01"></m-icon>
            </div>
            <div flex>我的钱包：{{blanceTotal}}美豆豆</div>
            <m-icon class="color-gray" xlink="#icon-right-bold"></m-icon>
        </div> -->
        <div>
            <div @click="goEdit(1)" layout="row" layout-align="space-between center" class="list-item cell cell-box border-bottom">
                <div>
                    <!-- <m-icon class="usericon" xlink="#icon-xingming"></m-icon> -->
                    <span>用户名</span>
                </div>
                <div >
                    <span class="light-gray">{{dataModel.name}}</span>
                    <m-icon class="color-gray" xlink="#icon-right-bold"></m-icon>
                </div>
            </div>
            <div @click="goEdit(2)" layout="row" layout-align="space-between center" class="list-item cell cell-box border-bottom">
                <div>
                    <!-- <m-icon class="usericon" xlink="#icon-xingbie"></m-icon> -->
                    <span>性别</span>
                </div>
                <div >
                    <span class="light-gray">{{dataModel.gender | getName(genderList)}}</span>
                    <m-icon class="color-gray" xlink="#icon-right-bold"></m-icon>
                </div>
            </div>
            <div @click="goEdit(3)" layout="row" layout-align="space-between center" class="list-item cell cell-box border-bottom">
                <div>
                    <!-- <m-icon class="usericon" xlink="#icon-shengribirthday16"></m-icon> -->
                    <span>生日</span>
                </div>
                <div >
                    <span class="light-gray">{{dataModel.birthday}}</span>
                    <m-icon class="color-gray" xlink="#icon-right-bold"></m-icon>
                </div>
            </div>
            <!-- <div @click="goEdit(4)" layout="row" layout-align="space-between center" class="list-item cell cell-box border-bottom">
                <div>
                    <m-icon class="usericon" xlink="#icon-4"></m-icon>
                    <span>地址</span>
                </div>
                <div >
                    <span class="light-gray">{{dataModel.address | sliceStr(30)}}</span>
                    <m-icon class="color-gray" xlink="#icon-right-bold"></m-icon>
                </div>
            </div> -->
            <div @click="goEdit(5)" layout="row" layout-align="space-between center" class="list-item cell cell-box border-bottom">
                <div>
                    <!-- <m-icon class="usericon" xlink="#icon-qianming"></m-icon> -->
                    <span>签名</span>
                </div>
                <div >
                    <span class="light-gray">{{dataModel.description | sliceStr(30)}}</span>
                    <m-icon class="color-gray" xlink="#icon-right-bold"></m-icon>
                </div>
            </div>
            <!-- <div  @click="goEdit(6)" layout="row" layout-align="space-between center" class="list-item cell cell-box border-bottom">
                <div>
                    <m-icon class="usericon" xlink="#icon-mima"></m-icon>
                    <span>修改密码</span>
                </div>
                <div >
                    <span class="light-gray">******</span>
                    <m-icon class="color-gray" xlink="#icon-right-bold"></m-icon>
                </div>
            </div> -->
        </div>
        <!-- <div class="sign-out">
            <button @click="signOut" class="fs32 sign-out-btn">退出登录</button>
        </div> -->
    </div>
</template>

<script>
    import file from 'components/file-slice';
    import api_party from 'services/api.party';
    import api_file from 'services/api.file';
    import { GENDERS } from 'config/mixins';

    export default {
        name: 'main',
        components: {
            file
        },
        data() {
            return {
                logoImage: {},
                genderList: GENDERS,
                blanceTotal: 0,
                dataModel: {}
            };
        },
        mounted() {
            this.loadData();
        },
        methods: {
            loadData() {
                this.$indicator.open();
                api_party.getEmployee(this.$store.state.user.id).then(res => {
                    this.$indicator.close();
                    this.dataModel = res.data;
                    this.$store.state.employeeData = this.dataModel;
                });
                api_party.getAccount(this.$store.state.party.partyId).then(res => {
                    this.blanceTotal = res.data.doudouBalance;
                });
            },
            async changeAvatar(data) {
                let resData = await api_file.uploadImage(data);
                console.log(resData);
                let empData = {
                    id: this.dataModel.id,
                    userId: this.dataModel.userId,
                    avatarFileId: resData.data
                };
                api_party.changeEmpData(empData).then(res => {
                    this.loadData();
                });
            },
            signOut() {
                let data = {
                    employeeId: this.$store.state.user.id,
                    userId: this.$store.state.user.userId
                };
                this.$indicator.open();
                api_party.unbind(data).then(res => {
                    this.$indicator.close();
                    localStorage.clear();
                    window.location.href = this.$signLocation;
                });
            },
            goWallet() {
                this.$router.push({name: 'wallet'});
            },
            goEdit(type) {
                this.$router.push({name: 'editUserInfo', params: {type: type}});
            }
        }
    };
</script>

<style scoped lang='less'>
    @import '~styles/_style';
    @color-red-lighten: #EC3F6D;

    .userinfo{
        min-height:100vh;
        // background: url("~assets/imgs/index/20180510114801.jpg") no-repeat top center;
        background-size: 100% auto;
        position: relative;
        .sign-out{
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
        }
    }
    .border-bottom{
        border-bottom:1px solid @border-gay;
    }
    .box1{
        height:160px;
        .avatarBox{
            width:78px;
            height:78px;
            margin-top:32px;
            position:relative;
        }
        .avatar{
            width:78px;
            height:78px;
            border-radius: 50%;
            margin-bottom:@l8;
        }
    }
    .purseBox{
        padding:@l16;
        background:#fff;
        width:253px;
        height:50px;
        border-radius: 25px;
        margin:0 auto @l16;
        border:1px solid @border-gay;
        .icon-qb{
            background:@color-red-lighten;
            width:32px;
            height:32px;
            border-radius: 16px;
            margin-right:@l8;
        }
    }
    .list-item{
        .usericon{
            font-size:@fs36;
        }
    }
    .sign-out-btn{
        // width:190px;
        // height:44px;
        // background:@color-red-lighten;
        // border-radius: 22px;
        // color:@white;
        // display:block;
        // margin:@l40 auto;
    }
</style>
