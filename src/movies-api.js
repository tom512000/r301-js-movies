export const API_URL = "http://movies-api";

export function getAllMovies()
{
    return fetch(`${API_URL}/movies`)
        .then((response) =>
        response.json());
}

export function posterUrl(imagePath, size = "original")
{
    return `${API_URL}${imagePath}/${size}`;
}
