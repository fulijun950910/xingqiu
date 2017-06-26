import Vue from 'vue';

/**
 *
 * 12345 => $12,345.00
 *
 * @param {String} sign
 * @param {Number} decimals Decimal places
 */
Vue.filter('currency', function(value, currency, decimals) {
    var digitsRE = /(\d{3})(?=\d)/g;
    value = parseFloat(value);
    if (!isFinite(value) || (!value && value !== 0)) return '';
    currency = currency != null ? currency : '￥';
    decimals = decimals != null ? decimals : 2;
    var stringified = Math.abs(value).toFixed(decimals);
    var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
    var i = _int.length % 3;
    var head = i > 0 ? (_int.slice(0, i) + (_int.length > 3 ? ',' : '')) : '';
    var _float = decimals ? stringified.slice(-1 - decimals) : '';
    var sign = value < 0 ? '-' : '';
    return sign + currency + head +
        _int.slice(i).replace(digitsRE, '$1,') +
        _float;
});

/**
 *
 * yyyy/MM/dd => yyyy-MM-dd hh:mm:ss(默认)
 *
 * @param {String} _date
 * @param {String} fmt
 */
Vue.filter('date', function(_date, fmt = 'yyyy-MM-dd hh:mm:ss') {
    if (_date === null || !_date) {
        return;
    };

    var date = _date;
    if (typeof _date != 'object') {
        _date = _date.replace(/-/ig, '/');
        date = new Date(_date);
    }
    var o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    };
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        };
    };
    return fmt;
});
/*
 *1 服务小计 2客户关怀
 */
Vue.filter('messageType', (value) => {
    let text = null;
    switch (value) {
        case 1:
            text = '服务小计';
            break;
        case 2:
            text = '客户关怀';
            break;
    }
    return text;
});
