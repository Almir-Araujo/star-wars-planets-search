import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsPlanetsContext from './StarWarsPlanetsContext';

function StarWarsPlanetsProvider({ children }) {
  const [planetsInfo, setPlanetsInfo] = useState([]);
  const [searchInput, setSearchInput] = useState('');
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

  const context = {
    data: planetsInfo,
    setPlanetsInfo,
    searchInput,
    setSearchInput,
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
