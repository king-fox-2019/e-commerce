const {Schema, models, model} = require('mongoose');

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'product name is required'],
  },
  image: {
    type: String,
    default: 'http://placehold.it/900x350',
  },
  price: {
    type: Number,
    required: [true, 'product price is required'],
    validate: {
      validator: function(val) {
        return val < 0 ? false : true;
      },
      message: props => 'product price cant less than 0',
    },
  },
  stock: {
    type: Number,
    required: [true, 'product stock is required'],
    validate: {
      validator: function(val) {
        return val < 0 ? false : true;
      },
      message: props => 'product stock cant less than 0',
    },
  },
});

const Product = model('Product', productSchema);

module.exports = {Product};
