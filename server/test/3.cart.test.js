const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const User = require("../models/user");
const Item = require("../models/item");
const Cart = require("../models/cart");
const Transaction = require("../models/transaction");
const fs = require("fs");

chai.use(chaiHttp);
const expect = chai.expect;

let adminRole = {
  name: "edwin",
  email: "edwin@gmail.com",
  password: "edwinsatya"
};

let customerRole = {
  name: "kirito",
  email: "kirito@gmail.com",
  password: "linkstart"
};

let adminLogin = {
  email: adminRole.email,
  password: adminRole.password
};

let customerLogin = {
  email: customerRole.email,
  password: customerRole.password
};

let initialItem = {
  name: "Green Sweet Traning",
  image: "tes.jpg",
  price: 3900,
  stock: 20,
  category: "newitem"
};

// before(function(done) {
//   //   User.create(adminRole)
//   // .then(_ => {
//   User.create(customerRole)
//     // })
//     .then(_ => {
//       console.log(
//         `testing : => initial create user admin and customer success`
//       );
//       done();
//     })
//     .catch(console.log);
// });

after(function(done) {
  if (process.env.NODE_ENV === "testing") {
    User.deleteMany({})
      .then(_ => {
        return Item.deleteMany({});
      })
      .then(_ => {
        return Cart.deleteMany({});
      })
      .then(_ => {
        return Transaction.deleteMany({});
      })
      .then(_ => {
        console.log(
          "testing : => delete data from database after testing success"
        );
        done();
      })
      .catch(console.log);
  }
});

describe(`Cart Routes`, function() {
  let token = "";
  let itemId = "";
  before(function(done) {
    chai
      .request(app)
      .post("/users/login")
      .send(adminLogin)
      .end(function(err, res) {
        token = res.body.token;
        done();
      });
  });

  //   before(function(done) {
  //     let cash = 10000;
  //     chai
  //       .request(app)
  //       .patch("/users/")
  //       .set("token", token)
  //       .send(cash)
  //       .end(function(err, res) {
  //         token = res.body.token;
  //         done();
  //       });
  //   });

  before(function(done) {
    chai
      .request(app)
      .post("/items/")
      .set("token", token)
      .field("name", "avenger")
      .field("price", "3900")
      .field("stock", "20")
      .field("category", "newitem")
      .attach("image", fs.readFileSync("./img/test.png"), "test.png")
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body)
          .to.be.an("object")
          .to.have.any.keys("response", "message");
        itemId = res.body.response._id;
        done();
      });
  });

  describe("POST /carts", function() {
    let buy = {
      price: "3900",
      count: "1",
      itemId
    };
    describe("success process", function() {
      it("should return object cart,message,and status 201", function(done) {
        chai
          .request(app)
          .post("/carts/")
          .set("token", token)
          .send(buy)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            expect(res.body)
              .to.be.an("object")
              .to.have.any.keys("response", "message");
            done();
          });
      });
    });
  });
});
