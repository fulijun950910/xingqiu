<template>
<div class="big-wheel" v-title="'美问大转盘'">
    <div class="wheel-main">
        <div class="biwheel-top text-center">
            <div class="top-title">
            </div>
            <div class="chance fs24 color-white text-center fwb" layout="row" layout-align="center center">
                <m-icon link="icon-laba" class="fs34"></m-icon>10个美豆豆可抽奖一次，今日还剩<span class="color-chance">{{chance}}</span>次机会
            </div>
        </div>
        <div class="wheel-con">
            <div class="big-wheel-cavans" layout="row" layout-align="center center">
                <canvas id="cavans" height="560" width="560" :style="wheelConfig.rotate">
                您的浏览器不支持cavans画布
            </canvas>
                <div class="click-dicect">
                    <img :src="require('assets/imgs/integral-mall/wheel-direct.png')" alt="">
                    <button :disabled="btnClick" @click="clickRotate"></button>
                </div>
            </div>
            <div class="wheel-bottom text-center">
                <img class="stands" :src="require('assets/imgs/integral-mall/wheel-bottom.png')" alt="">
            </div>
        </div>
        <div class="wheel-gift">
            <div class="gift-title" layout="row" layout-align="center center">
                <img :src="require('assets/imgs/integral-mall/title-left.png')" alt="">
                <span class="fs32">我的奖品</span>
                <img :src="require('assets/imgs/integral-mall/title-right.png')" alt="">
            </div>
            <div class="wheel-list">
                <div class="whell-list-box" v-for="(item, index) in dataList" :key="index" layout="row" layout-align="space-between center">
                    <div>
                        <p class="fs28 color-white" layout="row" layout-align="start center" flex-wrap="wrap">{{item.prizeType == 1 && item.userCoupon ? item.userCoupon.name : item.name}}</p>
                        <p class="color-fe fs24" v-if="item.userCoupon">{{item.userCoupon.endTime}}</p>
                    </div>
                    <div>
                        <a :class="{'disabled' : item.prizeType == 1 && item.userCoupon.status > 0}" class="color-white fs28 to-use text-center" layout="row" layout-align="center center" @click="goToUse(item)"><span v-if="item.prizeType == 1">{{item.userCoupon.status == 0 ? '去使用' : '已使用'}}</span><span v-if="item.prizeType == 2">去查看</span></a>
                    </div>
                </div>
            </div>
            <div flex class="text-center color-light-purple fs24"><m-icon link="icon-xiangqing"></m-icon>抵用券有效期为3天，3天后自动删除</div>
        </div>
    </div>
    <div class="alert-result" layout="row" layout-align="center center" v-if="showAlert">
        <div class="mask" @click="toggleAlert"></div>
        <div class="snow" v-if="hideSnow"></div>
        <div class="main" layout="column" layout-align="space-around stretch">
            <div :class="{'one-dou' : tempAward.prizeType == 2 && tempAward.quantity == 1,'other-award' : tempAward.prizeType == 1 || tempAward.quantity > 1}" flex layout="row" layout-align="center center">
                        <div class="award-detail" v-if="tempAward.prizeType == 2 && tempAward.quantity > 1">
                            <img :src="require('assets/imgs/integral-mall/award-doudou.png')" alt="">
                            <!-- 豆豆 -->
                            <div class="award-text color-dark-purple fs28 fwb" layout="row" layout-align="center center">
                                {{tempAward.name}}
                            </div>
                        </div>
                        <div class="award-detail" v-if="tempAward.prizeType == 1">
                             <img :src="require('assets/imgs/integral-mall/award-img.png')" alt="">
                              <!-- 优惠券 -->
                            <div class="award-text color-white fs28 fwb color-dark-purple p-l-5" layout="column" layout-align="center center">
                                <div class="fs40">抵用券</div>
                                <div class="fs24">{{tempAward.name}}</div>
                                <div layout="row" layout-align="center center" layout-wrap class="price color-white fs24" v-if="tempAward.userCoupon">{{tempAward.userCoupon.discountType == 1 ? (tempAward.userCoupon.discount / 100) + '/￥' : (tempAward.userCoupon.discount * 10) + '折'}}</div>
                            </div>
                        </div>
            </div>
            <div layout="column" class="bottom" layout-align="space-between stretch">
                <div class="bottom-des">
                    <div v-if="tempAward.prizeType == 1 || tempAward.quantity > 1">
                        <p class="text-center fs38 color-purple">恭喜小主，斩获大奖</p>
                        <p class="text-center fs26 color-purple">已位您放入<span class="color-yellow">“我的奖品”</span></p>
                    </div>
                    <div v-if="tempAward.prizeType == 2 && tempAward.quantity == 1">
                        <p class="text-center fs38 color-purple">别灰心，一颗也是爱哦~</p>
                        <p class="text-center fs26 color-purple">已位您放入<span class="color-yellow">“美豆豆钱包”</span></p>
                    </div>
                </div>
                <div class="color-purple fs34 to-use text-center" @click="goToUse(tempAward)">
                    {{tempAward.prizeType == 1 ? '去使用' : '去查看'}}
                </div>
            </div>
            <div class="close text-center" @click="toggleAlert">
                <m-icon class="color-white" link="icon-huabanfuben29"></m-icon>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import api_party from 'services/api.party';
export default {
    data() {
        return {
            cavans: null,
            wheelConfig: {
                radius: 280, // 转盘半径
                inCircleRadius: 0, // 用于非零环绕原则的内圆半径
                textRadius: 220, // 外圈文字半径
                subTextRedius: 180, // 内圈文字半径
                imgRedius: 160,
                centerX: 560 / 2,
                centerY: 560 / 2,
                startRadian: 0, // 起始角
                during: 4, // 旋转时间
                times: 1, // 旋转速率
                turnRotate: 0,
                rotate: {}
            },
            awrads: [],
            chance: 1,
            dataList: [],
            tempAward: null,
            showAlert: false,
            hideSnow: true,
            btnClick: false
        };
    },
    methods: {
        drawCircle() {
            let canvas = document.getElementById('cavans');
            this.cavans = canvas;
            let config = this.wheelConfig;
            if (!canvas.getContext) {
                return;
            };
            let ctx = canvas.getContext('2d'); // 初始化画布
            let awards = this.awrads;
            let awardRadian = (Math.PI * 2) / awards.length; // 奖品均分角度
            for (let i = 0; i < awards.length; i++) {
                let _startRadian = config.startRadian + awardRadian * i; // 每一个奖项所占的起始弧度
                let _endRadian = _startRadian + awardRadian; // 每一个奖项的终止弧度

                // 使用非零环绕原则，绘制圆盘
                ctx.save();
                ctx.fillStyle = '#fff';
                ctx.strokeStyle = '#000';
                ctx.beginPath();
                ctx.arc(config.radius, config.radius, config.radius, _startRadian, _endRadian, false);
                ctx.arc(config.radius, config.radius, config.inCircleRadius, _endRadian, _startRadian, true);
                ctx.fill();
                ctx.restore();
                // 绘制外圈文字
                ctx.save();
                ctx.font = '26px Helvetica, Arial';
                ctx.fillStyle = '#B5ACDB';
                ctx.translate(
                    config.centerX + Math.cos(_startRadian + awardRadian / 2) * config.textRadius,
                    config.centerY + Math.sin(_startRadian + awardRadian / 2) * config.textRadius
                );
                ctx.rotate(_startRadian + awardRadian / 2 + Math.PI / 2);
                ctx.fillText(awards[i].name, -ctx.measureText(awards[i].name).width / 2, 0);
                ctx.restore();

                // 绘制内圈文字
                ctx.save();
                ctx.font = '28px Helvetica, Arial';
                ctx.fillStyle = '#B5ACDB';
                ctx.translate(
                    config.centerX + Math.cos(_startRadian + awardRadian / 2) * config.subTextRedius,
                    config.centerY + Math.sin(_startRadian + awardRadian / 2) * config.subTextRedius
                );
                ctx.rotate(_startRadian + awardRadian / 2 + Math.PI / 2);
                ctx.fillText(awards[i].description, -ctx.measureText(awards[i].name).width / 4, 0);
                ctx.restore();

                // 绘制图片
                // ctx.save();
                // ctx.font = '26px Helvetica, Arial';
                // ctx.fillStyle = '#B5ACDB';
                // ctx.translate(
                //     config.centerX + Math.cos(_startRadian + awardRadian / 2) * config.imgRedius,
                //     config.centerY + Math.sin(_startRadian + awardRadian / 2) * config.imgRedius
                // );
                // ctx.rotate(_startRadian + awardRadian / 2 + Math.PI / 2);
                // let img = new Image();
                // img.src = require('assets/imgs/integral-mall/vocher.png');
                // img.onload = function() {
                //     ctx.drawImage(img, -ctx.measureText(awards[i].name).width / 6, 0, 30, 30);
                // };
                // ctx.restore();
            };
        },
        clickRotate() {
            let config = this.wheelConfig;
            let parameter = {
                partyId: this.$store.state.party.partyId,
                userId: this.$store.state.party.id
            };
            this.btnClick = true;
            this.$indicator.open('Loading...');
            api_party.getAward(parameter).then(msg => {
                this.btnClick = false;
                this.$indicator.close();
                let data = msg.data;
                let awardIndex;
                // 获取奖项在已知列表奖品中的位置索引
                this.awrads.map((item, index) => {
                    if (item.id == data.prizeId) {
                        awardIndex = index;
                    };
                });
                let perRotate = 360 / this.awrads.length;
                let anyRotate = perRotate * (awardIndex + 1) + 90; // 实际要旋转多少度 画布从90度开始故要加90度
                let rotate;
                if (config.turnRotate != 0) {
                    // 非第一次点击旋转
                    let last; ;
                    let now;
                    this.awrads.map((item, index) => {
                        if (item.id == this.tempAward.prizeId) {
                            last = index + 1;
                        };
                        if (item.id == data.prizeId) {
                            now = index + 1;
                        };
                    });
                    let betwen = now - last;
                    rotate = 360 - (betwen * perRotate);
                } else {
                    rotate = 360 - anyRotate + 0.5 * perRotate;
                }
                this.rotateWheel(rotate, msg.data);
            }, msg => {
                this.btnClick = false;
            });
        },
        rotateWheel(rotate, data) {
            let config = this.wheelConfig;
            config.turnRotate += rotate + 5 * 360;
            config.rotate = {
                transform: `rotate(${config.turnRotate}deg)` + ' ' + 'scale(.5,.5)',
                transition: `all ease ${config.during}s`
            };
            console.log(config.rotate);
            ++config.times;
            setTimeout(() => {
                this.tempAward = data;
                this.toggleAlert();
                console.log(this.tempAward);
                this.loadPrizeList();
                this.loadHasAwardedList();
                this.loadTimes();
                setTimeout(() => {
                    this.hideSnow = false;
                }, 1000);
            }, config.during * 1000);
        },
        loadPrizeList() {
            this.$indicator.open('Loading...');
            api_party.getPrizeList().then(msg => {
                this.$indicator.close();
                this.awrads = msg.data;
                this.drawCircle();
            }, msg => {
            });
        },
        loadTimes() {
            let parameter = {
                partyId: this.$store.state.party.partyId,
                userId: this.$store.state.party.id
            };
            this.$indicator.open('Loading...');
            api_party.getDrawPrizeDailyTimes(parameter).then(msg => {
                this.$indicator.close();
                this.chance = msg.data.userRemainTimes;
                if (this.chance == 0) {
                    this.btnClick = true;
                };
            }, msg => {
            });
        },
        loadHasAwardedList() {
            let parameter = {
                query: [{
                    field: 'merchantId',
                    value: this.$store.state.party.merchantId
                },
                {
                    field: 'partyId',
                    value: this.$store.state.party.partyId
                },
                // {
                //     field: 'userId',
                //     value: this.$store.state.party.id
                // },
                {
                    field: 'startTime',
                    value: this.$moment().subtract(3, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss')
                },
                {
                    field: 'endTime',
                    value: this.$moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
                }]
            };
            api_party.hasAwardedList(parameter).then(msg => {
                this.dataList = msg.data.rows;
            }, msg => {
            });
        },
        toggleAlert() {
            this.showAlert = !this.showAlert;
            if (this.showAlert) {
                this.hideSnow = true;
            };
        },
        goToUse(item) {
            if (item.prizeType == 1 && item.userCoupon.status == 2) {
                this.$toast('已使用');
                return;
            };
            if (item.userCoupon) {
                this.$router.push(item.userCoupon.useUrl);
            };
            if (item.prizeType == 2) {
                this.$router.push('/personal');
            }
        },
        init() {
            this.loadPrizeList();
            this.loadHasAwardedList();
            this.loadTimes();
        }
    },
    mounted() {
        this.init();
    }
};
</script>
<style lang="less" scoped>
@import '~styles/_style';
.big-wheel {
    position: relative;
    .color-purple{
        color: #6557B2;
    }
    .color-yellow{
        color: #E08E0E;
    }
    .color-dark-purple{
        color: #423B60;
    }
    .color-light-purple{
        color: #8172CC;
    }

    .color-chance {
        color: #DC888A;
    }
    .color-fe {
        color: rgba(255,255,255,.5);
    }
    .biwheel-top {
        position: relative;
        padding-top: 150px;
        .top-title {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            z-index: 1;
            background: url('~assets/imgs/integral-mall/big-wheel-top-bg.png'), url('~assets/imgs/integral-mall/big-wheel-top-bg-base.jpg');
            background-size: 100% auto;
        }
        .chance {
            display: inline-block;
            position: relative;
            z-index: 2;
            padding: 3px 15px 3px 15px;
            background: rgba(0, 0, 0, .3);
            border-radius: 15px;
            color: #D8CBF1;
        }
    }
    .wheel-con {
        position: relative;
        z-index: 2;
        background: url('~assets/imgs/integral-mall/big-wheel-bg-base.jpg') no-repeat center;
        background-size: 100% 100%;
        .big-wheel-cavans {
            // padding: 20px;
            position: relative;
            height: 360px;
            width: 360px;
            z-index: 2;
            margin: 0 auto;
            background-size: 92% 92%;
            background-repeat: no-repeat;
            background-position: center;
            animation: big-wheel infinite .6s;
            #cavans {
                display: block;
                margin: 0 auto;
                position: relative;
                z-index: 1;
                transform: rotate(0deg) scale(.5,.5);
            }
            .click-dicect {
                position: absolute;
                z-index: 2;
                left: 50%;
                margin-left: -40px;
                height: 80px;
                width: 80px;
                top: 50%;
                margin-top: -40px;
                img{
                    width: 100%;
                    height: auto;
                    margin-top: -50px;
                }
                button{
                    display: block;
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top:0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: transparent;
                }
            }
        }
        .wheel-bottom {
            position: relative;
            z-index: 1;
            width: 100%;
            margin-top: -80px;
            overflow: hidden;
            .stands {
                height: 120px;
                width: auto;
                margin-right: -15%;
            }
            .gift {
                position: absolute;
                width: 50px;
                left: 0;
            }
        }
    }
    .wheel-gift {
        background: url('~assets/imgs/integral-mall/gift-list-bg.jpg') no-repeat center;
        background-size: 100% 100%;
        padding: 15px;
        .gift-title {
            span {
                margin: 0 15px;
                background: linear-gradient(to bottom, #E0C25B, #CA6841);
                -webkit-background-clip: text;
                color: transparent;
            }
            img {
                width: 15px;
                height: auto;
            }
        }
        .whell-list-box {
            padding: 20px 0;
            .to-use {
                display: block;
                width: 60px;
                height: 34px;
                background: #F84071;
                line-height: 34px;
            }
            .disabled {
                background: #574999;
                color: #6557B2;
            }
        }
    }
    .wheel-main{
        position: relative;
        z-index: 1;
    }
    .alert-result{
        position: fixed;
        left: 0;
        right: 0;
        top:0;
        bottom: 0;
        z-index: 2;
        .mask{
            position: fixed;
            background: rgba(0,0,0,.5);
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            z-index: 1;
        }
        .snow{
            position: absolute;
            z-index: 3;
            top:0;
            animation: award 1 2s;
            width: 100%;
            height: 50%;
        }
        .main{
            position: relative;
            z-index: 2;
            width: 270px;
            height: 296px;
            background:rgba(255,255,255,1);
            border-radius: 7px;
            .bg-burple{
                background: #6E58B7;
            }
            .other-award{
                background: url('~assets/imgs/integral-mall/other-doudou-bg.png') no-repeat center;
                background-size: 100% auto;
            }
            .one-dou{
                background: url('~assets/imgs/integral-mall/one-doudou-bg.png') no-repeat center;
                background-size: 100% 100%;
            }
            .bottom{
                padding: 0 0 0 0;
                .bottom-des{
                    padding: 33px 0;
                }
                .to-use{
                    height: 50px;
                    line-height: 50px;
                    border-top: 1px solid #E4E2EA;
                }
            }
            .close{
                position: absolute;
                font-size: 35px;
                width: 100%;
                bottom: -70px;
                z-index: 3;
            }
            .award-detail{
                position: relative;
                .award-text{
                    width: 176.5px;
                    height: 86.5px;
                    position: absolute;
                    left: 50%;
                    margin-left: -88.26px;
                    top: 50%;
                    margin-top: -43.25px;
                    padding-left: 40px;
                    .price{
                        position: absolute;
                        width: 42.5px;
                        height: 42.5px;
                        background: #FB4F53;
                        border-radius: 100%;
                        right: -15px;
                        line-height: 12px;
                        top:-15px;
                    }
                }
                img{
                    height: 80px;
                    width: auto;
                }
            }
        }
    }
}

@keyframes big-wheel {
    from {
        background: url('~assets/imgs/integral-mall/big-wheel-bg1.png') no-repeat center;
        background-size: 92% 92%;
    }
    to {
        background: url('~assets/imgs/integral-mall/big-wheel-bg2.png') no-repeat center;
        background-size: 92% 92%;
    }
}
@keyframes award {
    from {
        background: url('~assets/imgs/integral-mall/alert-bg-01.png') no-repeat center;
        background-size: 80% auto;
        background-position-y: 0;
        display: block;
    }
    to {
        background: url('~assets/imgs/integral-mall/alert-bg-01.png') no-repeat center;
        background-size: 80% auto;
        background-position-y: 100px;
        display: none;
    }

}
</style>
