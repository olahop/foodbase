import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Graphics } from '../../../../src/components/DataViewer/Graphics/Graphics';

Enzyme.configure({adapter:new Adapter()});

describe('Test search component', () => {
    let test_instance;
  
    beforeEach(() => {
        test_instance = shallow(<Graphics data={[]}/>).instance()
    });

    it('Check that graphics has protein as axis titles from init', () => {
        expect(test_instance.state.xAxisTitle).toBe('Proteins');
        expect(test_instance.state.yAxisTitle).toBe('Proteins');
    });


    it('Check that handleSelectX changes Graphics state', () => {
        test_instance.handleSelectX({ value: 'Fat', label: 'Fat' });
        expect(test_instance.state.xAxisTitle).toBe('Fat');
    });

    it('Check that handleSelectY changes Graphics state', () => {
        test_instance.handleSelectY({ value: 'Carbohydrates', label: 'Carbohydrates' });
        expect(test_instance.state.yAxisTitle).toBe('Carbohydrates');
    });
    
});
