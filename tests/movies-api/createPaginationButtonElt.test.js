/**
 * @jest-environment jsdom
 */

import { createPaginationButtonElt } from "../../src/movies-ui";
import { getAllMovies } from "../../src/movies-api";

const collection = [];
const pagination = { current: 12, last: 42 };

jest.mock("../../src/movies-api", () => {
  const moviesApi = jest.requireActual("../../src/movies-api");
  return {
    __esModule: true,
    ...moviesApi,
    getAllMovies: jest.fn(() => Promise.resolve({ collection, pagination })),
  };
});

describe("createPaginationButtonElt", () => {
  let button;
  beforeEach(() => {
    document.body.innerHTML =
      "<article class='movies-list'></article><nav class='pagination'></nav>";
    getAllMovies.mockClear();
    button = createPaginationButtonElt("first_page", false, 2);
  });

  test('return an HTML element of type "button"', () => {
    expect(button.nodeName).toBe("BUTTON");
  });

  test('returned button must be of type "button"', () => {
    expect(button.type).toBe("button");
  });

  test('returned button must have CSS class "button"', () => {
    expect(button.classList.contains("button")).toBe(true);
  });

  test("returned button is active if isDisabled is false", () => {
    expect(button.disabled).toBe(false);
  });
  test("returned button is disabled if isDisabled is true", () => {
    expect(createPaginationButtonElt("first_page", true, 2).disabled).toBe(
      true,
    );
  });

  test("returned button must contains a material icon", () => {
    expect(button.querySelector("span.material-symbols-outlined")).not.toBe(
      null,
    );
  });
  test("materialIcon parameter must be use inside the material icon", () => {
    expect(
      button.querySelector("span.material-symbols-outlined").innerHTML,
    ).toBe("first_page");
  });
  test("callback parameter must be called on button click", () => {
    expect(getAllMovies.mock.calls.length).toBe(0);
    button.click();
    expect(getAllMovies.mock.calls.length).toBe(1);
  });
});
