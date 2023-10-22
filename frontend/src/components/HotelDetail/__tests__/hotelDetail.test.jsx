import React from 'react';
import ReactDOM from 'react-dom';
import HotelDetail from '../HotelDetail.jsx';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import renderer from 'react-test-renderer';

describe('<HotelDetail/>', () => {
    const myMock = jest.fn();

    it("Renders without crashing", () => {
        const div = document.createElement("div");
        myMock
        .mockReturnValueOnce(10)
        .mockReturnValueOnce('x')
        .mockReturnValue(true);
        ReactDOM.render(<HotelDetail/>, div);
    });
    
   it('matches snapshot', () => {
    const tree = renderer.create(<HotelDetail/>).toJSON;
    expect(tree).toMatchSnapshot();
})
});
    