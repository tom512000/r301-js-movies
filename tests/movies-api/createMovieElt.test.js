/**
 * @jest-environment jsdom
 */

import { createMovieElt } from "../../src/movies-ui";

describe("createMovieElt", () => {
  let movieData;
  beforeEach(() => {
    movieData = { title: "Movie Title" };
  });

  test('return an HTML element of type "article"', () => {
    expect(createMovieElt(movieData).nodeName).toBe("ARTICLE");
  });

  test('return an HTML element with CSS class "movie-item"', () => {
    expect(createMovieElt(movieData).classList.contains("movie-item")).toBe(
      true,
    );
  });

  test('return an HTML element that contain an HTML element "div.movie-item__info"', () => {
    expect(
      createMovieElt(movieData).querySelector("div.movie-item__info"),
    ).not.toBe(null);
  });

  test('the ".movie-item__info" HTML element must contain an HTML element "div.movie-item__title"', () => {
    expect(
      createMovieElt(movieData).querySelector(
        ".movie-item__info > div.movie-item__title",
      ),
    ).not.toBe(null);
  });

  test('the ".movie-item__title" HTML element must contain the title of the movie', () => {
    expect(
      createMovieElt(movieData).querySelector(".movie-item__title").innerHTML,
    ).toMatch(new RegExp(movieData.title));
  });
});

describe("createMovieElt", () => {
  let movieData;
  beforeEach(() => {
    movieData = { title: "Movie Title", poster: "/poster_path" };
  });

  test('return an HTML element that contain an HTML element "img.movie-item__poster"', () => {
    expect(
        createMovieElt(movieData).querySelector("img.movie-item__poster"),
    ).not.toBe(null);
  });

  test('the poster element had a src attribut with value "http://movies-api/poster_path/medium"', () => {
    expect(
        createMovieElt(movieData).querySelector("img.movie-item__poster").src,
    ).toBe("http://movies-api/poster_path/medium");
  });

  test("the poster element had an alt attribut with value \"poster of 'Movie Title'\"", () => {
    expect(
        createMovieElt(movieData).querySelector("img.movie-item__poster").alt,
    ).toBe("poster of 'Movie Title'");
  });
});
