const getPlanetsApi = async () => {
  const END_POINT_ALL = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const response = await fetch(END_POINT_ALL);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export default getPlanetsApi;
