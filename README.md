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
- text-based search x 8,828 ops/sec ±2.62% (67 runs sampled)
- regex-based search x 11,417 ops/sec ±2.93% (61 runs sampled)
- cb-based search x 3,664 ops/sec ±3.13% (61 runs sampled)
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
      "moe": 0.0000029631674113084398,
      "rme": 2.615879393075262,
      "sem": 0.0000015118201078104285,
      "deviation": 0.000012374780910038598,
      "mean": 0.00011327614794292566,
      "sample": [
        0.00014442470951156813,
        0.00009280873224043716,
        0.00012085446265938069,
        0.00011770899089253188,
        0.00012117118579234972,
        0.00010818586520947177,
        0.00011731726262626262,
        0.00011614454377104377,
        0.00011663298653198653,
        0.00011742736531986533,
        0.00011172174410774411,
        0.00010965880134680133,
        0.00010947561447811447,
        0.00010901500168350168,
        0.00010916496632996634,
        0.0001132449696969697,
        0.00012812539225589225,
        0.00008862116666666666,
        0.00008821000841750841,
        0.0001227412255892256,
        0.00011980829966329966,
        0.00011278579629629629,
        0.00010843704208754209,
        0.00011255890235690235,
        0.00011087424579124578,
        0.0000988983731092437,
        0.00011948437478991595,
        0.00011965761176470588,
        0.00012029214957983194,
        0.00011347890084033612,
        0.00011618069075630253,
        0.00010161109915966386,
        0.00011370473949579833,
        0.00012013974117647059,
        0.0001222145462184874,
        0.00012401737142857141,
        0.00012246951596638656,
        0.00012372284369747898,
        0.0001236974638655462,
        0.00012165642016806722,
        0.00012136105882352941,
        0.00011702417478991598,
        0.00011899666218487395,
        0.00012382837142857142,
        0.00012220898319327731,
        0.0001210946487394958,
        0.00012402353109243697,
        0.00008946920000000001,
        0.0001220122005242464,
        0.00006940385190039318,
        0.00012227481127129752,
        0.00012253705373525557,
        0.00013670472608125819,
        0.00011606706946264745,
        0.00011317519134993447,
        0.00011441756225425951,
        0.00010756249672346004,
        0.00010587086500655308,
        0.00011377541939711665,
        0.00010722974049803408,
        0.0001115855491480996,
        0.00011304152555701179,
        0.000092489749672346,
        0.00008462583486238532,
        0.00010131653866317169,
        0.00009286736173001311,
        0.00011619261074705112
      ],
      "variance": 1.531352025714557e-10
    },
    "times": {
      "cycle": 0.08642970088045228,
      "elapsed": 5.616,
      "period": 0.00011327614794292566,
      "timeStamp": 1680111693564
    },
    "running": false,
    "count": 763,
    "cycles": 4,
    "hz": 8827.98380912327
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
      "moe": 0.0000025653154972057647,
      "rme": 2.928880944138732,
      "sem": 0.00000130883443734988,
      "deviation": 0.000010222323740127369,
      "mean": 0.00008758688202535056,
      "sample": [
        0.00008272154049586777,
        0.00008245454507042253,
        0.00009583208309859154,
        0.00010019424225352113,
        0.00010062520704225353,
        0.0000992152323943662,
        0.00008529092816901409,
        0.00008361008450704225,
        0.00009069787042253521,
        0.00009732004929577465,
        0.00009610649295774649,
        0.00007386202816901408,
        0.0000852504028169014,
        0.00009628769859154931,
        0.00009769714929577465,
        0.00009062071408450704,
        0.00009701287183098593,
        0.00010065462535211268,
        0.00009661861267605635,
        0.00008448918873239437,
        0.0000820780690140845,
        0.00008335462676056339,
        0.00008239966056338029,
        0.00010548087464788732,
        0.00009390409718309859,
        0.00008441370563380282,
        0.00005850573522727272,
        0.00007091317386363637,
        0.00006264366981132075,
        0.000053021942452830186,
        0.0000994367245283019,
        0.0000914847679245283,
        0.00009256085566037736,
        0.00010130511981132076,
        0.00009614909150943396,
        0.0000946147716981132,
        0.00008306318679245283,
        0.00008279876603773584,
        0.00008249234056603774,
        0.00008217050660377359,
        0.00008211958867924529,
        0.00008775770188679245,
        0.00008207120849056603,
        0.00008667221132075472,
        0.00010031202641509434,
        0.00010232575094339623,
        0.0000856171933962264,
        0.00008337461509433963,
        0.00008343390188679245,
        0.00009360166132075472,
        0.00009275317924528302,
        0.00009153530188679246,
        0.0000912560358490566,
        0.00008549016320754716,
        0.0000823461962264151,
        0.00008239189056603773,
        0.00008214703962264151,
        0.00008232937452830189,
        0.00008182149716981133,
        0.0000819998141509434,
        0.00008209019811320754
      ],
      "variance": 1.0449590264797161e-10
    },
    "times": {
      "cycle": 0.0928420949468716,
      "elapsed": 5.543,
      "period": 0.00008758688202535056,
      "timeStamp": 1680111699181
    },
    "running": false,
    "count": 1060,
    "cycles": 5,
    "hz": 11417.234828733448
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
      "moe": 0.000008542946618328514,
      "rme": 3.130432706897486,
      "sem": 0.000004358646233841079,
      "deviation": 0.000034042115335249045,
      "mean": 0.0002728998645939676,
      "sample": [
        0.00030357987283236997,
        0.0002902185428571429,
        0.0002931253258426966,
        0.00029399405617977525,
        0.00029084521787709497,
        0.00029677822346368715,
        0.0002909035754189944,
        0.0002928536424581006,
        0.00029437314525139664,
        0.0002939745027932961,
        0.0002922214581005587,
        0.0002910121284916201,
        0.0002939839832402235,
        0.00023987392093023256,
        0.00028394178571428575,
        0.0002905105306122449,
        0.0002867732210884354,
        0.00029238955102040817,
        0.0002934259693877551,
        0.0002882578163265306,
        0.0002815662244897959,
        0.00028231309523809526,
        0.00027939089455782313,
        0.0002892515782312925,
        0.00028692351020408164,
        0.00028180238095238097,
        0.0002852809217687075,
        0.000290200574829932,
        0.00028637758163265305,
        0.000286412462585034,
        0.00028133062925170065,
        0.000288964037414966,
        0.00027997851020408163,
        0.00028933561564625847,
        0.00028706254761904764,
        0.00024393108843537414,
        0.0002587118641975309,
        0.0002938947407407407,
        0.00028767697839506175,
        0.00029214043827160497,
        0.00026689285802469136,
        0.00019746714814814815,
        0.00028360285493827164,
        0.000286949450617284,
        0.00028077061419753084,
        0.00027526443209876546,
        0.0001670923302469136,
        0.00015736707407407408,
        0.00019948128086419754,
        0.00023851636419753083,
        0.0002783311851851852,
        0.00022567654012345677,
        0.0001630860061728395,
        0.0002628453302469136,
        0.00021067695061728397,
        0.0002781327716049383,
        0.0002820703611111111,
        0.000282437262345679,
        0.0002934150987654321,
        0.0002916820987654321,
        0.00027955158333333336
      ],
      "variance": 1.1588656164983983e-9
    },
    "times": {
      "cycle": 0.0884195561284455,
      "elapsed": 5.542,
      "period": 0.0002728998645939676,
      "timeStamp": 1680111704725
    },
    "running": false,
    "count": 324,
    "cycles": 5,
    "hz": 3664.347732410362
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
  
