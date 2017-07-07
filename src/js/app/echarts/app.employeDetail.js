app.employeeDetailEcharts = {
    userdata: function() {
        //初始化用户信息
        return new Promise(function(resolve, reject) {
            app.userinfo.getEmployee().then(function(user) {
                resolve(user);
            }, function() {});
        });
    },
    init: function() {
        // 准备查询参数
        var employee = JSON.parse(sessionStorage.employeeParam);
        if (employee) {
            var param = {
                employeeId: sessionStorage.employeeId,
                startDate: employee.startDate,
                endDate: employee.endDate,
                merchantId: employee.merchantId,
                storeId: employee.storeId,
            };
            console.log(param);
            app.employeeDetailEcharts.userdata().then(function(userDate) {
                app.employeeDetailEcharts.getPerformanceDetail(param).then(function(res) {
                    var tmplhtml = $('#tmpl_employeeDetail').html();
                    var resultTmpl = tmpl(tmplhtml, res);
                    $('#employeeDetail').html(resultTmpl);
                }, function(error) {
                    app.alert(error.message || '服务器异常~');
                });
            }, function() {});
        } else {
            app.alert('请重新登陆');
        }
    },
    // 获取绩效详情
    getPerformanceDetail: function(data) {
        return new Promise(function(resolve, reject) {
            app.startLoading();
            app.api.echarts.orderEmployeePerformanceDetail({
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