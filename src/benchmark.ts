import * as Benchmark from "benchmark";
import * as fs from "fs";
import * as path from "path";

import { search } from ".";

console.log(`### Benchmark`);
const suite: Benchmark.Suite = new Benchmark.Suite();

const data = {
  users: [
    {
      id: 39101,
      name: "Edwin Reichel",
      email: "Kirk.Bednar@yahoo.com",
      address: {
        street: "1709 Carole Branch",
        city: "Jenkinsboro",
        state: "TX",
        zip: "61317-0976",
        phoneNumbers: [
          { type: "work", number: "232.844.3064 x29733" },
          { type: "work", number: "950.846.8118 x9126" },
        ],
        previousAddresses: [
          {
            street: "82002 Connelly Dale",
            city: "Folsom",
            state: "MS",
            zip: "20367-6986",
            yearsLived: 10,
            phoneNumbers: [{ type: "work", number: "1-997-352-5842" }],
            previousAddresses: [
              {
                street: "663 Emie Way",
                city: "Gradyton",
                state: "OH",
                zip: "09828-8254",
                yearsLived: 5,
              },
              {
                street: "1991 Consuelo Roads",
                city: "Gusbury",
                state: "KY",
                zip: "69719",
                yearsLived: 1,
              },
            ],
          },
        ],
      },
      orders: [
        {
          id: 15686,
          date: "Sun Jan 22 2023 15:36:15 GMT-0500 (Eastern Standard Time)",
          total: 83285,
          items: [
            {
              name: "Incredible Metal Shoes",
              quantity: 1,
              price: "469.00",
            },
            {
              name: "Unbranded Concrete Chair",
              quantity: 6,
              price: "999.00",
            },
            {
              name: "Licensed Concrete Sausages",
              quantity: 9,
              price: "657.00",
            },
            {
              name: "Electronic Rubber Ball",
              quantity: 7,
              price: "117.00",
            },
          ],
          shippingAddress: {
            street: "034 Wiza Forge",
            city: "Glenniemouth",
            state: "VT",
            zip: "60082-4617",
          },
        },
      ],
    },
    {
      id: 41973,
      name: "Melanie Upton",
      email: "Alisha.Boyle@yahoo.com",
      address: {
        street: "69147 Bode Junctions",
        city: "Bakersfield",
        state: "WA",
        zip: "83859",
        phoneNumbers: [
          { type: "home", number: "(263) 786-2737 x719" },
          { type: "home", number: "1-536-445-2960" },
        ],
        previousAddresses: [
          {
            street: "99456 Elliott Corner",
            city: "Joanneburgh",
            state: "ME",
            zip: "41321",
            yearsLived: 9,
            phoneNumbers: [
              { type: "work", number: "(999) 243-1101" },
              { type: "work", number: "353.548.4339 x89335" },
            ],
            previousAddresses: [
              {
                street: "591 Thomas Way",
                city: "New Richmond",
                state: "OH",
                zip: "19873",
                yearsLived: 3,
              },
              {
                street: "215 Shanahan Crescent",
                city: "South Clarissa",
                state: "MS",
                zip: "31746",
                yearsLived: 2,
              },
            ],
          },
        ],
      },
      orders: [
        {
          id: 21059,
          date: "Sun Jan 22 2023 11:09:50 GMT-0500 (Eastern Standard Time)",
          total: 38281,
          items: [
            { name: "Rustic Frozen Shirt", quantity: 3, price: "797.00" },
            {
              name: "Luxurious Fresh Salad",
              quantity: 3,
              price: "290.00",
            },
            {
              name: "Ergonomic Bronze Pizza",
              quantity: 10,
              price: "380.00",
            },
          ],
          shippingAddress: {
            street: "35692 Miller Locks",
            city: "Bowie",
            state: "TN",
            zip: "40565-6785",
          },
        },
      ],
    },
  ],
};

suite.add("text-based search", () => {
  search(data, "city");
});

suite.add("regex-based search", () => {
  search(data, /city/);
});

suite.add("cb-based search", () => {
  search(data, (key: string): boolean => key.includes("city"));
});

suite.on("cycle", (event: Event) => {
  console.log(`- ${String(event.target)}`);
});

suite.on("complete", () => {
  const encoded: string = JSON.stringify(suite, null, 2);

  fs.writeFileSync(path.join(__dirname, "benchmark.json"), encoded, {
    encoding: "utf-8",
  });

  console.log(`- **Fastest method** ( for the current release ): **${suite
    .filter("fastest")
    .map("name")}** :sparkles::tada:!!
<details> <summary>JSON results</summary> <pre>${encoded}</pre> </details>
  `);
});

suite.run();
