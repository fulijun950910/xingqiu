import request from './request.js';
import Q from 'q';

export default {
    // 上传图片
    uploadImage: function(data) {
        // 如果id存在则返回{data:id}
        let deferred = Q.defer();
        if (!data) {
            deferred.resolve({ data: null });
            return deferred.promise;
        }
        if (data.base64) {
            var tempAry = data.base64.split(',');
            var base64Str = (tempAry.length == 2) ? tempAry[1] : '';
            var url = '/api/file';
            return request(url, {
                content: base64Str,
                contentType: data.origin.type,
                originalName: data.origin.name
            }, 'post');
        } else if (data.id) {
            deferred.resolve({ data: data.id });
        } else {
            deferred.resolve({ data: null });
        }
        return deferred.promise;
    },
    // 上传多张图片
    uploadImages: function(images) {
        var promises = [];
        for (var i = 0; i < images.length; i++) {
            var image = images[i];
            promises.push(this.uploadImage(image));
        }
        return Q.all(promises);
    }
};
