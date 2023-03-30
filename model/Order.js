const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    orderId: {
        type: String,
        required: true
    },
    product_id: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    product_name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    }
}, { timestamps: true }
)

const orderDb = mongoose.model("Payment", OrderSchema);

module.exports = orderDb;