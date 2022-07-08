import React from 'react';
import './App.css';
import fetchPlants from './Services/starWarsPlantesAPI';

function App() {
  fetchPlants();

  return (
    <span>Hello, App!!</span>
  );
}

export default App;
