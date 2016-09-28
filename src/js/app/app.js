/**
 * Created by wzc on 16/8/2.
 */
var app = {};

app.init = function() {
};

window.onerror = function () {
    if ($('#container').children().length > 1){
        $('#container').find('div:first').remove();
    }   
    return true;
}

Date.prototype.format = function(format){
    var o = {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(), //day
        "h+" : this.getHours(), //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3), //quarter
        "S" : this.getMilliseconds() //millisecond
    }

    if(/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }

    for(var k in o) {
        if(new RegExp("("+ k +")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
        }
    }
    return format;
}

String.prototype.format = function(format){
    var de=new Date(this);
    return de.format(format);
}

//百度统计代码
var baiduStatistical={
    /**
     * 百度统计 事件追踪
     * category 必填 监控目标类型名称 ex:管理员，员工
     * action   必填 用户目标交互行为 ex:click，update
     * lable    非必填 事件额外信息   ex: 随意填写
     * value    非必填 事件额外数据信息  ex:时间，权重
     * 
     * 百度统计 页面追踪
     * parames={category:'管理员',label:'当日订单',val:'管理员-当日订单',action:'click'}
     * baiduStatistical.add({category:'管理员',label:'当日订单',val:'',action:'click'});
     * */
    add:function(parames){
        window._hmt && _hmt.push(['_trackEvent', parames.category, parames.action, parames.label||'', parames.val||'']);
    }
}