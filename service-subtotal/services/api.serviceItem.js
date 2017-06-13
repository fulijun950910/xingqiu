import request from './request.js';
import api_file from 'services/api.file';
import Q from 'q';

export default {
    queryServiceItems: (data)=> {
        let url = '/api/wechatBusinessMarketing/getServiceItems/' + data.merchantId;
        return request(url, null, 'get');
    },
    // 新增项目和券
    saveItemAndTicket: (data, image)=> {
        var deferred = Q.defer();
        api_file.uploadImage(image).then(function(res) {
            data.imageFileId = res.data;
            var method = 'post';
            var url = '/api/wechatBusinessMarketing/createItemAndTicket';
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
    // 更新项目
    updateItem: (data, image)=> {
        var deferred = Q.defer();
        api_file.uploadImage(image).then(function(res) {
            data.imageFileId = res.data;
            var url = '/api/serviceItem';
            request(url, data, 'PUT').then(function(res) {
                deferred.resolve(res);
            }, function(err) {
                deferred.reject(err);
            });
        }, function(err) {
            deferred.reject(err);
        });
        return deferred.promise;
    },
    // 更新券
    updateTicketDefine: (data, image)=> {
        var deferred = Q.defer();
        api_file.uploadImage(image).then(function(res) {
            data.imageFileId = res.data;
            var url = '/api/ticketDefine';
            request(url, data, 'PUT').then(function(res) {
                deferred.resolve(res);
            }, function(err) {
                deferred.reject(err);
            });
        }, function(err) {
            deferred.reject(err);
        });
        return deferred.promise;
    },
    // 查询项目详情
    queryServiceItemsDetail: (itemId)=> {
        var deferred = Q.defer();
        let url = '/api/serviceItem/' + itemId;
        request(url, null, 'get').then(function(res) {
            let data = {
                id: res.data.id,
                merchantId: res.data.merchantId,
                name: res.data.name,
                sellingPrice: res.data.sellingPrice / 100,
                originalPrice: res.data.originalPrice / 100,
                serviceDuration: res.data.serviceDuration,
                imageFileId: {id: res.data.imageFileId}
            };
            deferred.resolve(data);
        }, function(err) {
            deferred.reject(err);
        });
        return deferred.promise;
    },
    // 查询券详情
    queryTicketDefineDetail: (itemId)=> {
        var deferred = Q.defer();
        let url = '/api/ticketDefine/' + itemId;
        request(url, null, 'get').then(function(res) {
            let data = {
                id: res.data.id,
                merchantId: res.data.merchantId,
                name: res.data.name,
                sellingPrice: res.data.price / 100,
                serviceDuration: res.data.serviceDuration,
                startTimeType: res.data.startTimeType,
                startDate: res.data.startDate,
                endTimeType: res.data.endTimeType,
                endTimeUnit: res.data.endTimeUnit,
                endTimeAmount: res.data.endTimeAmount,
                payRules: res.data.payRules,
                endDate: res.data.endDate
            };
            deferred.resolve(data);
        }, function(err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
};
