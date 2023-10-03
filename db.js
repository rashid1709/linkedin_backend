const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.DB_CONNECT,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log('connected to mongo db');
}).catch((err)=>{
    console.log("error while connecting to mongo db");
    console.log(err);
})

module.exports = mongoose;