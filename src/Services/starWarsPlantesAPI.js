async function fetchPlants() {
  const END_POINT = 'https://swapi-trybe.herokuapp.com/api/planets/';

  const response = await fetch(END_POINT)
    .then((data) => data.json())
    .catch(console.error);
  console.log(response);
  return response;
}

export default fetchPlants;
