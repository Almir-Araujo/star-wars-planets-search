import React, { useContext, useState } from 'react';
import StarWarsContext from '../Context/StarWarsPlanetsContext';

function Sort() {
  const {
    planets,
    setPlanets,
  } = useContext(StarWarsContext);

  const [column, setColumn] = useState('population');
  const [sort, setSort] = useState('ASC');
  const [sortColumns] = useState(['population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water']);

  const handleSortButton = () => {
    setSort({
      order: {
        column,
        sort,
      },
    });

    const filterUnknownPopulation = planets
      .filter((planet) => planet[column] !== 'unknown');
    if (sort === 'ASC') {
      return setPlanets(filterUnknownPopulation
        .sort((a, b) => Number(a[column]) - Number(b[column])));
    }
    if (sort === 'DESC') {
      return setPlanets(filterUnknownPopulation
        .sort((a, b) => Number(b[column]) - Number(a[column])));
    }
  };

  const handleSort = ({ target }) => {
    setSort(target.value);
  };

  const handleColumn = ({ target }) => {
    setColumn(target.value);
  };

  return (
    <section>
      <form>
        <label htmlFor="column-sort">
          Ordenar
          <select data-testid="column-sort" onChange={ handleColumn }>
            { sortColumns.map((filter, index) => (
              <option key={ index }>{ filter }</option>
            )) }
          </select>
        </label>
        <label htmlFor="column-sort-input-asc">
          Ascendente
          <input
            type="radio"
            name="sort"
            data-testid="column-sort-input-asc"
            value="ASC"
            onChange={ handleSort }
          />
        </label>
        <label htmlFor="column-sort-input-desc">
          Descendente
          <input
            type="radio"
            name="sort"
            id=""
            data-testid="column-sort-input-desc"
            value="DESC"
            onChange={ handleSort }
          />
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ handleSortButton }
        >
          Ordenar
        </button>
      </form>
    </section>
  );
}

export default Sort;
