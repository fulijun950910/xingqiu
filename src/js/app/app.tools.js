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
	getCookie:function(key){
		var ckes=document.cookie;
		ckes = $.trim(ckes);
		if(!ckes){
			return null;
		}
		ckes = ckes.split(';');
		for (var i=0; i < ckes.length-1; i++) {
			var ck = ckes[i].split('=');
			if(key == $.trim(ck[0])){
				return $.trim(ck[1]);
			}
		};
		return null;
	},
	setCookie:function(key,val){
		var de = new Date();
		document.cookie = key + '=' + val +';expire='+de.toGMTString()+';path:/';
	},
	setAllCookie:function(){
		//获取本地存储cookie信息
		var jsession = localStorage.getItem('JSESSIONID');
		var rememberMe = localStorage.getItem('rememberMe');
		var remeberMeRunAsRole = localStorage.getItem('remeberMeRunAsRole');
		if(jsession && rememberMe && remeberMeRunAsRole){
			app.tools.setCookie('JSESSIONID',jsession);
			app.tools.setCookie('rememberMe',rememberMe);
			app.tools.setCookie('remeberMeRunAsRole',remeberMeRunAsRole);
		}
	}
}