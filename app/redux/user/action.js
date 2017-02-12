export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const UPDATE_PROFILE = 'UPDATE_PROFILE'
export function updateProfile(name, phone) {
    return {
        type: UPDATE_PROFILE,
        data: {
            name,
            phone
        }
    }
}

export function login(email, uid, name, role, phone, coordinatingEvents, college) {
    return {
        type: LOGIN,
        data: {
            email,
            name,
            role,
            uid,
            phone,
            coordinatingEvents,
            college
        }
    }
}


export function logout() {
    return {
        type: LOGOUT,
    }
}

