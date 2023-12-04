/**
 * @jest-environment jsdom
 */

import { API_URL, getAllMovies } from "../../src/movies-api";

describe("getAllMovies", () => {
  const json = [{ id: "1", title: "title 1" }];
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(json),
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
    expect(await getAllMovies()).toEqual(json);
  });
});
