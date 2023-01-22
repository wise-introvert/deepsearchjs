import { describe, it, expect } from "@jest/globals";

import { search } from "../src";

describe("search", () => {
  it("returns an object containing the search results", () => {
    const obj = {
      a: {
        b: {
          c: "value1",
        },
        d: "value2",
      },
      e: "value3",
    };
    const query = "c";
    const result = search(obj, query);
    expect(result).toEqual({ "a.b.c": "value1" });
  });
  it("returns an empty object if search query not found", () => {
    const obj = {
      a: {
        b: {
          c: "value1",
        },
        d: "value2",
      },
      e: "value3",
    };
    const query = "x";
    const result = search(obj, query);
    expect(result).toEqual({});
  });
});
