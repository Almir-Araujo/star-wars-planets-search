import React, { useContext } from 'react';
import StarWarsContext from '../Context/StarWarsPlanetsContext';

function PlanetsTable() {
  const { data, searchInput, filterByNumeric } = useContext(StarWarsContext);

  // se, population, maior que e number => filtrar planetas que tenham essas características

  // column === "population" && comparison === "maior que" && population > value

  // column === "population" && comparison === "menor que" && population < value

  // column === "population" && comparison === "igual a" && population === value

  // column === "orbital_period" && comparison === "maior que" && orbital_period > value

  // column === "orbital_period" && comparison === "menor que" && orbital_period < value

  // column === "orbital_period" && comparison === "igual a" && orbital_period === value

  // column === comparison > && column > value

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>Url</th>
        </tr>
      </thead>
      <tbody>
        { data.filter((search) => search
          .name.toLowerCase().includes(searchInput.toLowerCase()))
          .map((planet) => (
            <tr key={ planet.name }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          )) }
      </tbody>
    </table>
  );
}

export default PlanetsTable;
