/**
 * This code exports three functions:
 * 1. isObject
 * 2. isArray
 * 3. search
 *
 * isObject takes any value and returns a
 * boolean indicating whether it is an object.
 *
 * isArray takes any value and returns a
 * boolean indicating whether it is an array.
 *
 * search takes an object and a query string and
 * returns an object containing the search results. getkeys is a helper function
 */

import { get, isEmpty } from "lodash";

/**
 * Determines if a value is a function
 * @param value - the value to check
 * @returns - true if value is a function, false otherwise
 */
const isFunction = (value: any): boolean => {
  return value && {}.toString.call(value) === "[object Function]";
};

/**
 * Check if the provided value is an object
 * @param x - value to check
 * @returns - boolean indicating whether the provided value is an object
 */
const isObject = (x: any): boolean => {
  return Object.prototype.toString.call(x) === "[object Object]";
};

/**
 * Check if the provided value is an array
 * @param x - value to check
 * @returns - boolean indicating whether the provided value is an array
 */
const isArray = (x: any): boolean => Array.isArray(x);

/**
 * Get all the keys of an object and its nested objects/arrays
 * @param obj - object to get the keys from
 * @param prefix - prefix to add to the keys, defaults to empty string
 * @param results - array of keys, defaults to empty
 *                    array ( mainly for recursion)
 * @returns - array of keys
 */
export const getkeys = (
  obj: any,
  prefix: string = "",
  results: string[] = []
): any => {
  Object.keys(obj).forEach((key) => {
    const newPrefix: string = `${prefix}${prefix ? "." : ""}${key}`;
    if (isObject(obj[key])) {
      results.push(newPrefix);
      getkeys(obj[key], newPrefix, results);
    } else if (isArray(obj[key])) {
      results.push(newPrefix);
      obj[key].forEach((item: string, index: number): void => {
        getkeys(item, `${newPrefix}[${index}]`, results);
      });
    } else {
      results.push(newPrefix);
    }
  });
  return results;
};

/**
 * Search an object and its nested objects/arrays for the provided query
 * @param obj {T} - object to search
 * @param query {string | ((key: string, value: any) => boolean) | RegExp} - string to search for,
 *  a function that determines if an object key matches the query, or a regular expression to use for matching
 * @returns {any} - object containing the search results
 * @description
 *        This function accepts two parameters, obj and query, and returns an any object.
 *        obj is an object that will be searched. It is also generic, meaning it can accept any type of object.
 *        query can be a string, a function, or a regular expression that will be used to search the object.
 *        If it is a string, the function will search for keys that end with that string. If it is a function,
 *        it will determine if the key matches the query. If it is a regular expression, it will test the key
 *        against that regular expression. This function uses console.log() to log various information while
 *        it is running, such as the query, the generated regex and so on. The function uses the getkeys and
 *        get functions, but it is not defined in the code snippet provided. It filters the keys array, and
 *        constructs a new object containing the key-value pairs that match the query. This function is
 *        exported as search which means it can be used in other files.
 *
 * @template T
 */
export const search = <T = any>(
  obj: T,
  query: string | ((key: string, value: any) => boolean) | RegExp
): any => {
  const keys: string[] = getkeys(obj);
  const regex: RegExp | null =
    !isFunction(query) && query instanceof RegExp
      ? query
      : isFunction(query)
      ? null
      : new RegExp(`\\.${query}$`, "gi");

  const searchKeys: string[] = keys.filter((field: string): boolean => {
    if (typeof query === "function") {
      return query(field, get(obj, field));
    }

    const result: boolean = regex!.test(field);
    regex!.exec(field);

    return result;
  });

  const searchValues: Record<string, any> = searchKeys.reduce(
    (acc: Record<string, any>, key: string): any => {
      acc[key] = get(obj, key);

      return acc;
    },
    {}
  );

  return searchValues;
};
