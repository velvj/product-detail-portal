const { statusCodes } = require("../response/httpStatusCodes");
// const { statusMessage } = require("../response/httpStatusMessages");
const { messages } = require("../response/customMesages");
const COUPON_DATA = require('../models/couponModel');
const { verifyToken } = require("../utils/auth");


const createCouponService = async (params = {}) => {
    try {
        const coupons = new COUPON_DATA(params)
        const savedUser = await coupons.save()
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

const listCouponService = async () => {
    try {
        const savedUser = await COUPON_DATA.find()
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

const findCouponbyIdService = async (id) => {
    try {
        const savedUser = await COUPON_DATA.findById({ _id: id })

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

const updateCouponService = async (params, id) => {
    try {
        const coupons = await COUPON_DATA.findByIdAndUpdate({ _id: id }, { $set: params }, { new: true })
        return {
            status: true,
            data: coupons,
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


module.exports = { createCouponService, listCouponService, findCouponbyIdService, updateCouponService }