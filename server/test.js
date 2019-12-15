const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const app = require('./app')
const expect = chai.expect;

describe('routes product', function(){
    describe('delete product', function(){
        it('product should success deleted', function(done){
            const id = '5df5db09e6abf1396161482e'
            chai.request(app)
                .delete(`/product/${id}`)
                .end(function(req,res){
                    expect(res).to.have.status(200);
                    done()
                })
        })
    })
})
