## deepsearchjs

[![build](https://github.com/wise-introvert/deepsearchjs/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/wise-introvert/deepsearchjs/workflows/npm-publish.yml)
[![test](https://github.com/wise-introvert/deepsearchjs/actions/workflows/test.yml/badge.svg)](https://github.com/wise-introvert/deepsearchjs/workflows/test.yml)

Search for key in deeply-nested objects.

### Installation

```bash
$ yarn add deepsearchjs
```

### Usage

```ts
search<T>(object: T, any> | Array<any>, searchTerm: string): P;
```

| Name         | Description                                                                                                                      | Required | Type                                                                                                              |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `object`     | Object to be searched                                                                                                            | True     | `T = Record<any, any> \| Array<any>`                                                                              |
| `searchTerm` | string to search for, a function that determines if an object key matches the query, or a regular expression to use for matching | True     | `string` or `((key: string, value: any) => boolean)` or `RegExp`                                                  |
| output       | Output object                                                                                                                    | ---      | `P = Record<key: string, any>`<br /><small>Where, `key` is a valid object path(eg. `a.b.c[0].d.e`, etc..)</small> |

### Parameters

- `obj` (`T`): The object to search. It is also generic, meaning it can accept any type of object.
- `query` (`string` | `((key: string, value: any) => boolean)` | `RegExp`): The query to search for. This can be a string, a function, or a regular expression.
  - If it is a string, the function will search for keys that end with that string.
  - If it is a function, it will determine if the key matches the query.
  - If it is a regular expression, it will test the key against that regular

### Example

<details>
  <summary>sample data</summary>
  <pre>
{
  "users": [
    {
      "id": 39101,
      "name": "Edwin Reichel",
      "email": "Kirk.Bednar@yahoo.com",
      "address": {
        "street": "1709 Carole Branch",
        "city": "Jenkinsboro",
        "state": "TX",
        "zip": "61317-0976",
        "phoneNumbers": [
          { "type": "work", "number": "232.844.3064 x29733" },
          { "type": "work", "number": "950.846.8118 x9126" }
        ],
        "previousAddresses": [
          {
            "street": "82002 Connelly Dale",
            "city": "Folsom",
            "state": "MS",
            "zip": "20367-6986",
            "yearsLived": 10,
            "phoneNumbers": [{ "type": "work", "number": "1-997-352-5842" }],
            "previousAddresses": [
              {
                "street": "663 Emie Way",
                "city": "Gradyton",
                "state": "OH",
                "zip": "09828-8254",
                "yearsLived": 5
              },
              {
                "street": "1991 Consuelo Roads",
                "city": "Gusbury",
                "state": "KY",
                "zip": "69719",
                "yearsLived": 1
              }
            ]
          }
        ]
      },
      "orders": [
        {
          "id": 15686,
          "date": "Sun Jan 22 2023 15:36:15 GMT-0500 (Eastern Standard Time)",
          "total": 83285,
          "items": [
            {
              "name": "Incredible Metal Shoes",
              "quantity": 1,
              "price": "469.00"
            },
            {
              "name": "Unbranded Concrete Chair",
              "quantity": 6,
              "price": "999.00"
            },
            {
              "name": "Licensed Concrete Sausages",
              "quantity": 9,
              "price": "657.00"
            },
            {
              "name": "Electronic Rubber Ball",
              "quantity": 7,
              "price": "117.00"
            }
          ],
          "shippingAddress": {
            "street": "034 Wiza Forge",
            "city": "Glenniemouth",
            "state": "VT",
            "zip": "60082-4617"
          }
        }
      ]
    },
    {
      "id": 41973,
      "name": "Melanie Upton",
      "email": "Alisha.Boyle@yahoo.com",
      "address": {
        "street": "69147 Bode Junctions",
        "city": "Bakersfield",
        "state": "WA",
        "zip": "83859",
        "phoneNumbers": [
          { "type": "home", "number": "(263) 786-2737 x719" },
          { "type": "home", "number": "1-536-445-2960" }
        ],
        "previousAddresses": [
          {
            "street": "99456 Elliott Corner",
            "city": "Joanneburgh",
            "state": "ME",
            "zip": "41321",
            "yearsLived": 9,
            "phoneNumbers": [
              { "type": "work", "number": "(999) 243-1101" },
              { "type": "work", "number": "353.548.4339 x89335" }
            ],
            "previousAddresses": [
              {
                "street": "591 Thomas Way",
                "city": "New Richmond",
                "state": "OH",
                "zip": "19873",
                "yearsLived": 3
              },
              {
                "street": "215 Shanahan Crescent",
                "city": "South Clarissa",
                "state": "MS",
                "zip": "31746",
                "yearsLived": 2
              }
            ]
          }
        ]
      },
      "orders": [
        {
          "id": 21059,
          "date": "Sun Jan 22 2023 11:09:50 GMT-0500 (Eastern Standard Time)",
          "total": 38281,
          "items": [
            { "name": "Rustic Frozen Shirt", "quantity": 3, "price": "797.00" },
            {
              "name": "Luxurious Fresh Salad",
              "quantity": 3,
              "price": "290.00"
            },
            {
              "name": "Ergonomic Bronze Pizza",
              "quantity": 10,
              "price": "380.00"
            }
          ],
          "shippingAddress": {
            "street": "35692 Miller Locks",
            "city": "Bowie",
            "state": "TN",
            "zip": "40565-6785"
          }
        }
      ]
    }
  ]
}
</pre>
</details>

#### **`index.ts`**

```ts
import { search } from "deepsearchjs";
import data from "./data.json";

// string as query
search(data, "city");

// call back function as query
search(data, (key: string, value: string): boolean => /city/gi.test(key));

// regex as query
search(data, /city/gi);

/*
 * All three calls will have the same output:
 * {
 *   "users[0].address.city": "Jenkinsboro",
 *   "users[0].address.previousAddresses[0].city": "Folsom",
 *   ...
 * }
 */
```

### TODO

- [ ] ci/cd: Automate versioning and releases
- [ ] feat: Optimize search algorithm to handle oversized datasets
- [ ] feat: Add a third parameter to the function to customize the search parameters ( leaf-node results only, etc... )
- [ ] feat: Search across values??
