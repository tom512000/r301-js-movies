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
