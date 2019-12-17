const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const app = require("../app");

chai.use(chaiHttp);

describe("users", function() {
  describe.only("POST/register", () => {
    it("should return an object of user if username, email and password are valid", done => {
      chai
        .request(app)
        .post("/users/register")
        .send({
          username: "user1234",
          email: "user@mail.com",
          password: "12345678"
        })
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.body).to.be.an("object");
            expect(res).to.have.status(201);
            expect(res.body).to.include.all.keys(
              "username",
              "email",
              "password"
            );
            done();
          }
        });
    });
    it("should return validation error when username is not provided", done => {
      chai
        .request(app)
        .post("/users/register")
        .send({ email: "user@mail.com", password: "12345678" })
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.body).to.be.an("object");
            expect(res).to.have.status(400);
            expect(res.body.message).to.equals("Username required");
            done();
          }
        });
    });
    it("should return validation error when email is not provided", done => {
      chai
        .request(app)
        .post("/users/register")
        .send({ username: "user1234", password: "12345678" })
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.body).to.be.an("object");
            expect(res).to.have.status(400);
            expect(res.body.message).to.equals("Email required");
            done();
          }
        });
    });
    it("should return validation error when password is not provided", done => {
      chai
        .request(app)
        .post("/users/register")
        .send({ username: "user1234", email: "user@mail.com" })
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.body).to.be.an("object");
            expect(res).to.have.status(400);
            expect(res.body.message).to.equals("Password required");
            done();
          }
        });
    });
    it("should return validation error when username is not unique", done => {
      chai
        .request(app)
        .post("/users/register")
        .send({
          username: "user1234",
          email: "user@mail.com",
          password: "12345678"
        })
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.body).to.be.an("object");
            expect(res).to.have.status(400);
            expect(res.body.message).to.equals("Username already registered");
            done();
          }
        });
    });
    it("should return validation error when email is not unique", done => {
      chai
        .request(app)
        .post("/users/register")
        .send({
          username: "user1234",
          email: "user@mail.com",
          password: "12345678"
        })
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.body).to.be.an("object");
            expect(res).to.have.status(400);
            expect(res.body.message).to.equals("Email already registered");
            done();
          }
        });
    });
    it("should return validation error when password length is less than 8 characters", done => {
      chai
        .request(app)
        .post("/users/register")
        .send({
          username: "user1234",
          email: "user@mail.com",
          password: "1234567"
        })
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.body).to.be.an("object");
            expect(res).to.have.status(400);
            expect(res.body.message).to.equals(
              "Password should be at least 8 characters in length"
            );
            done();
          }
        });
    });
    it("should return validation error if email is invalid", done => {
      chai
        .request(app)
        .post("/users/register")
        .send({
          username: "user1234",
          email: "user@mail",
          password: "12345678"
        })
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.body).to.be.an("object");
            expect(res).to.have.status(400);
            expect(res.body.message).to.equals(
              "user@mail is not a valid email address!"
            );
            done();
          }
        });
    });
  });

  describe("POST/login", () => {
    it("should return access_token if email and password match", done => {
      chai
        .request(app)
        .post("/users/login")
        .send({ email: "user@mail.com", password: "12345678" })
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.body).to.be.an("object");
            expect(res).to.have.status(200);
            expect(res.body)
              .to.have.property("access_token")
              .with.lengthOf.above(8);
            done();
          }
        });
    });
    it("should return error if email and password doesn't match or email not found", done => {
      chai
        .request(app)
        .post("/users/login")
        .send({ email: "user@mail.com", password: "1234567" })
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.body).to.be.an("object");
            expect(res).to.have.status(400);
            expect(res.body.message).to.equals(
              "Email and / or password incorrect"
            );
            done();
          }
        });
    });
    it("should return error when email not provided", done => {
      chai
        .request(app)
        .post("/users/login")
        .send({ password: "12345678" })
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.body).to.be.an("object");
            expect(res).to.have.status(400);
            expect(res.body.message).to.equals(
              "Email and / or password incorrect"
            );
            done();
          }
        });
    });
    it("should return error when password not provided", done => {
      chai
        .request(app)
        .post("/users/login")
        .send({ email: "user@mail.com" })
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.body).to.be.an("object");
            expect(res).to.have.status(400);
            expect(res.body.message).to.equals(
              "Email and / or password incorrect"
            );
            done();
          }
        });
    });
  });
});
