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
- text-based search x 8,461 ops/sec ±1.40% (59 runs sampled)
- regex-based search x 11,172 ops/sec ±1.76% (64 runs sampled)
- cb-based search x 3,637 ops/sec ±3.36% (57 runs sampled)
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
      "moe": 0.0000016511369988654296,
      "rme": 1.396960671936093,
      "sem": 8.424168361558315e-7,
      "deviation": 0.000006470726498971291,
      "mean": 0.00011819495222990533,
      "sample": [
        0.00013864850652741515,
        0.00012424518306636156,
        0.00012479383981693363,
        0.00012459906636155607,
        0.00011811639019189765,
        0.00012275606666666667,
        0.00012408008108108108,
        0.0001238480882882883,
        0.00012250522882882884,
        0.00011861888648648648,
        0.00011865030990990992,
        0.00011476227927927926,
        0.00011808691531531532,
        0.00011862075135135135,
        0.00012804985945945945,
        0.00010909595675675676,
        0.00010504791171171171,
        0.00012000005061559508,
        0.00012116737756497947,
        0.00011151400273597811,
        0.00011742651299589603,
        0.00012470372229822163,
        0.00010938044459644322,
        0.00011873830916552668,
        0.00011006402325581395,
        0.00010926336388508892,
        0.00010906811491108073,
        0.0001096277975376197,
        0.0001210848440492476,
        0.00012293155129958962,
        0.00012451937619699043,
        0.00012162640218878249,
        0.00012351193023255814,
        0.00011975051846785227,
        0.00012100302735978113,
        0.00010490588235294117,
        0.00011754176196990424,
        0.00011673818194254446,
        0.00011765571819425446,
        0.00011262711354309165,
        0.00012155274692202463,
        0.00012606072366621066,
        0.00011879971135430916,
        0.00011225978248974009,
        0.00011739728864569085,
        0.00012143217236662107,
        0.00012298474965800275,
        0.00012087127222982217,
        0.00012274243502051984,
        0.00012056891244870042,
        0.00012066363474692202,
        0.0001237658385772914,
        0.00012057870314637482,
        0.00011269182079343365,
        0.00011583946922024624,
        0.00010661468262653899,
        0.00010835681395348837,
        0.00010977605335157319,
        0.00011117002188782491
      ],
      "variance": 4.187030142448926e-11
    },
    "times": {
      "cycle": 0.0864005100800608,
      "elapsed": 5.545,
      "period": 0.00011819495222990533,
      "timeStamp": 1680125186134
    },
    "running": false,
    "count": 731,
    "cycles": 5,
    "hz": 8460.59819927727
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
      "moe": 0.000001576716790787928,
      "rme": 1.7614841285133298,
      "sem": 8.044473422387389e-7,
      "deviation": 0.000006435578737909911,
      "mean": 0.00008951070096320748,
      "sample": [
        0.00009293533209647494,
        0.00009705515370370371,
        0.00009323258333333333,
        0.00009360517037037037,
        0.0000937980699815838,
        0.00008802210820244328,
        0.00008540687893864013,
        0.00008327161857379768,
        0.00008314513266998342,
        0.00008403408789386401,
        0.00009500312929623568,
        0.000092633031096563,
        0.00010050263666121113,
        0.00010043595908346973,
        0.00009224008346972177,
        0.00007851417847411445,
        0.00009623958207217695,
        0.00008958619790454016,
        0.00009903987194412107,
        0.00009419215483119907,
        0.00009058911059371363,
        0.00008231666821885914,
        0.00009330723515715948,
        0.00009243553201396974,
        0.0000929990628637951,
        0.00009352316065192085,
        0.00009529291618160651,
        0.00009255328870779977,
        0.00009274435972060535,
        0.00009342147613504075,
        0.00009284793713620489,
        0.0001046667648428405,
        0.00010170716414435389,
        0.00009764756926658905,
        0.00009217057508731083,
        0.00009228797438882422,
        0.00009648887427240979,
        0.00008484671245634458,
        0.00008398809196740396,
        0.00008333778928987194,
        0.00008254127008149011,
        0.00008323066589057043,
        0.00009314239115250291,
        0.00009498537601862631,
        0.00009805211641443539,
        0.00009760061117578579,
        0.00008706072642607684,
        0.00008296805238649592,
        0.00008237037252619326,
        0.00008341510244470314,
        0.00008208663096623981,
        0.00008362130966239813,
        0.00008387080093131549,
        0.00008244644353899884,
        0.00008338125611175785,
        0.00008229925611175787,
        0.00008310992200232828,
        0.00008292564726426078,
        0.00008389105355064028,
        0.00008249362398137369,
        0.00008314322817229336,
        0.00008279451920838183,
        0.00008298616298020954,
        0.00008220309895227008
      ],
      "variance": 4.1416673691838125e-11
    },
    "times": {
      "cycle": 0.07688969212739523,
      "elapsed": 5.498,
      "period": 0.00008951070096320748,
      "timeStamp": 1680125191680
    },
    "running": false,
    "count": 859,
    "cycles": 5,
    "hz": 11171.848608481352
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
      "moe": 0.000009230655359748206,
      "rme": 3.357004856802893,
      "sem": 0.00000470951804068786,
      "deviation": 0.00003555608147711404,
      "mean": 0.0002749669944933948,
      "sample": [
        0.00029944595555555554,
        0.0002947708944444445,
        0.0002950233277777778,
        0.00028709174444444446,
        0.0002900202833333333,
        0.00029519098888888893,
        0.0002875272611111111,
        0.0002842779402173913,
        0.00028559146739130434,
        0.00028518902717391306,
        0.0002350248909774436,
        0.00021042649248120303,
        0.00022874243984962408,
        0.00027479992660550456,
        0.0002729208470948012,
        0.00026986035779816514,
        0.00027290413455657495,
        0.00026987140978593276,
        0.00027214214373088685,
        0.00023943211314984708,
        0.0002440974097859327,
        0.00026978037003058105,
        0.0002709170275229358,
        0.00030822194189602446,
        0.00030100762996941897,
        0.0002811589388379205,
        0.0002837439357798165,
        0.0002939443944954128,
        0.00026833899388379207,
        0.00045954126605504583,
        0.0002692583149847095,
        0.0002121776024464832,
        0.00023765298165137616,
        0.0002250485902140673,
        0.00024203778593272172,
        0.00024149917737003058,
        0.0002779909602446483,
        0.00028198079816513764,
        0.00027567994801223244,
        0.0002743270917431193,
        0.00027638332110091745,
        0.0001749595749235474,
        0.0002759986360856269,
        0.0002846880856269113,
        0.00028299571559633026,
        0.00029317900917431194,
        0.0002887446483180428,
        0.0002808975382262997,
        0.0002810545168195718,
        0.0002780125626911315,
        0.00028703943119266057,
        0.0002826030856269113,
        0.00028226605504587154,
        0.00028215722324159026,
        0.0002774517155963303,
        0.0002909942660550459,
        0.00028503449541284403
      ],
      "variance": 1.2642349300071722e-9
    },
    "times": {
      "cycle": 0.0899142071993401,
      "elapsed": 5.415,
      "period": 0.0002749669944933948,
      "timeStamp": 1680125197179
    },
    "running": false,
    "count": 327,
    "cycles": 5,
    "hz": 3636.8001252020154
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
  
