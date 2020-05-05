import React from 'react';
import renderer from 'react-test-renderer';
import TableRowContent from './../../components/TableContent/TableRowContent/TableRowContent';

it('TableRowContent Snapshot test', () => {
    const tree = renderer.create(<TableRowContent data={[]} />).toJSON();
    expect(tree).toMatchSnapshot();
});
