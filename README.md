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
- text-based search x 8,504 ops/sec ±1.49% (68 runs sampled)
- regex-based search x 11,001 ops/sec ±1.61% (85 runs sampled)
- cb-based search x 3,641 ops/sec ±1.34% (67 runs sampled)
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
      "moe": 0.0000017521280989062746,
      "rme": 1.4900059828349574,
      "sem": 8.939429076052421e-7,
      "deviation": 0.000007371642062656365,
      "mean": 0.00011759201768925725,
      "sample": [
        0.00014238440714285715,
        0.0001278250142857143,
        0.00012694980238095238,
        0.00012860075952380952,
        0.00012919468095238097,
        0.00012846319523809524,
        0.00011829727529411766,
        0.0001234858494117647,
        0.00012188892,
        0.00012350850352941175,
        0.0001088268626609442,
        0.00011912589270386266,
        0.00010958183905579398,
        0.00010743131115879828,
        0.00010792427682403434,
        0.00011078675536480687,
        0.00011013175107296137,
        0.00010937358583690986,
        0.00010778900429184549,
        0.00011612615021459228,
        0.00010813076578073088,
        0.0001180377873754153,
        0.00011842275249169435,
        0.00012294176245847177,
        0.00012046724750830566,
        0.00012256690697674417,
        0.0001171797558139535,
        0.00011204698522167488,
        0.00010110317405582922,
        0.00010782739244663382,
        0.0001166445763546798,
        0.00011733735632183909,
        0.00011765913136288999,
        0.00011803320525451559,
        0.00011748402955665023,
        0.00011673238916256158,
        0.00011711219376026273,
        0.00011807255829228242,
        0.00011574613136288998,
        0.00011041385878489327,
        0.00011717508538587848,
        0.00011960913628899836,
        0.00012456307224958948,
        0.00012104729556650246,
        0.00012099726600985223,
        0.00012170725287356323,
        0.00012222611986863712,
        0.00012241803448275864,
        0.00012199556157635467,
        0.00012120965517241378,
        0.0001245448538587849,
        0.00012310851888341543,
        0.00012379789490968803,
        0.0001205713037766831,
        0.0001243407881773399,
        0.000124448249589491,
        0.00012157812972085384,
        0.00012647939573070608,
        0.00012058599014778326,
        0.00010870653694581282,
        0.00010851360591133006,
        0.00010856036124794744,
        0.00010891396223316913,
        0.00010865290640394088,
        0.00011319895894909687,
        0.00010880702791461412,
        0.000108412052545156,
        0.00010843238916256159
      ],
      "variance": 5.434110669992459e-11
    },
    "times": {
      "cycle": 0.07161353877275767,
      "elapsed": 5.444,
      "period": 0.00011759201768925725,
      "timeStamp": 1680122410335
    },
    "running": false,
    "count": 609,
    "cycles": 4,
    "hz": 8503.978583329947
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
      "moe": 0.0000014608618807288709,
      "rme": 1.6070364397324997,
      "sem": 7.453376942494239e-7,
      "deviation": 0.000006871674007828737,
      "mean": 0.000090904091818356,
      "sample": [
        0.00008276849348534202,
        0.00008217370846905537,
        0.00008232743648208469,
        0.00008230768729641693,
        0.00009049381921824104,
        0.00009961894299674267,
        0.00009847492019543974,
        0.00010109105700325732,
        0.0000943645993485342,
        0.00008663842508143322,
        0.00010170473452768729,
        0.00010299041856677524,
        0.00010299508957654723,
        0.00009935073778501628,
        0.00008286578501628665,
        0.00008244254071661238,
        0.00008264618892508144,
        0.0000827090325732899,
        0.00008237646905537459,
        0.00008214177198697069,
        0.0000826010667752443,
        0.0000820924315960912,
        0.00008214540879478827,
        0.00008752971661237786,
        0.00008314207817589577,
        0.00008492208631921824,
        0.00009275501140065148,
        0.00009268067426710097,
        0.0000932900977198697,
        0.0000933055309446254,
        0.00009338391368078176,
        0.00009117621172638436,
        0.00009075568566775244,
        0.00009318047394136808,
        0.0000945180016286645,
        0.00009394894299674268,
        0.00009321814820846906,
        0.00009075344299674267,
        0.00009380154071661237,
        0.00009448904234527687,
        0.00008641287459283388,
        0.00009268339576547231,
        0.00008840384364820848,
        0.00009306141530944625,
        0.0000923501693811075,
        0.00009750229478827361,
        0.00009566939576547231,
        0.00009163762377850163,
        0.0000919682622149837,
        0.00009217693811074918,
        0.00009422747882736155,
        0.000097790335504886,
        0.0000975452019543974,
        0.00009776088925081434,
        0.00010067474429967427,
        0.00009801826221498372,
        0.0000968386335504886,
        0.00008597561074918567,
        0.00008218298697068403,
        0.00008273480456026059,
        0.00008690422964169381,
        0.00010153935993485342,
        0.00009968180618892509,
        0.0000990605651465798,
        0.00010059414820846905,
        0.00008625408306188925,
        0.0000880727671009772,
        0.0000980440309446254,
        0.0001009606302931596,
        0.0000994801986970684,
        0.00010105736319218242,
        0.00009499879804560261,
        0.00009740485667752443,
        0.0000927965651465798,
        0.00009280987947882736,
        0.0000817873973941368,
        0.00008266595114006514,
        0.00008211546416938111,
        0.00008280021824104235,
        0.00008266950488599349,
        0.00008248352605863192,
        0.0000829789983713355,
        0.00008166274592833877,
        0.0000840334022801303,
        0.00008220478827361564
      ],
      "variance": 4.721990366986906e-11
    },
    "times": {
      "cycle": 0.055815112376470584,
      "elapsed": 5.357,
      "period": 0.000090904091818356,
      "timeStamp": 1680122415781
    },
    "running": false,
    "count": 614,
    "cycles": 3,
    "hz": 11000.604923243653
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
      "moe": 0.000003667317126950351,
      "rme": 1.3353361945665956,
      "sem": 0.0000018710801668114036,
      "deviation": 0.00001531545122980529,
      "mean": 0.00027463624081129894,
      "sample": [
        0.00028714541304347826,
        0.00028291497826086955,
        0.00027973910326086957,
        0.000281841125,
        0.00028248720652173916,
        0.0002815944402173913,
        0.00028131556306306305,
        0.00028645390540540537,
        0.00028282724324324324,
        0.0002880813153153153,
        0.0002898528648648649,
        0.00023941204054054056,
        0.00027827817567567563,
        0.00027391333783783787,
        0.0003018464054054054,
        0.0002826833153153153,
        0.00027793544144144144,
        0.0002166396225680934,
        0.00027629944357976654,
        0.0002797171245136187,
        0.0002673430972762646,
        0.00027676722178988325,
        0.0002795977081712062,
        0.00023959954863813227,
        0.0002782792607003891,
        0.0002749894319066148,
        0.0002718685642023346,
        0.00027581452140077817,
        0.00027644791828793775,
        0.0002767718560311284,
        0.0002773273774319066,
        0.0002865024513618677,
        0.00027800530350194553,
        0.00027991082101167317,
        0.00028385117120622563,
        0.00028595472762645913,
        0.0002759723968871595,
        0.00027699146692607005,
        0.0002712543696498054,
        0.00027827284046692607,
        0.00027851580544747083,
        0.00028668530350194554,
        0.00028151375875486384,
        0.00028693389883268483,
        0.00027605248638132296,
        0.00019841646692607005,
        0.000267960571942446,
        0.0002711229208633094,
        0.0002786107050359712,
        0.0002807749676258993,
        0.0002773456223021583,
        0.0002568275431654676,
        0.0002673676618705036,
        0.00027282194244604316,
        0.0002776639712230216,
        0.0002705493021582734,
        0.0002770131834532374,
        0.00027537581654676256,
        0.0002799579856115108,
        0.0002769602769784173,
        0.0002754243848920863,
        0.0002717065,
        0.00025585938489208635,
        0.0002674212086330935,
        0.00027847398561151076,
        0.0002728796151079136,
        0.0002778927446043166
      ],
      "variance": 2.3456304637254434e-10
    },
    "times": {
      "cycle": 0.0763488749455411,
      "elapsed": 5.381,
      "period": 0.00027463624081129894,
      "timeStamp": 1680122421139
    },
    "running": false,
    "count": 278,
    "cycles": 4,
    "hz": 3641.180046180047
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
  
