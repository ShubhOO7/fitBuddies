const jwt = require("jsonwebtoken");
const userdb = require("../model/User");
const keysecret = 'mySecretKey';


const authenticate = async(req,res,next)=>{

    try {
        const token = req.headers.authorization;
        
        const verifytoken = jwt.verify(token,keysecret);
        console.log("verifyToken : " );
        console.log( verifytoken);
        console.log("token ID : " + verifytoken.id);
        
        const rootUser = await userdb.findOne({email :verifytoken.email});
        console.log(rootUser);
        if(!rootUser) {throw new Error("user not found")}

        req.token = token
        req.rootUser = rootUser
        req.userId = rootUser._id

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({status:401,message:"Unauthorized no token provide"})
    }
}


module.exports = authenticate;



// const auth = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     const isCustomAuth = token.length < 500;

//     let decodedData;

//     if (token && isCustomAuth) {      
//       decodedData = jwt.verify(token, secret);

//       req.userId = decodedData?.id;
//     } else {
//       decodedData = jwt.decode(token);

//       req.userId = decodedData?.sub;
//     }    

//     next();
//   } catch (error) {
//     console.log(error);
//   }
// };



// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// import UserModal from "../models/user.js";

// const secret = 'test';

// export const signin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const oldUser = await UserModal.findOne({ email });

//     if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

//     const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

//     if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

//     res.status(200).json({ result: oldUser, token });
//   } catch (err) {
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };

// export const signup = async (req, res) => {
//   const { email, password, firstName, lastName } = req.body;

//   try {
//     const oldUser = await UserModal.findOne({ email });

//     if (oldUser) return res.status(400).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 12);

//     const result = await UserModal.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

//     const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );

//     res.status(201).json({ result, token });
//   } catch (error) {
//     res.status(500).json({ message: "Something went wrong" });
    
//     console.log(error);
//   }
// };