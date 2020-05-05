import { TOGGLE_SORT_ASC, RESET_ASC } from '../actions/sortAsc'

export default function sortAscReducer(state = true, action){
    switch (action.type){
        case TOGGLE_SORT_ASC:
            return !state
        case RESET_ASC:
            return true
        default:
            return state
    }
    
}