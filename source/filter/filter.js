import Vue from 'vue';

import {
    BASE_IMG_PATH,
    GENDERS as _genders
} from 'config/mixins';

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

/*
 *1 服务小计 2客户关怀
 */
Vue.filter('messageType', (value) => {
    let text = null;
    switch (value) {
        case 1:
            text = '服务小记';
            break;
        case 2:
            text = '客户关怀';
            break;
    }
    return text;
});

/**
 * 性别过滤器
 */
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

/**
 * 图片路径过滤（宽高）
 */
Vue.filter('nSrc', function(value, def) {
    if (value) {
        if (isNaN(Number(value))) {
            return value;
        } else {
            return `${BASE_IMG_PATH + value}`;
        }
    }
    return def;
});

/**
 * 图片路径过滤（宽高）
 */
Vue.filter('mSrc', function(value, w, h, def) {
    if (value) {
        if (isNaN(Number(value))) {
            return value;
        } else {
            return `${BASE_IMG_PATH + value}/${w}/${h}`;
        }
    }
    return def;
});

Vue.filter('mSrc2', function(value, def, q = 75) {
    if (value) {
        if (isNaN(Number(value))) {
            return value;
        } else {
            return BASE_IMG_PATH + `${value}/${q}`;
        }
    }
    return def;
});
/**
 * 图片路径过滤（清晰度）
 */
Vue.filter('qSrc', function(value, q, def) {
    if (value) {
        if (isNaN(Number(value))) {
            return value;
        } else if (q) {
            return `${BASE_IMG_PATH + value}/${q}`;
        } else {
            return `${BASE_IMG_PATH + value}`;
        }
    }
    return def;
});

/**
 * 获取列表name
 */
Vue.filter('getName', function(value, arr) {
    if (value === undefined || value === null || !arr || arr.length < 1) {
        return;
    };
    let obj;
    obj = arr.find((val) => {
        return val.value == value;
    });
    if (obj && obj.name) {
        return obj.name;
    }
});
/**
 * 限制字符串长度
 */
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

Vue.filter('fen2yuan', function(value) {
    if (isNaN(value)) {
        return 0;
    }
    return value / 100;
});

Vue.filter('dou2fen', function(value) {
    if (isNaN(value)) {
        return 0;
    }
    return value / 10;
});

Vue.filter('fen2dou', function(value) {
    if (isNaN(value)) {
        return 0;
    }
    return (value / 100) * 10;
});

Vue.filter('accountType', function(value) {
    if (isNaN(value)) {
        return 0;
    }
    let text = '';
    switch (Number(value)) {
        case 1:
            text = '豆豆账户';
            break;
        case 2:
            text = 'RMN账户';
            break;
    }
    return text;
});

Vue.filter('payStatus', function(value) {
    if (isNaN(value)) {
        return 0;
    }
    let text = '';
    switch (Number(value)) {
        case 0:
            text = '待付款';
            break;
        case 1:
            text = '支付成功';
            break;
        case 2:
            text = '支付失败';
            break;
        case 3:
            text = '支付超时';
            break;
        case 4:
            text = '已取消';
            break;
        case 5:
            text = '已完成';
            break;
        case 6:
            text = '已发货';
            break;
    }
    return text;
});

Vue.filter('statusPay', function(value) {
    if (isNaN(value)) {
        return 0;
    }
    let text = '';
    switch (Number(value)) {
        case 0:
            text = '去支付';
            break;
        case 6:
            text = '确认收货';
            break;
    }
    return text;
});

Vue.filter('introduceStatus', function(value) {
    if (isNaN(value)) {
        return 0;
    }
    let text = '';
    switch (Number(value)) {
        case 0:
            text = '提交成功';
            break;
        case 1:
            text = '审核通过';
            break;
        case 2:
            text = '审核失败';
            break;
        case 3:
            text = '成单';
            break;
        case 4:
            text = '未成单';
            break;
    }
    return text;
});

Vue.filter('userType', function(value) {
    if (isNaN(value)) {
        return 0;
    }
    let text = '';
    switch (Number(value)) {
        case 1:
            text = '商户';
            break;
        case 2:
            text = '员工';
            break;
        case 3:
            text = 'bbs账户';
            break;
        case 4:
            text = 'b2b账户';
            break;
    }
    return text;
});

Vue.filter('tradeType', function(value) {
    if (isNaN(value)) {
        return 0;
    }
    let text = '';
    switch (Number(value)) {
        case 1:
            text = '购买短信';
            break;
        case 2:
            text = '美问周边';
            break;
        case 3:
            text = '购买沙龙入场券';
            break;
        case 4:
            text = '美问周边';
            break;
        case 5:
            text = '超级助手';
            break;
        case 6:
            text = '充值豆豆';
            break;
    }
    return text;
});

// '13871147835' => '138 **** 7835'
Vue.filter('mobile', function(val, isShow) {
    if (!val) {
        return '-';
    }
    val = val.toString().trim();
    if (val.length == 11) {
        if (isShow) {
            return val.substr(0, 3) + ' ' + val.substr(3, 4) + ' ' + val.substr(7, 4);
        } else {
            return val.substr(0, 3) + ' **** ' + val.substr(7, 4);
        }
    } else {
        return '-';
    }
});
