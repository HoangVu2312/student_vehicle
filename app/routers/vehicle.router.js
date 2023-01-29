// kéo thư viện express vào
const express =  require('express');
const authorization = require('../controllers/middlewares/authorization/authorization');
const requiredRole = require('../controllers/middlewares/roles/requiredRole');



// tạo biến chứa cả file để export
const vehicleRouter = express.Router();

// import controller của vehicle vào dùng
const vehicleController = require("../controllers/vehicle.controllers")





// cấu trúc các tuyến đường (tên file chấm tới phương thức)

vehicleRouter.get("/", vehicleController.getVehicleList())  // => ở đây cần gọi hàm
vehicleRouter.post("/", authorization, vehicleController.createVehicle())  // cần authorization để verify token của student trước => sau đó mới cho đăng nhập
vehicleRouter.post("/:vehicleId/like", authorization,vehicleController.likeVehicle()) // ghi là /:vehicleId hay /:id ko quan trọng => quan trọng bóc tách đúng tên ở controller
vehicleRouter.delete("/:vehicleId", authorization, requiredRole("admin"),vehicleController.deleteVehicle()) // chỉ có admin mới có quyền xóa vehicle




// export cho các files khác sử dụng

module.exports =  vehicleRouter;