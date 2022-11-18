const { statusCodes } = require("../response/httpStatusCodes");
// const { statusMessage } = require("../response/httpStatusMessages");
const { messages } = require("../response/customMesages");
const PRODUCT_DATA = require('../models/productModel');
const { verifyToken } = require("../utils/auth");

const createProductService = async (params = {}) => {
    try {
        const products = new PRODUCT_DATA(params)
        const savedUser = await products.save()
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
const productExistsService = async (proName, mod) => {
    try {
        const savedUser = await PRODUCT_DATA.findOne({

            $or: [{ productName: proName },
            { model: mod }]
        }
        );
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


const uploadProductService = async (id) => {
    try {
        const savedUser = await PRODUCT_DATA.findOneAndUpdate({ productID: id.productID },
            {
                $set: {
                    productName: id.productName,
                    brand: id.brand,
                    model: id.model,
                    category: id.category,
                    price: id.price,
                    date: id.date,
                    color: id.color,
                    qty: id.qty
                }
            }, { upsert: true, new: true })
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

const listProductService = async () => {
    try {
        const savedUser = await PRODUCT_DATA.find().sort({ createdAt: -1 }).select(['-createdAt', '-updatedAt', '-__v'])
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
const findUserbyIdService = async (id) => {
    try {
        const savedUser = await PRODUCT_DATA.findById({ _id: id })
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
const deleteProductService = async (id) => {
    try {
        const deleteUser = await PRODUCT_DATA.deleteOne({ _id: id })
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

//update products
const updateProductService = async (params, id) => {
    try {
        const products = await PRODUCT_DATA.findByIdAndUpdate({ _id: id }, { $set: params }, { new: true })
        return {
            status: true,
            data: products,
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



module.exports = {
    createProductService, uploadProductService, productExistsService, listProductService, findUserbyIdService, updateProductService, deleteProductService
}