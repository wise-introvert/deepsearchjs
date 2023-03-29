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
- text-based search x 9,065 ops/sec ±1.73% (74 runs sampled)
- regex-based search x 11,541 ops/sec ±1.74% (71 runs sampled)
- cb-based search x 3,779 ops/sec ±1.73% (71 runs sampled)
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
      "moe": 0.00000191330614345026,
      "rme": 1.734415877880676,
      "sem": 9.761766038011532e-7,
      "deviation": 0.00000839738866397452,
      "mean": 0.00011031415059392642,
      "sample": [
        0.00011865841,
        0.000119194946,
        0.000123589254,
        0.000126700766,
        0.0001070594109589041,
        0.00010317457534246575,
        0.0001155635733855186,
        0.00011377775733855185,
        0.00011523434050880627,
        0.00010320186888454011,
        0.00011581017416829746,
        0.00009998896477495107,
        0.00011370517612524462,
        0.0001168632759295499,
        0.00011889668297455969,
        0.00011004034833659492,
        0.00011768008534322821,
        0.00011070414100185528,
        0.00010328717254174397,
        0.00010797679035250463,
        0.00011409559925788497,
        0.00011568601484230056,
        0.00010750062523191095,
        0.00010781454730983303,
        0.00011277551391465676,
        0.00011517503339517625,
        0.00011509131168831169,
        0.00011774343784786643,
        0.00011330533951762524,
        0.00011603534508348794,
        0.00011985643228200372,
        0.0001125028348794063,
        0.00011476702226345084,
        0.00011286316512059369,
        0.00009880201298701299,
        0.00011152642300556585,
        0.00011617316141001854,
        0.00011678071428571429,
        0.00010426562894248608,
        0.00010497530612244897,
        0.00011598600185528757,
        0.00011756682560296846,
        0.00010844230612244898,
        0.00009985327087198516,
        0.00011895919851576995,
        0.00010823466666666666,
        0.0001188356862745098,
        0.00012456911229946524,
        0.00011532727985739751,
        0.0001254667147950089,
        0.00010828101069518717,
        0.00009566649554367202,
        0.00010302173440285205,
        0.00010990876559865091,
        0.00011318531028667791,
        0.00010462938279932547,
        0.00008744430860033726,
        0.00009447892580101181,
        0.00010060688575899845,
        0.00008710850391236307,
        0.00011608749295774648,
        0.0000991991690140845,
        0.00009596346478873239,
        0.00010786955555555555,
        0.000103089034428795,
        0.00010626607355242565,
        0.00011329123474178405,
        0.00010211546791862284,
        0.00011538295931142411,
        0.0001115779718309859,
        0.00009953947574334898,
        0.00011499961189358372,
        0.00009698208450704225,
        0.00011446797809076681
      ],
      "variance": 7.051613637384778e-11
    },
    "times": {
      "cycle": 0.07049074222951898,
      "elapsed": 5.544,
      "period": 0.00011031415059392642,
      "timeStamp": 1680079122321
    },
    "running": false,
    "count": 639,
    "cycles": 6,
    "hz": 9065.020168455678
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
      "moe": 0.000001508681497806297,
      "rme": 1.7412308286088127,
      "sem": 7.697354580644373e-7,
      "deviation": 0.000006485906255375459,
      "mean": 0.00008664454321726459,
      "sample": [
        0.00009581506272401433,
        0.00009097644802867384,
        0.00009176405913978495,
        0.00008963821126760563,
        0.00008902491901408451,
        0.00008898459154929577,
        0.00008863612147887324,
        0.00009089568421052632,
        0.00008843832280701755,
        0.00008683577683134582,
        0.00009303643270868824,
        0.0000913759932885906,
        0.00009316519630872483,
        0.00008929735570469798,
        0.00008991554697986577,
        0.00009160646082949309,
        0.00009071136251920123,
        0.00009133026728110599,
        0.0000920440752688172,
        0.00008556645622119816,
        0.00009116963748079877,
        0.0000887116866359447,
        0.0000885597173579109,
        0.00009106915668202765,
        0.00008454440920398009,
        0.00009263812313432837,
        0.00008545273631840796,
        0.00008473177985074626,
        0.00008618338059701492,
        0.00008544875124378109,
        0.00006221131343283582,
        0.000086071815920398,
        0.00007570032213930348,
        0.000093755907960199,
        0.00008824623631840795,
        0.0000896324763681592,
        0.00008997849253731344,
        0.0000916423146766169,
        0.00008391881094527363,
        0.00007911600870646765,
        0.00008824356467661692,
        0.00008572146766169155,
        0.0000886287276119403,
        0.00009054188930348259,
        0.00008852933208955225,
        0.00008784380845771144,
        0.00007805090049751244,
        0.00008946984825870647,
        0.00009138823383084577,
        0.00008951583582089551,
        0.00008655112562189054,
        0.00009071335820895522,
        0.00008875623507462687,
        0.00008342552985074627,
        0.00008706085199004976,
        0.00008805033971291867,
        0.00007899981459330144,
        0.0000860536447368421,
        0.0000800035956937799,
        0.00008477365071770335,
        0.00008792601315789473,
        0.00008937743779904307,
        0.00006957605741626795,
        0.00007467601076555024,
        0.000060627421052631584,
        0.0000759890885167464,
        0.00009113040789473684,
        0.00008626462918660287,
        0.00008108483492822966,
        0.00008994134210526316,
        0.0000850061495215311
      ],
      "variance": 4.206697995351851e-11
    },
    "times": {
      "cycle": 0.0724348381296332,
      "elapsed": 5.486,
      "period": 0.00008664454321726459,
      "timeStamp": 1680079127866
    },
    "running": false,
    "count": 836,
    "cycles": 4,
    "hz": 11541.40772018915
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
      "moe": 0.0000045798499097392,
      "rme": 1.730513024643757,
      "sem": 0.0000023366581172138775,
      "deviation": 0.000019689031264352412,
      "mean": 0.00026465272693812904,
      "sample": [
        0.0002828002460732984,
        0.00028995703141361257,
        0.00028433978534031415,
        0.00027936502094240835,
        0.0002779857802690583,
        0.00022604910313901345,
        0.00029070908968609866,
        0.00026602002242152466,
        0.0002892197040358744,
        0.0002959703452914798,
        0.0002643487533632287,
        0.00026093121524663676,
        0.0002754815423076923,
        0.00029217444615384615,
        0.00026181913846153845,
        0.00028041037692307693,
        0.0002685215307692308,
        0.00027672909615384614,
        0.0002594918192307692,
        0.00023089423461538462,
        0.0002599957307692307,
        0.00024574460769230766,
        0.00023176702307692307,
        0.00025563336923076923,
        0.00025078420384615387,
        0.00023882901153846154,
        0.00019492705384615384,
        0.00026350179230769235,
        0.00027608186923076925,
        0.0002543815076923077,
        0.0002818648653846154,
        0.00023414026923076925,
        0.0002643384615384615,
        0.0002669552961538461,
        0.00022571355000000002,
        0.0002382040846153846,
        0.0002652172384615385,
        0.0002711017038461538,
        0.0002660932846153846,
        0.0002708130115384615,
        0.00027279433461538464,
        0.00028526047692307695,
        0.0002732172730769231,
        0.0002722447807692307,
        0.00025040221538461535,
        0.0002481408615384615,
        0.0002700920576923077,
        0.0002608328,
        0.0002747771807692308,
        0.0002827968692307692,
        0.00023332182692307693,
        0.00021599996923076921,
        0.00027288954615384617,
        0.000269553,
        0.0002742612923076923,
        0.00027346386153846155,
        0.0002843787384615385,
        0.00026368768846153845,
        0.0002605026615384615,
        0.0002770005076923077,
        0.0002825861230769231,
        0.00026998673076923077,
        0.0002501750769230769,
        0.00027528915,
        0.0002620581153846154,
        0.0002757697923076923,
        0.00028357746923076923,
        0.00023819531538461536,
        0.00028462382692307696,
        0.00027522345769230767,
        0.00026793439615384616
      ],
      "variance": 3.876579521286468e-10
    },
    "times": {
      "cycle": 0.06880970900391355,
      "elapsed": 5.392,
      "period": 0.00026465272693812904,
      "timeStamp": 1680079133352
    },
    "running": false,
    "count": 260,
    "cycles": 4,
    "hz": 3778.536543225499
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
  
