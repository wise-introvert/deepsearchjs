import { get, isEmpty } from "lodash";

export const isObject = (x: any): boolean => {
  return Object.prototype.toString.call(x) === "[object Object]";
};

export const isArray = (x: any): boolean => Array.isArray(x);

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

export const search = <T = any>(obj: T, query: string): any => {
  const keys: string[] = getkeys(obj);

  const searchKeys: string[] = keys.filter((field: string): boolean => {
    const regex: RegExp = new RegExp(`\\.${query}$`, "gi");
    return regex.test(field);
  });

  const searchValues: any[] = searchKeys.map((key: string): any => {
    return get(obj, key);
  });

  return searchValues.filter((value: any): boolean => !isEmpty(value));
};
