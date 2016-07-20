/**
 * Created by wzc on 16/8/3.
 */
app.performance = {
	//当前数据时间点：昨天,今天,本月
	currentDate: 2,
	//商户列表
	getStoreList: [],
	//门店ID
	storelistStr: '',
	//当前门店ID
	currentStoreid: '',
	userrole_init:function(){
		var storeList;
		var storelistStr='';
		//验证角色权限
		var userinfo=app.userinfo.getEmployee();
		if(app.constant.WECHAT_BUSINESS[1].code==userinfo.role
			&& app.constant.WECHAT_BUSINESS[1].code===userinfo.role){
			//获取门店信息列表
			storeList=userinfo.storeList;
			if(storeList.length==0){
				return 0;
			}else{
				for (var i=0; i<storeList.length;i++) {
					storelistStr+=storeList[i].id + ',';
				}
				storelistStr=storelistStr.substring(0,storelistStr.length-1);
				//门店信息列表
				app.performance.getStoreList = storeList;
				//门店ID串
				app.performance.storelistStr = storelistStr;
				//当前选择门店
				app.performance.currentStoreid = storelistStr;
				app.performance.currentDate = 2;
				return 1;
			}
		}else{
			return 2;
		}
	},
	//BOSS-管理人员接口联调
	manageReport_init: function(){
		
		var flagRole=app.performance.userrole_init();
		if(flagRole==0){
			window.location.href='/performance-index.html#/performance_emp';
			app.alert('没有找到您的门店信息');
			return;
		}else if(flagRole==2){
			window.location.href='/performance-index.html#/performance_emp';//不是管理员身份
			return;
		}
		//默认查询当天
		app.performance.getpPerformanceReport().then(function(data){
			var pb=app.performance.processReport(data);
		},function(error){
			app.alert(error);
		})
		.then(function(){

			//处理门店选择
			$('#storeList').on('click','.weui_actionsheet_cell',function(){
				//获取门店ID;
				var storeid=$(this).attr('name');
				//修改当前显示选项
				$('#showActionSheet_store').html($(this).html()+'&gt;');
				$('#actionsheet_cancel_store').click();

				//当前门店ID
				app.performance.currentStoreid=storeid;

				//获取数据
				app.performance.getpPerformanceReport().then(function(data){
					var pb=app.performance.processReport(data);
				},function(error){
					app.alert(error);
				})

			});


			//选择看昨天及看本月数据处理
			$('#leftData').on('click','a',function(){
				if ($('#leftData a').html().indexOf('今天') > 0) {
					app.performance.currentDate = 2;
					//修改左侧为看昨天
					$('#leftData a').html('<i class="icon icon-uniF3D2"></i>  看昨天');
					//修改右侧为看今天
					$('#rightData a').show().html('看本月  <i class="icon icon-uniF3D3"></i>');
					$('#title_name').html('今日收入');
					//修改展示数据
					app.performance.getpPerformanceReport().then(function(data){
						var pb=app.performance.processReport(data);//默认查询当天
					},function(error){
						app.alert(error);
					});

				}else{
					app.performance.currentDate = 1;
					//隐藏左侧项
					$('#leftData a').hide();
					$('#rightData a').html('看今天  <i class="icon icon-uniF3D3"></i>');
					$('#title_name').html('昨日收入');
					app.performance.getpPerformanceReport().then(function(data){
						var pb=app.performance.processReport(data);//默认查询当天
					},function(error){
						app.alert(error);
					});

				}		
			});

			$('#rightData').on('click','a',function(){
				if ($('#rightData a').html().indexOf('今天') > 0) {
					app.performance.currentDate = 2;
					//修改左侧为看昨天
					$('#leftData a').html('<i class="icon icon-uniF3D2"></i>  看昨天');
					//修改右侧为看今天
					$('#leftData a').show();
					$('#rightData a').html('看本月  <i class="icon icon-uniF3D3"></i>');
					$('#rightData a').show();
					$('#title_name').html('今日收入');
					app.performance.getpPerformanceReport().then(function(data){
						app.performance.processReport(data);//默认查询当天
					},function(error){
						app.alert(error);
					});

				}else{
					app.performance.currentDate = 3;
					//隐藏左侧项
					$('#rightData a').hide();
					$('#leftData a').show().html('<i class="icon icon-uniF3D2"></i>  看今天');	
					$('#title_name').html('本月收入');
					//看本月
					app.performance.getpPerformanceReport().then(function(data){
						app.performance.processReport(data);//默认查询当天
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
	getpPerformanceReport:function(){
		return new Promise(function(resolve,reject){
			var type = app.performance.currentDate || 2;
			var storeid = app.performance.currentStoreid;
			var uinfo = app.performance.emp.userinfo();
			//接口数据
			app.api.performance.performanceReport({
				data:{
					merchantId: uinfo.merchantId,
					storeId: storeid,
					userid: uinfo.userid,
					type: type
				},
				success: function(results){
					if (results.success) {
						resolve(results.data);
					}else{
						reject(results.message);
					}
				},
				error: function(error){
					console.info(error);
					reject('请求失败');
				}
			});
		});
	},
	//根据查询类型处理业绩明细数据,返回模板数据
	processReport:function(data){
		var type = app.performance.currentDate;
		//封装业绩报告模版数据,为了window.eval()处理,定义全局变量
		pb_report={
			//当日业绩
			income : app.tools.toThousands(data.income.toFixed(2)),
			//到店客数
			customerNum: data.customerNum,
			//新增会员数
			newMemberNum: data.newMemberNum,
			//当日总消耗
			cardConsume: app.tools.toThousands(data.cardConsume.toFixed(2)),
			//当日订单量
			orderNum: data.orderNum,
			//当日预约量
			appointmentNum: data.appointmentNum,
			//明细
			detailList:{
				//现金//pos支付//微信支付//支付宝支付//团购//减免//欠款
				cash:{},pos:{},wxpay:{},alipay:{},groupbuy:{},annul:{},debt:{}
			},
			storeList:[],
			storelistStr:''
		}
		pb_report.storeList=app.performance.getStoreList;
		pb_report.storelistStr=app.performance.storelistStr;
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
			}else if (type == 3) {//本月
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

		//中部收入部分
		$('#all_performance').html(pb_report.income);
		//到店客人
		$('#persons').html(pb_report.customerNum);
		//新增会员
		$('#members').html(pb_report.newMemberNum);
		//当日总消耗
		$('#count_consume').html(pb_report.cardConsume);
		//当日订单量
		$('#todayOrder').html(pb_report.orderNum);
		//当日预约量
		$('#todayBookingOrder').html(pb_report.appointmentNum);
		//现金
		$('#cash').html(pb_report.detailList.cash.val);
		app.performance.getFloating($('#cash'),pb_report.detailList.cash.floating);
		//POS
		$('#pos').html(pb_report.detailList.pos.val);
		app.performance.getFloating($('#pos'),pb_report.detailList.pos.floating);
		//微信支付
		$('#wxpay').html(pb_report.detailList.wxpay.val);
		app.performance.getFloating($('#wxpay'),pb_report.detailList.wxpay.floating);
		//支付宝
		$('#alipay').html(pb_report.detailList.alipay.val);
		app.performance.getFloating($('#alipay'),pb_report.detailList.alipay.floating);
		//团购
		$('#groupbuy').html(pb_report.detailList.groupbuy.val);
		app.performance.getFloating($('#groupbuy'),pb_report.detailList.groupbuy.floating);
		//减免
		$('#annul').html(pb_report.detailList.annul.val);
		app.performance.getFloating($('#annul'),pb_report.detailList.annul.floating);
		//欠款
		$('#debt').html(pb_report.detailList.debt.val);
		app.performance.getFloating($('#debt'),pb_report.detailList.debt.floating);

		//门店列表
		var storell  = '<div name="" class="weui_actionsheet_cell">全部门店</div>';
		for (var i = 0; i < pb_report.storeList.length;i ++) {
			storell += '<div name="'+pb_report.storeList[i].id+'" class="weui_actionsheet_cell">'+pb_report.storeList[i].name+'</div>';
		}
		$('#storeList').empty();
		$('#storeList').append(storell);
		$('#storeList .weui_actionsheet_cell:first').attr('name',pb_report.storelistStr);
		return 'success';
	},
	//处理业绩浮动结果
	getFloating:function(dom,floating){
		if(floating > 0){
			dom.next().css('class','ic icon-jiantou-copy2');
		}else if(floating < 0){
			dom.next().css('class','ic icon-jiantou4');
		}else{
			dom.next().css('class','ic').html('—');
		}
	}
}
