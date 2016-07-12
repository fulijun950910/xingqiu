app.performance.emp={

	init: function() {
		//初始化页面数据
		function empPerformance(){
			return new Promise(function(resolve,reject){
				$.ajax({
					url: app.api.url+'/wechatbusinessassists/employeePerformance/1240023486502691/1290723496569394/1230723477049522',
					type:'GET',
					dataType:'json',
					success:function(results){
						var results={"success":true,"message":null,"data":{"employeeId":null,"performance":15000,"cardConsume":40000,"income":null,"todyAppointmentNum":0,"todyOrderNum":0,"currentMonthCommission":40000,"customerNum":null,"newMemberNum":null,"sumCardConsumption":null,"performanceRanking":1,"yesterdayPerformanceDetailList":null,"todayPerformanceDetailList":null,"monthPerformanceDetailList":null},"code":"000000","e":null};
						if(results.success){
							var emp_data = {
								//业绩
								performance : app.tools.toThousands(results.data.performance.toFixed(2)),
								//卡耗
								cardConsume : app.tools.toThousands(results.data.cardConsume.toFixed(2)),
								//今日预约单数
								todyAppointmentNum : results.data.todyAppointmentNum,
								//今日订单数
								todyOrderNum : results.data.todyOrderNum,
								//当月提成
								currentMonthCommission : app.tools.toThousands(results.data.currentMonthCommission.toFixed(2)),
								//员工业绩排名
								performanceRanking : results.data.performanceRanking
							}
							//今日业绩
							var tmplhtml = $('#tmpl-emp-performance').html();
							var resultTmpl = tmpl(tmplhtml, emp_data);
							$('#emp_per').html(resultTmpl);
							//今天业绩-卡耗数据缓存
							$('#emp_data').data('emp_data',emp_data);
							resolve(true);
						}else{
							reject(results.message);
						}
					},
					error:function(error){
						reject(false);
					}
				});
			});
		}
		/*
		//请求完毕之后，继续处理
		empPerformance().then(
			function(data){ //success
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
		*/
		var results={"success":true,"message":null,"data":{"employeeId":null,"performance":15000,"cardConsume":40000,"income":null,"todyAppointmentNum":0,"todyOrderNum":0,"currentMonthCommission":40000,"customerNum":null,"newMemberNum":null,"sumCardConsumption":null,"performanceRanking":1,"yesterdayPerformanceDetailList":null,"todayPerformanceDetailList":null,"monthPerformanceDetailList":null},"code":"000000","e":null};
		var emp_data = {
			//业绩
			performance : app.tools.toThousands(results.data.performance.toFixed(2)),
			//卡耗
			cardConsume : app.tools.toThousands(results.data.cardConsume.toFixed(2)),
			//今日预约单数
			todyAppointmentNum : results.data.todyAppointmentNum,
			//今日订单数
			todyOrderNum : results.data.todyOrderNum,
			//当月提成
			currentMonthCommission : app.tools.toThousands(results.data.currentMonthCommission.toFixed(2)),
			//员工业绩排名
			performanceRanking : results.data.performanceRanking
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
		
	}
};