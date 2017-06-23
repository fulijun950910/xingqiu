import Vue from 'vue';
import moment from 'moment';

Vue.filter('amDateFormat', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
    return moment(value).format(format);
});
