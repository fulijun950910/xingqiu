<template>
    <div class="asm-my-panel">
        <div class="asm-query-cent"
             layout="row"
             layout-align="start center"
             ref="queryEl">
            <div class="asm-arr-btn"
                 @click="changeDate(-1)">
                <m-icon link="icon-left-bold"></m-icon>
            </div>
            <strong class="fs32">{{params.date | amDateFormat('YYYY.MM')}}</strong>
            <div class="asm-arr-btn"
                 @click="changeDate(1)">
                <m-icon link="icon-right-bold"></m-icon>
            </div>
            <div flex></div>
            <div class="change-btn">
                <m-icon link="icon-qiehuanmoshi"></m-icon>
                <span class="m-l-1">查看数据</span>
            </div>
        </div>
        <div class="asm-cont">
            <div class="asm-card">
                <div class="asm-week-cont"
                     layout="row"
                     flex-wrap="wrap">
                    <div class="asm-date-item"
                         v-for="(item, index) in weeks"
                         :key="index">{{item}}</div>
                </div>
                <div class="asm-day-cont"
                     layout="row"
                     flex-wrap="wrap">
                    <div class="asm-date-item"
                         v-for="(item, index) in days"
                         :key="index">{{item.label}}</div>
                </div>
            </div>
            <div class="asm-card">
                <strong>我的排班</strong>
                <p class="m-t-1"><span class="m-r-4">A班 9:00-18:00</span><span>B班 9:00-18:00</span></p>
            </div>
            <div class="asm-card">
                <strong>打卡记录</strong>
                <p class="m-t-1 m-b-5"><span class="m-r-4">今日工时4小时20分钟</span><span>加班1小时20分钟</span></p>
                <div class="asm-list">
                    <div v-for="(item, index) in 2"
                         :key="index">
                        <p class="m-b-1 color-gray">上班时间09:00</p>
                        <div class="p-b-5">
                            <div class="fs32 m-b-2"><b>打卡时间08:50</b></div>
                            <p>
                                <m-icon link="icon-4"
                                        class="m-r-1"></m-icon>
                                <span class="color-gray">通协路268号</span>
                            </p>
                        </div>
                        <div>
                            <!-- 异常 -->
                            <!-- 异常申请状态 -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'statistics-my',
    mixins: [],
    props: {},
    components: {},
    computed: {},
    data() {
        return {
            today: this.$moment().startOf('d'),
            weeks: [],
            days: [],
            params: {
                date: this.$moment().startOf('M')
            }
        };
    },
    mounted() {
        this.loadWeeks();
        this.loadDays(this.params.date);
    },
    methods: {
        loadWeeks() {
            this.weeks = ['一', '二', '三', '四', '五', '六', '日'];
        },
        loadDays(date) {
            let rows = [];
            let lastDay = date.daysInMonth();
            let weekday = date.weekday();
            for (let index = 0; index < lastDay; index++) {
                let m = this.$moment(date).add(index, 'd');
                rows.push({
                    value: m,
                    label: m.isSame(this.today, 'day') ? '今' : m.format('D')
                });
            }
            for (let index = 0; index < weekday; index++) {
                rows.unshift('');
            }
            let fill = this.$moment(date)
                .endOf('M')
                .isoWeekday();
            fill = 7 - fill;
            for (let index = 0; index < fill; index++) {
                rows.push('');
            }
            this.days = rows;
        },
        changeDate(val) {
            this.params.date.add(val, 'M');
            this.loadDays(this.params.date);
        }
    }
};
</script>
<style lang="less" scoped>
@import '~@/styles/_agile';
.asm-my-panel {
    .asm-query-cent {
        top: 40px;
        left: 0;
        right: 0;
        z-index: 1;
        position: fixed;
        background-color: white;
        box-shadow: 0px 3px 8px 0px rgba(49, 77, 83, 0.28);
        .asm-arr-btn {
            width: 40px;
            line-height: 56px;
            text-align: center;
            font-size: 12px;
        }
    }
    .asm-cont {
        padding: 16px;
        padding-bottom: 80px;
        padding-top: 96+16px;
    }
    .change-btn {
        border: 1px solid @color-black;
        border-radius: 2px; /*no*/
        line-height: 28px;
        padding: 0 8px;
        margin-right: 16px;
        &:active {
            background-color: fade(@color-black, 10%);
        }
    }
    .asm-card {
        background-color: white;
        border-radius: 4px;
        padding: 16px;
        & + .asm-card {
            margin-top: 12px;
        }
    }
    .asm-list {
        padding-left: 20px;
        & > :nth-child(1),
        & > :nth-child(2) {
            position: relative;
            &::before {
                content: '';
                position: absolute;
                left: -20px;
                top: 6px;
                width: 9px;
                height: 9px;
                background-color: @dark-gray;
                border-radius: 50%;
            }
        }
        & > :nth-child(1),
        & > :nth-child(2) {
            &::after {
                content: '';
                position: absolute;
                left: -20+4px;
                top: 6px;
                bottom: 0;
                width: 1px; /*no*/
                background-color: @dark-gray;
            }
        }
        & > :nth-child(2)::after {
            top: 0;
            height: 6px;
            bottom: auto;
        }
    }
    .asm-week-cont {
        .asm-date-item {
            color: @extra-black;
        }
    }
    .asm-date-item {
        -webkit-flex: 1 1 14.285%;
        flex: 1 1 14.285%;
        max-width: 14.285%;
        max-height: 100%;
        text-align: center;
        min-height: 45px;
        line-height: 45px;
        &-s {
            border-radius: 4px;
            background-color: @color-primary;
            color: white;
        }
    }
}
</style>
