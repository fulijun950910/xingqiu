import Vue from 'vue';
import moment from 'moment';
require('moment/locale/zh-cn');
Vue.prototype.$moment = moment;

Vue.filter('amDateFormat', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(value).format(format);
});

Vue.filter('fromnow', (value) => {
    return moment(value).startOf('hour').fromNow();
});

Vue.filter('amCalendar', (value, format = 'YYYY-MM-DD', shortFormat = 'MM-DD HH:mm') => {
    var tempValue = moment(value);
    if (tempValue.isValid()) {
        var tempDate = tempValue.calendar(null, {
            sameDay: '[今天] HH:mm',
            nextDay: '[明天] HH:mm',
            nextWeek: 'YYYY-MM-DD HH:mm:ss',
            lastDay: '[昨天] HH:mm',
            lastWeek: 'YYYY-MM-DD HH:mm:ss',
            sameElse: 'YYYY-MM-DD HH:mm:ss'
        });
        if (moment(tempDate, 'YYYY-MM-DD HH:mm:ss', true).isValid()) {
            if (tempValue.isSame(moment(), 'year')) {
                return tempValue.format(shortFormat);
            }
            return tempValue.format(format);
        }
        return tempDate;
    }
    return '';
});
