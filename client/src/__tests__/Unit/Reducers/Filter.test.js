import { changeFilter, resetFilter } from './../../../actions/filter';
import filterReducer from './../../../reducers/filter';

it('filterReducer updates correctly', async () => {
    const action = changeFilter('new_filter')
    expect(filterReducer('',action)).toEqual('new_filter')
    expect(filterReducer('old_filter',action)).toEqual('new_filter')
});

it('filterReducer resets correctly', async () => {
    const action = resetFilter()
    expect(filterReducer('old_filter',action)).toEqual('')
});
