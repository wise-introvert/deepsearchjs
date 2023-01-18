import { describe, it, expect } from "@jest/globals";

import { search } from "../src";

type Control = Record<string, any>;

const control: Control = {
  a: "a",
  b: "b",
  c: {
    d: "d",
    e: [
      {
        f: "f",
        g: "g",
      },
      {
        f: "f",
        g: "g",
      },
      {
        f: "f",
        g: "g",
      },
      {
        f: "f",
        g: "g",
      },
      {
        f: "f",
        g: "g",
      },
    ],
  },
};

describe("search", () => {
  it("returns an empty array when 0 results found", () => {
    const searchResults: string[] = search<Control>(control, "invalid");

    expect(searchResults).toHaveLength(0);
  });

  it("returns an array of string when more than 0 results found", () => {
    const searchResults: string[] = search<Control>(control, "f");

    expect(searchResults.length).toBeGreaterThan(0);
    expect(searchResults).toEqual(expect.arrayContaining([expect.any(String)]));
  });

  it("returns paths that are valid", () => {
    const searchResults: string[] = search<Control>(control, "e");

    expect(searchResults.length).toBe(1);
    expect(searchResults[0]).toEqual(control.c.e);
  });
});
