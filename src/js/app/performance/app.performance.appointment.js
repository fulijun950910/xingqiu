/**
 * Created by wzc on 16/8/3.
 */
app.performance.appointment = {
    bookingInfoIdName: "booking-wrapper",
    bookingDate: {},
    appointmentId: null,
    initDate: function(type) {
        app.tools.initDate(type, app.performance.appointment.bookingInfoIdName);
        $('.booking_orderlist .dateLists .date_info').on('click', 'span', function(event) {
            $('.dateLists span').removeClass('active').find('i').remove();
            $(this).addClass('active');
            $('.booking_orderlist  .mask').click();
            if ($(this).attr('data-type') == 4) {
                app.tools.setDate(app.performance.appointment.bookingDate);
                $('.cystomDate').fadeIn(200);
                $('.cystomDate .mask').addClass('mask_show');
                $('.cystomDate .date_menu').addClass('date_menu_active');
                $('.cystomDate .mask').height($('.bd').height());
            } else {
                app.performance.appointment.queryAppointmentForDate(parseInt($(this).attr('data-type')), 'date');
            }
        });
    },
    initCystomDate: function(type) {
        app.tools.initCystomDate(type, app.performance.appointment.bookingInfoIdName);
        //确定自定义时间选择
        $('.cystomDate').on('click', '.saveDate', function() {
            $('.booking_orderlist  .mask').click();
            app.performance.appointment.queryAppointmentForDate(4, 'date');
        });
    },
    initStoreList: function() {
        app.tools.initStoreList(app.performance.appointment.bookingInfoIdName);
        //点击切换门店
        $('.booking_orderlist .storeLists .stores').on('click', 'span', function(event) {
            $('.storeLists span').removeClass('active').find('i').remove();
            $(this).addClass('active').append('<i></i>');
            $('.booking_orderlist .storeLists .mask').click();
            app.performance.appointment.queryAppointmentForDate($(this).attr('data-id'), 'storeIds');
        });
    },
    list: function() {
        // var screenHeight = window.screen.height;
        // $('body').css('height', screenHeight + 'px');
        // //日期处理
        // var date = null;
        // if ($('#appointment-query-date').val()) {
        //     date = $('#appointment-query-date').val();
        // } else {
        //     date = new Date();
        //     if (app.performance.currentDate == 1) {
        //         date.setDate(date.getDate() - 1);
        //     } else if (app.performance.order.currentDay) {
        //         date = app.performance.order.currentDay;
        //     }
        //     if (typeof date == undefined || typeof date == 'undefined') {
        //         date = new Date();
        //     }
        //     date = date.format('yyyy/MM/dd');
        //     $('#appointment-query-date').val(date);
        //     if (!$('#appointment-query-date').val()) {
        //         $('#appointment-query-date').val(date.format('yyyy-MM-dd'))
        //     }
        // }
        // // var date = new Date();
        // // date = $('#appointment-query-date').val()||date.format('yyyy-MM-dd');
        // // if (!$('#appointment-query-date').val())
        // //     $('#appointment-query-date').val(date);
        // //获取数据
        // app.performance.appointment.queryAppointmentForDate(date.format('yyyy-MM-dd'));
        app.userinfo.getEmployee().then(function() {
            app.performance.appointment.queryAppointmentForDate('', 'init');
        }, function() {});
    },
    queryAppointmentForDate: function(result, type) {
        var employee = null,
            data = {
                type: 2, //1.门店，2.员工
            };
        app.startLoading();
        if (!localStorage.employee || !JSON.parse(localStorage.employee)) {
            location.href = "/userinfo.html#/user_login";
        } else {
            employee = JSON.parse(localStorage.employee);
        }
        var bookingList = {
            storeIds: employee.storeIds,
            storeList: employee.storeList
        };
        var storeIds = $('.booking_orderlist .storeList .store_name').attr('data-storeId');
        if (storeIds && storeIds.trim()) {
            bookingList.storeId = $('.booking_orderlist .storeList .store_name').attr('data-storeId');
            data.storeIds = $('.booking_orderlist .storeList .store_name').attr('data-storeId');
        } else {
            bookingList.storeId = employee.storeIds;
            data.storeIds = employee.storeIds;
        }
        var dataType = $('.booking_orderlist .dateList .date_name').attr('data-type');
        if (dataType && dataType.trim()) {
            bookingList.dataType = $('.booking_orderlist .dateList .date_name').attr('data-type');
            app.tools.getDateType(bookingList.dataType, data, app.performance.appointment.bookingDate)
        } else {
            bookingList.dataType = 1;
            data.startDate = moment().format('YYYY-MM-DD ') + "00:00:00";
            data.endDate = moment().format('YYYY-MM-DD 23:59:59');
        };
        switch (type) {
            case 'storeIds':
                data.storeIds = result;
                bookingList.storeId = result;
                break;
            case 'date':
                app.tools.getDateType(result, data, app.performance.appointment.bookingDate)
                bookingList.dataType = result;
                break;
            case 'init':
                var performanceInfo = null;
                if (localStorage.performanceInfo && JSON.parse(localStorage.performanceInfo)) {
                    performanceInfo = JSON.parse(localStorage.performanceInfo);
                    bookingList.dataType = performanceInfo.dataType;
                }
                data.storeIds = performanceInfo.performanceStoreIds;
                //自定义
                if (performanceInfo.dataType == 4) {
                    data.startDate = performanceInfo.startDate;
                    data.endDate = performanceInfo.endDate;
                    app.performance.appointment.bookingDate = {
                        startDate: data.startDate,
                        endDate: data.endDate
                    };
                } else {
                    app.tools.getDateType(performanceInfo.dataType, data, app.performance.appointment.bookingDate)
                }
                break;
        };
        if (employee.role == "wechat_business_admin") {
            baiduStatistical.add({ category: '管理员-预约单详情', label: '当日预约', val: '', action: 'click' });
            // data.storeIds = performanceInfo.performanceStoreIds;
            data.type = 1;
            bookingList.flex = 33;

        } else {
            data.storeIds = undefined;
            data.employeeId = employee.id
            baiduStatistical.add({ category: '员工-预约单列表', label: '当日预约', val: '', action: 'click' });
            bookingList.flex = 50;
        }
        app.performance.appointment.queryAppointmentList(data).then(function(result) {
            if (result.data) {
                bookingList.bookingLInfo = result.data;
            } else {
                bookingList.bookingLInfo = [];
            }
            bookingList.storeList = employee.storeList;
            app.endLoading();
            var html = $('#tmpl-appointment-list').html();
            var template = tmpl(html, bookingList);
            //console.info($('#scroller'));
            $('#order-scroller').html(template);
            app.performance.appointment.initDate(bookingList.dataType); //初始化时间
            app.performance.appointment.initStoreList(); //初始化门店
            app.performance.appointment.initCystomDate(bookingList.dataType); //初始化自定义时间       
            //日期选中
            $('.dateLists span').eq(parseInt(bookingList.dataType) - 1).addClass('active');
            //门店选中
            if (employee.storeList.length == 1) {
                $('.booking_orderlist .storeLists .stores-info span').eq(1).addClass('active').append('<i></i>');
                $('.allStore').hide();
            } else {
                if (employee.storeIds == data.storeIds) {
                    $('.booking_orderlist .storeLists .stores span').eq(0).addClass('active').append('<i></i>');
                } else {
                    for (var i = 0, len = bookingList.storeList.length; i < len; i++) {
                        var storeId = bookingList.storeList[i].id;
                        if (storeId == data.storeIds || storeId == parseInt(data.storeIds)) {
                            $('.booking_orderlist .storeLists .stores-info span').eq(i).addClass('active').append('<i></i>');
                            break;
                        }
                    }
                }
            };
            if (employee.role != "wechat_business_admin") {
                $('.booking_orderlist .storeList').hide();
                $('.booking_orderlist .dateList').addClass('border-left');
            }
        }, function() {});
    },
    /*
                    app.userinfo.getEmployee().then(function(employee) {
                            if (employee) {
                                var employee = null;
                                if (!localStorage.employee || !JSON.parse(localStorage.employee)) {
                                    location.href = "/userinfo.html#/user_login";
                                } else {
                                    employee = JSON.parse(localStorage.employee);
                                }
                                var data = {
                                    type: 2, //1.门店，2.员工
                                };
                                var bookingList = {};
                                var storeIds = $('.booking_orderlist .storeList .store_name').attr('data-storeId');
                                if (storeIds && storeIds.trim()) {
                                    bookingList.storeId = $('.booking_orderlist .storeList .store_name').attr('data-storeId');
                                    data.storeIds = $('.booking_orderlist .storeList .store_name').attr('data-storeId');
                                } else {
                                    bookingList.storeId = employee.storeIds;
                                    data.storeIds = employee.storeIds;
                                }
                                var dataType = $('.booking_orderlist .dateList .date_name').attr('data-type');
                                if (dataType && dataType.trim()) {
                                    bookingList.dataType = $('.booking_orderlist .dateList .date_name').attr('data-type');
                                    app.tools.getDateType(bookingList.dataType, data, app.performance.appointment.bookingDate)
                                } else {
                                    bookingList.dataType = 1;
                                    data.startDate = moment().format('YYYY-MM-DD ') + "00:00:00";
                                    data.endDate = moment().format('YYYY-MM-DD HH:mm:ss');
                                };
                                switch (type) {
                                    case 'storeIds':
                                        data.storeIds = result;
                                        bookingList.storeId = result;
                                        break;
                                    case 'date':
                                        app.tools.getDateType(result, data, app.performance.appointment.bookingDate)
                                        bookingList.dataType = result;
                                        break;
                                    case 'init':
                                        var performanceInfo = null;
                                        if (localStorage.performanceInfo && JSON.parse(localStorage.performanceInfo)) {
                                            performanceInfo = JSON.parse(localStorage.performanceInfo);
                                            bookingList.dataType = performanceInfo.dataType;
                                        }
                                        data.storeIds = performanceInfo.performanceStoreIds;
                                        //自定义
                                        if (performanceInfo.dataType == 4) {
                                            data.startDate = performanceInfo.startDate;
                                            data.endDate = performanceInfo.endDate;
                                            app.performance.appointment.bookingDate = {
                                                startDate: data.startDate,
                                                endDate: data.endDate
                                            };
                                        } else {
                                            app.tools.getDateType(performanceInfo.dataType, data, app.performance.appointment.bookingDate)
                                        }
                                        break;
                                };
                                if (employee.role = "wechat_business_admin") {
                                    baiduStatistical.add({ category: '管理员-预约单详情', label: '当日预约', val: '', action: 'click' });
                                    data.storeIds = performanceInfo.performanceStoreIds;

                                } else {
                                    data.storeIds = undefined;
                                    employeeId: employee.id
                                    baiduStatistical.add({ category: '员工-预约单列表', label: '当日预约', val: '', action: 'click' });
                                }

                                app.performance.appointment.queryAppointmentList(data).then(function(result) {
                                    bookingList.bookingLInfo = result;
                                    app.endLoading();
                                    var html = $('#tmpl-appointment-list').html();
                                    var template = tmpl(html, bookingList);
                                    //console.info($('#scroller'));
                                    $('#order-scroller').html(template);
                                    app.performance.appointment.initDate(bookingList.dataType); //初始化时间
                                    app.performance.appointment.initStoreList(); //初始化门店
                                    app.performance.appointment.initCystomDate(bookingList.dataType); //初始化自定义时间       
                                    //日期选中
                                    $('.dateLists span').eq(parseInt(bookingList.dataType) - 1).addClass('active');
                                    //门店选中
                                    if (employee.storeList.length == 1) {
                                        $('.booking_orderlist .storeLists .stores-info span').eq(1).addClass('active').append('<i></i>');
                                        $('.allStore').hide();
                                    } else {
                                        if (employee.storeIds == data.storeIds) {
                                            $('.booking_orderlist .storeLists .stores-info span').eq(0).addClass('active').append('<i></i>');
                                        } else {
                                            for (var i = 0, len = bookingList.storeList.length; i < len; i++) {
                                                var storeId = bookingList.storeList[i].id;
                                                if (storeId == data.storeId || storeId == parseInt(data.storeId)) {
                                                    $('.booking_orderlist .storeLists .stores-info span').eq(i + 1).addClass('active').append('<i></i>');
                                                    break;
                                                }
                                            }
                                        }
                                    };
                                }, function() {});
                            },

    */




    //         app.performance.userrole_init().then(function(urole) {
    //             //获取当前身份
    //             //var urole = app.performance.userrole_init();
    //             if (urole == 2) {
    //                 employeeId: employee.id
    //                     //百度事件统计
    //                 baiduStatistical.add({ category: '员工-预约单列表', label: '当日预约', val: '', action: 'click' });
    //                 //员工,查询当前门店预约订单
    //                 data.type = 2;
    //                 app.performance.appointment.queryAppointmentList(data)
    //                 .then(function(result) {
    //                     console.info(result);
    //                 }, function(error) {
    //                     //异常
    //                 });
    //             }
    //             else if (urole == 1) {
    //                 storeIds: data.storeIds //门店ids,分隔
    //                     //百度事件统计
    //                 baiduStatistical.add({ category: '管理员-预约单详情', label: '当日预约', val: '', action: 'click' });
    //                 //管理者,查询选择门店预约订单
    //                 data.type = 1;
    //                 //   data.storeIds = app.performance.currentStoreid;
    //                 app.performance.appointment.queryAppointmentList(data, bookingList)
    //                 .then(function(res) {
    //                     var bookingList = bookingList;
    //                     bookingList.bookingLInfo = result;
    //                     app.endLoading();
    //                     // if (!result.success || !result.data || result.data.length <= 0) {
    //                     //     app.tools.show('order-scroller');
    //                     //     return false;
    //                     // } else {
    //                     var html = $('#tmpl-appointment-list').html();
    //                     var template = tmpl(html, bookingList);
    //                     //console.info($('#scroller'));
    //                     $('#order-scroller').html(template);
    //                     app.performance.appointment.initDate(bookingList.dataType); //初始化时间
    //                     app.performance.appointment.initStoreList(); //初始化门店
    //                     app.performance.appointment.initCystomDate(bookingList.dataType); //初始化自定义时间       
    //                     //日期选中
    //                     $('.dateLists span').eq(parseInt(bookingList.dataType) - 1).addClass('active');
    //                     //门店选中
    //                     if (employee.storeList.length == 1) {
    //                         $('.booking_orderlist .storeLists .stores-info span').eq(1).addClass('active').append('<i></i>');
    //                         $('.allStore').hide();
    //                     } else {
    //                         if (employee.storeIds == data.storeIds) {
    //                             $('.booking_orderlist .storeLists .stores-info span').eq(0).addClass('active').append('<i></i>');
    //                         } else {
    //                             for (var i = 0, len = bookingList.storeList.length; i < len; i++) {
    //                                 var storeId = bookingList.storeList[i].id;
    //                                 if (storeId == data.storeId || storeId == parseInt(data.storeId)) {
    //                                     $('.booking_orderlist .storeLists .stores-info span').eq(i + 1).addClass('active').append('<i></i>');
    //                                     break;
    //                                 }
    //                             }
    //                         }
    //                     };
    //                     myScroll = new IScroll('#booking-wrapper', { probeType: 3, mouseWheel: true, tap: true, click: true });
    //                 }, function(error) {
    //                     //异常
    //                 });
    //             }
    //         })
    //     }
    // }, function() {});
    //   },
    queryAppointmentList: function(data, bookingList) {
        return new Promise(function(resolve, reject) {
            app.api.appointment.list({
                data: data,
                success: function(result) {

                    //myScroll.refresh();
                    resolve(result);
                    // }
                },
                error: function(error) {
                    app.endLoading();
                    console.info(error);
                    reject('服务器开小差啦~');
                }
            });
        });
    },
    detail: function() {
        var data = {
            appointmentId: app.performance.appointment.appointmentId
        }
        app.api.appointment.find({
            data: data,
            success: function(result) {
                var html = $('#tmpl-appointment-detail').html();
                var template = tmpl(html, result.data);
                $('#appointment_detail').html(template);
            }
        })
    },
    chooseBookingAppointmentId: function(appointmentId) {
        app.performance.appointment.appointmentId = appointmentId;
        location.href = "#/booking-order-detail";
    },
    // leftDay: function(dom) {
    //     var $this = $(dom).parent().find('input');
    //     var nowDate = new Date($this.val());
    //     nowDate = new Date(nowDate.valueOf() - 1 * 24 * 60 * 60 * 1000);
    //     nowDate = nowDate.format('yyyy-MM-dd');
    //     $this.val(nowDate);
    //     app.performance.appointment.list();
    // },
    // nextDay: function(dom) {
    //     var $this = $(dom).parent().find('input');
    //     var nowDate = new Date($this.val());
    //     nowDate = new Date(nowDate.valueOf() + 1 * 24 * 60 * 60 * 1000);
    //     nowDate = nowDate.format('yyyy-MM-dd');
    //     $this.val(nowDate);
    //     app.performance.appointment.list();
    // },
    // changeDay: function() {
    //     app.performance.appointment.list();
    // }
}
