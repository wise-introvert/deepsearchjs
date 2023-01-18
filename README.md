## deepsearchjs

Search for key in deeply-nested objects.

### Installation

```bash
$ yarn add deepsearchjs
```

### Usage

```ts
search<T>(object: T, any> | Array<any>, searchTerm: string): P;
```

| Name         | Description           | Required | Type                                                                                                              |
| ------------ | --------------------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `object`     | Object to be searched | True     | `T = Record<any, any> \| Array<any>`                                                                              |
| `searchTerm` | search query          | True     | `string`                                                                                                          |
| output       | Output object         | ---      | `P = Record<key: string, any>`<br /><small>Where, `key` is a valid object path(eg. `a.b.c[0].d.e`, etc..)</small> |

### Example

<details>
  <summary>sample data</summary>
  <pre>
    {
      "a": "a",
      "b": "b",
      "c": {
        "d": "d",
        "e": [
          {
            "f": "f",
            "g": "g"
          },
          {
            "f": "f",
            "g": "g"
          },
          {
            "f": "f",
            "g": "g"
          },
          {
            "f": "f",
            "g": "g",
            "h": {
              "i1": {
                "j": {
                  "k": [
                    {
                      "l": "l",
                      "m": "m",
                      "n": {
                        "o": [
                          {
                            "p": "p1"
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              "i2": {
                "j": {
                  "k": [
                    {
                      "l": "l",
                      "m": "m",
                      "n": {
                        "o": [
                          {
                            "p": "p2"
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              "i3": {
                "j": {
                  "k": [
                    {
                      "l": "l",
                      "m": "m",
                      "n": {
                        "o": [
                          {
                            "p": "p3"
                          }
                        ]
                      }
                    }
                  ]
                }
              },
              "i4": {
                "j": {
                  "k": [
                    {
                      "l": "l",
                      "m": "m",
                      "n": {
                        "o": [
                          {
                            "p": "p4"
                          }
                        ]
                      }
                    }
                  ]
                }
              }
            }
          },
          {
            "f": "f",
            "g": "g"
          },
          {
            "f": "f",
            "g": "g"
          },
        ]
      }
    }
  </pre>
</details>

#### **`index.ts`**

```ts
import { search } from "deepsearchjs";
import data from "./data.json";

const keyToSearch: string = "p";
const searchResults: any[] = search(data, keyToSearch);

console.log(searchResults);
```

#### **`output`**

```bash
{
  'c.e[3].h.i1.j.k[0].n.o[0].p': 'p1',
  'c.e[3].h.i2.j.k[0].n.o[0].p': 'p2',
  'c.e[3].h.i3.j.k[0].n.o[0].p': 'p3',
  'c.e[3].h.i4.j.k[0].n.o[0].p': 'p4'
}
```
