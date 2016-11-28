 var employee = null;
 if (localStorage.employee && JSON.parse(localStorage.employee)) {
     employee = JSON.parse(localStorage.employee);
 }
 var ticketDetailInfo = null;
 app.checkTicket = {
     ticketStatusName: function(status) {
         var data = [];
         data[1] = "待使用";
         data[2] = "券不可用";
         data[3] = "券已过期";
         data[4] = "券已使用";
         return data[status];
     },
     checkTicket: function() {
         window.sessionStorage.setItem("ticketInfo", "");
         $('.container').css('background-color', '#fff ');
         $('#container').html($('#tpl_checkTitcket').html());
         $('.checkTicket').find('.ticketNumber').blur(function() {
             if (!$('.checkTicket').find('.ticketNumber').val()) {
                 $('.checkTicket').find('.messageError').show();
                 return false;
             } else {
                 $('.checkTicket').find('.messageError').hide();
                 return true;
             }
         }).keyup(function() {
             $(this).triggerHandler('blur');
         });
         // .focus(function() {
         //     $(this).triggerHandler('blur');
         // });
     },
     //获取券信息
     getTicketDetailInfo: function() {
         //判断错误信息是否隐藏
         if ($('.checkTicket').find('.messageError').is(":hidden")) {
             var data = {
                 ticketNo: $('.checkTicket').find('.ticketNumber').val(),
                 merchantId: employee.merchantId
             }
             app.checkTicket.getTicket(data).then(function(results) {
                 ticketDetailInfo = results;
                 ticketDetailInfo.ticketNo = data.ticketNo;
                 ticketDetailInfo.employeeInfo = employee;
                 window.sessionStorage.setItem('ticketInfo', JSON.stringify(ticketDetailInfo));
                 window.location.href = "/check-ticket.html#/verifyTicketInstance"
             }, function(error) {
                 $('.checkTicket').find('.messageError').show().text(error);
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
     //初始化门店切换
     initStoreList: function() {
         //展开门店选择
         $('.verifyTicketInstance').on('click', '.storeList', function(event) {
             $('.verifyTicketInstance .storeLists').fadeIn(200);
             $('.verifyTicketInstance .storeLists .mask').addClass('mask_show');
             $('.verifyTicketInstance .stores').addClass('stores-active');
             $('.verifyTicketInstance .mask').height($('.bd').height());
         });
         $('.verifyTicketInstance .storeList').find('.store_name').find('')
             //关闭门店选择
         $('.verifyTicketInstance .storeLists').on('click', '.mask', function(event) {
             $('.stores').removeClass('stores-active');
             $('.storeLists .mask').removeClass('mask_show');
         });
         //点击切换门店
         $('.storeLists .stores').on('click', 'span', function(event) {
             $('.storeLists span').removeClass('active').find('i').remove();
             $(this).addClass('active').append('<i></i>');
             $('.verifyTicketInstance .storeLists .mask').click();
             app.checkTicket.init($(this).attr('data-id'));
         });

     },
     init: function(storeId) {
         app.checkTicket.userdata().then(function(userDate) {
             var storeIdActive = null;
             var ticketInfo = JSON.parse(sessionStorage.ticketInfo);
             ticketInfo.storeId = storeId;
             if (storeId) {
                 storeIdActive = storeId;
             } else {
                 storeIdActive = ticketInfo.employeeInfo.storeId;
                 ticketInfo.storeId = ticketInfo.employeeInfo.storeId;
             }
             var tmplhtml = $('#tmpl-verifyTicketInstance-model').html();
             var resultTmpl = tmpl(tmplhtml, ticketInfo);
             $('#tmpl-verifyTicketInstance').html(resultTmpl);
             if (ticketInfo.status != 1) {
                 $('#verifyTicket').css('background-color', '#ccc');
             }
             $('.container').css('background-color', 'transparent ');
             if (ticketInfo.employeeInfo.storeList.length > 1) {
                 app.checkTicket.initStoreList();
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
         app.checkTicket.verifyTicketInstance(data).then(function(result) {
             if (result) {
                 ticketInfo.status = 4;
                 $('.ticketStatus').text('券已使用');
                 $('#verifyTicket').css('background-color', '#ccc');
                 window.sessionStorage.setItem('ticketInfo', JSON.stringify(ticketInfo));
             }
         }, function(error) {
             app.alert(error);
         });
     },
     getTicket: function(data) {
         return new Promise(function(resolve, reject) {
             app.startLoading();
             app.api.checkTicket.getTicketDetail({
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
     verifyTicketInstance: function(data) {
         return new Promise(function(resolve, reject) {
             app.startLoading();
             app.api.checkTicket.verifyTicketInstance({
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
