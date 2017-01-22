import { SAVE_FEEDS } from './action';

export const initialState = {
    feeds: []
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