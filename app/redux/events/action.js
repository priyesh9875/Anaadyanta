export const SAVE_EVENTS = 'SAVE_EVENTS';
export const MARK_FAV = "MARK_FAV";
export const DELETE_FAV = "DELETE_FAV";
export const GET_DETAILS = "GET_DETAILS";
export const START_EVENT = "START_EVENT";
export const END_EVENT = "END_EVENT";
export const SET_WINNERS = "SET_WINNERS";
export const REGISTER = "REGISTER";
export const PURGE_FAV_EVENTS = "PURGE_FAV_EVENTS";
export const PURGE_ALL_EVENTS = "PURGE_ALL_EVENTS";
export const UPDATE_EVENT = "UPDATE_EVENT"

export function updateEvent(eventKey, newEvent) {
    return {
        type: UPDATE_EVENT,
        data: {
            newEvent,
            eventKey
        }
    }
}

export function saveEvents(allEvents, favEvents, registeredEvents, coordinatingEvents) {
    return dispatch => {
        dispatch({
            type: SAVE_EVENTS,
            data: {
                allEvents,
                favEvents,
                registeredEvents,
                coordinatingEvents
            }
        })
    }
}

export function markFav(eventKey) {
    return dispatch => {
        dispatch({
            type: MARK_FAV,
            data: {
                eventKey
            }
        })
    }
}

export function deleteFav(eventKey) {
    return dispatch => {
        dispatch({
            type: DELETE_FAV,
            data: {
                eventKey
            }
        })
    }
}


export function getDetails(eventKey) {
    return dispatch => {
        dispatch({
            type: GET_DETAILS,
            data: {
                eventKey
            }
        })
    }
}

export function purgeFavEvents() {
    return {
        type: PURGE_FAV_EVENTS,
        data: {}

    }
}


export function startEvent(eventKey) {
    return {
        type: START_EVENT,
        data: {
            eventKey
        }

    }
}


export function endEvent(eventKey) {
    return {
        type: END_EVENT,
        data: {
            eventKey
        }

    }
}

export function resetEvent(eventKey) {
    return {
        type: 'RESET_EVENT',
        data: {
            eventKey
        }

    }
}


export function setWinners(eventKey, winners) {
    return {
        type: SET_WINNERS,
        data: {
            eventKey,
            winners
        }

    }
}

export function register(eventKey, registerKey) {
    return {
        type: REGISTER,
        data: {
            eventKey,
            registerKey
        }

    }
}




