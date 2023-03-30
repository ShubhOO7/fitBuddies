const mongoose = require('mongoose');
const cors = require('cors');

const DB = "mongodb+srv://hackathongfg:fVt1lNut9T5uNpRu@cluster0.1hx1vo4.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(DB , {
    useUnifiedTopology : true ,
    useNewUrlParser : true
}).then(()=>{
    console.log("Connected to the Database");
}).catch(err=>{
    console.log(err);
})