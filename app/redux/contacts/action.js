export const SAVE_CONTACTS = 'SAVE_CONTACTS';


export function save(contacts) {
    return dispatch => {
        dispatch({
            type: SAVE_CONTACTS,
            data: {
                contacts
            }
        })
    }
}



