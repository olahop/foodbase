import { replaceData } from '../../../actions/data';
import dataReducer from '../../../reducers/data';

it('dataReducer updates correctly', async () => {
    const action = replaceData(['first_element','second_element'])
    expect(dataReducer('',action)).toEqual(['first_element','second_element'])
});

