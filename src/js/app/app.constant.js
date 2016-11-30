/**
 * Created by wzc on 16/7/12.
 */
app.constant = {
    /* 员工角色状态 */
    EMPLOYEE_ROLE: [
        { name: '商户管理员', code: 'merchantAdmin' },
        { name: '商户级财务', code: 'merchantMoneyAdmin' },
        { name: '商户级支持', code: 'merchantSupporter' },
        { name: '门店管理员', code: 'storeAdmin' },
        { name: '收银员', code: 'moneyAdmin' },
        { name: '员工', code: 'employee' }
    ],
    /* 预约单状态*/
    APPOINTMENT_STATUS: [
        { name: '已确认', code: '1' },
        { name: '已成功', code: '2' },
        { name: '已作废', code: '3' },
        { name: '已取消', code: '4' }
    ],
    /* wechat business 权限 */
    WECHAT_BUSINESS: [
        { name: '微信店务助手', code: 'wechat_business' },
        { name: '管理员', code: 'wechat_business_admin' },
        { name: '普通员工', code: 'wechat_business_normal' }
    ],
    //活动状态
    PROMOTION_TYPE: [
        { name: '草稿', code: 'prepare' },
        { name: '待审核', code: 'audit' },
        { name: '上架', code: 'normal' },
        { name: '下架', code: 'disshelve' },
        { name: '过期', code: 'past' },
        { name: '打回', code: 'audit_fail' }
    ],
    //券状态
    TICKET_STATUS: [
        { name: '末验券', code: 1 },
        { name: '不可用', code: 2 },
        { name: '已过期', code: 3 },
        { name: '已使用', code: 4 },
        { name: '', code: "" }
    ],
    //订单状态
    ORDER_STATUS: [
        { name: '买', code: 'buy' },
        { name: '赠', code: 'present' },
        { name: '退', code: 'refund' },
        { name: '待', code: 'notbuy' }
    ]
}
