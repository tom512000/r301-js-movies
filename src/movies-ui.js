import {getAllMovies, posterUrl} from "./movies-api";

export function createMovieElt(movieData)
{
    const articleItem = document.createElement("article");
    articleItem.className = "movie-item";

    const imgMovie = document.createElement("img");
    imgMovie.className = "movie-item__poster";
    imgMovie.src = posterUrl(movieData.poster, "medium");
    imgMovie.alt = `poster of '${movieData.title}'`;
    articleItem.appendChild(imgMovie);

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
        .then(({ collection }) => {
            moviesArticle.innerHTML = '';

            collection.forEach(movie => {
                const movieElement = createMovieElt(movie);
                moviesArticle.appendChild(movieElement);
            });
        });
}

export function createPaginationButtonElt(materialIcon, isDisabled, page)
{
    const buttonPagination = document.createElement("button");
    buttonPagination.className = "button";
    buttonPagination.type = "button";
    buttonPagination.disabled = isDisabled;
    buttonPagination.addEventListener("click", () => {
        updateMoviesElt(page);
    });

    const spanButton = document.createElement("span");
    spanButton.className = "material-symbols-outlined";
    spanButton.innerText = page;
    spanButton.textContent = materialIcon;
    buttonPagination.appendChild(spanButton);

    return buttonPagination;
}
