const assert = require('chai').assert;
const chaiHttp = require('chai-http');
const chai = require('chai');

const Item = require('../../model/item');
const app = require('../../app');

chai.use(chaiHttp);
chai.should();

// checking item
describe("Items", () => {

    describe("POST /register", () => {
        // Test to create items record
        it("should post new user record", (done) => {
            chai.request(app)
                .post('/api/users/register')
                .send({
                    name: 'tes oke',
                    email: "tes@gmail.com",
                    password: "Qwertyuiop1!",
                    cart: []
                })
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe("POST /register", () => {
        it("should show error user already registered", (done) => {
            chai.request(app)
                .post('/api/users/register')
                .send({
                    name: 'Michael',
                    email: "michael.wenceslaus@gmail.com",
                    password: "rahasia",
                    cart: []
                })
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    describe("POST /login", () => {
        it("should get user token (login process)", (done) => {
            chai.request(app)
                .post('/api/users/login')
                .send({
                    email: "michael.wenceslaus@gmail.com",
                    password: "password"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('token');
                    done();
                });
        });
    });

    describe("GET /verify", () => {
        it("should get user details (verify) got new token", (done) => {
            chai.request(app)
                .get('/api/users/verify')
                .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTI2NGMwMDZlZmZmNTMwNGU0N2MxOWUiLCJpYXQiOjE1Nzk5NzQxNDB9.b0lieR5e7UPcad5Hqa7YHpS9JA81sQbHBV_hF1PZy4I')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('token');
                    done();
                });
        });
    });

    describe("PATCH /cart", () => {
        it("should succeed to add items to chart", (done) => {
            chai.request(app)
                .patch('/api/users/cart')
                .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTI2NGMwMDZlZmZmNTMwNGU0N2MxOWUiLCJpYXQiOjE1Nzk5NzQxNDB9.b0lieR5e7UPcad5Hqa7YHpS9JA81sQbHBV_hF1PZy4I')
                .send({
                    cart: {
                        item: '5e28b238ee06c7718ffcb317',
                        stock: 2,
                        price: 80000
                    }
                })
                .end((err, res) => {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.have.property('message');
                    res.body.message.should.equal("item successfully add to cart");
                    done();
                });
        });
    });

});