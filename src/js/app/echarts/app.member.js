app.memberEcharts = {
    memberEchartsIdName: 'temp-member',
    initStoreList: function() {
        app.tools.initStoreList(app.memberEcharts.memberEchartsIdName);
        //点击切换门店
        $('.member_echarts .storeLists .stores').on('click', 'span', function(event) {
            $('.member_echarts .storeLists span').removeClass('active').find('i').remove();
            $(this).addClass('active').append('<i></i>');
            $('.member_echarts .storeLists .mask').click();
            app.memberEcharts.getMemberData($(this).attr('data-id'));
        });
    },
    userdata: function() {
        //初始化用户信息
        return new Promise(function(resolve, reject) {
            app.userinfo.getEmployee().then(function(user) {
                resolve(user);
            }, function() {});
        });
    },
    init: function() {
        app.memberEcharts.userdata().then(function(userDate) {
            app.memberEcharts.getMemberData("init");
        }, function() {})
    },
    getMemberData: function(storeId) {
        var employee = null;
        if (JSON.parse(localStorage.employee)) {
            employee = JSON.parse(localStorage.employee);
        }
        var memberData = {};
        //普通员工
        if (JSON.parse(localStorage.employee).role == "wechat_business_normal") {
            var tmplhtml = $('#tmpl-member-model').html();
            var resultTmpl = tmpl(tmplhtml, memberData);
            $('#tmpl-member').html(resultTmpl);
            $('.errorBox').show();
            return;
        }
        var store;
        if (storeId == "init") {
            var employeeInfo = null;
            if (localStorage.performanceInfo && JSON.parse(localStorage.performanceInfo)) {
                store = JSON.parse(localStorage.performanceInfo).performanceStoreIds.split(',').length == 1 ? parseInt(JSON.parse(localStorage.performanceInfo).performanceStoreIds) : undefined;
            }
        } else {
            store = storeId ? parseInt(storeId) : undefined;
        }
        var data = {
            merchantId: employee.merchantId,
            storeId: store
        };
        app.memberEcharts.getMemberStatistics(data).then(function(results) {
            memberData = results;

            var storeList = localStorage.getItem("employee");
            storeList = JSON.parse(storeList).storeList;
            memberData.storeList = storeList;
            memberData.storeIds = employee.storeIds;
            app.tools.changeTitle('顾客分析');
            var tmplhtml = $('#tmpl-member-model').html();
            var resultTmpl = tmpl(tmplhtml, memberData);
            $('#tmpl-member').html(resultTmpl);
            app.tools.initSwiper(33);
            $('.data-box').show();
            //顾客来源
            app.memberEcharts.memberSourceList(memberData);
            //会员末到店
            app.memberEcharts.memberLeaveDataList(memberData);
            //会员到店频次
            app.memberEcharts.memberArrvialTimesList(memberData);
            //  app.memberEcharts.initStoreList();
            app.memberEcharts.initStoreList(); //初始化门店
            if (!data.storeId) {
                $('.member_echarts .storeLists  span').eq(0).addClass('active').append('<i></i>');
                return;
            }
            for (var i = 0; i <= memberData.storeList.length - 1; i++) {
                var storeId = memberData.storeList[i].id;
                if (storeId == data.storeId || storeId == parseInt(data.storeId)) {
                    $('.member_echarts .storeLists .stores-info span').eq(i).addClass('active').append('<i></i>');
                    return;
                }
            }
        }, function(error) {
            app.alert(error);
        });
    },
    getMemberStatistics: function(data) {
        return new Promise(function(resolve, reject) {
            app.startLoading();
            app.api.echarts.getMemberStatistics({
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
    //会员来源
    memberSourceList: function(data) {

        var legendList = [];
        var dataList = [];
        if (data.memberSourceList && data.memberSourceList.length > 0) {
            for (var i = data.memberSourceList.length - 1; i >= 0; i--) {
                legendList.push(data.memberSourceList[i].name + "-" + data.memberSourceList[i].count + "人");
                dataList.push({
                    value: data.memberSourceList[i].count,
                    name: data.memberSourceList[i].name + "-" + data.memberSourceList[i].count + "人"
                });
            }
        }
        //初始化
        app.memberEcharts.initResizeContainer(dataList);
        var option = {
            // tooltip: {
            //     trigger: 'item',
            //     formatter: "{a} <br/>{b}: {c} ({d}%)",
            // },
            legend: {
                orient: 'horizontal',
                align: 'auto',
                data: legendList,
                itemWidth: 20,
                itemGap: 15,
                bottom: 0,
                selectedMode: false
            },

            series: [{
                name: '访问来源',
                type: 'pie',
                radius: ['50%', '70%'],
                center: ['50%', '25%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: "16",
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: dataList
            }],
            color: ['#ff8c8c', '#fe77a7', '#bf70d1', '#6c90df', '#7bacf6', '#72d6f6', '#8ae18a', '#fce57a', '#ffbe5b', '#c0e570']
        };
        var myChart = echarts.init(document.getElementById('memberSourceList'));
        myChart.setOption(option);
    },
    initResizeContainer: function(data) {
        // 检测当前设备是否为ipad
        var systemIpad = (navigator.userAgent.match(/iPad/i) != null) ? true : false;
        var height = 74 + parseInt(data.length / 6) + "vh";
        if (systemIpad) {
            $('.member_echarts .memberSourceList').find('.data-box').css('height', height);
        } else {
            if (data.length > 6) {
                height = 74 + parseInt((data.length-6) /0.9) + "vh";
            }
            $('.member_echarts .memberSourceList').find('.data-box').css('height', height);
        }
    },
    //会员末到店
    memberLeaveDataList: function(data) {
        var myChart = echarts.init(document.getElementById('memberLeaveDataList'));
        var dataList = [1, 2, 3, 4, 5];
        if (data.memberLeaveDataList && data.memberLeaveDataList.length > 0) {
            for (var i = 0; i <= data.memberLeaveDataList.length - 1; i++) {
                switch (data.memberLeaveDataList[i].name) {
                    case "1":
                        dataList[0] = data.memberLeaveDataList[i].count;
                        break;
                    case "2":
                        dataList[1] = data.memberLeaveDataList[i].count;
                        break;
                    case "3":
                        dataList[2] = data.memberLeaveDataList[i].count;
                        break;
                    case "6":
                        dataList[3] = data.memberLeaveDataList[i].count;
                        break;
                    case "12":
                        dataList[4] = data.memberLeaveDataList[i].count;
                        break;
                }
            }
        }
        // 指定图表的配置项和数据
        var option = {
            title: {
                // text: '顾客末到店情况',
                subtext: '从今天开始向前推30天~1年',
                x: 'center'
            },
            tooltip: {},
            xAxis: {
                data: ["1个月", "2个月", "3个月", "6个月", "12个月"],
                axisLine: {
                    lineStyle: {
                        color: '#888'
                    }
                }
            },
            yAxis: {
                splitLine: {
                    lineStyle: {
                        color: "#eaeaea",
                        type: "dotted"
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#888'
                    }
                }
            },
            series: [{
                type: 'bar',
                barWidth: '50%',
                itemStyle: {
                    normal: {
                        color: '#9d7ae5',
                    }
                },
                data: dataList
            }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    },

    //会员末到店
    memberArrvialTimesList: function(data) {
        var myChart = echarts.init(document.getElementById('memberArrvialTimesList'));
        var dataList = [];
        if (data.memberArrvialTimesList && data.memberArrvialTimesList.length > 0) {
            for (var i = 0; i <= data.memberArrvialTimesList.length - 1; i++) {
                dataList.push(data.memberArrvialTimesList[i].count);
            }
        }
        // 指定图表的配置项和数据
        var option = {
            title: {
                // text: '顾客到店频次情况',
                subtext: '当月1号到至今',
                x: 'center'
            },
            tooltip: {},
            xAxis: {
                data: ["1次", "2次", "3次", "4次", "5次及以上"],
                axisLine: {
                    lineStyle: {
                        color: '#888'
                    }
                }
            },
            yAxis: {
                splitLine: {
                    lineStyle: {
                        color: "#eaeaea",
                        type: "dotted"
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#888'
                    }
                }
            },
            series: [{
                type: 'bar',
                barWidth: '50%',
                itemStyle: {
                    normal: {
                        color: '#9d7ae5'
                    }
                },
                data: dataList
            }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
}
