import React, { useContext, useEffect, useState } from 'react';
import StarWarsContext from '../Context/StarWarsPlanetsContext';

function Filters() {
  const { planets,
    setPlanets,
    savedFilters,
    setSavedFilters,
    columns,
    setColumns,
    planetsInfo } = useContext(StarWarsContext);

  const [filters, setFilters] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  useEffect(() => {
    setFilters((prevState) => ({ ...prevState, column: columns[0] }));
  }, [columns]);

  const handleChange = ({ target: { name, value } }) => {
    setFilters((oldState) => ({ ...oldState, [name]: value }));
  };

  const handleSubmit = () => {
    if (filters.comparison === 'maior que') {
      setPlanets(planets
        .filter((planet) => parseInt(planet[filters.column], 10)
          > parseInt(filters.value, 10)));
      setColumns(columns.filter((item) => item !== filters.column));
    }
    if (filters.comparison === 'menor que') {
      setPlanets(planets
        .filter((planet) => parseInt(planet[filters.column], 10)
           < parseInt(filters.value, 10)));
      setColumns(columns.filter((item) => item !== filters.column));
    }
    if (filters.comparison === 'igual a') {
      setPlanets(planets
        .filter((planet) => parseInt(planet[filters.column], 10)
          === parseInt(filters.value, 10)));
      setColumns(columns.filter((item) => item !== filters.column));
    }
  };

  const handleRemove = ({ target }) => {
    const filterCliked = target.innerText;
    setSavedFilters(savedFilters.filter((item) => item !== filterCliked));
    const columnFilterClicked = filterCliked.split(' ')[0];
    setColumns((prevState) => [...prevState, columnFilterClicked]);
  };

  return (
    <section>
      <form>
        <label htmlFor="column">
          <select
            name="column"
            data-testid="column-filter"
            onChange={ handleChange }
            value={ filters.column }
          >
            {columns
              .map((filter) => <option key={ filter } value={ filter }>{filter}</option>)}
          </select>
        </label>
        <label htmlFor="comparison">
          <select
            name="comparison"
            data-testid="comparison-filter"
            onChange={ handleChange }
            value={ filters.comparison }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="value">
          <input
            type="number"
            name="value"
            data-testid="value-filter"
            onChange={ handleChange }
            value={ filters.value }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleSubmit }
        >
          Filtrar
        </button>
      </form>
      {!savedFilters ? '' : savedFilters
        .map((filter, index) => (
          <button
            data-testid="filter"
            type="button"
            key={ index }
            onClick={ handleRemove }
          >
            {filter}
          </button>))}
    </section>
  );
}

export default Filters;
