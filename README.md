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
- text-based search x 8,749 ops/sec ±2.60% (57 runs sampled)
- regex-based search x 11,300 ops/sec ±2.22% (67 runs sampled)
- cb-based search x 3,604 ops/sec ±0.97% (70 runs sampled)
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
      "moe": 0.0000029756359427147223,
      "rme": 2.6033533473065353,
      "sem": 0.0000015181816034258786,
      "deviation": 0.00001146201974853926,
      "mean": 0.0001143001177997353,
      "sample": [
        0.00011612519025522041,
        0.0001202054646924829,
        0.00011052974782608696,
        0.00011064520000000001,
        0.00011029276086956522,
        0.00011836169913419914,
        0.00012234742857142856,
        0.0001231119567099567,
        0.00011754718831168831,
        0.00011418058431372549,
        0.00008062360708534622,
        0.00011156522866344607,
        0.00010957241223832528,
        0.00010943700644122383,
        0.00010925299194847021,
        0.00010826536231884059,
        0.00012407065861513687,
        0.00012464587439613527,
        0.00011878396457326892,
        0.00011810224315619967,
        0.00011823124315619968,
        0.00009066528180737217,
        0.00012017097384066587,
        0.00011703899286563616,
        0.00011809538287752675,
        0.00011759322592152199,
        0.00012319011771700356,
        0.0001227540511296076,
        0.00012272042687277052,
        0.00011534380023781213,
        0.00007788029964328182,
        0.00011991237098692033,
        0.00011859368370986919,
        0.00012136480975029726,
        0.00012425584185493462,
        0.0001237272009512485,
        0.000126458790725327,
        0.00012373918311533888,
        0.00012206166230677764,
        0.0000702940083234245,
        0.00011346000118906064,
        0.00010935267063020213,
        0.0001081880760998811,
        0.00010844791914387634,
        0.00010816828894173604,
        0.00010864637217598097,
        0.00010999364922711059,
        0.00010806252318668252,
        0.00011650383947681332,
        0.00012319711414982164,
        0.00012035983115338882,
        0.0000990900202140309,
        0.0001168631807372176,
        0.00012291981450653983,
        0.00012204930915576694,
        0.00012495565160523187,
        0.00012309053507728894
      ],
      "variance": 1.31377896715904e-10
    },
    "times": {
      "cycle": 0.09612639906957739,
      "elapsed": 5.965,
      "period": 0.0001143001177997353,
      "timeStamp": 1680115230184
    },
    "running": false,
    "count": 841,
    "cycles": 8,
    "hz": 8748.89736992306
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
      "moe": 0.000001963320930770954,
      "rme": 2.2185811096508865,
      "sem": 0.0000010016943524341602,
      "deviation": 0.000008199221644265933,
      "mean": 0.00008849444008291858,
      "sample": [
        0.00008971117522123894,
        0.00009222357699115044,
        0.0000975310017699115,
        0.0000832119290429043,
        0.00008251994224422442,
        0.0000826980907590759,
        0.00008281636633663366,
        0.0000879461504178273,
        0.00009317107520891365,
        0.00009287757242339833,
        0.00009218382729805014,
        0.00009408241086350974,
        0.00009144373259052924,
        0.00007801657660167131,
        0.00008330585933147631,
        0.00008606867409470752,
        0.00008203431894150417,
        0.00008592240947075209,
        0.00008761418662952645,
        0.00009403540250696378,
        0.00009361525348189416,
        0.00008351960306406685,
        0.00009319763788300836,
        0.00009252086072423398,
        0.00009508861420612815,
        0.00008454210306406686,
        0.0000936201504178273,
        0.00009223710445682452,
        0.00009193635097493035,
        0.00008359887301587302,
        0.00006939342735042735,
        0.00006347894877764844,
        0.00007512962863795111,
        0.00009424367986030267,
        0.00008952045052386496,
        0.00009528467520372527,
        0.00009219350873108264,
        0.00009681197788125728,
        0.00009480049941792782,
        0.00008560993131548312,
        0.00008237556461001164,
        0.00008311558440046566,
        0.00008263980791618161,
        0.00008295984051222352,
        0.000082272358556461,
        0.00008281067054714785,
        0.00008214139813736903,
        0.00008248158672875437,
        0.00008237964610011642,
        0.00008340977764842841,
        0.00008255800465657742,
        0.00008317571594877766,
        0.00009080651222351572,
        0.00006118788707799767,
        0.00009288857275902212,
        0.00009313619324796274,
        0.00009938774155995343,
        0.0000927029417927823,
        0.00009341619674039581,
        0.00009761518393480792,
        0.00010041528870779977,
        0.00010086524912689174,
        0.00010030709429569267,
        0.00009823536786961583,
        0.0000988716891734575,
        0.00009698540395809081,
        0.00010022864959254947
      ],
      "variance": 6.722723557179895e-11
    },
    "times": {
      "cycle": 0.07601672403122706,
      "elapsed": 5.557,
      "period": 0.00008849444008291858,
      "timeStamp": 1680115236150
    },
    "running": false,
    "count": 859,
    "cycles": 5,
    "hz": 11300.14494767138
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
      "moe": 0.000002697721201580545,
      "rme": 0.9722738359407617,
      "sem": 0.0000013763883681533394,
      "deviation": 0.00001151569128620366,
      "mean": 0.0002774651648391072,
      "sample": [
        0.0002895206264367816,
        0.00028308224858757065,
        0.00028791719209039546,
        0.0002845608033707865,
        0.00028714798876404494,
        0.00028160612359550563,
        0.0002961745168539326,
        0.00025150391739130434,
        0.000272815352173913,
        0.0002743825913043478,
        0.0002898303086956522,
        0.0002928844782608696,
        0.00027993994347826084,
        0.0002757265652173913,
        0.00027666093043478263,
        0.00027920438260869567,
        0.00027665167391304347,
        0.0002801457260869565,
        0.00027537604347826084,
        0.00027562715217391303,
        0.00028357173043478263,
        0.0002757706391304348,
        0.0002334676652173913,
        0.00027696925217391306,
        0.0002731205434782609,
        0.0002767098956521739,
        0.0002874256391304348,
        0.00028508834782608696,
        0.0002709180086956522,
        0.00028104725652173916,
        0.00028552478695652176,
        0.00028126137391304353,
        0.00028440936086956525,
        0.00027387785217391304,
        0.00023392369130434784,
        0.00028370662608695653,
        0.00028236186956521743,
        0.0002803258739130435,
        0.0002836768565217391,
        0.0002721833565217391,
        0.0002811416739130435,
        0.00027820208260869567,
        0.00029240746086956523,
        0.00029407216521739135,
        0.00028196509565217386,
        0.0002811483173913043,
        0.00027790655652173914,
        0.00028867215217391303,
        0.0002664133565217391,
        0.00026046464782608696,
        0.0002714308826086956,
        0.00026193555652173915,
        0.00028538215217391305,
        0.00028058524782608693,
        0.00024177983913043478,
        0.0002786685869565218,
        0.0002775525739130435,
        0.00028050875217391306,
        0.00027176732930513596,
        0.0002841767280966767,
        0.0002827984622356495,
        0.0002758618821752266,
        0.00027738879456193355,
        0.00027720473716012084,
        0.0002753823172205438,
        0.00027743580060422964,
        0.0002746345921450151,
        0.00027765016314199395,
        0.00027485476132930515,
        0.00027706967975830814
      ],
      "variance": 1.326111457991469e-10
    },
    "times": {
      "cycle": 0.09184096956174449,
      "elapsed": 5.594,
      "period": 0.0002774651648391072,
      "timeStamp": 1680115241708
    },
    "running": false,
    "count": 331,
    "cycles": 5,
    "hz": 3604.0560283661794
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
  
