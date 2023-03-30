const express = require('express');
const paymentController = require('../controller/paymentController');


const router = express.Router();


router.post("/checkout" , paymentController.checkout);
// router.post("/").post(checkout);

router.post("/paymentverification" , paymentController.paymentverification);

router.post("/createorder" , paymentController.createorder);

module.exports = router;