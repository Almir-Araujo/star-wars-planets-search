import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsPlanetsContext from './StarWarsPlanetsContext';

function StarWarsPlanetsProvider({ children }) {
  const [planetsInfo, setPlanetsInfo] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [planets, setPlanets] = useState([]);
  const [filterByNumeric, setFilterByNumeric] = useState([]);
  const [order, setOrder] = useState({ column: 'population', sort: 'ASC' });
  const [isOrder, setIsOrder] = useState(false);
  const [columns, setColumns] = useState(['population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water']);

  useEffect(() => {
    const ENDPOINT = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const planetsFetch = async () => {
      const apiResponse = await fetch(ENDPOINT);
      const planetsJson = await apiResponse.json();
      const { results } = planetsJson;
      const residentsColumnDeleted = results.map((planet) => {
        delete planet.residents;
        return planet;
      });
      setPlanetsInfo(residentsColumnDeleted);
    };
    planetsFetch();
  }, []);

  useEffect(() => {
    const searchFilter = () => {
      const ONE = 1;
      const MINUSONE = -1;
      const search = planetsInfo.filter((planet) => planet.name.toLowerCase()
        .includes(searchInput.toLowerCase()));
      setPlanets(search.sort((a, b) => {
        if (a.name > b.name) return ONE;
        if (a.name < b.name) return MINUSONE;
        return 0;
      }));
    };
    searchFilter();
    console.log(searchFilter);
  }, [planetsInfo, searchInput]);

  // useEffect(() => {
  //   const filters = filterByNumeric;
  //   if (filters.column !== undefined && filters.comparison === 'maior que') {
  //     setPlanets(planets
  //       .filter((planet) => parseInt(planet[filters.column], 10)
  //         > parseInt(filters.value, 10)));
  //   }
  //   if (filters.column !== undefined && filters.comparison === 'menor que') {
  //     setPlanets(planets
  //       .filter((planet) => parseInt(planet[filters.column], 10)
  //         < parseInt(filters.value, 10)));
  //   }
  //   if (filters.column !== undefined && filters.comparison === 'igual a') {
  //     setPlanets(planets
  //       .filter((planet) => parseInt(planet[filters.column], 10)
  //         === parseInt(filters.value, 10)));
  //   }
  // }, [filterByNumeric, planets]);

  const context = {
    data: planetsInfo,
    searchInput,
    setSearchInput,
    planets,
    setPlanets,
    planetsInfo,
    filterByNumericValues: filterByNumeric,
    setFilterByNumeric,
    columns,
    setColumns,
    order,
    setOrder,
    isOrder,
    setIsOrder,
  };

  return (
    <div>
      <StarWarsPlanetsContext.Provider value={ context }>
        { children }
      </StarWarsPlanetsContext.Provider>
    </div>
  );
}

export default StarWarsPlanetsProvider;

StarWarsPlanetsProvider.propTypes = {
  children: PropTypes.objectOf.isRequired,
};
