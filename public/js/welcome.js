const loadMovies = () => {

    const requestOptions = {
        method: 'GET'
    };
  
  fetch("http://localhost:8081/movies/findAll", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

const loadShows = () => {
alert(666)
  const requestOptions = {
      method: 'GET'
  };

fetch("http://localhost:8081/shows/findAll", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}