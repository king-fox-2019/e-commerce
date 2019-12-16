const chai = require("chai"),
  chaiHttp = require("chai-http");
chai.use(chaiHttp);
const expect  = chai.expect
const app = require("../app");

describe("test user routes", function(){
  describe("user register",function(){
    it("should return validation error",function(done){
      chai.request(app)
        .post("/user/register")
        .send({name:"",email:"",password:""})
        .then(function(res){
          expect(res).to.have.status(400)
          expect(res.body).to.have.property('name').equal('ValidationError')
          done()
        })
        .catch(done)
    })
    it("should return validation error",function(done){
      chai.request(app)
        .post("/user/register")
        .send({name:"asdf",email:"asdf",password:"asdf"})
        .then(function(res){
          expect(res).to.have.status(400)
          expect(res.body).to.have.property('name').equal('ValidationError')
          done()
        })
        .catch(done)
    })
    it("should return status 201",function(done){
      chai.request(app)
        .post("/user/register")
        .send({name:"asdf",email:"a@mail.com",password:"asdfas"})
        .then(function(res){
          expect(res).to.have.status(201)
          expect(res.body).to.have.property('name')
          done()
        })
        .catch(done)
    })
    it("should return validation error",function(done){
      chai.request(app)
        .post("/user/register")
        .send({name:"asdf",email:"a@mail.com",password:"asdfas"})
        .then(function(res){
          expect(res).to.have.status(400)
          expect(res.body).to.have.property('name').equal('ValidationError')
          done()
        })
        .catch(done)
    })
  })
  describe('test login route',function(){
    it('should return status 201',function(done){
      chai.request(app)
        .post('/user/login')
        .send({email:"a@mail.com",password:"asdfas"})
        .then(function(res){
          expect(res).to.have.status(201)
          expect(res.body).to.have.property('access_token')
          done()
        })
        .catch(done)
    })
    it('should return status 400 user not found',function(done){
      chai.request(app)
        .post('/user/login')
        .send({email:"a@mail.co",password:"asdfas"})
        .then(function(res){
          expect(res).to.have.status(400)
          expect(res.body).to.have.property('message').equal('user not found')
          done()
        })
        .catch(done)
    })
    it('should return status 400 wrong password',function(done){
      chai.request(app)
        .post('/user/login')
        .send({email:"a@mail.com",password:"asdfa"})
        .then(function(res){
          expect(res).to.have.status(400)
          expect(res.body).to.have.property('message').equal('wrong password')
          done()
        })
        .catch(done)
    })
  })
})

describe('test product routes',function(){
  describe('test create product route',function(){
    it("should return status 201",function(done){
      chai.request(app)
        .post('/product')
        .send({name:"barang",price:1000,stock:10,image:"a"})
        .then(function(res){
          expect(res).to.have.status(201)
          done()
        })
        .catch(done)
    })
    it("should return status 400",function(done){
      chai.request(app)
        .post('/product')
        .send({name:"",price:'',stock:'',image:""})
        .then(function(res){
          expect(res).to.have.status(400)
          expect(res.body).to.have.property('name').equals('ValidationError')
          done()
        })
        .catch(done)
    })
  })
  describe('test get products route',function(){
    it("should return status 200",function(done){
      chai.request(app)
        .get('/product')
        .then(function(res){
          expect(res).to.have.status(200)
          done()
        })
        .catch(done)
    })
  })
  describe('test update products route',function(){
    it('should return status 201',function(done){
      chai.request(app)
        .put('/product')
        .send({id:"5dee7636fb38c73fa179d85c",name:"asd",price:100,stock:100,image:"a"})
        .then(function(res){
          expect(res).to.have.status(201)
          done()
        })
        .catch(done)
    })
    it('should return validation error',function(done){
      chai.request(app)
       .put('/product')
       .send({id:"5dee7636fb38c73fa179d85c",name:'',price:'',stock:'',image:''})
       .then(function(res){
         expect(res).to.have.status(400)
         expect(res.body).to.have.property('name').equal('ValidationError')
         done()
       })
       .catch(done)
    })
  })
  describe('test delete products route',function(){
    it('should return status 201',function(done){
      chai.request(app)
        .delete('/product')
        .send({id:"5dee7636fb38c73fa179d85c"})
        .then(function(res){
          expect(res).to.have.status(201)
          done()
        })
        .catch(done)
    })
  })
})

// describe("Test product routes", function() {
//   describe("Test product", function() {
//     it("create product should have status 201", function(done) {
//       chai.request(app)
//         .post("/product")
//         .send({name:"item",price:"1",stock:"1",image:"https://storage.googleapis.com/mini_wordpress/1575825971551-error2.png"})
//         .end(function(err,res){
//           expect(err).to.be.null
//           expect(res).to.have.status(201)
//           done() 
//         })
//     });
//   describe
//     it("get products should have status 200", function(done){
//       chai.request(app)
//         .get("/product")
//         .end(function(err,res){
//           expect(err).to.be.null
//           expect(res.body).to.be.an('array')
//           expect(res).to.have.status(200)
//           done()
//         })
//     })
//     it("update products should have status 201",function(done){
//       chai.request(app)
//         .put("/product")
//         .send({id:"5dee24b732512b195fb0437f",name:"bla",price:"1",stock:"1",image:"https://storage.googleapis.com/mini_wordpress/1575825971551-error2.png"})
//         .end(function(err,res){
//           expect(err).to.be.null
//           expect(res).to.have.status(201)
//           done()
//         })
//     })
//     it("delete products should return status 201",function(done){
//       chai.request(app)
//         .delete("/product")
//         .set('id','bla')
//         .send({id:"5dee256817d0ae1c1e3e76db"})
//         .end(function(err,res){
//           expect(req).to.have.header('id')
//           expect(err).to.be.null
//           expect(res).to.have.status(201)
//         })
//     })
//   });
// });
