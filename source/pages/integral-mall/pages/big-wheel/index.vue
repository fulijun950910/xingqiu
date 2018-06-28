<template>
<div class="big-wheel">
    <div class="biwheel-top">
        <div class="top-title">             
        </div>
        <div class="chance">
            <m-icon xlink=""></m-icon>10个美豆豆可抽奖一次，今日还剩<span class="color-chance">{{chance}}</span>次机会
        </div>
        <div class="big-wheel-cavans" layout="row" layout-align="center center">
            <canvas id="cavans" height="301" width="301">
                您的浏览器不支持cavans画布
            </canvas>
            <div class="click-dicect" @click="rotateWheel">
                <img :src="require('assets/imgs/integral-mall/wheel-direct.png')" alt="">
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            cavans: null,
            wheelConfig: {
                radius: 150, // 转盘半径
                inCircleRadius: 0, // 用于非零环绕原则的内圆半径
                textRadius: 120, // 外圈文字半径
                subTextRedius: 100, // 内圈文字半径
                imgRedius: 80,
                centerX: 300 / 2,
                centerY: 300 / 2,
                startRadian: 0, // 起始角
                during: 4000, // 旋转时间
                velocity: 10, // 旋转速率
                spinningTime: 0, // 旋转当前时间
                spinTotalTime: 0, // 旋转时间总长
                spinningChange: 0 // 旋转变化峰值
            },
            awrads: [
                {
                    name: '1等奖',
                    color: 'red'
                },
                {
                    name: '2等奖',
                    color: 'yellow'
                },
                {
                    name: '3等奖',
                    color: 'green'
                },
                {
                    name: '4等奖',
                    color: 'black'
                },
                {
                    name: '5等奖',
                    color: 'black'
                },
                {
                    name: '6等奖',
                    color: 'black'
                }
            ],
            chance: 1
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
                let _startRadian = config.startRadian + awardRadian * i;  // 每一个奖项所占的起始弧度
                let _endRadian = _startRadian + awardRadian;     // 每一个奖项的终止弧度

                // 使用非零环绕原则，绘制圆盘
                ctx.save();
                ctx.fillStyle = '#fff';
                ctx.beginPath();
                ctx.arc(canvas.width / 2, canvas.height / 2, config.radius, _startRadian, _endRadian, false);
                ctx.arc(canvas.width / 2, canvas.height / 2, config.inCircleRadius, _endRadian, _startRadian, true);
                ctx.fill();
                ctx.restore();
                // 绘制外圈文字
                ctx.save();
                ctx.font = '16px Helvetica, Arial';
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
                ctx.font = '12px Helvetica, Arial';
                ctx.fillStyle = '#B5ACDB';
                ctx.translate(
                    config.centerX + Math.cos(_startRadian + awardRadian / 2) * config.subTextRedius,
                    config.centerY + Math.sin(_startRadian + awardRadian / 2) * config.subTextRedius
                );
                ctx.rotate(_startRadian + awardRadian / 2 + Math.PI / 2);
                ctx.fillText(awards[i].name, -ctx.measureText(awards[i].name).width / 2, 0);
                ctx.restore();

                // 绘制图片
                ctx.save();
                ctx.font = '12px Helvetica, Arial';
                ctx.fillStyle = '#B5ACDB';
                ctx.translate(
                    config.centerX + Math.cos(_startRadian + awardRadian / 2) * config.imgRedius,
                    config.centerY + Math.sin(_startRadian + awardRadian / 2) * config.imgRedius
                );
                ctx.rotate(_startRadian + awardRadian / 2 + Math.PI / 2);
                let img = new Image();
                img.src = require('assets/imgs/integral-mall/vocher.png');
                ctx.drawImage(img, -ctx.measureText(awards[i].name).width / 2, 0, 30, 30);
                ctx.restore();
            };
            // 绘制指针
            // ctx.save();
            // ctx.translate(150, 150);
            // let img = new Image();
            // img.src = require('assets/imgs/integral-mall/wheel-direct.png');
            // ctx.drawImage(img, 0, 0, 100, 100);
            // ctx.restore();

        },
        rotateWheel() {}
    },
    mounted() {
        this.wheelConfig.spinningTime += 20;
        this.drawCircle();
    }
};
</script>
<style lang="less" scoped>
.big-wheel{
    .color-chance{
        color: #DC888A;
    }
    .biwheel-top{
        background: url('~assets/imgs/integral-mall/big-wheel-bg-base.jpg') no-repeat center;background-size: 100% 100%;
        position: relative;
        padding-top: 180px;
        .top-title{
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            z-index: 1;
            background: url('~assets/imgs/integral-mall/big-wheel-top-bg.png') no-repeat top center;background-size: 100% auto;
        }
        .chance{

        }
    }
    .big-wheel-cavans{
        // padding: 20px;
        position: relative;
        height: 360px;
        width: 360px;
        z-index: 2;
        margin: 0 auto;
        animation: big-wheel infinite .6s;
        #cavans{
            display: block;
            margin: 0 auto;
            position: relative;
            z-index: 1;
        }
        .click-dicect{
            position: absolute;
            z-index: 2;
            left: 50%;
            margin-left: -50px;
            height: 100px;
            width: 100px;
            top:50%;
            margin-top: -100px;
        }
    }

}

@keyframes big-wheel {
    from {background: url('~assets/imgs/integral-mall/big-wheel-bg1.png') no-repeat center;background-size: 100% 100%;}
    to {background: url('~assets/imgs/integral-mall/big-wheel-bg2.png') no-repeat center;background-size: 100% 100%;}
}
</style>

