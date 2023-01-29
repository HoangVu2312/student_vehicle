// đây là middleware check validation


// check rỗng
const checkEmpty = (req, res, next) => {
    const {fullName, age, className} = req.body;

    if (fullName && age && className) {
        next()
    } else {
        res.status(500).send("ko được để rỗng")
    }
}

// check age từ 8-36 tuổi
const checkAge = (req, res, next) => {
    const { age,} = req.body;

    if (age >= 8 && age <= 36) {
        next()
    } else {
        res.status(500).send("tuổi từ 18 - 36")
    }
}

module.exports = {
    checkEmpty,
    checkAge,
}