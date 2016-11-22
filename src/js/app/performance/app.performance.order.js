/**
 * Created by wzc on 16/7/7.
 */
app.performance.order = {
    page: {
        page: 1,
        size: 10000,
        total: 0
    },
    performance: 0, //业绩
    commission: 0, //提成
    orderId: null,
    currentDay: null,
    destory: function() {
        app.performance.order.page.page = 1;
        app.performance.order.performance = 0;
        app.performance.order.commission = 0;
        $('#total-performance').text('￥0.00');
        $('#total-push').text('￥0.00');
        if (typeof myScroll != 'undefined')
            myScroll.refresh();
    },
    list: function() {
        app.userinfo.getEmployee().then(function(employee) {
            if (employee) {
                app.performance.order.destory();
                var date = null;
                if ($('#order-query-date').val()) {
                    date = $('#order-query-date').val();
                } else {
                    date = new Date();
                    if (app.performance.currentDate == 1) {
                        date.setDate(date.getDate() - 1);
                    } else if (app.performance.order.currentDay) {
                        date = app.performance.order.currentDay;
                    }
                    if (typeof date == undefined || typeof date == 'undefined') {
                        date = new Date();
                    }
                    date = date.format('yyyy/MM/dd');
                    $('#order-query-date').val(date);
                    if (!$('#order-query-date').val()) {
                        $('#order-query-date').val(date.format('yyyy-MM-dd'))
                    }
                }
                // date = $('#order-query-date').val() || date.format('yyyy-MM-dd');
                // if (!$('#order-query-date').val())
                var info = JSON.parse(localStorage.getItem("orderInfo"));
                var data = {
                    type: 2,
                    // ids: employee.id,
                    page: app.performance.order.page.page,
                    size: app.performance.order.page.size,
                    date: date.format('yyyy-MM-dd'),
                    startTime: info.startDate,
                    endTime: info.endDate,
                    //   storeIds: info.storeIds
                }
                //
                if (employee.role == app.constant.WECHAT_BUSINESS[1].code) {
                    data.type = 1;
                    data.ids = info.storeIds;
                    // data.ids = app.performance.currentStoreid;
                } else {
                    data.ids = employee.id;
                }
                if (data.type == 1) {
                    //百度事件统计
                    baiduStatistical.add({ category: '管理员-订单列表', label: '当日订单', val: '', action: 'click' });
                } else {
                    //百度事件统计
                    baiduStatistical.add({ category: '员工-订单列表', label: '当日订单', val: '', action: 'click' });
                }
                app.startLoading();
                app.api.order.list({
                    data: data,
                    success: function(result) {
                        app.endLoading();
                        if (!result.success || !result.data || !result.data.orderListVo) {
                            setTimeout(function() {
                                app.tools.show('order-scroller');
                            }, 200);
                            return;
                        }
                        app.performance.order.page.total = result.data.total;
                        app.performance.order.page.page = parseInt(app.performance.order.page.page) + 1;
                        var data = {
                            datas: result.data.orderListVo
                        }
                        app.performance.order.countPerformance(result.data.orderListVo);
                        var html = $('#tmpl-order-list').html();
                        var template = tmpl(html, data);
                        $('#order-scroller').html(template);
                        app.performance.order.scrollInit();
                        myScroll.refresh();
                    },
                    error: function(error) {
                        app.endLoading();
                    }
                })
            }
        }, function() {});

    },
    detail: function() {
        app.startLoading();
        app.userinfo.getEmployee().then(function(employee) {
            if (employee) {
                var data = {
                        orderId: app.performance.order.orderId,
                        type: '',
                        id: employee.id
                    }
                    //获取当前身份
                    //var urole = app.performance.userrole_init();
                app.performance.userrole_init().then(function(urole) {
                    if (urole == 2) {
                        //员工
                        data.type = 2
                            //百度事件统计
                        baiduStatistical.add({ category: '员工-订单详情', label: '当日订单', val: '', action: 'click' });
                    } else if (urole == 1) {
                        //门店级
                        data.type = 1
                            //百度事件统计
                        baiduStatistical.add({ category: '管理员-订单详情', label: '当日订单', val: '', action: 'click' });
                    }
                    app.api.order.detail({
                        data: data,
                        success: function(result) {
                            app.endLoading();
                            if (false) {
                                var cardData = {
                                    cardInstanceIds: [result.data.orderCardItems[0].cardInstanceForm.cardInstanceId],
                                    orderId: result.data.orderId
                                }
                                cardBalance().then(
                                    cardData,
                                    function(result) {
                                        var html = $('#tmpl-order-detail').html();
                                        var result = tmpl(html, result.data);
                                        $('#order-detail').html(result);
                                    }
                                )
                            } else {
                                var html = $('#tmpl-order-detail').html();
                                var result = tmpl(html, result.data);
                                $('#order-detail').html(result);
                            }


                            function cardBalance() {
                                return {
                                    then: function(data, success, err) {
                                        app.api.order.cardBalance({
                                            data: data,
                                            success: function(res) {
                                                console.log(res)
                                                result.data.cardBalance = res.data.balance
                                                success(result)
                                            }
                                        })
                                    }
                                }
                            }
                            //处理详细数据页面滑动问题
                            myScroll = new IScroll('#wrapper', { probeType: 3, mouseWheel: true, tap: true, click: true });
                        }
                    })
                }, function() {});
            }
        }, function() {});

    },
    chooseOrderId: function(order) {
        app.performance.order.currentDay = new Date($('#order-query-date').val());
        app.performance.order.orderId = order.orderId;
        app.performance.order.order = order;
        location.href = "#/order-detail";
    },
    comment: function(order) {
        var selDate = $('#order-query-date').val();
        if (!selDate || selDate == undefined) {
            selDate = app.performance.order.currentDay;
        }
        app.performance.order.currentDay = selDate;
        app.performance.order.order = order;
        location.href = "#/order-comment";
        app.performance.order.stop();
    },
    orderComment: function() {
        app.performance.order.order.isEditServer = false;
        app.userinfo.getEmployee().then(function(employee) {
            if (employee) {
                //修复页面置顶效果
                window.scrollTo(0, 0);
                var data = {
                    memberId: app.performance.order.order.memberId,
                    merchantId: employee.merchantId
                }
                app.api.order.getTag({
                    data: data,
                    success: function(result) {
                        var res = result;
                        app.api.order.getOrderServer({
                            data: { orderId: app.performance.order.order.orderId },
                            success: function(result) {
                                app.performance.order.order.tags = res.data;
                                if (result.data) {
                                    app.performance.order.order.membertags = result.data.tags;
                                    app.performance.order.order.fileId = result.data.fileId;
                                    if (result.data.orderId) { app.performance.order.order.isEditServer = true; }
                                } else {
                                    app.performance.order.order.membertags = []
                                }
                                var html = $('#tmpl-order-comment').html();
                                var tmplate = tmpl(html, app.performance.order.order);
                                $('#order-comment').html(tmplate);
                            },
                            error: function() {}
                        });
                    },
                    error: function() {

                    }
                })
            }
        }, function() {});

        $('#order-comment').on('click', "#comment-pic", function() {
            $('#comment-file').click();
            $('#comment-file').change(function(dom) {
                app.performance.order.changeImg(dom);
            })
        });
    },
    submitComment: function() {
        if (!$('#comment-content').val()) {
            app.alert("请填写服务小计")
            return;
        }
        app.userinfo.getEmployee().then(function(employee) {
            if (employee) {
                var tagNames = [];
                $.each(app.performance.order.order.membertags, function(i, v) {
                        tagNames.push(v.name);
                    })
                    //修复页面置顶效果
                window.scrollTo(0, 0);
                var data = {
                    fileId: app.performance.order.commentFileId,
                    memberId: app.performance.order.order.memberId,
                    merchantId: employee.merchantId,
                    employeeId: employee.id,
                    remark: $('#comment-content').val(),
                    orderId: app.performance.order.order.orderId,
                    tagNames: tagNames
                }
                app.api.order.comment({
                    data: data,
                    success: function(result) {
                        app.alert('订单评价生成', '操作成功');
                        //跳转到订单列表
                        window.location.href = "performance-index.html#/order-list";
                    },
                    error: function(a, b, c, d) {

                    }
                })
            }
        }, function() {});

    },
    submitTag: function() {
        var name = $('#createTagName').val();
        $('#createTagName').val("");
        if (!name) {
            setTimeout(function() {
                app.alert("请填写标签名");
            }, 200)
            return;
        }
        app.startLoading();
        app.userinfo.getEmployee().then(function(employee) {
            if (employee) {
                //修复页面置顶效果
                window.scrollTo(0, 0);
                var data = {
                    merchantId: employee.merchantId,
                    name: name
                }
                app.api.order.createTag({
                    data: data,
                    success: function(result) {
                        app.endLoading();
                        app.performance.order.loadTag();
                    },
                    error: function(a, b, c, d) {

                    }
                })
            }
        }, function() {});

    },
    tagsChange: function(i) {
        var tag = app.performance.order.order.tags.slice(i)[0];
        app.performance.order.order.membertags.push(tag)
        this.loadCommit();
    },
    merberTagsChange: function(i) {
        app.performance.order.order.membertags.splice(i, 1)[0];
        this.loadCommit();
    },
    loadCommit: function() {
        $("#order-comment .memberTags").empty();
        $.each(app.performance.order.order.membertags, function(i, v) {
            $("#order-comment .memberTags").append("<li>" + v.name + "<i ontouchstart=\"app.performance.order.merberTagsChange(" + i + ")\"" + "><b ></b></i></span></li>")
        });
        $("#order-comment .tags ul").empty();
        $.each(app.performance.order.order.tags, function(i, v) {
            $("#order-comment .tags ul").append("<li ontouchstart=\"app.performance.order.tagsChange(" + i + ")\"" + ">" + v.name + "</li>")

        });
    },
    loadTag: function() {
        app.userinfo.getEmployee().then(function(employee) {
            if (employee) {
                var data = {
                    memberId: app.performance.order.order.memberId,
                    merchantId: employee.merchantId
                }
                app.api.order.getTag({
                    data: data,
                    success: function(result) {
                        app.performance.order.order.tags = result.data;
                        $("#order-comment .tags ul").empty();
                        $.each(app.performance.order.order.tags, function(i, v) {
                            $("#order-comment .tags ul").append("<li ontouchstart=\"app.performance.order.tagsChange(" + i + ")\"" + ">" + v.name + "</li>")

                        });
                    },
                    error: function() {

                    }
                })
            }
        }, function() {});
    },
    stop: function() {
        var e = document;
        if (e && e.preventDefault)
            e.preventDefault();
        else
            window.event.returnValue = false;
        if (e && e.stopPropagation)
            e.stopPropagation();
        else
            window.event.cancelBubble = true;
        return false;
    },
    fenToYuan: function(money) {
        if (!money)
            return '0.00';
        var m = parseFloat(money) / 100;
        return m;
    },
    leftDay: function(dom) {
        app.performance.order.destory();
        var $this = $(dom).parent().find('input');
        var nowDate = new Date($this.val());
        nowDate = new Date(nowDate.valueOf() - 1 * 24 * 60 * 60 * 1000);
        nowDate = nowDate.format('yyyy-MM-dd');
        $this.val(nowDate);
        app.performance.order.list();
    },
    nextDay: function(dom) {
        app.performance.order.destory();
        var $this = $(dom).parent().find('input');
        var nowDate = new Date($this.val());
        nowDate = new Date(nowDate.valueOf() + 1 * 24 * 60 * 60 * 1000);
        nowDate = nowDate.format('yyyy-MM-dd');
        $this.val(nowDate);
        app.performance.order.list();
    },
    changeDay: function() {
        app.performance.order.destory();
        app.performance.order.list();
    },
    changeImg: function(file) {
        if (!file || !file.files || file.files.length <= 0)
            return;
        console.log($("#comment-file"));
        var files = $(file)[0].files[0];
        $("#comment-file").localResizeIMG({
            width: 300,
            quality: .8,
            ele: file,
            success: function(result) {
                console.log(result)
                var content = result.clearBase64;
                var myImage = {
                    content: content,
                    contentType: files.type,
                    originalName: files.name
                };
                app.startLoading();
                // if (!dom || !dom.files || dom.files.length <= 0)
                //     return;
                // var file = dom.files[0];
                // var reader = new FileReader();
                // reader.readAsDataURL(file);
                // reader.onload = function (evt) {
                //     var content = evt.target.result;
                //     var tempAry = content.split(",");
                //     var base64Str = (tempAry.length == 2) ? tempAry[1] : "";
                //     var myImage = {
                //         content: base64Str,
                //         contentType: file.type,
                //         originalName: file.name
                //     };
                //     app.startLoading();
                app.api.userinfo.uploadFile({
                    data: myImage,
                    success: function(result) {
                        if (result.success && result.data) {
                            app.performance.order.commentFileId = result.data;
                            var url = app.filePath + result.data;
                            $('#comment-pic').attr('src', url);
                            app.endLoading();
                        }
                        app.endLoading();
                    },
                    error: function(res) {
                        app.alert("图片过大")
                        app.endLoading();
                    }
                });
            }
        })
    },
    scrollInit: function() {

        myScroll = new IScroll('#order-wrapper', { probeType: 3, mouseWheel: true, tap: true, click: true });
        myScroll.on('scrollEnd', function() {
            //var s = this.y;
            //if (s < 0)
            //    app.performance.order.loadList();
        });

        // myScroll.refresh();
    },
    loadList: function() {
        app.userinfo.getEmployee().then(function(employee) {
            if (employee) {
                if (app.performance.order.page.total <= $('.orderList').length)
                    return;

                var data = {
                    type: 2,
                    ids: employee.id,
                    page: app.performance.order.page.page,
                    size: app.performance.order.page.size,
                    date: $('#order-query-date').val()
                }
                if (employee.role == app.constant.WECHAT_BUSINESS[1].code) {
                    data.type = 1;
                    data.ids = employee.storeIds
                }
                app.startLoading();
                app.api.order.list({
                    data: data,
                    success: function(result) {
                        app.endLoading();
                        if (!result.success || !result.data)
                            return;
                        app.performance.order.page.total = result.data.total;
                        app.performance.order.page.page = parseInt(app.performance.order.page.page) + 1;
                        var data = {
                            datas: result.data.orderListVo
                        }
                        app.performance.order.countPerformance(result.data.orderListVo);
                        var html = $('#tmpl-order-list').html();
                        var template = tmpl(html, data);
                        $('#order-list').append(template);
                        app.performance.order.scrollInit();
                    },
                    error: function(error) {
                        app.endLoading();
                    }
                })
            }
        }, function() {});

    },
    countPerformance: function(data) {
        for (var i in data) {
            var orderVo = data[i];
            app.performance.order.performance = parseInt(app.performance.order.performance) + parseInt(orderVo.performance);
            app.performance.order.commission = parseInt(app.performance.order.commission) + parseInt(orderVo.commission);
        }
        $('#total-performance').text('￥' + app.performance.order.fenToYuan(app.performance.order.performance));
        $('#total-push').text('￥' + app.performance.order.fenToYuan(app.performance.order.commission));
    }
}
