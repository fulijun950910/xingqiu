/**
 * Created by wzc on 16/7/8.
 */
app.sign = {
    init: function () {

        //签到，签退初始化操作
        $('#signin').on('click',function(){
        	app.sign.alertSign('08:30:00',1);
        	//打卡信息
        	
        });

        //签退
        $('#signexit').on('click',function(){
        	app.sign.alertSign('18:30:00',0);
        	//打卡信息
        })
    },
    //签到=1，签退=0
    alertSign:function(time,type){
    	var alertimg = '';
    	var msg = '';
    	if(type == 1){
    		alertimg = 'images/qiandao.png';
    		msg += '<h4 class="msgtimes">您于'+time+'签到成功</h4>';
    		msg += '<h4 class="msghint">祝您今天工作顺利</h4>';
    	}else if(type == 0){
    		alertimg = 'images/qiantui.png';
    		msg += '<h4 class="msgtimes">您于'+time+'签退成功</h4>';
    		msg += '<h4 class="msggohome">回家路上注意安全哦</h4>';
    	}
    	$('#alertSign>.signMsg>img').attr('src',alertimg);
    	$('#alertSign>.msgcontent').html(msg);
    	$('#alertSign').show().on('click',function(){
    		$('#alertSign').hide();
    	});

    }
}