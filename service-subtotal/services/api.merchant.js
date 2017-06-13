import request from './request.js';
import api_file from 'services/api.file';
import Q from 'q';
import store from 'store';

export default {
    getMerchantInfo(merchantId) {
        var url = `/api/wechatBusinessMarketing/getMerchantInfo/${merchantId}`;
        return request(url);
    },
    updatePassword(data) {
        var url = '/api/authUser/newPassword';
        return request(url, data, 'put', false);
    },
    addFeedBack(data) {
        var url = '/api/wechatBusinessMarketing/feedBack';
        return request(url, data, 'post');
    },
    getProvinces() {
        var url = '/api/administrativeArea/topAreas';
        return request(url);
    },
    getBusinessScope() {
        var url = '/api/businessScope/list';
        return request(url);
    },
    getStoreInfo(storeId) {
        var url = `/api/store/${storeId}`;
        return request(url);
    },
    getAreaByCode(code) {
        var url = `/api/administrativeArea/areas/${code}`;
        return request(url);
    },
    getBusinessArea(code) {
        var url = `/api/businessArea/list/${code}`;
        return request(url);
    },
    updateStoreInfo(data, imgs) {
        var deferred = Q.defer();
        var updata = data;
        api_file.uploadImages(imgs).then(function(res) {
            data.logoId = res[0].data;
            data.storeImageId = res[1].data;
            var url = '/api/wechatBusinessMarketing/updateStoreAndLogo';
            request(url, data, 'post').then(function(res) {
                store.commit('UPDATE_STORE_DETAIL', updata);
                deferred.resolve(res);;
            }, function(err) {
                deferred.reject(err);
            });
        }, function(err) {
            deferred.reject(err);
        });
        return deferred.promise;
    },
    merchantRegister(data) { // 申请入驻
        var url = '/api/wechatBusinessMarketing/merchantRegister';
        return request(url, data, 'post');
    },
    unbind(data) { // 解绑
        var url = '/api/wechatbusinessassists/unbind';
        return request(url, data, 'post');
    }
};
