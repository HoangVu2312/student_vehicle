// đây là file đưa data về một chuẩn chung để trả về client
// hàm này được gọi có nghĩa là đã success rồi (demo)


const response = (res, statusCode, payload) => {
    res
       .status(statusCode)
       .json({
          status: "success",
          data: payload
       })
}

module.exports = {
    response,
}