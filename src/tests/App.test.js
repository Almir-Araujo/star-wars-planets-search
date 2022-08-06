import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';



describe('Star Wars Planets Search Application Tests', () =>{

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

    const comparisonFilter = screen.getByTestId('comparison-filter')
    expect(comparisonFilter).toBeInTheDocument()

    userEvent.selectOptions(comparisonFilter, 'maior que')

    const inputValue = screen.getByTestId('value-filter');
    const number = 100;
    userEvent.type(inputValue, number)


    const filterButton = screen.getByTestId('button-filter')
    expect(filterButton).toBeInTheDocument()

    userEvent.click(filterButton)
    expect(screen.getAllByRole('table').length).toBe(1)

    const removeFilters = screen.getByTestId('button-remove-filters')
    expect(removeFilters).toBeInTheDocument()

  });

  test('3. Population and maior que', async () => {
    render(<App />)

    const removeFiltersButton =  screen.getByTestId('button-remove-filters')
    const filterButton = screen.getByTestId('button-filter')
    const filterColumn = screen.getByTestId('column-filter')
    const filterComparison = screen.getByTestId('comparison-filter')
    const inputValue = screen.getByTestId('value-filter');

    userEvent.selectOptions(filterColumn, 'population')
    userEvent.selectOptions(filterComparison, 'maior que')
    userEvent.type(inputValue, 100)

    userEvent.click(filterButton)
    const planets = await screen.findAllByTestId('planet-name')
    expect(planets).toHaveLength(10)
    expect(filterColumn.children.length).toBe(4)

    const filterClicked = screen.getByTestId('filter')

    userEvent.click(removeFiltersButton)
    expect(filterClicked).not.toBeInTheDocument()

  });

   test('4. Orbital_period filter igual', async () => {
     render(<App />)

     const filterButton = await screen.findByTestId('button-filter')
     const filterColumn = await screen.findByTestId('column-filter')
     const filterComparison = await screen.findByTestId('comparison-filter')
     const inputValue = screen.findByTestId('value-filter');
     
     userEvent.selectOptions(filterColumn, 'orbital_period')
     userEvent.selectOptions(filterComparison, 'igual a')
     userEvent.type(inputValue, 304)
     userEvent.click(filterButton)

     const tatooine = await screen.findByText(/tatooine/i)
     const alderaan = screen.getByText(/alderaan/i)

     expect(tatooine).toBeInTheDocument()
     expect(alderaan).not.toBeInTheDocument() 
   });
  
})
