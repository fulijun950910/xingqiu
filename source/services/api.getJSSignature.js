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
    openLocation: function(settings) {
        if (wx) {
            wx.openLocation({
                latitude: settings.latitude, // 纬度，浮点数，范围为90 ~ -90
                longitude: settings.longitude, // 经度，浮点数，范围为180 ~ -180。
                name: settings.name, // 位置名
                address: settings.address, // 地址详情说明
                scale: 28, // 地图缩放级别,整形值,范围从1~28。默认为最大
                infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
            });
        }
    },
    wxPay(setting) {
        if (WeixinJSBridge) {   // eslint-disable-line
            let deferred = Q.defer();
            WeixinJSBridge.invoke(  // eslint-disable-line
                'getBrandWCPayRequest', {
                    'appId': setting.appId, // 公众号名称，由商户传入
                    'signType': setting.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    'paySign': setting.paySign, // 支付签名
                    'timeStamp': setting.timeStamp + '', // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    'nonceStr': setting.nonceStr, // 支付签名随机串，不长于 32 位
                    'package': setting.package // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                }, res => {
                    if (res.err_msg == 'get_brand_wcpay_request:ok') {
                        // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠
                        deferred.resolve(res);
                    }
                }, err => {
                    deferred.resolve(err);
                }
            );
            return deferred.promise;
        }
    },
    scanQRCode: function() {
        wx.scanQRCode({
            needResult: 0,
            scanType: ['qrCode', 'barCode'] // 可以指定扫二维码还是一维码，默认二者都有
        });
    }
};
