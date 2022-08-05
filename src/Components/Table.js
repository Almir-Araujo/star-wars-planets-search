import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../Context/StarWarsPlanetsContext';

function PlanetsTable() {
  const { planets, setPlanets, planetsInfo } = useContext(StarWarsContext);

  const ONE = 1;
  const MINUSONE = -1;

  useEffect(() => {
    const orderPlanets = planetsInfo.sort((a, b) => {
      if (a.name > b.name) return ONE;
      if (a.name < b.name) return MINUSONE;
      return 0;
    });
    setPlanets(orderPlanets);
    console.log(orderPlanets);
  }, []);

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
        { !planets ? 'Loading...' : planets.map((planet) => (
          <tr key={ planet.name }>
            <td data-testid="planet-name">{planet.name}</td>
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
