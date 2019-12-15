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
