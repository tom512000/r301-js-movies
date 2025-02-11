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
    setLoading();

    getAllMovies()
        .then(({ collection }) => {
            emptyElt(moviesArticle);

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

export function emptyElt(elt)
{
    while (elt.hasChildNodes()) {
        elt.removeChild(elt.firstChild);
    }
}

export function updatePaginationElt(pagination)
{
    const navPagination = document.querySelector("nav.pagination");
    emptyElt(navPagination);

    if (pagination.last === 1)
        return;

    navPagination.appendChild(
        createPaginationButtonElt('first_page', pagination.current === 1, 1)
    );

    navPagination.appendChild(
        createPaginationButtonElt('navigate_before', pagination.current === 1, pagination.current - 1)
    );

    navPagination.appendChild(
        createPaginationButtonElt('navigate_next', pagination.current === pagination.last, pagination.current + 1)
    );

    navPagination.appendChild(
        createPaginationButtonElt('last_page', pagination.current === pagination.last, pagination.last)
    );

    const infoPagination = document.createElement("span");
    infoPagination.className = "pagination__info";
    infoPagination.textContent = `${pagination.current}/${pagination.last}`;
    navPagination.appendChild(infoPagination);
}

export function setLoading()
{
    const navPagination = document.querySelector("nav.pagination");
    emptyElt(navPagination);

    const moviesContainer = document.querySelector('article.movies-list');
    emptyElt(moviesContainer);

    const loadingArticle = document.createElement('article');
    loadingArticle.className = "loading";
    loadingArticle.textContent = "Loading...";
    moviesContainer.appendChild(loadingArticle);
}
