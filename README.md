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
- text-based search x 9,014 ops/sec ±2.29% (67 runs sampled)
- regex-based search x 11,331 ops/sec ±2.03% (78 runs sampled)
- cb-based search x 3,416 ops/sec ±4.15% (72 runs sampled)
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
      "moe": 0.0000025406539630196965,
      "rme": 2.2901363668647328,
      "sem": 0.0000012962520219488248,
      "deviation": 0.000010610280080904082,
      "mean": 0.00011093898161610046,
      "sample": [
        0.00011838417675159235,
        0.0001203398296178344,
        0.00011583976273885351,
        0.00011568979617834395,
        0.00011507654140127389,
        0.00011448224840764331,
        0.00011800552707006368,
        0.00011746083757961785,
        0.0001143965286624204,
        0.00010957021019108281,
        0.00010864341082802549,
        0.00011760722611464967,
        0.0001220634347133758,
        0.00011843909730538923,
        0.00011847544461077843,
        0.0001174417769461078,
        0.00012193782934131736,
        0.00011693002395209581,
        0.00012020312125748504,
        0.00011670955389221556,
        0.00012554632934131735,
        0.00011083480538922156,
        0.00010841428892215569,
        0.00011250341467065868,
        0.00010832115868263474,
        0.00010886951946107785,
        0.00010826792215568863,
        0.0001082779505988024,
        0.0001081614131736527,
        0.00010919806586826347,
        0.00010803266766467066,
        0.00010837643862275448,
        0.00010871717065868263,
        0.00012690059281437126,
        0.00011829808083832335,
        0.00011646889670658683,
        0.00011474395209580838,
        0.00011437788173652694,
        0.00010127067964071857,
        0.00011711128892215567,
        0.00011503652844311379,
        0.00008094494760479041,
        0.00011286679191616765,
        0.00014964649700598804,
        0.00011135813473053891,
        0.0001240604371257485,
        0.00009090482035928144,
        0.00008787075598802396,
        0.00009494004191616768,
        0.00008512858982035928,
        0.00009041788173652694,
        0.00009997636976047904,
        0.00011671683083832335,
        0.00011180215419161678,
        0.00010829066916167664,
        0.00010802697305389221,
        0.00010803825149700599,
        0.00010789365269461078,
        0.00009735728143712576,
        0.00008975102694610778,
        0.00010813725299401197,
        0.00010793612125748504,
        0.00010859069311377246,
        0.00010981128143712574,
        0.00010883165568862276,
        0.00010913899401197604,
        0.0001090482380239521
      ],
      "variance": 1.1257804339522994e-10
    },
    "times": {
      "cycle": 0.0741072397195551,
      "elapsed": 5.542,
      "period": 0.00011093898161610046,
      "timeStamp": 1680122123535
    },
    "running": false,
    "count": 668,
    "cycles": 4,
    "hz": 9013.964121831013
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
      "moe": 0.0000017876960361266213,
      "rme": 2.0256169008536795,
      "sem": 9.120898143503171e-7,
      "deviation": 0.000008055359128955362,
      "mean": 0.0000882543997027874,
      "sample": [
        0.0001001148404074703,
        0.00009435232088285229,
        0.00009352022920203734,
        0.0000968655636672326,
        0.00009990855857385398,
        0.00010246650084889643,
        0.00009275736760124611,
        0.00009221180996884735,
        0.00009501332242990654,
        0.00009391404361370716,
        0.00008914111526479751,
        0.00008839977725856698,
        0.0000927698769470405,
        0.00009530952492211838,
        0.0000825521261682243,
        0.00008207116043613707,
        0.00008200882710280373,
        0.00008214409968847352,
        0.00008283406386292835,
        0.000085429746105919,
        0.00008205891277258567,
        0.00008208445015576323,
        0.00008687642523364486,
        0.00008189688785046729,
        0.00008192136137071652,
        0.00009059684112149533,
        0.00009263752180685359,
        0.00009420769937694704,
        0.00009235203426791277,
        0.00008968579283489097,
        0.00008219909968847353,
        0.00008197983489096572,
        0.00008206671183800622,
        0.0000819018738317757,
        0.00008257879906542057,
        0.00008156781308411215,
        0.00008190120872274143,
        0.00008556726479750779,
        0.0000832781261682243,
        0.00008194589096573209,
        0.0000817228691588785,
        0.00008367578971962617,
        0.00008152639096573208,
        0.000083180753894081,
        0.00008182910124610592,
        0.00009015856074766355,
        0.00009281366978193148,
        0.00009282593769470405,
        0.00009424033644859813,
        0.00009324191588785046,
        0.00009230517445482865,
        0.00009796676947040499,
        0.00009953703115264797,
        0.00008562512738853503,
        0.00009515807898089172,
        0.00007729981910828025,
        0.00010031513757961784,
        0.00008542793503184714,
        0.00009319819363057326,
        0.00009708856305732485,
        0.00009760926751592358,
        0.00009564977961783439,
        0.00009221533248407644,
        0.00009397206369426753,
        0.0000974182356687898,
        0.00009166828152866242,
        0.00010091406496815286,
        0.00009680236050955413,
        0.00007217830955414013,
        0.00006621258089171974,
        0.00006610480509554141,
        0.00007027376942675158,
        0.00009163531082802547,
        0.00009297247006369426,
        0.0000722515974522293,
        0.00007943103949044586,
        0.00009116419811320754,
        0.00009314312971698113
      ],
      "variance": 6.488881069644449e-11
    },
    "times": {
      "cycle": 0.07483973094796371,
      "elapsed": 5.425,
      "period": 0.0000882543997027874,
      "timeStamp": 1680122129078
    },
    "running": false,
    "count": 848,
    "cycles": 3,
    "hz": 11330.879858315056
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
      "moe": 0.00001213950525624945,
      "rme": 4.146725406291387,
      "sem": 0.0000061936251307395154,
      "deviation": 0.000052554651960879935,
      "mean": 0.00029274919525251096,
      "sample": [
        0.0002862136971428571,
        0.00029233116,
        0.0002883757428571429,
        0.00029335572571428573,
        0.00029462081714285717,
        0.00028674019999999997,
        0.00028810565714285715,
        0.0002899420857142857,
        0.00028767473142857143,
        0.0002916775786516854,
        0.00027040695789473684,
        0.0005290857842105263,
        0.000496400252631579,
        0.0003112225894736842,
        0.0002854134502617801,
        0.00028574629842931937,
        0.000278598612565445,
        0.0002817095183246073,
        0.0002844797434554974,
        0.00027348483769633504,
        0.0002753351465968586,
        0.000493811670157068,
        0.0002862059057591623,
        0.000487486612565445,
        0.0002800361727748691,
        0.0002733232670157068,
        0.0002742631989528796,
        0.00027936438743455497,
        0.00027424905235602095,
        0.00027385185340314137,
        0.00028078746596858637,
        0.0002725833926701571,
        0.00027361819371727746,
        0.0002848376492146597,
        0.0002822527172774869,
        0.0002762714554973822,
        0.0002797256020942408,
        0.00028390930890052354,
        0.00028213509947643976,
        0.00029235694764397904,
        0.0002865665654450262,
        0.00028089429319371725,
        0.0002870914240837696,
        0.0002805109947643979,
        0.00028093519895287957,
        0.0002865417905759162,
        0.0002454563878326996,
        0.00027379764258555133,
        0.00027755922433460073,
        0.00027393340304182514,
        0.0002762610836501901,
        0.0002732862623574144,
        0.0002764682699619772,
        0.00029269774904942965,
        0.00029311863498098856,
        0.0002831709353612167,
        0.0002820990152091255,
        0.00028635664638783267,
        0.00027985362357414446,
        0.0002853783536121673,
        0.00027876811406844104,
        0.0002848143155893536,
        0.0002811072395437262,
        0.0002834521292775665,
        0.0002883880836501901,
        0.00020777899239543725,
        0.0002746222737642585,
        0.0002735530380228137,
        0.00027717893155893535,
        0.00027355006463878327,
        0.0002764277300380228,
        0.0002743331064638783
      ],
      "variance": 2.761991442729221e-9
    },
    "times": {
      "cycle": 0.07699303835141039,
      "elapsed": 5.417,
      "period": 0.00029274919525251096,
      "timeStamp": 1680122134504
    },
    "running": false,
    "count": 263,
    "cycles": 5,
    "hz": 3415.8932499795583
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
  
