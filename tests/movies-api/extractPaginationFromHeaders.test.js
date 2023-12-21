/**
 * @jest-environment jsdom
 */

import { extractPaginationFromHeaders } from "../../src/movies-api";

describe("extractPaginationFromHeaders", () => {
  test(``, () => {
    const headers = new Headers();
    headers.append("Pagination-Current-Page", 12);
    headers.append("Pagination-Last-Page", 42);
    expect(extractPaginationFromHeaders({ headers })).toEqual({
      current: 12,
      last: 42,
    });
  });
});
