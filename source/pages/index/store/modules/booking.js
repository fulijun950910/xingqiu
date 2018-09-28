import { PERMISSION_BOOKING_GUEST, PERMISSION_BOOKING_MANAGE } from '@/config/mixins';

export default {
    state: {},
    mutations: {},
    getters: {
        bookingGuest: (state, getters) => {
            return getters.permissions.indexOf(PERMISSION_BOOKING_GUEST) !== -1 || getters.bookingManage;
        },
        bookingManage: (state, getters) => {
            return getters.permissions.indexOf(PERMISSION_BOOKING_MANAGE) !== -1;
        }
    }
};
