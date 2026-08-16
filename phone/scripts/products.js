const products = Object.freeze([
  // Mobile Phones (10 products)
  {
    id: 1,
    name: "iPhone 17 Pro Max",
    brand: "Apple",
    price: 1070400,
    color: "black",
    collection: "mobile phones",
    category: "mobile phones",
    image: "Image/82fcd3_b688bad97950459c93ff6f451ebdd796~mv2_d_1440_1920_s_2.png",
    badge: "New"
  },
  {
    id: 2,
    name: "Samsung Galaxy S26",
    brand: "Samsung",
    price: 1070400,
    color: "white",
    collection: "new phones",
    category: "mobile phones",
    image: "Image/82fcd3_04b4f53e677a4e68b9f99c10575b396b~mv2_d_1440_1920_s_2.png",
    badge: ""
  },
  {
    id: 3,
    name: "Tecno Camon 40",
    brand: "Tecno",
    price: 720000,
    color: "black",
    collection: "mobile phones",
    category: "mobile phones",
    image: "Image/82fcd3_df4a7be03f224cc282d38c8aff689318~mv2_d_1440_1920_s_2.png",
    badge: ""
  },
  {
    id: 4,
    name: "Infinix Note 60",
    brand: "Infinix",
    price: 192000,
    color: "white",
    collection: "mobile phones",
    category: "mobile phones",
    image: "Image/82fcd3_04b4f53e677a4e68b9f99c10575b396b~mv2_d_1440_1920_s_2.png",
    badge: ""
  },
  {
    id: 5,
    name: "Google Pixel 8",
    brand: "Google",
    price: 958400,
    color: "black",
    collection: "mobile phones",
    category: "mobile phones",
    image: "Image/phone5.png",
    badge: ""
  },
  {
    id: 6,
    name: "OnePlus 12",
    brand: "OnePlus",
    price: 549,
    color: "black",
    collection: "new mobile phones",
    category: "mobile phones",
    image: "Image/phone6.png",
    badge: ""
  },
  {
    id: 7,
    name: "Xiaomi 14 Pro",
    brand: "Xiaomi",
    price: 499,
    color: "white",
    collection: "pre-owned phones",
    category: "mobile phones",
    image: "Image/phone7.png",
    badge: "New"
  },
  {
    id: 8,
    name: "Samsung Galaxy Z Fold 6",
    brand: "Samsung",
    price: 899,
    color: "black",
    collection: "pre-owned phones",
    category: "mobile phones",
    image: "Image/phone8.png",
    badge: ""
  },
  {
    id: 9,
    name: "iPhone 16 Pro",
    brand: "Apple",
    price: 878400,
    color: "white",
    collection: "pre-owned phones",
    category: "mobile phones",
    image: "Image/82fcd3_b688bad97950459c93ff6f451ebdd796~mv2_d_1440_1920_s_2.png",
    badge: ""
  },
  {
    id: 10,
    name: "Tecno Phantom X2",
    brand: "Tecno",
    price: 478400,
    color: "black",
    collection: "pre-owned phones",
    category: "mobile phones",
    image: "Image/phone5.png",
    badge: ""
  },

  // Tablets (8 products)
  {
    id: 11,
    name: "iPad Pro M4",
    brand: "Apple",
    price: 989400,
    color: "black",
    collection: "tablets",
    category: "tablets",
    image: "Image/tablet5.png",
    badge: "New"
  },
  {
    id: 12,
    name: "Samsung Tab S9 Ultra",
    brand: "Samsung",
    price: 497920,
    color: "white",
    collection: "tablets",
    category: "tablets",
    image: "Image/tablet6.png",
    badge: "Sale"
  },
  {
    id: 13,
    name: "Tecno Tablet Pro",
    brand: "Tecno",
    price: 136000,
    color: "Black",
    collection: "tablets",
    category: "tablets",
    image: "Image/tablet3.png",
    badge: ""
  },
  {
    id: 14,
    name: "Lenovo Tab P12",
    brand: "Lenovo",
    price: 638400,
    color: "white",
    collection: "tablets",
    category: "tablets",
    image: "Image/tablet2.png",
    badge: ""
  },
  {
    id: 15,
    name: "Huawei Matepad Pro",
    brand: "Google",
    price: 398400,
    color: "black",
    collection: "tablets",
    category: "tablets",
    image: "Image/tablet3.png",
    badge: ""
  },
  {
    id: 16,
    name: "iPad Air",
    brand: "Apple",
    price: 399,
    color: "white",
    collection: "tablets",
    category: "tablets",
    image: "Image/tablet5.png",
    badge: ""
  },
  {
    id: 17,
    name: "Samsung Tab A8",
    brand: "Samsung",
    price: 199,
    color: "white",
    collection: "tablets",
    category: "tablets",
    image: "Image/tablet6.png",
    badge: ""
  },
  {
    id: 18,
    name: "Infinix Tab X",
    brand: "Infinix",
    price: 149,
    color: "black",
    collection: "tablets",
    category: "tablets",
    image: "Image/tablet3.png",
    badge: ""
  },

  // Accessories (10 products)
  {
    id: 19,
    name: "USB-C Fast Charger",
    brand: "Anker",
    price: 30400,
    color: "white",
    collection: "accessories",
    category: "cables & adapters",
    image: "Image/assessory1.png",
    badge: ""
  },
  {
    id: 20,
    name: "Phone Case - Silicone",
    brand: "Spigen",
    price: 24000,
    color: "black",
    collection: "accessories",
    category: "covers & protection",
    image: "Image/case1.png",
    badge: ""
  },
  {
    id: 21,
    name: "Earphones Pro",
    brand: "Sony",
    price: 62400,
    color: "white",
    collection: "accessories",
    category: "headphones",
    image: "Image/assessory4.png",
    badge: ""
  },
  {
    id: 22,
    name: "Screen Protector ",
    brand: "Belkin",
    price: 46400,
    color: "black",
    collection: "accessories",
    category: "covers & protection",
    image: "Image/82fcd3_7474ffa9668e47a495b6288c557baa07~mv2_d_1440_1920_s_2.png",
    badge: ""
  },
  {
    id: 23,
    name: "Power Bank 20000mAh",
    brand: "Anker",
    price: 30400,
    color: "black",
    collection: "accessories",
    category: "cables & adapters",
    image: "Image/assessory2.png",
    badge: "Sale"
  },
  // {
  //   id: 24,
  //   name: "USB-C to Lightning Cable",
  //   brand: "Apple",
  //   price: 12,
  //   color: "white",
  //   collection: "accessories",
  //   category: "cables & adapters",
  //   image: "Image/assessory1.png",
  //   badge: ""
  // },
  // {
  //   id: 25,
  //   name: "Over-Ear Headphones",
  //   brand: "Bose",
  //   price: 79,
  //   color: "black",
  //   collection: "accessories",
  //   category: "headphones",
  //   image: "Image/assessory5.png",
  //   badge: ""
  // },
  // {
  //   id: 26,
  //   name: "Tempered Glass Screen Guard",
  //   brand: "Spigen",
  //   price: 8,
  //   color: "white",
  //   collection: "accessories",
  //   category: "covers & protection",
  //   image: "Image/82fcd3_7474ffa9668e47a495b6288c557baa07~mv2_d_1440_1920_s_2.png",
  //   badge: ""
  // },
  // {
  //   id: 27,
  //   name: "Wireless Charging Pad",
  //   brand: "Samsung",
  //   price: 25,
  //   color: "black",
  //   collection: "accessories",
  //   category: "cables & adapters",
  //   image: "Image/assessory2.png",
  //   badge: ""
  // },
  // {
  //   id: 28,
  //   name: "Leather Phone Case",
  //   brand: "Nomad",
  //   price: 34,
  //   color: "white",
  //   collection: "accessories",
  //   category: "covers & protection",
  //   image: "Image/case2.png",
  //   badge: ""
  // },
  

  
]);