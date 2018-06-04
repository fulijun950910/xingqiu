<template>
    <div class="personal-container">
<div class="top-detail" layout="column" layout-align="space-between center" flex>
    <div class="person-describtion" layout="row" layout-align="start center" flex>
        <div flex="70%" layout="column">
           <div class="fs40 fwb color-white">{{employee.name}}</div>
            <a href="" class="to-pay-detail fs28">查看收支明细</a>           
        </div>
        <div flex="30">
            <span class="img-con">
                <img :src="employee.avatarFileId | nSrc(require('assets/imgs/female.png'))" alt="">
            </span>
        </div>
    </div>
    <div class="bottom-detail" layout="row" layout-align="start center" flex>
        <div flex="70" layout="column">
            <div layout="row" layout-align="start end" class="color-white fs30 doudou">
                <span class="color-white">{{data.doudouBalance}}</span>美豆豆
            </div>
            <div layout="row" layout-align="start center" class="color-white">可提取{{data.doudouPresent}}个美豆豆</div>
        </div>
        <div flex="30" class="start-play" layout-align="start center">
            <div flex></div>
            <span class="fs28 color-white text-center">开始玩转</span>
        </div>
    </div>
</div>
<div class="list-personal" flex>
    <div layout="row" class="item" layout-align="space-between center">
        <span class="color-black fs28"><m-icon class="color-gray fs30" xlink="#icon-huaban3"></m-icon>我的订单</span>
        <span class="color-gray"><m-icon xlink="#icon-zuojiantou"></m-icon></span>
    </div>
     <div layout="row" class="item" layout-align="space-between center">
        <span class="color-black fs28"><m-icon class="color-gray fs30" xlink="#icon-huaban3"></m-icon>个人信息</span>
        <span class="color-gray"><m-icon xlink="#icon-zuojiantou"></m-icon></span>
    </div>
     <div layout="row" class="item" layout-align="space-between center">
        <span class="color-black fs28"><m-icon class="color-gray fs30" xlink="#icon-huaban3"></m-icon>我的地址</span>
        <span class="color-gray"><m-icon xlink="#icon-zuojiantou"></m-icon></span>
    </div>
     <div layout="row" class="item" layout-align="space-between center">
        <span class="color-black fs28"><m-icon class="color-gray fs30" xlink="#icon-duanxin"></m-icon>客服</span>
        <span class="color-gray"><m-icon xlink="#icon-zuojiantou"></m-icon></span>
    </div>
     <div layout="row" class="item" layout-align="space-between center">
        <span class="color-black fs28"><m-icon class="color-gray fs30" xlink="#icon-11"></m-icon>安全设置</span>
        <span class="color-gray"><m-icon xlink="#icon-zuojiantou"></m-icon></span>
    </div>
</div>
<div class="bottom-tab" layout="row" layout-align="start center">
<div layout="column" flex="50" @click="routeTo(1)" layout-align="center center" class="fs24">首页</div>
<div layout="column" flex="50" @click="routeTo(2)" layout-align="center center" class="fs24">我的</div>
</div>
    </div>
</template>
<script>
import api_party from 'services/api.party';
export default {
    data() {
        return {
            employee: JSON.parse(localStorage.getItem('employee')),
            data: null
        };
    },
    methods: {
        load() {
            api_party.doudouAccount(this.employee.party.partyId).then(msg=> {
                this.data = msg.data;
                console.log(this.data);
            }, msg=> {
            });
        },
        routeTo() {

        }
    },
    mounted() {
        this.load();
    }
};
</script>

<style lang="less" scoped>
@import '~styles/_style';
.personal-container{
    position: relative;
    padding-bottom: 50px;
    .top-detail{
        background: #3C149F;
        height: 355px;
        width: 100%;
        padding: 20px 15px;
        .to-pay-detail{
            display: inline-block;
            padding-top: 15px;
        }
        .img-con{
            width: 60px;
            height: 60px;
            border-radius: 13x;
            overflow: hidden;
            display: block;
        }
        .person-describtion{
            width: 100%;
        }
        .bottom-detail{
            width: 100%;
            .doudou{
                span{
                font-size: 40px;
                }
            }
            .start-play{
                span{
                display: block;
                width: 80px;
                height: 44px;
                line-height: 44px;
                background:#F13D65;
                border-radius: 7px;
                }
            }
        }
    }
    .list-personal{
        padding: 12px 0;
        .item{
            padding: 12px 15px;
            border-bottom: 1px solid @border-gay;
            span{
                .icon{
                    display: inline-block;
                    margin-right: 10px;
                }
            }
        }
        
    }
    .bottom-tab{
        height: 50px;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        background: white;
        border-top: 1px solid @border-gay;
    }
}
</style>


