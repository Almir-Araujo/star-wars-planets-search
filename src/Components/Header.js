import React from 'react';

function Header() {
  return (
    <header>
      <h1>Star Wars Planets</h1>
      <form>
        <label htmlFor="search-input">
          <input
            name="search-input"
            placeholder="Search the planet here"
            data-testid="name-filter"
            onChange={}
          />
        </label>
      </form>
    </header>
  );
}

export default Header;
