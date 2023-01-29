// kéo thư viện express vào
const express =  require('express');
const requiredRole = require('../controllers/middlewares/roles/requiredRole');

// import middleware check validation
const {checkEmpty, checkAge} = require("../controllers/middlewares/validation/student.validation")

// tạo biến chứa cả file để export
const studentRouter = express.Router();

// import controller của student vào dùng
const {getStudentList, getStudentDetail, createStudent, updateStudent, deleteStudent} = require("../controllers/student.controllers")





// cấu trúc các tuyến đường (tên file chấm tới phương thức)

studentRouter.get("/", getStudentList())  // => ở đây cần gọi hàm

// lấy thông tin chi tiết từng học sinh url = http://localhost:3005/students/id
studentRouter.get("/:id", getStudentDetail())


// thêm mới học sinh
studentRouter.post("/", checkEmpty, checkAge,createStudent())  // hàm checkAge với checkEmpty là middleware sẽ đc auto chạy bằng hàm next()

// cập nhật học sinh
studentRouter.put("/:id", checkEmpty, checkAge,updateStudent())

// xóa học sinh
studentRouter.delete("/:id", deleteStudent())  // chỉ có admin mới có thể xóa học sinh


// export cho các files khác sử dụng

module.exports =  studentRouter;