const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const User = require("../models/user");

chai.use(chaiHttp);
const expect = chai.expect;

let newUser = {
  name: "kirito",
  email: "kiritoz@gmail.com",
  password: "linkstart"
};

let userLogin = {
  email: newUser.email,
  password: newUser.password
};

//hooks
before(function(done) {
  User.create({
    name: "Test",
    email: "test@gmail.com",
    password: "test12345"
  })
    .then(_ => {
      console.log("testing: Initial create user testing success");
      done();
    })
    .catch(console.log);
});

after(function(done) {
  if (process.env.NODE_ENV == "testing") {
    User.deleteMany({})
      .then(_ => {
        console.log("testing: delete user after testing success!");
        done();
      })
      .catch(console.log);
  }
});

describe("User Routes", function() {
  describe("POST /users/signup", function() {
    describe("Success Process", function() {
      it("should return object of user with 201 status code", function(done) {
        chai
          .request(app)
          .post("/users/signup")
          .send(newUser)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            expect(res.body)
              .to.be.an("object")
              .to.have.any.keys("token", "response", "message");
            expect(res.body.message).to.equal("Success Sign Up");
            expect(res.body.response.password).to.not.equal(newUser.password);
            done();
          });
      });
    });

    describe("Error Process", function() {
      it("should return error with status code 400 caused by empty name value", function(done) {
        const withoutName = { ...newUser };
        delete withoutName.name;
        chai
          .request(app)
          .post("/users/signup")
          .send(withoutName)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body).to.be.an("object");
            expect(res.body.errors).to.be.an("array");
            expect(res.body.errors[0]).to.equal("Please Input Your Name");
            done();
          });
      });

      it("should return error with status code 400 caused by empty email value", function(done) {
        const withoutEmail = { ...newUser };
        delete withoutEmail.email;
        chai
          .request(app)
          .post("/users/signup")
          .send(withoutEmail)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body).to.be.an("object");
            expect(res.body.errors).to.be.an("array");
            expect(res.body.errors[0]).to.equal("Please Input Your Email");
            done();
          });
      });

      it("should return error with status code 400 caused by empty password value", function(done) {
        const withoutPassword = { ...newUser };
        delete withoutPassword.password;
        chai
          .request(app)
          .post("/users/signup")
          .send(withoutPassword)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body).to.be.an("object");
            expect(res.body.errors).to.be.an("array");
            expect(res.body.errors[0]).to.equal("Please Input Your Password");
            done();
          });
      });

      it("should return error with status code 400 caused not valid email format", function(done) {
        const wrongEmail = { ...newUser };
        wrongEmail.email = "kirito.com";
        chai
          .request(app)
          .post("/users/signup")
          .send(wrongEmail)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body).to.be.an("object");
            expect(res.body.errors).to.be.an("array");
            expect(res.body.errors[0]).to.equal("email is not valid");
            done();
          });
      });

      it("should return error with status code 400 caused email unique validation error", function(done) {
        const emailUnique = { ...newUser };
        emailUnique.email = "kirito@gmail.com";
        chai
          .request(app)
          .post("/users/signup")
          .send(emailUnique)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body).to.be.an("object");
            expect(res.body.errors).to.be.an("array");
            expect(res.body.errors[0]).to.equal("Email Already Exists");
            done();
          });
      });

      it("should return error with status code 400 caused name value higher then 30 characters", function(done) {
        const nameMax = { ...newUser };
        nameMax.name = "qwertyuiopdasdasdaslkjhgfdsazxcvbnmdsadsadsa";
        chai
          .request(app)
          .post("/users/signup")
          .send(nameMax)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body).to.be.an("object");
            expect(res.body.errors).to.be.an("array");
            expect(res.body.errors[0]).to.equal(
              "Maximum Input Name 30 Characters"
            );
            done();
          });
      });

      it("should return error with status code 400 caused password value less then 7 characters", function(done) {
        const passMin = { ...newUser };
        passMin.password = "12345";
        chai
          .request(app)
          .post("/users/signup")
          .send(passMin)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body).to.be.an("object");
            expect(res.body.errors).to.be.an("array");
            expect(res.body.errors[0]).to.equal(
              "Password Minimum 7 Characters"
            );
            done();
          });
      });

      it("should return error with status code 400 caused empty password value", function(done) {
        const passEmpty = { ...newUser };
        delete passEmpty.password;
        chai
          .request(app)
          .post("/users/signup")
          .send(passEmpty)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body).to.be.an("object");
            expect(res.body.errors).to.be.an("array");
            expect(res.body.errors[0]).to.equal("Please Input Your Password");
            done();
          });
      });
    });
  });

  describe("POST /users/login", function() {
    describe("Success Process", function() {
      it("should return object with key (user, token) and status code 200", function(done) {
        chai
          .request(app)
          .post("/users/login")
          .send(userLogin)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body)
              .to.be.an("object")
              .to.have.any.keys("token", "response", "message");
            done();
          });
      });
    });

    describe("Error Process", function() {
      it("should return error with status code 404 caused email is not registerd in database", function(done) {
        const wrongEmail = { ...userLogin };
        wrongEmail.email = "edwin@gmail.com";
        chai
          .request(app)
          .post("/users/login")
          .send(wrongEmail)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(404);
            expect(res.body).to.be.an("object");
            expect(res.body.errors).to.be.an("array");
            expect(res.body.errors[0]).to.equal("Email / Password is Wrong!");
            done();
          });
      });

      it("should return error with status code 404 caused password is wrong", function(done) {
        const wrongPass = { ...userLogin };
        wrongPass.password = "1234567890";
        chai
          .request(app)
          .post("/users/login")
          .send(wrongPass)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(404);
            expect(res.body).to.be.an("object");
            expect(res.body.errors).to.be.an("array");
            expect(res.body.errors[0]).to.equal("Email / Password is Wrong!");
            done();
          });
      });

      it("should return error with status code 404 caused empty form email/password", function(done) {
        const emptyForm = {
          email: "",
          password: ""
        };
        chai
          .request(app)
          .post("/users/login")
          .send(emptyForm)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(404);
            expect(res.body).to.be.an("object");
            expect(res.body.errors).to.be.an("array");
            expect(res.body.errors[0]).to.equal("Email / Password is Wrong!");
            done();
          });
      });
    });
  });

  describe("GET /users/", function() {
    let token = "";

    before(function(done) {
      chai
        .request(app)
        .post("/users/login")
        .send(userLogin)
        .end(function(err, res) {
          token = res.body.token;
          done();
        });
    });
    describe("Success Process", function() {
      it("should return object info user and status code 200", function(done) {
        chai
          .request(app)
          .get(`/users/`)
          .set("token", token)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("object");
            done();
          });
      });
    });

    describe("Error Process", function() {
      it("should return object error with status code 401 cause not set any headers to get through authentication", function(done) {
        chai
          .request(app)
          .get("/users/")
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(401);
            expect(res.body).to.be.an("object");
            expect(res.body.errors).to.be.an("array");
            expect(res.body.errors[0]).to.equal("You should log in first!");
            done();
          });
      });
    });
  });

  describe("PATCH /users/", function() {
    let token = "";

    before(function(done) {
      chai
        .request(app)
        .post("/users/login")
        .send(userLogin)
        .end(function(err, res) {
          token = res.body.token;
          done();
        });
    });
    describe("Success Process", function() {
      it("should return object info user updated cash and status code 200", function(done) {
        const addCash = {
          cash: "500"
        };
        chai
          .request(app)
          .patch(`/users/`)
          .set("token", token)
          .send(addCash)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("object");
            done();
          });
      });
    });

    describe("Error Process", function() {
      it("input cash with value less then 0 and get status 400", function(done) {
        const addCash = {
          cash: "-100"
        };
        chai
          .request(app)
          .patch(`/users/`)
          .set("token", token)
          .send(addCash)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(400);
            expect(res.body).to.be.an("object");
            expect(res.body.errors).to.be.an("array");
            expect(res.body.errors[0]).to.equal("Cant input less then 0");
            done();
          });
      });
    });
  });
});
