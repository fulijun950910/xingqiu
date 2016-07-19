/**
 * Created by wzc on 16/7/7.
 */
app.performance.order = {
    page: {
        page: 1,
        size: 4
    },
    orderId: null,
    list: function () {
        $('#scroll').css('height',window.screen.height);
        var date = new Date();
        date = $('#order-query-date').val() || date.format('yyyy-MM-dd');
        if (!$('#order-query-date').val())
            $('#order-query-date').val(date);
        var data = {
            type: 2,
            ids: app.userinfo.getEmployee().id,
            page: app.performance.order.page.page,
            size: app.performance.order.page.size,
            date: date
        }
        app.api.order.list({
            data: data,
            success: function (result) {
                if (!result.success || !result.data) {
                    app.tools.show('order-list');
                    return;
                }
                app.performance.order.page.page = parseInt(app.performance.order.page.page) + 1;
                var data = {
                    datas: result.data.orderListVo
                }
                var html = $('#tmpl-order-list').html();
                var template = tmpl(html, data);
                $('#order-list').html(template);
                myScroll.refresh();
            }
        })
    },
    detail: function () {
        var data = {
            orderId: app.performance.order.orderId
        }
        app.api.order.detail({
            data: data,
            success: function (result) {
                var html = $('#tmpl-order-detail').html();
                var result = tmpl(html, result.data);
                $('#order-detail').html(result);
            }
        })
    },
    chooseOrderId: function (orderId) {
        app.performance.order.orderId = orderId;
        location.href = "#/order-detail";
    },
    comment: function (order) {
        app.performance.order.order = order;
        location.href = "#/order-comment";
        app.performance.order.stop();
    },
    orderComment: function () {
        var html = $('#tmpl-order-comment').html();
        var tmplate = tmpl(html, app.performance.order.order);
        $('#order-comment').html(tmplate);
        $('#comment-pic').on('click', function () {
            $('#comment-file').click();
            $('#comment-file').change(function (dom) {
                app.performance.order.changeImg(dom);
            })
        });

    },
    submitComment: function () {
        var data = {
            fileId: app.performance.order.commentFileId,
            memberId: app.performance.order.order.memberId,
            merchantId: app.userinfo.getEmployee().merchantId,
            employeeId: app.userinfo.getEmployee().id,
            comment: $('#comment-content').val(),
            orderId: app.performance.order.order.orderId
        }
        app.api.order.comment({
            data: data,
            success: function (result) {
                app.alert('订单评价生成', '操作成功');
            },
            error: function (a, b, c, d) {

            }
        })
    },
    stop: function () {
        var e = document;
        if (e && e.preventDefault)
            e.preventDefault();
        else
            window.event.returnValue = false;
        if (e && e.stopPropagation)
            e.stopPropagation();
        else
            window.event.cancelBubble = true;
        return false;
    },
    fenToYuan: function (money) {
        if (!money)
            return '0.00';
        var m = parseFloat(money) / 100;
        return m;
    },
    leftDay: function (dom) {
        var $this = $(dom).parent().find('input');
        var nowDate = new Date($this.val());
        nowDate = new Date(nowDate.valueOf() - 1 * 24 * 60 * 60 * 1000);
        nowDate = nowDate.format('yyyy-MM-dd');
        $this.val(nowDate);
        app.performance.order.list();
    },
    nextDay: function (dom) {
        var $this = $(dom).parent().find('input');
        var nowDate = new Date($this.val());
        nowDate = new Date(nowDate.valueOf() + 1 * 24 * 60 * 60 * 1000);
        nowDate = nowDate.format('yyyy-MM-dd');
        $this.val(nowDate);
        app.performance.order.list();
    },
    changeImg: function (dom) {
        if (!dom || !dom.files || dom.files.length <= 0)
            return;

        var file = dom.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (evt) {
            var content = evt.target.result;
            var tempAry = content.split(",");
            var base64Str = (tempAry.length == 2) ? tempAry[1] : "";
            var myImage = {
                content: base64Str,
                contentType: file.type,
                originalName: file.name
            };
            app.api.userinfo.uploadFile({
                data: myImage,
                success: function (result) {
                    if (result.success && result.data) {
                        app.performance.order.commentFileId = result.data;
                        var url = app.filePath + result.data;
                        $('#comment-pic').attr('src', url);
                    }
                },
                error: function (a, b, c) {
                }
            });
        };
    },
    scrollInit: function () {
        myScroll = new IScroll('#scroll', {probeType: 3, mouseWheel: true});
        myScroll.on('scrollEnd', function () {
            if ( this.y >= 0 ) {
                // app.performance.order.page = {
                //     page: 1,
                //     size: 4
                // }
                // app.performance.order.list();
            } else if (this.y < -40) {
                app.performance.order.loadList();
            }
        });
    },
    loadList: function () {
        if (app.performance.order.page.page >= $('.orderList').length)
            return;

        var data = {
            type: 2,
            ids: app.userinfo.getEmployee().id,
            page: app.performance.order.page.page,
            size: app.performance.order.page.size,
            date: $('#order-query-date').val()
        }
        app.api.order.list({
            data: data,
            success: function (result) {
                if (!result.success || !result.data)
                    return;
                app.performance.order.page.page = parseInt(app.performance.order.page.page) + 1;
                var data = {
                    datas: result.data.orderListVo
                }
                var html = $('#tmpl-order-list').html();
                var template = tmpl(html, data);
                $('#order-list').append(template);
                myScroll.refresh();
            }
        })
    }
}