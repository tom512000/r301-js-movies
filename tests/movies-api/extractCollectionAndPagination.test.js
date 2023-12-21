/**
 * @jest-environment jsdom
 */

import { extractCollectionAndPagination } from "../../src/movies-api";

describe("extractCollectionAndPagination", () => {
  test(``, async () => {
    const headers = new Headers();
    headers.append("Pagination-Current-Page", 12);
    headers.append("Pagination-Last-Page", 42);
    const collection = [{ title: "Movie Title" }];
    const json = () => Promise.resolve(collection);
    expect(await extractCollectionAndPagination({ json, headers })).toEqual({
      collection,
      pagination: {
        current: 12,
        last: 42,
      },
    });
  });
});
