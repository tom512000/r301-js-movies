import {API_URL, getAllMovies} from "./movies-api";

export function createMovieElt(movieData)
{
    const articleItem = document.createElement("article");
    articleItem.className = "movie-item";

    const divInfo = document.createElement("div");
    divInfo.className = "movie-item__info";
    articleItem.appendChild(divInfo);

    const divTitle = document.createElement("div");
    divTitle.className = "movie-item__title";
    divTitle.innerHTML = movieData.title;
    divInfo.appendChild(divTitle);

    return articleItem;
}

export function updateMoviesElt()
{
    const moviesArticle = document.querySelector("article.movies-list");

    getAllMovies()
        .then(movies => {
            moviesArticle.innerHTML = '';

            movies.forEach(movie => {
                moviesArticle.appendChild(createMovieElt(movie));
            });
        });
}

export function posterUrl(imagePath, size = 'original')
{
    return `${API_URL}/images/${imagePath}/${size}`;
}
