import Vue from 'vue';
import Q from 'q';

export default function(url, data, method, messageFlag = true) {
    var deferred = Q.defer();
    Vue.http({
        url: url,
        body: data,
        method: method,
        timeout: 15000
    }).then(function(res) {
        if (res.data && res.data.success) {
            deferred.resolve(res.data);
        } else {
            Vue.prototype.$indicator.close();
            deferred.reject(res.data);
        }
    }, function(error) {
        Vue.prototype.$indicator.close();
        switch (error.status) {
            case 401:
                if (process.env.NODE_ENV === 'development') {
                    window.$Router.push({ name: 'sign-in' });
                } else {
                    window.location.href = '/userinfo.html#/user_login';
                }
                break;
            case 403:
                break;
            case 404:
                // window.router.push({name: 'error', params: {code: 404}});
                break;
            default:
                deferred.reject(error);
                break;
        }
    });
    return deferred.promise;
};
