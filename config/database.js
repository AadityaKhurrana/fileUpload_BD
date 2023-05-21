const mongoose=require("mongoose");

require("dotenv").config();
exports.connect=()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(console.log("DB Connected"))
    .catch((err)=>{
        console.log("Db connection error")
        process.exit(1);
    })
}