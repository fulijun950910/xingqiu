import apiSignIn from 'services/api.signIn';
export default {
    updateBaseData(context) {
        return new Promise((resolve, reject) => {
            if (context.getters.merchantId) {
                Promise.all([apiSignIn.getPermission(context.getters.employeeId), apiSignIn.getNounConfig(context.getters.merchantId)]).then(
                    res => {
                        context.commit('updatePermissionPackage', res[0].data);
                        context.commit('updateNounConfig', res[1].data);
                        context.commit('initBase', true);
                        resolve();
                    },
                    err => {
                        reject(err);
                    }
                );
            } else {
                reject();
            }
        });
    }
};
