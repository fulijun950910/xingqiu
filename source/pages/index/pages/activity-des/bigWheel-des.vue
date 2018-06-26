<template>
<div class="bigwheel-des">
    <div class="img-con">
        <img class="img-auto" :src="require('assets/imgs/activity-des/img-01.jpg')" alt="">
    </div>
    <div class="text-con">
        <div class="text-main">
            <div class="activity-title color-white fs28" layout="row" layout-align="center center">
                美博汇商城优点多
            </div>
        </div>
    </div>
    <div class="img-con">
        <img class="img-auto" :src="require('assets/imgs/activity-des/img-02.jpg')" alt="">
    </div>
    <div class="insert-brand" flex>
        <div class="text-main">
            <div class="activity-title color-white fs28" layout="row" layout-align="center center">
                入驻品牌不简单
            </div>
            <div class="des-list" flex>
                <div class="des-box">
                    <div class="box-title fs30" layout="row" layout-align="center start">
                        Miss eye dor
                    </div>
                    <div layout="row" layout-align="start center">
                        <div flex="35"></div>
                        <div flex="65">
                            <div class="fs24 color-white text">业内公认“睫毛中的爱马仕”！作为猫猫酱的指定睫毛产品，其接近完美的商品品质在日本掀起了无数国民性话题</div>
                            <a class="to-detail color-white fs30 fwb text-center" layout="row" layout-align="center center">查看详情</a>
                        </div>
                    </div>
                </div>
                <div class="des-box">
                    <div class="box-title fs30" layout="row" layout-align="center start">
                        Quame闺蜜闺蜜
                    </div>
                    <div layout="row" layout-align="start center">
                        <div flex="65">
                            <div class="fs24 color-white text">台湾当下top火爆的Quame，拥有三大系列、全个护品类，曾在综艺、媒体刮起前所未有的“香氛飓风”！更是无数艺人网红洗脸间的头牌“闺蜜”哦。
</div>
                            <a class="to-detail color-white fs30 fwb text-center" layout="row" layout-align="center center">查看详情</a>
                        </div>
                        <div flex="35"></div>
                    </div>
                </div>
                <div class="des-box">
                    <div class="box-title fs30" layout="row" layout-align="center start">
                        朵依生物科技
                    </div>
                    <div layout="row" layout-align="start center">
                        <div flex="35"></div>
                        <div flex="65">
                            <div class="fs24 color-white text">作为国内少数拥有细胞级护肤技术的团队，朵依倚靠绝对前沿、量肤定制的美容科技，重新定义国内护肤品！从细胞层级出发，重新改写肌肤未来！
</div>
                            <a class="to-detail color-white fs30 fwb text-center" layout="row" layout-align="center center">查看详情</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div>
        <div flex class="text-center bottom-qr-code">
            <div layout="row" layout-align="center center" class="bottom-title">
                <div class="cube"></div>
                <div class="bottom-text"><div class="fs38 color-zi">关注美问星球</div>
                <div class="fs38 color-zi">发现更多惊喜</div></div>
                <div class="cube"></div>
            </div>
            <div class="qr-code">
              <img :src="require('assets/imgs/activity-des/qrcode.jpg')" alt="">
            </div>
                <img class="img-auto meiwen" :src="require('assets/imgs/activity-des/word-meiwen-01.png')" alt="">
        </div>
    </div>
</div>
</template>
<script>
    export default {
        data() {
            return {};
        }
    };
</script>

<style lang="less" scoped>
@import '~styles/_style';
.color-zi{
    color: #7268FF;
}
.bigwheel-des {
    .img-con{
        font-size: 0;
        position: relative;
    }
    .img-auto{
        width: 100%;
        height: auto;
        font-size: 0;
        padding: 0;
        margin: 0;
    }
    .activity-title{
        width: 240px;
        height: 61.5px;
        background: url('~assets/imgs/activity-des/bg-03.png');
        background-size: 100% 100%;
        margin: 0 auto;
        text-shadow: 0 0 40px #c6aed0,
                     0 0 40px #c6aed0,
                     0 0 40px #c6aed0;
    }
    .text-con{
        position: relative;
        z-index: 2;
        .text-main{
            position: absolute;
            left: 0;
            right: 0;
            top:-95px;
        }
    }
    .insert-brand {
     background: url('~assets/imgs/activity-des/bg-04.jpg') no-repeat #0b0c3a;
     background-size: 100% auto;
     padding: 15px 0;
     .des-list {
         padding: 20px 11px;
         .des-box {
             background: url('~assets/imgs/activity-des/bg-02.png') no-repeat;
             background-size: 100% 100%;
             padding: 25px;
             margin-bottom: 15px;
             .box-title {
                 width: 155px;
                 margin: 0 auto;
                 height: 35.5px;
                 background: url('~assets/imgs/activity-des/bg-05.png') no-repeat;
                 text-shadow: 0 0 40px #c6aed0, 0 0 40px #c6aed0, 0 0 40px #c6aed0;
                 background-size: 100% 100%;
                 color:#F8D6FF;
             }
             .text{
                 line-height: 30px;
                 margin: 25px 0;
             }
             .to-detail{
                 display: block;
                 width: 96.5px;
                 line-height: 38px;
                 height: 38px;
                 background: url('~assets/imgs/activity-des/bg-01.png') no-repeat;
                 background-size: 100% 100%;
             }
         }
     }
 }
 .bottom-qr-code{
    background: url('~assets/imgs/activity-des/bg-07.jpg') no-repeat #0b0c3a bottom;
    background-size: 100% auto;
    padding-bottom: 20px;
     .meiwen{
         width: 24px;
         height: auto;
         display: block;
         margin: 0 auto;
     }
     .bottom-title{
         .bottom-text{
             margin: 0 15px;
         }
         .cube{
             width: 45.5px;
             height: 19px;
             background: url('~assets/imgs/activity-des/bg-09.png') no-repeat;
         }
     }
     .qr-code{
         width: 153px;
         height: 152px;
         margin: 20px auto;
         overflow: hidden;
         padding: 15px;
         background: url('~assets/imgs/activity-des/bg-08.png') no-repeat;
         background-size: 100% 100%;
     }
 }

 }
</style>

