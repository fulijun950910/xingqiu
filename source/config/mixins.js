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

export const COUNON_KIND = [
    { name: '开卡赠送', value: '2-2' },
    { name: '充值赠送', value: '2-3' },
    { name: '直接赠送', value: '2-4' },
    { name: '短信送券', value: '2-6' },
    { name: '他人赠送', value: '1-7' },
    { name: '他人赠送', value: '2-7' },
    { name: '微信活动赠送', value: '2-5' },
    { name: 'SaaS购买', value: '1-1' },
    { name: '微信活动购买', value: '1-2' },
    { name: '商城购买', value: '1-6' },
    { name: '微信活动购买', value: '1- ' }
];

export const ACTIVITY_TYPES = [
    { name: '团拼活动', value: 1 },
    { name: '大转盘', value: 2 },
    { name: '拼钱活动', value: 3 },
    { name: '砍价活动', value: 4 },
    { name: '买赠活动', value: 5 },
    { name: '拼颜值抢红包', value: 6 }
];

export const SOURCE_TYPES = [
    { name: '微信活动', value: 1 },
    { name: '微信公众号', value: 2 },
    { name: '微信小程序', value: 3 },
    { name: '短信营销', value: 4 },
    { name: '异业', value: 5 },
    { name: '导入', value: 6 }
];
