const express = require('express');
const User = require("../model/User");
const router = express.Router();
const userController = require('../controller/userController');
const commentController = require('../controller/commentController');
const cartController = require('../controller/cartController');
const authenticate = require('../middleware/authenticate');

//Register route
router.post("/", userController.addUser);
//Login route
router.post("/login", userController.getUser);
//Validate User 
router.get("/validateUser", authenticate ,userController.getValidUser );


router.post("/addcomment", commentController.addComment);
router.get("/comment", commentController.getComment);
router.put("/updatelikes/:id", commentController.updateLikes);
router.get("/:email", userController.getUser);
router.get("/:name", userController.findUser);


router.post("/addToCart" , cartController.addToCart);
router.post("/getCart" , cartController.getCart);
router.post("/updateCart" , cartController.updateCart);
router.post("/deleteCart" , cartController.DeleteFromCart);

module.exports = router;
