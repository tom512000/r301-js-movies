/**
 * @jest-environment jsdom
 */

import { API_URL, posterUrl } from "../../src/movies-api";

describe("posterUrl", () => {
  test(`produce an url strating by "${API_URL}"`, () => {
    expect(posterUrl("/poster_path")).toMatch(RegExp(`^${API_URL}`));
  });
  test(`poster path must follow API url`, () => {
    expect(posterUrl("/poster_path")).toMatch(
      RegExp(`^${API_URL}/poster_path`),
    );
  });
  test(`poster size is set to original by default`, () => {
    expect(posterUrl("/poster_path")).toMatch(
      RegExp(`^${API_URL}/poster_path/original$`),
    );
  });
  test(`poster size is set if provided`, () => {
    expect(posterUrl("/poster_path", "user_size")).toMatch(
      RegExp(`^${API_URL}/poster_path/user_size$`),
    );
  });
});
