const mongoose=require("mongoose");
const nodeMailer=require('nodemailer')
require("dotenv").config();

const fileSchema= mongoose.Schema({
    name:{
        type:String,
        reqeuired:true
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
})
fileSchema.post("save",async function(doc){
    try{
        console.log("DOC",doc)
        let transporter = nodeMailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        })

        let info=await transporter.sendMail({
            from:`Aaditya Khurrana - 24`,
            to: doc.email,
            subject: "New File Uploaded on Cloudinary",
            html:`<h2>Hello Jee</h2> <p>File Uploaded View here: <a href="${doc.imageUrl}">${doc.imageUrl}</a> </p>`,
        })
        console.log("INFO", info);
    }catch(err){
        console.error(error);
    }
})
module.exports = mongoose.model("File",fileSchema);