// kéo thư viện express vào
const express =  require('express');




// tạo biến chứa cả file để export
const uploadRouter = express.Router();


// định nghĩa router cho upload
const  uploadController = require('../controllers/upload.controllers');
const upload = require('../controllers/middlewares/upload/upload');

uploadRouter.post("/static", upload.single("file") , uploadController.upload())  // file là tên ghi trong key



module.exports =  uploadRouter;