<template>
    <div class="newMember" v-title="'新增会员'">
        <div class="NoNewMember" layout="row" layout-align="center center">
            <m-icon class="ic" xlink="#icon-cuowu">></m-icon>
            <p>亲~,还没有到店会员哦~</p>
        </div>
    </div>
</template>

<style lang="less">
@import '~@/styles/_agile';
.newMember{
    width: 100%;
    height: 100%;
    background: #f4f4fc;
    .NoNewMember {
        width: 100%;
        height: 300px;
        color: #8c8c8c;
        .ic{
            font-size: 23px;
        }
        p{
            font-size: 15px;
        }
    }
}
</style>
