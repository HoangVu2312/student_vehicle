//---------------- đây là trang định nghĩa model cho table vehicles---------------//
const {DataTypes} = require("sequelize")


module.exports = (sequelize) => {
    return sequelize.define (
        "Vehicle",    // Student là tên của model  trong express
            {   // object này chứa những column của table
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,    
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                
                description: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    
                },
                studentId: {   // một student có thể có nhiều vehicle
                    type: DataTypes.INTEGER,
                    field: "student_id"
                },
                
                
            },
            {
                tableName: "vehicles",   // tên của table trong mySQL workbench
                timestamps: false,   // xóa thông báo tự động
            }
        )
}