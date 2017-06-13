import request from './request.js';
import api_file from 'services/api.file';
import Q from 'q';

export default {
    getCraftsmans: function(data) {
        var url = '/api/wechatBusinessMarketing/listCraftsmen';
        return request(url, data, 'post');
    },
    searchItem: function(data) {
        var url = '/api/serviceItem/search';
        if (data && data.query) {
            for (var i = 0; i < data.query.length; i++) {
                if (!data.query[i].value) {
                    data.query.splice(i, 1);
                    i--;
                }
            };
            return request(url, data, 'post');
        }
    },
    searchCoupon: function(data) {
        var url = '/api/ticketDefine/searchTicketDefines';
        if (data && data.query) {
            for (var i = 0; i < data.query.length; i++) {
                if (!data.query[i].value) {
                    data.query.splice(i, 1);
                    i--;
                }
            };
            return request(url, data, 'post');
        }
    },
    deleteItem: function(id) {
        var url = '/api/serviceItem/' + id;
        return request(url, null, 'delete');
    },
    deleteCoupon: function(id) {
        var url = '/api/ticketDefine/' + id;
        return request(url, null, 'delete');
    },
    getCraftsman: function(merchantId, craftsmanId) {
        var url = `/api/wechatBusinessMarketing/getCraftsman/${merchantId}/${craftsmanId}`;
        return request(url);
    },
    getServiceItems: function(merchantId) {
        var url = `/api/wechatBusinessMarketing/getServiceItems/${merchantId}`;
        return request(url);
    },
    // 新增手艺人
    saveCraftsman: function(data, imgs) {
        var deferred = Q.defer();
        api_file.uploadImages(imgs).then(function(res) {
            data.personalImageId = res[0].data;
            data.avatarId = res[1].data;
            var method = 'post';
            var url = '/api/wechatBusinessMarketing/createCraftsman';
            request(url, data, method).then(function(res) {
                deferred.resolve(res);
            }, function(err) {
                deferred.reject(err);
            });
        }, function(err) {
            deferred.reject(err);
        });
        return deferred.promise;
    },
    // 更新手艺人
    updateCraftsman: function(data) {
        var deferred = Q.defer();
        var method = 'post';
        var url = '/api/wechatBusinessMarketing/updateCraftsman';
        request(url, data, method).then(function(res) {
            deferred.resolve(res);
        }, function(err) {
            deferred.reject(err);
        });
        return deferred.promise;
    },
    deleteCraftsman: function(craftsmanId) {
        var url = '/api/wechatBusinessMarketing/deleteCraftsman/' + craftsmanId;
        return request(url, null, 'delete');
    }
};
