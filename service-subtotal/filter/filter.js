import Vue from 'vue';
import store from '../store';

import {
    BASE_IMG_PATH,
    GENDERS as _genders
} from 'config/mixins';

Vue.filter('reverse', function(value) {
    return value.split('').reverse().join('');
});

Vue.filter('mStoreName', function(value) {
    if (value) {
        var item = store.state.storeList.find(function(v) {
            return value == v.id;
        });
        if (item) {
            return item.name;
        }
    }
    return value;
});

Vue.filter('mGender', function(value) {
    if (value) {
        var item = _genders.find(function(v) {
            return value == v.value;
        });
        if (item) {
            return item.name;
        }
    }
    return value;
});

Vue.filter('mSrc', function(value, def) {
    if (value) {
        if (isNaN(Number(value))) {
            return value;
        } else {
            return BASE_IMG_PATH + value;
        }
    }
    return def;
});

Vue.filter('mTime', function(second) {
    // 计算小时数
    let hh = Math.trunc(second / 60 / 60);
    if (hh < 10) {
        hh = '0' + hh;
    }
    // 计算分钟
    let MM = (Math.trunc(second / 60) - Math.trunc(Math.trunc(second / 60) / 60) * 60);
    if (MM < 10) {
        MM = '0' + MM;
    }
    // 计算秒数
    let ss = second - (Math.trunc(second / 60) * 60);
    if (ss < 10) {
        ss = '0' + ss;
    }
    return hh + ':' + MM + ':' + ss;
});

Vue.filter('sliceStr', function(str, len) {
    if (str) {
        str += '';
        let realLength = 0;
        let length = str.length;
        let charCode;
        for (let i = 0; i < length; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) {
                realLength += 1;
            } else {
                realLength += 2;
            }
            if (realLength > len) {
                return str.slice(0, i) + '...';
            };
        }
        return str;
    } else {
        return '';
    }
});
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

Vue.filter('fen2yuan', function(value) {
    if (typeof value === 'number') {
        return +Vue.prototype.$big(value).div(100);
    }
    return value;
});

Vue.filter('yuan2fen', function(value) {
    if (typeof value === 'number') {
        return +Vue.prototype.$big(value).mul(100);
    }
    return value;
});

Vue.filter('money', function(money, type) {
    if (!money && money != '0') {
        money = 0;
    };
    let text = (money / 100).toFixed(2) + '';
    if (type) {
        text = type + ' ' + text;
    };
    return text;
});

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

Vue.filter('getMonth', function(date) {
    let fmtDate = Vue.filter('date');
    let thisMonth = fmtDate(new Date(), 'yyyy-MM');
    let dateMonth = fmtDate(date, 'yyyy-MM');
    if (thisMonth == dateMonth) {
        return '本月';
    }
    const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    return months[new Date(date).getMonth()];
});

Vue.filter('fileSrc', function(value) {
    if (value) {
        if (value.base64) {
            return value.base64;
        } else if (value.id) {
            return BASE_IMG_PATH + value.id;
        }
    }
});
// 金额过万显示
Vue.filter('moneyMyriad', function(value) {
    if (value) {
        if (Number(value) >= 10000) {
            return (Number(value) / 10000).toFixed(2) + 'W';
        } else {
            return value;
        }
    } else {
        return value;
    }
});

Vue.filter('getName', function(value, arr) {
    if (value === undefined || value === null || !arr || arr.length < 1) {
        return;
    };
    let obj;
    obj = arr.find((val) => {
        return val.value === value;
    });
    if (obj && obj.name) {
        return obj.name;
    }
});

Vue.filter('verifyPhone', function(val) {
    var regPhone = /^[1][3|4|5|7|8]\d{9}$/;
    return regPhone.test(val);
});

// 验证是不是纯数字
Vue.filter('checkNum', function(val) {
    let reg = /^\d+$/;
    return reg.test(val);
});

// 验证输入的数字是否包含小数点
Vue.filter('checkFloat', function(val) {
    let reg = /^\.$|^\.\d+$|^\d+\.\d*$/;
    return reg.test(val + '');
});
