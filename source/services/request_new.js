import Vue from 'vue';
import Q from 'q';

export default function(url, method, data, messageFlag = true) {
    var deferred = Q.defer();
    Vue.http({
        url: url,
        body: data,
        method: method,
        headers: {
            'wechat': 'assistant'
        },
        timeout: 15000
    }).then(function(res) {
        if (res.data && res.data.success) {
            // 302 重定向
            if (res.data.code == 302 && res.data.data) {
                window.location.href = res.data.data;
            } else {
                deferred.resolve(res.data);
            }
        } else {
            Vue.prototype.$indicator.close();
            if (messageFlag) {
                if (res.data.message) {
                    Vue.prototype.$toast(res.data.message);
                } else {
                    Vue.prototype.$toast('服务器开小差，请稍后再试');
                }
            }
            deferred.reject(res.data);
        }
    }, function(error) {
        Vue.prototype.$indicator.close();
        switch (error.status) {
            case 401:
                window.location.href = Vue.prototype.$getSignLocation(window.location.search);
                break;
            case 403:
                break;
            case 404:
                // window.router.push({name: 'error', params: {code: 404}});
                break;
            default:
                if (messageFlag) {
                    Vue.prototype.$toast('服务器开小差，请稍后再试');
                }
                deferred.reject(error);
                break;
        }
    });
    return deferred.promise;
};
