import {
    LOGIN,
    LOGOUT,
    UPDATE_PROFILE,
} from './action';

const initialState = {
    name: null,
    email: null,
    isLoggedIn: null,
    uid: null,
    role: null,
    college: null
};


export default function (state = initialState, action = {}) {
    switch (action.type) {

        case LOGIN:
            var {email, uid, name, role, phone, coordinatingEvents, college} = action.data;
            var user = {
                email,
                name,
                uid,
                role,
                phone,
                coordinatingEvents,
                college,
                isLoggedIn: true
            }
            return {
                ...user
            }

        case UPDATE_PROFILE:
            var { name, phone, college } = action.data
            return {
                ...state,
                name,
                phone,
                college
            }

        case LOGOUT:

            return {
            }
        default: return state;
    }
}
