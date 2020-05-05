/* Action types */
export const CHANGE_SORT = 'CHANGE_SORT'
export const RESET_SORT = 'RESET_SORT'

/* Action creators */
export function changeSort(new_sort){
    return {
        type: CHANGE_SORT, 
        sort: new_sort
    }
}

export function resetSort(){
    return {
        type: RESET_SORT
    }
}


