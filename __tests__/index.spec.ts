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

describe("isObject", () => {
  test("returns true for an object", () => {
    expect(isObject({})).toBe(true);
  });

  test("returns false for a string", () => {
    expect(isObject("test")).toBe(false);
  });

  test("returns false for a number", () => {
    expect(isObject(1)).toBe(false);
  });
});

describe("isArray", () => {
  test("returns true for an array", () => {
    expect(isArray([])).toBe(true);
  });

  test("returns false for an object", () => {
    expect(isArray({})).toBe(false);
  });

  test("returns false for a string", () => {
    expect(isArray("test")).toBe(false);
  });
});

describe("search", () => {
  test("returns an object containing the search results", () => {
    const obj = {
      a: {
        b: {
          c: "value1"
        },
        d: "value2"
      },
      e: "value3"
    };
    const query = "c";
    const result = search(obj, query);
    expect(result).toEqual({ "a.b.c": "value1" });
  });
  test("returns an empty object if search query not found", () => {
    const obj = {
      a: {
        b: {
          c: "value1"
        },
        d: "value2"
      },
      e: "value3"
    };
    const query = "x";
    const result = search(obj, query);
    expect(result).toEqual({});
  });
});