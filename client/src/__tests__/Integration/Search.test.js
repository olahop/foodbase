import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import Search from './../../components/Search/Search';
import { changeSearch } from './../../actions/search'
const mockStore = configureStore([]);
describe('Test search component', () => {
  let store;
  let component;
  
  beforeAll(() => {
    store = mockStore({filter:'',
    });

    store.dispatch = jest.fn();

    component = renderer.create(
      <Provider store={store}>
        <Search />
      </Provider>
    );
  });

  it('Component should send action to store when input is updated', () => {
    renderer.act(() => {
      component.root.findByType('input')
        .props.onChange({ target: { value: 'some other text' } });
    });
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(changeSearch('some other text'));
  });
  
});

