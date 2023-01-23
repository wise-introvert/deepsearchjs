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
 * @returns - array of keys
 */
export const getkeys = (obj: any, prefix?: any): any => {
  try {
    const keys: string[] = Object.keys(obj);
    prefix = prefix ? prefix + "." : "";
    return keys.reduce((result: string[], key: string): string[] => {
      if (isObject(obj[key])) {
        result.push(prefix + key);
        result = result.concat(getkeys(obj[key], (prefix + key).trim()));
      } else if (isArray(obj[key])) {
        result.push(prefix + key);
        obj[key].forEach((item: any, index: number): void => {
          result = result.concat(
            getkeys(item, (prefix + key + `[${index}]`).trim())
          );
        });
      } else {
        result.push((prefix + key).trim());
      }
      return result;
    }, []);
  } catch (error) {
    return;
  }
};

/**
 * Search an object and its nested objects/arrays for the provided query
 * @param obj - object to search
 * @param query - string to search for
 * @returns - object containing the search results
 */
export const search = <T = any>(obj: T, query: string): any => {
  const keys: string[] = getkeys(obj);

  const regex: RegExp = new RegExp(`\\.${query}$`, "gi");
  const searchKeys: string[] = keys.filter((field: string): boolean => {
    return regex.test(field);
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
