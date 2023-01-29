const express = require('express');
const { port } = require('./configs/db.config');
const authorization = require('./controllers/middlewares/authorization/authorization');
const {AppError, handleErrors } = require('./helpers/error');  // import file xử lý lỗi
const { sequelize } = require('./model/index');
const app = express();
//port

// import file router
const router = require("./routers/root.router")

    



// middleware built in của express
 app.use(express.json()) // ép request và respond về dạng json để tiện thao tác

 app.use(express.static("."))  // định dạng static file ko phải json

 //câu này phải để dưới express.json => mới có thể áp dụng json lên các router
 app.use(router) // sử dụng file router (mặc dù tên file là server nhưng đây là file chính nên vẫn dùng app.use)






// http://localhost/3005
app.get('/', (req, res) => {    // trang home
  res.send('Hello everybody!');
});


// set up middleware bắt và xử lý trả lỗi ra cho client (đặt bên dưới router)
app.get("/error", (req, res, next) => {
  throw new AppError(500, "Internal server")
})

app.use(handleErrors)  // mọi request đều đi qua middleware này







app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});



// set up sequelize
// const {sequelize} = require("./model");
sequelize.sync({alter: true});



