// ------------------------------------------------------------ Đây là file gốc của thư mục router -----------------------------------------------------//


// kéo thư viện express vào
const express =  require('express');

// tạo biến chứa cả file để export
const router = express.Router();

// import router của student vào
const studentRouter = require('./student.router');

// chỉnh lại url => url = http://localhost:3005/students
router.use("/students",studentRouter);  // sử dụng studentRouter



// import router của vehicle vào
const vehicleRouter = require("./vehicle.router")
router.use("/vehicles", vehicleRouter)



//import router của authenticate
const authRouter = require("./auth.router");
router.use("/", authRouter)

//import router của upload
const uploadRouter = require('./upload.router');
router.use("/upload", uploadRouter)



// export cho file khác sử dụng cái router gốc này
module.exports = router; 