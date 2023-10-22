import React from 'react';
import ReactDOM from 'react-dom';
import FilterComponent from '../FilterComponent';
import '@testing-library/jest-dom'
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import { shallow, mount, render } from 'enzyme';

describe('<FilterComponent/>', () => {
    it("Renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<FilterComponent/>, div);
    });
    it("Render that FilterComponent has FilterExpandable Component", ()=> {
            const wrapper = shallow(<FilterComponent/>);
            expect(wrapper).toBeDefined()
            expect(wrapper.find('FilterExpandable')).toBeDefined();
    });
    it('matches snapshot', () => {
        const tree = renderer.create(<FilterComponent/>).toJSON;
        expect(tree).toMatchSnapshot();
    });
})