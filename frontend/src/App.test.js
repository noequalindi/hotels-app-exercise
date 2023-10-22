import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import App from './App';
import renderer from 'react-test-renderer';


describe('<App/>', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div)
  });
  it('Render title of filters', () => {
    const { getByText } = render(<App />);
    const titleElement = getByText(/Filtros/i);
    const filterStars = getByText(/Todas las estrellas/i)
    expect(titleElement).toBeInTheDocument();
    expect(filterStars).toBeInTheDocument();
  });
  it('matches snapshot', () => {
    const tree = renderer.create(<App/>).toJSON;
    expect(tree).toMatchSnapshot();
})
})

