/**
 * @jest-environment jsdom
 */

import { getAllMovies } from "../../src/movies-api";
import { updateMoviesElt } from "../../src/movies-ui";

const json = [
  { id: "1", title: "title 1" },
  { id: "2", title: "title 2" },
];

jest.mock("../../src/movies-api", () => {
  const moviesApi = jest.requireActual("../../src/movies-api");
  return {
    __esModule: true,
    ...moviesApi,
    getAllMovies: jest.fn(() => Promise.resolve(json)),
  };
});

describe("updateMoviesElt", () => {
  beforeEach(() => {
    document.body.innerHTML =
      "<article class='movies-list'></article><nav class='pagination'></nav>";
    getAllMovies.mockClear();
  });

  test("must call getAllMovies()", () => {
    updateMoviesElt();
    expect(getAllMovies).toHaveBeenCalled();
    expect(getAllMovies.mock.calls.length).toBe(1);
  });

  test("insert 2 .movie-item in the container", () => {
    updateMoviesElt();
    getAllMovies.mock.results[0].value.then(() =>
      expect(document.body.querySelectorAll(".movie-item").length).toBe(2),
    );
  });

  test("Add movies title to .movie-item__title elements in the conainer", () => {
    updateMoviesElt();
    getAllMovies.mock.results[0].value.then(() => {
      const items = document.body.querySelectorAll(".movie-item__title");
      expect(items[0].innerHTML).toMatch(new RegExp(json[0].title));
      expect(items[1].innerHTML).toMatch(new RegExp(json[1].title));
    });
  });
});
