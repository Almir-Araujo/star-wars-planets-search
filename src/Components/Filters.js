import React, { useContext, useEffect, useState } from 'react';
import StarWarsContext from '../Context/StarWarsPlanetsContext';
import Sort from './Sort';

function Filters() {
  const { setPlanets,
    columns,
    setColumns,
    planetsInfo } = useContext(StarWarsContext);

  const [savedFilters, setSavedFilters] = useState([]);
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

  const filteringPlanets = () => { // Refatoração após participação na mentoria 03/08 com ajuda da Lily
    let filterPlanets = [...planetsInfo];
    if (savedFilters.length === 0) setPlanets(planetsInfo);
    savedFilters.forEach(({ column, comparison, value }) => {
      filterPlanets = filterPlanets.filter((planet) => {
        if (comparison === 'maior que') {
          return parseInt(planet[column], 10)
        > parseInt(value, 10);
        }
        if (comparison === 'menor que') {
          return parseInt(planet[column], 10)
        < parseInt(value, 10);
        }
        return parseInt(planet[column], 10) === parseInt(value, 10);
      });
      setPlanets(filterPlanets);
    });
  };

  useEffect(() => {
    filteringPlanets();
  }, [savedFilters]);

  const handleSubmit = () => {
    setSavedFilters((prevState) => [...prevState, {
      column: filters.column,
      comparison: filters.comparison,
      value: filters.value }]);
    setColumns(columns.filter((column) => column !== filters.column));
  };

  const handleRemove = (filterCliked) => {
    setColumns([...columns, filterCliked.column]);
    setSavedFilters(savedFilters
      .filter((selected) => selected !== filterCliked));
  };

  const handleRemoveAllFilters = () => {
    setSavedFilters([]);
    setPlanets(planetsInfo);
    setColumns(['population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water']);
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
              .map((filter, index) => (
                <option
                  key={ index }
                  value={ filter }
                >
                  {filter}
                </option>))}
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
          <div key={ index } data-testid="filter">
            <p>{`${filter.column} ${filter.comparison} ${filter.value}`}</p>
            <button
              type="button"
              key={ index }
              onClick={ () => handleRemove(filter) }
            >
              X
            </button>
          </div>))}
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ handleRemoveAllFilters }
      >
        Remove all filters
      </button>
      <Sort />
    </section>
  );
}

export default Filters;
