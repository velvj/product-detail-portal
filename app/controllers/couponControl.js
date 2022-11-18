const { createCouponService, listCouponService, findCouponbyIdService, updateCouponService } = require('../services/couponService')
const { sendErrorResponse, sendSuccessResponse } = require('../response/response');


//create coupon
const createCoupon = async (req, res) => {
    const params = req.body;
    const result = await createCouponService({ ...params });
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


//get coupons

const getcoupon = async (req, res) => {
    const result = await listCouponService()
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


//getBy id coupons

const getbyID = async (req, res) => {
    const id = req.params.id
    const result = await findCouponbyIdService(id)
    const lastDate = new Date(result.data.endDate);
    let currentDate = new Date();
    if (currentDate > lastDate) {
        return res.status(200).send({ status: 200, message: "Date is expired", data: `${lastDate} nxt ${currentDate}` })
    } else {
        return res.status(200).send({ status: 200, message: "date not expired", data: `Valid till ${lastDate}` })
    }
}

//update coupon
const updateCoupon = async (req, res) => {
    const { ...params } = req.body;
    const { id } = req.params;
    const result = await updateCouponService(params, id);
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

//delete coupon

const deleteCoupon = async (req, res) => {
    if (!req.params.id) { return res.status(400).json({ error: "no id found" }) }
    let result = couponsData.deleteOne(req.params.id)
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
}



module.exports = { createCoupon, getcoupon, getbyID, updateCoupon, deleteCoupon }





