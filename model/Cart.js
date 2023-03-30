const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const secretKey = 'mySecretKey';
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: String,
    price: Number , 
    description: String,
    quantity: Number ,
    img : String,
    link : String
  });

const listSchema = new Schema({
    id : Number,
    items: [itemSchema]
  });

const cartSchema = new Schema({
    email : String,
    list: [listSchema]
}, { timestamps: true }
)

const cartDb = new mongoose.model('cart', cartSchema);

module.exports = cartDb;