// đây là file xử lý để trả ra token hoặc data của student tùy theo request



// Login là POST: /login + body: {email, passWord}
const authService = require("../services/auth.services")



const login = () => {
    return async (req, res, next) => {
        try {
            const credentials = req.body
            const student = await authService.login(credentials)  // => trả ra một chuỗi token đã encode
            res.status(200).json({data: student});
        } catch (error) {
            next(error)   // chuyển tiếp cái lỗi xuống middleware errorHandler để xử lý
        }
    }
}

const getProfile = () => {  // trả về thông tin dựa theo token (ko phải email hay password)
    return (req, res, next) => {
        try {
            const {student} = res.locals;  // bóc tách data được lưu ở res.locals
            res.status(200).json(student)
            
          } catch (error) {
            next(error);  // lỗi ko xác định => handleErrors
          }
    }
}
module.exports = {
    login,
    getProfile,
}