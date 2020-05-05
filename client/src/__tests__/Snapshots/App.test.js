import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import App from '../../App';

const mockStore = configureStore([]);
describe('Test App component', () => {
  let store;
  let component;
  
  beforeAll(() => {
    store = mockStore();
    component = renderer.create(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  it('Component renders correctly', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});