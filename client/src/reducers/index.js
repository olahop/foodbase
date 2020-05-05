import { combineReducers } from 'redux'
import searchReducer from './search'
import filterReducer from './filter'
import sortReducer from './sort'
import dataReducer from './data'
import sortAscReducer from './sortAsc'


const rootReducer = combineReducers({
    search: searchReducer,
    filter: filterReducer, 
    sort: sortReducer,
    data: dataReducer,
    sortAsc: sortAscReducer
});

export default rootReducer;