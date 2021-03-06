// 判断用户是否已经开始扫码
app.startQrcode = -1;
app.automaticQrcode = -1;
app.global_merchantId = null;
app.global_storeId = null;
app.closeFun = null;

/**
 * Created by wzc on 16/7/8.
 */
app.sign = {
    udata: function() {
        //初始化用户信息
        return new Promise(function(resolve, reject) {
            //var user = app.userinfo.getEmployee();
            app.userinfo.getEmployee().then(function(user) {
                resolve({
                    userid: user.id,
                    username: user.name,
                    userRole: user.merchantRole.name,
                    userImg: app.filePath + user.avatarFileId
                });
            }, function() {});
        });

    },
    init: function(merchantId, storeId) {
        var screenHeight = window.screen.height;
        $('body').css('height', screenHeight + 'px');
        app.sign.querySignature().then(function(data) {
            //初始化配置信息
            wx.config({
                debug: false,
                appId: data.appId, // 必填，公众号的唯一标识
                timestamp: data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.nonceStr, // 必填，生成签名的随机串
                signature: data.signature, // 必填，签名，见附录1
                jsApiList: [ // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    'scanQRCode'
                ]
            });
            wx.ready(function() {
                wx.getLocation({
                    type: 'gcj02',
                    success: function(res) {
                        app.sign.latitude = res.latitude;
                        app.sign.longitude = res.longitude;
                        // 如果已经点击过扫码则直接唤起扫码功能
                        if (app.automaticQrcode > -1) {
                            app.sign.checkInOrOut(app.automaticQrcode);
                        }else if (app.startQrcode > -1) {
                            app.sign.openWxsao1sao(app.startQrcode);
                        }
                    }
                });
            })
        }, function(error) {
            console.info('获取认证失败~,请重新跳转');
        });
        app.sign.queryClockInfo(); //初始化打卡信息
        // 判断是否是扫码打卡操作，如果直接微信扫码打开，需弹出选择打开按钮
        if (merchantId) {
            app.global_merchantId = merchantId;
            app.global_storeId = storeId;
            // 弹出打卡选择
            app.confirmSel({
                title: '打卡操作',
                msg: '',
                callback: callback
            });
        }
    },
    queryClockInfo: function(firstResult, maxResult) {
        app.startLoading();
        //展示模板数据
        //var userdata = app.sign.udata();
        app.sign.udata().then(function(userdata) {
            userdata.date = app.tools.getDate();
            userdata.week = app.tools.getWeek();
            userdata.moment = app.tools.getMoment();
            maxResult = 100; //查100条的数据.
            firstResult = firstResult ? firstResult : 0;
            //初始化打开信息
            var data = {
                employeeId: userdata.userid,
                firstResult: firstResult,
                maxResult: maxResult
            }
            app.sign.queryClockin(data).then(function(data) {
                // app.changeTitle('签到考勤');
                //打开信息
                // userdata.signIn = null;
                // userdata.signExit = null;
                // if (data && data.length > 0) {
                //     for (var i in data) {
                //         if (data[i].type == 1) {
                //             userdata.signIn = data[i];
                //         } else if (data[i].type == 0) {
                //             userdata.signExit = data[i];
                //         }
                //     }
                // }
                userdata.signInfo = data.rows;

                var tmplhtml = $('#tmpl-sign-model').html();
                var resultTmpl = tmpl(tmplhtml, userdata);
                $('#tmpl-sign').html(resultTmpl);
                app.sign.dynamicClock();

                //签到，签退初始化操作
                $('#signin').on('click', function() {
                    //事件统计
                    baiduStatistical.add({ category: '打卡', label: '用户签到', val: '', action: 'click' });
                    if (app.sign.latitude && app.sign.longitude) {
                        //调用扫一扫
                        app.sign.openWxsao1sao(1);
                    } else {
                        app.userinfo.alertError('小主，我们正在获取您当前的位置，请稍等!');
                        app.startQrcode = 1;
                        // setTimeout(function() {
                        //     if (app.sign.latitude && app.sign.longitude) {
                        //         app.sign.openWxsao1sao(1);
                        //     } else {
                        //         setTimeout(function() {
                        //             if (app.sign.latitude && app.sign.longitude) {
                        //                 app.sign.openWxsao1sao(1);
                        //             } else {
                        //                 app.userinfo.alertError('小主，当前网络不给力，请再试一次');
                        //             }
                        //         }, 1000);
                        //     }
                        // }, 1000);
                        // app.userinfo.alertError('为了签到成功,请允许我们获取您的位置信息!');
                        //app.userinfo.alertError();
                    }
                });

                //签退
                $('#signexit').on('click', function() {
                    //事件统计
                    baiduStatistical.add({ category: '打卡', label: '用户签退', val: '', action: 'click' });
                    if (app.sign.latitude && app.sign.longitude) {
                        //调用扫一扫
                        app.sign.openWxsao1sao(0);
                    } else {
                        app.userinfo.alertError('小主，我们正在获取您当前的位置，请稍等!');
                        app.startQrcode = 0;
                        // setTimeout(function() {
                        //     if (app.sign.latitude && app.sign.longitude) {
                        //         app.sign.openWxsao1sao(0);
                        //     } else {
                        //         setTimeout(function() {
                        //             if (app.sign.latitude && app.sign.longitude) {
                        //                 app.sign.openWxsao1sao(0);
                        //             } else {
                        //                 app.userinfo.alertError('小主，当前网络不给力，请再试一次');
                        //             }
                        //         }, 1000);
                        //     }
                        // }, 1000);
                        // app.userinfo.alertError('为了签到成功,请允许我们获取您的位置信息!');
                        // app.userinfo.alertError();
                    }
                })
                app.endLoading();
            }, function(error) {
                app.endLoading();
                app.userinfo.alertError(error);
            });

        });
    },
    //查询打卡信息
    queryClockin: function(data) {
        return new Promise(function(resolve, reject) {
            app.startLoading();
            app.api.sign.queryClockin({
                data: data,
                success: function(results) {
                    app.endLoading();
                    //console.info(results);
                    if (results.success) {
                        resolve(results.data);
                    } else {
                        reject(results.message);
                    }
                },
                error: function(error) {
                    app.endLoading();
                    console.info(error);
                    reject(error);
                }
            });
        });
    },
    querySignature: function() {
        return new Promise(function(resolve, reject) {
            app.api.sign.queryWxSignInfo({
                data: {
                    url: encodeURIComponent(window.location.href.split('#')[0])
                },
                success: function(results) {
                    if (results.success) {
                        resolve(results.data);
                    } else {
                        reject(results.message);
                    }
                },
                error: function(error) {
                    reject('查询签名信息异常');
                }
            });
        });
    },
    //签到=1，签退=0
    alertSign: function(time, state, type) {
        // state :  true  false
        var alertimg = '';
        var msg = '';
        if (state) {
            if (type == 1) {
                alertimg = 'images/qiandao.png';
                msg += '<h4 class="msgtimes">您于' + time + '签到成功</h4>';
                msg += '<h4 class="msghint">祝您今天工作顺利</h4>';
            } else if (type == 0) {
                alertimg = 'images/qiantui.png';
                msg += '<h4 class="msgtimes">您于' + time + '签退成功</h4>';
                msg += '<h4 class="msggohome">回家路上注意安全哦</h4>';
            }
        } else {
            alertimg = 'images/qiandaoshibai.png';
            if (type == 1) {
                msg += '<h4 class="msgtimes">亲，本次签到不在签到范围之内</h4>';
            } else if (type == 0) {
                msg += '<h4 class="msgtimes">亲，本次签退不在签到范围之内</h4>';
            }
        }

        $('#alertSign>.signMsg>img').attr('src', alertimg);
        $('#alertSign>.msgcontent').html(msg);
        $('#alertSign').show().on('click', function() {
            $('#alertSign').hide();
        });

    },
    //开启扫一扫功能
    openWxsao1sao: function(type) {
        //初始化成功
        //调用扫一扫
        wx.scanQRCode({
            needResult: 1,
            desc: 'scanQRCode desc',
            success: function(res) {
                app.userinfo.getEmployee().then(function(employee) {
                    var resUrl = window.location.protocol+res.resultStr.slice(res.resultStr.indexOf(':')+1); // 转https
                    var url = resUrl + "&latitude=" + app.sign.latitude + "&employeeId=" + employee.id + "&longitude=" + app.sign.longitude + "&openId=" + employee.openId + "&type=" + type + "&attendanceWay=1";
                    var storeId = app.getParameter('storeId', url);
                    if (employee.storeId != storeId) {
                        app.userinfo.alertError('您在当前门店没有权限签到！请回您所属门店签到！！');
                        return;
                    }
                    $.ajax({
                        url: url,
                        type: 'GET',
                        success: function(results) {
                            if (results) {
                                //重新加载签到信息
                                app.sign.queryClockInfo();
                                //签到成功
                                if(results == 'success') {
                                    app.sign.alertSign(app.tools.getMoment(), true, type);
                                } else {
                                    app.sign.alertSign(app.tools.getMoment(), false, type);
                                }

                            } else {
                                app.userinfo.alertError(results.message);
                            }
                        },
                        error: function(error) {
                            app.userinfo.alertError('打卡失败~请重新登录');
                        }
                    });
                }, function() {})

            },
            error: function(error) {
                console.info(error);
                app.userinfo.alertError('打卡失败~');
            }
        });
    },
    //动态时间效果
    dynamicClock: function() {
        setInterval(function() {
            $('#nowMoment').html(app.tools.getMoment());
        }, 1000);
    },
    formatDate: function(date) {
        return moment(date).format('YYYY-MM-DD');
    },

    formatTime: function(time) {
        return moment(time).format('HH:mm:ss');
    },
    //7天数据
    addDate: function(firstResult) {
        var d = new Date();
        //var curMonthDays = new Date(d.getFullYear(), (d.getMonth() + 1), 0).getDate();
        var curMonthDays = 6;
        var dateList = [];
        for (var i = curMonthDays; i >= 0; i--) {
            dateList.push(moment().subtract(curMonthDays - i, 'days').format('YYYY-MM-DD'));
        }
        return dateList;
    },
    // 微信扫码签到或签退
    checkInOrOut: function(type) {
        var apiUri = window.location.origin + '/api/wechatbusinessassists/attendance?';
        apiUri += 'merchantId=' + app.global_merchantId + '&storeId=' + app.global_storeId;
        // 关闭获取信息
        if (app.closeFun) {
            app.closeFun.close();
        }
        app.userinfo.getEmployee().then(function(employee) {
            var url = apiUri + "&latitude=" + app.sign.latitude + "&employeeId=" + employee.id + "&longitude=" + app.sign.longitude + "&openId=" + employee.openId + "&type=" + type + "&attendanceWay=1";
            var storeId = app.getParameter('storeId');
            if (employee.storeId != storeId) {
                app.userinfo.alertError('您在当前门店没有权限签到！请回您所属门店签到！！');
                return;
            }
            $.ajax({
                url: url,
                type: 'GET',
                success: function(results) {
                    if (results) {
                        //重新加载签到信息
                        app.sign.queryClockInfo();
                        //签到成功
                        if(results == 'success') {
                            app.sign.alertSign(app.tools.getMoment(), true, type);
                        } else {
                            app.sign.alertSign(app.tools.getMoment(), false, type);
                        }
                    } else {
                        app.userinfo.alertError(results.message);
                    }
                },
                error: function(error) {
                    app.userinfo.alertError('打卡失败~请重新登录');
                }
            });
        }, function() {
            alert('签到出错啦~');
        })
    }
}

// 选择打卡回调
var callback = function (result) {
    // 打开加载提示
    if (result == 'startWork') {
        if (app.sign.latitude && app.sign.longitude) {
            // 调用签到接口
            app.sign.checkInOrOut(1);
        } else {
            app.automaticQrcode = 1;
            app.closeFun = app.userinfo.alertError('小主，我们正在获取您当前的位置，请稍等!', 9999);
        }
    } else if (result == 'endWork') {
        if (app.sign.latitude && app.sign.longitude) {
            // 签退
            app.sign.checkInOrOut(0);
        } else {
            app.automaticQrcode = 0;
            app.closeFun = app.userinfo.alertError('小主，我们正在获取您当前的位置，请稍等!', 9999);
        }
    }
}
