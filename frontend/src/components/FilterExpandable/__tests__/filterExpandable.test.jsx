import React from 'react';
import ReactDOM from 'react-dom';
import FilterExpandable from '../FilterExpandable';
import '@testing-library/jest-dom'
import renderer from 'react-test-renderer';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import { shallow, mount, render } from 'enzyme';


describe('<FilterExpandable/> Component', () => {
    it("Renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<FilterExpandable/>, div);
    });
    it('Render input and button to search are defined', () => {
        const wrapper = shallow(<FilterExpandable/>);
        expect(wrapper).toBeDefined()
        expect(wrapper.find('#ExpandableFilterInput')).toBeDefined();
        expect(wrapper.find('#SearchButton')).toBeDefined();
    });

    it('matches snapshot', () => {
        const tree = renderer.create(<FilterExpandable/>).toJSON;
        expect(tree).toMatchSnapshot();
    })
});
