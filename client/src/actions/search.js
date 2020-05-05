/* Action types */
export const CHANGE_SEARCH = 'CHANGE_SEARCH'

/* Action creators */
export function changeSearch(new_search){
    return {
        type: CHANGE_SEARCH, 
        search: new_search
    }
}

