import React from 'react';
import './App.css';
import Header from './Components/Header';
import Table from './Components/Table';
import Provider from './Context/StarWarsPlanetsProvider';

function App() {
  return (
    <main>
      <Provider>
        <Header />
        <Table />
      </Provider>
    </main>
  );
}

export default App;
