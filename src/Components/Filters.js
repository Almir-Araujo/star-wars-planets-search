import React, { useContext, useState } from 'react';
import StarWarsContext from '../Context/StarWarsPlanetsContext';

function Filters() {
  const { setFilterByNumeric } = useContext(StarWarsContext);
  const [state, setState] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const handleChange = ({ target: { name, value } }) => {
    setState((oldState) => ({ ...oldState, [name]: value }));
  };

  const handleSubmit = () => {
    setFilterByNumeric(state);
  };

  return (
    <section>
      <form>
        <label htmlFor="column">
          <select
            name="column"
            data-testid="column-filter"
            onChange={ handleChange }
          >
            <option value="population">Population</option>
            <option value="orbital_period">Orbital Period</option>
            <option value="diameter">Diameter</option>
            <option value="rotation_period">Rotation Period</option>
            <option value="surface_water">Surface Water</option>
          </select>
        </label>
        <label htmlFor="comparison">
          <select
            name="comparison"
            data-testid="comparison-filter"
            onChange={ handleChange }
          >
            <option value="maior que">Maior que</option>
            <option value="menor que">Menor que</option>
            <option value="igual a">Igual a</option>
          </select>
        </label>
        <label htmlFor="value">
          <input
            type="number"
            name="value"
            data-testid="value-filter"
            onChange={ handleChange }
          />
        </label>
        <button type="button" onClick={ handleSubmit }>Filtrar</button>
      </form>
    </section>
  );
}

export default Filters;
