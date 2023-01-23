import { describe, test, it, expect } from "@jest/globals";

import { search } from "../src";

describe("search", () => {
  const testObj = {
    foo: "bar",
    nested: {
      key1: "value1",
      key2: "value2",
    },
    arr: [{ a: 1 }, { b: 2 }],
  };

  test("searching for a string query", () => {
    const query = "key1";
    const result = search(testObj, query);
    expect(result).toEqual({ "nested.key1": "value1" });
  });

  test("searching for a regular expression query", () => {
    const query = /key/gi;
    const result = search(testObj, query);
    console.log(result);
    expect(result).toEqual({
      "nested.key1": "value1",
      "nested.key2": "value2",
    });
  });

  test("searching with a function query", () => {
    const query = (key: string, value: any) =>
      key.endsWith("1") && value === "value1";
    const result = search(testObj, query);
    expect(result).toEqual({ "nested.key1": "value1" });
  });

  test("searching for a non-existent query", () => {
    const query = "nonExistentKey";
    const result = search(testObj, query);
    expect(result).toEqual({});
  });

  test("searching in array", () => {
    const query = "a";
    const result = search(testObj, query);
    expect(result).toEqual({ "arr[0].a": 1 });
  });
});

describe("search", () => {
  const testObj = {
    foo: "bar",
    nested: {
      key1: "value1",
      key2: "value2",
    },
    arr: [{ a: 1 }, { b: 2 }],
  };

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

  test("searching for a string query", () => {
    const query = "key1";
    const result = search(testObj, query);
    expect(result).toEqual({ "nested.key1": "value1" });
  });

  test("searching for a regular expression query", () => {
    const query = /key/gi;
    const result = search(testObj, query);
    expect(result).toEqual({
      "nested.key1": "value1",
      "nested.key2": "value2",
    });
  });

  test("searching with a function query", () => {
    const query = (key: string, value: any) =>
      key.endsWith("1") && value === "value1";
    const result = search(testObj, query);
    expect(result).toEqual({ "nested.key1": "value1" });
  });

  test("searching for a non-existent query", () => {
    const query = "nonExistentKey";
    const result = search(testObj, query);
    expect(result).toEqual({});
  });

  test("searching in array", () => {
    const query = "a";
    const result = search(testObj, query);
    expect(result).toEqual({ "arr[0].a": 1 });
  });
});
