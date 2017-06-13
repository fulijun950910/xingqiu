import Vue from 'vue';
import { Toast, Indicator } from 'mint-ui';
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
            Indicator.close();
            if (res.data.message && messageFlag) {
                Toast(res.data.message);
            }
            deferred.reject(res.data);
        }
    }, function(error) {
        switch (error.status) {
            case 401:
            case 403:
                location.href = Vue.prototype.$signLocation;
                break;
            default:
                error.statusText && Toast(error.statusText);
                deferred.reject(error);
                break;
        }
        Indicator.close();
    });
    return deferred.promise;
};
