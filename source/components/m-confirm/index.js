import Vue from 'vue';
import confirmVue from './m-confirm.vue';
var ConfirmConstructor = Vue.extend(confirmVue);
var instance;

var initInstance = () => {
    instance = new ConfirmConstructor({
        el: document.createElement('div')
    });
};

var mConfirm = (options, callback) => {
    if (!instance) {
        initInstance();
    }
    document.body.appendChild(instance.$el);
    instance.callback = callback;
    if (typeof options === 'string') {
        instance.message = options;
    } else if (typeof options === 'object') {
        instance.headSrc = options.headSrc;
        instance.message = options.message;
        instance.cancelTitle = options.cancelTitle || '再想想';
        instance.confirmTitle = options.confirmTitle || '确定';
    }
    instance.value = true;
};

export default mConfirm;
export { mConfirm };
