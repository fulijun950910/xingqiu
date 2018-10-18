import { PERMISSION_BOOKING_GUEST, PERMISSION_BOOKING_MANAGE } from '@/config/mixins';
import moment from 'moment';

export default {
    state: {
        params: {
            viewType: 1,
            tabIndex: 0,
            storeId: '',
            employeeId: '',
            date: moment()
                .startOf('d')
                .format('YYYY-MM-DD HH:mm:ss')
        },
        data: null
    },
    mutations: {
        bookingSetParams(state, data) {
            Object.assign(state.params, data);
        },
        bookingSetData(state, data) {
            state.data = data;
        }
    },
    getters: {
        bookingGuest: (state, getters) => {
            return getters.permissions.indexOf(PERMISSION_BOOKING_GUEST) !== -1 || getters.bookingManage;
        },
        bookingManage: (state, getters) => {
            return getters.permissions.indexOf(PERMISSION_BOOKING_MANAGE) !== -1;
        }
    }
};
