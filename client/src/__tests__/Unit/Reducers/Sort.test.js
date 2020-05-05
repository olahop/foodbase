import { changeSort, resetSort } from '../../../actions/sort';
import sortReducer from '../../../reducers/sort';

it('sortReducer updates correctly', async () => {
    const action = changeSort('new_sort')
    expect(sortReducer('',action)).toEqual('new_sort')
});

it('sortReducer resets correctly', async () => {
    const action = resetSort()
    expect(sortReducer('old_sort',action)).toEqual('')
});
