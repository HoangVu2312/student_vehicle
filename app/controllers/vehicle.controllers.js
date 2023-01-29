// ------------tạo controller cho từng chức năng để export----------//

// import cách 2: khác bên student.controller
const vehicleService = require("../services/vehicle.services")


//-------------CRUD-----------//
// lấy danh sách vehicle
const getVehicleList = () => {
    return async (req, res, next) => {
        try {
            const vehicleList = await vehicleService.getList()
            res.status(200).json({data: vehicleList})
        } catch (error) {
            next(error)   // chuyển tiếp cái lỗi xuống middleware errorHandler để xử lý
        }
    }
     
}

// create vehicle
const createVehicle = () => {
    return async (req, res, next) => {
        try {

            // trước khi create => xác nhận student đã được lưu mới cho tạo mới
            const {student} = res.locals;  // lấy token để biết thằng student nào đang create
            const newVehicle = req.body
            newVehicle.studentId = student.id;  // cái vehicle mới đc tạo này thuộc sỡ hữu của th student mới lấy ra từ token


            const addedVehicle = await vehicleService.addVehicle(newVehicle)  // addStudent là hàm bất đồng bộ
            res.status(200).json({data: addedVehicle});
        } catch (error) {
            next(error)   // chuyển tiếp cái lỗi xuống middleware errorHandler để xử lý
        }
    }
    
}

// Delete vehicle
const deleteVehicle = () => {
    return async (req, res, next) => {
        try {
            const {vehicleId} = req.params;   // id ở đây là của vehicle => phải ghi đúng với property mới lấy ra được
            
            const {student} = res.locals;
            console.log(vehicleId, student)
            await vehicleService.deleteVehicle(vehicleId, student)
            res.status(200).json("deleted")
        } catch (error) {
            next(error)
        }
    }
}



//student like vehicle => url : localhost:3005/vehicles/:vehicleId/like 
const likeVehicle = () => { 
    return async (req, res, next) => {
        try {
            
            const {vehicleId} = req.params //lấy id của vehicle từ params
            const {studentId} = res.locals.id   // Lấy id của student từ token của student đó
            const studentLike = await vehicleService.studentLikeVehicle(studentId, vehicleId)
            
            if (studentLike) {
                res.status(200).json("Unliked")
            } else {
                res.status(200).json("liked")
            }

        } catch (error) {
            next(error)   // chuyển tiếp cái lỗi xuống middleware errorHandler để xử lý
        }
    }
}

module.exports = {
    getVehicleList,
    createVehicle,
    deleteVehicle,
    likeVehicle,
}