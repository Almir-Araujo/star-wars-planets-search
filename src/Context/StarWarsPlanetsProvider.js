import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsPlanetsContext';

function StarWarsPlanetsProvider({ children }) {
  const [planetsInfo, setPlanetsInfo] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [planets, setPlanets] = useState();
  const [filterByNumeric, setFilterByNumeric] = useState({ filterByNumericValues: [{
    column: 'population',
    comparison: 'maior que',
    value: 0,
  }] });

  const searchFilter = () => {
    const search = data.filter((planet) => planet.name.toLowerCase()
      .includes(searchInput.toLowerCase()));
    console.log(search);
    setPlanets(search);
  };
  searchFilter();

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

  // const numericFilter = () => {
  //   const filters = filterByNumeric;
  //   console.log(planetsInfo);
  //   if (filters.column !== undefined && filters.comparison === 'maior que') {
  //     console.log(planetsInfo.filter((planet) => planet[filters.column] > filters.value));
  //   }
  //   if (filters.column !== undefined && filters.comparison === 'menor que') {
  //     console.log(planetsInfo.filter((planet) => planet[filters.column] < filters.value));
  //   }
  //   if (filters.column !== undefined && filters.comparison === 'igual a') {
  //     console.log(planetsInfo
  //       .filter((planet) => planet[filters.column] === filters.value));
  //   }
  // };

  const context = {
    data: planetsInfo,
    setPlanetsInfo,
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
