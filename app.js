require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
const router = require('./routes/routes.js');
const paymentRouter = require('./routes/paymentRoutes.js');
const { config } = require("dotenv");
config({path  : './config/config.env'});

const cors = require("cors");
const cookiParser = require("cookie-parser");
// import { connectDB } from "./config/database.js";

const port = 8000;


// app.get("/",(req,res)=>{
//     res.status(201).json("server created")
// });

app.use(express.json());
app.use(cookiParser());
app.use(cors());
app.use("/", router);
app.use('/payment' , paymentRouter);

app.get("/payment/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);




app.listen(port,()=>{
    console.log(`Server start at port no : ${port}`);
})
