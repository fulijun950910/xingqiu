app.tools = {
    //千分位格式化,返回10,000.00
    toThousands: function(num) {
        if (num == 0) {
            return "0.00";
        }
        if (!num && num != 0) {
            return '0.00';
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
        var html = '<div class="errorBox"><i class="ic icon-xiaolian"></i><span class="errorText"> 抱歉,暂时没有查到数据...</span></div>';
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
    substr: function(item, len) {
        if (!item) {
            return;
        }
        return item.substr(0, len);
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
        var constantName = "";
        if (!constant) {
            return null;
        }
        if (!value) {
            return null;
        }
        for (var i = constant.length - 1; i >= 0; i--) {
            if (constant[i].code == value) {
                constantName = constant[i].name;
                break;
            }
        }
        return constantName;
    },
    changePrice: function(price) {
        return app.tools.toThousands(price).split('.');
    },
    //初始化swiper
    initSwiper: function(leftWidth) {
        var mySwiper = new Swiper('.swiper-container', {
            autoHeight: true,
            onSlideChangeEnd: function(swiper) {
                var j = mySwiper.activeIndex;
                $('.tool-tab li').removeClass('active');
                $('.tool-tab li').eq(j).addClass('active');
                $('.line').addClass('line-animation');
                $('.line-animation').css('left', j * leftWidth + 'vw');
                mySwiper.slideTo(i, 10, false);
            }
        });
        $('.tool-tab').on('click', 'li', function(e) {
            //取消事件的默认动作。
            e.preventDefault();
            //得到当前索引
            var i = $(this).index();
            mySwiper.slideTo(i, 10, false);
            $('.line').addClass('line-animation');
            $('.tool-tab li').removeClass('active');
            $(this).addClass('active');
            $('.line-animation').css('left', i * leftWidth + 'vw');
            mySwiper.slideTo(i, 10, false);
        });
    },
    initCystomDate: function(type, idName) {
        //取消自定义事件选择
        $('#' + idName).find('.cystomDate').on('click', '.cancelDate', function() {
            $('#' + idName).find('.cystomDate .date_menu').removeClass('date_menu_active');
            $('#' + idName).find('.cystomDate .mask').removeClass('mask_show');
            $('#' + idName).find('.dateLists span').removeClass('active').find('i').remove();
            if (type) {
                $('#' + idName).find('.dateLists span').eq(parseInt(type) - 1).addClass('active');
            }
        });
        $('#' + idName).find('.cystomDate').on('click', '.mask', function() {
            $('#' + idName).find('.date_menu').removeClass('date_menu_active');
            $('#' + idName).find('.mask').removeClass('mask_show');
            $('#' + idName).find('.cystomDate .date_menu').removeClass('date_menu_active');
            $('#' + idName).find('.cystomDate .mask').removeClass('mask_show');
            $('#' + idName).find('.dateLists span').removeClass('active').find('i').remove();
            if (type) {
                $('#' + idName).find('.dateLists span').eq(parseInt(type) - 1).addClass('active');
            }
        });
    },
    //初始化
    initDate: function(type, idName) {
        $('#' + idName).find('.dateList').click(function() {
            $('#' + idName).find('.dateLists').fadeIn(200);
            $('#' + idName).find('.dateLists .mask').addClass('mask_show');
            $('#' + idName).find('.dateLists .date_menu').addClass('date_menu_active');
            $('#' + idName).find('.dateLists .mask').height($('.bd').height());
            //判断是否有选中active
            if (!$('#' + idName).find('.dateLists span').hasClass('active')) {
                $('#' + idName).find('.dateLists span:first').addClass('active');
            }
        });
        //取消
        $('#' + idName).find('.dateLists').on('click', '.mask', function() {
            $('#' + idName).find('.date_menu').removeClass('date_menu_active');
            $('#' + idName).find('.mask').removeClass('mask_show');
            $('#' + idName).find('.cystomDate .date_menu').removeClass('date_menu_active');
            $('#' + idName).find('.cystomDate .mask').removeClass('mask_show');
            $('#' + idName).find('.dateLists span').removeClass('active').find('i').remove();
            if (type) {
                $('#' + idName).find('.dateLists span').eq(parseInt(type) - 1).addClass('active');
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
    getDateType: function(type, data, date) {
        switch (parseInt(type)) {
            //今日
            case 1:
                data.startDate = moment().format('YYYY-MM-DD ') + "00:00:00";
                data.endDate = moment().format('YYYY-MM-DD ') + "23:59:59";
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
    initStoreList: function(idName) {
        //展开门店选择
        $('#' + idName).on('click', '.storeList', function(event) {
            event.preventDefault();
            $('#' + idName).find('.storeLists').fadeIn(200);
            $('#' + idName).find('.storeLists .mask').addClass('mask_show');
            $('#' + idName).find('.stores').addClass('stores-active');
            $('#' + idName).find('.mask').height($('.bd').height());
        });
        $('#' + idName).find('.storeList').find('.store_name').find('')
            //关闭门店选择
        $('#' + idName).find('.storeLists').on('click', '.mask', function(event) {
            $('#' + idName).find('.stores').removeClass('stores-active');
            $('#' + idName).find('.storeLists .mask').removeClass('mask_show');
        });
        $('#' + idName).on("touchmove", ".mask", function(e) {
            e.preventDefault();
            e.stopPropagation();
        })
    },
    // 自定义弹出层
    initTempData: function(className, idName) {
        $('.' + className).on("touchstart", function() {
            $('#' + idName).find('.tempLists').fadeIn(200);
            $('#' + idName).find('.tempLists .mask').addClass('mask_show');
            $('#' + idName).find('.tempLists .date_menu').addClass('date_menu_active');
            $('#' + idName).find('.tempLists .mask').height($('.bd').height());
            //判断是否有选中active
            if (!$('#' + idName).find('.tempLists span').hasClass('active')) {
                $('#' + idName).find('.tempLists span:first').addClass('active');
            }
        });
        //取消
        $('#' + idName).find('.tempLists').on('touchend', '.mask', function() {
            $('#' + idName).find('.date_menu').removeClass('date_menu_active');
            $('#' + idName).find('.mask').removeClass('mask_show');
            $('#' + idName).find('.tempLists span').removeClass('active').find('i').remove();
        });
        $('#' + idName).on("touchmove", ".mask", function(e) {
            e.preventDefault();
            e.stopPropagation();
        })
    },
    changeTitle: function(title) {
        var $body = $('body');
        document.title = title;
        var $iframe = $('<iframe src="/favicon.ico"></iframe>');
        $iframe.on('load', function() {
            setTimeout(function() {
                $iframe.off('load').remove();
            }, 0);
        }).appendTo($body);
    },
    tagColor: function(i, num) {
        if (!i) {
            return 0;
        }
        i = parseFloat(i);
        i = parseFloat(i % num)
        return Math.abs(i);

    },
    toTop: function() {
        var altHtml = '';
        altHtml += '<div id="toTop" style="display:none;position:fixed;bottom:30vw;right:10vw;width:10vw;height:10vw;border-radius:100%;z-index:15;">';
        altHtml += '<a href="javascript:scroll(0,0)"><i style="color:#04CBC7;font-size:5rem;" class="ic icon-dingbu"></i></a>';
        altHtml += '</div>';
        if ($("#top").length == 0) {
            $('body').append(altHtml);
            $(window).scroll(function() {
                if ($(window).scrollTop() < $(window).height()) {
                    $("#toTop").hide();
                } else {
                    $("#toTop").show();
                }
            });
        }
    },
    seeImg: function() {
        $("body img").tap("", function(e) {
            e.stopPropagation();
            e.preventDefault()
            var src = $(this.ele).attr("src");
            var altHtml = '';
            altHtml += '<div id="imgBlack" layout="row" layout-align="center center" style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:99;background:rgba(0,0,0,0.8)">';
            altHtml += '<img style="width:100%;" src="' + src + '"/>';
            altHtml += '</div>';
            $('body').append(altHtml);
        })
        $("body").tap("#imgBlack", function() {
            $("#imgBlack").remove();
        })

        $("body").on("touchmove", "#imgBlack", function(e) {
            e.stopPropagation();
            e.preventDefault()
        })
        $("body img").on("touchstart", function(e) {
            e.stopPropagation();
        })
        $("body img").on("touchend", function(e) {
            e.stopPropagation();
        })
    }
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
