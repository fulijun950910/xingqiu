app.serviceLog = {
    //list
    memberServiceData: {
        page:1,
        size:2
    },
    initList:function(){
        app.startLoading();
        this.checkUser();
        app.api.serviceLog.getServiceList({
            data: {
                merchantId:app.serviceLog.employee.merchantId,
                employeeId:app.serviceLog.employee.id
            },
            success: function(res) {
                app.endLoading();
                if(res.success){
                    var html = $('#tmpl_serviceLogList').html();
                    var template = tmpl(html, res.data);
                    $('#tpl_serviceLogList').html(template);
                    app.serviceLog.listEvent();
                }
            },
            error: function() {}
        })
    },
    listEvent:function(){
        $("#tpl_serviceLogList").tap(".serviceCell",function(){
            app.serviceLog.mdmberInfo=$(this.ele).attr("data-member");
            if(app.serviceLog.mdmberInfo){
                app.serviceLog.goDetail();
            }else{
                app.alert("参数错误，请联系管理员")
            }

        });
        $("#tpl_serviceLogList .memberImg").tap("",function(){
            app.serviceLog.goMembetDetail($(this.ele).attr("data-id"));
        });

        app.tools.toTop();
        app.tools.seeImg(".clickImg");
    },
    //detail
    initDetail:function(){
        app.startLoading();
        this.checkUser();
        //获取memberInfo
        if(app.serviceLog.mdmberInfo){//失败跳回list
            if(typeof(app.serviceLog.mdmberInfo)=="string"){
                app.serviceLog.mdmberInfo=JSON.parse(app.serviceLog.mdmberInfo);
            }
        }else {
            this.goList();
        }
        app.api.serviceLog.getMemberServiceList({
            data: {
                merchantId:app.serviceLog.employee.merchantId,
                memberId:app.serviceLog.mdmberInfo.id,
                employeeId:app.serviceLog.employee.id
            },
            success: function(res) {
                if(res.success&&res.data&&res.data.rows){
                    app.endLoading();
                    var data={
                        member:app.serviceLog.mdmberInfo,
                        list:res.data.rows
                    }
                    var html = $('#tmpl_serviceLogDetail').html();
                    var template = tmpl(html, data);
                    $('#tpl_serviceLogDetail').html(template);
                    app.serviceLog.detailEvent();
                }
            },
            error: function() {}
        })
    },
    detailEvent:function(){
        $("#tpl_serviceLogDetail .memberImg").tap("",function(){
            app.serviceLog.goMembetDetail($(this.ele).attr("data-id"));
        });
        app.tools.seeImg(".clickImg");
    },
    detailToComment:function(ele){
        var data=$(ele).attr("data-data")
        if(data){
            data=JSON.parse(data);
            var commentData={
                memberId:data.id,
                memberName:data.name,
                mobile:data.mobile,
                memberGender:data.gender,
                memberAvatarId:data.avatarId,
                memberStoreName:data.storeName
            };
            app.serviceLog.goComment(commentData);
        }else{
            app.alert("参数错误，请联系管理员")
        }
    },
    //search
    initSearchQuery:function(){
        this.initSearch();
        this.initSearchEvent();
    },
    initSearch:function(){
        app.startLoading();
        this.checkUser();
        var text=$("#search").val();
        if(text == ''){
            var html = $('#tmpl_serviceLogSearch').html();
            var template = tmpl(html, []);
            $('#tpl_serviceLogSearch .searchCellBox').html(template);
            app.endLoading();
            app.serviceLog.searchEvent();
            return;
        }
        app.api.serviceLog.searchMember({
            data: {
                merchantId:app.serviceLog.employee.merchantId,
                keywords:text
            },
            success: function(res) {
                app.endLoading();
                if(res.success&&res.data){
                    $.each(res.data,function(i,v){
                        if(v.mobile){
                            v.mobile= v.mobile.slice(0,3)+'****'+v.mobile.slice(7);
                        }
                    });
                    var html = $('#tmpl_serviceLogSearch').html();
                    var template = tmpl(html, res.data);
                    $('#tpl_serviceLogSearch .searchCellBox').html(template);
                    app.serviceLog.searchEvent();
                }
            },
            error: function() {}
        })
    },
    initSearchEvent:function(){
        $("#tpl_serviceLogSearch").on("keydown", "#search", function (e) {
            if(e.keyCode==13){
                app.serviceLog.initSearch();
            }
        });
        $("#tpl_serviceLogSearch").on("touchstart", ".navInput .sousuoiInput,.sousuoBtn", function (e) {
            app.serviceLog.initSearch();
        });
    },
    searchEvent:function(){
        app.tools.toTop();//返回顶部
        $("#tpl_serviceLogSearch .memberImg").tap("",function(e){
            e.stopPropagation();
            app.serviceLog.goMembetDetail($(this.ele).attr("data-id"));
        });
        $("#tpl_serviceLogSearch").tap(".searchCellBox .searchcell", function (e) {
            var data=$(this.ele).attr("data-data")
            if(data){
                data=JSON.parse(data);
                var commentData={
                    memberId:data.id,
                    memberName:data.name,
                    mobile:data.mobile,
                    memberGender:data.gender,
                    memberAvatarId:data.avatarId,
                    memberStoreName:data.storeName
                };
                app.serviceLog.goComment(commentData);
            }else{
                app.alert("参数错误，请联系管理员")
            }
        });

    },
    //会员详情
    initmemberDetail:function(){
        app.startLoading();
        this.checkUser();
        var employee=localStorage.getItem("employee");
        if(employee){
            employee=JSON.parse(employee)
        }
        if(employee&&employee.member&&employee.member.id){
        }else{
            window.history.back();
        }
        app.api.serviceLog.searchMemberDetail({
            data: {
                memberId:employee.member.id
            },
            success: function(res) {
                app.endLoading();
                if(res.success&&res.data){
                    var html = $('#tmpl_memberDetail').html();
                    var template = tmpl(html, res.data);
                    $('#tpl_memberDetail').html(template);
                }else{
                    app.alert(res.message)
                }
                app.serviceLog.memberDetailEvent();
                app.serviceLog.queryLastService(employee);
                app.serviceLog.getMemberService(employee);
            },
            error: function() {}
        })
    },
    queryLastService:function(employee){
        if(!employee.merchant||!employee.merchant.id||employee.merchant.id==-1){
            window.history.back();
            return;
        }
        app.api.serviceLog.lastService({
            data: {
                memberId:employee.member.id,
                merchantId:employee.merchant.id
            },
            success: function(res) {
                app.endLoading();
                if(res.success&&res.data&&res.data.orderItems){
                    res.data.items="";
                    res.data.employees="";
                    //服务项目及技师
                    $.each(res.data.orderItems,function(i,v){
                        if(res.data.items){
                            res.data.items+=", "+v.itemName;
                        }else{
                            res.data.items+=v.itemName;
                        }
                        if(res.data.orderItems[i].orderEmployees&&res.data.orderItems[i].orderEmployees.length>0){
                            $.each(res.data.orderItems[i].orderEmployees,function(i2,v2){
                                if(res.data.employees){
                                    res.data.employees+=", "+v2.employeeName;
                                }else{
                                    res.data.employees+=v2.employeeName;
                                }
                            });
                        }
                    });
                    var html = $('#tmpl_lastSerivce').html();
                    var template = tmpl(html, res.data);
                    $('#serviceNote').html(template);
                }else{
                    //app.alert(res.message)
                }
            },
            error: function() {}
        })
    },
    getMemberService:function(){
        var employee=localStorage.getItem("employee");
        if(employee){
            employee=JSON.parse(employee)
        }
        app.api.serviceLog.getMemberService({
            data: {
                memberId:employee.member.id,
                merchantId:employee.merchant.id,
                page: app.serviceLog.memberServiceData.page,
                rows: app.serviceLog.memberServiceData.size
            },
            success: function(res) {
                app.endLoading();
                if(res.success&&res.data){
                    if(res.data.rows.length < app.serviceLog.memberServiceData.size){
                        $('#temp-memberDetail .memberService_over').show();
                        $('#temp-memberDetail .memberService_more').hide();
                    }else{
                        $('#temp-memberDetail .memberService_over').hide();
                        $('#temp-memberDetail .memberService_more').show();
                    }
                    app.serviceLog.memberServiceData.page++;
                    var html = $('#tmpl_memberService').html();
                    var template = tmpl(html, res.data.rows);
                    $('#tpl_memberService').append(template);
                }
            },
            error: function() {}
        })
    },
    memberDetailEvent:function(){
        app.tools.seeImg(".clickImg");
    },





    goReport: function() {
        location.href = "/main.html#/index";
    },
    goList: function(mdmberId) {
        location.href = "#/serviceLog_list"
    },
    goDetail: function(mdmberId) {
        location.href = "#/serviceLog_detail"
    },
    goMembetDetail: function(id) {
        var employee=localStorage.getItem("employee")
        if(employee&&id){
            employee=JSON.parse(employee)
            employee.member={
                id:id
            }
            employee=JSON.stringify(employee)
            localStorage.setItem("employee",employee)
            location.href = "#/member_detail"
        }
    },
    goSearch: function() {
        location.href = "#/serviceLog_search";
    },
    goComment: function(data) {//跳转写小计
        if(data){
            data=JSON.stringify(data);
        }
        localStorage.setItem("commentData",data);
        location.href = "/performance-index.html#/order-comment";
    },
    checkUser: function() {
        app.serviceLog.employee = localStorage.getItem("employee");
        if (app.serviceLog.employee) {
            app.serviceLog.employee = JSON.parse(app.serviceLog.employee);
            //var employee = app.serviceLog.employee;
            //if (!app.serviceLog.employee.merchant) {
            //    app.serviceLog.goUser();
            //    return;
            //}
            //if (employee.role != app.constant.WECHAT_BUSINESS[0].code && employee.role != app.constant.WECHAT_BUSINESS[1].code) {
            //    app.serviceLog.goReport();
            //    return;
            //}
        } else {
            app.serviceLog.goReport();
        }
    }
}

