
import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import Filter from '../../components/Filter/Filter';


const mockStore = configureStore([]);
describe('Test Filter component', () => {
  let store;
  let component;
  
  beforeAll(() => {
    store = mockStore();
    component = renderer.create(
      <Provider store={store}>
        <Filter />
      </Provider>
    );
  });

  it('Component renders correctly', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

//TODO: add onChange-test
/*it('test onChange', async () => {

});*/
