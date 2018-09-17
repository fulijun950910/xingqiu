<template>
    <div>
        <div class="week-panel"
             layout="column">
            <div class="expand-btn"
                 @click="show"></div>
            <div layout="row"
                 layout-align="space-between center"
                 class="week-content"
                 flex>
                <div class="week-m"
                     @click="show">
                    {{date | amDateFormat('MMM')}}
                </div>
                <div class="week-d"
                     :class="{'week-d-s' : item.isSame(date, 'd')}"
                     v-for="(item, index) in weeks"
                     :key="index"
                     flex
                     @click="weekClick(item)">
                    <div>{{item | amDateFormat('ddd')}}</div>
                    <div>{{item | amDateFormat('D')}}</div>
                </div>
            </div>
        </div>
        <div class="cacendar-panel"
             v-show="visible">
            <div class="ca-mask"
                 @click="hide"></div>
            <transition name="bounce">
                <div v-if="visible"
                     class="content-panel">
                    <div layout="row"
                         layout-align="start center"
                         class="ca-header text-center"
                         @click="hide">
                        <div flex="12-5"
                             class="c-l-item color-black lh-1"
                             @click.stop="backToday">
                            <span class="fs20">今</span>
                            <br/>
                            <span class="fs22">{{today | amDateFormat('YYYY')}}</span>
                            <br/>
                            <span class="fs24">{{today | amDateFormat('M/D')}}</span>
                        </div>
                        <div v-for="(item, index) in weeks"
                             :key="index"
                             class="extra-light-black fs24"
                             flex>{{item | amDateFormat('ddd')}}</div>
                    </div>
                    <div class="ca-content">
                        <div layout="row"
                             v-for="(item, index) in months"
                             :key="index">
                            <div flex="12-5"
                                 class="c-l-item c-l-month">
                                {{item.label}}
                            </div>
                            <div flex
                                 layout="row"
                                 layout-align="start center"
                                 flex-wrap="wrap">
                                <div class="ca-cell"
                                     :class="{'ca-cell-s': day && day.value.isSame(date, 'd')}"
                                     v-for="(day, dayIndex) in item.rows"
                                     :key="dayIndex"
                                     @click="cellClick(day)">
                                    <span v-if="day">{{day.label}}</span>
                                    <span v-else></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
export default {
    name: 'calendar',
    props: {
        visible: {
            type: Boolean,
            default: true
        },
        date: String
    },
    components: {},
    computed: {},
    data() {
        return {
            today: this.$moment().startOf('d'),
            weeks: [],
            months: []
        };
    },
    mounted() {
        this.loadMonths();
    },
    methods: {
        loadMonths(month = 3) {
            this.loadWeeks();
            // 当月
            let date = this.$moment().startOf('M');
            for (let index = 0; index < month; index++) {
                let item = {
                    label: date.format('MMM'),
                    rows: []
                };
                this.loadMonthDays(item.rows, date);
                date.add(1, 'M');
                this.months.push(item);
            }
        },
        loadMonthDays(rows, date) {
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
        },
        loadWeeks(date) {
            let weeks = [];
            let first = this.$moment(date).startOf('w');
            for (let index = 0; index < 7; index++) {
                weeks.push(this.$moment(first));
                first.add(1, 'd');
            }
            this.weeks = weeks;
        },
        show() {
            this.$emit('update:visible', true);
        },
        hide() {
            this.$emit('update:visible', false);
        },
        cellClick(day) {
            if (!day) {
                return;
            }
            this.loadWeeks(day.value);
            let date = day.value.format('YYYY-MM-DD HH:mm:ss');
            this.$emit('update:date', date);
            this.$emit('cellClick', date);
            this.hide();
        },
        backToday() {
            this.cellClick({
                value: this.$moment().startOf('d')
            });
        },
        weekClick(item) {
            this.cellClick({
                value: item
            });
        }
    }
};
</script>
<style lang="less" scoped>
@import '~styles/_agile';
@header-h: 72px;
@item-h: 50px;
@cell-l-w: 12.5%;
@extra-color-1: #7d879c;

.week-panel {
    position: fixed;
    height: @header-h;
    top: 0;
    left: 0;
    right: 0;
    background-color: #fefbff;
    z-index: 2;
    box-shadow:0px 3px 6px 0px rgba(63,62,77,0.09);
}

.expand-btn {
    height: 27px;
    background-color: #fefbff;
}
.week-m {
    width: 60px - 13px;
    font-size: @fs30;
    text-align: center;
    color: @color-black;
    min-height: 100%;
    line-height: 48px;
}
.week-d {
    font-size: @fs24;
    text-align: center;
    color: @dark-gray;
    div {
        position: relative;
        z-index: 1;
    }
    :nth-child(2) {
        border-radius: 50%;
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin: 0 auto;
    }
}
.week-d-s {
    :nth-child(1) {
        color: @color-black;
    }
    :nth-child(2) {
        background-color: @color-black;
    }
}
.cacendar-panel {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 3;
    height: 100vh;
}
.ca-header {
    background-color: #fefbff;
    position: relative;
    z-index: 1;
    height: @header-h;
}
.ca-content {
    position: absolute;
    top: @header-h;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: auto;
    background-color: white;
    z-index: 1;
    color: @extra-color-1;
}
.content-panel {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 30%;
}
.ca-mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: fade(#000, 34%);
}
.c-l-item {
    text-align: center;
}

.c-l-month {
    border-right: 1px solid @bg-gray; /*no*/
    line-height: 45px;
    color: @extra-light-black;
    font-size: 13px;
}
.ca-cell {
    -webkit-flex: 1 1 14.285%;
    flex: 1 1 14.285%;
    max-width: 14.285%;
    max-height: 100%;
    text-align: center;
    min-height: 45px;
    line-height: 45px;
    border-right: 1px solid @bg-gray; /*no*/
    border-bottom: 1px solid @bg-gray; /*no*/
    &-s {
        border-radius: 4px;
        background-color: @extra-color-1;
        color: white;
    }
}
[flex='12-5'] {
    -webkit-flex: 1 1 12.5%;
    flex: 1 1 12.5%;
    max-width: 12.5%;
    max-height: 100%;
}
.lh-1 {
    line-height: 1;
}
.bounce-enter-active {
    animation: bounce-in 0.28s;
}
.bounce-leave-active {
    animation: bounce-out 0.28s reverse;
}
@keyframes bounce-in {
    0% {
        transform: translateY(-100%);
    }
    100% {
        transform: translateY(0%);
    }
}
</style>
