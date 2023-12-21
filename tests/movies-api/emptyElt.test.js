/**
 * @jest-environment jsdom
 */

import { emptyElt } from "../../src/movies-ui";

describe("emptyElt", () => {
  test("remove all childs of the element given as parameer", () => {
    const elt = document.createElement("ul");
    elt.innerHTML = `<li><p>1
    <li><p>2
    <li><p>3`;
    emptyElt(elt);
    expect(elt.hasChildNodes()).toBe(false);
    expect(elt.innerHTML).toBe("");
  });
});
