import React from 'react';

function Filters() {
  return (
    <section>
      <form>
        <label htmlFor="column-filter">
          <select name="column-filter" data-testid="column-filter">
            <option value="population">Population</option>
            <option value="orbital_period">Orbital Period</option>
            <option value="diameter">Diameter</option>
            <option value="rotation_period">Rotation Period</option>
            <option value="surface_water">Surface Water</option>
          </select>
        </label>
        <label htmlFor="comparison-filter">
          <select name="comparison-filter" data-testid="comparison-filter">
            <option value="bigger">Maior que</option>
            <option value="smaller">Menor que</option>
            <option value="equal">Igual a</option>
          </select>
        </label>
        <label htmlFor="value-filter">
          <input type="number" name="value-filter" data-testid="value-filter" />
        </label>
        <button type="button">Filtrar</button>
      </form>
    </section>
  );
}

export default Filters;
