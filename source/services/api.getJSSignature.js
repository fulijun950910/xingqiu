import request from './request.js';
const wx = require('weixin-js-sdk');
import Q from 'q';

export default {
    getJSSignature(data) {
        var deferred = Q.defer();
        var url = '/api/wechat/signature?url=' + data.url;
        request(url, null, 'get').then(function(res) {
            if (res.success) {
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: res.data.appId, // 必填，公众号的唯一标识
                    timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                    signature: res.data.signature, // 必填，签名
                    jsApiList: [
                        'onMenuShareTimeline', // 分享朋友圈
                        'onMenuShareAppMessage', // 分享朋友
                        'openLocation', // 使用微信内置地图查看位置
                        'chooseWXPay', // 发起一个微信支付请求
                        'hideMenuItems', // 隐藏的菜单项
                        'scanQRCode',
                        'getLocation'
                    ]
                });
                deferred.resolve(res.data);
            }
            deferred.reject(res.data);
        }, function(res) {
            deferred.reject(res.data);
        });
        return deferred.promise;
    },
    hideMenuItems: function() {
        if (wx) {
            wx.hideMenuItems({
                menuList: [
                    'menuItem:share:qq', // 分享到QQ:
                    'menuItem:share:weiboApp', // 分享到Weibo:
                    // 'menuItem:favorite', // 收藏:
                    'menuItem:share:facebook', // 分享到FB:
                    'menuItem:share:QZone', // 分享到 QQ 空间 /
                    'menuItem:copyUrl', //   复制链接:
                    'menuItem:openWithQQBrowser', // 在QQ浏览器中打开
                    'menuItem:openWithSafari' // 在Safari中打开
                ] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
            });
        }
    },
    shareAppMessage: function(settings) {
        if (wx) {
            // 分享到朋友圈
            wx.onMenuShareTimeline({
                title: settings.title, // 分享标题
                desc: settings.desc, // 分享描述
                link: settings.link, // 分享链接
                imgUrl: settings.imgUrl, // 分享图标
                type: settings.type, // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: settings.success,
                cancel: settings.cancel
            });
            // 分享给朋友
            wx.onMenuShareAppMessage({
                title: settings.title, // 分享标题
                desc: settings.desc, // 分享描述
                link: settings.link, // 分享链接
                imgUrl: settings.imgUrl, // 分享图标
                type: settings.type, // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: settings.success,
                cancel: settings.cancel
            });
        }
    },
    scanQRCode: function() {
        wx.scanQRCode({
            needResult: 0,
            scanType: ['qrCode', 'barCode'] // 可以指定扫二维码还是一维码，默认二者都有
        });
    }
};
