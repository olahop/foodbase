import { REPLACE_DATA } from '../actions/data'

export default function datahReducer(state =[], action){
    switch (action.type){
        case REPLACE_DATA:
            return action.data;
        default:
            return state
    }
    
}