const bcrypt = require('bcryptjs');
const { sendErrorResponse, sendSuccessResponse } = require('../response/response');
const { getAllUsersService, getUserService, createUserService, updateUserService, deleteUserService } = require('../services/userService')
const { generateToken } = require('../utils/auth');

//registration users
const registration = async (req, res) => {
    const hashing = await bcrypt.hash(req.body.password, 10)
    const params = req.body;
    params.password = hashing;
    const result = await createUserService({ ...params });
    if (!result.status) {
        return sendErrorResponse(
            req,
            res,
            result.statusCode,
            result.message, []
        );
    } else {
        return sendSuccessResponse(
            req,
            res,
            result.statusCode,
            result.message, { data: result.data }
        );
    }
}


const logedin = async (req, res) => {
    const { username, password } = req.body;
    const result = await getUserService({ username });
    if (!result.status) {
        return sendErrorResponse(
            req,
            res,
            statusCodes.HTTP_NOT_FOUND,
            messages.dataNotFound, []
        );
    } else {
        let output = bcrypt.compare(password, result.data.password)
        if (output) {
            const token = generateToken(result.data._id);
            return sendSuccessResponse(
                req,
                res,
                result.statusCode,
                result.message, { token }
            );
        }
        else {
            return sendErrorResponse(
                req,
                res,
                400,
                "Password didnot match", []
            );
        }
    }
};



//get user list 
const getUserlist = async (req, res) => {
    const result = await getAllUsersService();
    if (!result.status) {
        return sendErrorResponse(
            req,
            res,
            result.statusCode,
            result.message, []
        );
    } else {
        return sendSuccessResponse(
            req,
            res,
            result.statusCode,
            result.message,
            result.data
        );
    };
}

const getUserById = async (req, res) => {
    const params = req.params;
    const result = await getUserService(params );
    if (!result.status)
        return sendErrorResponse(
            req,
            res,
            result.statusCode,
            result.message, []
        );
    return sendSuccessResponse(
        req,
        res,
        result.statusCode,
        result.message,
        result.data
    );
}


//update
const updateUser = async (req, res) => {
    const { ...params } = req.body;
    const { id } = req.params;
    const result = await updateUserService(params, id);
    if (!result.status) {
        return sendErrorResponse(
            req,
            res,
            result.statusCode,
            result.message, []
        );
    } else {
        return sendSuccessResponse(
            req,
            res,
            result.statusCode,
            result.message,
            result.data
        );
    }
};


const deleteUser = async (req, res) => {
    try {
        let id = req.params.id
        if (!id) { return res.status(400).json({ error: "no id found" }) }
        let delproduct = await deleteUserService(id)
        return res.status(200).send({ status: 200, message: "product deleted successfully", data: delproduct })
    } catch (err) {
        res.status(400).send({ status: 400, message: err.message || err })
    }
}



module.exports = {
    registration, logedin, getUserlist, getUserById, updateUser,deleteUser
}