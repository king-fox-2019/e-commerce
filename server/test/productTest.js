const chai = require("chai");
const chaiHttp = require("chai-http")
const server = require("../app");
chai.use(chaiHttp);
const expect = chai.expect;

//---------------------------------------------------//
//                   Products Testing                //
// --------------------------------------------------//


//   describe("POST /products", function() {
//     it("should return status 201 and an object", function(done) {
//       let product = {
//         name: "Tes product",
//         image: "image-link",
//         price: 90000,
//         stock: 99,
//       }
//       chai.request(server)
//       .post("/products")
//       .send(product)
//       .then(res => {
//         expect(res).to.have.status(201);
//         expect(res.body).to.be.an("object");
//         expect(res.body).to.have.all.keys(["_id", "name", "image", "price", "stock"])
//         done();
//       })
//       .catch(done)
      
//     })
//   });
//   describe("PATCH /products/:productId", function() {
//     it("should return status 201 and an object", function(done) {
//       let product = {
//         name: "Tes edit product",
//         price: 80000,
//         stock: 88,
//         image: "image-link-1"
//       }
//       chai.request(server)
//         .post("/products")
//         .send(product)
//         .then(function(res) {
//           expect(res).to.have.status(201);
//           expect(res.body).to.be.an("object");
//           expect(res.body).to.have.property("_id");
//           expect(res.body).to.have.property("name");
//           expect(res.body).to.have.property("price");
//           expect(res.body).to.have.property("stock");
//           expect(res.body).to.have.property("image");
//           done();
//         })
//         .catch(done)
//     })
//   });
//   describe("DELETE /products/:productId", function() {
//     it("should return status 200 and deleted product id", (done) => {
//       chai.request(server)
//         .delete("/product/" + productId)
//         .then(function(res) {
//           expect(res).to.have.status(200);
//           expect(res.body).to.be.an("object");
//           done();
//         })
//         .catch(done)
//     })
//   })
// })