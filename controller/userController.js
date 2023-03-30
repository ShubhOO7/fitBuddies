const Comment = require("../model/Comment");
const User = require("../model/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require("cookie-parser");

const secretKey = 'mySecretKey';

const findUser = async (req, res) => {
    let user;
    const name = req.params.name;
    try {
        user = await User.find({ name: name });
    } catch (err) {
        console.log(err);
    }
    if (user) {
        return res.status(404).json({ message: "User already exists with that name" })
    }
}

const addUser = async (req, res) => {
    // console.log(req.body);
    
    const { fname, email, password, cpassword } = req.body;

    if (!fname || !email || !password || !cpassword) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {

        const preuser = await User.findOne({ email: email });
        // console.log(preuser);

        if (preuser) {
            res.status(422).json({ status: 422 , error: "This Email is Already Exist" })
        } else if (password !== cpassword) {
            res.status(422).json({status: 422, error: "Password and Confirm Password Not Match" })
        } else {
            

            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);
            const hashedCPassword = bcrypt.hashSync(cpassword, salt);
            // here password hasing
            // console.log(req.body);

            const finalUser = new User({
                name : fname, email, password : hashedPassword, cpassword : hashedCPassword
            });

            const storeData = await finalUser.save();

            // console.log(storeData);
            res.status(201).json({ status: 201, storeData })
        }

    } catch (error) {
        res.status(422).json(error);
        console.log(error);
        console.log("catch block error");
    }
}

const getUser = async (req, res) => {
    // console.log(req.body);
    // const { email, password } = req.body;

    // if (!email || !password) {
    //     res.status(422).json({ error: "Fill all the details" })
    // }

    // try {
    //    const userValid = await User.findOne({email:email});

    //     if(userValid){

    //         const isMatch = await bcrypt.compare(password,userValid.password);

    //         if(!isMatch){
    //             res.status(422).json({status: 422 , error: "Invalid Email or Password"})
    //         }else{

    //             // token generate
    //             const token = await userValid.generateAuthtoken();
    //             console.log(token);

    //             // cookiegenerate
    //             res.cookie("usercookie",token,{
    //                 expires:new Date(Date.now()+9000000),
    //                 httpOnly:true,
    //             });

    //             const result = {
    //                 userValid,
    //                 token
    //             }
    //             res.status(201).json({status:201,result})
    //         }
    //     }

    // } catch (error) {
    //     res.status(401).json(error);
    //     console.log(error);
    //     console.log("catch block of User Controller");
    // }
     // console.log(req.body);

     const { email, password } = req.body;

     if (!email || !password) {
         res.status(422).json({ error: "fill all the details" })
     }
 
     try {
        const userValid = await User.findOne({email:email});
        // console.log(userValid);
 
         if(userValid){
 
             const isMatch = await bcrypt.compare(password,userValid.password);
 
             if(!isMatch){
                 res.status(422).json({ error: "invalid details"})
             }else{

                const token = jwt.sign( { email , password }, secretKey, { expiresIn: "1h" } );

                //  token generate
                //  const token = await userValid.generateAuthtoken();
                userValid.tokens.push({ token : token });

                // Save the user document with the new element value
                userValid.save();

                // console.log("token:", token)
                const result = {
                     userValid,
                     token
                 }
                 res.status(201).json({status:201,result});
             }
         }else{
            res.status(422).json({status:422,error: "User not registered! Kindly register"});
         }
 
     } catch (error) {
         res.status(401).json(error);
         console.log(error);
         console.log("catch block of User Controller");
     }
}

const getValidUser = async(req, res) => {
    try {
        const ValidUserOne = await User.findOne({_id:req.userId});
        res.status(201).json({status:201,ValidUserOne});
    } catch (error) {
        res.status(401).json({status:401,error});
    }
}


exports.getValidUser = getValidUser ;
exports.getUser = getUser;
exports.findUser = findUser;
exports.addUser = addUser;
