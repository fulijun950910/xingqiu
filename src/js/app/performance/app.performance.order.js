/**
 * Created by wzc on 16/7/7.
 */
app.performance.order = {
    orderDate: {},
    orderlIstIdName: "temp-performance-order-list",
    //初始化时间切换
    initDate: function(type) {
        app.tools.initDate(type, app.performance.order.orderlIstIdName);
        $('.order-list .dateLists .date_info').on('click', 'span', function(event) {
            $('.dateLists span').removeClass('active').find('i').remove();
            //  $(this).addClass('active');
            $('.order-list  .mask').click();
            if ($(this).attr('data-type') == 4) {
                app.tools.setDate(app.performance.order.orderDate);
                $('.cystomDate').fadeIn(200);
                $('.cystomDate .mask').addClass('mask_show');
                $('.cystomDate .date_menu').addClass('date_menu_active');
                $('.cystomDate .mask').height($('.bd').height());
            } else {
                app.performance.order.list(parseInt($(this).attr('data-type')), "date");
            }
        });
    },
    initCystomDate: function(type) {
        app.tools.initCystomDate(type, app.performance.order.orderlIstIdName);
        //确定自定义时间选择
        $('.cystomDate').on('click', '.saveDate', function() {
            $('.order-list  .mask').click();
            app.performance.order.list(4, "date");
        });
    },
    initStoreList: function() {
        app.tools.initStoreList(app.performance.order.orderlIstIdName);
        //点击切换门店
        $('.order-list .storeLists .stores').on('click', 'span', function(event) {
            $('.storeLists span').removeClass('active').find('i').remove();
            $(this).addClass('active').append('<i></i>');
            $('.order-list .storeLists .mask').click();
            app.performance.order.list($(this).attr('data-id'), 'storeIds');
        });
    },
    initStatusList: function() {
        app.tools.initTempData('orderLists', app.performance.order.orderlIstIdName);
        //点击排序
        $('.order-list .tempLists .date_info').on('click', 'span', function(event) {
            $('.tempLists span').removeClass('active').find('i').remove();
            $(this).addClass('active');
            $('.order-list  .mask').click();
            app.performance.order.list($(this).attr('data-status'), 'status');
        });
    },
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
        // $('#total-performance').text('￥0.00');
        // $('#total-push').text('￥0.00');
        if (typeof myScroll != 'undefined')
            myScroll.refresh();
    },
    list: function(results, type) {
        var query = {};
        // app.userinfo.getEmployee().then(function(employee) {
        app.performance.order.destory();
        var orderList = {};
        var storeIds = $('.order-list .storeList .store_name').attr('data-storeId');
        query.storeIds = storeIds;
        //dataType
        var dataType = $('.order-list .dateList .date_name').attr('data-type');
        if (dataType && dataType.trim()) {
            orderList.dataType = $('.order-list .dateList .date_name').attr('data-type');
            app.tools.getDateType(orderList.dataType, query, app.performance.order.orderDate)
        } else {
            orderList.dataType = 1;
            query.startDate = moment().format('YYYY-MM-DD ') + "00:00:00";
            query.endDate = moment().format('YYYY-MM-DD HH:mm:ss');
        }
        var status = $('.order-list .orderLists .date_name').attr('data-status');
        query.orderStatus = status || '20';
        switch (type) {
            case 'storeIds':
                query.storeIds = results;
                break;
            case 'date':
                app.tools.getDateType(results, query, app.performance.order.orderDate)
                orderList.dataType = results;
                break;
            case 'status':
                query.orderStatus = results || undefined;
                break;
                //初始第一次页面
            case 'init':
                var employeeInfo = null;
                if (localStorage.performanceInfo && JSON.parse(localStorage.performanceInfo)) {
                    employeeInfo = JSON.parse(localStorage.performanceInfo);
                    orderList.dataType = employeeInfo.dataType;
                }
                query.storeIds = employeeInfo.performanceStoreIds;
                //自定义
                if (employeeInfo.dataType == 4) {
                    query.startDate = employeeInfo.startDate;
                    query.endDate = employeeInfo.endDate;
                    app.performance.order.orderDate = {
                        startDate: query.startDate,
                        endDate: query.endDate
                    };
                } else {
                    app.tools.getDateType(employeeInfo.dataType, query, app.performance.order.orderDate)
                }
                break;
        }
        var data = {
            type: 2, //员工
            page: app.performance.order.page.page,
            size: app.performance.order.page.size,
            startTime: query.startDate,
            endTime: query.endDate,
            orderStatus: query.orderStatus,
            employeeId: employee.id,
            merchantId:employee.merchantId,
            storeIds: query.storeIds
        };
        //管理员
        if (employee.role == app.constant.WECHAT_BUSINESS[1].code) {
            data.type = 1;
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
                    // if (!result.success || !result.data || !result.data.orderListVo) {
                    //     setTimeout(function() {
                    //         app.tools.show('order-scroller');
                    //     }, 200);
                    //     return;
                    // }orderList.datas = result.data.orderListVo;
                    if (result.data) {
                        orderList.datas = result.data.orderListVo;
                    } else {
                        orderList.datas = [];
                    }
                    orderList.storeIds = employee.storeIds;
                    orderList.storeList = employee.storeList;
                    orderList.storeId = query.storeIds;
                    orderList.status = query.orderStatus || undefined;
                    var html = $('#tmpl-order-list').html();
                    var template = tmpl(html, orderList);
                    $('#order-scroller').html(template);
                    if (result.success && result.data && result.data.orderListVo) {
                        app.performance.order.page.total = result.data.total;
                        app.performance.order.page.page = parseInt(app.performance.order.page.page) + 1;
                        app.performance.order.countPerformance(result.data.orderListVo);
                    }
                    app.performance.order.initDate(orderList.dataType);
                    app.performance.order.initCystomDate(orderList.dataType);
                    app.performance.order.initStoreList();
                    app.performance.order.initStatusList();
                    //日期选中
                    $('.dateLists span').eq(parseInt(orderList.dataType) - 1).addClass('active');
                    //门店选中
                    if (employee.storeList.length == 1) {
                        $('.order-list .storeLists .stores-info span').eq(1).addClass('active').append('<i></i>');
                        $('.allStore').hide();
                    } else {
                        if (employee.storeIds == query.storeIds) {
                            $('.order-list .storeLists .stores-info span').eq(0).addClass('active').append('<i></i>');
                        } else {
                            for (var i = 0, len = orderList.storeList.length; i < len; i++) {
                                var storeId = orderList.storeList[i].id;
                                if (storeId == query.storeIds || storeId == parseInt(query.storeIds)) {
                                    $('.order-list .storeLists .stores-info span').eq(i + 1).addClass('active').append('<i></i>');
                                    break;
                                }
                            }
                        }
                    };
                    //状态选中
                    if (!query.orderStatus) {
                        $('.order-list .tempLists .date_info span').eq(0).addClass('active').append('<i></i>');
                    } else {
                        for (var i = 0, len = app.constant.ORDER_TYPE.length; i < len; i++) {
                            var orderStatus = app.constant.ORDER_TYPE[i].code;
                            if (orderStatus == query.orderStatus || orderStatus == parseInt(query.orderStatus)) {
                                $('.order-list .tempLists .date_info span').eq(i).addClass('active').append('<i></i>');
                                break;
                            }
                        }
                    };
                    app.performance.order.memberDetailEvent();
                },
                error: function(error) {
                    app.endLoading();
                }
            })
            // }, function() {});
    },
    detail: function() {
        app.startLoading();
        app.userinfo.getEmployee().then(function(employee) {
            if (employee) {
                //没ordeerid返回list
                if(!app.performance.order.orderId){
                    location.href = "/performance-index.html#/order-list"
                }
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
                                                result.data.cardBalance = res.data.balance
                                                success(result)
                                            }
                                        })
                                    }
                                }
                            }
                            app.performance.order.memberDetailEvent();
                            //处理详细数据页面滑动问题
                            myScroll = new IScroll('#wrapper', { probeType: 3, mouseWheel: true, tap: true, click: true });
                        }
                    })
                }, function() {});
            }
        }, function() {});

    },
    memberDetailEvent:function(){
        $("#order-scroller .memberImg,#order-detail .memberImg,#order-comment .memberImg").on("click",function(e){
            e.stopPropagation();
            app.member.goMembetDetail($(this).attr("data-id"));
        });
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
        app.performance.order.commentFileId=null;
        location.href = "#/order-comment";
        app.performance.order.stop();
        //重置写小计FIle
        app.performance.order.order = order;
    },
    orderComment: function() {
        if(!app.performance.order.order){//非订单跳入
            var commentData=localStorage.getItem("commentData");
            if(commentData){
                commentData=JSON.parse(commentData);
                app.performance.order.order=commentData;
            }
            app.performance.order.order.commentType=1;//1 评价技师
        }else{
            app.performance.order.order.isEditServer = false;
            app.performance.order.order.commentType=0;//0评价订单
        }

        app.userinfo.getEmployee().then(function(employee) {
            if (employee) {
                //修复页面置顶效果
                window.scrollTo(0, 0);
                var data = {
                    memberId: app.performance.order.order.memberId,
                    merchantId: employee.merchantId
                }
                app.api.order.getTag({//查询标签池
                    data: data,
                    success: function(result) {
                        var res = result;
                        if(app.performance.order.order.commentType==1){//判断是否评价订单
                            app.api.serviceLog.searchMemberDetail({
                                data: { memberId: app.performance.order.order.memberId },
                                success: function(result) {
                                    app.performance.order.order.tags = res.data;
                                    if (result.data) {
                                        app.performance.order.order.membertags = result.data.tags;
                                    } else {
                                        app.performance.order.order.membertags = []
                                    }
                                    var html = $('#tmpl-order-comment').html();
                                    var tmplate = tmpl(html, app.performance.order.order);
                                    $('#order-comment').html(tmplate);

                                    app.tools.initTempData("addTagsBtn","order-comment");
                                    //app.performance.order.memberDetailEvent();
                                    app.tools.seeImg(".memberImg");
                                },
                                error: function() {}
                            });

                        }else{
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

                                    app.tools.initTempData("addTagsBtn","order-comment");
                                    //app.performance.order.memberDetailEvent();
                                    app.tools.seeImg(".memberImg");
                                },
                                error: function() {}
                            });
                        }

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
                };
                app.api.order.comment({
                    data: data,
                    success: function(result) {
                        app.alert('订单评价生成', '操作成功');
                        //跳转到订单列表
                        if(app.performance.order.order.commentType==1){//判断跳转来源
                            window.location.href = "serviceLog.html#/serviceLog_list";
                        }else{
                            window.location.href = "performance-index.html#/order-list";
                        }
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
                        if(result.success){
                            app.performance.order.order.membertags.push({
                                id:result.data,
                                name: name
                            });
                            app.performance.order.loadTag();
                            app.performance.order.loadCommit();
                            app.performance.order.hideTagBox();
                        }else{
                            app.alert(result.message)
                        }
                    },
                    error: function(a, b, c, d) {
                        app.endLoading();
                    }
                })
            }
        }, function() {});

    },
    hideTagBox:function(){
        $('#order-comment').find('.date_menu').removeClass('date_menu_active');
        $('#order-comment').find('.mask').removeClass('mask_show');
    },
    tagsChange: function(i) {
        var tag = app.performance.order.order.tags.slice(i)[0];
        app.performance.order.order.membertags.push(tag)
        this.loadCommit();
        this.hideTagBox();
    },
    merberTagsChange: function(i) {
        app.performance.order.order.membertags.splice(i, 1)[0];
        this.loadCommit();
    },
    loadCommit: function() {
        $("#order-comment .memberTags").empty();
        $.each(app.performance.order.order.membertags, function(i, v) {
            $("#order-comment .memberTags").append("<li class='li"+app.tools.tagColor(i,6)+"' >" + v.name + "<i ontouchstart=\"app.performance.order.merberTagsChange(" + i + ")\"" + "><b ></b></i></span></li>")
        });
        $("#order-comment .tagList ul").empty();
        $.each(app.performance.order.order.tags, function(i, v) {
            if(v.name){
                $("#order-comment .tagList ul").append("<li class='li"+app.tools.tagColor(i,6)+"' ontouchstart=\"app.performance.order.tagsChange(" + i + ")\"" + ">" + v.name + "</li>")
            }
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
                        $("#order-comment .tagList ul").empty();
                        $.each(app.performance.order.order.tags, function(i, v) {
                            if(v.name){
                                $("#order-comment .tagList ul").append("<li class='li"+app.tools.tagColor(i,6)+"' ontouchstart=\"app.performance.order.tagsChange(" + i + ")\"" + ">" + v.name + "</li>")
                            }
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
    // leftDay: function(dom) {
    //     app.performance.order.destory();
    //     var $this = $(dom).parent().find('input');
    //     var nowDate = new Date($this.val());
    //     nowDate = new Date(nowDate.valueOf() - 1 * 24 * 60 * 60 * 1000);
    //     nowDate = nowDate.format('yyyy-MM-dd');
    //     $this.val(nowDate);
    //     app.performance.order.list();
    // },
    // nextDay: function(dom) {
    //     app.performance.order.destory();
    //     var $this = $(dom).parent().find('input');
    //     var nowDate = new Date($this.val());
    //     nowDate = new Date(nowDate.valueOf() + 1 * 24 * 60 * 60 * 1000);
    //     nowDate = nowDate.format('yyyy-MM-dd');
    //     $this.val(nowDate);
    //     app.performance.order.list();
    // },
    // changeDay: function() {
    //     app.performance.order.destory();
    //     app.performance.order.list();
    // },
    changeImg: function(file) {
        if (!file || !file.files || file.files.length <= 0)
            return;
        var files = $(file)[0].files[0];
        $("#comment-file").localResizeIMG({
            width: 800,
            quality: .9,
            ele: file,
            success: function(result) {
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
        //重置初始化
        app.performance.order.performance = 0;
        app.performance.order.commission = 0;
        for (var i in data) {
            var orderVo = data[i];
            app.performance.order.performance = parseInt(app.performance.order.performance) + parseInt(orderVo.performance);
            app.performance.order.commission = parseInt(app.performance.order.commission) + parseInt(orderVo.commission);
        }
        // $('#total-performance').text('￥' + app.performance.order.fenToYuan(app.performance.order.performance));
        // $('#total-push').text('￥' + app.performance.order.fenToYuan(app.performance.order.commission));
        $('#total-performance').find('.performance-priceY').text(app.tools.changePrice(app.performance.order.performance)[0]);
        $('#total-performance').find('.performance-priceF').text(app.tools.changePrice(app.performance.order.performance)[1]);
        $('#total-push').find('.push-priceY').text(app.tools.changePrice(app.performance.order.commission)[0]);
        $('#total-push').find('.push-priceF').text(app.tools.changePrice(app.performance.order.commission)[1]);
    }
}
