import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsPlanetsContext from './StarWarsPlanetsContext';

function StarWarsPlanetsProvider({ children }) {
  const [planetsInfo, setPlanetsInfo] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [planets, setPlanets] = useState([]);
  const [filterByNumeric, setFilterByNumeric] = useState({ filterByNumericValues: [{
    column: 'population',
    comparison: 'maior que',
    value: 0,
  }] });

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
      const search = planetsInfo.filter((planet) => planet.name.toLowerCase()
        .includes(searchInput.toLowerCase()));
      console.log(search);
      setPlanets(search);
    };
    searchFilter();
  }, [planetsInfo, searchInput]);

  useEffect(() => {
    let filtered = [...planetsInfo];
    const filters = filterByNumeric;
    if (filters.column !== undefined && filters.comparison === 'maior que') {
      filtered = planetsInfo
        .filter((planet) => parseInt(planet[filters.column], 10)
          > parseInt(filters.value, 10));
    }
    if (filters.column !== undefined && filters.comparison === 'menor que') {
      filtered = planetsInfo
        .filter((planet) => parseInt(planet[filters.column], 10)
          < parseInt(filters.value, 10));
    }
    if (filters.column !== undefined && filters.comparison === 'igual a') {
      filtered = planetsInfo
        .filter((planet) => parseInt(planet[filters.column], 10)
          === parseInt(filters.value, 10));
    }
    setPlanets(filtered);
    console.log(filtered);
  }, [filterByNumeric, planetsInfo]);

  const context = {
    data: planetsInfo,
    searchInput,
    setSearchInput,
    planets,
    setPlanets,
    filterByNumericValues: filterByNumeric,
    setFilterByNumeric,
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
