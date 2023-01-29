//----------- đây là trang định nghĩa table trung gian--------------//
const {DataTypes, Sequelize} = require("sequelize")


module.exports = (sequelize) => {
    return sequelize.define (
        "VehicleLikes",    // Student là tên của model  trong express
            {   // object này chứa những column của table
                studentId: {
                    type: DataTypes.INTEGER,
                    field: "student_id"
                },
                vehicleId: {
                    type: DataTypes.INTEGER,
                    field: "vehicle_id",
                },       
                createdAt: {
                    type: DataTypes.DATE,
                    field: "created_at",
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                } 
            },
            {
                tableName: "vehicle_likes",   // tên của table trong mySQL workbench
                timestamps: false,   // xóa thông báo tự động
            }
        )
}