// Đây là middeware định dạng của multer

const multer = require("multer");

const storage = multer.diskStorage({  // luu file vào trong server
    destination: (req, file, cb) => {  // destination: chỗ muốn lưu
        // console.log(req, file)

        // set up thư mục mà file sẽ được lưu vào
        cb(null, "./static/")
    },
    filename: (req, file, cb) => {
        const prefix = Date.now() + '-' + Math.round(Math.random() * 1E9) // in case 2 api cùng tên cùng thời điểm
        cb(null, `${prefix}-${file.originalname}`) 
        
    }
})

const upload = multer({storage})
module.exports = upload;