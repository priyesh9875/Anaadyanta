import {
    SAVE_EVENTS,
    MARK_FAV,
    DELETE_FAV,
    GET_DETAILS,
    PURGE_ALL_EVENTS,
    PURGE_FAV_EVENTS,
    START_EVENT,
    END_EVENT,
    SET_WINNERS,
    REGISTER,
    UPDATE_EVENT
} from './action';

const initialState = {
    favEvents: {},
    allEvents: {},
    registeredEvents: {},
    coordinatingEvents: {},
    eventsCount: 0,
    favEventsCount: 0,
    registeredEventsCount: 0,
    eventDetails: {},

};


export default function (state = initialState, action = {}) {
    switch (action.type) {
        case SAVE_EVENTS:
            var {allEvents, favEvents, registeredEvents, coordinatingEvents} = action.data;
            if (!allEvents) allEvents = {}
            return {
                ...state,
                allEvents,
                favEvents,
                registeredEvents,
                coordinatingEvents,
                // favEventsCount: Object.keys(favEvents).length || 0,
                // registeredEventsCount: Object.keys(registeredEvents).length || 0,
                eventsCount: Object.keys(allEvents).length || 0
            }

        case UPDATE_EVENT:

            var {eventKey, newEvent} = action.data
            var allEvents = { ...state.allEvents }
            var registeredEvents = { ...state.registeredEvents }
            var favEvents = { ...state.favEvents }
            var coordinatingEvents = { ...state.coordinatingEvents }
            allEvents[eventKey] = newEvent

            if (registeredEvents[eventKey]) {
                registeredEvents[eventKey] = {
                    ...registeredEvents[eventKey],
                    ...newEvent
                }
            }

            if (favEvents[eventKey]) {
                favEvents[eventKey] = {
                    ...favEvents[eventKey],
                    ...newEvent
                }
            }

            if (coordinatingEvents[eventKey]) {
                coordinatingEvents[eventKey] = {
                    ...coordinatingEvents[eventKey],
                    ...newEvent
                }
            }

            return {
                ...state,
                allEvents,
                favEvents,
                registeredEvents,
                coordinatingEvents
            }



        case SET_WINNERS:
            var eventKey = action.data.eventKey
            var winners = action.data.winners
            var allEvents = { ...state.allEvents }
            allEvents[eventKey].isStarted = true
            allEvents[eventKey].isEnded = true
            allEvents[eventKey].winners = winners
            return {
                ...state,
                allEvents,
            }


        case REGISTER:
            var {eventKey} = action.data;
            var allEvents = { ...state.allEvents }
            var registeredEvents = { ...state.registeredEvents }
            // var favEvents = { ...state.favEvents }

            var { favEventsCount, registeredEventsCount, coordinatingEvents} = state
            allEvents[eventKey] = {
                ...allEvents[eventKey],
                isRegistered: true,
                // isFav: true,
            }

            registeredEvents[eventKey] = allEvents[eventKey]

            return {
                ...state,
                allEvents,
                registeredEvents,
                registeredEventsCount: registeredEventsCount + 1
            }



        case MARK_FAV:
            var {eventKey} = action.data;
            var allEvents = { ...state.allEvents }
            allEvents[eventKey].isFav = true
            var favEvents = {
                ...state.favEvents,
            }
            favEvents[eventKey] = allEvents[eventKey]
            return {
                ...state,
                allEvents,
                favEvents,
                favEventsCount: state.favEventsCount + 1,

            }

        case DELETE_FAV:
            var {eventKey} = action.data

            var allEvents = { ...state.allEvents }
            allEvents[eventKey].isFav = false
            var favEvents = { ...state.favEvents, }
            delete favEvents[eventKey]

            return {
                ...state,
                allEvents,
                favEvents,
                favEventsCount: state.favEventsCount - 1,

            }

        case GET_DETAILS:
            eventKey = action.data.eventKey
            const eventDetails = { ...state.allEvents[eventKey] }
            return {
                ...state,
                eventDetails
            }

        case PURGE_FAV_EVENTS:
            return {
                ...state,
                favEvents: {}
            }

        default: return state;
    }
}