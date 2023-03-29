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
- text-based search x 8,738 ops/sec ±1.74% (55 runs sampled)
- regex-based search x 10,991 ops/sec ±2.56% (68 runs sampled)
- cb-based search x 3,671 ops/sec ±1.93% (66 runs sampled)
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
      "moe": 0.00000199199557545442,
      "rme": 1.7405856677074196,
      "sem": 0.0000010163242731910307,
      "deviation": 0.00000753726253723792,
      "mean": 0.00011444398356319573,
      "sample": [
        0.00010523615038560411,
        0.00012253122107969152,
        0.00011541243701799487,
        0.00011608651670951156,
        0.00010868611568123394,
        0.00010978598971722366,
        0.00010991169794344472,
        0.00010894855141388176,
        0.00010876352185089975,
        0.00010885527763496144,
        0.00011287848843187661,
        0.00011810006041131106,
        0.00012041360025706942,
        0.00012415408483290488,
        0.0001063926503856041,
        0.0001091037532133676,
        0.00011641799742930592,
        0.00012114663367609255,
        0.00012346173136246788,
        0.0001236408316195373,
        0.0000910715321336761,
        0.00010910852416356878,
        0.00010815014622057002,
        0.0001074106741016109,
        0.00010887866542750929,
        0.00010804711276332094,
        0.00010943705080545228,
        0.00010903479182156134,
        0.00010812531226765799,
        0.00010925363940520445,
        0.00010817184262701363,
        0.00010840556753407684,
        0.00010928589219330855,
        0.00010832883271375465,
        0.00011137709293680298,
        0.00011760755638166047,
        0.00011599257868649318,
        0.00010321073605947956,
        0.00012284810161090459,
        0.000121936229244114,
        0.00012089032094175961,
        0.00012132037918215613,
        0.00013231768897149939,
        0.00013179067534076826,
        0.00011715497149938042,
        0.00011709135439900867,
        0.0001222967199504337,
        0.0001210785960346964,
        0.00011832327509293679,
        0.00012136018091697646,
        0.00011923347459727386,
        0.00012191990086741015,
        0.00010907372118959107,
        0.00011666388599752168,
        0.00011829476084262702
      ],
      "variance": 5.681032655525022e-11
    },
    "times": {
      "cycle": 0.09235629473549896,
      "elapsed": 5.561,
      "period": 0.00011444398356319573,
      "timeStamp": 1680124842710
    },
    "running": false,
    "count": 807,
    "cycles": 4,
    "hz": 8737.899266218761
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
      "moe": 0.0000023314618725241616,
      "rme": 2.5624273697605173,
      "sem": 0.0000011895213635327355,
      "deviation": 0.000009809044451548425,
      "mean": 0.00009098645682753764,
      "sample": [
        0.00009322267343173431,
        0.00008178315944272446,
        0.00008311619659442724,
        0.00008332328792569659,
        0.00008192120433436532,
        0.00008181160061919505,
        0.00008182343034055728,
        0.00008181231578947368,
        0.0000820182105263158,
        0.00008313783281733746,
        0.00008174527708978329,
        0.00008185295820433436,
        0.00008243867182662538,
        0.00008249382043343653,
        0.00008261910990712073,
        0.00008234243962848297,
        0.00010015410681114552,
        0.0000891732027863777,
        0.00008194489938080495,
        0.0000824809334365325,
        0.00008710936996904025,
        0.00009908703095975233,
        0.00009657620433436532,
        0.00009374334055727554,
        0.00009312889938080496,
        0.0000943423761609907,
        0.00009337276470588236,
        0.00009290540866873066,
        0.00009259454024767802,
        0.00009250429566563467,
        0.00009386580650154798,
        0.00009321387770897834,
        0.00008982505108359132,
        0.00009118454334365325,
        0.00007943315634674922,
        0.00009485240557275541,
        0.0000756225754985755,
        0.000132761896011396,
        0.00009719964387464387,
        0.00009481699857549858,
        0.00009327509686609687,
        0.00005947243431952663,
        0.00007615204867256637,
        0.00009299148230088494,
        0.00009241096902654866,
        0.00009312769690265487,
        0.0000920058174778761,
        0.00009258221460176991,
        0.00009263464048672566,
        0.00009847919800884955,
        0.0001022987853982301,
        0.00009390574004424778,
        0.00009220900331858408,
        0.00010282523783185841,
        0.00009971309955752214,
        0.0000983832488938053,
        0.00009711529424778762,
        0.00009854438495575221,
        0.00008898663163716815,
        0.00008186512278761062,
        0.00008106303650442479,
        0.00010213450110619469,
        0.00010031240486725663,
        0.00009875036061946902,
        0.00010357348340707964,
        0.00009999155530973451,
        0.00010075308960176991,
        0.00010216696902654867
      ],
      "variance": 9.621735305245295e-11
    },
    "times": {
      "cycle": 0.08225175697209403,
      "elapsed": 5.48,
      "period": 0.00009098645682753764,
      "timeStamp": 1680124848272
    },
    "running": false,
    "count": 904,
    "cycles": 3,
    "hz": 10990.646683774848
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
      "moe": 0.000005248036602167599,
      "rme": 1.9267603290974564,
      "sem": 0.0000026775696949834687,
      "deviation": 0.000021752679033135097,
      "mean": 0.0002723762017991056,
      "sample": [
        0.00030723655151515154,
        0.0002789702111111111,
        0.00029295774444444445,
        0.0002284810653846154,
        0.00024910824615384617,
        0.0002883286,
        0.00027999025,
        0.00029117250000000003,
        0.0002945135038461538,
        0.00028800195,
        0.00029627005,
        0.00028324610769230767,
        0.00028008204615384617,
        0.00027812363461538457,
        0.00027631591153846153,
        0.0002704117153846154,
        0.0002755034153846154,
        0.00027096027692307697,
        0.0002746614153846154,
        0.00027178067692307695,
        0.0002812870653846154,
        0.00028507891538461535,
        0.0002825444884615385,
        0.0002654608076923077,
        0.00027296651923076925,
        0.00026169617692307695,
        0.00026836959615384614,
        0.00027992958846153845,
        0.00028462836538461535,
        0.00027823300384615383,
        0.00027423395,
        0.0002749234653846154,
        0.0002706604423076923,
        0.00027340700384615384,
        0.00027211333076923073,
        0.00027517325,
        0.00027403983846153844,
        0.0002702667384615384,
        0.00027532741153846153,
        0.00027085440384615384,
        0.0002742388923076923,
        0.00027042940769230774,
        0.00027403233076923075,
        0.0002739984730769231,
        0.00026988061153846154,
        0.00027120756153846154,
        0.00027034719615384614,
        0.00028420262307692306,
        0.0002749458,
        0.00028061455384615383,
        0.00020554768461538464,
        0.00019242837692307692,
        0.00019121567912772585,
        0.00020963128037383176,
        0.00027720243925233643,
        0.0002877712492211838,
        0.0002826333769470405,
        0.0002804693520249221,
        0.00028309276947040496,
        0.0002823783208722742,
        0.00028220521183800623,
        0.000286518199376947,
        0.0002883962336448598,
        0.0002803423613707165,
        0.00028607168224299066,
        0.00024971741744548285
      ],
      "variance": 4.731790451185953e-10
    },
    "times": {
      "cycle": 0.0874327607775129,
      "elapsed": 5.687,
      "period": 0.0002723762017991056,
      "timeStamp": 1680124853753
    },
    "running": false,
    "count": 321,
    "cycles": 4,
    "hz": 3671.392703895483
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
  
