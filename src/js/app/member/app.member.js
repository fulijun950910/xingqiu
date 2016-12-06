 var employee = null;
 if (localStorage.employee && JSON.parse(localStorage.employee)) {
     employee = JSON.parse(localStorage.employee);
 }
 var ticketDetailInfo = null;
 var memberIdName = "tmpl-verifyTicketInstance";
 app.member = {
     member: function() {
         window.sessionStorage.setItem("ticketInfo", "");
         $('.container').css('background-color', '#fff ');
         $('#container').html($('#tpl_checkTitcket').html());
         $('.member').find('.ticketNumber').blur(function() {
             if (!$('.member').find('.ticketNumber').val()) {
                 $('.member').find('.messageError').show();
                 return false;
             } else {
                 $('.member').find('.messageError').hide();
                 return true;
             }
         }).keyup(function() {
             $(this).triggerHandler('blur');
         });
     },
     //获取券信息
     getTicketDetailInfo: function() {
         //判断错误信息是否隐藏
         if ($('.member').find('.messageError').is(":hidden")) {
             var data = {
                 ticketNo: $('.member').find('.ticketNumber').val(),
                 merchantId: employee.merchantId
             }
             app.member.getTicket(data).then(function(results) {
                 ticketDetailInfo = results;
                 ticketDetailInfo.ticketNo = data.ticketNo;
                 ticketDetailInfo.employeeInfo = employee;
                 window.sessionStorage.setItem('ticketInfo', JSON.stringify(ticketDetailInfo));
                 window.location.href = "/check-ticket.html#/verifyTicketInstance"
             }, function(error) {
                 $('.member').find('.messageError').show().text(error);
             });
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

     init: function(storeId) {
         app.member.userdata().then(function(userDate) {
             var storeIdActive = null;
             var ticketInfo = JSON.parse(sessionStorage.ticketInfo);
             ticketInfo.storeId = storeId;
             if (storeId) {
                 storeIdActive = storeId;
             } else {
                 storeIdActive = ticketInfo.employeeInfo.storeId;
                 ticketInfo.storeId = ticketInfo.employeeInfo.storeId;
             }
             app.tools.changeTitle('券信息');
             var tmplhtml = $('#tmpl-verifyTicketInstance-model').html();
             var resultTmpl = tmpl(tmplhtml, ticketInfo);
             $('#tmpl-verifyTicketInstance').html(resultTmpl);
             if (ticketInfo.status != 1) {
                 $('#verifyTicket').css('background-color', '#ccc');
             }
             $('.container').css('background-color', 'transparent ');
             if (ticketInfo.employeeInfo.storeList.length > 1) {
                 app.tools.initStoreList(memberIdName);
                 //点击切换门店
                 $('.storeLists .stores').on('click', 'span', function(event) {
                     $('.storeLists span').removeClass('active').find('i').remove();
                     $(this).addClass('active').append('<i></i>');
                     $('.storeLists .mask').click();
                     app.member.init($(this).attr('data-id'));
                 });
             }

             if (ticketInfo.employeeInfo.storeList.length > 1) {
                 for (var i = 0; i <= ticketInfo.employeeInfo.storeList.length - 1; i++) {
                     storeId = ticketInfo.employeeInfo.storeList[i].id;
                     if (ticketInfo.employeeInfo.storeList[i].id == storeIdActive || ticketInfo.employeeInfo.storeList[i].id == parseInt(storeIdActive)) {
                         $('.storeLists .stores-info span').eq(i).addClass('active').append('<i></i>');
                         $('.verifyTicketInstance .storeList').find('.store_name').text(ticketInfo.employeeInfo.storeList[i].name);
                     }
                 }
             }
         }, function() {})
     },
     //初始数据
     verifyTicket: function() {
         var ticketInfo = JSON.parse(sessionStorage.ticketInfo);
         if (ticketInfo.status != 1) {
             return;
         }
         var data = {
             ticketNo: ticketInfo.ticketNo,
             merchantId: ticketInfo.employeeInfo.merchantId,
             storeId: parseInt($('.verifyTicketInstance .storeList').find('.store_name').attr('data-storeid')),
             operatorName: ticketInfo.employeeInfo.name,
             operatorId: ticketInfo.employeeInfo.id
         };
         app.member.verifyTicketInstance(data).then(function(result) {
             if (result) {
                 app.alert('小主，验券成功');
                 ticketInfo.status = 4;
                 $('.ticketStatus').text('券已使用');
                 $('#verifyTicket').css('background-color', '#ccc');
                 window.sessionStorage.setItem('ticketInfo', JSON.stringify(ticketInfo));
             }
         }, function(error) {
             app.alert(error);
         });
     },
     //查询券信息
     getTicket: function(data) {
         return new Promise(function(resolve, reject) {
             app.startLoading();
             app.api.member.getTicketDetail({
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
     //验券
     verifyTicketInstance: function(data) {
         return new Promise(function(resolve, reject) {
             app.startLoading();
             app.api.member.verifyTicketInstance({
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
