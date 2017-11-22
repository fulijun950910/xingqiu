<template>
    <div v-title="'预约'">
        <div class="bookingBox">
            <div class="mainBox">
                <div class="avatarBox">
                    <img  :src="require('assets/imgs/avatar.png')"/>
                </div>
                <div class="text-center">
                    <div class="text-right"><span class="editBtn"><m-icon xlink="#icon-edit"></m-icon> 编辑</span></div>
                    <div> 王</div>
                    <div class="fs24 color-gray">13774242580</div>
                </div>
                <div class="editBox">
                    <div class="textCell" layout="row" layout-align="start start">
                        <div class="">预约时间&emsp;</div>
                        <div flex class="color-gray">2017</div>
                        <div><m-icon class="light-gray" xlink="#icon-right-bold"></m-icon></div>
                    </div>
                    <div class="textCell" layout="row" layout-align="start start">
                        <div class="">预约门店&emsp;</div>
                        <div flex class="color-gray">中山公园</div>
                    </div>
                    <div class="textCell" layout="row" layout-align="start start">
                        <div class="">预约内容&emsp;</div>
                        <div flex class="color-gray">镜头美白护理</div>
                    </div>
                    <div class="textCell" layout="row" layout-align="start start">
                        <div class="">预约人数&emsp;</div>
                        <div flex class="color-gray"><input type="text" value="1"/></div>
                    </div>
                    <div class="textCell" layout="row" layout-align="start start">
                        <div class="">预约备注&emsp;</div>
                        <div flex class="color-gray">最近面部过敏</div>
                    </div>

                </div>

            </div>

            <div>
                <button class="btn subBtn">确认预约</button>
                <button class="btn color-gray">取消预约</button>
            </div>
        </div>

    </div>
</template>
<script>
import popupRight from 'components/popup-right';
import popupRightList from 'components/popup-right-list';
import popupRightLoadList from 'components/popup-right-load-list';
import cellTag from 'components/cell-tag';

export default {
    name: '',
    data() {
        return {
            value: null,
            showPopup: false,
            pickerVisible: true
        };
    },
    components: {
        'popup-right': popupRight,
        'popup-right-list': popupRightList,
        'popup-right-load-list': popupRightLoadList,
        'cell-tag': cellTag
    },
    mounted() {
    },
    methods: {
    }
};
</script>
<style lang="less" scoped>
@import '~styles/_style';
@color-link:#7386b6;
.bookingBox{
    min-height:100vh;
    padding: 80px 20px 0;
    background:@bg-gray;
    .avatarBox{
        position:absolute;
        top:0;
        left:50%;
        margin-top:-35px;
        margin-left:-35px;
        img{
            width:70px;
            height:70px;
            border-radius:50%;
        }
    }
    .mainBox{
        background:#fff;
        border-radius:2px;
        border:1px solid @border-gay;
        padding:4px;
        position:relative;
    }
    .editBtn{
        background:@bg-gray;
        color:@color-link;
        .fs24;
        border-radius:2px;
        padding:4px 10px;
        display:inline-block;
        margin-bottom:8px;
    }

    .editBox{
        margin:10px;
    }
    .textCell{
        padding:12px 0;
        &:not(:first-child){
            border-top:1px solid @border-gay;
        }
    }
    .btn{
        width:100%;
        border-radius: 2px;
        padding:8px 0;
        margin-top:15px;
        background:transparent;
    }
    .subBtn{
        color:#fff;
        background:@color-primary;
    }
}
.popup{
    height: 70%;
    width: 100%;
    .popup-box{

    }
}
</style>
