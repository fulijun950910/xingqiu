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
    EMPLOYEE_GENDER: [
        { name: '男', code: '1' },
        { name: '女', code: '2' }
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
        { name: '未验券', code: 1 },
        { name: '不可用', code: 2 },
        { name: '已过期', code: 3 },
        { name: '已使用', code: 4 }
        // { name: '', code: "" }
    ],
    //订单状态
    ORDER_STATUS: [
        { name: '买', code: 'buy' },
        { name: '赠', code: 'present' },
        { name: '退', code: 'refund' },
        { name: '待', code: 'notbuy' }
    ],
    //订单状态
    HAS_CARD_TYPE: [
        { name: '无卡', code: 1 },
        { name: '持卡', code: 2 }
    ],
    //卡操作
    CARE_RECORD_TYPE: [
        { name: '换卡', code: 1 },
        { name: '补卡', code: 2 },
        { name: '添加赠送', code: 3 },
        { name: '修改卡耗', code: 4 },
        { name: '修改卡次数', code: 5 },
        { name: '修改钱包余额', code: 6 },
        { name: '修改卡余额', code: 7 }
    ],
    //订单操作
    ORDER_RECORD_TYPE: [
        { name: '退单', code: 1 },
        { name: '补单', code: 2 },
        { name: '重新分配业绩与提成', code: 3 }
    ],
    //系统操作
    SYS_RECORD_TYPE: [
        { name: '修改卡模板', code: 1 },
        { name: '修改券模板', code: 2 },
        { name: '修改提成', code: 3 },
        { name: '修改权限', code: 4 }
    ],
    //会员操作
    MEMBER_RECORD_TYPE: [
        { name: '修改资料', code: 1 },
        { name: '删除会员', code: 2 },
        { name: '创建会员', code: 3 }
    ],
    //订单状态
    ORDER_TYPE: [
        { name: '处理中', code: "01" },
        { name: '挂帐', code: "30" },
        { name: '尾款', code: "40" },
        { name: '取消', code: "50" },
        { name: '退单', code: "61" },
        { name: '退卡', code: "62" },
        { name: '退款', code: "69" },
        { name: '补卡', code: "70" },
        { name: '已付款', code: "20" },
        { name: '待付款-上钟', code: "12" },
        { name: '待付款-未上钟', code: "11" },
        { name: '待付款-服务结束', code: "13" }
    ]
}
