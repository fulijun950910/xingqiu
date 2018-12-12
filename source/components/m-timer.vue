<template>
    <span class="m-timer">
        <span class="m-timer-box" v-show="!!day">
            <span class="count-num">{{day}}</span>天
        </span>
        <span class="m-timer-box"><span class="count-num">{{hour}}</span><span>小时</span></span>
        <span class="m-timer-box"><span class="count-num">{{minute}}</span><span>分</span></span>
        <span class="m-timer-box"><span class="count-num">{{second}}</span><span>秒</span></span>
    </span>
</template>
<script>
export default {
    name: 'm-timer',
    props: ['datetime'],
    data() {
        return {
            day: 0,
            hour: 0,
            minute: 0,
            second: 0
        };
    },
    mounted() {
        this.getRTime();
    },
    methods: {
        getRTime() {
            let timer = setInterval(() => {
                // 截止时间
                var EndTime = this.datetime || new Date();
                if (typeof this.datetime == 'string') {
                    EndTime = new Date(this.datetime.replace(/-/g, '/'));
                }
                var NowTime = new Date();
                var t = EndTime.getTime() - NowTime.getTime();
                if (t <= 0) {
                    window.clearInterval(timer);
                    this.$emit('timeover');
                    return;
                }
                this.day = Math.floor(t / 1000 / 60 / 60 / 24);
                this.hour = Math.floor(t / 1000 / 60 / 60 % 24);
                this.minute = Math.floor(t / 1000 / 60 % 60);
                this.second = Math.floor(t / 1000 % 60);
            }, 1000);
        }
    }
};
</script>

<style scoped lang="less">
    .m-timer {
        font-size: 0;
        .m-timer-box {
            font-size: 14px;
            .count-num {
                text-align: center;
                vertical-align: middle;
                display: inline-block;
                padding: 0 4px;
                margin: 0 2px;
            }
        }
    }
</style>
