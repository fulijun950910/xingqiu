import Vue from 'vue';
import Q from 'q';

export default function(url, data, method, messageFlag = true) {
    var deferred = Q.defer();
    Vue.http({
        url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx46c138ff8b16aa10&redirect_uri=http%3A%2F%2Fassistant.mei1.info%2Fapi%2Fappointment%2F6608412059059456%3F&response_type=code&scope=snsapi_base&state=1#wechat_redirect',
        method: 'get',
        headers: {
            'wechat': 'assistant'
        },
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
        console.log(error.status);
        console.log(process.env.NODE_ENV === 'development');
        switch (error.status) {
            case 401:
                if (process.env.NODE_ENV === 'development') {
                    window.location.href = '#/sign-in';
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
