   //初始化门店切换
   function initStoreList() {
       //展开门店选择
       $('.index').on('click', '.storeList', function() {
           $('.storeLists').fadeIn(200);
           $('.storeLists .mask').fadeIn(200);
           $('.stores').addClass('stores-active');
           //判断是否有选中active
           if (!$('.storeLists span').hasClass('active')) {
               $('.storeLists span:first').addClass('active').append('<i></i>');
           }
       });
       //关闭门店选择
       $('.index .storeLists').on('click', '.mask', function() {
           $('.stores').removeClass('stores-active');
           $('.storeLists .mask').fadeOut(200);
       });
       //点击切换门店
       $('.index .storeLists .stores').on('click', 'span', function(event) {
           $('.storeLists span').removeClass('active').find('i').remove();
           $(this).addClass('active').append('<i></i>');
           $('.index .storeLists .mask').click();
           //
           $('.index .storeList').find('.store_name').text($(this).text());
       });
   };

   function initDate() {
       $('.index').on('click', '.dateList', function() {
           $('#dateList').fadeIn(200);
           $('#dateList .mask').fadeIn(200);
           $('.date_menu').addClass('date_menu_active');
           //判断是否有选中active
           if (!$('#dateList span').hasClass('active')) {
               $('#dateList span:first').addClass('active');
           }
       });
       $('.index #dateList').on('click', '.mask', function() {
           $('.date_menu').removeClass('date_menu_active');
           $('#dateList .mask').fadeOut(200);
       });
       //点击切换日期
       $('.index #dateList .date_info').on('click', 'span', function(event) {
           $('#dateList span').removeClass('active').find('i').remove();
           $(this).addClass('active');
           $('.index #dateList .mask').click();
           $('.index .dateList').find('.date_name').text($(this).text());
       });
       //取消选择
       $('.index').on('click', '#date_cancel', function(event) {
           $('.index #dateList .mask').click();
       });
   }
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

           app.index.getMemberData();

           // app.index.userdata().then(function(userDate) {
           //     app.index.getMemberData();
           // }, function() {})
       },
       getMemberData: function(firstResult, maxResult) {
           var merchantId = null;
           // if (JSON.parse(localStorage.employee)) {
           //     merchantId = JSON.parse(localStorage.employee).merchantId;
           // }
           var memberData = {};
           //普通员工
           var tmplhtml;
           // if (JSON.parse(localStorage.employee).role == "wechat_business_normal") {
           //      tmplhtml = $('#tmpl-index-normal-model').html();
           //   //  tmplhtml = $('#tmpl-index-admin-model').html();
           // } else {
           //     tmplhtml = $('#tmpl-index-normal-model').html();
           // }
          //
           tmplhtml = $('#tmpl-index-normal-model').html();
           var resultTmpl = tmpl(tmplhtml, memberData);
           $('#tmpl-index').html(resultTmpl);
           initStoreList();
           initDate();
           /*        app.index.getMemberStatistics({
                       'merchantId': merchantId
                   }).then(function(data) {
                       memberData = data;
                       if (JSON.parse(localStorage.employee).role == "wechat_business_normal") {
                           var tmplhtml = $('#tmpl-index-admin-model').html();
                           var resultTmpl = tmpl(tmplhtml, memberData);
                           $('#tmpl-index-admin').html(resultTmpl);
                       } else {
                           var tmplhtml = $('#tmpl-index-normal-model').html();
                           var resultTmpl = tmpl(tmplhtml, memberData);
                           $('#tmpl-index-normal').html(resultTmpl);
                       }

                   }, function(error) {
                       app.alert(error);
                   });
           */
       },
       getMemberStatistics: function(data) {
           return new Promise(function(resolve, reject) {
               app.startLoading();
               app.api.echarts.getMemberStatistics({
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
