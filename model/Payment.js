const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    orderId: {
        type: String,
        required: true
    },
    paymentId: {
        type: String,
        required: true
    },
    signatureId: {
        type: String,
        required: true,
        minLength: 6 
    }
}, { timestamps: true }
)

const paymentDb = mongoose.model("Payment", PaymentSchema);

module.exports = paymentDb;
