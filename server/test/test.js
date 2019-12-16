const chai = require("chai")
const chaiHttp = require("chai-http")
const app = require('../app')

chai.use(chaiHttp)
const expect = chai.expect

describe('Product Routes', function () {
    this.timeout(1000)

    let product = {
        name: 'product',
        stock: 10,
        price: 5000,
        image: 'https://images.unsplash.com/photo-1555583743-991174c11425?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
    }

    let Customer = {
        email: 'customer@mail.com',
        password: 'customer'
    }
    let createdProduct = {}

    let token = '',
        tokenCustomer = ''

    describe('POST /products', (done) => {

        describe('product', () => {
            it('success add product', (done) => {
                let newProduct = { ...product }
                chai.request(app)
                    .post('/products')
                    .set("token", token)
                    .send(newProduct)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(201)
                        expect(res.body).to.be.an('Object').to.have.any.keys('newProduct')
                        expect(res.body.newProduct).to.be.an('Object').to.have.all.keys('_id', 'name', 'stock', 'description', 'image', 'category', 'price')
                        createdProduct = res.body.newProduct
                        expect(res.body.newProduct.name).to.be.a('String')
                        expect(res.body.newProduct.description).to.be.a('String')
                        expect(res.body.newProduct.image).to.be.a('String')
                        expect(res.body.newProduct.category).to.be.an('Array')
                        expect(res.body.newProduct.stock).to.be.a('Number')
                        expect(res.body.newProduct.price).to.be.a('Number')
                        done()
                    })
            })
        })

        describe(`product (-__-)`, () => {
            it('failed add product : empty product keys required', (done) => {
                let failedProduct = { ...product }
                delete failedProduct.name
                delete failedProduct.price
                chai.request(app)
                    .post('/products')
                    .send(failedProduct)
                    .end(function (err, res) {
                        let error = res.body.message
                        expect(error).to.be.an('Array')
                        expect(error)
                        done()
                    })
            })
        })
    })

    describe('GET /products', (done) => {
        describe(`success show all products!`, () => {
            it('supposed return all products', (done) => {
                chai.request(app)
                    .get('/products')
                    .set("token", token)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('Array')
                        expect(res.body[0]).to.be.an('Object').to.have.any.keys('_id', 'name', 'stock', 'image', 'price')
                        expect(res.body[0].name).to.be.a('String')
                        expect(res.body[0].image).to.be.a('String')
                        expect(res.body[0].stock).to.be.a('Number')
                        expect(res.body[0].price).to.be.a('Number')
                        done()
                    })
            })
        })
    })

    describe('DELETE /products/:id', (done) => {
        describe(`success response delete product!`, () => {
            it('supposed to delete product', (done) => {
                chai.request(app)
                    .delete(`/products/${createdProduct._id}`)
                    .set("token", token)
                    .end((err, res) => {
                        expect(err).to.be.null
                        expect(res).to.have.status(200)
                        expect(res.body).to.be.an('Object')
                        expect(res.body.success).to.have.any.keys('_id', 'name', 'stock', 'image', 'price')
                        done()
                    })
            })
        })

        describe(`error response delete product`, () => {
            it('failed delete product : Cast to ObjectId failed', (done) => {
                chai.request(app)
                    .delete(`/products/advjasjahslaslk726381780`)
                    .set("token", token)
                    .end(function (err, res) {
                        expect(res).to.have.status(404)
                        expect(res.body).to.be.an('Object').to.have.any.keys('message')
                        expect(res.body.message).to.equal(`Not found`)
                        done()
                    })
            })

            it('failed delete product : product not found', (done) => {
                console.log(`${createdProduct._id.slice(createdProduct._id.length - 1)}`);
                chai.request(app)
                    .delete(`/products/${createdProduct._id.slice(createdProduct._id.length - 1)}`)
                    .set("token", token)
                    .end(function (err, res) {
                        expect(res).to.have.status(404)
                        expect(res.body).to.be.an('Object').to.have.any.keys('message')
                        expect(res.body.message).to.equal(`Not found`)
                        done()
                    })
            })
        })
    })

})
