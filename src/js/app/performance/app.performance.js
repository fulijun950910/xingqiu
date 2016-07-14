/**
 * Created by wzc on 16/8/3.
 */
app.performance = {
	//BOSS-管理人员接口联调
	manageReport_init: function(){
		//接口数据
		app.performance.getpPerformanceReport(2).then(function(data){
			var pb=app.performance.processReport(data,2);//默认查询当天
			//今日业绩
			var tmplhtml = $('#tmpl-performance').html();
			var resultTmpl = tmpl(tmplhtml, pb);
			//展示模版数据
			$('#tmpl-performance-manage').html(resultTmpl);
		},function(error){
			app.alert(error);
		})
		.then(function(){

		//选择看昨天及看本月数据处理
		$('#leftData').on('click','a',function(){
			if ($('#leftData a').html().indexOf('今天') > 0) {
				//修改展示数据
				app.performance.getpPerformanceReport(2).then(function(data){
					var pb=app.performance.processReport(data,2);//默认查询当天
					//展示页面数据
					//修改左侧为看昨天
					$('#leftData a').html('<i class="icon icon-uniF3D2"></i>  看昨天');
					//修改右侧为看今天
					$('#rightData a').show().html('看本月  <i class="icon icon-uniF3D3"></i>');
					$('#title_name').html('今日收入');
				},function(error){
					app.alert(error);
				});

			}else{
				app.performance.getpPerformanceReport(1).then(function(data){
					app.performance.processReport(data,1);//默认查询当天
					//隐藏左侧项
					$('#leftData a').hide();
					$('#rightData a').html('看今天  <i class="icon icon-uniF3D3"></i>');
					$('#title_name').html('昨日收入');
				},function(error){
					app.alert(error);
				});

			}		
		});

		$('#rightData').on('click','a',function(){
			if ($('#rightData a').html().indexOf('今天') > 0) {
				//修改展示数据
				app.performance.getpPerformanceReport(2).then(function(data){
					app.performance.processReport(data,2);//默认查询当天
					//修改左侧为看昨天
					$('#leftData a').html('<i class="icon icon-uniF3D2"></i>  看昨天');
					//修改右侧为看今天
					$('#leftData a').show();
					$('#rightData a').html('看本月  <i class="icon icon-uniF3D3"></i>');
					$('#rightData a').show();
					$('#title_name').html('今日收入');
				},function(error){
					app.alert(error);
				});

			}else{
				//看本月
				app.performance.getpPerformanceReport(3).then(function(data){
					app.performance.processReport(data,3);//默认查询当天
					//隐藏左侧项
					$('#rightData a').hide();
					$('#leftData a').show().html('<i class="icon icon-uniF3D2"></i>  看今天');	
					$('#title_name').html('本月收入');
				},function(error){
					app.alert(error);
				});

			}
		});

		//上拉选择门店菜单
	    $('#container').on('click', '#showActionSheet_store', function () {
            var mask = $('#mask_store');
            var weuiActionsheet = $('#weui_actionsheet_store');
            weuiActionsheet.addClass('weui_actionsheet_toggle');
            mask.show()
                .addClass('weui_fade_toggle').one('click', function () {
                hideActionSheet(weuiActionsheet, mask);
            });
            $('#actionsheet_cancel_store').one('click', function () {
                hideActionSheet(weuiActionsheet, mask);
            });
            mask.unbind('transitionend').unbind('webkitTransitionEnd');

            function hideActionSheet(weuiActionsheet, mask) {
                weuiActionsheet.removeClass('weui_actionsheet_toggle');
                mask.removeClass('weui_fade_toggle');
                mask.on('transitionend', function () {
                    mask.hide();
                }).on('webkitTransitionEnd', function () {
                    mask.hide();
                })
            }
        });

		});

	},
	//获取业绩报告数据
	getpPerformanceReport:function(type){
		return new Promise(function(resolve,reject){
			var type = type || 2;
			//获取请求url
			var uinfo = app.performance.emp.userinfo();
			var url = app.api.url+'/wechatbusinessassists/performanceReport/'+uinfo.merchantId+'/'+uinfo.storeId+'/'+uinfo.userid+'/'+type;
			$.ajax({
				url:url,
				type:'GET',
				dataType:'json',
				success:function(results){
					if (results.success) {
						resolve(results.data);
					}else{
						reject(results.message);
					}
				},
				error:function(error){
					reject(results.message);
				}
			});
		});
	},
	//根据查询类型处理业绩明细数据,返回模板数据
	processReport:function(data,type){

		//封装业绩报告模版数据,为了window.eval()处理,定义全局变量
		pb_report={
			//当日业绩
			income :　app.tools.toThousands(data.income.toFixed(2)),
			//到店客数
			customerNum: data.customerNum,
			//新增会员数
			newMemberNum: data.newMemberNum,
			//当日总消耗
			cardConsume: app.tools.toThousands(data.cardConsume.toFixed(2)),
			//明细
			detailList:{
				//现金//pos支付//微信支付//支付宝支付//团购//减免//欠款
				cash:{},pos:{},wxpay:{},alipay:{},groupbuy:{},annul:{},debt:{}
			}
		}
		var operationDay=function(i){
			return data.todayPerformanceDetailList[i][1]-data.yesterdayPerformanceDetailList[i][1];
		}
		var operationMonth=function(i){
			return data.currentMonthPerformanceDetailList[i][1]-data.lastMonthPerformanceDetailList[i][1];
		}
		//综合数据
		var compositeData=function(name,i,type){
			var num = 0;
			if (type==3) {
				num = app.tools.toThousands(data.currentMonthPerformanceDetailList[i][1].toFixed(2));
			}else{
				num = app.tools.toThousands(data.todayPerformanceDetailList[i][1].toFixed(2));
			}
			window.eval('pb_report.detailList.'+name+'.val="'+ num +'"');
			if (type == 1) {//昨天
				window.eval('pb_report.detailList.'+name+'.floating='+ (-operationDay(i)));
			}else if (type == 2) {//今天
				window.eval('pb_report.detailList.'+name+'.floating='+ operationDay(i));
			}else if (type == 3) {
				window.eval('pb_report.detailList.'+name+'.floating='+ operationMonth(i));
			}
		}
		//封装数据列表
		if(type==3){
			for (var i=0; i<data.currentMonthPerformanceDetailList.length; i++) {
				//console.info(data.currentMonthPerformanceDetailList[i][0]);
				if (data.currentMonthPerformanceDetailList[i][0]=='现金') {
					compositeData('cash',i,type);
				}else if(data.currentMonthPerformanceDetailList[i][0]=='POS') {
					compositeData('pos',i,type);
				}else if(data.currentMonthPerformanceDetailList[i][0]=='微信支付'){
					compositeData('wxpay',i,type);
				}else if(data.currentMonthPerformanceDetailList[i][0]=='支付宝'){
					compositeData('alipay',i,type);
				}else if(data.currentMonthPerformanceDetailList[i][0]=='团购'){
					compositeData('groupbuy',i,type);
				}else if(data.currentMonthPerformanceDetailList[i][0]=='减免'){
					compositeData('annul',i,type);
				}else if(data.currentMonthPerformanceDetailList[i][0]=='欠款'){
					compositeData('debt',i,type);
				}
			}
		}else{
			for (var i=0; i<data.todayPerformanceDetailList.length; i++) {
				//console.info(data.todayPerformanceDetailList[i][0]);
				if (data.todayPerformanceDetailList[i][0]=='现金') {
					compositeData('cash',i,type);
				}else if(data.todayPerformanceDetailList[i][0]=='POS') {
					compositeData('pos',i,type);
				}else if(data.todayPerformanceDetailList[i][0]=='微信支付'){
					compositeData('wxpay',i,type);
				}else if(data.todayPerformanceDetailList[i][0]=='支付宝'){
					compositeData('alipay',i,type);
				}else if(data.todayPerformanceDetailList[i][0]=='团购'){
					compositeData('groupbuy',i,type);
				}else if(data.todayPerformanceDetailList[i][0]=='减免'){
					compositeData('annul',i,type);
				}else if(data.todayPerformanceDetailList[i][0]=='欠款'){
					compositeData('debt',i,type);
				}
			}
		}

		return pb_report;
	}
}
