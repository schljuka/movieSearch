

export async function getMovies(url, query, page) {

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZGIxZmRiOGNlODg1ZjJjYmNjZDBjOTkyOWVhMjNiOSIsInN1YiI6IjY1ODg0MmI0NGRhM2Q0NjNhMTQyMjY4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gbm560t0r-Qeu0ptlY7IxUfxqs5wrBzcw7trPd9VXqU'
        }
    };
    try {
        const movies = await fetch(`${url}search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`, options)
        const res = await movies.json();
        return res;
    } catch (e) {
        console.log(e);
    }
}


export async function topRated(url) {

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNTQ2NTkzNDU4NTk4ZWZiZjg0ZTM0OThkZGM2ZGI2YSIsInN1YiI6IjVmMjU1NzM0MmFjNDk5MDAzNTYzNDcyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GQusLMvoX10wHEcq4qTJFr6Izg4tNM96QzZ7S15s-no'
        }
    };
    try {
        const res = await fetch(url + 'movie/top_rated?language=en-US&page=1', options)
        const data = await res.json();
        return data;
    }
    catch (e) {

        console.log(e);
    }
}





