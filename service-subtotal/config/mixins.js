/* 员工角色状态 */
export const EMPLOYEE_ROLE = [
    { name: '商户管理员', code: 'merchantAdmin' },
    { name: '商户级财务', code: 'merchantMoneyAdmin' },
    { name: '商户级支持', code: 'merchantSupporter' },
    { name: '门店管理员', code: 'storeAdmin' },
    { name: '收银员', code: 'moneyAdmin' },
    { name: '员工', code: 'employee' }
];
/* wechat business 权限 */
export const WECHAT_BUSINESS = [
    { name: '微信店务助手', code: 'wechat_business' },
    { name: '管理员', code: 'wechat_business_admin' },
    { name: '普通员工', code: 'wechat_business_normal' }
];
export const GENDERS = [
    { name: '男', value: '1' },
    { name: '女', value: '2' },
    { name: '未知', value: '3' }
];
export const BASE_IMG_PATH = '/api/file/';

export const PROMOTION_STATUS = [
    { name: '草稿', value: 'prepare' },
    { name: '待审核 ', value: 'audit' },
    { name: '上架', value: 'normal' },
    { name: '下架', value: 'disshelve' },
    { name: '过期', value: 'past' },
    { name: '打回', value: 'audit_fail' },
    { name: '删除 ', value: 'delete' }
];

export const PROMOTION_AUDIT_STATUS = [
    { name: '审核中', value: 'audit' },
    { name: '审核通过', value: 'success' },
    { name: '审核失败', value: 'fail' }
];
export const PROMOTION_ACTIVE_TYPE = [
    { name: '全部', value: null },
    { name: '大转盘', value: 'at_dzp' },
    { name: '团购', value: 'at_tg' },
    { name: '分享活动', value: 'at_fx' },
    { name: '店内活动', value: 'at_st' },
    { name: '红包活动', value: 'at_hb' }
];
export const PROMOTION_TEMPLATE_STATUS = [
    { value: 'business', name: '商用' },
    { value: 'presell', name: '预售' },
    { value: 'nonuse', name: '停用' }
];
export const PROMOTION_RULES = [{
    name: '预约信息',
    value: [
        { name: '需要提前预约', value: 'appoint_0' },
        { name: '国定节假日除外', value: 'appoint_1' },
        { name: '需要提前1天预约', value: 'appoint_2' },
        { name: '双休日除外', value: 'appoint_3' },
        { name: '无需预约,如遇高峰期您可能需要排队', value: 'appoint_4' }
    ]
}, {
    name: '适用人群',
    value: [
        { name: '不限适用人员', value: 'suit_0' },
        { name: '仅限本店会员', value: 'suit_1' },
        { name: '只适用初次到店的非会员使用', value: 'suit_2' },
        { name: '仅限女性', value: 'suit_3' },
        { name: '仅限男性', value: 'suit_4' }
    ]
}, {
    name: '规则提醒',
    value: [
        { name: '每次消费仅限1张', value: 'rule_0' },
        { name: '每张优惠券仅限1人', value: 'rule_1' },
        { name: '需当日体验完所有项目', value: 'rule_2' },
        { name: '不再与其他优惠同享', value: 'rule_3' },
        { name: '只适用于商家为您安排的技师', value: 'rule_5' }
    ]
}];
export const PROMOTION_QUERY_STATUS = [{
    name: '全部',
    value: ''
}, {
    name: '默认',
    value: 'prepare,audit,normal,audit_fail'
}, {
    name: '过期,下架',
    value: 'disshelve,past'
}];
export const PROMOTIONS_ORDER_STATUS = [
    { name: '购买', value: 'buy' },
    { name: '获赠', value: 'present' },
    { name: '拼团成功', value: 'group_success' },
    { name: '拼团失败－已支付', value: 'group_fail_pay_success' },
    { name: '拼团失败－未支付', value: 'group_fail_pay_fail' }
];
export const PROMOTIONS_QUERY_STATUS = [
    { name: '全部订单', value: -1 },
    { name: '未核销', value: 0 },
    { name: '已核销', value: 1 }
];
export const PROMOTIONS_VERIFY_STATUS = [
    { name: '未验券', value: '1' },
    { name: '不可用', value: '2' },
    { name: '已过期', value: '3' },
    { name: '已使用', value: '4' }
];
export const PROMOTIONS_SHARE_RULE_TYPE = [
    { name: '模式一', value: 3 },
    { name: '模式二', value: 1 },
    { name: '模式三', value: 2 },
    { name: '模式四', value: 0 }
];

export const SYSTEM_PAY_TYPE = [
    { name: '现金', value: 10 },
    { name: 'POS', value: 20 }
];

export const EMPLOYEE_FLAG = [
    { name: '在职', value: 0 },
    { name: '离职', value: 1 }
];

export const COUPON_STAET_TIME_TYPE = [
    { name: '购买时间', value: 1 },
    { name: '指定日期', value: 3 }
];

export const COUPON_END_TIME_TYPE = [
    { name: '不限时长', value: 1 },
    { name: '固定时长', value: 2 },
    { name: '指定日期', value: 3 }
];
