// import { instance } from "../server.js";
const { config } = require("dotenv");
config({path  : './config/config.env'});
const crypto = require("crypto");
const Payment = require("../model/Payment");
// const Cart = require("../model/Cart");
const Razorpay = require("razorpay");


// console.log(process.env.RAZORPAY_API_KEY);

const checkout = async (req, res) => {
    const instance = new Razorpay({
            key_id: "rzp_test_dm7D6el7jJFB5q",
            key_secret: "81lzN21ZbQRxmN4trt3Rn6WC",
        });
    const options = {
      amount: Number(req.body.amt *  100), 
      currency: "INR",
    };
    const order = await instance.orders.create(options);
      
    //   console.log(order);
    
      res.status(200).json({
        success: true,
        order,
      });
    };

    


const paymentverification = async (req, res) => {
    // console.log("content : ");
    // console.log(req.body);

    res.status(200).json({
        success: true,
    });
  const { orderId, paymentId, signatureId } = req.body;
  const body = orderId + "|" + paymentId;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET_KEY)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === signatureId;

  if (isAuthentic) {
    // Database comes here
    // console.log("authentic hai");
    await Payment.create({
      orderId,
      paymentId,
      signatureId,
    });
  } else {
    res.status(400).json({
        success: false,
      });
  }
};

const createorder = async (req, res) => {
    // console.log(req.body);
}
exports.paymentverification = paymentverification;
exports.checkout = checkout ;
exports.createorder = createorder;