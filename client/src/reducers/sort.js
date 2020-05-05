import { CHANGE_SORT,RESET_SORT } from '../actions/sort'

export default function sortReducer(state = '', action){
    switch (action.type){
        case CHANGE_SORT:
            return action.sort;
        case RESET_SORT:
            return ''
        default:
            return state
    }
    
}