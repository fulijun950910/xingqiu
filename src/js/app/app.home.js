/**
 * Created by wzc on 16/8/2.
 */
app.home = {
    init : function () {
        
    }
}

//微信alert弹窗
app.alert=function(msg,title){
	var msg = msg || '';
	var title = title || '提示';
	if(!($('#dialog2').length>0)){
		var altHtml = '';
			altHtml+= '<div class="weui_dialog_alert" id="dialog2" style="display: none;">';
			altHtml+= '<div class="weui_mask"></div>';
			altHtml+= '<div class="weui_dialog">';
			altHtml+= '<div class="weui_dialog_hd"><strong class="weui_dialog_title">'+title+'</strong></div>';
			altHtml+= '<div class="weui_dialog_bd">'+msg+'</div>';
			altHtml+= '<div class="weui_dialog_ft">';
			altHtml+= '<a href="javascript:;" class="weui_btn_dialog primary">确定</a>';
			altHtml+= '</div></div></div>';
		$('body').append(altHtml);
	}
	$('#dialog2').show().on('click', '.weui_btn_dialog', function () {
        $('#dialog2').off('click').hide();
        return true;
    });
}

//微信confirm问询窗
app.confirm=function(msg,title){
	var msg = msg || '';
	var title = title || '提示';
	if(!($('#dialog1').length>0)){
		var confirmHtml = '';
			confirmHtml+= '<div class="weui_dialog_confirm" id="dialog1" style="display: none;">';
			confirmHtml+= '<div class="weui_mask"></div>';
			confirmHtml+= '<div class="weui_dialog">';
			confirmHtml+= '<div class="weui_dialog_hd"><strong class="weui_dialog_title">'+title+'</strong></div>';
			confirmHtml+= '<div class="weui_dialog_bd">'+msg+'</div>';
			confirmHtml+= '<div class="weui_dialog_ft">';
			confirmHtml+= '<a href="javascript:;" class="weui_btn_dialog default">取消</a>';
			confirmHtml+= '<a href="javascript:;" class="weui_btn_dialog primary">确定</a>';
			confirmHtml+= '</div></div></div>';
		$('body').append(confirmHtml);
	}
	$('#dialog1').show().on('click', '.weui_btn_dialog', function () {
        $('#dialog1').off('click').hide();
        return true;
    });
}

