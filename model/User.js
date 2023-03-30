const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const secretKey = 'mySecretKey';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6 
    },
    cpassword: {
        type: String,
        required: true,
        minLength: 6 
    },
    tokens: [
        {
            token:{
                type: String,
                required: true
            }
        }
    ]
}, { timestamps: true }
)
// hash password



// token generate
userSchema.methods.generateAuthtoken = async function () {
    try {
        let token23 = jwt.sign({email : this.email , password : this.password}, secretKey, {
            expiresIn: "1d"
        });
        console.log(token23);
        this.tokens = this.tokens.concat({ token: token23 });
        await this.save();
        return token23;
    } catch (error) {
        // res.status(422).json(error)
    }
}


const userDb = new mongoose.model('User', userSchema);

module.exports = userDb;