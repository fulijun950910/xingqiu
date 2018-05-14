<template>
    <div class="editUser" v-title="'修改个人信息'">
        <div class="cell">
            <div class="textCell cell cell-box" layout="row" layout-align="start stretch">
                <div class="">用户名&emsp;</div>
                <input flex type="text" v-model="value" placeholder="请输入用户姓名"/>
            </div>
            <div class="textCell cell cell-box" layout="row" layout-align="start stretch">
                <div class="">性别&emsp;</div>
                <div flex class="color-gray">{{value}}</div>
            </div>
            <div class="textCell cell cell-box" layout="row" layout-align="start stretch">
                <div class="">生日&emsp;</div>
                <input flex type="date" v-model="value" placeholder="请输入生日"/>
            </div>
            <div class="textCell cell cell-box" layout="row" layout-align="start stretch">
                <div class="">地址&emsp;</div>
                <input flex type="text" v-model="value" placeholder="请输入地址"/>
            </div>
            <div class="textCell cell cell-box" layout="row" layout-align="start stretch">
                <div class="">签名&emsp;</div>
                <input flex type="text" v-model="value" placeholder="请输入签名"/>
            </div>
            <div class="textCell cell cell-box" layout="row" layout-align="start stretch">
                <div class="">原密码&emsp;</div>
                <input flex type="text" v-model="value" placeholder="请输入原密码"/>
            </div>
        </div>

        <div>
            <button class="fs32 sub-btn">确认修改</button>
        </div>
        <popup-right v-model="showView">
            <popup-right-list v-if="selectIndex==1"  :options="GENDERS"  title="选择您的性别" v-model="value"></popup-right-list>
        </popup-right>
    </div>
</template>

<script>
    import popupRight from 'components/popup-right';
    import popupRightList from 'components/popup-right-list';
    import {
        GENDERS
    } from 'config/mixins';

    export default {
        name: 'editUserInfo',
        components: {
            'popup-right': popupRight,
            'popup-right-list': popupRightList
        },
        data() {
            return {
                value: null,
                selectIndex: 1,
                GENDERS: GENDERS,
                showView: false
            };
        },
        mounted() {
        },
        methods: {
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
