const { statusCodes } = require("../response/httpStatusCodes");
const { messages } = require("../response/customMesages");
const USERS_DATA = require('../models/userModel.js');
const { verifyToken } = require("../utils/auth");

const createUserService = async (params = {}) => {
    try {
        const User = new USERS_DATA(params)
        const savedUser = await User.save()
        return {
            status: true,
            data: savedUser,
            message: messages.success,
            statusCode: statusCodes.HTTP_OK,
        };
    } catch (error) {
        return {
            status: false,
            statusCode: statusCodes.HTTP_INTERNAL_SERVER_ERROR,
            message: error.message,
            data: [],
        };
    }
}



const getAllUsersService = async () => {
    try {
        const userList = await USERS_DATA.find()
        return {
            status: true,
            data: userList,
            message: messages.success,
            statusCode: statusCodes.HTTP_OK,
        };
    } catch (error) {
        return {
            status: false,
            statusCode: statusCodes.HTTP_INTERNAL_SERVER_ERROR,
            message: error.message,
            data: [],
        };
    }
}

const getUserService = async (id, email) => {
    try {
        const User = await USERS_DATA.findOne(id || email)
        return {
            status: true,
            data: User,
            message: messages.success,
            statusCode: statusCodes.HTTP_OK,
        };

    } catch (error) {
        return {
            status: false,
            statusCode: statusCodes.HTTP_INTERNAL_SERVER_ERROR,
            message: error.message,
            data: [],
        };
    }
}
const getUserNameService = async (obj) => {
    try {
        const User = await USERS_DATA.findOne(obj)
        return {
            status: true,
            data: User,
            message: messages.success,
            statusCode: statusCodes.HTTP_OK,
        };

    } catch (error) {
        return {
            status: false,
            statusCode: statusCodes.HTTP_INTERNAL_SERVER_ERROR,
            message: error.message,
            data: [],
        };
    }
}

const updateUserService = async (params, id) => {
    try {
        const User = await USERS_DATA.findByIdAndUpdate({ _id: id }, { $set: params }, { new: true })
        return {
            status: true,
            data: User,
            message: messages.updated,
            statusCode: statusCodes.HTTP_OK,
        };

    } catch (error) {
        return {
            status: false,
            statusCode: statusCodes.HTTP_INTERNAL_SERVER_ERROR,
            message: error.message,
            data: [],
        };
    }
}

const deleteUserService = async (id) => {
    try {
        const deleteUser = await USERS_DATA.deleteOne({ _id: id })
        return {
            status: true,
            data: deleteUser,
            message: messages.success,
            statusCode: statusCodes.HTTP_OK,
        };
    } catch (error) {
        return {
            status: false,
            statusCode: statusCodes.HTTP_INTERNAL_SERVER_ERROR,
            message: error.message,
            data: [],
        };
    }
}


module.exports = { createUserService, getAllUsersService, getUserService, updateUserService, getUserNameService, deleteUserService }