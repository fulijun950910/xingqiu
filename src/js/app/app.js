/**
 * Created by wzc on 16/8/2.
 */
var app = {};

app.init = function() {
};

window.onerror = function () {
    if ($('#container') && $('#container').children().length > 1){
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
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function(searchElement, fromIndex) {

      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If len is 0, return false.
      if (len === 0) {
        return false;
      }

      // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)
      var n = fromIndex | 0;

      // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(searchElement, elementK) is true, return true.
        // c. Increase k by 1.
        // NOTE: === provides the correct "SameValueZero" comparison needed here.
        if (o[k] === searchElement) {
          return true;
        }
        k++;
      }

      // 8. Return false
      return false;
    }
  });
}
String.prototype.format = function(format){
    var de=new Date(this);
    return de.format(format);
}
if ($ && $.fn) {
  $.fn.tap = function (element, fun) {
      var ele = this
      if (arguments.length == 0) {
          $(ele).trigger("touchstart")
          $(ele).trigger("touchend")
          return;
      }
      ele.on("touchstart", element, function (e) {
          ele.on("touchend", element, function (e) {
              var params = {
                  ele: this,
                  fun: fun
              }
              params.fun(e);
              ele.off("touchend");
          })
          setTimeout(function () {
              ele.off("touchend")
          }, 800)
          ele.on("touchmove", function (e) {
              ele.off("touchend");
          })

      })
  } 
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