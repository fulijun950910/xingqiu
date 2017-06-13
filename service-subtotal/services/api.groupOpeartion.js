import request from './request.js';

export default {
    interveneGroupList: function(data) {
        var url = '/api/wechatBusinessMarketing/interveneGroupList/' + data.merchantId;
        return request(url, null, 'get');
    },
    artificialSuccess: function(data) {
        var url = '/api/groupjoin/artificial/success/' + data.groupJoinId;
        return request(url, null, 'get');
    },
    artificialPass: function(data) {
        var url = '/api/groupjoin/artificial/pass/' + data.groupJoinId;
        return request(url, null, 'get');
    }
};
