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
- text-based search x 9,225 ops/sec ±2.37% (67 runs sampled)
- regex-based search x 11,607 ops/sec ±1.75% (70 runs sampled)
- cb-based search x 3,743 ops/sec ±1.80% (70 runs sampled)
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
      "moe": 0.0000025743039890123333,
      "rme": 2.374677040738651,
      "sem": 0.0000013134204025573128,
      "deviation": 0.00001075080933270633,
      "mean": 0.00010840648832868607,
      "sample": [
        0.00011797479194630872,
        0.0001188919932885906,
        0.00012096702013422818,
        0.00009413173731884058,
        0.00011701998188405797,
        0.00011515135507246376,
        0.00011265820652173913,
        0.00011614671195652173,
        0.00011986442210144927,
        0.00011130363922942205,
        0.00011420179159369527,
        0.00011394218213660246,
        0.00010959122942206655,
        0.00011661465323992994,
        0.0001065482697022767,
        0.0001133529772329247,
        0.00011283031348511383,
        0.00011604376357267952,
        0.00011357709457092818,
        0.00011798013485113835,
        0.00010727995796847636,
        0.00010424050262697023,
        0.00011607412434325744,
        0.00011538422767075306,
        0.00011941714010507881,
        0.00010625955536912753,
        0.00010799327684563757,
        0.00009269024832214764,
        0.0001103697567114094,
        0.00010289658389261746,
        0.00010618261241610738,
        0.00011594444630872483,
        0.00011562439932885906,
        0.00010251069798657718,
        0.0000947126620498615,
        0.00011266874099722991,
        0.00011314929778393352,
        0.00010618203324099724,
        0.00008208871329639889,
        0.00011478597922437673,
        0.00011464145706371191,
        0.00010679623268698062,
        0.00011512844459833795,
        0.00011156970637119113,
        0.00010929732548476455,
        0.0001165397728531856,
        0.00011259441689750693,
        0.00011329607340720221,
        0.0000875262110091743,
        0.00011605823197903015,
        0.00011539942070773265,
        0.00011200772739187418,
        0.00008982547837483618,
        0.00010743163433813894,
        0.00009193104325032766,
        0.0000947505740498034,
        0.00007399577850589777,
        0.00011380903407601573,
        0.00007291331585845347,
        0.00010294858322411534,
        0.00011782296461336829,
        0.00011436519266055046,
        0.00011675476539973788,
        0.00010497381389252949,
        0.00008797142595019658,
        0.00011270869593709043,
        0.00010493017169069463
      ],
      "variance": 1.1557990130820554e-10
    },
    "times": {
      "cycle": 0.08271415059478747,
      "elapsed": 5.702,
      "period": 0.00010840648832868607,
      "timeStamp": 1680079864623
    },
    "running": false,
    "count": 763,
    "cycles": 7,
    "hz": 9224.540112101244
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
      "moe": 0.0000015115972532758676,
      "rme": 1.7544703582114776,
      "sem": 7.712230884060549e-7,
      "deviation": 0.000006452515296095016,
      "mean": 0.00008615689892970339,
      "sample": [
        0.0000841698803986711,
        0.00009227686544850498,
        0.00009022482890365449,
        0.00009403073035439136,
        0.00007965217257318952,
        0.00009303828351309707,
        0.0000797969029275809,
        0.0000908897719568567,
        0.00009098570724191062,
        0.00008979947437774524,
        0.00009002211566617862,
        0.00009281069253294291,
        0.00007914050658857979,
        0.00009297010248901903,
        0.00008687562811127379,
        0.00009122620351390923,
        0.00009087792093704246,
        0.00008746623865300146,
        0.00007458989019033674,
        0.00009313965885797949,
        0.0000892634289897511,
        0.00008920200146412884,
        0.00009230338799414349,
        0.00008434228023255815,
        0.00009226043255813954,
        0.00008971817325581396,
        0.00008235962906976743,
        0.00009057644302325582,
        0.00009091777093023256,
        0.00007480876279069768,
        0.00009264977674418605,
        0.00008624817906976744,
        0.00007665613139534884,
        0.00009325558837209302,
        0.00008260241395348838,
        0.00008883962325581395,
        0.00007008108604651163,
        0.00009095085813953488,
        0.00009141681860465117,
        0.00007937839302325581,
        0.00008799107558139534,
        0.00008820412441860465,
        0.00008971584651162792,
        0.00008715902209302325,
        0.00008943123604651162,
        0.00008362520697674419,
        0.0000871391953488372,
        0.00008349819418604651,
        0.00009116541162790698,
        0.00009081359651162791,
        0.00007623606279069768,
        0.00007167922674418605,
        0.00009003199418604651,
        0.00007300992906976744,
        0.00008107896279069768,
        0.00008266992674418605,
        0.00008338577558139535,
        0.00007897058488372093,
        0.00007977662209302326,
        0.00008700226744186046,
        0.00009259868255813954,
        0.00006619057906976744,
        0.00008699422790697675,
        0.00009079484534883722,
        0.00008667388139534884,
        0.00007703414186046513,
        0.00009091687325581395,
        0.0000857574546511628,
        0.00008981701279069768,
        0.00008980621046511627
      ],
      "variance": 4.1634953646340156e-11
    },
    "times": {
      "cycle": 0.07409493307954491,
      "elapsed": 5.502,
      "period": 0.00008615689892970339,
      "timeStamp": 1680079870326
    },
    "running": false,
    "count": 860,
    "cycles": 3,
    "hz": 11606.731584152232
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
      "moe": 0.00000480601193085033,
      "rme": 1.7989665088989608,
      "sem": 0.000002452046903495066,
      "deviation": 0.0000205152962734098,
      "mean": 0.00026715405245602934,
      "sample": [
        0.0002743251304347826,
        0.0002568622134387352,
        0.00024368149407114623,
        0.00029052059683794463,
        0.0002857040909090909,
        0.0002574619920948616,
        0.0002870437470355731,
        0.0002884442450592885,
        0.00027162519762845847,
        0.0002718005019762846,
        0.0002823951343873518,
        0.00027696218181818183,
        0.00028665288932806326,
        0.0002814912766798419,
        0.0002595836166007905,
        0.00026730134782608695,
        0.00025849274308300396,
        0.0002593607944664032,
        0.0002535308932806324,
        0.0002844226007905138,
        0.0002376773438735178,
        0.00026899020553359685,
        0.00027493488537549406,
        0.00026768723320158105,
        0.00027442555731225295,
        0.00023292039130434782,
        0.0002691632964426877,
        0.0002307704980237154,
        0.00028664243478260866,
        0.0002731992608695652,
        0.00026850321739130435,
        0.00025689295256916997,
        0.0002588900197628459,
        0.00027871668029739777,
        0.0002797972713754647,
        0.00028128738289962826,
        0.00029047908550185875,
        0.0002750553048327137,
        0.00027645032342007433,
        0.0002642953531598513,
        0.0002753882825278811,
        0.000271620594795539,
        0.0002782275278810409,
        0.0002745165724907063,
        0.00027959650557620813,
        0.00028832172862453535,
        0.0002746771486988848,
        0.0003114071970260223,
        0.0002503148215613383,
        0.00020657259851301115,
        0.00026183830483271373,
        0.0002229583345724907,
        0.000272970843866171,
        0.00028203886245353163,
        0.0002752339256505576,
        0.00028987681040892194,
        0.00025275863568773233,
        0.0002437959665427509,
        0.00027966177323420074,
        0.00029871241635687733,
        0.00023806247955390335,
        0.0002635693717472119,
        0.0002687584758364312,
        0.00022247907063197028,
        0.00026957358364312266,
        0.0002704493494423792,
        0.00022452653903345726,
        0.0002798192267657993,
        0.00027701290706319705,
        0.0002116024312267658
      ],
      "variance": 4.208773811857821e-10
    },
    "times": {
      "cycle": 0.07186444011067189,
      "elapsed": 5.486,
      "period": 0.00026715405245602934,
      "timeStamp": 1680079875829
    },
    "running": false,
    "count": 269,
    "cycles": 4,
    "hz": 3743.158641265938
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
  
