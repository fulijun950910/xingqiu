app.tools={
	//千分位格式化,返回10,000.00
	toThousands:function(num){
		if(!num){
			return '';
		}
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
	}

}