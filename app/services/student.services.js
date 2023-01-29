// đây là file xử lý về mặt dữ liệu - tương tác trực tiếp với model và database trong mySQL
// (trả về data để controller xử lý)

//const { response } = require("express")  // mẫu lỗi
const { AppError } = require("../helpers/error") // hàm xử lý lỗi

// Import table student (connected với mySQL) vô để xử lý

const {Student, Vehicle} = require("../model/index")

 


// function trả về danh sách học sinh
const getList = async () => {

    try {
        const studentList = await Student.findAll({
            include: "vehicles",  // giá trị = as : "vehicles" bên trang index
        })
        return studentList
    } catch (error) {
        throw error;
    }
    
}

// function trả về detail học sinh cần tìm
const getDetail = async (id) => {
    
    try {
        const foundStudent = await Student.findOne({
         where: {id}   // điều kiện
        })
        return foundStudent
    } catch (error) {
        throw error;
    }

}

//function trả về học sinh mới tạo
const addStudent = async (student) => {

    // bắt lỗi trùng email
    try {
        const newStu = await Student.findOne({
            where: {
                email: student.email,
            }
        })

        if (newStu) {  // nếu email đã tồn tại
            throw new AppError("email đã tồn tại")  // những chỗ kiểm tra lỗi về mặt nghiệp vụ => throw AppError
        }

        const newStudent = await Student.create(student)
        return newStudent;

    } catch(error) {
        throw error;
    }

}

// function trả về học sinh mới cập nhật
const studentUpdate = async (id, student) => {
    try {
        const updateStudent = await getDetail(id)

        updateStudent.fullName = student.fullName
        updateStudent.age = student.age
        updateStudent.className = student.className
        const studentUpdated =  await updateStudent.save();
        return  studentUpdated;
    } catch (error) {
        throw error;
    }
     
}

// function trả về học sinh mới bị xóa
const cutStudent = async (id) => {

    try {
        const delStudent = await Student.findOne({
        where: {id}   // điều kiện id: id
        })

        if(!delStudent) {
            throw new AppError(400,"user not found")
        }

        console.log(delStudent)

        await Student.destroy({
           where: {id: delStudent.id}   // điều kiện
        })
                
        return true;
    } catch (error) {
         throw error;
    }


}

module.exports = {
    getList,
    getDetail,
    addStudent,
    studentUpdate,
    cutStudent,
}