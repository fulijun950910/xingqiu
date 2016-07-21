/**
 * Created by wzc on 16/7/8.
 */
app.sign = {
    udata:function(){
        //初始化用户信息
        var user = app.userinfo.getEmployee();
        return {
            userid: user.id,
            username: user.name,
            userRole: user.merchantRole.name,
            userImg: app.filePath + user.avatarFileId
        };
    },
    init: function () {
        //展示模板数据
        var userdata = app.sign.udata();
        userdata.date= app.tools.getDate();
        userdata.week= app.tools.getWeek();
        userdata.moment= app.tools.getMoment();

        //初始化打开信息
        app.sign.queryClockin(userdata.userid).then(function(data){

            //打开信息
            userdata.signIn=null;
            userdata.signExit=null;
            if(data && data.length>0){
                for (var i in data) {
                    if(data[i].type==1){
                        userdata.signIn=data[i];
                    }else if(data[i].type==2){
                        userdata.signExit=data[i];
                    }
                }
            }
            userdata.signData=data;

            var tmplhtml=$('#tmpl-sign-model').html();
            var resultTmpl = tmpl(tmplhtml, userdata);
            $('#tmpl-sign').html(resultTmpl);
            app.sign.dynamicClock();

            //签到，签退初始化操作
            $('#signin').on('click',function(){
                //调用扫一扫    
                app.sign.openWxsao1sao();
                //签到成功
                app.sign.alertSign(app.tools.getMoment(),1);
            });

            //签退
            $('#signexit').on('click',function(){
                //调用扫一扫    
                app.sign.openWxsao1sao();
                app.sign.alertSign(app.tools.getMoment(),0);
                //打卡信息
            })

        },function(error){
            app.alert(error);
        });

    },
    //查询打卡信息
    queryClockin:function(employeeId){
        return new Promise(function(resolve,reject){
            app.startLoading();
            app.api.sign.queryClockin({
                data:{
                    employeeId:employeeId,
                    type:3
                },
                success:function(results){
                    app.endLoading();
                    //console.info(results);
                    if(results.success){
                        resolve(results.data);
                    }else{
                        reject(results.message); 
                    }
                },
                error:function(error){
                    app.endLoading();
                    console.info(error);
                    reject(error);
                }
            });
        }); 
    },
    querySignature:function(){
        return new Promise(function(resolve,reject){
            app.api.sign.queryWxSignInfo({
                data:{},
                success:function(results){
                    if(results.success){
                        resolve(results.data);
                    }else{
                        reject(results.message); 
                    }
                }, 
                error:function(error){
                    reject('查询签名信息异常');
                }
            });
        });
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

    },
    //开启扫一扫功能
    openWxsao1sao:function(){
        console.info('调用扫一扫');
        //调用扫一扫
        wx.scanQRCode({
          needResult: 1,
          desc: 'scanQRCode desc',
          success: function (res) {
            console.info(res);
            console.info(JSON.stringify(res));
          }
        });
    },
    //动态时间效果
    dynamicClock:function(){
        setInterval(function(){
            $('#nowMoment').html(app.tools.getMoment());
        },1000);
    }
}

//初始化配置信息
wx.config({
    debug: true,
    appId: 'wx46c138ff8b16aa10', // 必填，公众号的唯一标识
    timestamp: '', // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: 'mei1',// 必填，签名，见附录1
    jsApiList: [ // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        'scanQRCode'
    ] 
});
//初始化成功
wx.ready(function(){
    console.info('success');

});
//初始化失败
wx.error(function(){
    console.info('error');
});