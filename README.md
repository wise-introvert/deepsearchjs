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
- text-based search x 8,791 ops/sec ±1.03% (76 runs sampled)
- regex-based search x 10,520 ops/sec ±3.50% (75 runs sampled)
- cb-based search x 3,536 ops/sec ±3.82% (58 runs sampled)
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
      "moe": 0.0000011666561172268809,
      "rme": 1.025563798591514,
      "sem": 5.952327128708576e-7,
      "deviation": 0.000005189118486587261,
      "mean": 0.0001137575369595865,
      "sample": [
        0.00011590823214285716,
        0.00012124104464285715,
        0.00011627403749999999,
        0.00011259038035714287,
        0.00011268843571428571,
        0.00011144395535714285,
        0.00010899320714285714,
        0.00010808961250000001,
        0.0001080477125,
        0.00011583051964285714,
        0.00012270515892857142,
        0.00010358946964285714,
        0.00011258909642857142,
        0.00011841964642857143,
        0.00011875882321428571,
        0.00011779785892857144,
        0.00011113583571428571,
        0.00011108515535714285,
        0.00010923115714285714,
        0.00010896597678571428,
        0.00010892136785714285,
        0.00011871476428571428,
        0.00011736036607142856,
        0.00012028133571428573,
        0.00010913344464285715,
        0.00010603941428571429,
        0.00012510080535714288,
        0.00012558932321428572,
        0.00011941244821428572,
        0.000108377375,
        0.00010884540892857143,
        0.00010875626250000001,
        0.00010897780535714286,
        0.00010959888214285715,
        0.00010983002321428572,
        0.00011274270357142857,
        0.00010857257321428572,
        0.00011045665535714285,
        0.00010934898035714286,
        0.00010912950357142858,
        0.00010898627499999999,
        0.00010962170535714285,
        0.00010854687321428571,
        0.00010914480892857144,
        0.0001106083,
        0.00011931469821428572,
        0.00011867505178571429,
        0.00011830755892857141,
        0.00011712209642857143,
        0.00011711823214285716,
        0.000116917025,
        0.00011940846785714284,
        0.0001087394875,
        0.00010884314107142857,
        0.00011449465892857143,
        0.00011759428392857144,
        0.00011771097857142857,
        0.00011793984464285713,
        0.00011768129642857143,
        0.00011441406607142857,
        0.0001184832267857143,
        0.00011668279107142857,
        0.0001164526017857143,
        0.00012196716607142856,
        0.00011585780892857144,
        0.00011711696785714287,
        0.0001201177107142857,
        0.00012229572857142858,
        0.00012013071785714286,
        0.0001168401875,
        0.00010865353392857143,
        0.00010868860357142858,
        0.00010869870357142857,
        0.00010484737321428572,
        0.00010818921785714285,
        0.0001087868607142857
      ],
      "variance": 2.6926950667841665e-11
    },
    "times": {
      "cycle": 0.06370422069736843,
      "elapsed": 5.657,
      "period": 0.0001137575369595865,
      "timeStamp": 1680120649494
    },
    "running": false,
    "count": 560,
    "cycles": 7,
    "hz": 8790.626333227134
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
      "moe": 0.0000033302946409027886,
      "rme": 3.5034173099981367,
      "sem": 0.0000016991299188279534,
      "deviation": 0.00001471489674035199,
      "mean": 0.00009505846281568324,
      "sample": [
        0.00008279313014827018,
        0.00008274228336079077,
        0.00008276998517298188,
        0.0000827202981878089,
        0.00008267272652388798,
        0.00008249523393739703,
        0.00009119152883031302,
        0.00008614025205930808,
        0.00009743691598023064,
        0.00009777411532125206,
        0.00008970576606260296,
        0.00009435341021416804,
        0.0000993227924217463,
        0.00009938906919275123,
        0.0000995932668863262,
        0.00009762041845140034,
        0.00009319779901153212,
        0.0000948480032948929,
        0.00009242244236760125,
        0.00009329617601246106,
        0.00009213370404984424,
        0.0001024456261682243,
        0.00008351961526479751,
        0.00009424047507788162,
        0.00009087982087227415,
        0.00010210220249221185,
        0.00009904380685358254,
        0.00009241046417445483,
        0.00009277797663551402,
        0.00009244369158878506,
        0.00009245948130841122,
        0.00009508344859813085,
        0.0000928677507788162,
        0.00009861788785046728,
        0.00010286927881619938,
        0.0000997073722741433,
        0.00008499285669781931,
        0.000125687992211838,
        0.00009178809657320872,
        0.00009500278193146417,
        0.00009360355763239876,
        0.0000937963676012461,
        0.00009905864485981309,
        0.00009930788940809969,
        0.00010290685358255453,
        0.0001004929984423676,
        0.00009361967133956385,
        0.00009346979127725857,
        0.000101371761682243,
        0.0000945756183800623,
        0.00009900033644859813,
        0.00009922550000000001,
        0.00009779340342679127,
        0.00009883623364485981,
        0.00009541960280373831,
        0.00014597125233644859,
        0.00009634125545171339,
        0.00008335157165109034,
        0.00008329345638629283,
        0.00009371735514018692,
        0.00009380370872274143,
        0.00008996190498442368,
        0.0000827863660436137,
        0.00008633071806853582,
        0.0000964416308411215,
        0.00009387594704049845,
        0.00006433360473815462,
        0.00008911830673316709,
        0.00007367879177057357,
        0.0001821051209476309,
        0.00011983000997506234,
        0.00009600380423940148,
        0.00009126871695760599,
        0.00007767274064837905,
        0.00008346027431421447
      ],
      "variance": 2.165281860792216e-10
    },
    "times": {
      "cycle": 0.07623688717817796,
      "elapsed": 5.416,
      "period": 0.00009505846281568324,
      "timeStamp": 1680120655152
    },
    "running": false,
    "count": 802,
    "cycles": 4,
    "hz": 10519.841899179279
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
      "moe": 0.000010805687983321324,
      "rme": 3.8206483803524165,
      "sem": 0.000005513106113939451,
      "deviation": 0.00004198656527231396,
      "mean": 0.0002828234086886742,
      "sample": [
        0.0002891338352272727,
        0.0002967292840909091,
        0.0002905968295454546,
        0.00031588635714285715,
        0.00028124396335078535,
        0.00026312258115183246,
        0.0002757344409722222,
        0.00028422469791666665,
        0.00028091865972222223,
        0.00030545053125,
        0.00026766288541666663,
        0.00028980297222222224,
        0.0002692518611111111,
        0.00028640654166666666,
        0.0002794351770833333,
        0.0002829063958333333,
        0.0002893313680555556,
        0.00042405334722222225,
        0.0002899070277777778,
        0.00029999294097222224,
        0.0004079829930555555,
        0.0002637595277777778,
        0.0002295449895833333,
        0.00018787284027777776,
        0.00026519310416666666,
        0.00029008652777777775,
        0.0002781077083333333,
        0.0002878926458333333,
        0.0002915493784722222,
        0.0002838980902777778,
        0.00027917988541666664,
        0.0002622463611111111,
        0.00019887228134556577,
        0.00027969911009174313,
        0.0003011966636085627,
        0.00028256651987767584,
        0.00026476669724770645,
        0.00023682231192660548,
        0.00025872664220183487,
        0.0002732611070336391,
        0.0002729128134556575,
        0.000224632,
        0.0002853012568807339,
        0.000282186247706422,
        0.0002813913149847095,
        0.0002762373944954128,
        0.0001872008868501529,
        0.00028305507951070335,
        0.00028818814067278287,
        0.0002819905443425076,
        0.0003645160519877676,
        0.00030758794189602445,
        0.00041045989296636086,
        0.00024308100917431192,
        0.0002725731620795107,
        0.0002847838868501529,
        0.00028603237308868503,
        0.00028661062385321103
      ],
      "variance": 1.7628716633662805e-9
    },
    "times": {
      "cycle": 0.09248325464119646,
      "elapsed": 5.493,
      "period": 0.0002828234086886742,
      "timeStamp": 1680120660568
    },
    "running": false,
    "count": 327,
    "cycles": 4,
    "hz": 3535.775219726519
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
  
