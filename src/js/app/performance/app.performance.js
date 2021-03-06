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
	//左右数据查看按钮
	lrcText:function(d){
		var lrcText={
			leftText:'看昨天',
			rightText:'看本月',
			centerText:'今日收入',
			orderTitle:'当日订单',
			bookingTitle:'当日预约'
		};
		if (d=='今天') {
			//百度事件统计
			baiduStatistical.add({category:'管理员-看今天',label:'看今天业绩报告',val:'',action:'click'});
			return lrcText;
		}else if(d=='昨天'){
			//百度事件统计
			baiduStatistical.add({category:'管理员-看昨天',label:'看昨天业绩',val:'',action:'click'});
			lrcText.leftText=null;
			lrcText.rightText='看今天';
			lrcText.centerText='昨日收入';
			return lrcText;
		}else if(d=='本月'){
			//百度事件统计
			baiduStatistical.add({category:'管理员-看本月',label:'看本月业绩',val:'',action:'click'});
			lrcText.leftText='看今天';
			lrcText.rightText=null;
			lrcText.centerText='本月收入';
			lrcText.orderTitle='订单';
			lrcText.bookingTitle='预约';
			return lrcText;
		}
		return '';
	},
	userrole_init:function(){
		return new Promise(function(resolve,reject){
			app.userinfo.getEmployee().then(function(userinfo){
				if(userinfo){
					var storeList;
					var storelistStr='';
					//验证角色权限
					//var userinfo=employee;
					if(app.constant.WECHAT_BUSINESS[1].code==userinfo.role){
						//获取门店信息列表
						storeList=userinfo.storeList;
						if(storeList.length==0){
							resolve(0);
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
							if(!app.performance.currentStoreid){
								app.performance.currentStoreid = storelistStr;
							}
							app.performance.currentDate = 2;
							resolve(1);
						}
					}else{
						resolve(2);
					}
				}
			},function(){});
		});
	},
	//BOSS-管理人员
	manageReport_init: function(){
		app.performance.userrole_init().then(function(urole){
			var screenHeight=window.screen.height;
			$('body').css('height',screenHeight+'px');
			var flagRole=urole;
			if(flagRole==0){
				window.location.href='/performance-index.html#/performance_emp';
				app.alert('没有找到您的门店信息');
				return;
			}else if(flagRole==2){
				window.location.href='/performance-index.html#/performance_emp';//不是管理员身份
				return;
			}
			//百度事件统计
			baiduStatistical.add({category:'管理员-业绩报告',label:'业绩报告查询',val:'',action:'select'});

			//默认查询当天
			app.performance.getpPerformanceReport(function(data){
				var usedata=app.performance.lrcText('今天');
				//处理滚动
				//myScroll = new IScroll('#wrapper', {probeType: 3, mouseWheel: true, tap: true, click: true});
				var pb=app.performance.processReport(data, usedata);

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
			})
		})

	},
	//获取业绩报告数据
	getpPerformanceReport:function(fn){
		app.performance.emp.userinfo().then(function(employee){
			if(employee){
				app.startLoading();
				var type = app.performance.currentDate || 2;
				var storeid = app.performance.currentStoreid;
				var uinfo = employee;
				//接口数据
				app.api.performance.performanceReport({
					data:{
						merchantId: uinfo.merchantId,
						storeId: storeid,
						userid: uinfo.userid,
						type: type
					},
					success: function(results){
						app.endLoading();
						if (results.success) {
							fn(results.data);
						}else{
							app.alert('查询数据失败~');
						}
					},
					error: function(error){
						app.endLoading();
						console.info(error);
					}
				});
			}
		},function(){});

	},
	//根据查询类型处理业绩明细数据,返回模板数据
	processReport:function(data,lrcText){
		var type = app.performance.currentDate;
		//封装业绩报告模版数据,为了window.eval()处理,定义全局对象
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
			storelistStr:'',
			lrcText:{}
		}
		pb_report.storeList=app.performance.getStoreList;
		pb_report.storelistStr=app.performance.storelistStr;
		pb_report.lrcText = lrcText;
		//封装当前查询左右选择方式


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
			}else if(type==2){
				num = app.tools.toThousands(data.todayPerformanceDetailList[i][1].toFixed(2));
			}else if(type==1){
				num = app.tools.toThousands(data.yesterdayPerformanceDetailList[i][1].toFixed(2));
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

		//今日业绩
		var tmplhtml = $('#tmpl_performance').html();
		var resultTmpl = tmpl(tmplhtml, pb_report);
		$('#tmpl-performance-manage').html('');
		$('#tmpl-performance-manage').html(resultTmpl);
		myScroll = new IScroll('#wrapper', {probeType: 3, mouseWheel: true, tap: true, click: true});
		myScroll.refresh();

		//处理门店选择
		$('#storeList').on('click','.weui_actionsheet_cell',function(){

			//百度事件统计
			baiduStatistical.add({category:'管理员-门店切换',label:'切换门店',val:'',action:'click'});

			//获取门店ID;
			var storeid=$(this).attr('name');
			//修改当前显示选项
			$('#showActionSheet_store').html($(this).html()+'&gt;');
			$('#actionsheet_cancel_store').click();

			//当前门店ID
			app.performance.currentStoreid=storeid;

			//获取数据
			app.performance.getpPerformanceReport(function(data){
				var pb=app.performance.processReport(data,app.performance.lrcText('今天'));
			});
		});

		//选择看昨天及看本月数据处理
		$('#leftData').on('click','a',function(){
			if ($('#leftData a').html().indexOf('今天') > 0) {
				app.performance.currentDate = 2;
				//修改展示数据
				var userdata=app.performance.lrcText('今天');
				app.performance.getpPerformanceReport(function(data){
					var pb=app.performance.processReport(data,userdata);//默认查询当天
				});
			}else{
				app.performance.currentDate = 1;
				var userdata=app.performance.lrcText('昨天');
				app.performance.getpPerformanceReport(function(data){
					var pb=app.performance.processReport(data,userdata);//默认查询当天
				});
			}		
		});

		$('#rightData').on('click','a',function(){
			if ($('#rightData a').html().indexOf('今天') > 0) {
				app.performance.currentDate = 2;
				var userdata=app.performance.lrcText('今天');
				app.performance.getpPerformanceReport(function(data){
					app.performance.processReport(data,userdata);//默认查询当天
				});
			}else{
				app.performance.currentDate = 3;
				var userdata=app.performance.lrcText('本月');
				app.performance.getpPerformanceReport(function(data){
					app.performance.processReport(data,userdata);//默认查询当天
				});
			}
		});
		return 'success';
	}
}
