



export function getGenres(url) {

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNTQ2NTkzNDU4NTk4ZWZiZjg0ZTM0OThkZGM2ZGI2YSIsInN1YiI6IjVmMjU1NzM0MmFjNDk5MDAzNTYzNDcyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GQusLMvoX10wHEcq4qTJFr6Izg4tNM96QzZ7S15s-no'
    }
  };

  fetch(url, options)
    .then(response => response.json())
    .then(response => {

      sessionStorage.setItem("genres", JSON.stringify(response));

    })
    .catch(err => console.error(err));

}


