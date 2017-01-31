import { SAVE_CONTACTS } from './action';

export const initialState = {
    contacts: [
        {
            name: "Priyesh kumar",
            phone: "XXXXXX",
            email: "XXXXXXX@gmail.com",
            type: "Owner"
        },
        {
            name: "Priyesh kumar",
            phone: "XXXXXX",
            email: "XXXXXXX@gmail.com",
            type: "Team leader"
        }, {
            name: "Priyesh kumar",
            phone: "XXXXXX",
            email: "XXXXXXX@gmail.com",
            type: "Sponsor"
        }, {
            name: "Priyesh kumar",
            phone: "XXXXXX",
            email: "XXXXXXX@gmail.com",
            type: "Tech team head"
        }, {
            name: "Priyesh kumar",
            phone: "XXXXXX",
            email: "XXXXXXX@gmail.com",
            type: "Transport head officer"
        }, {
            name: "Priyesh kumar",
            phone: "XXXXXX",
            email: "XXXXXXX@gmail.com",
            type: "Coordinator"
        }, {
            name: "Priyesh kumar",
            phone: "XXXXXX",
            email: "XXXXXXX@gmail.com",
            type: "Coordinator"
        }, {
            name: "Priyesh kumar",
            phone: "XXXXXX",
            email: "XXXXXXX@gmail.com",
            type: "Coordinator"
        }, {
            name: "Priyesh kumar",
            phone: "XXXXXX",
            email: "XXXXXXX@gmail.com",
            type: "Coordinator"
        }, {
            name: "Priyesh kumar",
            phone: "XXXXXX",
            email: "XXXXXXX@gmail.com",
            type: "Coordinator"
        }, {
            name: "Priyesh kumar",
            phone: "XXXXXX",
            email: "XXXXXXX@gmail.com",
            type: "Coordinator"
        }, {
            name: "Priyesh kumar",
            phone: "XXXXXX",
            email: "XXXXXXX@gmail.com",
            type: "Coordinator"
        }, {
            name: "Priyesh kumar",
            phone: "XXXXXX",
            email: "XXXXXXX@gmail.com",
            type: "Coordinator"
        },


    ]
};


export default function (state = initialState, action = {}) {
    switch (action.type) {
        case SAVE_CONTACTS:
            const {contacts} = action.data;
            return {
                ...state,
                contacts
            }

        default: return state;
    }
}
