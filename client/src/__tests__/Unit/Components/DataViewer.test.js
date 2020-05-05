import React from 'react';
import renderer from 'react-test-renderer';
import { DataViewer } from '../../../components/DataViewer/DataViewer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter:new Adapter()});

describe('Test search component', () => {
    let test_instance;

    beforeEach(() => {
        test_instance = shallow(<DataViewer/>).instance()
      });

    it('Check that modal is not open from init state', () => {
        expect(test_instance.state.modalIsOpen).toBe(false);
    });

    it('Check that closeModal changes Dataviewers state', () => {
        test_instance.setState({modalIsOpen:true})
        test_instance.closeModal();
        expect(test_instance.state.modalIsOpen).toBe(false);
    });

    it('Check that openModal changes Dataviewers state', () => {
        test_instance.openModal()
        expect(test_instance.state.modalIsOpen).toBe(true)
    });

});

