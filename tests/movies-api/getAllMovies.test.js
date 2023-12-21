/**
 * @jest-environment jsdom
 */

import { API_URL, getAllMovies } from "../../src/movies-api";

describe("getAllMovies", () => {
  const collection = [{ title: "Movie Title" }];
  const headers = new Headers();
  headers.append("Pagination-Current-Page", 12);
  headers.append("Pagination-Last-Page", 42);
  const json = () => Promise.resolve(collection);

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        headers,
        json,
      }),
    );
    global.fetch.mockClear();
  });

  // eslint-disable-next-line no-template-curly-in-string
  test("the produce request must start by `${API_URL}/movies`", () => {
    getAllMovies();
    expect(global.fetch.mock.calls[0][0]).toMatch(RegExp(`^${API_URL}/movies`));
  });

  test("must return the JSON object from the body response", async () => {
    expect(await getAllMovies()).toEqual({
      collection,
      pagination: { current: 12, last: 42 },
    });
  });
});
