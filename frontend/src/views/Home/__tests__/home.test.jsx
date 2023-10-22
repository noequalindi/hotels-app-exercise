import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom'
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import { render } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import { shallow, mount } from 'enzyme';
import Home from './../Home.jsx';

describe('<Home/>', () => {
    it("Renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Home/>, div);
    });

    it("Render that Home has FilterComponent and HotelsList component", ()=> {
        const wrapper = shallow(<Home/>);
        expect(wrapper).toBeDefined()
        expect(wrapper.find('FilteComponent')).toBeDefined();
        expect(wrapper.find('HotelsList')).toBeDefined();

    });
    
    it("Renders Home filters included Correctly", () => {
        const { getByTestId } = render(<Home/>);
        expect(getByTestId('filterContainer')).toHaveTextContent('Filtros')
    });

    it('render logo defined on Home', () => {
        const { getByAltText } = render(<Home/>);
        expect(getByAltText('logoBrand')).toBeDefined();
    });
  
    it('matches snapshot', () => {
        const tree = renderer.create(<Home/>).toJSON;
        expect(tree).toMatchSnapshot();
    })
})
   

