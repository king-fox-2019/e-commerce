const assert = require('chai').assert;
const PORT = require('../../bin/server');
const {MONGO_URI} = require('../../bin/mongoose');

// checking port
describe('Server', function () {
    it('Should return 3000', function () {
        assert.equal(PORT, 3000);
    })
});

// checking mongo database
console.log(MONGO_URI);
describe('Mongoose', function () {
    it('Should return MongoDB Atlas URI', function () {
        assert.equal(
            MONGO_URI,
            'mongodb+srv://michael:michaelwp@cluster0-gvisu.gcp.mongodb.net/ecommerce?retryWrites=true&w=majority');
    })
});