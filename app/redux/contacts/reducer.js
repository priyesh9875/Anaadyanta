import { SAVE_CONTACTS } from './action';

export const initialState = {
    contacts: [
        {
            name: "Ramish Kafrey",
            phone: "+91 7411600980",
            email: "ramishjafery@gmail.com",
            type: "Convener"
        },
        {
            name: "Shivam Dubey",
            phone: "+918050225474",
            email: "shivamdubet1103@gmail.com",
            type: "Sponsorship team"
        }, {
            name: "Arvind Balachandra",
            phone: "+919742423013",
            email: "arvind@anaadyanta.org",
            type: "Sponsorship team"
        }, {
            name: "Monica M Raju",
            phone: "+918971923839",
            email: "monica@anaadyanta.org",
            type: "Sponsorship team"
        }, {
            name: "Dheeraj Ferrao",
            phone: "+91994594122",
            email: "dheerajferrao@gmail.com",
            type: "Registration"
        }, {
            name: "Lavanya",
            phone: "+919886525856",
            email: "lavanya@anaadyanta.org",
            type: "Registration"
        }, {
            name: "Bharat Bijukumar",
            phone: "+919663605640",
            email: "bharatbijukumar@anaadyanta.org",
            type: "Coordinator"
        }, {
            name: "Aishwarya Gururaj",
            phone: "+919902646787",
            email: "aishwarya@anaadyanta.org",
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
