import { CHANGE_FILTER,RESET_FILTER } from '../actions/filter'

export default function filterReducer(state = '', action){
    switch (action.type){
        case CHANGE_FILTER:
            return action.filter;
        case RESET_FILTER:
            return ''
        default:
            return state
    }
}