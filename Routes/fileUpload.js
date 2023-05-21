const express = require("express");
const router = express.Router();

const {localFileUpload,fileUpload,videoUpload,imgReduceUploader} = require("../controller/FileUpload");

//api route
router.post("/localFileUpload",localFileUpload );
router.post("/fileUpload",fileUpload );
router.post("/videoUpload",videoUpload );
router.post("/imageUpload",imgReduceUploader );
module.exports = router;