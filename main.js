import { getMovies, topRated } from "./modules/Film.js";
import { getGenres } from "./modules/Genres.js";





const api_url_genres = `https://api.themoviedb.org/3/genre/movie/list?language=en`;
const image_path = `https://image.tmdb.org/t/p/w500/`;
const api_url_movies = `https://api.themoviedb.org/3/`;
const container = document.querySelector(`.container`);


getGenres(api_url_genres);


document.querySelector(`#getSearch`).addEventListener("click", function () {
  getM(1);
});


let topRatedM = topRated(api_url_movies);
topRatedM.then(res => {
  renderMovies(res, 1);
})


function getM(page = 1) {
  let query = document.querySelector(`#search`).value;

  sessionStorage.setItem("pageP", JSON.stringify({ number: page }))

  let movies = getMovies(api_url_movies, query, page);
  movies.then(res => {
    renderMovies(res);
  })
}


let brojac = 0;
let brojac2 = 0;
let flag = 0;

function renderMovies(data, pag = 0) {

  if (data.results.length == 0) {

    container.innerHTML = `<p>No data!!!!</p>`;
    return;
  }

  let html = ``;


  data.results.forEach(element => {
    let im;

    if (element.poster_path) {

      im = image_path + element.poster_path;
    }
    else {
      im = './img/noimage.png';
    }
    html += `<div class='movie'>
  <div class="img">
  <img src="${im}" alt="${element.original_title}">
  </div>  

  
  <h2>${element.original_title}</h2>

  <p> ${getNameGenre(element.genre_ids)}</p>
  </div>`


  });
  container.innerHTML = html;

  if (pag == 0) {



    let div = document.createElement("div");
    let link = document.createElement("a");
    if (data.page > 1) {
      link.textContent = "Previous ";
      link.addEventListener("click", function () {

        let num = JSON.parse(sessionStorage.getItem("pageP")).number - 1;
        getM(num);

      })
      div.appendChild(link);
    }


    for (let i = 1; i <= data.total_pages; i++) {


      if (data.total_pages > 6) {
        brojac++;
        let link = document.createElement("a");
        let trenutno = document.createElement(`span`);
        let num = JSON.parse(sessionStorage.getItem(`pageP`)).number;
        if (brojac < 4 || brojac > data.total_pages - 3) {
          if (brojac < 4) {
            if (num >= data.total_pages - 3) {
              flag = 1;
            }
            if (brojac == 1) {
              if (flag == 1) {
                link.textContent = ` 1`;
                //trenutno.textContent = ` (` + num + `)` + ` `;
              } else {
                link.textContent = num + ` `;
              }
            } else {
              if (flag == 1) {
                link.textContent = ``;
              } else {
                brojac2++;
                link.textContent = brojac2 + num + ` `;
              }
            }
          } else {
            link.textContent = i + ` `;
          }
        }
        link.addEventListener("click", function () {
          getM(parseInt(link.textContent));
        })
        if (brojac == 4) {
          const span = document.createElement(`span`);
          span.textContent = ` ... `;
          div.appendChild(span);
        }

        div.appendChild(trenutno);
        div.appendChild(link);
        if (brojac == data.total_pages) {
          brojac = 0;
          brojac2 = 0;
        }

      } else {
        let link = document.createElement(`a`);
        link.textContent = i + ` `;
        link.addEventListener("click", function () {
          getM(i);
        })
        div.appendChild(link);
      }
    }

    if (data.page < data.total_pages) {
      let link2 = document.createElement("a");
      link2.textContent = "Next";

      link2.addEventListener("click", function () {

        let num = JSON.parse(sessionStorage.getItem("pageP")).number + 1;
        getM(num);

      })
      div.appendChild(link2);
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

//test
