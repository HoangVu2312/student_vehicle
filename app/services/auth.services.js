// ----- Đây là file check validation của email + password trước khi encode tạo token----------//

const bcrypt = require("bcrypt")  // ko cần {} vì brypt được export default
const { Student } = require("../model");
const { AppError } = require("../helpers/error");
const { generateToken } = require("../helpers/jwt");



const login =async (credentials) => {
    try {
        const {email, passWord} = credentials;
        const studentAccount = await Student.findOne({
            where: {email},  // check xem email có tồn tại ko
            attributes: {include: ["passWord"]},  // thêm cái passWord vô lại để compare
        }) 

        if(!studentAccount) {
            throw new AppError(400,"email invalid")
        }

        // so sánh passWord user nhập với passWord lưu dưới db bằng bcrypt
        const isMatched = bcrypt.compareSync(passWord, studentAccount.passWord); 

        if(!isMatched) {
            throw new AppError(400, "password invalid")
        }
        
        //delete studentAccount.dataValues.passWord; // xóa passWord trước khi trả về thằng student
        //return studentAccount;


        // xử lý token
        return generateToken(studentAccount)

    } catch (error) {
        throw error;
    }
}

module.exports = {
    login,  // export lên thằng auth.controller
}