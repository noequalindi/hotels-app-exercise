import React from 'react';
import ReactDOM from 'react-dom';
import PaginationList from '../PaginationList.jsx';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import renderer from 'react-test-renderer';


describe('<PaginationList/>', () => {
    it("Renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<PaginationList/>, div);
    });
    it('matches snapshot', () => {
        const tree = renderer.create(<PaginationList/>).toJSON;
        expect(tree).toMatchSnapshot();
    })
});
