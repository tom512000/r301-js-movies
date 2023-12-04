/**
 * @jest-environment jsdom
 */

import { API_URL } from "../../src/movies-api";

describe("API_URL", () => {
  test('equals "http://movies-api"', () => {
    expect(API_URL).toEqual("http://movies-api");
  });
});
