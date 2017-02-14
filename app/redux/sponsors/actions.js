export function saveSponsors(sponsors) {
    return {
        type: 'SAVE',
        data: {
            sponsors
        }
    }
}