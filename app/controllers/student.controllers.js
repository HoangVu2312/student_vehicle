// import file service vào sử dụng

const {getList, getDetail, addStudent, studentUpdate, cutStudent} = require("../services/student.services")


// ------------tạo controller cho từng chức năng để export----------//

// lấy danh sách học sinh
const getStudentList = () => {
    return async (req, res, next) => {
        try {
            const studentList = await getList()   // function chỉ để trả về data
            res.status(200).json({data: studentList})
        } catch (error) {
            next(error)   // chuyển tiếp cái lỗi xuống middleware errorHandler để xử lý
        }
    }
     
}


// lấy học sinh chi tiết
const getStudentDetail =  () => {
    
    return async (req, res, next) => {
        try {
            const {id} = req.params
            const studentDetail = await getDetail(id)
            res.status(200).json({data: studentDetail});
        } catch (error) {
            next(error)   // chuyển tiếp cái lỗi xuống middleware errorHandler để xử lý
        }
    }
    
}

// thêm mới học sinh
const createStudent = () => {
    return async (req, res, next) => {
        try {
            const newStudent = req.body
            const addedStudent = await addStudent(newStudent)  // addStudent là hàm bất đồng bộ
            res.status(200).json({data: addedStudent});
        } catch (error) {
            next(error)   // chuyển tiếp cái lỗi xuống middleware errorHandler để xử lý
        }
    }
    
}

// cập nhật học sinh
const updateStudent = () => {
    return async (req, res, next) => {
        try {
            const {id} = req.params //  tạo biến chứa id cập nhật của học sinh người dùng nhập vào thanh url
            const student = req.body

            const updatedStudent = await studentUpdate(id, student)
            res.status(200).json({data: updatedStudent});
        } catch (error) {
            next(error)   // chuyển tiếp cái lỗi xuống middleware errorHandler để xử lý
        }
    }
    
    
}

// Xóa học sinh
const deleteStudent = () => {
    return async (req, res, next) => {
        try {
            const {id} = req.params //  tạo biến chứa id của học sinh người dùng nhập vào thanh url
            console.log(id)
            await cutStudent(id)

            if (cutStudent(id)) {
                res.status(204).json({id});
            }
            
            
        } catch (error) {
            next(error)   // chuyển tiếp cái lỗi xuống middleware errorHandler để xử lý
        }
    }
    
}


// export nhiều controllers cho các file khác sử dụng (chủ yếu là file router)
module.exports = {
    getStudentList,
    getStudentDetail,
    createStudent,
    updateStudent,
    deleteStudent,
}
