<template>
    <div class="Late" v-title="'迟到人数'">
        <div class="top">
            <p class="fs36 m-b-4">迟到人数20人</p>
            <div class="" layout=row layout-align="space-between center">
                <div layout="row">
                    <span class="p-t-1 p-r-2 p-b-1 p-l-2 extra-light-gray gray m-r-2">中山公园店</span>
                    <span class="p-t-1 p-r-2 p-b-1 p-l-2 extra-light-gray gray m-r-2">2018.12</span>
                </div>
                <div layout=row layout-align="center center">
                    <span class="color-primary fs28">次数</span>
                    <div layout="column" class="m-l-2">
                        <m-icon link="icon-pop-left" style="transform:rotateZ(90deg);" @click.native='change(1)' :class=" changeColor == 1 ? 'active' : ''"></m-icon>
                        <m-icon link="icon-triangle-down" @click.native='change(2)' :class=" changeColor == 2 ?'active' : ''"></m-icon>
                    </div>
                </div>
            </div>
        </div>
        <div class="list" layout="row" layout-align="space-between center">
            <div class="Number">1</div>
            <div class="info" layout="row" layout-align="start center">
                <img class="img1" :src="require('assets/imgs/avatar.png')" alt="">
                <div layout="column" class="m-l-2">
                    <span class="fs28 fwb">周树人</span>
                    <span class="fs28 extra-black fwb5">店长</span>
                </div>
            </div>
            <div layout="row" layout-align="center center">
                <div layout="column" layout-align="start end" class="m-r-2">
                    <span class="fs26 fwb">3次</span>
                    <span class="fwb5 extra-light-black fs24">100分钟</span>
                </div>
                <m-icon link="icon-right-bold"></m-icon>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'late',
    data() {
        return {
            changeColor: 1
        };
    },
    methods: {
        change(index) {
            this.changeColor = index;
        }
    }
};

</script>
<style lang="less">
@import '~@/styles/_agile';
.Late {
    background: #F5F5F5;
    min-width: 100vw;
    min-height: 100vh;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 120px;
    .extra-light-gray {
        background: @extra-light-gray;
    }
    .gray {
        color: @gray;
    }
    .fwb5{
        font-weight: 500;
    }
    .top {
        background: @white;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        padding: 17px 27px 15px 15px;
        box-shadow:0px 3px 8px 0px rgba(49,77,83,0.28);
        border:1px solid rgba(204,204,204,1);
        .icon {
            width: 15px;
            height: 15px;
            color: #AEB7CC
        }
        .active {
            color: #B44DCE;
        }
    }
    .list {
        position: relative;
        background: @white;
        width: 98%;
        margin: 0 auto;
        border-radius: 4px;
        margin-bottom: 8px;
        padding: 14px 12px 16px 12px;
        .img1{
            width: 34px;
            height: 34px;
            border-radius: 50%;
        }
        .icon{
            width: 6px;
            height: 10px;
            color: @dark-gray;
        }
        .Number {
            width: 22px;
            height: 27px;
            background:linear-gradient(153deg,rgba(223,239,250,1) 0%,rgba(167,97,198,1) 100%);
            border-radius:4px 4px 10px 4px;
            color: @white;
            text-align: center;
            line-height: 27px;
            position: absolute;
            left:-11px;
            top: -5px;
        }
    }
}

</style>
