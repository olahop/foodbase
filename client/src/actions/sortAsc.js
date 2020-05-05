export const TOGGLE_SORT_ASC = 'TOGGLE_SORT_ASC'
export const RESET_ASC = 'RESET_ASC'

/* Action creators */
export function toggleSortAsc(){
    return {
        type: TOGGLE_SORT_ASC, 
    }
}

export function resetSortAsc(){
    return {
        type: RESET_ASC, 
    }
}
