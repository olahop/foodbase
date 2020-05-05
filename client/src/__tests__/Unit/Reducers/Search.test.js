import { changeSearch } from './../../../actions/search';
import searchReducer from './../../../reducers/search';

it('searchReducer updates correctly', async () => {
    const action = changeSearch('new_search')
    expect(searchReducer('',action)).toEqual('new_search')
});