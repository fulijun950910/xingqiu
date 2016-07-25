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
		var html = '<div style="width: 100%;text-align: center;line-height: 10;"><i class="weui_icon_msg weui_icon_warn"></i><span>未查到数据</span></div>';
		$('#' + domId).html(html);
	},
	//返回，01月01日
	getDate:function(){
		var date = new Date();
		var mounth=date.getMonth();
		mounth = mounth + 1;
		if(mounth > 9){
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
	}
}