
/**
 *	员工业绩排名
 */
app.performance.rank={

	//当前门店ID
	currentStoreid:'',
	//初始化排名数据
	init : function () {
		//鉴别身份
        var urole=app.performance.userrole_init();
        var uinfo = app.performance.emp.userinfo();
        if(urole==2){
            //员工,查询当前门店业绩排名 
			app.performance.rank.getEmpRankList(uinfo.merchantId,uinfo.storeId).then(function(results){
				app.performance.rank.modelToView(results,uinfo.userid);
				//隐藏门店选择列表
				$('#showActionSheet_rank').hide();
			},function(error){
				app.alert(error);
			});
        }else if(urole==1){
            //管理者,查询被中门店业绩排名
            app.performance.userrole_init();
            var storelist=app.performance.getStoreList;
			//获取查询店铺信息
			var currentStoreid = app.performance.currentStoreid;
			var storeidarray = currentStoreid.split(',');
			app.performance.rank.currentStoreid = storeidarray[0];
			//默认第一家店
            app.performance.rank.getEmpRankList(uinfo.merchantId,storeidarray[0]).then(function(results){
				var results = results;
	    		for (var i = 0; i < storelist.length;i ++) {
	    			if(storelist[i].id==storeidarray[0]){
	    				results.storeName=storelist[i].name;
	    				break;
	    			}
				}
				results.storelist = storelist;
				app.performance.rank.modelToView(results,uinfo.userid);
				//展示门店选择
				$('#showActionSheet_rank').show();

				//初始化选择门店事件
				app.performance.rank.bindClickStoreList();
			},function(error){
				app.alert(error);
			});

        }
	},
	bindClickStoreList:function(){
		//处理门店选择
		$('#storeRankSheet').on('click','.weui_actionsheet_cell',function(){
			//获取门店ID;
			var storeid = $(this).attr('name');
			var storeName = $(this).html();
			$('#actionsheet_cancel_rank').click();
			//当前门店ID
			app.performance.rank.currentStoreid=storeid;
			//获取数据
			app.performance.rank.getEmpRankList(app.performance.emp.userinfo().merchantId,storeid)
			.then(function(results){
				results.storeName=storeName;
				app.performance.rank.modelToView(results,app.performance.emp.userid);
				//展示门店选择
				$('#showActionSheet_rank').show();
				app.performance.rank.bindClickStoreList();
			},function(error){
				app.alert(error);
			});
		});
		//初始化页面选择门店事件
		$('#container').on('click', '#showActionSheet_rank', function () {
                var mask = $('#mask_rank');
                var weuiActionsheet = $('#weui_actionsheet_rank');
                weuiActionsheet.addClass('weui_actionsheet_toggle');
                mask.show()
                    .addClass('weui_fade_toggle').one('click', function () {
                        hideActionSheet(weuiActionsheet, mask);
                });
                $('#actionsheet_cancel_rank').one('click', function () {
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
	}
	,
	modelToView:function(results,userid){
		var emp_rank = {
			userid: userid,
			storeName: results.storeName,
			//门店列表
			storelist: app.performance.getStoreList
		}
		//处理业绩数据
		var rankdata=[];
		for (var u in results.data) {
			rankdata.push({
				userid:results.data[u].employeeId,
				employeeName:results.data[u].employeeName,
				performance:app.tools.toThousands(results.data[u].performance.toFixed(2))
			});
		};
		emp_rank.data = rankdata;
		//员工排名
		var tmplhtml = $('#tmpl-emp-rank').html();
		var resultTmpl = tmpl(tmplhtml, emp_rank);
		$('#performance_rank').html(resultTmpl);
	},
	//获取员工业绩排名
	getEmpRankList:function(merchantId,storeId){
		return new Promise(function(resolve,reject){
			app.api.performance.empPerformanceRank({
				data:{
					merchantId: merchantId,
					storeId: storeId
				},
				success: function(results){
					if(results.success){
						if (results.data && results.data.length<=0) {
							app.tools.show('performance_rank');
						};
						resolve(results);
					}else{
						reject(results.message);
					}
				},
				error: function(error){
					reject('服务器开小差啦~');
				}
			});
		});
	}

}