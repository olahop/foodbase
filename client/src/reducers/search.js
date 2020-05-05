import { CHANGE_SEARCH } from '../actions/search'

export default function searchReducer(state = '', action){
    switch (action.type){
        case CHANGE_SEARCH:
            return action.search;
        default:
            return state
    }
    
}