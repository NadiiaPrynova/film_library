var elements={container:document.querySelector(".js-movie-list"),loadBtn:document.querySelector(".js-load-more")},defaults={poster:"https://www.reelviews.net/resources/img/default_poster.jpg",date:"XXXX-XX-XX",title:"Title not found",vote:"XX.XX"},page=1;function onLoadMore(){serviceFilms(page+=1).then((function(e){elements.container.insertAdjacentHTML("beforeend",createMarkup(e.results)),e.page>=e.total_pages&&elements.loadBtn.classList.replace("load-more","load-more-hidden")})).catch((function(e){elements.loadBtn.classList.replace("load-more","load-more-hidden")}))}function createMarkup(e){return e.map((function(e){var t=e.poster_path,o=e.release_date,n=e.original_title,a=e.vote_average;return'<li class="movie-card">\n      <img src="'.concat(t?"//image.tmdb.org/t/p/w300"+t:defaults.poster,'" alt="').concat(n||defaults.title,'">\n      <div class="movie-info">\n        <h2>').concat(n||defaults.title,"</h2>\n        <p>Release Date: ").concat(o||defaults.date,"</p>\n        <p>Vote Average: ").concat(a||defaults.vote,"</p>\n      </div>\n    </li>")})).join("")}function serviceFilms(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"1",t=new URLSearchParams({page:e,api_key:"345007f9ab440e5b86cef51be6397df1"});return console.log(t.toString()),fetch("https://api.themoviedb.org/3/trending/movie/week?".concat(t)).then((function(e){if(!e.ok)throw new Error("Error");return e.json()}))}elements.loadBtn.addEventListener("click",onLoadMore),serviceFilms().then((function(e){console.log(e),elements.container.insertAdjacentHTML("beforeend",createMarkup(e.results)),e.page<e.total_pages&&elements.loadBtn.classList.replace("load-more-hidden","load-more")})).catch((function(e){elements.loadBtn.classList.replace("load-more","load-more-hidden")}));
//# sourceMappingURL=index.18d81c16.js.map
