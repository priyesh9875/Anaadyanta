import { SAVE_FEEDS } from './action';

export const initialState = {
    feeds: [{
        title: `Welcome`,
        description: `Thank you for joining anaadyanta journey. For any queries about the app, drop an email to appteam17@anaadyanta.org`,
        sticky: true,
        author: 'admin',
        image: "https://res.cloudinary.com/dep8pxurn/image/upload/v1487272096/ic_launcher_ayluas.jpg"
    }]
};


export default function (state = initialState, action = {}) {
    switch (action.type) {
        case SAVE_FEEDS:
            const {feeds} = action.data;
            return {
                ...state,
                feeds
            }

        default: return state;
    }
}