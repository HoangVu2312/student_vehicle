//---------đây là file authentication: lấy ra email + password + tạo JWT encode------//

const jwt = require("jsonwebtoken")
const { secret_key } = require("../configs/db.config")


const   EXPIRES_IN =  60 * 60 * 6  // 6 tiếng

const generateToken = (payload) => {
     const token = jwt.sign(
        {
            id: payload.id,
            email: payload.email,     // tham số thứ 1: là các property chọn ra từ payload (student)
        },

        secret_key,          // tham số thứ 2: là secrete key (import từ file môi trường)
        {
            expiresIn: EXPIRES_IN   // tham số thứ 3: thời gian hết hạn của token
        },
     )

     return {
        token,
        expiresIn: EXPIRES_IN,
     }
}

module.exports = {
    generateToken,  // export ra cho tranauth.service
}