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

export function extractPaginationFromHeaders(response)
{
    const paginationHeaders = response.headers;

    const current = parseInt(paginationHeaders
        .get("Pagination-Current-Page"), 10) || 1;
    const last = parseInt(paginationHeaders
        .get("Pagination-Last-Page"), 10) || 1;

    return {current, last};
}
