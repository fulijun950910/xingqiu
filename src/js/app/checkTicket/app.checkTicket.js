 app.checkTicket = {
     ticketDetailInfo: null,
     checkTicketIdName: "tmpl-verifyTicketInstance",
     verifyCouponVersion4Location:'/lite/index.html#/couponVerify/',
     verifyCouponDefaultLocation:'/service-subtotal/#/couponVerify/',
     checkTicket: function() {
         // 事件绑定
         // 跳转及权限判断
         if (employee && employee.merchant) {
             var ticketNo=app.getParameter('ticketNo');
             if(employee.merchant.functionVersion == 4) {
                 location.href = app.checkTicket.verifyCouponVersion4Location + ticketNo;
             } else {
                 location.href = app.checkTicket.verifyCouponDefaultLocation + ticketNo;
             }
         } else {
             location.href = "/userinfo.html#/user_login";
         }

     },
     checkTicketInitEvent: function(){
         $('body').on('touchstart','.scanBtn',function(){
             app.checkTicket.openScanQRCode();
         });
         $('body').on('keyup','#payMoney',function(){
             $(this).val($(this).val().replace(/\D/g,'').replace(/....(?!$)/g,'$& '));
             if($(this).val()){
                 $(".subBtn").attr('disabled',false)
             }else{
                 $(".subBtn").attr('disabled',true)

             }
         });
         $('body').on('change','#payMoney',function(){
             if($(this).val()){
                 $(".subBtn").attr('disabled',false)
             }else{
                 $(".subBtn").attr('disabled',true)

             }
         });
     },

     openScanQRCode: function(){
         app.startLoading();
         app.JSSignature.getJSSignature({
             success:function(){
                 app.endLoading();
                 app.JSSignature.scanQRCode();
             }
         })
     },
     //获取券信息
     getTicketDetailInfo: function(id) {
         //判断错误信息是否隐藏
         var data = {
             ticketNo: id ? id: $('#payMoney').val()?$('#payMoney').val().replace(/\s/g,''):'',
             merchantId: employee.merchantId
         }
         app.checkTicket.getTicket(data).then(function(results) {
             app.checkTicket.ticketDetailInfo = results;
             app.checkTicket.ticketDetailInfo.ticketNo = data.ticketNo;
             app.checkTicket.ticketDetailInfo.employeeInfo = employee;
             window.localStorage.setItem('ticketInfo', JSON.stringify(app.checkTicket.ticketDetailInfo));
             window.location.href = "/check-ticket.html#/verifyTicketInstance"
         }, function(error) {
             if (error) {
                 app.alert(error);
             } else {
                 $('.checkTicket').find('.messageError').show().text('小主,当前网络不给力,请稍后再试');
             }
         });
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
         app.checkTicket.userdata().then(function(userDate) {
             var storeIdActive = null;
             var ticketInfo = JSON.parse(localStorage.ticketInfo);
             ticketInfo.storeId = storeId;
             if (storeId) {
                 storeIdActive = storeId;
             } else if(ticketInfo.employeeInfo.storeId){
                 storeIdActive = ticketInfo.employeeInfo.storeId;
                 ticketInfo.storeId = ticketInfo.employeeInfo.storeId;
             }else{
                 if(ticketInfo.employeeInfo.storeList&&ticketInfo.employeeInfo.storeList.length>0){
                     storeIdActive = ticketInfo.employeeInfo.storeList[0].id;
                     ticketInfo.storeId = ticketInfo.employeeInfo.storeList[0].id;
                 }
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
                 app.tools.initStoreList(app.checkTicket.checkTicketIdName);
                 //点击切换门店
                 $('.storeLists .stores').on('click', 'span', function(event) {
                     $('.storeLists span').removeClass('active').find('i').remove();
                     $(this).addClass('active').append('<i></i>');
                     $('.storeLists .mask').click();
                     app.checkTicket.init($(this).attr('data-id'));
                 });
             }

             if (ticketInfo.employeeInfo.storeList.length >= 1) {
                 for (var i = 0; i <= ticketInfo.employeeInfo.storeList.length - 1; i++) {
                     storeId = ticketInfo.employeeInfo.storeList[i].id;
                     if (ticketInfo.employeeInfo.storeList[i].id == storeIdActive || ticketInfo.employeeInfo.storeList[i].id == parseInt(storeIdActive)) {
                         $('.storeLists .stores-info span').eq(i).addClass('active').append('<i></i>');
                         $('.verifyTicketInstance .storeList').find('.store_name').text(ticketInfo.employeeInfo.storeList[i].name);
                         return;
                     }
                 }
             }
         }, function() {})
     },
     //初始数据
     verifyTicket: function() {
         var ticketInfo = JSON.parse(localStorage.ticketInfo);
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
                 app.alert('小主，验券成功');
                 ticketInfo.status = 4;
                 $('.ticketStatus').text('券已使用');
                 $('#verifyTicket').css('background-color', '#ccc');
                 window.localStorage.setItem('ticketInfo', JSON.stringify(ticketInfo));
             } else {
                 app.alert('小主,当前网络不给力,请稍后再验');
             }
         }, function(error) {
             app.alert(error);
         });
     },
     //查询券信息
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
                     reject(error);
                 }
             });
         });
     },
     //验券
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
