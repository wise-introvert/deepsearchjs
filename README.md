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
- text-based search x 8,544 ops/sec ±1.44% (81 runs sampled)
- regex-based search x 11,375 ops/sec ±2.27% (61 runs sampled)
- cb-based search x 3,605 ops/sec ±1.83% (66 runs sampled)
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
      "moe": 0.000001685641217150223,
      "rme": 1.4401665042546081,
      "sem": 8.60021029158277e-7,
      "deviation": 0.000007740189262424493,
      "mean": 0.00011704488419709954,
      "sample": [
        0.00015019504692082112,
        0.00012908220099255583,
        0.00013529968982630274,
        0.00012805724317617865,
        0.00013973213399503723,
        0.00011844357870370371,
        0.00011800487268518519,
        0.00011667593055555556,
        0.00011652147453703703,
        0.00011858817699115045,
        0.00011294036061946903,
        0.0001175767168141593,
        0.00011827803761061947,
        0.00011378038938053098,
        0.00011726184105960266,
        0.00011784040618101545,
        0.00012129609014675052,
        0.0001127204318658281,
        0.00012132133752620544,
        0.00012627351572327045,
        0.00011788007337526205,
        0.00012027810062893082,
        0.0001216175283018868,
        0.00012448320964360585,
        0.00012202190146750523,
        0.00011860511530398323,
        0.00011616997484276729,
        0.00011769040461215932,
        0.00012002946331236896,
        0.00011767795387840671,
        0.00011763708176100629,
        0.00010958447379454928,
        0.00011532863102725368,
        0.00010702136897274634,
        0.00010809037106918238,
        0.00010893069182389937,
        0.00010861184067085953,
        0.00010906277358490567,
        0.00010840632075471698,
        0.0001071297358490566,
        0.00010883210901467506,
        0.00010896044444444444,
        0.00010858660167714884,
        0.00010865268134171908,
        0.00010680995807127883,
        0.0001084357358490566,
        0.00010858318867924528,
        0.00010832670649895178,
        0.0001089984716981132,
        0.00011360384486373164,
        0.00011692532285115303,
        0.00011694898113207546,
        0.00012350002306079665,
        0.00012482714884696016,
        0.0001231999601677149,
        0.00011349637526205452,
        0.00012541643396226415,
        0.00012180397903563941,
        0.00011429460796645702,
        0.00011861692033542978,
        0.00011528990146750523,
        0.00011006378406708596,
        0.00010887283438155136,
        0.00010881398742138365,
        0.00010908510482180293,
        0.00010843123689727464,
        0.0001073917714884696,
        0.00011153770440251573,
        0.00012543954297693918,
        0.00012283736687631027,
        0.00012475157861635222,
        0.00012180739832285116,
        0.00012529833123689726,
        0.00011972871278825995,
        0.0001180304716981132,
        0.00011738484276729559,
        0.00011746051362683437,
        0.00011607920125786164,
        0.00012120263941299791,
        0.00011903130817610064,
        0.00011713140251572327
      ],
      "variance": 5.99105298181514e-11
    },
    "times": {
      "cycle": 0.05583040976201648,
      "elapsed": 5.542,
      "period": 0.00011704488419709954,
      "timeStamp": 1680121843342
    },
    "running": false,
    "count": 477,
    "cycles": 4,
    "hz": 8543.73095295677
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
      "moe": 0.000001992975613984312,
      "rme": 2.2670752902057485,
      "sem": 0.0000010168242928491389,
      "deviation": 0.000007941651603678999,
      "mean": 0.000087909546833067,
      "sample": [
        0.00009294170566727605,
        0.0000914309378427788,
        0.00009479587385740403,
        0.00009710031992687385,
        0.00010131161425959781,
        0.0000819973947368421,
        0.00008222562526315789,
        0.00008162618421052632,
        0.00008225574,
        0.00008225936105263157,
        0.00008210980105263159,
        0.00008221964736842104,
        0.00008215068210526316,
        0.00008288026210526315,
        0.00009217614210526315,
        0.00009286523684210525,
        0.00009413299684210527,
        0.00009158591263157894,
        0.00008264194736842105,
        0.00008489987052631579,
        0.00008259731684210526,
        0.00008174592210526316,
        0.00008101118105263159,
        0.00008209524210526316,
        0.00008188210736842105,
        0.00008080911368421053,
        0.00008467048000000001,
        0.00007165575684210525,
        0.00008114293368421053,
        0.00008079424842105264,
        0.00008214997789473684,
        0.0000951837547368421,
        0.00009732606210526316,
        0.00006401017368421052,
        0.0001004520347368421,
        0.00009124992315789474,
        0.00008158223894736842,
        0.00008805603578947369,
        0.00009265152421052631,
        0.00009310733052631578,
        0.00009319040000000001,
        0.00009909684947368421,
        0.0000944836747368421,
        0.00009660885789473684,
        0.00009893651157894737,
        0.00009784910315789473,
        0.00009228232105263158,
        0.00009201116842105263,
        0.0000884482,
        0.00009003801263157895,
        0.00008903756631578948,
        0.00008291424736842105,
        0.00006731744210526316,
        0.0000926685494736842,
        0.00009499416315789474,
        0.00009985219894736842,
        0.00009342076315789474,
        0.00009356916,
        0.0000941048852631579,
        0.00008189859578947367,
        0.00007997907263157895
      ],
      "variance": 6.306983019421721e-11
    },
    "times": {
      "cycle": 0.08351406949141366,
      "elapsed": 5.384,
      "period": 0.000087909546833067,
      "timeStamp": 1680121848885
    },
    "running": false,
    "count": 950,
    "cycles": 3,
    "hz": 11375.328801306618
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
      "moe": 0.000005068881771816609,
      "rme": 1.8273908632522637,
      "sem": 0.0000025861641692941884,
      "deviation": 0.000021010097032039444,
      "mean": 0.0002773835567282724,
      "sample": [
        0.0002820040773195876,
        0.0002665501855670103,
        0.0002882465773195876,
        0.0002934397731958763,
        0.00028782785567010307,
        0.0002949160154639175,
        0.0002856870979381443,
        0.0002871443453608247,
        0.0002964345618556701,
        0.0002952063350515464,
        0.00028593259793814434,
        0.0002913355567010309,
        0.0002807013350515464,
        0.00028868136082474226,
        0.0002678240463917526,
        0.00027815012886597937,
        0.00029779859793814436,
        0.0003113588969072165,
        0.0002826998556701031,
        0.00029230560824742267,
        0.00027184463819095476,
        0.0002696251457286432,
        0.00029880347738693466,
        0.0002629846633165829,
        0.00028743755276381907,
        0.00030780680904522615,
        0.0002934223366834171,
        0.0002806713115577889,
        0.0002956897452471483,
        0.00030043852471482886,
        0.00028458946768060835,
        0.00028376563878327,
        0.00027073627376425854,
        0.0002791698174904943,
        0.0002766450228136882,
        0.0002811636653992396,
        0.00021597841825095058,
        0.00017463631141868512,
        0.00021133302476780184,
        0.0002812642786377709,
        0.00027213360061919504,
        0.0002816863529411765,
        0.00027372978328173375,
        0.0002733211702786378,
        0.0002729225882352941,
        0.00027561334055727554,
        0.0002729156315789474,
        0.0002772102105263158,
        0.0002749418080495356,
        0.000251719959752322,
        0.00028065508049535603,
        0.0002879054489164087,
        0.0002820150959752322,
        0.0002735525448916409,
        0.000257388653250774,
        0.00028747831578947365,
        0.0002786373653250774,
        0.00027131075851393187,
        0.00025418513931888545,
        0.0002635155170278638,
        0.0002560627987616099,
        0.00027726844891640866,
        0.00027690282972136224,
        0.00028740193498452015,
        0.00028345061300309596,
        0.0002811388204334365
      ],
      "variance": 4.414241772957126e-10
    },
    "times": {
      "cycle": 0.08959488882323198,
      "elapsed": 5.448,
      "period": 0.0002773835567282724,
      "timeStamp": 1680121854270
    },
    "running": false,
    "count": 323,
    "cycles": 4,
    "hz": 3605.1163659265126
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
  
