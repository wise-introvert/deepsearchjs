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
- text-based search x 8,920 ops/sec ±2.32% (75 runs sampled)
- regex-based search x 11,059 ops/sec ±2.10% (68 runs sampled)
- cb-based search x 3,661 ops/sec ±1.59% (66 runs sampled)
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
      "moe": 0.0000025968214728352412,
      "rme": 2.3163034889948744,
      "sem": 0.0000013249089147118579,
      "deviation": 0.000011474047778409391,
      "mean": 0.0001121105884946922,
      "sample": [
        0.00015477554794520547,
        0.00011943921689497718,
        0.00010901187526881721,
        0.00010889969247311828,
        0.000109183311827957,
        0.00010910401720430107,
        0.0001078028559139785,
        0.0001164815247311828,
        0.00011850657634408602,
        0.0001180595247311828,
        0.00011747642795698925,
        0.00011449216989247312,
        0.00012002456774193548,
        0.00012214694193548388,
        0.0001221458365591398,
        0.00011931387526881721,
        0.00011612892903225806,
        0.00010982958279569893,
        0.00011536311397849462,
        0.00011676110967741934,
        0.00012626472258064515,
        0.00010948787339055795,
        0.00010940624034334763,
        0.00012101844635193133,
        0.00012099973175965665,
        0.00011011756652360516,
        0.0001143758669527897,
        0.00011658592918454935,
        0.00011723571030042919,
        0.00012089778111587983,
        0.0001113003669527897,
        0.00011402112875536481,
        0.00011957985407725322,
        0.00012009647854077253,
        0.00012431463948497855,
        0.00012026998927038627,
        0.00012001007725321889,
        0.00011763531759656653,
        0.00011802252145922747,
        0.00011642166094420601,
        0.00011449005579399141,
        0.0001259361137339056,
        0.00012459348927038627,
        0.00010575329196050776,
        0.00011142662341325811,
        0.00009383175317348378,
        0.00011697969957686883,
        0.00012012059943582511,
        0.00011622388293370946,
        0.00010931480677009873,
        0.00008970637658674189,
        0.00010127684203102962,
        0.0001177538885754584,
        0.00011790339351198871,
        0.000107231389280677,
        0.00010794317207334274,
        0.00010879090126939351,
        0.0001062165712270804,
        0.00010791441748942173,
        0.00010780140197461212,
        0.0001079081466854725,
        0.00011290562482369535,
        0.00010528753878702397,
        0.00010807078279266572,
        0.00010777245133991538,
        0.00010801145980253878,
        0.00010861713681241184,
        0.00010770492383638928,
        0.00009418102256699577,
        0.00007489736389280677,
        0.00007258649083215797,
        0.00011007965444287729,
        0.00009550937376586743,
        0.00008095687165021157,
        0.000109588023977433
      ],
      "variance": 1.316537724212215e-10
    },
    "times": {
      "cycle": 0.07948640724273677,
      "elapsed": 5.886,
      "period": 0.0001121105884946922,
      "timeStamp": 1680125020140
    },
    "running": false,
    "count": 709,
    "cycles": 6,
    "hz": 8919.764077835916
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
      "moe": 0.0000018949284117344736,
      "rme": 2.095589000200616,
      "sem": 9.66800210068609e-7,
      "deviation": 0.000007972438769964436,
      "mean": 0.0000904246210279338,
      "sample": [
        0.00006877683668341708,
        0.00008516786055276382,
        0.00008205310301507537,
        0.0000826684283919598,
        0.00008259500879396986,
        0.00008185826005025126,
        0.00008259981407035176,
        0.0000816874484924623,
        0.0000824962675879397,
        0.00008209995979899498,
        0.00008197557663316583,
        0.00008273002638190954,
        0.00008257943592964825,
        0.00008292473743718594,
        0.00009277308542713569,
        0.00009507507412060301,
        0.00009028654271356783,
        0.00008954663693467337,
        0.00007702215703517587,
        0.00009511671984924623,
        0.00009590709547738693,
        0.00009881182663316583,
        0.00009804961557788944,
        0.0000986758932160804,
        0.00009383283417085428,
        0.00009847970603015076,
        0.00010045368592964824,
        0.00010237703643216081,
        0.00009873741708542715,
        0.00009786625251256282,
        0.00009849574623115578,
        0.00009882899623115577,
        0.00009638670100502513,
        0.00010095964824120603,
        0.00009854409547738694,
        0.00010027818844221105,
        0.00010229096105527637,
        0.00009849482035175878,
        0.00009813394597989949,
        0.00010048480150753769,
        0.00010131236306532663,
        0.0000988177123115578,
        0.00009682819723618091,
        0.0000823505012562814,
        0.00008108352386934673,
        0.0000819572675879397,
        0.00008105930025125628,
        0.00009021019974874371,
        0.0000944244623115578,
        0.00010080013190954774,
        0.00008733768341708542,
        0.00008105204773869347,
        0.00008119040452261307,
        0.00008177360175879396,
        0.0000808776771356784,
        0.00008629101633165829,
        0.00008686496356783921,
        0.00009274327512562815,
        0.00009116170979899497,
        0.00009036084422110552,
        0.00009319307788944723,
        0.00009828669849246232,
        0.00009278288693467336,
        0.00009194032663316583,
        0.00009172662688442211,
        0.00009006929648241205,
        0.00008215162185929649,
        0.00008210456407035176
      ],
      "variance": 6.355977994083206e-11
    },
    "times": {
      "cycle": 0.0719779983382353,
      "elapsed": 5.422,
      "period": 0.0000904246210279338,
      "timeStamp": 1680125026027
    },
    "running": false,
    "count": 796,
    "cycles": 4,
    "hz": 11058.934929802823
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
      "moe": 0.000004334393621280143,
      "rme": 1.5870149741942046,
      "sem": 0.000002211425316979665,
      "deviation": 0.00001796570420412705,
      "mean": 0.00027311611369520316,
      "sample": [
        0.0002890174171428571,
        0.00029492556,
        0.00028965928,
        0.00028761989142857145,
        0.00028731049714285714,
        0.0002923278514285714,
        0.0002842447808988764,
        0.00028695586516853933,
        0.00027120475773195876,
        0.0002435588823529412,
        0.0002806465294117647,
        0.00027934556985294116,
        0.00028850135661764707,
        0.0002791336617647059,
        0.0002744858088235294,
        0.0002639627279411765,
        0.00027288817279411766,
        0.0002634104080882353,
        0.0002741317463235294,
        0.0002719922352941176,
        0.00027460936397058825,
        0.00027090960294117643,
        0.0002743366617647059,
        0.00027114725,
        0.00027127170588235296,
        0.0002703114227941176,
        0.00027190057720588237,
        0.0002735412132352941,
        0.0002714047647058824,
        0.00027339393014705885,
        0.00027153502205882357,
        0.00027567351102941175,
        0.0002711191507352941,
        0.0002745258455882353,
        0.00027193307720588234,
        0.00027530177573529413,
        0.00027098340073529415,
        0.0002739789154411765,
        0.0002710418051470588,
        0.0002737245588235294,
        0.0002707522242647059,
        0.0002830943345588235,
        0.00027767146691176474,
        0.00029212811029411765,
        0.00028871450735294115,
        0.0002790223492647059,
        0.00028239088970588236,
        0.0002789924632352941,
        0.00027766147426470586,
        0.00027085035294117644,
        0.00027454947426470587,
        0.00027136567647058823,
        0.00027517670588235297,
        0.0002730515625,
        0.00027262651838235293,
        0.00028428372794117644,
        0.0002811993125,
        0.00027706708823529416,
        0.0002807971544117647,
        0.00021895720955882354,
        0.0002790660367647059,
        0.00019942274632352941,
        0.00018483520220588236,
        0.00027583565441176473,
        0.00027575944852941173,
        0.0002724252573529412
      ],
      "variance": 3.2276652755018836e-10
    },
    "times": {
      "cycle": 0.07428758292509526,
      "elapsed": 5.366,
      "period": 0.00027311611369520316,
      "timeStamp": 1680125031449
    },
    "running": false,
    "count": 272,
    "cycles": 4,
    "hz": 3661.4463587307678
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
  
