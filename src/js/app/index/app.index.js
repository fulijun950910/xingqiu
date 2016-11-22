   //初始化门店切换
   function initStoreList() {
       //展开门店选择
       $('.index').on('click', '.storeList', function() {
           $('.storeLists').fadeIn(200);
           $('.storeLists .mask').addClass('mask_show');
           $('.stores').addClass('stores-active');
           $('.mask').height($('.bd').height());
       });
       //关闭门店选择
       $('.index .storeLists').on('click', '.mask', function() {
           $('.stores').removeClass('stores-active');
           $('.storeLists .mask').removeClass('mask_show');
       });
       //点击切换门店
       $('.index .storeLists .stores').on('click', 'span', function(event) {
           $('.storeLists span').removeClass('active').find('i').remove();
           $(this).addClass('active').append('<i></i>');
           $('.index .storeLists .mask').click();
           app.index.performance($(this).attr('data-id'), 'storeIds');
       });
   };

   function initDate() {
       $('.index').on('click', '.dateList', function() {
           $('#dateList').fadeIn(200);
           $('#dateList .mask').addClass('mask_show');
           $('.date_menu').addClass('date_menu_active');
           $('.mask').height($('.bd').height());
           //判断是否有选中active
           if (!$('#dateList span').hasClass('active')) {
               $('#dateList span:first').addClass('active');
           }
       });
       $('.index #dateList').on('click', '.mask', function() {
           $('.date_menu').removeClass('date_menu_active');
           $('#dateList .mask').removeClass('mask_show');
       });
       //点击切换日期
       $('.index #dateList .date_info').on('click', 'span', function(event) {
           $('#dateList span').removeClass('active').find('i').remove();
           $(this).addClass('active');
           $('.index #dateList .mask').click();
           app.index.performance(parseInt($(this).attr('data-type')), 'date');
       });
   };

   function initEemployee() {
       $('.index').on('click', '.employeeRoleList ', function() {
           $('#employeeList').fadeIn(200);
           $('#employeeList .mask').addClass('mask_show');
           $('.employeeList_menu').addClass('employee_menu_active');
           $('.mask').height($('.bd').height());
       });
       $('.index #employeeList').on('click', '.mask', function() {
           $('.employeeList_menu').removeClass('employee_menu_active');
           $('#employeeList .mask').removeClass('mask_show');
       });
       $('.index #employeeList ').on('click', '.employee_item', function(event) {
           $('#employeeList .employee_item').removeClass('active').find('i').remove();
           $('.index #employeeList .mask').click();
           var data = {
               userId: parseInt($(this).attr('data-userId')),
               employeeId: parseInt($(this).attr('data-employeeId'))
           }
           var merchantId = parseInt($(this).attr('data-merchantId'));
           app.index.bind(data).then(function(result) {
               var listEmployeeStoreListData = {
                       employeeId: data.employeeId,
                       merchantId: merchantId
                   }
                   // var openId = result.data;
               app.index.listEmployeeStoreList(listEmployeeStoreListData).then(function(result) {
                   app.index.getEmployee(data.userId).then(function(employeeInfo) {
                       var employee = employeeInfo;
                       //employee.openId = openId;
                       for (var j in employee) {
                           if (employee[j].id == data.employeeId) {
                               employee = employee[j];
                               employee.storeList = result;
                               break;
                           }
                       }
                       var storeIds = [];
                       for (var o in result) {
                           storeIds.push(result[o].id);
                       }
                       employee.storeIds = storeIds.join(',');
                       for (var j in employee.merchantRole.permissionPackage.permissions) {
                           var permission = employee.merchantRole.permissionPackage.permissions[j];
                           if (permission == app.constant.WECHAT_BUSINESS[1].code) {
                               employee.role = app.constant.WECHAT_BUSINESS[1].code;
                               break;
                           } else if (permission == app.constant.WECHAT_BUSINESS[2].code) {
                               employee.role = app.constant.WECHAT_BUSINESS[2].code;
                               break;
                           } else {
                               employee.role = null;
                           }
                       }
                       //员工登录
                       app.api.userinfo.emplogin({
                           data: {
                               empid: data.employeeId
                           },
                           success: function(results) {
                               if (results && results.success) {
                                   window.localStorage.employee = JSON.stringify(employee);
                                   app.index.performance();
                               } else {
                                   app.alert('切换失败');
                               }
                           },
                           error: function() { app.alert('切换失败'); }
                       });
                   }, function() { app.alert('切换失败'); });
               }, function() { app.alert('切换失败'); });
           }, function() { app.alert('切换失败'); })
       });
   };

   function getDateName(code) {
       if (!code)
           return "今日";
       var data = [];
       data[1] = "今日";
       data[2] = "昨天";
       data[3] = "本月";
       return data[code];
   };
   //初始化日期
   app.index = {
       userdata: function() {
           //初始化用户信息
           return new Promise(function(resolve, reject) {
               app.userinfo.getEmployee().then(function(user) {
                   resolve(user);
               }, function() {});
           });
       },
       init: function() {
           app.index.userdata().then(function(userDate) {
               if (!sessionStorage.employeeList) {
                   app.index.getEmployee(JSON.parse(localStorage.employee).userId).then(function(employeeList) {
                       window.sessionStorage.setItem('employeeList', JSON.stringify(employeeList));
                       app.index.performance();
                   }, function() {})
               } else {
                   app.index.performance();
               }
           }, function() {})
       },
       performance: function(result, type) {
           var employee = null;
           if (localStorage.employee && JSON.parse(localStorage.employee)) {
               employee = JSON.parse(localStorage.employee);
           }
           console.log(employee);
           var data = {
               'merchantId': employee.merchantId,
               'employeeId': employee.id,
           }
           var memberData = {
               //门店列表
               storeList: employee.storeList,
               storeIds: employee.storeIds
           };
           var storeIds = $('.index .storeList .store_name').attr('data-storeId');
           if (storeIds && storeIds.trim()) {
               memberData.storeId = $('.index .storeList .store_name').attr('data-storeId');
               data.storeIds = $('.index .storeList .store_name').attr('data-storeId');
           } else {
               memberData.storeId = employee.storeIds;
               data.storeIds = employee.storeIds;
           }
           //  }
           var dataType = $('.index .dateList .date_name').attr('data-type');
           if (dataType && dataType.trim()) {
               memberData.dataType = $('.index .dateList .date_name').attr('data-type');
               switch (parseInt(memberData.dataType)) {
                   //今日
                   case 1:
                       data.startDate = moment().format('YYYY-MM-DD ') + "00:00:00";
                       data.endDate = moment().format('YYYY-MM-DD hh:mm:ss');
                       break;
                       //昨天
                   case 2:
                       data.startDate = moment().subtract(1, "days").format('YYYY-MM-DD ') + "00:00:00";
                       data.endDate = moment().subtract(1, "days").format('YYYY-MM-DD ') + "59:59:59";
                       break;
                       //本月
                   case 3:
                       data.startDate = moment().subtract(0, "month").startOf("month").format('YYYY-MM-DD ') + "00:00:00";
                       data.endDate = moment().subtract(0, "month").endOf('month').format('YYYY-MM-DD ') + "59:59:59";
                       break;
               }
           } else {
               memberData.dataType = 1;
               data.startDate = moment().format('YYYY-MM-DD ') + "00:00:00";
               data.endDate = moment().format('YYYY-MM-DD hh:mm:ss');
           }
           switch (type) {
               case 'storeIds':
                   data.storeIds = result;
                   // data.storeId = result;
                   memberData.storeId = result;
                   break;
               case 'date':
                   switch (result) {
                       //今日
                       case 1:
                           data.startDate = moment().format('YYYY-MM-DD ') + "00:00:00";
                           data.endDate = moment().format('YYYY-MM-DD hh:mm:ss');
                           break;
                           //昨天
                       case 2:
                           data.startDate = moment().subtract(1, "days").format('YYYY-MM-DD ') + "00:00:00";
                           data.endDate = moment().subtract(1, "days").format('YYYY-MM-DD ') + "59:59:59";
                           break;
                           //本月
                       case 3:
                           data.startDate = moment().subtract(0, "month").startOf("month").format('YYYY-MM-DD ') + "00:00:00";
                           data.endDate = moment().subtract(0, "month").endOf('month').format('YYYY-MM-DD ') + "59:59:59";
                           break;
                   }
                   memberData.dataType = result;
                   break;
           }
           data.storeId = parseInt(data.storeIds);
           //普通员工
           var tmplhtml;
           app.index.performanceReport(data, employee.role).then(function(performanceInfoData) {
               if (employee.role == "wechat_business_normal") {
                   tmplhtml = $('#tmpl-index-normal-model').html();
               } else if (employee.role == "wechat_business_admin") {
                   tmplhtml = $('#tmpl-index-admin-model').html();
               }
               memberData.performanceInfo = performanceInfoData;
               //业绩
               memberData.performanceInfo.performance = app.tools.toThousands(memberData.performanceInfo.performance).split('.');
               memberData.performanceInfo.performanceY = memberData.performanceInfo.performance[0];
               memberData.performanceInfo.performanceF = memberData.performanceInfo.performance[1];
               //卡耗
               memberData.performanceInfo.cardConsume = app.tools.toThousands(memberData.performanceInfo.cardConsume).split('.');
               memberData.performanceInfo.cardConsumeY = memberData.performanceInfo.cardConsume[0];
               memberData.performanceInfo.cardConsumeF = memberData.performanceInfo.cardConsume[1];
               //业绩 currentMonthCommission
               memberData.performanceInfo.currentMonthCommission = app.tools.toThousands(memberData.performanceInfo.currentMonthCommission).split('.');
               memberData.performanceInfo.currentMonthCommissionY = memberData.performanceInfo.currentMonthCommission[0];
               memberData.performanceInfo.currentMonthCommissionF = memberData.performanceInfo.currentMonthCommission[1];
               memberData.employeeList = JSON.parse(sessionStorage.employeeList);
               resultTmpl = tmpl(tmplhtml, memberData);
               $('#tmpl-index').html(resultTmpl);
               if (memberData.employeeList.length > 1) {
                   $('.index .employeeRoleList').show();
                   initEemployee();
               }
               initStoreList();
               initDate();
               if (employee.storeList.length == 1) {
                   if (employee.role != "wechat_business_normal") {
                       $('.storeLists span:first').remove();
                   }
                   $('.index .storeList').find('.store_name').text(memberData.storeList[0].name);
               } else {
                   $('.allStore').show();
               }
               if (data.storeIds == employee.storeIds) {
                   $('.storeLists span:first').addClass('active').append('<i></i>');
               } else {
                   $('.allStore').show();
                   var sum = 0;
                   for (var i = 0; i <= memberData.storeList.length - 1; i++) {
                       var storeId = memberData.storeList[i].id;
                       if (storeId == data.storeIds || storeId == parseInt(data.storeIds)) {
                           $('.storeLists .stores-info span').eq(i).addClass('active').append('<i></i>');
                           $('.index .storeList').find('.store_name').text(memberData.storeList[i].name);
                           sum++;
                       }
                   }
                   if (sum == memberData.storeList.length) {
                       $('.storeLists .stores-info span').eq(0).addClass('active').append('<i></i>');
                   }
               }
               //日期名称
               $('#dateList span').eq(parseInt(memberData.dataType) - 1).addClass('active');
               $('.index .dateList').find('.date_name').text(getDateName(memberData.dataType));
           }, function() {})
       },
       performanceReport: function(data, type) {
           if (type != "wechat_business_normal") {
               return new Promise(function(resolve, reject) {
                   app.startLoading();
                   app.api.index.performanceReport({
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
           } else {
               return new Promise(function(resolve, reject) {
                   app.startLoading();
                   app.api.index.empPerformance({
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
       },
       getEmployee: function(data) {
           var userInfo = {
               userId: data
           };
           return new Promise(function(resolve, reject) {
               app.startLoading();
               app.api.userinfo.listEmployee({
                   data: userInfo,
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
       bind: function(data) {
           return new Promise(function(resolve, reject) {
               app.startLoading();
               app.api.userinfo.bind({
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
       listEmployeeStoreList: function(data) {
           return new Promise(function(resolve, reject) {
               app.startLoading();
               app.api.userinfo.listEmployeeStoreList({
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
   }
