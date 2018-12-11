<template>
    <div class="editUserInfo" v-title="'修改个人信息'">
        <div class="cell">
            <div v-if="type == 1" class="textCell cell cell-box" layout="row" layout-align="start stretch">
                <div class="">姓名&emsp;</div>
                <input flex maxLength="30" type="text" placeholder="请输入姓名"/>
            </div>
            <div v-else-if="type == 2" class="textCell cell cell-box" layout="row" layout-align="start stretch">
                <div class="">品牌&emsp;</div>
                <input flex type="text" placeholder="请输入品牌"/>
            </div>
            <div v-else-if="type == 3" class="textCell cell cell-box" layout="row" layout-align="start stretch">
                <div class="">从属行业&emsp;</div>
                <input flex type="text" placeholder="请输入行业"/>
            </div>
            <div v-else-if="type == 4" class="textCell cell cell-box" layout="row" layout-align="start stretch">
                <div class="">店铺简介&emsp;</div>
                <input flex type="text" placeholder="请输入店铺简介"/>
            </div>
        </div>
        <div>
            <button @click="submit" class="fs32 sub-btn">确认修改</button>
        </div>
    </div>
</template>
<script>
import popupRight from 'components/popup-right';
import popupRightList from 'components/popup-right-list';

export default {
    name: 'editUserInfo',
    props: ['type'],
    components: {
        'popup-right': popupRight,
        'popup-right-list': popupRightList
    },
    data() {
        return {
        };
    },
    mounted() {
    },
    methods: {
        submit() {}
    }
};
</script>
<style scoped lang='less'>
    @import '~styles/_agile';
    @color-red-lighten: #EC3F6D;

    .editUserInfo{
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
