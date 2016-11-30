app.tools = {
    //千分位格式化,返回10,000.00
    toThousands: function(num) {
        if (num == 0) {
            return "0.00";
        }
        if (!num && num != 0) {
            return '';
        }
        var num = (num / 100).toFixed(2);
        //数字千分位格式化
        var numstr = '';
        if (typeof num == 'number') {
            numstr += num;
        }
        if (typeof num == 'string') {
            numstr = num;
        }
        var fmtNum = '';
        var narray = numstr.split('.');
        fmtNum = narray[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
        if (narray.length > 1) {
            fmtNum = fmtNum + '.' + narray[1];
        }
        return fmtNum;
    },
    //显示未查到数据
    show: function(domId) {
        var html = '<div style="width: 100%;text-align: center;color:#8c8c8c;padding-top: 5vw;"><i class="ic icon-xiaolian" style="font-size: 6vw;"></i><span style="font-size: 4vw;color:#8c8c8c"> 抱歉,暂时没有查到数据...</span></div>';
        $('#' + domId).html(html);
    },
    // noData(): function() {
    //     var html = '<div style="width: 100%;text-align: center;color:#555555;"><i class="ic icon-xiaolian" style="font-size: 16vw;"></i><span style="font-size: 4vw;"> 抱歉,暂时没有查到数据...</span></div>';
    //     $('#' + domId).html(html);
    // },
    //返回，01月01日
    getDate: function() {
        var date = new Date();
        var mounth = date.getMonth();
        mounth = mounth + 1;
        if (mounth < 10) {
            mounth = '0' + mounth;
        }
        var day = date.getDate();
        if (day < 10) {
            day = '0' + day;
        }
        return mounth + '月' + day + '日';
    },
    //返回，星期
    getWeek: function() {
        var date = new Date();
        var week = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
        return week[date.getDay()];
    },
    toDetailDate: function(date, nowDate) {
        if (date == null || nowDate == null) return;
        date = date.replace(/-/ig, "/");
        nowDate = nowDate.replace(/-/ig, "/");
        date = new Date(date);
        nowDate = new Date(nowDate);
        var time = Math.floor((nowDate - date) / 1000)
        if (time < 60) {
            return "1分钟内"
        } else if (time < 60 * 60) {
            return (Math.floor(time / 60) < 1 ? 1 : Math.floor(time / 60)) + "分钟前"
        } else if (time < 60 * 60 * 24) {
            return Math.floor(time / 60 / 60) + "小时前"
        } else if (time < 60 * 60 * 24 * 30) {
            return Math.floor(time / 60 / 60 / 24) + "天前"
        } else if (time < 60 * 60 * 24 * 30 * 3) {
            return Math.floor(time / 60 / 60 / 24 / 30) + "个月前"
        } else {
            return "3个月前"
        }
    },
    sliceStr: function(str, len) {
        if (!str) {
            return;
        }
        var realLength = 0,
            length = str.length,
            charCode;
        for (var i = 0; i < length; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) {
                realLength += 1;
            } else {
                realLength += 2;
            }
            if (realLength > len) {
                return str.slice(0, i) + "..."
            };
        }
        return str;
    },
    toDate: function(date, fmt) {
        if (date == null) return;
        date = date.replace(/-/ig, "/");
        var date = new Date(date);
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    //返回，时分秒=12:00:00
    getMoment: function() {
        var date = new Date();
        //时
        var hours = date.getHours();
        if (hours < 10) {
            hours = '0' + hours;
        };
        //分
        var minutes = date.getMinutes();
        if (minutes < 10) {
            minutes = '0' + minutes;
        };
        //秒
        var seconds = date.getSeconds();
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        return hours + ':' + minutes + ':' + seconds;
    },
    formatDate: function(date) {
        if (!date)
            return "";
        return moment(date).format('YYYY-MM-DD');
    },
    //处理部分IOS不能滑动问题
    resetBodyWH: function() {
        var screenHeight = window.screen.height;
        $('body').css('height', screenHeight + 'px');
    },
    resetBodyScroll: function() {
        window.scrollTo(0, 0);
    },
    getCookie: function(cookie_name) {
        // var allcookies = document.cookie;
        // var cookie_pos = allcookies.indexOf(cookie_name);
        // if (cookie_pos != -1)
        // {
        //  cookie_pos += cookie_name.length + 1;
        //  var cookie_end = allcookies.indexOf(";", cookie_pos);
        //  if (cookie_end == -1)
        //  {
        //      cookie_end = allcookies.length;
        //  }
        //  var value = unescape(allcookies.substring(cookie_pos, cookie_end));
        // }
        // return value;
    },
    getConstantByValue: function(constant, value) {
        if (!constant) {
            return null;
        }
        if (!value) {
            return null;
        }
        for (var i = constant.length - 1; i >= 0; i--) {
            if (constant[i].code == value) {
                return constant[i].name;
            }
        }
    },
    changePrice: function(price) {
        return app.tools.toThousands(price).split('.');
    },
    //初始化swiper
    initSwiper: function() {
        var mySwiper = new Swiper('.swiper-container', {
            autoHeight: true,
            onSlideChangeEnd: function(swiper) {
                var j = mySwiper.activeIndex;
                $('.line-animation').css('left', j * 25 + 'vw');
                $('.line').addClass('line-animation');
                $('.tool-tab li').removeClass('active');
                $('.tool-tab li').eq(j).addClass('active');
                mySwiper.slideTo(i, 1000, false);
            }
        });
        $('.tool-tab').on('click', 'li', function(e) {
            //取消事件的默认动作。
            e.preventDefault();
            //得到当前索引
            var i = $(this).index();
            mySwiper.slideTo(i, 1000, false);
            $('.line-animation').css('left', i * 25 + 'vw');
            $('.line').addClass('line-animation');
            $('.tool-tab li').removeClass('active');
            $(this).addClass('active');
            mySwiper.slideTo(i, 1000, false);
        });
    },
    initCystomDate: function(type) {
        //取消自定义事件选择
        $('.cystomDate').on('click', '.cancelDate', function() {
            $('.cystomDate .date_menu').removeClass('date_menu_active');
            $('.cystomDate .mask').removeClass('mask_show');
            $('#dateList span').removeClass('active').find('i').remove();
            if (type) {
                $('#dateList span').eq(parseInt(type) - 1).addClass('active');
            }
        });
        $('.cystomDate').on('click', '.mask', function() {
            $('.date_menu').removeClass('date_menu_active');
            $('.mask').removeClass('mask_show');
            $('.cystomDate .date_menu').removeClass('date_menu_active');
            $('.cystomDate .mask').removeClass('mask_show');
            $('#dateList span').removeClass('active').find('i').remove();
            if (type) {
                $('#dateList span').eq(parseInt(type) - 1).addClass('active');
            }
        });
    },
    //初始化
    initDate: function(type) {
        $('.dateList').click(function() {
            $('#dateList').fadeIn(200);
            $('#dateList .mask').addClass('mask_show');
            $('#dateList .date_menu').addClass('date_menu_active');
            $('#dateList .mask').height($('.bd').height());
            //判断是否有选中active
            if (!$('#dateList span').hasClass('active')) {
                $('#dateList span:first').addClass('active');
            }
        });
        //取消
        $('#dateList').on('click', '.mask', function() {
            $('.date_menu').removeClass('date_menu_active');
            $('.mask').removeClass('mask_show');
            $('.cystomDate .date_menu').removeClass('date_menu_active');
            $('.cystomDate .mask').removeClass('mask_show');
            $('#dateList span').removeClass('active').find('i').remove();
            if (type) {
                $('#dateList span').eq(parseInt(type) - 1).addClass('active');
            }
        });
    },
    //自定义初始化时间
    setDate: function(date) {
        var startDate = moment().format('YYYY-MM-DD') + "T" + "00:00";
        var endDate = moment().format('YYYY-MM-DD') + "T" + "23:59";
        if (date && date.startDate) {
            startDate = moment(date.startDate).format('YYYY-MM-DD') + "T" + moment(date.startDate).format('HH:mm:ss');
            endDate = moment(date.endDate).format('YYYY-MM-DD') + "T" + moment(date.endDate).format('HH:mm:ss');
        }
        $(".startDate").val(startDate);
        $('.endDate').val(endDate);
    },
    getDateType: function(type, data,date) {
        switch (parseInt(type)) {
            //今日
            case 1:
                data.startDate = moment().format('YYYY-MM-DD ') + "00:00:00";
                data.endDate = moment().format('YYYY-MM-DD HH:mm:ss');
                break;
                //昨天
            case 2:
                data.startDate = moment().subtract(1, "days").format('YYYY-MM-DD ') + "00:00:00";
                data.endDate = moment().subtract(1, "days").format('YYYY-MM-DD ') + "23:59:59";
                break;
                //本月
            case 3:
                data.startDate = moment().subtract(0, "month").startOf("month").format('YYYY-MM-DD ') + "00:00:00";
                data.endDate = moment().subtract(0, "month").endOf('month').format('YYYY-MM-DD ') + "23:59:59";
                break;
            case 4:
                if ($('.startDate').val()) {
                    data.startDate = moment($('.startDate').val()).format('YYYY-MM-DD HH:mm:') + "00";
                    date.startDate = data.startDate;
                } else {
                    data.startDate = date.startDate;
                }
                if ($('.endDate').val()) {
                    data.endDate = moment($('.endDate').val()).format('YYYY-MM-DD HH:mm:') + "59";
                    date.endDate = data.endDate;
                } else {
                    data.endDate = date.endDate;
                }
                break;
        }
    },
    getDateName: function(code, data) {
        var result = [];
        if (!code) {
            return "今日";
        }
        if (data) {
            result[4] = moment(data.startDate).format('YYYY-MM-DD') + "~" + moment(data.endDate).format('YYYY-MM-DD');
        }
        result[1] = "今日";
        result[2] = "昨天";
        result[3] = "本月";
        return result[code];
    },
    //初始化门店切换
    initStoreList: function() {
        //展开门店选择
        $('.storeList').click(function() {
            $('.storeLists').fadeIn(200);
            $('.storeLists .mask').addClass('mask_show');
            $('.stores').addClass('stores-active');
            $('.mask').height($('.bd').height());
        })
        $('.storeList').find('.store_name').find('')
            //关闭门店选择
        $('.storeLists').on('click', '.mask', function(event) {
            $('.stores').removeClass('stores-active');
            $('.storeLists .mask').removeClass('mask_show');
        });
    },
}

//处理url参数
String.prototype.getParameterKey = function(arg) {
        var parameter = this.substr(1, this.length);
        var parameters = parameter.split('&');
        for (var ii = 0; ii < parameters.length; ii++) {
            var key_value = parameters[ii];
            if (key_value.split('=')[0] == arg) {
                return key_value.split('=')[1];
            }
        }
        return '';
    }
    //URL根据Key获取value值
window.keyGetValue = function(key) {
    var url = window.location;
    return url.search.getParameterKey(key);
}
