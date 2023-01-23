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
    users: [
      {
        id: 1,
        name: "John Smith",
        email: "john.smith@example.com",
        address: {
          street: "123 Main St",
          city: "Anytown",
          state: "NY",
          zip: "12345",
          phoneNumbers: [
            {
              type: "home",
              number: "555-555-5555",
            },
            {
              type: "work",
              number: "555-555-5556",
            },
          ],
          previousAddresses: [
            {
              street: "456 Elm St",
              city: "Anytown",
              state: "NY",
              zip: "54321",
              yearsLived: 3,
              phoneNumbers: [
                {
                  type: "home",
                  number: "555-555-5557",
                },
                {
                  type: "work",
                  number: "555-555-5558",
                },
              ],
              previousAddresses: [
                {
                  street: "111 Pine St",
                  city: "Anytown",
                  state: "NY",
                  zip: "11111",
                  yearsLived: 1,
                },
                {
                  street: "222 Cedar St",
                  city: "Anytown",
                  state: "NY",
                  zip: "22222",
                  yearsLived: 2,
                },
              ],
            },
            {
              street: "789 Oak St",
              city: "Anytown",
              state: "NY",
              zip: "67890",
              yearsLived: 5,
              "phoneNumbers ": [
                {
                  type: "home",
                  number: "555-555-5559",
                },
                {
                  type: "work",
                  number: "555-555-5560",
                },
              ],
              previousAddresses: [
                {
                  street: "333 Maple St",
                  city: "Anytown",
                  state: "NY",
                  zip: "33333",
                  yearsLived: 3,
                },
                {
                  street: "444 Birch St",
                  city: "Anytown",
                  state: "NY",
                  zip: "44444",
                  yearsLived: 4,
                },
              ],
            },
          ],
        },
        orders: [
          {
            id: 101,
            date: "2022-01-01",
            total: 123,
            items: [
              {
                name: "item 1",
                quantity: 2,
                ders: 50,
              },
              {
                name: "item 2",
                quantity: 1,
                ders: 40,
              },
            ],
            shippingAddress: {
              street: "123 Main St",
              city: "Anytown",
              state: "NY",
              zip: "12345",
            },
          },
          {
            id: 102,
            date: "2022-02-01",
            total: 200,
            items: [
              {
                name: "item 3",
                quantity: 3,
                ders: 30,
              },
              {
                name: "item 4",
                quantity: 2,
                ders: 25,
              },
            ],
            shippingAddress: {
              street: "456 Elm St",
              city: "Anytown",
              state: "NY",
              zip: "54321",
            },
          },
        ],
      },
      {
        id: 2,
        name: "Jane Doe",
        email: "jane.doe@example.com",
        address: {
          street: "987 Park Ave",
          city: "Anytown",
          state: "NY",
          zip: "98765",
          phoneNumbers: [
            {
              type: "home",
              number: "555-555-5561",
            },
            {
              type: "work",
              number: "555-555-5562",
            },
          ],
          previousAddresses: [
            {
              street: "654 Elm St",
              city: "Anytown",
              state: "NY",
              zip: "65432",
              yearsLived: 4,
            },
            {
              street: "321 Oak St",
              city: "Anytown",
              state: "NY",
              zip: "32109",
              yearsLived: 2,
              phoneNumbers: [
                {
                  type: "home",
                  number: "555-555-5563",
                },
                {
                  type: "work",
                  number: "555-555-5564",
                },
              ],
              previousAddresses: [
                {
                  street: "321 Pine St",
                  city: "Anytown",
                  state: "NY",
                  zip: "11111",
                  yearsLived: 1,
                },
                {
                  street: "432 Cedar St",
                  city: "Anytown",
                  state: "NY",
                  zip: "22222",
                  yearsLived: 2,
                },
              ],
            },
            {
              street: "765 Oak St",
              city: "Anytown",
              state: "NY",
              zip: "67890",
              yearsLived: 5,
              phoneNumbers: [
                {
                  type: "home",
                  number: "555-555-5565",
                },
                {
                  type: "work",
                  number: "555-555-5566",
                },
              ],
              previousAddresses: [
                {
                  street: "876 Maple St",
                  city: "Anytown",
                  state: "NY",
                  zip: "33333",
                  yearsLived: 3,
                },
                {
                  street: "987 Birch St",
                  city: "Anytown",
                  state: "NY",
                  zip: "44444",
                  yearsLived: 4,
                },
              ],
            },
          ],
        },
        orders: [
          {
            id: 101,
            date: "2022-01-01",
            total: 123,
            items: [
              {
                name: "item 1",
                quantity: 2,
                ders: 50,
              },
              {
                name: "item 2",
                quantity: 1,
                ders: 40,
              },
            ],
            shippingAddress: {
              street: "123 Main St",
              city: "Anytown",
              state: "NY",
              zip: "12345",
            },
          },
          {
            id: 102,
            date: "2022-02-01",
            total: 200,
            items: [
              {
                name: "item 3",
                quantity: 3,
                ders: 30,
              },
              {
                name: "item 4",
                quantity: 2,
                ders: 25,
              },
            ],
            shippingAddress: {
              street: "456 Elm St",
              city: "Anytown",
              state: "NY",
              zip: "54321",
            },
          },
        ],
      },
    ],
  };
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
 *  {
 *    "users[0].address.city": "Anytown",
 *    "users[0].address.previousAddresses[0].city": "Anytown",
 *    ...
 *  }
 */
```

### TODO

- [ ] ci/cd: Automate versioning and releases
- [ ] feat: Optimize search algorithm to handle oversized datasets
- [ ] feat: Add a third parameter to the function to customize the search parameters ( leaf-node results only, etc... )
- [ ] feat: Search across values??
