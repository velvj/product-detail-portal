const { getUserNameService } = require('../services/userService')

const isAdmin = async (req, res, next) => {
    try {
        let ID = req.user.id
        const adminExists = await getUserNameService(ID)
        if (adminExists.data.admin === false) {
            return next(res.status(401).send({ status: 401, message: "user not a admin" }));
        }
        next()
    } catch (err) {
        if (err)
            err.status = res.status(403).json({ status: 403, message: err.message || err })
        next(err)

    }

}

module.exports = { isAdmin }