/**
 * @jest-environment jsdom
 */

import { setLoading } from "../../src/movies-ui";

describe("setLoading", () => {
  beforeEach(() => {
    document.body.innerHTML =
      "<article class='movies-list'>movies content</article><nav class='pagination'>pagination content</nav>";
  });

  test("must replace 'article.movies-list' content with an HTML element 'article.loading'", () => {
    setLoading();
    expect(
      document.querySelectorAll("article.movies-list > article.loading").length,
    ).toBe(1);
  });

  test("must remove 'nav.pagination' content", () => {
    setLoading();
    expect(document.querySelector("nav.pagination").innerHTML).toBe("");
  });
});
