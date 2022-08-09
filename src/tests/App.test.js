import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import testData from '../../cypress/mocks/testData'

describe('Star Wars Planets Search Application Tests', () => {

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

  test('3. Filter by Population and maior que', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(async () => {
      return { json: async() => {
        return testData;
      } }
    });
    render(<App />)

    const removeFiltersButton =  screen.getByTestId('button-remove-filters')
    const filterButton = screen.getByTestId('button-filter')
    const filterColumn = screen.getByTestId('column-filter')
    const filterComparison = screen.getByTestId('comparison-filter')
    const inputValue = screen.getByTestId('value-filter');

    userEvent.selectOptions(filterColumn, 'population')
    userEvent.selectOptions(filterComparison, 'maior que')
    userEvent.type(inputValue, '100')

    userEvent.click(filterButton)

    const planets = await screen.findAllByTestId('planet-name')
    const tatooine = await screen.findByText(/tatooine/i)

    expect(tatooine).toBeInTheDocument()
    expect(planets).toHaveLength(10)
    expect(filterColumn.children.length).toBe(4)

    const filterClicked = screen.getByTestId('filter')

    userEvent.click(removeFiltersButton)
    expect(filterClicked).not.toBeInTheDocument()

    userEvent.selectOptions(filterColumn, 'orbital_period')
    userEvent.selectOptions(filterComparison, 'maior que')
    userEvent.type(inputValue, '100')

    userEvent.click(filterButton)

    const orbitalPeriod = await screen.findByTestId('filter')
    expect(orbitalPeriod).toBeVisible()

  });

   test('4. Filter by Orbital_period filter igual', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(async () => {
      return { json: async() => {
        return testData;
      } }
    });

     render(<App />)

     const filterButton = await screen.findByTestId('button-filter')
     const filterColumn = await screen.findByTestId('column-filter')
     const filterComparison = await screen.findByTestId('comparison-filter')
     const inputValue = await screen.findByTestId('value-filter');
     
     userEvent.selectOptions(filterColumn, 'orbital_period')
     userEvent.selectOptions(filterComparison, 'igual a')
     userEvent.type(inputValue, '304')
     userEvent.click(filterButton)

     const tatooine = await screen.findByText(/tatooine/i)
     const alderaan = screen.queryByText(/alderaan/i)

     expect(tatooine).toBeInTheDocument()
     expect(alderaan).toBeNull() 
   });  

     test('5. Filter by Surface_water menor que', async () => {
      jest.spyOn(global, 'fetch').mockImplementation(async () => {
        return { json: async() => {
          return testData;
        } }
      });

       render(<App />)

       const filterButton = await screen.findByTestId('button-filter')
       const filterColumn = await screen.findByTestId('column-filter')
       const filterComparison = await screen.findByTestId('comparison-filter')
       const inputValue = await screen.findByTestId('value-filter');
     
       userEvent.selectOptions(filterColumn, 'surface_water')
       userEvent.selectOptions(filterComparison, 'menor que')
       userEvent.type(inputValue, '40')
       userEvent.click(filterButton)

       const tatooine = await waitFor(() => screen.findByText(/tatooine/i))
       const yavinIV = await screen.findByText(/yavin/i)
       const dagobah = await screen.findByText(/dagobah/i)
       const bespin = await screen.findByText(/bespin/i)
       const endor = await screen.findByText(/endor/i)
       const naboo = await screen.findByText(/naboo/i)

       expect(tatooine).toBeInTheDocument()
       expect(yavinIV).toBeInTheDocument()
       expect(dagobah).toBeInTheDocument()
       expect(bespin).toBeInTheDocument()
       expect(endor).toBeInTheDocument()
       expect(naboo).toBeInTheDocument()
     
     });

    test('7. Sort function using ASC', async () => {
      jest.spyOn(global, 'fetch').mockImplementation(async () => {
        return { json: async() => {
          return testData;
        } }
      });
 
      render(<App />)
      
      const initialPlanets = await screen.findAllByTestId('planet-name')

      expect(initialPlanets[0]).toHaveTextContent('Alderaan')

      const columnSort = await screen.findByTestId('column-sort')
      const columnSortInput = await screen.findByTestId('column-sort-input-asc')
      const sortButton = await screen.findByTestId('column-sort-button')

      userEvent.selectOptions(columnSort, 'population')
      userEvent.click(columnSortInput)
      userEvent.click(sortButton)

      expect(columnSortInput).toBeChecked()
      await waitFor(() => expect(initialPlanets[0]).toBeInTheDocument())
      
     });

     test('8. Sort function using DESC', async () => {
      jest.spyOn(global, 'fetch').mockImplementation(async () => {
        return { json: async() => {
          return testData;
        } }
      });
 
      render(<App />)
      
      const filterColumn = screen.getByTestId('column-filter')
      const initialPlanets = await screen.findAllByTestId('planet-name')
      const columnSort = await screen.findByTestId('column-sort')
      const columnSortInput = await screen.findByTestId('column-sort-input-desc')
      const columnSortInputAsc = await screen.findByTestId('column-sort-input-asc')
      const sortButton = await screen.findByTestId('column-sort-button')

      userEvent.selectOptions(columnSort, 'population')
      userEvent.click(columnSortInput)
      userEvent.click(sortButton)

      expect(screen.getAllByRole('row')[1].children[0]).toHaveTextContent('Coruscant')

      userEvent.selectOptions(columnSort, 'diameter')
      userEvent.click(columnSortInputAsc)
      userEvent.click(sortButton)

      userEvent.click(sortButton)

     });

    //  test('9. Filters selected', async () => {
    //   jest.spyOn(global, 'fetch').mockImplementation(async () => {
    //     return { json: async() => {
    //       return testData;
    //     } }
    //   });
 
    //   render(<App />)
      
    // const filterButton = screen.getByTestId('button-filter')
    // const filterColumn = screen.getByTestId('column-filter')
    // const filterComparison = screen.getByTestId('comparison-filter')
    // const inputValue = screen.getByTestId('value-filter');

    // userEvent.selectOptions(filterColumn, 'population')
    // userEvent.selectOptions(filterComparison, 'maior que')
    // userEvent.type(inputValue, 0)

    // userEvent.click(filterButton)

    // const planets = await screen.findAllByTestId('planet-name')
    // expect(planets).toHaveLength(8);

    // const populationMaiorQue0 = await screen.findByTestId('filter')

    // userEvent.click(populationMaiorQue0)

    // await waitFor(() => expect(planets).toHaveLength(10));

    // });  
  
})
