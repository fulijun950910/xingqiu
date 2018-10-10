import apiSignIn from 'services/api.signIn';
export default {
    async updateBaseData(context) {
        if (context.getters.merchantId) {
            Promise.all([apiSignIn.getPermission(context.getters.employeeId), apiSignIn.getNounConfig(context.getters.merchantId)]).then(
                res => {
                    context.commit('updatePermissionPackage', res[0].data);
                    context.commit('updateNounConfig', res[1].data);
                    return true;
                },
                err => {
                    return Promise.reject(err);
                }
            );
        } else {
            return Promise.reject();
        }
    }
};
