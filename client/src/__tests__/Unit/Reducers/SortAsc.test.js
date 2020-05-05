import { toggleSortAsc, resetSortAsc } from '../../../actions/sortAsc';
import sortAscReducer from '../../../reducers/sortAsc';


it('sortAscReducer toggles from empty state correctly', async () => {
    const action = toggleSortAsc();
    expect(sortAscReducer('',action)).toEqual(true);
});

it('sortAscReducer toggles correctly', async () => {
    const action = toggleSortAsc();
    expect(sortAscReducer(true,action)).toEqual(false);
    expect(sortAscReducer(false,action)).toEqual(true);
});

it('sortAscReducer resets correctly', async () => {
    const action = resetSortAsc();
    expect(sortAscReducer(false,action)).toEqual(true);
    expect(sortAscReducer(true,action)).toEqual(true);
});
