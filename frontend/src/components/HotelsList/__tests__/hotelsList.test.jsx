import React from 'react';
import ReactDOM from 'react-dom';
import HotelsList from '../HotelsList.jsx';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import renderer from 'react-test-renderer';


describe('<HotelsList/>', () => {
    it("Renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<HotelsList/>, div);
    });
    it('matches snapshot', () => {
        const tree = renderer.create(<HotelsList/>).toJSON;
        expect(tree).toMatchSnapshot();
    })
});
