<template>
    <div>
        <mt-popup v-model="currentValue" position="bottom" class="datepicker-panel">
            <div layout="row" layout-align="space-between center" class="toolbar">
                <a class="steel-gray picker-btn" flex @click="currentValue = false;">取消</a>
                <a class="picker-btn text-right" flex @click="confirm">确定</a>
            </div>
            <div layout="row" layout-align="space-around center" class="date-content">
                <mt-button @click="showRangeDate('start_date')" plain>{{start_date | amDateFormat(format)}}</mt-button>
                <span>-</span>
                <mt-button @click="showRangeDate('end_date')" plain>{{end_date | amDateFormat(format)}}</mt-button>
            </div>
        </mt-popup>
        <mt-datetime-picker ref="start_date" v-model="start_date" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="confirmRangeDate">
        </mt-datetime-picker>
        <mt-datetime-picker ref="end_date" v-model="end_date" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="confirmRangeDate">
        </mt-datetime-picker>
    </div>
</template>
<script>
import Vue from 'vue';
import {
    Popup,
    Picker,
    Button,
    DatetimePicker
} from 'mint-ui';
Vue.component(Popup.name, Popup);
Vue.component(Picker.name, Picker);
Vue.component(Button.name, Button);
Vue.component(DatetimePicker.name, DatetimePicker);

/**
 * sample:
 * <m-date-range-picker v-model="dateRangeVisible" :start-date.sync="startDate" :end-date.sync="endDate" @confirm="confirm"></m-date-range-picker>
 */
export default {
    name: 'm-date-range-picker',
    data() {
        return {
            changeType: null,
            start_date: null,
            end_date: null
        };
    },
    props: {
        value: Boolean,
        startDate: null,
        endDate: null,
        format: {
            type: String,
            default: 'YYYY-MM-DD'
        }
    },
    mounted() {
        this.start_date = this.$moment(this.startDate ? this.startDate : undefined).toDate();
        this.end_date = this.$moment(this.endDate ? this.endDate : undefined).toDate();
    },
    methods: {
        onValuesChange(picker, values) {
            this.changeItem = values;
        },
        confirmRangeDate(item) {
            this[this.changeType] = this.$moment(item).toDate();
        },
        confirm() {
            var tempStartDate = this.$moment(this.start_date).startOf('day').format('YYYY-MM-DD HH:mm:ss');
            var tempEndDate = this.$moment(this.end_date).endOf('day').format('YYYY-MM-DD HH:mm:ss');
            this.$emit('confirm', tempStartDate, tempEndDate);
            this.$emit('update:startDate', tempStartDate);
            this.$emit('update:endDate', tempEndDate);
            this.currentValue = false;
        },
        showRangeDate(picker) {
            this.changeType = picker;
            this.$refs[picker].open();
        }
    },
    computed: {
        currentValue: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            }
        }
    }
};
</script>
<style lang="less">
@import '~styles/_agile';
.datepicker-panel {
    width: 100%;
    .toolbar {
        border-bottom: 1px solid #eee;
        /*no*/
        .picker-btn {
            padding: 0 @l32;
            line-height: 40px;
            display: block;
            height: 40px;
        }
    }
    .date-content {
        button {
            font-size: @fs28;
            padding: @l24;
            background-color: transparent;
            margin: @l40*2 auto;
        }
    }
}
</style>
