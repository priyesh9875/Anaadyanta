export const SAVE_FEEDS = 'SAVE_FEEDS';


export function saveFeeds(feeds) {
    return {
        type: SAVE_FEEDS,
        data: {
            feeds
        }
    }
}



