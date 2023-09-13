const elements = {
    container: document.querySelector('.js-movie-list'),
    loadBtn: document.querySelector('.js-load-more')
}
const defaults = {
   poster: "https://www.reelviews.net/resources/img/default_poster.jpg",
  date: "XXXX-XX-XX",
  title: "Title not found",
  vote: "XX.XX", 
}
let page = 1;
elements.loadBtn.addEventListener('click', onLoadMore)
function onLoadMore() {
    page += 1;
    serviceFilms(page)
        .then((data) => {
            elements.container.insertAdjacentHTML("beforeend", createMarkup(data.results));
            if (data.page >= data.total_pages) {
                elements.loadBtn.classList.replace("load-more", "load-more-hidden")
            }
        })
        .catch((err) => {
        elements.loadBtn.classList.replace("load-more", "load-more-hidden")
    })
}

function createMarkup(arr) {
    return arr.map(({ poster_path, release_date, original_title, vote_average

}) => `<li class="movie-card">
      <img src="${
        poster_path
            ? "//image.tmdb.org/t/p/w300" + poster_path
            : defaults.poster
        }" alt="${original_title || defaults.title}">
      <div class="movie-info">
        <h2>${original_title || defaults.title}</h2>
        <p>Release Date: ${release_date || defaults.date}</p>
        <p>Vote Average: ${vote_average || defaults.vote}</p>
      </div>
    </li>`).join('')
     
}



function serviceFilms(currentPage = '1') {
    const params = new URLSearchParams({
        page: currentPage,
        api_key: '345007f9ab440e5b86cef51be6397df1'
    })
    console.log(params.toString());
    return fetch(`https://api.themoviedb.org/3/trending/movie/week?${params}`)
        .then((resp) => {
            if (!resp.ok) {
                throw new Error("Error");
            }
            return resp.json();
            
        });
    // fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=345007f9ab440e5b86cef51be6397df1&page=${page}`)
}

serviceFilms()
    .then(data => {
        console.log(data);
        elements.container.insertAdjacentHTML('beforeend', createMarkup(data.results));
        if (data.page < data.total_pages) {
            elements.loadBtn.classList.replace('load-more-hidden', 'load-more')
        }
    })
    .catch((err) => {
        elements.loadBtn.classList.replace("load-more", "load-more-hidden")
        })
// with ERROR
// serviceFilms(2).then(
//     (data) => {
//         if ('success' in data && data.success === false) {
//             throw new Error(data.status_message)
//         }
//         console.log(data);
//     }
// )
//     .catch((err) => console.log(err));