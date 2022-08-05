import React, { useContext } from 'react';
import StarWarsContext from '../Context/StarWarsPlanetsContext';

function Sort() {
  const { order, setOrder, columns, setPlanets } = useContext(StarWarsContext);

  const handleChange = ({ target: { name, value } }) => {
    setOrder((oldState) => ({ ...oldState, [name]: value }));
  };

  const handleSortButton = () => {
    if (order === 'ASC') {
      setPlanets();
    }
    if (order === 'DESC') {
      setPlanets();
    }
  };

  return (
    <section>
      <form>
        <label htmlFor="column-sort">
          Ordenar
          <select data-testid="column-sort" onChange={ handleChange }>
            { columns.map((filter, index) => (
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
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="column-sort-input-asc">
          Descendente
          <input
            type="radio"
            name="sort"
            id=""
            data-testid="column-sort-input-desc"
            value="DESC"
            onChange={ handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ handle }
        >
          Ordenar
        </button>
      </form>
    </section>
  );
}

export default Sort;
