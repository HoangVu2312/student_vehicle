// đây là middleware check quyên hạn của role trước khi cho sử dụng api (phải đứng sau middleware authorization)

const { AppError } = require("../../../helpers/error");


const requiredRole = (...roles) => {  // ...roles là một Array bao gồm những roles có thể thực hiện một api nào đó
    return (req, res, next) => {
        const { student} = res.locals;

        const isMatched = roles.includes(student.role);

        if(!isMatched) {
            next(new AppError(403, "no permission"))
            return;
        }
        next()
    }
}

module.exports = requiredRole;