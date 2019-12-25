const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const Product = require("../models/Product");

chai.use(chaiHttp);
const expect = chai.expect;
let server = chai.request(app);

let newProduct = {
  name: "Vans Old Skool",
  price: 120000,
  stock: 10,
  image: "https://images.vans.com/is/image/Vans/D3HY28-HERO?$583x583$"
};

before(function() {
  server.keepOpen();
});

after(function() {
  server.close();
});

// before(function() {
//   const docs = {
//     name: "Vans Old Skool",
//     price: 120000,
//     stock: 10,
//     image: "https://images.vans.com/is/image/Vans/D3HY28-HERO?$583x583$"
//   };
//   Product.create(docs)
//     .then(product => console.log("testing: success create initial user"))
//     .catch(console.log);
// });

// after(function(done) {
//   if (process.env.NODE_ENV === "testing") {
//     User.deleteMany({})
//       .then(_ => {
//         console.log("testing: delete data user success!");
//         done();
//       })
//       .catch(console.log);
//   }
// });

// describe("Product route", function() {
//   describe("POST /products", function() {
//     describe("Success proccess", function() {
//       it("Should send an object ('message','product') with 201 status code", function(done) {
//         server
//           .post("/products")
//           .send(newProduct)
//           .end((err, res) => {
//             expect(err).to.be.null;
//             expect(res).to.be.have.status(201);
//             expect(res.body)
//               .to.be.an("object")
//               .to.have.any.keys("message", "product");
//             expect(res.body.message).to.equal("Success add product");
//             done();
//           });
//       });
//     });
//   });
// });
