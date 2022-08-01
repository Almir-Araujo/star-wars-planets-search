import React, { useContext, useEffect, useState } from 'react';
import StarWarsContext from '../Context/StarWarsPlanetsContext';

const COLUMNS_INITIAL_STATE = ['population',
  'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

function Filters() {
  const { setPlanets, planets } = useContext(StarWarsContext);
  const [columns, setColumns] = useState(COLUMNS_INITIAL_STATE);
  const [column, setColumn] = useState('population');
  const [state, setState] = useState({
    comparison: 'maior que',
    value: 0,
  });

  useEffect(() => {
    setColumn(columns[0]);
  }, [columns]);

  const handleColumn = ({ target }) => {
    setColumn(target.value);
  };

  const handleChange = ({ target: { name, value } }) => {
    setState((oldState) => ({ ...oldState, [name]: value }));
  };

  const handleSubmit = () => {
    if (column !== undefined && state.comparison === 'maior que') {
      setPlanets(planets.filter((planet) => parseInt(planet[column], 10)
      > parseInt(state.value, 10)));
      setColumns(columns.filter((item) => item !== column));
    }
    if (column !== undefined && state.comparison === 'menor que') {
      setPlanets(planets.filter((planet) => parseInt(planet[column], 10)
      < parseInt(state.value, 10)));
      setColumns(columns.filter((item) => item !== column));
    }
    if (column !== undefined && state.comparison === 'igual a') {
      setPlanets(planets.filter((planet) => parseInt(planet[column], 10)
      === parseInt(state.value, 10)));
      setColumns(columns.filter((item) => item !== column));
    }
  };

  return (
    <section>
      <form>
        <label htmlFor="column">
          <select
            name="column"
            data-testid="column-filter"
            onChange={ handleColumn }
            value={ state.column }
          >
            { columns
              .map((filter) => <option key={ filter } value={ filter }>{filter}</option>)}
          </select>
        </label>
        <label htmlFor="comparison">
          <select
            name="comparison"
            data-testid="comparison-filter"
            onChange={ handleChange }
            value={ state.comparison }
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
            value={ state.value }
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
    </section>
  );
}

export default Filters;
