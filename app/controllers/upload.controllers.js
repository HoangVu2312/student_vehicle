//-----------file controller của upload------------//

const { AppError } = require("../helpers/error");


const upload = () => {
    return (req, res, next) => {
        const file = req.file;
        console.log(file)
        if(!file) {
            next( new AppError(400, "Missing file"))
        }

        // validate loại file và kích thước file.mimetype & file.size

        // tạo url trả về cho client
        file.path = file.path.replace("/\\/g", "/");  // câu lệnh sửa path cho đúng với window
        const url = `http://localhost:3005/${file.path}`
        res.status(200).json(`${url}`)
    }
}

module.exports = {
    upload,
}

