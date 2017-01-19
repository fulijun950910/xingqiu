app.member = {
    newMemberIdName: "temp-newMember",
    arrivalMemberIdName: "temp-arrivalMember",
    memberDate: {},
    initDate: function(type, idName) {
        app.tools.initDate(type, idName);
        $('.member .dateLists .date_info').on('click', 'span', function(event) {
            $('.dateLists span').removeClass('active').find('i').remove();
            $(this).addClass('active');
            $('.member  .mask').click();
            if ($(this).attr('data-type') == 4) {
                app.tools.setDate(app.member.memberDate);
                $('.cystomDate').fadeIn(200);
                $('.cystomDate .mask').addClass('mask_show');
                $('.cystomDate .date_menu').addClass('date_menu_active');
                $('.cystomDate .mask').height($('.bd').height());
            } else {
                if (idName == app.member.newMemberIdName) {
                    app.member.getNewMembersInfo(parseInt($(this).attr('data-type')), 'date');
                } else {
                    app.member.getConsumersInfo(parseInt($(this).attr('data-type')), 'date');
                }
            }
        });
    },
    initCystomDate: function(type, idName) {
        app.tools.initCystomDate(type, idName);
        //确定自定义时间选择
        $('.cystomDate').on('click', '.saveDate', function() {
            $('.member  .mask').click();
            if (idName == app.member.newMemberIdName) {
                app.member.getNewMembersInfo(4, 'date');
            } else {
                app.member.getConsumersInfo(4, 'date');
            }
        });
    },
    initStoreList: function(idName) {
        app.tools.initStoreList(idName);
        //点击切换门店
        $('.member .storeLists .stores').on('click', 'span', function(event) {
            $('.storeLists span').removeClass('active').find('i').remove();
            $(this).addClass('active').append('<i></i>');
            $('.member .storeLists .mask').click();
              if (idName == app.member.newMemberIdName) {
               app.member.getNewMembersInfo($(this).attr('data-id'), 'storeIds');
            } else {
                app.member.getConsumersInfo($(this).attr('data-id'), 'storeIds');
            }
            
        });
    },
    //获取新增会员信息
    getNewMembersInfo: function(result, type) {
        var employee = null;
        if (localStorage.employee && JSON.parse(localStorage.employee)) {
            employee = JSON.parse(localStorage.employee);
        }
        var data = {
            'merchantId': employee.merchantId,
        }
        var newMember = {
            //门店列表
            storeList: employee.storeList, //门店列表
            storeIds: employee.storeIds
        };
        var storeIds = $('.member .storeList .store_name').attr('data-storeId');
        if (storeIds && storeIds.trim()) {
            newMember.storeId = $('.member .storeList .store_name').attr('data-storeId');
            data.storeIds = $('.member .storeList .store_name').attr('data-storeId');
        } else {
            newMember.storeId = employee.storeIds;
            data.storeIds = employee.storeIds;
        }
        var dataType = $('.member .dateList .date_name').attr('data-type');
        if (dataType && dataType.trim()) {
            newMember.dataType = $('.member .dateList .date_name').attr('data-type');
            app.tools.getDateType(newMember.dataType, data, app.member.memberDate)
        } else {
            newMember.dataType = 1;
            data.startDate = moment().format('YYYY-MM-DD ') + "00:00:00";
            data.endDate = moment().format('YYYY-MM-DD HH:mm:ss');
        }
        switch (type) {
            case 'storeIds':
                data.storeIds = result;
                newMember.storeId = result;
                break;
            case 'date':
                app.tools.getDateType(result, data, app.member.memberDate)
                newMember.dataType = result;
                break;
            case 'init':
                var performanceInfo = null;
                if (localStorage.performanceInfo && JSON.parse(localStorage.performanceInfo)) {
                    performanceInfo = JSON.parse(localStorage.performanceInfo);
                    newMember.dataType = performanceInfo.dataType;
                }
                data.storeIds = performanceInfo.performanceStoreIds;
                //自定义
                if (performanceInfo.dataType == 4) {
                    data.startDate = performanceInfo.startDate;
                    data.endDate = performanceInfo.endDate;
                    app.member.memberDate = {
                        startDate: data.startDate,
                        endDate: data.endDate
                    };
                } else {
                    app.tools.getDateType(performanceInfo.dataType, data, app.member.memberDate)
                }
                break;
        }
        app.member.getNewMembers(data).then(function(memberInfoData) {
                newMember.newMemberInfo = memberInfoData;
                //修改html 的title
                app.changeTitle('新增会员');
                var tmplhtml = $('#tmpl-newMember-model').html();
                var resultTmpl = tmpl(tmplhtml, newMember);
                $('#tmpl-newMember').html(resultTmpl);
                app.member.initDate(newMember.dataType, app.member.newMemberIdName); //初始化时间
                app.member.initStoreList(app.member.newMemberIdName); //初始化门店
                app.member.initCystomDate(newMember.dataType, app.member.newMemberIdName); //初始化自定义时间
                if (data.storeIds == employee.storeIds) {
                    $('.storeLists span:first').addClass('active').append('<i></i>');
                } else {
                    for (var i = 0; i <= newMember.storeList.length - 1; i++) {
                        var storeIds = newMember.storeList[i].id;
                        if (storeIds == data.storeIds || storeIds == parseInt(data.storeIds)) {
                            $('.storeLists .stores-info span').eq(i).addClass('active').append('<i></i>');
                            break;
                        }
                    }
                }
                //日期名称
                $('.dateLists span').eq(parseInt(newMember.dataType) - 1).addClass('active');
                app.member.memberDetailEvent();
            },
            function() {})
    },
    //获取到店会员信息
    getConsumersInfo: function(result, type) {
        var employee = null;
        if (localStorage.employee && JSON.parse(localStorage.employee)) {
            employee = JSON.parse(localStorage.employee);
        }
        var data = {
            'merchantId': employee.merchantId,
        }
        var arrivalMember = {
            //门店列表
            storeList: employee.storeList, //门店列表
            storeIds: employee.storeIds
        };
        var storeIds = $('.arrivalMember .storeList .store_name').attr('data-storeId');
        if (storeIds && storeIds.trim()) {
            arrivalMember.storeId = $('.arrivalMember .storeList .store_name').attr('data-storeId');
            data.storeIds = $('.arrivalMember .storeList .store_name').attr('data-storeId');
        } else {
            arrivalMember.storeId = employee.storeIds;
            data.storeIds = employee.storeIds;
        }
        var dataType = $('.arrivalMember .dateList .date_name').attr('data-type');
        if (dataType && dataType.trim()) {
            arrivalMember.dataType = $('.arrivalMember .dateList .date_name').attr('data-type');
            app.tools.getDateType(arrivalMember.dataType, data, app.member.memberDate)
        } else {
            arrivalMember.dataType = 1;
            data.startDate = moment().format('YYYY-MM-DD ') + "00:00:00";
            data.endDate = moment().format('YYYY-MM-DD HH:mm:ss');
        }
        switch (type) {
            case 'storeIds':
                data.storeIds = result;
                arrivalMember.storeId = result;
                break;
            case 'date':
                app.tools.getDateType(result, data, app.member.memberDate)
                arrivalMember.dataType = result;
                break;
            case 'init':
                var performanceInfo = null;
                if (localStorage.performanceInfo && JSON.parse(localStorage.performanceInfo)) {
                    performanceInfo = JSON.parse(localStorage.performanceInfo);
                    arrivalMember.dataType = performanceInfo.dataType;
                }
                data.storeIds = performanceInfo.performanceStoreIds;
                //自定义
                if (performanceInfo.dataType == 4) {
                    data.startDate = performanceInfo.startDate;
                    data.endDate = performanceInfo.endDate;
                    app.member.memberDate = {
                        startDate: data.startDate,
                        endDate: data.endDate
                    };
                } else {
                    app.tools.getDateType(performanceInfo.dataType, data, app.member.memberDate)
                }
                break;
        }
        app.member.getConsumers(data).then(function(memberInfoData) {
                arrivalMember.arrivalMemberInfo = memberInfoData;
                //修改html 的title
                app.changeTitle('到店客人');
                var tmplhtml = $('#tmpl-arrivalMember-model').html();
                var resultTmpl = tmpl(tmplhtml, arrivalMember);
                $('#tmpl-arrivalMember').html(resultTmpl);
                app.member.initDate(arrivalMember.dataType, app.member.arrivalMemberIdName); //初始化时间
                app.member.initStoreList(app.member.arrivalMemberIdName); //初始化门店
                app.member.initCystomDate(arrivalMember.dataType, app.member.arrivalMemberIdName); //初始化自定义时间
                if (data.storeIds == employee.storeIds) {
                    $('.storeLists span:first').addClass('active').append('<i></i>');
                } else {
                    for (var i = 0; i <= arrivalMember.storeList.length - 1; i++) {
                        var storeIds = arrivalMember.storeList[i].id;
                        if (storeIds == data.storeIds || storeIds == parseInt(data.storeIds)) {
                            $('.storeLists .stores-info span').eq(i).addClass('active').append('<i></i>');
                            break;
                        }
                    }
                }
                //日期名称
                $('.dateLists span').eq(parseInt(arrivalMember.dataType) - 1).addClass('active');
                app.member.memberDetailEvent();
            },
            function() {})
    },
    memberDetailEvent:function(){
        $("#tmpl-arrivalMember .memberImg,#tmpl-newMember .memberImg").tap("",function(e){
            e.stopPropagation();
            app.member.goMembetDetail($(this.ele).attr("data-id"));
        });
    },
    goMembetDetail: function(id) {
        var employee=localStorage.getItem("employee")
        if(employee&&id&&id!=-1){
            employee=JSON.parse(employee)
            employee.member={
                id:id
            }
            employee=JSON.stringify(employee)
            localStorage.setItem("employee",employee)
            location.href = "/serviceLog.html#/member_detail"
        }
    },
    //验券
    userdata: function() {
        //初始化用户信息
        return new Promise(function(resolve, reject) {
            app.userinfo.getEmployee().then(function(user) {
                resolve(user);
            }, function() {});
        });
    },

    init: function() {
        app.member.userdata().then(function(userDate) {
            app.member.getNewMembersInfo("", "init");
        }, function() {})
    },

    initArrivalMember: function() {
        app.member.userdata().then(function(userDate) {
            app.member.getConsumersInfo("", "init");
        }, function() {})
    },

    //新增会员信息
    getNewMembers: function(data) {
        return new Promise(function(resolve, reject) {
            app.startLoading();
            app.api.member.getNewMembers({
                data: data,
                success: function(results) {
                    app.endLoading();
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
    //到店会员信息
    getConsumers: function(data) {
        return new Promise(function(resolve, reject) {
            app.startLoading();
            app.api.member.getConsumers({
                data: data,
                success: function(results) {
                    app.endLoading();
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
    }
}
