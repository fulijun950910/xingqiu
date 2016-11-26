//初始化门店切换
function initIncomeStoreList() {
    //展开门店选择
    $('.income .breadCrumbs').on('click', '.storeList', function(event) {
        $('.income .storeLists').fadeIn(200);
        $('.income .storeLists .mask').addClass('mask_show');
        $('.income .stores').addClass('stores-active');
        $('.income .mask').height($('.bd').height());
    });
    //关闭门店选择
    $('.income .storeLists').on('click', '.mask', function(event) {
        $('.stores').removeClass('stores-active');
        $('.storeLists .mask').removeClass('mask_show');
    });
    //点击切换门店
    $('.income .storeLists .stores').on('click', 'span', function(event) {
        console.log(11);
        $('.storeLists span').removeClass('active').find('i').remove();
        $(this).addClass('active').append('<i></i>');
        $('.income .storeLists .mask').click();
        app.income.getIncomeSourceInfo($(this).attr('data-id'), 'storeIds');
    });
};

//初始化时间切换
function initIncomeDate() {
    $('.income').on('click', '.dateList', function() {
        $('#dateList').fadeIn(200);
        $('#dateList .mask').addClass('mask_show');
        $('.date_menu').addClass('date_menu_active');
        $('.mask').height($('.bd').height());
        //判断是否有选中active
        if (!$('#dateList span').hasClass('active')) {
            $('#dateList span:first').addClass('active');
        }
    });
    $('.income #dateList').on('click', '.mask', function() {
        $('.date_menu').removeClass('date_menu_active');
        $('#dateList .mask').removeClass('mask_show');
    });
    //点击切换日期
    $('.income #dateList .date_info').on('click', 'span', function(event) {
        $('#dateList span').removeClass('active').find('i').remove();
        $(this).addClass('active');
        $('.income #dateList .mask').click();
        app.income.getIncomeSourceInfo(parseInt($(this).attr('data-type')), 'date');
    });
};

function initIncomeData() {
    $('.income .storeList .store_name').attr('data-storeId', "");
    $('.income #employeeList .employee_item').attr('data-userId', '');
    $('.income #employeeList .employee_item').attr('data-employeeId', '');
    $('.income #employeeList .employee_item').attr('data-merchantId', '');
};

function getDateName(code) {
    if (!code)
        return "今日";
    var data = [];
    data[1] = "今日";
    data[2] = "昨天";
    data[3] = "本月";
    return data[code];
};

//获取时间
function getDateType(type, data) {
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
    }
};
//1现金、2POS、3微信、4支付宝、5团购、6减免、7欠款、8会员卡耗、9券、10店内活动、11赠品、12自定义
var icons = ["68a;", "690;", "692;", "68d;", "687;", "689;", "68f;", "691;", "694;", "693;", "68e;", "68f;"];
var rgbs = ["#00cbc7", "#f65d69", "#75d140", "#25a9ee"];

//计算员工。管理员业绩与卡耗
function changePerformanceInfo(memberData) {
    memberData.totalAmount = 0;
    for (var i = memberData.performanceInfo.length - 1; i >= 0; i--) {
        memberData.totalAmount += memberData.performanceInfo[i][1];
        memberData.performanceInfo[i][1] = app.tools.toThousands(memberData.performanceInfo[i][1]).split('.');
        switch (memberData.performanceInfo[i][0]) {
            case '现金':
                memberData.performanceInfo[i].push(icons[0], rgbs[0]);
                break;
            case 'POS':
                memberData.performanceInfo[i].push(icons[1], rgbs[1]);
                break;
            case '微信支付':
                memberData.performanceInfo[i].push(icons[2], rgbs[2]);
                break;
            case '支付宝':
                memberData.performanceInfo[i].push(icons[3], rgbs[3]);
                break;
            case '团购':
                memberData.performanceInfo[i].push(icons[4], rgbs[i % 4]);
                break;
            case '减免':
                memberData.performanceInfo[i].push(icons[5], rgbs[i % 4]);
                break;
            case '欠款':
                memberData.performanceInfo[i].push(icons[6], rgbs[i % 4]);
                break;
            case '会员卡耗':
                memberData.performanceInfo[i].push(icons[7], rgbs[i % 4]);
                break;
            case '券':
                memberData.performanceInfo[i].push(icons[8], rgbs[i % 4]);
                break;
            case '店内活动':
                memberData.performanceInfo[i].push(icons[9], rgbs[i % 4]);
                break;
            case '赠品':
                memberData.performanceInfo[i].push(icons[10], rgbs[i % 4]);
                break;
            default:
                memberData.performanceInfo[i].push(icons[icons.length - 1], rgbs[i % 4]);
                break;
        }
    }
    memberData.totalAmount = app.tools.toThousands(memberData.totalAmount).split('.');
};
//初始化日期
app.income = {

    userdata: function() {
        //初始化用户信息
        return new Promise(function(resolve, reject) {
            app.userinfo.getEmployee().then(function(user) {
                resolve(user);
            }, function() {});
        });
    },
    init: function() {
        app.income.userdata().then(function(userData) {
            if (userData) {
                app.income.getIncomeSourceInfo(true, "init");
            }
        }, function() {})
    },
    getIncomeSourceInfo: function(result, type) {
        var employee = null;
        if (localStorage.employee && JSON.parse(localStorage.employee)) {
            employee = JSON.parse(localStorage.employee);
        }
        var data = {
            'merchantId': employee.merchantId,
        }
        var memberData = {
            //门店列表
            storeList: employee.storeList, //门店列表
            storeIds: employee.storeIds
        };
        var storeIds = $('.income .storeList .store_name').attr('data-storeId');
        if (storeIds && storeIds.trim()) {
            memberData.storeId = $('.income .storeList .store_name').attr('data-storeId');
            data.storeIds = $('.income .storeList .store_name').attr('data-storeId');
        } else {
            memberData.storeId = employee.storeIds;
            data.storeIds = employee.storeIds;
        }
        var dataType = $('.income .dateList .date_name').attr('data-type');
        if (dataType && dataType.trim()) {
            memberData.dataType = $('.income .dateList .date_name').attr('data-type');
            getDateType(memberData.dataType, data);
        } else {
            memberData.dataType = 1;
            data.startDate = moment().format('YYYY-MM-DD ') + "00:00:00";
            data.endDate = moment().format('YYYY-MM-DD HH:mm:ss');
        }
        switch (type) {
            case 'storeIds':
                data.storeIds = result;
                memberData.storeId = result;
                break;
            case 'date':
                getDateType(result, data);
                memberData.dataType = result;
                break;
            case 'init':
                var performanceInfo = null;
                if (localStorage.performanceInfo && JSON.parse(localStorage.performanceInfo)) {
                    performanceInfo = JSON.parse(localStorage.performanceInfo);
                }
                data.storeIds = performanceInfo.storeIds;
                //自定义
                if (performanceInfo.dataType == 4) {
                    data.startDate = performanceInfo.startDate;
                    data.endDate = performanceInfo.startDate;
                } else {
                    getDateType(performanceInfo.dataType, data);
                }
                break;
        }
        app.income.getIncomeData(data).then(function(incomeInfoData) {

                memberData.performanceInfo = incomeInfoData;
                //计算业绩、提成、卡耗
                changePerformanceInfo(memberData);
                //修改html 的title
                app.changeTitle('收入来源');
                var tmplhtml = $('#tmpl-income-model').html();
                var resultTmpl = tmpl(tmplhtml, memberData);
                $('#tmpl-income').html(resultTmpl);
                initIncomeStoreList();
                initIncomeDate();
                if (data.storeIds == employee.storeIds) {
                    $('.storeLists span:first').addClass('active').append('<i></i>');
                } else {
                    for (var i = 0; i <= memberData.storeList.length - 1; i++) {
                        var storeId = memberData.storeList[i].id;
                        if (storeId == data.storeIds || storeId == parseInt(data.storeIds)) {
                            $('.storeLists .stores-info span').eq(i).addClass('active').append('<i></i>');
                            $('.income .storeList').find('.store_name').text(memberData.storeList[i].name);
                        }
                    }
                }
                //日期名称
                $('#dateList span').eq(parseInt(memberData.dataType) - 1).addClass('active');
                $('.income .dateList').find('.date_name').text(getDateName(memberData.dataType));
                $('.income .storeList').find('.store_name').text(app.tools.sliceStr($('.income .storeList').find('.store_name').text(), 14));
            },
            function() {})
    },
    //获取业绩来源
    getIncomeData: function(data) {
        return new Promise(function(resolve, reject) {
            app.startLoading();
            app.api.index.getIncomeSource({
                data: data,
                success: function(results) {
                    app.endLoading();
                    if (results.success) {
                        resolve(results.data);
                    } else {
                        reject(results.message);
                    }
                },
                error: function(error) {
                    app.endLoading();
                    console.info(error);
                    reject(error);
                }
            });
        });
    },
}
