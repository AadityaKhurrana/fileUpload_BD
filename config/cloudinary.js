const cloudinary=require("cloudinary").v2;

require("dotenv").config();
 exports.connects =()=>{
    try{
            // cloudinary.config({
            //     cloud_name: process.env.CLOUD_NAME,
            //     api_key: process.env.API_KEY,
            //     api_secret: process.env.API_SECRET
            // })

            cloudinary.config({
                cloud_name: "dlio7uzdu",
                api_key: "717974267933782",
                api_secret: "s4XhcR31HClRFh-gCgfbRHYHnlg"
              });
        }
        catch(err)
        {
            console.log(error);
        }
 }
