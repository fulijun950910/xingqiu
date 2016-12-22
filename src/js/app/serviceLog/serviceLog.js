app.serviceLog = {
    //list
    initList:function(){
        app.startLoading();
        this.checkUser();
        app.api.serviceLog.getServiceList({
            data: {
                merchantId:app.serviceLog.employee.merchantId
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

        })
        app.tools.toTop();
        app.tools.seeImg();
    },
    //detail
    initDetail:function(){
        app.startLoading();
        this.checkUser();
        //获取memberInfo
        if(app.serviceLog.mdmberInfo){//失败跳回list
            app.serviceLog.mdmberInfo=JSON.parse(app.serviceLog.mdmberInfo);
        }else {
            this.goList();
        }
        app.api.serviceLog.getMemberServiceList({
            data: {
                merchantId:app.serviceLog.employee.merchantId,
                memberId:app.serviceLog.mdmberInfo.id
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
        app.tools.seeImg();
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
    initSearch:function(){
        app.startLoading();
        this.checkUser();
        var text=$("#search").val();
        app.api.serviceLog.searchMember({
            data: {
                merchantId:app.serviceLog.employee.merchantId,
                keywords:text
            },
            success: function(res) {
                app.endLoading();
                if(res.success&&res.data){
                    var html = $('#tmpl_serviceLogList').html();
                    var template = tmpl(html, res.data);
                    $('#tpl_serviceLogList .searchCellBox').html(template);
                }
                app.serviceLog.searchEvent();
            },
            error: function() {}
        })
    },
    searchEvent:function(){
        app.tools.toTop();//返回顶部
        $("#tpl_serviceLogList").on("keydown", "#search", function (e) {
            if(e.keyCode==13){
                app.serviceLog.initSearch();
            }
        });
        $("#tpl_serviceLogList").on("touchstart", ".navInput .sousuoiInput,.sousuoBtn", function (e) {
            app.serviceLog.initSearch();
        });
        $("#tpl_serviceLogList").tap(".searchCellBox .searchcell", function (e) {
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

    goReport: function() {
        location.href = "/main.html#/index";
    },
    goList: function(mdmberId) {
        location.href = "#/serviceLog_list"
    },
    goDetail: function(mdmberId) {
        location.href = "#/serviceLog_detail"
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

