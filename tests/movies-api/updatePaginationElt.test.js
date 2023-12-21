/**
 * @jest-environment jsdom
 */

import { getAllMovies } from "../../src/movies-api";
import { updatePaginationElt } from "../../src/movies-ui";

const collection = [
  { id: "1", title: "title 1" },
  { id: "2", title: "title 2" },
];
const pagination = { current: 12, last: 42 };

jest.mock("../../src/movies-api", () => {
  const moviesApi = jest.requireActual("../../src/movies-api");
  return {
    __esModule: true,
    ...moviesApi,
    getAllMovies: jest.fn(() => Promise.resolve({ collection, pagination })),
  };
});

describe("updatePaginationElt", () => {
  beforeEach(() => {
    document.body.innerHTML =
      "<article class='movies-list'></article><nav class='pagination'></nav>";
    getAllMovies.mockClear();
  });

  test("must create 4 buttons()", () => {
    updatePaginationElt({ current: 2, last: 3 });
    expect(
      document.querySelectorAll("nav.pagination > button[type='button'].button")
        .length,
    ).toBe(4);
  });

  test("when current is the first page, the first two buttons must be disabled", () => {
    updatePaginationElt({ current: 1, last: 3 });
    const buttons = document.querySelectorAll("nav.pagination > button");
    expect(buttons[0].disabled).toBe(true);
    expect(buttons[1].disabled).toBe(true);
    expect(buttons[2].disabled).toBe(false);
    expect(buttons[3].disabled).toBe(false);
  });

  test("when current is the last page, the last two buttons must be disabled", () => {
    updatePaginationElt({ current: 3, last: 3 });
    const buttons = document.querySelectorAll("nav.pagination > button");
    expect(buttons[0].disabled).toBe(false);
    expect(buttons[1].disabled).toBe(false);
    expect(buttons[2].disabled).toBe(true);
    expect(buttons[3].disabled).toBe(true);
  });

  test("when the last page is 1, the pagination must be empty", () => {
    updatePaginationElt({ current: 1, last: 1 });
    expect(document.querySelector("nav.pagination").innerHTML).toBe("");
  });

  test("must contain an HTML element 'span.pagination__info containing' 2/3", () => {
    updatePaginationElt({ current: 2, last: 3 });
    expect(
      document.querySelector("nav.pagination > span.pagination__info")
        .innerHTML,
    ).toBe("2/3");
  });

  test("when last button is clicked, a new fetch request is emited with the new page", () => {
    updatePaginationElt({ current: 1, last: 3 });
    document.querySelector("nav.pagination > button:nth-child(4)").click();
    getAllMovies.mock.results[0].value.then(() => {
      const items = document.body.querySelectorAll(".movie-item__title");
      expect(items[0].innerHTML).toMatch(new RegExp(collection[0].title));
      expect(items[1].innerHTML).toMatch(new RegExp(collection[1].title));
    });
  });
});
