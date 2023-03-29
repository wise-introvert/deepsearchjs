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

### Benchmark
- text-based search x 8,877 ops/sec ±2.19% (54 runs sampled)
- regex-based search x 10,748 ops/sec ±1.66% (66 runs sampled)
- cb-based search x 3,821 ops/sec ±2.44% (68 runs sampled)
- **Fastest method** ( for the current release ): **regex-based search** :sparkles::tada:!!
<details> <summary>JSON results</summary> <pre>{
  "0": {
    "name": "text-based search",
    "options": {
      "async": false,
      "defer": false,
      "delay": 0.005,
      "initCount": 1,
      "maxTime": 5,
      "minSamples": 5,
      "minTime": 0.05
    },
    "async": false,
    "defer": false,
    "delay": 0.005,
    "initCount": 1,
    "maxTime": 5,
    "minSamples": 5,
    "minTime": 0.05,
    "id": 1,
    "stats": {
      "moe": 0.000002468225391727029,
      "rme": 2.191007035302625,
      "sem": 0.0000012592986692484842,
      "deviation": 0.000009253917520274004,
      "mean": 0.0001126525543714703,
      "sample": [
        0.00015769818229166666,
        0.00009077873958333334,
        0.00009993230141843972,
        0.00010617629432624114,
        0.00010879266430260047,
        0.00010939714539007092,
        0.00010858489598108746,
        0.00010936117494089835,
        0.00011024596808510638,
        0.00011733689007092198,
        0.00011978819503546099,
        0.00011765195035460992,
        0.00012335012647754137,
        0.00012217564302600473,
        0.00012210524940898344,
        0.0001120287730496454,
        0.00010043457328605202,
        0.00011875847517730496,
        0.00011938945390070922,
        0.00010122613238770685,
        0.00012405433451536643,
        0.00012448200827423167,
        0.0001214767281323877,
        0.00011727469030732861,
        0.0001217446205673759,
        0.00011604318676122933,
        0.00011621895271867612,
        0.00011020633451536642,
        0.0001089328817966903,
        0.00010863012884160757,
        0.00010821265248226951,
        0.00010979141489361703,
        0.00010809674349881796,
        0.00010899054373522458,
        0.00010770914657210402,
        0.00010889695271867612,
        0.00010789136052009457,
        0.00010822668321513002,
        0.00010804156501182032,
        0.00010794763593380615,
        0.00010939777895981088,
        0.0001083326524822695,
        0.00010908902245862884,
        0.00010802706619385343,
        0.0001088446560283688,
        0.00010811052364066194,
        0.00011364810165484633,
        0.00012046674349881795,
        0.00011495649054373523,
        0.0001089853439716312,
        0.00010791186170212767,
        0.00010846184160756501,
        0.00010778202600472813,
        0.00012114243380614656
      ],
      "variance": 8.563498947203418e-11
    },
    "times": {
      "cycle": 0.09530406099826387,
      "elapsed": 5.809,
      "period": 0.0001126525543714703,
      "timeStamp": 1680113327825
    },
    "running": false,
    "count": 846,
    "cycles": 5,
    "hz": 8876.851533277384
  },
  "1": {
    "name": "regex-based search",
    "options": {
      "async": false,
      "defer": false,
      "delay": 0.005,
      "initCount": 1,
      "maxTime": 5,
      "minSamples": 5,
      "minTime": 0.05
    },
    "async": false,
    "defer": false,
    "delay": 0.005,
    "initCount": 1,
    "maxTime": 5,
    "minSamples": 5,
    "minTime": 0.05,
    "id": 2,
    "stats": {
      "moe": 0.0000015445540501164289,
      "rme": 1.6600710717343512,
      "sem": 7.880377806716474e-7,
      "deviation": 0.000006402049194480553,
      "mean": 0.00009304144120183744,
      "sample": [
        0.00009951817045454546,
        0.00009885795833333334,
        0.00009844232954545454,
        0.0000954430625,
        0.00009480458130841122,
        0.00009339951476014761,
        0.00009237942076502732,
        0.00009713979781420765,
        0.00009956720947176685,
        0.00009304139344262296,
        0.00009310777595628416,
        0.00009259447358834244,
        0.00009325457923497267,
        0.00009243693806921677,
        0.00009350853369763205,
        0.00009204055009107468,
        0.00009233540072859744,
        0.00009867556648451731,
        0.00009368325865209471,
        0.00009295426411657559,
        0.00009289777777777777,
        0.00009790426958105647,
        0.00008932095982783358,
        0.00010820145193687231,
        0.0000849997474892396,
        0.00010065591153846154,
        0.00009907735641025641,
        0.00009978626282051283,
        0.00009796252564102564,
        0.00010110847435897436,
        0.00009046954743589744,
        0.00007928806031363088,
        0.00010078644390832327,
        0.0000978181785283474,
        0.00009575204945717733,
        0.00007420424125452352,
        0.00009030462002412545,
        0.00009206059348612786,
        0.00008951722074788903,
        0.0000956167744270205,
        0.00008668394330518697,
        0.00009238784077201446,
        0.00009650898431845596,
        0.00008266278648974669,
        0.00008160760072376356,
        0.00009520243667068758,
        0.00009285027744270204,
        0.00009323332086851628,
        0.00009865135946924006,
        0.00009758354644149578,
        0.00010049500482509047,
        0.00009769746441495778,
        0.00009809205910735826,
        0.00009572443908323282,
        0.00009840254402895053,
        0.00009855772376357056,
        0.00009538444632086851,
        0.00008157696863691194,
        0.00008451101085645356,
        0.00008864664414957781,
        0.00008294154885404102,
        0.0000822051507840772,
        0.00008175369601930037,
        0.00008301888419782871,
        0.00008740495416164053,
        0.00009203323763570567
      ],
      "variance": 4.0986233888549105e-11
    },
    "times": {
      "cycle": 0.07713135475632324,
      "elapsed": 5.333,
      "period": 0.00009304144120183744,
      "timeStamp": 1680113333635
    },
    "running": false,
    "count": 829,
    "cycles": 4,
    "hz": 10747.898861870288
  },
  "2": {
    "name": "cb-based search",
    "options": {
      "async": false,
      "defer": false,
      "delay": 0.005,
      "initCount": 1,
      "maxTime": 5,
      "minSamples": 5,
      "minTime": 0.05
    },
    "async": false,
    "defer": false,
    "delay": 0.005,
    "initCount": 1,
    "maxTime": 5,
    "minSamples": 5,
    "minTime": 0.05,
    "id": 3,
    "stats": {
      "moe": 0.000006379852489101105,
      "rme": 2.4379598621014433,
      "sem": 0.000003255026780153625,
      "deviation": 0.000026841638457575104,
      "mean": 0.0002616881675649031,
      "sample": [
        0.00028239499441340784,
        0.00020411112857142858,
        0.00027751387142857146,
        0.00028508982857142857,
        0.000278299225,
        0.00025233564285714286,
        0.000203259475,
        0.00020453650357142857,
        0.00018709150357142858,
        0.00018641344285714285,
        0.00024385022857142857,
        0.00027972589999999996,
        0.0002603601,
        0.00029518694642857143,
        0.0002795342964285714,
        0.00028176721071428574,
        0.00027913496785714285,
        0.00027383697142857144,
        0.0002696181107142857,
        0.0002693358285714286,
        0.0002691491785714285,
        0.00026906109285714284,
        0.0002723568392857143,
        0.00026955173928571433,
        0.0002729523142857143,
        0.0002691246107142857,
        0.00027203542142857146,
        0.0002692420214285714,
        0.0002726287607142857,
        0.0002695780392857143,
        0.00027222617500000004,
        0.00026873837142857147,
        0.0002723631821428572,
        0.0002688930785714286,
        0.0002715741142857143,
        0.00026996944285714283,
        0.00027325639642857143,
        0.0002708656607142857,
        0.00027276723571428575,
        0.00026936782499999997,
        0.00025478935,
        0.00027027693928571427,
        0.000220599525,
        0.00018635208214285714,
        0.00018628676785714286,
        0.00018991587142857145,
        0.0002713955357142857,
        0.00027071713571428575,
        0.0002789070035714286,
        0.0002695330857142857,
        0.00027229312857142857,
        0.0002694007392857143,
        0.0002721610464285714,
        0.0002692734964285714,
        0.0002739045607142857,
        0.0002690029857142857,
        0.00027268593214285715,
        0.0002691921071428571,
        0.00026951210714285716,
        0.00027236236785714286,
        0.00027459232857142857,
        0.0002728012214285714,
        0.0002693347857142857,
        0.00027302609642857145,
        0.00027012021071428575,
        0.00027167924999999996,
        0.00026822859285714285,
        0.00027735346428571424
      ],
      "variance": 7.204735550871748e-10
    },
    "times": {
      "cycle": 0.07327268691817286,
      "elapsed": 5.58,
      "period": 0.0002616881675649031,
      "timeStamp": 1680113338968
    },
    "running": false,
    "count": 280,
    "cycles": 4,
    "hz": 3821.342054955477
  },
  "options": {},
  "length": 3,
  "events": {
    "cycle": [
      null
    ],
    "complete": [
      null
    ]
  },
  "running": false
}</pre> </details>
  
