//1现金、2POS、3微信、4支付宝、5团购、6减免、7欠款、8会员卡耗、9券、10店内活动、11赠品、12自定义
var icons = ["68a;", "690;", "692;", "68d;", "687;", "689;", "68f;", "691;", "694;", "693;", "68e;", "68f;"];
var rgbs = ["#00cbc7", "#f65d69", "#75d140", "#25a9ee", "#f69755"];
//计算员工。管理员业绩与卡耗
function changePerformanceInfo(memberData) {
    memberData.totalAmount = 0;
    for (var i = memberData.performanceInfo.length - 1; i >= 0; i--) {
        //收入总和
        memberData.totalAmount += memberData.performanceInfo[i][1];
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
                memberData.performanceInfo[i].push(icons[4], rgbs[i % 5]);
                break;
            case '减免':
                memberData.performanceInfo[i].push(icons[5], rgbs[i % 5]);
                break;
            case '欠款':
                memberData.performanceInfo[i].push(icons[6], rgbs[i % 5]);
                break;
            case '会员卡耗':
                memberData.performanceInfo[i].push(icons[7], rgbs[i % 5]);
                break;
            case '券':
                memberData.performanceInfo[i].push(icons[8], rgbs[i % 5]);
                break;
            case '店内活动':
                memberData.performanceInfo[i].push(icons[9], rgbs[i % 5]);
                break;
            case '赠品':
                memberData.performanceInfo[i].push(icons[10], rgbs[i % 5]);
                break;
            default:
                memberData.performanceInfo[i].push(icons[icons.length - 1], rgbs[i % 4]);
                break;
        }
    }
};
//初始化日期
app.income = {
    incomeDate: {},
    incomeIdName: "tepm-income",
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
    initDate: function(type) {
        app.tools.initDate(type, app.income.incomeIdName);
        $('.income .dateLists .date_info').on('click', 'span', function(event) {
            $('.dateLists span').removeClass('active').find('i').remove();
            $(this).addClass('active');
            $('.income  .mask').click();
            if ($(this).attr('data-type') == 4) {
                app.tools.setDate(app.income.incomeDate);
                $('.cystomDate').fadeIn(200);
                $('.cystomDate .mask').addClass('mask_show');
                $('.cystomDate .date_menu').addClass('date_menu_active');
                $('.cystomDate .mask').height($('.bd').height());
            } else {
                app.income.getIncomeSourceInfo(parseInt($(this).attr('data-type')), 'date');
            }
        });
    },
    initCystomDate: function(type) {
        app.tools.initCystomDate(type, app.income.incomeIdName);
        //确定自定义时间选择
        $('.cystomDate').on('click', '.saveDate', function() {
            $('.income  .mask').click();
            app.income.getIncomeSourceInfo(4, 'date');
        });
    },
    initStoreList: function() {
        app.tools.initStoreList(app.income.incomeIdName);
        //点击切换门店
        $('.income .storeLists .stores').on('click', 'span', function(event) {
            $('.storeLists span').removeClass('active').find('i').remove();
            $(this).addClass('active').append('<i></i>');
            $('.income .storeLists .mask').click();
            app.income.getIncomeSourceInfo($(this).attr('data-id'), 'storeIds');
        });
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
            app.tools.getDateType(memberData.dataType, data, app.income.incomeDate)
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
                app.tools.getDateType(result, data, app.income.incomeDate)
                memberData.dataType = result;
                break;
            case 'init':
                var performanceInfo = null;
                if (localStorage.performanceInfo && JSON.parse(localStorage.performanceInfo)) {
                    performanceInfo = JSON.parse(localStorage.performanceInfo);
                    memberData.dataType = performanceInfo.dataType;
                }
                data.storeId = performanceInfo.performanceStoreIds.split(',').length > 1 ? undefined : performanceInfo.performanceStoreIds;
                //自定义
                if (performanceInfo.dataType == 4) {
                    data.startDate = performanceInfo.startDate;
                    data.endDate = performanceInfo.endDate;
                    app.income.incomeDate = {
                        startDate: data.startDate,
                        endDate: data.endDate
                    };
                } else {
                    app.tools.getDateType(performanceInfo.dataType, data, app.income.incomeDate)
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
                app.income.initDate(memberData.dataType); //初始化时间
                app.income.initStoreList(); //初始化门店
                app.income.initCystomDate(memberData.dataType); //初始化自定义时间
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
                if (memberData.dataType == 4) {
                    $('.income  .dateList').css({ 'left': '39vw', 'font-size': '10pt' });
                }
                //日期名称
                $('.dateLists span').eq(parseInt(memberData.dataType) - 1).addClass('active');
                $('.income .dateList').find('.date_name').text(app.tools.getDateName(memberData.dataType, data));
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
