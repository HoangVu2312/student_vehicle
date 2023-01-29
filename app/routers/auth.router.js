// kéo thư viện express vào
const express =  require('express');
const authorization = require('../controllers/middlewares/authorization/authorization');


// tạo biến chứa cả file để export
const authRouter = express.Router();

// import controller của vehicle vào dùng
const authController = require("../controllers/auth.controllers");






// Định nghĩa route cho authenticate 
authRouter.post("/login", authController.login())

// (chỉ có tầng controller => ko có service)  request => middleware authorization => auth.controller
authRouter.get("/profiles", authorization, authController.getProfile())  // lấy profile dựa vào token (ko cần data)



// export cho các files khác sử dụng

module.exports =  authRouter;