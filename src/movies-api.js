export const API_URL = "http://movies-api";

export function getAllMovies() {
    return fetch(`${API_URL}/movies`)
        .then(response =>
            extractCollectionAndPagination(response)
        );
}

export function posterUrl(imagePath, size = "original")
{
    return `${API_URL}${imagePath}/${size}`;
}

export function extractPaginationFromHeaders(response)
{
    const headers = response.headers;

    const current = parseInt(headers
        .get("Pagination-Current-Page"), 10) || 1;
    const last = parseInt(headers
        .get("Pagination-Last-Page"), 10) || 1;

    return {current, last};
}

export function extractCollectionAndPagination(response)
{
    const headers = response.headers;
    const promise = response.json();

    const pagination = {
        current: parseInt(headers
            .get("Pagination-Current-Page"), 10) || 1,
        last: parseInt(headers
            .get("Pagination-Last-Page"), 10) || 1
    };

    return Promise
        .all([promise, pagination])
        .then(([
            collection,
            pagination
        ]) => {
        return { collection, pagination };
    });
}
