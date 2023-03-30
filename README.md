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
- text-based search x 8,817 ops/sec ±2.15% (68 runs sampled)
- regex-based search x 11,201 ops/sec ±2.04% (62 runs sampled)
- cb-based search x 3,621 ops/sec ±4.19% (65 runs sampled)
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
      "moe": 0.00000244106107115688,
      "rme": 2.152356503618249,
      "sem": 0.0000012454393220188163,
      "deviation": 0.000010270155749962454,
      "mean": 0.00011341341766818368,
      "sample": [
        0.000146803728,
        0.00011572010606060607,
        0.00011885346808510638,
        0.00011830230673758866,
        0.00011897977482269505,
        0.00011784068262411348,
        0.00011091230673758866,
        0.00011458421099290781,
        0.00012297653191489362,
        0.00012383750177304964,
        0.00009523692021276597,
        0.00010188955673758866,
        0.00008869730673758865,
        0.00008125843981481482,
        0.00011275360802469137,
        0.00011499258950617285,
        0.00011582341975308642,
        0.00011910342901234568,
        0.00011789552932098766,
        0.00011935573148148148,
        0.00011643807716049383,
        0.00011778031635802468,
        0.00011268225462962963,
        0.00011816879629629629,
        0.00011752594907407407,
        0.00011881521604938272,
        0.00011783940277777779,
        0.00012157337808641975,
        0.00011906084259259258,
        0.00010911096759259259,
        0.00010891824074074075,
        0.00010719250462962964,
        0.00011182879320987654,
        0.00012052595061728396,
        0.00012101155709876545,
        0.00012251358179012344,
        0.00012315302314814814,
        0.00011561577777777778,
        0.00011721190895061729,
        0.00008452717746913581,
        0.00011348285185185184,
        0.00011867861419753087,
        0.00012089339197530863,
        0.0001201368225308642,
        0.00011788082716049383,
        0.00011924499228395062,
        0.00012038604012345679,
        0.00012245210648148148,
        0.00011754411265432098,
        0.00011424029166666667,
        0.00012130361419753088,
        0.0000923405262345679,
        0.00010927869753086421,
        0.00010884502932098765,
        0.0001094378364197531,
        0.00010971603240740741,
        0.00010909693055555554,
        0.00010877557407407407,
        0.00010895136419753088,
        0.00010877602006172839,
        0.00010883273919753087,
        0.00010900434413580247,
        0.00010883138117283951,
        0.00010934616820987655,
        0.00010982493981481482,
        0.0001090027962962963,
        0.0000851349737654321,
        0.00012336251851851853
      ],
      "variance": 1.0547609912848684e-10
    },
    "times": {
      "cycle": 0.07349189464898302,
      "elapsed": 5.73,
      "period": 0.00011341341766818368,
      "timeStamp": 1680125365607
    },
    "running": false,
    "count": 648,
    "cycles": 4,
    "hz": 8817.298874862618
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
      "moe": 0.0000018237630468553652,
      "rme": 2.042721765476309,
      "sem": 9.304913504364108e-7,
      "deviation": 0.000007326696220036183,
      "mean": 0.00008928103071492518,
      "sample": [
        0.00010688481656804733,
        0.00010174892307692307,
        0.00010219668364030337,
        0.00009354917876489707,
        0.00009346165113759479,
        0.00009200755471289274,
        0.00009858578764897074,
        0.00009119924377031419,
        0.00008316187648970747,
        0.00008352614409534128,
        0.00008275436294691224,
        0.00008452998374864571,
        0.00008534723293607801,
        0.00009527751245937161,
        0.00009301724268689058,
        0.0000990216738894908,
        0.00009707387540628385,
        0.0000958670054171181,
        0.00008628216143011918,
        0.0000836218255687974,
        0.00008291111375947996,
        0.00008224571830985915,
        0.00008674919393282773,
        0.0000934285698808234,
        0.00009914981906825569,
        0.00010451172481040087,
        0.00009149689274106176,
        0.00009555257963163597,
        0.00009262662730227519,
        0.00006575281798483207,
        0.00009970973131094258,
        0.00009413191115926327,
        0.00009616364247020584,
        0.00008442001408450703,
        0.00008231284832069339,
        0.00008209235644637053,
        0.00008727267388949079,
        0.00008222513759479956,
        0.00008289228927410618,
        0.00008270142578548213,
        0.00008345532827735645,
        0.00008770630444203684,
        0.00008959519609967496,
        0.00008974383531960996,
        0.00009025828710725895,
        0.0000880032502708559,
        0.00008558602925243772,
        0.00008313538894907909,
        0.00008188517659804984,
        0.00008838074756229686,
        0.00009403221343445286,
        0.00009832676814734561,
        0.00009536374539544962,
        0.00008869896533044421,
        0.00009251110184182016,
        0.000083015360780065,
        0.00008454997941495125,
        0.00008252108992416035,
        0.00008277315817984832,
        0.00008238436294691223,
        0.00008270254604550378,
        0.00008333324485373781
      ],
      "variance": 5.368047750069248e-11
    },
    "times": {
      "cycle": 0.08240639134987594,
      "elapsed": 5.57,
      "period": 0.00008928103071492518,
      "timeStamp": 1680125371338
    },
    "running": false,
    "count": 923,
    "cycles": 3,
    "hz": 11200.587537939671
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
      "moe": 0.000011564930117061431,
      "rme": 4.187226289344706,
      "sem": 0.000005900474549521138,
      "deviation": 0.00004757114665551519,
      "mean": 0.0002761954888010441,
      "sample": [
        0.0002797260611111111,
        0.00028398815,
        0.0002809398333333333,
        0.0002790591666666667,
        0.00028411287222222223,
        0.00028206295,
        0.000285308125,
        0.000269671525,
        0.000287101125,
        0.00029844556000000003,
        0.00028658758,
        0.0002899828066037736,
        0.0002868383537735849,
        0.00028940879716981134,
        0.0002967127169811321,
        0.00018237919855595668,
        0.0001877599891696751,
        0.00018923341516245487,
        0.000209228880866426,
        0.0002788044584837545,
        0.00027827379422382673,
        0.00027663329602888086,
        0.00027426568592057765,
        0.0002802523610108303,
        0.00027461550902527074,
        0.0002759419133574007,
        0.00027409050180505416,
        0.00028292609386281587,
        0.00019734872924187727,
        0.0002045947725631769,
        0.00020263719494584837,
        0.00021100980866425992,
        0.00028059675812274365,
        0.00027767110469314077,
        0.00027417941516245486,
        0.00027984070397111914,
        0.0002877069927797834,
        0.00028306761371841156,
        0.0002865445379061372,
        0.00028764361371841156,
        0.00031500585920577617,
        0.0003895472996389892,
        0.0003826898086642599,
        0.0002946485848375451,
        0.00043763334657039715,
        0.000234804321299639,
        0.00034170996389891695,
        0.0002760850324909747,
        0.00025532186281588447,
        0.00025329747653429606,
        0.00028817528519855596,
        0.000251139678700361,
        0.0002823591010830325,
        0.0002757479927797834,
        0.00028322767148014443,
        0.00029953190974729243,
        0.00028734698916967505,
        0.00040534606498194946,
        0.000182999880866426,
        0.0002478269198717949,
        0.00028990541025641025,
        0.00028514647756410253,
        0.00028308919551282055,
        0.0002902054262820513,
        0.00020272324679487181
      ],
      "variance": 2.263013994120534e-9
    },
    "times": {
      "cycle": 0.08617299250592576,
      "elapsed": 5.44,
      "period": 0.0002761954888010441,
      "timeStamp": 1680125376908
    },
    "running": false,
    "count": 312,
    "cycles": 5,
    "hz": 3620.6239440802183
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
  
