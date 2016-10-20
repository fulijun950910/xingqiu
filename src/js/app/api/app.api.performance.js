/**
 * Created by jiosn on 16/8/3.
 */
app.api.performance = {
    performanceReport:function(settings) {
    	app.api.ajax({
            url: '/wechatbusinessassists/performanceReport/'+settings.data.merchantId+'/'+settings.data.storeId+'/'+settings.data.userid+'/'+settings.data.type,
            type: 'GET',
            success: settings.success,
            error: settings.error,
            data: settings.data
        })
    },
    empPerformance:function(settings){
    	app.api.ajax({
            url: '/wechatbusinessassists/employeePerformance/'+settings.data.merchantId+'/'+settings.data.storeId+'/'+settings.data.userid,
            type: 'GET',
            success: settings.success,
            error: settings.error,
            data: settings.data
        })
    },
    empPerformanceRank:function(settings){
    	app.api.ajax({
            url: '/wechatbusinessassists/employeePerformanceRankingByMonth/'+settings.data.merchantId+'/'+settings.data.storeId ,
            type: 'GET',
            success: settings.success,
            error: settings.error,
            data: settings.data
        })
    }
}