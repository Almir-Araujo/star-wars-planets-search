import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Star Wars Planets Search Application Tests - HEADER', () =>{

  test('1. The elements in Header Component', () => {
    render(<App />);

    const headerImg = screen.getByRole('img');
    expect(headerImg).toBeInTheDocument();

    const headerText = screen.getByRole('heading', { name: /planets search/i })
    expect(headerText).toBeInTheDocument()

    const inputElement = screen.getByTestId('name-filter');
    expect(inputElement).toBeInTheDocument()

    userEvent.type(inputElement, 'Tatooine')
  });

  test('2. The elements in Filters Component', async () => {
    render(<App />)

    const columnFilter = screen.getByTestId('column-filter');
    expect(columnFilter).toBeInTheDocument();

    userEvent.selectOptions(columnFilter, 'population')
    // userEvent.selectOptions(columnFilter, 'orbital_period')
    // userEvent.selectOptions(columnFilter, 'diameter')
    // userEvent.selectOptions(columnFilter, 'rotation_period')
    // userEvent.selectOptions(columnFilter, 'surface_water')

    const comparisonFilter = screen.getByTestId('comparison-filter')
    expect(comparisonFilter).toBeInTheDocument()

    userEvent.selectOptions(comparisonFilter, 'maior que')
    // userEvent.selectOptions(comparisonFilter, 'menor que')
    // userEvent.selectOptions(comparisonFilter, 'igual a')

    const inputValue = screen.getByTestId('value-filter');
    const number = 100;
    userEvent.type(inputValue, number)


    const filterButton = screen.getByRole('button')
    expect(filterButton).toBeInTheDocument()

    expect(screen.getAllByRole('option').length).toBe(8)

    userEvent.click(filterButton)
    expect(screen.getAllByRole('table').length).toBe(1)

  });
})
