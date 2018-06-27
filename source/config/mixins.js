/* 图片基础路径 */
export const BASE_IMG_PATH = '/api/image/';

/* 性别 */
export const GENDERS = [
    { name: '男', value: '1' },
    { name: '女', value: '2' },
    { name: '未知', value: '3' }
];

/* wechat business 权限 */
export const WECHAT_BUSINESS = [
    { name: '微信店务助手', code: 'wechat_business' },
    { name: '管理员', code: 'wechat_business_admin' },
    { name: '普通员工', code: 'wechat_business_normal' }
];

// 提醒事项
export const WARN_ITEMS = [
    { name: '客户的护理周期快到了，通知客人及时到店服务', value: 1 },
    { name: '好久没问候Ta了呢，该给客人回访啦', value: 2 }
];

// 提醒事项
export function CARD_TYPE() {
    let backNoun;
    try {
        backNoun = JSON.parse(localStorage.getItem('personNoun'));
    } catch (e) {

    }
    let tempCardType = [
        { label: '折扣卡', name: 'TYPE_MEMBER', value: 1 },
        { label: '储值卡', name: 'TYPE_DEPOSIT', value: 2 },
        { label: '时段卡', name: 'TYPE_TIME', value: 3 },
        { label: '总次卡', name: 'TYPE_ITEM_TOTAL', value: 4 },
        { label: '分次卡', name: 'TYPE_ITEM_PART', value: 5 }
    ];
    tempCardType.map((item, index, array) => {
        if (item.name == 'TYPE_ITEM_TOTAL') {
            item.label = `总${backNoun.treatmentCard}`;
        } else if (item.name == 'TYPE_ITEM_PART') {
            item.label = `分${backNoun.treatmentCard}`;
        }

    });
    return tempCardType;
}

/* 团拼活动状态 */
export const PROMOTION_TP_STATUS = [
    { name: '拼团中', value: '1' },
    { name: '已结束', value: '2' },
    { name: '已成团', value: '3' },
    { name: '处理中', value: '4' }
];
