import React, { useContext, useState } from 'react';
import StarWarsContext from '../Context/StarWarsPlanetsContext';

function Filters() {
  const { setPlanets, planets } = useContext(StarWarsContext);
  const [state, setState] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const handleChange = ({ target: { name, value } }) => {
    setState((oldState) => ({ ...oldState, [name]: value }));
  };

  const handleSubmit = () => {
    if (state.column !== undefined && state.comparison === 'maior que') {
      setPlanets(planets.filter((planet) => parseInt(planet[state.column], 10)
      > parseInt(state.value, 10)));
    }
    if (state.column !== undefined && state.comparison === 'menor que') {
      setPlanets(planets.filter((planet) => parseInt(planet[state.column], 10)
      < parseInt(state.value, 10)));
    }
    if (state.column !== undefined && state.comparison === 'igual a') {
      setPlanets(planets.filter((planet) => parseInt(planet[state.column], 10)
      === parseInt(state.value, 10)));
    }
  };

  return (
    <section>
      <form>
        <label htmlFor="column">
          <select
            name="column"
            data-testid="column-filter"
            onChange={ handleChange }
            value={ state.column }
          >
            <option value="population" name="population">population</option>
            <option value="orbital_period" name="orbital_period">orbital_period</option>
            <option value="diameter" name="diameter">diameter</option>
            <option
              value="rotation_period"
              name="rotation_period"
            >
              rotation_period
            </option>
            <option value="surface_water" name="surface_water">surface_water</option>
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
