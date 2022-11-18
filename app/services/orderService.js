const { statusCodes } = require("../response/httpStatusCodes");
const { messages } = require("../response/customMesages");
const ORDER_DATA = require('../models/orderModel');
const { verifyToken } = require("../utils/auth");

const createOrderService = async (params = {}) => {
    try {
        console.log("par",params)
        const orders = new ORDER_DATA( params )
        const savedUser = await orders.save()
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

const getOrderServices = async () => {
    try {
        const savedUser = await ORDER_DATA.find().sort({ createdAt: -1 }).populate('customer', "name email phone _id").populate('orderItems', "productName brand color model qty category price date  _id").populate('couponID')
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
const getOrderIdServices = async (id) => {
    try {
        const savedUser = await ORDER_DATA.findById({ _id: id })
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
const getOrderCouponServices = async (id) => {
    try {
        const savedUser = await ORDER_DATA.findById({ _id: id }).populate('customer', "name email phone _id").populate('orderItems', "productName brand color model qty category price date  _id").populate('couponID')
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
const getOrdersIDServices = async (id) => {
    try {
        const savedUser = await ORDER_DATA.find({ customer: id} ).populate('customer', "name email phone _id").populate('orderItems.product', "productName brand color model qty category price date  _id")
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
const cancelOrderServices = async (id) => {
    try {
        const savedUser = await ORDER_DATA.findByIdAndUpdate({ _id: id }, { $set: { cancelOrder:true}} , { new: true })
        console.log("cancel>>",savedUser)
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
const findOrderServices = async (id) => {
    try {
        const savedUser = await ORDER_DATA.find(id).populate('customer', "name email phone _id").populate('orderItems.product', "productName brand color model qty category price date  _id")
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
const getSortOrderServices = async () => {
    try {
        const savedUser = await ORDER_DATA.find({}).sort({ createdAt: -1 }).populate('customer', "name email phone -_id").populate('orderItems.product', "productName brand color model qty category price date -_id")
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
const getDateOrderServices = async (search) => {
    try {
        const savedUser = await ORDER_DATA.find({ date: { $regex: search } }).populate('customer', "name email phone -_id").populate('orderItems', "productName brand color model qty category price date  -_id")
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
const getNoProOrderServices = async () => {
    try {
        const savedUser = await ORDER_DATA.find().populate('customer', "name email phone ").populate('orderItems', "productName brand color model qty category price date ")
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



//update order
const updateOrderService = async (params, id) => {
    try {
        const User = await ORDER_DATA.findByIdAndUpdate({ _id: id }, { $set: params }, { new: true })
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


const deleteOrderService = async (id) => {
    try {
        const deleteUser = await ORDER_DATA.deleteOne({_id:id})
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

//user  cancel counts

const orderCancelCountServices = async (req, res) => {
    try {

        let result = await ORDER_DATA.aggregate([
            { $match: { cancelOrder: true } }, {
                $group: {
                    _id: "$customer",
                    totalOrders: { $sum: 1 },
                    lifeTimeAmount: { $sum: "$totalAmount" }}                }
        ])

        return {
            status: true,
            data: result,
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
//user  total ordere counts

const totalOrderServices = async (req, res) => {
    try {

        let result = await ORDER_DATA.aggregate([
            { $match: { cancelOrder: false } }, {
                $group: {
                    _id: "$customer",
                    totalOrders: { $sum: 1 },
                    lifeTimeAmount: { $sum: "$totalAmount" }}                }
        ])

        return {
            status: true,
            data: result,
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

module.exports = { createOrderService, orderCancelCountServices, totalOrderServices,getOrdersIDServices, getOrderServices, cancelOrderServices, findOrderServices, getOrderIdServices, deleteOrderService, updateOrderService, getNoProOrderServices, getDateOrderServices, getOrderCouponServices, getSortOrderServices }