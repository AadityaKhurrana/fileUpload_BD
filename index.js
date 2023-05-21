const express=require("express");
const app=express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

let upload=require("./Routes/fileUpload")
app.use("/api/v1/upload",upload);

//db connection
const db=require("./config/database");
db.connect();

// cloudinary connection
const cloudinary=require('./config/cloudinary');
cloudinary.connects();

app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`);
})