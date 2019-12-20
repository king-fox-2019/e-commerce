const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const app = require('./app')
const expect = chai.expect;
let access_token
let product_id = '5df244b0af46a2137defabe7' //hardcode
describe('routes product', function(){
    describe('user register', function(){
        it('user should success register', function(done){
            chai.request(app)
                .post(`/user/`)
                .send({ email: 'tester@mail.com', name: 'tester', password: 'tester' })
                .end(function(req,res){
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('access_token');
                    done()
                })
        })
    })
    describe('user login', function(){
        it('user should success login', function(done){
            chai.request(app)
                .post(`/user/login`)
                .send({ email: 'tester@mail.com', password: 'tester' })
                .end(function(req,res){
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('access_token');
                    access_token = res.body.access_token
                    done()
                })
        })
    })
    describe('get user cart', function(){
        it('user should success get user cart', function(done){
            chai.request(app)
                .get(`/user/`)
                .set('access_token', access_token)
                .end(function(req,res){
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done()
                })
        })
    })
    describe('add to cart', function(){
        it('user should success add to cart', function(done){
            chai.request(app)
                .put(`/user/`)
                .set('access_token', access_token)
                .send({ product: product_id, amount: 2 })
                .end(function(req,res){
                    expect(res).to.have.status(200);
                    expect(res.body.nModified).to.equal(1)
                    done()
                })
        })
    })
    describe('decrease amount cart', function(){
        it('user should success add to cart', function(done){
            chai.request(app)
                .put(`/user/decrease`)
                .set('access_token', access_token)
                .send({ product: product_id })
                .end(function(req,res){
                    expect(res).to.have.status(200);
                    expect(res.body.nModified).to.equal(1)
                    done()
                })
        })
    })
    describe('remove item from cart', function(){
        it('user should success remove item from cart', function(done){
            chai.request(app)
                .put(`/user/remove-cart`)
                .set('access_token', access_token)
                .send({ product: product_id })
                .end(function(req,res){
                    expect(res).to.have.status(200);
                    expect(res.body.nModified).to.equal(1)
                    done()
                })
        })
    })
    describe('empty user cart', function(){
        it('user should success get user cart', function(done){
            chai.request(app)
                .patch(`/user/empty`)
                .set('access_token', access_token)
                .end(function(req,res){
                    expect(res).to.have.status(200);
                    expect(res.body.n).to.equal(1)
                    done()
                })
        })
    })
    describe('get list of product', function(){
        it('user should able to fetch product', function(done){
            chai.request(app)
                .get(`/product`)
                .set('access_token', access_token)
                .end(function(req,res){
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body[0]).to.have.property('_id');
                    expect(res.body[0]).to.have.property('name');
                    expect(res.body[0]).to.have.property('price');
                    expect(res.body[0]).to.have.property('description');
                    expect(res.body[0]).to.have.property('image');
                    expect(res.body[0]).to.have.property('stock');
                    done()
                })
        })
    })
    describe('get detail of product', function(){
        it('user should able to fetch one product', function(done){
            chai.request(app)
                .get(`/product/${product_id}`)
                .set('access_token', access_token)
                .end(function(req,res){
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.have.property('name');
                    expect(res.body).to.have.property('price');
                    expect(res.body).to.have.property('description');
                    expect(res.body).to.have.property('image');
                    expect(res.body).to.have.property('stock');
                    done()
                })
        })
    })
    describe('get user transaction', function(){
        it('user should able to fetch their own transaction list', function(done){
            chai.request(app)
                .get(`/transaction/user`)
                .set('access_token', access_token)
                .end(function(req,res){
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done()
                })
        })
    })
    // describe('delete product', function(){
    //     it('product should success deleted', function(done){
    //         const id = '5df5db09e6abf1396161482e'
    //         chai.request(app)
    //             .delete(`/product/${id}`)
    //             .end(function(req,res){
    //                 expect(res).to.have.status(200);
    //                 done()
    //             })
    //     })
    // })
})
