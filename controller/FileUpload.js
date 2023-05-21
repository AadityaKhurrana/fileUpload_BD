const File=require('../model/File')
const cloudinary=require("cloudinary").v2

exports.localFileUpload =async (req,res)=>{
    try{
            // fetching file
            const file=req.files.file;
            console.log(file)
            // path creation
            const path= __dirname+ "/files/" + Date.now() + `.${file.name.split(".")[1]}`;

            // move file on path
            file.mv(path ,(err)=>{
                console.log(err);
            })

            res.status(200).json(
                {
                    success:true,
                    message:"File added"
                }
            )
    }catch(err){
        console.log("Not able to upload the file on server")
        console.log(err);
    }
}

function isSupportedFormat(formats,currFormat)
{
    return formats.includes(currFormat);
}
async function uploadFileToCloudinary(file, folder, quality) {
    const options = {folder};
    if(quality)
    {
        options.quality=quality;
    }
    console.log("temp file path", file.tempFilePath);
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.fileUpload =async (req,res)=>{
        try{
                const {name,tags,email} =req.body;
                console.log(name,email,tags);

                const file=req.files.file;
                console.log(file);

                const formats=["jpg","jpeg","png"];
                const currFormat=file.name.split(".")[1].toLowerCase();

                if(!isSupportedFormat(formats,currFormat)){
                    res.status(401).json({
                        success:false,
                        message:"Invalid Image Format"
                    })
                }

                // upload
                console.log("upload")
                const response= await uploadFileToCloudinary(file,"babbar");
                console.log(response)

               // db entry
               const fileData=await File.create({
                name,
                email,
                tags,
                imageUrl:response.secure_url
            });

                res.status(200).json({
                    success:true,
                    message:"Data uploaded successfully",
                    data:fileData
                })
        }
        catch(err){
            res.status(400).json({
                success:false,
                message:"Data not uploaded",
            })
        }
    }

    //video upload ka handler
exports.videoUpload =async (req,res) =>{
    try{
            const {name,tags,email}=req.body;
            const file=req.files.file;

            console.log(name, tags ,email);
            console.log(file)

            const formats=["mp4","mkv","mov"];
            const currFormat=file.name.split(".")[1].toLowerCase();

            if(!isSupportedFormat(formats,currFormat)){
                res.status(401).json({
                    success:false,
                    message:"Invalid Image Format"
                })
            }

             // upload
             console.log("upload")
             const response= await uploadFileToCloudinary(file,"babbar");
             console.log(response)

            // db entry
            const fileData=await File.create({
                name,
                email,
                tags,
                videoUrl:response.secure_url
            });

             res.status(200).json({
                 success:true,
                 message:"Data uploaded successfully",
                 data:fileData
             })



    }
    catch(err){
        res.status(400).json({
            success:false,
            message:"Data not uploaded",
        })
    }

}

// image size reducer and then upload
exports.imgReduceUploader = async (req,res) =>{
    try{

        const file=req.files.file;
        const {name,tags,email}=req.body;

        const extension=file.name.split(".")[1];
        const supported=["jpg","jpeg","png"];

        if(!isSupportedFormat(supported,extension))
        {
            res.status(401).json({
                success:false,
                message:"Invalid Image Format"
            })
        }

        console.log("upload")
        const response= await uploadFileToCloudinary(file,"babbar",80);
        console.log(response)

        const fileData=await File.create({
            name,
            email,
            tags,
            imageUrl:response.secure_url
        });

        console.log("done")
        res.status(200).json({
            success:true,
            message:"Data uploaded successfully",
            data:fileData
        })



    }
    catch(err){
        res.status(400).json({
            success:false,
            message:"Data not uploaded",
        })
    }
}