/**
 * Created by wzc on 16/7/12.
 */
app.constant = {
    /* 员工角色状态 */
    EMPLOYEE_ROLE: [
        {name: '商户管理员', code: 'merchantAdmin'},
        {name: '商户级财务', code: 'merchantMoneyAdmin'},
        {name: '商户级支持', code: 'merchantSupporter'},
        {name: '门店管理员', code: 'storeAdmin'},
        {name: '收银员', code: 'moneyAdmin'},
        {name: '员工', code: 'employee'}
    ],

    /* 预约单状态*/
    APPOINTMENT_STATUS: [
        {name: '已确认', code: '1'},
        {name: '已成功', code: '2'},
        {name: '已作废', code: '3'},
        {name: '已取消', code: '4'}
    ]
}