//-------------- đây là file xử lý lỗi cuoi cùng để trả ra cho người dùng ------------------//


// Tạo một lớp đối tượng (instance ) từ class Error có sẵn
class AppError extends Error {   // Error là một lớp đối tượng có sẵn của nodejs
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}


// Thiết kế hàm xử lý lỗi
const handleErrors = (err, req, res, next) => {
    console.log(err)
    // check xem err có phải là instance của AppError => 
    if (!(err instanceof AppError)) {
        // Nếu là những lỗi ko phải instance của AppError (maybe lỗi từ server)
        const error =  new AppError(500, "Internal Server")
    }

    // nếu đúng (maybe lỗi từ user)  => xử lý
    const {message, statusCode} = err;    // err ở đây là instance của AppError => có thể bóc tách các thuộc tính bên trong
    res.status(statusCode).json({
        status: "error",
        message: message,
    })

    next() // phòng trường hợp có các middleware phía sau
}

// export class lỗi tự thiết kế cộng với hàm xử lý lỗi (chủ yếu cho file gốc ngoài cùng)
module.exports = {
    AppError,
    handleErrors,
}




