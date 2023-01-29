//  đây là file kết nối sequelize với expressjs, khởi tạo models và relationship


const {Sequelize} = require("sequelize");  // Sequelize ở đây là một lớp đối tượng => viết hoa chữ cái đầu

const {DB, HOST, PASSWORD, USER, dialect, port} = require("../configs/db.config");  // import các cấu hình chung chung từ trang db


const sequelize = new Sequelize(DB, USER, PASSWORD, {
    host: HOST,
    dialect: dialect,
    // port: port,
});

// khởi tạo models (tables) cho database
const Student =  require("./student.model")(sequelize) // import student model và truyền param là sequelize
const Vehicle = require("./vehicle.model")(sequelize)
const VehicleLikes = require("./vehicleLikes")(sequelize)

// Định nghĩa relationship giữa các model

// Student 1 - n Vehicle (một student có nhiều vehicle, một vehicle thuộc về một student)
Vehicle.belongsTo(Student, {as: "owner", foreignKey: "studentId"}); //as: "owner" => dùng để include bên trang student.services
Student.hasMany(Vehicle, {as: "vehicles", foreignKey: "studentId"}) 


// Student n - n Vehicle (một student có thể thích nhiều vehicle, một vehicle có thể được thích bời nhiều student)
Student.belongsToMany(Vehicle, {
    as: "vehicleLikes",    // khi query data => hiện ra danh sách vehicle thằng student đó đã like
    through: VehicleLikes, // through là từ khóa thể hiện table trung gian
    foreignKey: "studentId",  // giống với property định nghĩa trong model
});

Vehicle.belongsToMany(Student, {
    as: "studentLikes",    // khi query => hiện ra danh sách những student đã like nhà hàng này
    through: VehicleLikes, // through là từ khóa thể hiện table trung gian
    foreignKey: "vehicleId",  // giống với property định nghĩa trong model

});


 
module.exports = {   
    sequelize,   // export cho file server.js sử dụng
    Student,     // export cho các file service thực hiện các chức năng CRUD
    Vehicle,
} 