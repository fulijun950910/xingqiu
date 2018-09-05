import Vue from 'vue';
import Q from 'q';
import { WECHAT_BUSINESS } from 'config/mixins';
import api_sign_in from 'services/api.signIn';
import {
    Toast,
    Indicator
} from 'mint-ui';

export default {
    async select(employee) {
        var deferred = Q.defer();
        window.localStorage.employee = employee;
        let a = await this.loginEmployee();
        deferred.resolve(a);
        return deferred.promise;
    },
    getEmployee() {
        var deferred = Q.defer();
        if (localStorage.employee && localStorage.employee !== 'null') {
            deferred.resolve(JSON.parse(localStorage.employee));
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
                            deferred.resolve(JSON.parse(localStorage.employee));
                        });
                    }
                });
            });
        };
        return deferred.promise;
    },
    async loginEmployee() {
        var deferred = Q.defer();
        let employee = await this.getEmployee();
        console.log(employee);
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
                                api_sign_in.loginBySaasEmployee(employee.id).then((results) => {
                                    let employeeData = window.localStorage.employee;
                                    employeeData = JSON.parse(employeeData);
                                    employeeData.party = results.data;
                                    window.localStorage.employee = JSON.stringify(employeeData);
                                    deferred.resolve(true);
                                });
                            } else {
                                localStorage.clear();
                                location.href = Vue.prototype.$signLocation;
                                Toast('小主，您没有访问店务助手权限,请登录美问saas平台设置店务助手权限!!');
                                deferred.reject(false);
                            };
                        });
                    });
                };
            });
        };
        return deferred.promise;
    }
};
