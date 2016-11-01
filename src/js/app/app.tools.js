app.tools={
	//千分位格式化,返回10,000.00
	toThousands:function(num){
		if(!num){
			return '';
		}
		var num = (num/100).toFixed(2);
		//数字千分位格式化
		var numstr = '';
		if (typeof num == 'number') {
			numstr += num;
		}
		if (typeof num == 'string') {
			numstr = num;
		}
		var fmtNum='';
		var narray = numstr.split('.');
		fmtNum=narray[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
		if (narray.length > 1) {
			fmtNum = fmtNum + '.' + narray[1];
		}
    	return fmtNum;
	},
	//显示未查到数据
	show: function (domId) {
		var html = '<div style="width: 100%;text-align: center;color:#555555;"><img style="width:100%;" src="images/404.png"><h5>抱歉,没有查到相关数据...</h5></div>';
		$('#' + domId).html(html);
	},
	//返回，01月01日
	getDate:function(){
		var date = new Date();
		var mounth=date.getMonth();
		mounth = mounth + 1;
		if(mounth < 10){
			mounth = '0'+mounth;
		}
		var day=date.getDate();
		if(day < 10){
			day = '0'+day;
		}
		return mounth+'月'+day+'日';
	},
	//返回，星期
	getWeek:function(){
		var date = new Date();
		var week=new Array('星期日','星期一','星期二','星期三','星期四','星期五','星期六');
		return week[date.getDay()];
	},
	toDetailDate:function(date,nowDate){
		if (date == null||nowDate==null) return;
		date = date.replace(/-/ig, "/");
		nowDate = nowDate.replace(/-/ig, "/");
		date = new Date(date);
		nowDate = new Date(nowDate);
		var time=Math.floor((nowDate-date)/1000)
		if(time<60){
			return "1分钟内"
		}else if(time<60*60){
			return (Math.floor(time/60)<1?1:Math.floor(time/60))+"分钟前"
		}else if(time<60*60*24){
			return Math.floor(time/60/60)+"小时前"
		}else if(time<60*60*24*30){
			return Math.floor(time/60/60/24)+"天前"
		}else if(time<60*60*24*30*3){
			return Math.floor(time/60/60/24/30)+"个月前"
		}else{
			return "3个月前"
		}
	},
	//返回，时分秒=12:00:00
	getMoment:function(){
		var date=new Date();
		//时
		var hours=date.getHours();
		if (hours < 10) {
			hours='0'+hours;
		};
		//分
		var minutes=date.getMinutes();
		if (minutes < 10) {
			minutes='0'+minutes;
		};
		//秒
		var seconds = date.getSeconds();
		if(seconds<10){
			seconds='0'+seconds;
		}
		return hours+':'+minutes+':'+seconds;
	},
	//处理部分IOS不能滑动问题
	resetBodyWH:function(){
		var screenHeight=window.screen.height;
		$('body').css('height',screenHeight+'px');
	},
	resetBodyScroll:function(){
		window.scrollTo(0,0);
	},
	getCookie:function(cookie_name){
		// var allcookies = document.cookie;
		// var cookie_pos = allcookies.indexOf(cookie_name);
		// if (cookie_pos != -1)
		// {
		// 	cookie_pos += cookie_name.length + 1;
		// 	var cookie_end = allcookies.indexOf(";", cookie_pos);
		// 	if (cookie_end == -1)
		// 	{
		// 		cookie_end = allcookies.length;
		// 	}
		// 	var value = unescape(allcookies.substring(cookie_pos, cookie_end));
		// }
		// return value;
	}
}