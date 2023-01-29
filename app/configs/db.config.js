// đây lè file lưu cấu hình chung (biến môi trường) (cho student management)
require("dotenv").config()  /// đọc biến evironment

module.exports = {
    HOST: "localhost",
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_HOST,      //  tên database muốn kết nối
    dialect: process.env.DB_DIALECT,
    port: process.env.PORT,   // port của server
    secret_key: process.env.SECRET_KEY,
}