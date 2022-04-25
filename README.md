# more-clothes

Api serves up Products (from clothing store)  when requests are made to different endpoints (see below). The app serves several articles where you can leave a comment. You can access the app using the link below:

## Available URLs (Endpoints)

GET /api/products - serves an array of all products

POST /api/products - allows the creation of new product when supplied the following information in JSON format : {
    title: { type: String},
    desc: { type: String},
    img: { type: String},
    categories: { type: Array},
    price: { type: Number},
  
  },
  { timestamps: true }
);

GET /api/products/find/:id - serves a single object containing Product details  when passed a Product's ID


