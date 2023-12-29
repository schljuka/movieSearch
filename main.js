import { getMovies, topRated } from "./modules/Film.js";
import { getGenres } from "./modules/Genres.js";





const api_url_genres = `https://api.themoviedb.org/3/genre/movie/list?language=en`;
const image_path = `https://image.tmdb.org/t/p/w500/`;
const api_url_movies = `https://api.themoviedb.org/3/`;
const container = document.querySelector(`.container`);


getGenres(api_url_genres);


document.querySelector(`#getSearch`).addEventListener("click", function(){
  getM(1);
});


let topRatedM = topRated(api_url_movies);
topRatedM.then(res => {
  renderMovies(res, 1);
})


function getM(page = 1) {
  let query = document.querySelector(`#search`).value;

  let movies = getMovies(api_url_movies, query, page);
  movies.then(res => {
    renderMovies(res);
  })
}


function renderMovies(data, pag = 0) {

  if(data.results==0){
    container.innerHTML=`<p>NO DATA</p>`
    return;
  }

  let html = ``;

  data.results.forEach(element => {

    let im;

    if (element.poster_path) {
      im = image_path + element.poster_path;
    } else {
      im = `./img/noimage.png`;
    }

    html += `<div class='movie'>
  <div class="img">
  <img src="${im}" alt="${element.original_title}">
  </div>  

  
  <h2>${element.original_title}</h2>

  <p>${getNameGenre(element.genre_ids)}</p>

  </div>`

  });
  container.innerHTML = html;


  if (pag == 0) {

    let div = document.createElement("div");
    for (let i = 1; i <= data.total_pages; i++) {
      let link = document.createElement("a");
      link.textContent = i + " ";
      link.addEventListener("click", () => {
        getM(i);
      })
      div.appendChild(link);
    }

    container.appendChild(div);
  }

}




function getNameGenre(array) {

  let genres = JSON.parse(sessionStorage.getItem("genres"));

  let html = ``;

  genres.genres.forEach(elem => {
    if (array.includes(elem.id)) {
      html += elem.name + ` `;
    }
  })

  return html;

}