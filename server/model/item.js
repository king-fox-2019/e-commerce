const {model, models, Schema} = require('mongoose');

const itemSchema = new Schema({
    name: {
        type: String,
        required: "Name is required"
    },
    stock: {
        type: Number
    },
    price: {
        type: Number,
        required: "Price is required"
    },
    image: {
        type: String
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    description: {
        type: String
    }
});

const Item = model('Item', itemSchema);

module.exports = Item;

