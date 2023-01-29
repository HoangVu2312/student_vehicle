//---------Đây là file middleware verify token -------------//

const jwt = require("jsonwebtoken")

const { AppError } = require("../../../helpers/error");
const { Student } = require("../../../model");

const extractTokenFromHeader = (headers) => {
    const bearerToken = headers.authorization;
    const parts = bearerToken.split(" ")  // ["Bearer", "abcxyz"] => định dạng của token ở header

    if (parts.length !== 2 || parts[0] !== "Bearer" || !parts[1].trim()) {
        throw new AppError(401, "Invalid token")    // lỗi sai token
    }

    return parts[1];   // trả về phần token đã được tách khỏi Bearer
}

const authorization = async (req, res, next) => {
    try {
        const token = extractTokenFromHeader(req.headers); // truyền data từ headers
        const payload = jwt.verify(token, "Jurassicpark2022");  // lấy token đã bóc tách & secret key verify 
        
        // dùng id có được từ payload
        const student = await Student.findByPk(payload.id)
        if(!student) {
            next(new AppError(401, "Invalid token"))   // vì là hàm async => nên dùng next()
        }

        
        // Lưu thông tin student vào res.local => có thể truy cập ở middleware/controller tiếp theo
        res.locals.student = student;


        next()
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {  // sai token
            next(new AppError(401, "Invalid token"))   // chuyển về middleware errorhandler
        }
        next(error)  
    }
}

module.exports = authorization;  // export ra file server demo thử