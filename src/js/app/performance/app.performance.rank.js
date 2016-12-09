/**
 *  员工业绩排名
 */
// function initSwiper() {
//     var mySwiper = new Swiper('.swiper-container', {
//         onSlideChangeEnd: function(swiper) {
//             var j = mySwiper.activeIndex;
//             $('.line-animation').css('left', j * 50 + 'vw');
//             $('.line').addClass('line-animation');
//             $('.tool-tab li').removeClass('active');
//             $('.tool-tab li').eq(j).addClass('active');
//             mySwiper.slideTo(i, 1000, false);
//         }
//     });

//     $('.tool-tab').on('click', 'li', function(e) {
//         //取消事件的默认动作。
//         e.preventDefault();
//         //得到当前索引
//         var i = $(this).index();
//         mySwiper.slideTo(i, 1000, false);
//         $('.line-animation').css('left', i * 50 + 'vw');
//         $('.line').addClass('line-animation');
//         $('.tool-tab li').removeClass('active');
//         $(this).addClass('active');
//         mySwiper.slideTo(i, 1000, false);
//     });
// }
/**
 *  员工业绩排名
 */
app.performance.rank = {
    //当前门店ID
    // currentStoreid: '',
    performanceIdName: 'performance_rank',
    initStoreList: function() {
        app.tools.initStoreList(app.performance.rank.performanceIdName);
        //点击切换门店
        $('.performance-rank .storeLists .stores').on('click', 'span', function(event) {
            $('.performance-rank .storeLists span').removeClass('active').find('i').remove();
            $(this).addClass('active').append('<i></i>');
            $('.performance-rank .storeLists .mask').click();
            app.performance.rank.getEmpRankListInfo($(this).attr('data-id'));
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
    //初始化排名数据
    init: function() {
        app.performance.rank.userdata().then(function(employee) {
            app.performance.rank.getEmpRankListInfo('init');
        }, function() {});
    },
    getEmpRankListInfo: function(storeId) {
        var employee = null;
        if (JSON.parse(localStorage.employee)) {
            employee = JSON.parse(localStorage.employee);
        }
        var rankList = {};
        var store;
        if (storeId == "init") {
            var employeeInfo = null;
            if (localStorage.performanceInfo && JSON.parse(localStorage.performanceInfo)) {
                store = parseInt(JSON.parse(localStorage.performanceInfo).performanceStoreIds);
            }
        } else {
            store = storeId ? parseInt(storeId) : undefined;
        }
        app.performance.rank.getEmpRankList(employee.merchantId, store)
            .then(function(results) {
                rankList = results.data;
                rankList.storelist = employee.storeList;
                app.tools.changeTitle('业绩排名');
                var tmplhtml = $('#tmpl-emp-rank').html();
                var resultTmpl = tmpl(tmplhtml, rankList);
                $('#performance_rank').html(resultTmpl);
                app.performance.rank.initStoreList(); //初始化门店
                app.tools.initSwiper(50);
                for (var i = 0; i <= rankList.storelist.length - 1; i++) {
                    var storeId = rankList.storelist[i].id;
                    if (storeId == store || storeId == parseInt(store)) {
                        $('.performance-rank .storeLists .stores-info span').eq(i).addClass('active').append('<i></i>');
                        return;
                    }
                }
            }, function(error) {
                app.alert(error);
            });
    },
    // var uinfo = employee;
    // app.performance.userrole_init().then(function(urole) {
    //     var urole = urole;
    //     if (urole == 2) {
    //         //百度事件统计
    //         baiduStatistical.add({ category: '员工-员工排名', label: '查看业绩排名', val: '', action: 'select' });
    //         //员工,查询当前门店业绩排名
    //         app.performance.rank.getEmpRankList(uinfo.merchantId, uinfo.storeId).then(function(results) {
    //             app.performance.rank.modelToView(results, uinfo.userid);
    //             //隐藏门店选择列表
    //             $('#showActionSheet_rank').hide();
    //         }, function(error) {
    //             app.alert(error);
    //         });
    //     } else if (urole == 1) {
    //         //百度事件统计
    //         baiduStatistical.add({ category: '管理员-业绩排名', label: '查看业绩排名', val: '', action: 'select' });
    //         //管理者,查询被中门店业绩排名
    //         app.performance.userrole_init();
    //         var storelist = app.performance.getStoreList;
    //         //获取查询店铺信息
    //         var currentStoreid = app.performance.currentStoreid;
    //         var storeidarray = currentStoreid.split(',');
    //         app.performance.rank.currentStoreid = storeidarray[0];
    //         //默认第一家店
    //         app.performance.rank.getEmpRankList(uinfo.merchantId, storeidarray[0]).then(function(results) {
    //             var results = results;
    //             for (var i = 0; i < storelist.length; i++) {
    //                 if (storelist[i].id == storeidarray[0]) {
    //                     results.storeName = storelist[i].name;
    //                     break;
    //                 }
    //             }
    //             results.storelist = storelist;
    //             app.performance.rank.modelToView(results, uinfo.userid);
    //             //展示门店选择
    //             $('#showActionSheet_rank').show();

    //             //初始化选择门店事件
    //             app.performance.rank.bindClickStoreList();
    //         }, function(error) {
    //             app.alert(error);
    //         });

    //     }
    // })


    // bindClickStoreList: function() {
    //     app.performance.rank.userinfo().then(function(employee) {
    //         if (employee) {
    //             //处理门店选择
    //             $('#storeRankSheet').on('click', '.weui_actionsheet_cell', function() {
    //                 //获取门店ID;
    //                 var storeid = $(this).attr('name');
    //                 var storeName = $(this).html();
    //                 $('#actionsheet_cancel_rank').click();
    //                 //当前门店ID
    //                 app.performance.rank.currentStoreid = storeid;
    //                 //获取数据
    //                 app.performance.rank.getEmpRankList(employee.merchantId, storeid)
    //                     .then(function(results) {
    //                         results.storeName = storeName;
    //                         app.performance.rank.modelToView(results, app.performance.rank.userid);
    //                         //展示门店选择
    //                         $('#showActionSheet_rank').show();
    //                         app.performance.rank.bindClickStoreList();
    //                     }, function(error) {
    //                         app.alert(error);
    //                     });
    //             });
    //             //初始化页面选择门店事件
    //             // $('#container').on('click', '#showActionSheet_rank', function() {
    //             //     var mask = $('#mask_rank');
    //             //     var weuiActionsheet = $('#weui_actionsheet_rank');
    //             //     weuiActionsheet.addClass('weui_actionsheet_toggle');
    //             //     mask.show()
    //             //         .addClass('weui_fade_toggle').one('click', function() {
    //             //             hideActionSheet(weuiActionsheet, mask);
    //             //         });
    //             //     $('#actionsheet_cancel_rank').one('click', function() {
    //             //         hideActionSheet(weuiActionsheet, mask);
    //             //     });
    //             //     mask.unbind('transitionend').unbind('webkitTransitionEnd');

    //             //     function hideActionSheet(weuiActionsheet, mask) {
    //             //         weuiActionsheet.removeClass('weui_actionsheet_toggle');
    //             //         mask.removeClass('weui_fade_toggle');
    //             //         mask.on('transitionend', function() {
    //             //             mask.hide();
    //             //         }).on('webkitTransitionEnd', function() {
    //             //             mask.hide();
    //             //         })
    //             //     }
    //             // });
    //         }
    //     }, function() {});
    // },
    // modelToView: function(results, userid) {
    //     var emp_rank = {
    //             userid: userid,
    //             storeName: results.storeName,
    //             //门店列表
    //             storelist: app.performance.getStoreList
    //         }
    //         //处理业绩数据
    //     var rankdata = [];
    //     rankdata.push(results.data);

    //     // for (var u in results.data) {
    //     //     rankdata.push({
    //     //         userid: results.data[u].employeeId,
    //     //         employeeName: results.data[u].employeeName,
    //     //         performance: app.tools.toThousands(results.data[u].performance.toFixed(2))
    //     //     });
    //     // };
    //     emp_rank.data = rankdata;
    //     //员工排名
    //     var tmplhtml = $('#tmpl-emp-rank').html();
    //     var resultTmpl = tmpl(tmplhtml, emp_rank);
    //     $('#performance_rank').html(resultTmpl);
    //     console.log(emp_rank);
    //     //加载滑动
    //     app.tools.initSwiper(50);
    //     // myScroll = new IScroll('#wrapper', { probeType: 3, mouseWheel: true, tap: true, click: true });
    // },
    //获取员工业绩排名
    getEmpRankList: function(merchantId, storeId) {
        return new Promise(function(resolve, reject) {
            app.api.performance.empPerformanceRank({
                data: {
                    merchantId: merchantId,
                    storeId: storeId
                },
                success: function(results) {
                    if (results.success) {
                        // if (results.data && results.data.length <= 0) {
                        //     app.tools.show('performance_rank');
                        // };
                        resolve(results);
                    } else {
                        reject(results.message);
                    }
                },
                error: function(error) {
                    reject('服务器开小差啦~');
                }
            });
        });
    }

}
