import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import Search from '../../components/Search/Search';
const mockStore = configureStore([]);
describe('Test Search component', () => {
  let store;
  let component;
  
  beforeAll(() => {
    store = mockStore();
    component = renderer.create(
      <Provider store={store}>
        <Search />
      </Provider>
    );
  });

  it('Component renders correctly', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});