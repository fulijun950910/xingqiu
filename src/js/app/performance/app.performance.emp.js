//员工业绩
app.performance.emp = {
	init: function() {
		//请求完毕之后，继续处理
		app.performance.emp.getEmpPerformance().then(
			function(data){ //success
				var emp_data = {
					//业绩
					performance : app.tools.toThousands(data.performance.toFixed(2)),
					//卡耗
					cardConsume : app.tools.toThousands(data.cardConsume.toFixed(2)),
					//今日预约单数
					todyAppointmentNum : data.appointmentNum,
					//今日订单数
					todyOrderNum : data.orderNum,
					//当月提成
					currentMonthCommission : app.tools.toThousands(data.currentMonthCommission.toFixed(2)),
					//员工业绩排名
					performanceRanking : data.performanceRanking
				}
				//今日业绩
				var tmplhtml = $('#tmpl-emp-performance').html();
				var resultTmpl = tmpl(tmplhtml, emp_data);
				$('#emp_per').html(resultTmpl);
				//今天业绩-卡耗数据缓存
				$('#emp_data').data('emp_data',emp_data);

				//卡耗点击事件
				$('#emp_cardConsume').on('click','a',function(){
					//展示卡耗数据
					$('#emp_performance').html($('#emp_data').data('emp_data').cardConsume);
					//隐藏卡耗，展示当日业绩
					$('#emp_cardConsume a').hide();
					//显示今日业绩
					$('#emp_today_performance a').show();
				});

				//查看今日业绩
				$('#emp_today_performance').on('click','a',function(){
					//展示卡耗数据
					$('#emp_performance').html($('#emp_data').data('emp_data').performance);
					//隐藏卡耗，展示当日业绩
					$('#emp_today_performance a').hide();
					//显示今日业绩
					$('#emp_cardConsume a').show();
				});
			},
			function(error){
				app.alert(error);
			}
		);
	},
	//获取用户信息
	userinfo: function(){
		var u_info=app.userinfo.getEmployee();
		//商户ID,门店ID,员工ID
		return {merchantId: u_info.merchantId,storeId: u_info.storeId, userid : u_info.id};
	},
	//获取员工门店ID
	getUserStoreList: function(){
		return app.performance.emp.userinfo().storeId;
	},
	//查询员工业绩
	getEmpPerformance:function(){
		return new Promise(function(resolve,reject){
			//拼接请求URL
			var uinfo = app.performance.emp.userinfo();
			app.api.performance.empPerformance({
				data:{
					merchantId: uinfo.merchantId,
					storeId: uinfo.storeId,
					userid: uinfo.userid
				},
				success: function(results){
					if(results.success){
						resolve(results.data);
					}else{
						reject(results.message);
					}
				},
				error: function(error){
					reject('网络异常啦~');
				}
			})
		});
	}
};