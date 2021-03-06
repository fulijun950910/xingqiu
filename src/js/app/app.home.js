/**
 * Created by wzc on 16/8/2.
 */
app.home = {
    init: function() {

    }
}

//微信ajax加载窗
app.startLoading = function(msg) {
        var msg = msg || '数据加载中';
        if (!($('#loadingToast').length > 0)) {
            var loadingHtml = '';
            loadingHtml += '<div id="loadingToast" class="weui_loading_toast" style="display:none;">';
            loadingHtml += '<div class="weui_mask_transparent"></div>';
            loadingHtml += '<div class="weui_toast">';
            loadingHtml += '<div class="weui_loading">';
            loadingHtml += '<div class="weui_loading_leaf weui_loading_leaf_0"></div>';
            loadingHtml += '<div class="weui_loading_leaf weui_loading_leaf_1"></div>';
            loadingHtml += '<div class="weui_loading_leaf weui_loading_leaf_2"></div>';
            loadingHtml += '<div class="weui_loading_leaf weui_loading_leaf_3"></div>';
            loadingHtml += '<div class="weui_loading_leaf weui_loading_leaf_4"></div>';
            loadingHtml += '<div class="weui_loading_leaf weui_loading_leaf_5"></div>';
            loadingHtml += '<div class="weui_loading_leaf weui_loading_leaf_6"></div>';
            loadingHtml += '<div class="weui_loading_leaf weui_loading_leaf_7"></div>';
            loadingHtml += '<div class="weui_loading_leaf weui_loading_leaf_8"></div>';
            loadingHtml += '<div class="weui_loading_leaf weui_loading_leaf_9"></div>';
            loadingHtml += '<div class="weui_loading_leaf weui_loading_leaf_10"></div>';
            loadingHtml += '<div class="weui_loading_leaf weui_loading_leaf_11"></div>';
            loadingHtml += '</div>';
            loadingHtml += '<p class="weui_toast_content">' + msg + '</p>';
            loadingHtml += '</div></div>';
            $('body').append(loadingHtml);
        }
        $('#loadingToast').show();
    }
    //关闭ajax加载窗
app.endLoading = function() {
    $('#loadingToast').hide();
}

//微信alert弹窗
app.alert = function(msg, title) {
    var msg = msg || '';
    var title = title || '提示';
    var altHtml = '';
    altHtml += '<div class="weui_dialog_alert" id="dialog2" style="display: none;">';
    altHtml += '<div class="weui_mask"></div>';
    altHtml += '<div class="weui_dialog">';
    altHtml += '<div class="weui_dialog_hd"><strong class="weui_dialog_title">' + title + '</strong></div>';
    altHtml += '<div class="weui_dialog_bd">' + msg + '</div>';
    altHtml += '<div class="weui_dialog_ft">';
    altHtml += '<a href="javascript:;" class="weui_btn_dialog primary">确定</a>';
    altHtml += '</div></div></div>';
    $('body').append(altHtml);
    $('#dialog2').show().on('click', '.weui_btn_dialog', function() {
        $('#dialog2').off('click').hide();
        $('#dialog2').remove();
        return true;
    });
}

//微信操作完成透明提示窗口
app.toast = function(msg) {
        var msg = msg || '已完成';
        var toastHtml = '';
        toastHtml += '<div id="toast" style="display: none;">';
        toastHtml += '<div class="weui_mask_transparent"></div>';
        toastHtml += '<div class="weui_toast">';
        toastHtml += '<i class="weui_icon_toast"></i>';
        toastHtml += '<p class="weui_toast_content">' + msg + '</p>';
        toastHtml += '</div>';
        toastHtml += '</div>';
        $('body').append(toastHtml);
        $('#toast').show();
        setTimeout(function() {
            $('#toast').hide();
            $('#toast').remove();
        }, 2000);
    }
    // <div style=" position: fixed; background: #fff;width: 100vw; z-index: 1;height: 46px;line-height: 46px;display: flex; display: -webkit-flex;justify-content: space-around; -webkit-justify-content: space-around;">功能正在拼命开发中，敬请期待~ <i class="ic">&#xe664;</i> </div>
app.noData = function() {
    var toastHtml = '';
    toastHtml += '<div class="error">';
    toastHtml += '<span class="errorText">小美正在为您加班开发中，敬请期待哦~</span>';
    toastHtml += '</div>';
    $('body').append(toastHtml);
    $('.error').addClass('active');
    setTimeout(function() {
        $('.error').removeClass('active');
    }, 2000);
}
app.goBack = function() {
    window.location.href = "/main.html#/index";
}

//微信confirm问询窗
app.confirm = function(msg, title) {
    var msg = msg || '';
    var title = title || '提示';
    var confirmHtml = '';
    confirmHtml += '<div class="weui_dialog_confirm" id="dialog1" style="display: none;">';
    confirmHtml += '<div class="weui_mask"></div>';
    confirmHtml += '<div class="weui_dialog">';
    confirmHtml += '<div class="weui_dialog_hd"><strong class="weui_dialog_title">' + title + '</strong></div>';
    confirmHtml += '<div class="weui_dialog_bd">' + msg + '</div>';
    confirmHtml += '<div class="weui_dialog_ft">';
    confirmHtml += '<a href="javascript:;" class="weui_btn_dialog default">取消</a>';
    confirmHtml += '<a href="javascript:;" class="weui_btn_dialog primary">确定</a>';
    confirmHtml += '</div></div></div>';
    $('body').append(confirmHtml);
    $('#dialog1').show().on('click', '.weui_btn_dialog', function() {
        $('#dialog1').off('click').hide();
        $('#dialog1').remove();
        return true;
    });
}

app.initDate = function(fn) {
    $('.dateList').click(function() {
        $('#dateList').fadeIn(200);
        $('#dateList .mask').addClass('mask_show');
        $('.date_menu').addClass('date_menu_active');
        $('.mask').height($('.bd').height());
        //判断是否有选中active
        if (!$('#dateList span').hasClass('active')) {
            $('#dateList span:first').addClass('active');
        }
    });
    // $('.index').on('click', '.dateList', function() {

    // });
    $('#dateList').on('click', '.mask', function() {
        $('.date_menu').removeClass('date_menu_active');
        $('.mask').removeClass('mask_show');
        $('.cystomDate .date_menu').removeClass('date_menu_active');
        $('.cystomDate .mask').removeClass('mask_show');
        $('#dateList span').removeClass('active').find('i').remove();
        $('#dateList span').eq(parseInt(memberData.dataType) - 1).addClass('active');
    });
    //点击切换日期
    $(' #dateList .date_info').on('click', 'span', function(event) {
        $('#dateList span').removeClass('active').find('i').remove();
        $(this).addClass('active');
        $('#dateList  .mask').click();
        if ($(this).attr('data-type') == 4) {
            setIndexDate();
            $('.cystomDate').fadeIn(200);
            $('.cystomDate .mask').addClass('mask_show');
            $('.cystomDate .date_menu').addClass('date_menu_active');
            $('.cystomDate .mask').height($('.bd').height());
        } else {
            fn;
            // app.index.performance(parseInt($(this).attr('data-type')), 'date');
        }
    });
};
//jssdk
app.JSSignature = {
    getJSSignature: function(settings) {
        app.api.sign.queryWxSignInfo({
            data: {
                url: encodeURIComponent(window.location.href.split('#')[0])
            },
            success: function(results) {
                if (results.success) {
                    if (results.success) {
                        wx.config({
                            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: results.data.appId, // 必填，公众号的唯一标识
                            timestamp: results.data.timestamp, // 必填，生成签名的时间戳
                            nonceStr: results.data.nonceStr, // 必填，生成签名的随机串
                            signature: results.data.signature, // 必填，签名
                            jsApiList: [
                                "onMenuShareTimeline", //分享朋友圈
                                "onMenuShareAppMessage", //分享朋友
                                "openLocation", //使用微信内置地图查看位置
                                "chooseWXPay", //发起一个微信支付请求
                                "hideMenuItems", //隐藏的菜单项
                                "getLocation",
                                "scanQRCode",
                            ]
                        });
                    } else {
                        settings.error();
                    }
                    wx.error(function(res) {

                    });
                    wx.ready(function() {
                        settings.success();
                    });
                } else {
                    settings.error();
                }
            },
            error: function(error) {
                settings.error()
            }
        });
    },
    scanQRCode:function(){
        wx.scanQRCode({
            needResult: 0,
            scanType: ["qrCode","barCode"] // 可以指定扫二维码还是一维码，默认二者都有
        });
    }

}

app.changeTitle = function(title) {
    //修改title值
    var $body = $('body');
    document.title = title;
    var $iframe = $('<iframe src="/favicon.ico"></iframe>');
    $iframe.on('load', function() {
        setTimeout(function() {
            $iframe.off('load').remove();
        }, 0);
    }).appendTo($body);
}

app.getParameter = function (key, url) {
    var href = window.location.search;
    if (url) {
        href = url;
    }
    var index = href.indexOf('?');
    var param = href.substring(index + 1);
    param = param.split('&');
    if (param.length > 0) {
        for (var i = 0; i < param.length; i++) {
            var kv = param[i];
            kv = kv.split('=');
            if (kv[0] == key) {
                return kv[1];
            }
        }
    }
    return '';
}
