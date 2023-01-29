// đây là file lưu riêng cho table student (model student)
const {DataTypes} = require("sequelize")
// const { sequelize } = require("./index")

const  bcrypt = require("bcrypt") // kéo thư viện mã hóa vào



    
        

    


module.exports = (sequelize) => {
    return sequelize.define (
        "Student",    // Student là tên của model  trong express
            {   // object này chứa những column của table
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncreament: true,    
                },
                fullName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                age: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                className: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: "email",          // mỗi student phải có một email riêng biệt => để true bị lỗi bd
                    validate: {
                        isEmail: {
                            mgs: "invalid email",   // throw cái msg cho mình ko phải user 
    
                        },
                    },
    
                    // customValidator: (value) => {}     => có thể tự custom validator theo ý muốn
                },
                passWord: {
                    type: DataTypes.STRING,
                    allowNull: false,
    
                    // ko được lưu plaintext passWord trực tiếp xuống db  => hash password bằng thư viện bcrypt
                    set(value) {    // ghi đè data từ user trước khi create/updtate/ insert xuống database
                        
                        const salt = bcrypt.genSaltSync()
                        const hashedPassWord = bcrypt.hashSync(value, salt);
    
                        this.setDataValue("passWord", hashedPassWord);   // lưu xuông db bằng cách này
                    }
                },
                role: {
                    type: DataTypes.ENUM("studying", "graduated", "admin"), // EMUN chỉ cho chọn một trong những giá trị đã khai báo
                    defaultValue: "studying",
                },
                avatar: {
                    type: DataTypes.STRING
                }
                
            },
            {
                tableName: "student",   // tên của table trong mySQL workbench
                timestamps: false,   // xóa thông báo tự động
                defaultScope: {
                    attributes: {
                        exclude: ["passWord"],  // bỏ qua column passWord khi tìm kiếm (get các record)
                    }
                },
    
                hooks: // các phương thức tự động chạy sau một hành động (create/update/delete)
                {
                    afterSave: (record) => {
                        delete record.dataValues.passWord; // xóa property passWord sau khi create/ update thành công
                    }
                }
            }
        )
}