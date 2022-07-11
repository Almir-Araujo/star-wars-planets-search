import React from 'react';
import './App.css';
import Filters from './Components/Filters';
import Header from './Components/Header';
import Table from './Components/Table';
import Provider from './Context/StarWarsPlanetsProvider';

function App() {
  return (
    <main>
      <Provider>
        <Header />
        <Filters />
        <Table />
      </Provider>
    </main>
  );
}

export default App;
