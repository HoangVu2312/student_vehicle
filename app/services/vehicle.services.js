const {Vehicle, Student} = require("../model/index")
const {AppError} = require("../helpers/error")
const e = require("express")

// -----CRUD-----//
const getList = async () => {
    try {
        const vehicleList = await Vehicle.findAll({
            // custom những cái muốn trả ra
            include: [
                {
                    association: "owner",  // student sở hữu vehicle này
                    attributes: {
                        exclude: ["email", "passWord"] //override lại cái defaultScope của student.model => bỏ qua những property ko cần thiết
                    },
                },
                {
                    association: "studentLikes",  // những thằng student đã like vehicle này
                    attributes: {
                        exclude: ["email", "passWord"] //override lại cái defaultScope của student.model => bỏ qua những property ko cần thiết
                    },

                    through: {
                        attributes: []  // bỏ qua cái bẳng phụ khi query dsach student đã like vehicle này
                    }
                }
            ]
        })
        return vehicleList
    } catch (error) {
        console.error(error)
        throw error
    }
}

const addVehicle = async (vehicle) => {

    try {

        const newVehicle = await Vehicle.create(vehicle)
        return newVehicle;

    } catch(error) {
        throw error;
    }

}


const deleteVehicle = async (vehicleId, requester) => { // requester là student đang thực hiện request xóa
    try {
        const vehicle = await Vehicle.findByPk(vehicleId)

        if(!vehicle) {
            throw new AppError(400, "vehicle not found")
        }

        // check xem requester có phải chủ của vehicle đó ko
        if(vehicle.studentId !== requester.id) {
            throw new AppError(403, "not your vehicle to delete")
        }

        await Vehicle.destroy({where: {id: vehicle.id}})
    } catch  (error) {
        throw error;
    }
}











// code chức năng student like vehile (student nào like vehicle nào)

const studentLikeVehicle = async (studentId, vehicleId) => {
    try {
        //Step1: tìm ra thằng vehicle muốn like
        const vehicle = await Vehicle.findByPk(vehicleId)

        if(!vehicle) {
            throw new AppError(400, "vehicel not found")
        }

        // step2: tìm ra thằng student like
        const student = await Student.findByPk(studentId)

        if(!student) {
            throw new AppError(400, "student not found")
        }

        // console.log(vehicle.__proto__)  // => xem những function được tạo ra từ relationship
         

        // check xem user đó đã like vehicle đó chưa (nếu đã like rồi => unlike)
        const alreadyLiked = await vehicle.hasStudentLike(student.id)

        if(alreadyLiked) {
            await vehicle.removeStudentLike(student.id)
            return true;
        } else {
            await vehicle.addStudentLikes(student.id)  // => thêm vô bảng trung gian
            return false;
        }

    } catch (error) {
        throw error;
    }
}




module.exports = {
    getList,
    addVehicle,
    studentLikeVehicle,
    deleteVehicle,
}