import Vue from 'vue';
import store from 'store';

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
 * 门店名称过滤器
 */
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
/**
 * 获取列表name
 */
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
