import React, { useContext } from 'react';
import StarWarsLogo from '../starwarslogo-1.png';
import StarWarsContext from '../Context/StarWarsPlanetsContext';
// import Table from './Table';

function Header() {
  const { searchInput, setSearchInput } = useContext(StarWarsContext);
  const handleChange = ({ target }) => {
    const { value } = target;
    setSearchInput(value);
    const input = searchInput;
    return input;
  };

  return (
    <div>
      <header>
        <img src={ StarWarsLogo } alt="StarWars Logo" />
        <form>
          <label htmlFor="search-input">
            <input
              name="search-input"
              placeholder="Search the planet here"
              data-testid="name-filter"
              onChange={ handleChange }
            />
          </label>
        </form>
      </header>
    </div>
  );
}

export default Header;
