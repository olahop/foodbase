/* Action types */
export const CHANGE_FILTER = 'CHANGE_FILTER'
export const RESET_FILTER = 'RESET_FILTER'

/* Action creators */
export function changeFilter(new_filter){
    return {
        type: CHANGE_FILTER, 
        filter: new_filter
    }
}

export function resetFilter(){
    return {
        type: RESET_FILTER, 
    }
}

