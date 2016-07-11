app.userinfo={
	init:function(){
		
        
	},
    selRoleBox:function(cb){
        //弹出选择角色门店信息列表
        $('#select_shade').show();
        $('.select_panel li a').on('click',function(){
            $('i[class="icon icon-ios-checkmark-outline"]').removeClass('icon icon-ios-checkmark-outline');
            $(this).find('i').addClass('icon icon-ios-checkmark-outline');
        });

        $('#role_sel_btn').on('click',function(){
            $('#select_shade').hide();
             return cb($('i[class="icon icon-ios-checkmark-outline"]').attr('storeId'));
        });
    }
}