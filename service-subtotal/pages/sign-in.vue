<template>
    <div class="sign">
        <div class="wrap">
            <mt-field label="用户名" placeholder="请输入用户名" v-model="user"></mt-field>
            <mt-field label="密码" placeholder="请输入密码" type="password" v-model="pwd"></mt-field>
            <div class="btn-panel">
                <mt-button type="primary" size="large" @click.native="submit">登录</mt-button>
            </div>
        </div>
        <mt-popup v-model="popupVisible" position="bottom">
            <div class="employeeCell">
                <div v-for="(item, index) in employeeList" v-on:click="select(index)">
                    <mt-cell :title="item.name" :label="item.store ? item.store.name : ''"></mt-cell>
                </div>
            </div>
        </mt-popup>
    </div>
</template>
<script>
import Vue from 'vue';
import {
    Button,
    Popup,
    Toast,
    Cell,
    Indicator,
    Field
} from 'mint-ui';
import * as types from 'store/mutations-types';
import api_sign_in from 'services/api.signIn';
Vue.component(Button.name, Button);
Vue.component(Popup.name, Popup);
Vue.component(Cell.name, Cell);
Vue.component(Field.name, Field);

import {
    WECHAT_BUSINESS
} from 'config/mixins';

export default {
    name: 'sign',
    data() {
        return {
            user: null,
            pwd: null,
            employeeList: null,
            popupVisible: false
        };
    },
    directives: {},
    methods: {
        submit() {
            if (!this.user || !this.pwd) {
                return;
            }
            var data = {
                username: this.user,
                password: this.base64Encode(this.pwd),
                rememberMe: true
            };
            Indicator.open();
            api_sign_in.auth(data).then(res => {
                var accountParam = {
                    userId: res.data
                };
                if (!accountParam.userId) {
                    Toast('用户名或密码错误', '登录异常');
                    Indicator.close();
                    return;
                }
                api_sign_in.listEmployee(accountParam).then(resultEmployeeList => {
                    Indicator.close();
                    if (!resultEmployeeList || !resultEmployeeList.success || !resultEmployeeList.data || resultEmployeeList.data.length <= 0) {
                        Toast('未查到您的可用身份或您已离职,请与商户管理员联系并设置您的身份信息');
                        Indicator.close();
                        return;
                    }

                    for (var i in resultEmployeeList.data) {
                        resultEmployeeList.data[i].jsonData = JSON.stringify(resultEmployeeList.data[i]);
                    }
                    /* 如果只有一个员工，默认登录该员工并且绑定，否则显示员工列表让用户选择 */
                    if (resultEmployeeList.data.length === 1) {
                        window.localStorage.employee = resultEmployeeList.data[0].jsonData;
                        this.loginEmployee();
                    } else {
                        this.popupVisible = !this.popupVisible;
                    };
                    this.employeeList = resultEmployeeList.data;
                    Indicator.close();
                });
            });
        },
        select(index) {
            this.popupVisible = false;
            window.localStorage.employee = this.employeeList[index].jsonData;
            this.loginEmployee();
        },
        getEmployee: function() {
            return new Promise(function(resolve, reject) {
                if (localStorage.employee && localStorage.employee !== 'null') {
                    resolve(JSON.parse(localStorage.employee));
                } else {
                    Indicator.open();
                    api_sign_in.findByOpenId().then((result) => {
                        if (!result.success || !result.data) {
                            Toast('错误');
                            return;
                        };
                        var accountParam = {
                            userId: result.data.userId
                        };
                        api_sign_in.listEmployee(accountParam).then(resultEmployeeList => {
                            var employee = {};
                            for (var i in resultEmployeeList.data) {
                                resultEmployeeList.data[i].jsonData = JSON.stringify(resultEmployeeList.data[i]);
                                if (resultEmployeeList.data[i].id === result.data.employeeId) {
                                    employee = resultEmployeeList.data[i];
                                };
                                for (var j in resultEmployeeList.data[i].merchantRole.permissionPackage.permissions) {
                                    var permission = resultEmployeeList.data[i].merchantRole.permissionPackage.permissions[j];
                                    if (permission === WECHAT_BUSINESS[1].code) {
                                        employee.role = WECHAT_BUSINESS[1].code;
                                    } else if (permission === WECHAT_BUSINESS[2].code) {
                                        employee.role = WECHAT_BUSINESS[2].code;
                                    } else {
                                        employee.role = null;
                                    };
                                };
                                if (!employee) {
                                    Toast('小主，未查到您的身份,请登录美问saas平台设置您的员工身份!!');
                                    return;
                                };
                                if (!employee.role) {
                                    Toast('小主，您没有访问店务助手权限,请登录美问saas平台设置店务助手权限!!');
                                    return;
                                };
                                if (employee.positionStatus && employee.positionStatus !== '1') {
                                    Toast('小主，当前员工已离职,不可登录');
                                    return;
                                };
                                var listEmployeeStoreListData = {
                                    employeeId: employee.id,
                                    merchantId: employee.merchantId
                                };
                                api_sign_in.listEmployeeStoreList(listEmployeeStoreListData).then(result => {
                                    employee.storeList = result.data;
                                    var storeIds = [];
                                    for (var o in employee.storeList) {
                                        storeIds.push(employee.storeList[o].id);
                                    };
                                    employee.storeIds = storeIds.join(',');
                                    window.localStorage.employee = JSON.stringify(employee);
                                    resolve(JSON.parse(localStorage.employee));
                                });

                            }
                        });
                    });
                };

            });

        },
        loginEmployee: function() {
            this.getEmployee().then((employee) => {
                if (employee) {
                    var data = {
                        userId: employee.userId,
                        employeeId: employee.id
                    };
                    Indicator.open();
                    api_sign_in.bind(data).then((result) => {
                        if (result.success) {
                            var listEmployeeStoreListData = {
                                employeeId: employee.id,
                                merchantId: employee.merchantId
                            };
                            var openId = result.data;
                            api_sign_in.listEmployeeStoreList(listEmployeeStoreListData).then((result) => {
                                employee.storeList = result.data;
                                employee.openId = openId;
                                var storeIds = [];
                                for (var o in employee.storeList) {
                                    storeIds.push(employee.storeList[o].id);
                                };
                                employee.storeIds = storeIds.join(',');
                                for (var j in employee.merchantRole.permissionPackage.permissions) {
                                    var permission = employee.merchantRole.permissionPackage.permissions[j];
                                    if (permission === WECHAT_BUSINESS[1].code) {
                                        employee.role = WECHAT_BUSINESS[1].code;
                                        break;
                                    } else if (permission === WECHAT_BUSINESS[2].code) {
                                        employee.role = WECHAT_BUSINESS[2].code;
                                        break;
                                    } else {
                                        employee.role = null;
                                    }
                                }
                                window.localStorage.employee = JSON.stringify(employee);

                                /* 员工登录 */
                                api_sign_in.emplogin({
                                    empid: employee.id
                                }).then((results) => {
                                    Indicator.close();
                                    if (results && results.success) {};
                                    if (employee.role === WECHAT_BUSINESS[1].code || employee.role === WECHAT_BUSINESS[2].code) {
                                        location.href = '#/';
                                        this.$store.commit(types.UPDATE_LOCAL);
                                    } else {
                                        localStorage.clear();
                                        location.href = '#/sign';
                                        Toast('小主，您没有访问店务助手权限,请登录美问saas平台设置店务助手权限!!');
                                        return;
                                    };
                                });
                            });
                        };
                    });
                };
            });

        },
        base64Encode: function(str) {
            var base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
            var out, i, len;
            var c1, c2, c3;
            len = str.length;
            i = 0;
            out = '';
            while (i < len) {
                c1 = str.charCodeAt(i++) & 0xff;
                if (i === len) {
                    out += base64EncodeChars.charAt(c1 >> 2);
                    out += base64EncodeChars.charAt((c1 & 0x3) << 4);
                    out += '==';
                    break;
                }
                c2 = str.charCodeAt(i++);
                if (i === len) {
                    out += base64EncodeChars.charAt(c1 >> 2);
                    out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                    out += base64EncodeChars.charAt((c2 & 0xF) << 2);
                    out += '=';
                    break;
                }
                c3 = str.charCodeAt(i++);
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
                out += base64EncodeChars.charAt(c3 & 0x3F);
            }
            return out;
        }
    }
};
</script>
<style lang="less">
@import '~styles/_agile';
.sign {
    .wrap {
        margin-top: 100px;
        .btn-panel {
            margin-top: 16px;
            margin-left: 16px;
            margin-right: 16px;
            // .MT(32);
            // .MLR(32);
        }
    }
    .inputBox {
        position: relative;
        height: 12vw;
        line-height: 12vw;
        margin: 0 auto 6vw;
        border: 1px solid #e5e5e5;
        border-radius: 6vw;
        background: #FFF;
        margin: 10vw 0 0;
        input {
            width: 90%;
            height: 100%;
            display: block;
            margin: 0 auto;
        }
    }
    .employeeCell {
        width: 100vw;
        max-height: 60vh;
        overflow-y: scroll;
    }
    button[class*="mint-button"] {
        padding-top: 12px !important;
        padding-bottom: 12px !important;
        font-size: 14px !important;
    }
}
</style>
