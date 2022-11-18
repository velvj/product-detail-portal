const { sendErrorResponse, sendSuccessResponse } = require('../response/response');
const { createOrderService, getOrdersIDServices, orderCancelCountServices, totalOrderServices, findOrderServices, cancelOrderServices, getOrderServices, deleteOrderService, getOrderIdServices, updateOrderService, getOrderCouponServices, getNoProOrderServices, getDateOrderServices, getSortOrderServices } = require('../services/orderService')
const { getUserNameService } = require('../services/userService')
const { findUserbyIdService } = require('../services/productService')



//create orders
const createOrder = async (req, res) => {
    var id = req.body.orderItems;
    let mydata = []
    let obj = await id.map(async (elem) => {
        const checkId = await findUserbyIdService(elem)
        return checkId;
    })
    mydata = await Promise.all(obj).then((values) => {
        return values;
    });
    let red = mydata.map((e) => {
        return e.data.price
    })
    const price = await red.reduce((pre, curr) => {
        console.log("ff>>", pre + curr)
        pre = pre + curr;
        console.log("oo>>", pre)
        return pre

    }, 0)
    const params = req.body;
    const result = await createOrderService({ ...params, "totalAmount": price });
    // let result = await orderDatas.populate(output, { path: "couponID" })
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

//find All Order Details
const getorder = async (req, res) => {
    let o = {}
    if (req.query.search) {
        o = { name: req.query.search }
        let customerId = await getUserNameService(o)
        o = { customer: { $in: customerId.data._id } }
    }
    else if (!req.query.search) {
        let finalData = await getOrderServices()
        return res.status(200).send({ status: 200, message: "order listed successfully", data: finalData })
    }
    const result = await findOrderServices(o)
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

//get by id
const getID = async (req, res) => {
    const ID = req.params.id
    if (!ID.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ status: 400, message: "Order ID not found" })
    }
    let getproduct = await getOrderIdServices(ID)
    if (!getproduct.data.couponID) {
        return res.status(200).send({ status: 200, message: "Discount Percentage Data", data: getproduct })
    } else {
        const getproduct = await getOrderCouponServices(ID)
        const lastDate = new Date(getproduct.data.couponID.endDate);
        let currentDate = new Date();
        if ((lastDate >= currentDate) && (getproduct.data.couponID.couponStatus)) {
            if (getproduct.data.couponID.type === "discount%") {
                var getDiscount = await getproduct.data.totalAmount - (getproduct.data.totalAmount * getproduct.data.couponID.value / 100);
                let final = { getproduct, finalAmount: getDiscount, discounted: getproduct.data.totalAmount - getDiscount }
                return sendSuccessResponse(
                    req,
                    res,
                    200,
                    "Discount Percentage Data",  final )
            }
            else if (getproduct.data.couponID.type === "amount") {
                let getamount = await getproduct.data.totalAmount - getproduct.data.couponID.value;
                let final = { getproduct, finalAmount: getamount, discounted: getproduct.data.totalAmount - getamount }
                return sendSuccessResponse(
                    req,
                    res,
                    200,
                    "get order by id succesfully", final )
            }
        } else {
            return sendErrorResponse(
                req,
                res,
                200,
                "Date is expired", []
            );
        }
    }

}

//sorting
const getsorting = async (req, res) => {
    const result = await getSortOrderServices()
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
            result.message, result.data 
        );
    }
}

//get
const getdate = async (req, res) => {
    let search = req.query.search
    if (!search) { return res.status(422).send({ status: 422, message: "Enter the search Data", data: [] }) }
    if (search) {
        const result = await getDateOrderServices(search)
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
                result.message, result.data
            );
        }
    }
}

// Api to list customers based on the number of products purchased.

const listorder = async (req, res) => {
    const names = req.query.search
    if (!names) { return res.status(422).send({ status: 422, message: "Enter the search Data", data: [] }) }
    if (names) {
        const result = await getNoProOrderServices()
        const mydata = result.data.filter((cus) => { return cus.customer.name.includes(names) })
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
                mydata
            );
        }
    }
}

//update
const updateOrder = async (req, res) => {
    const { ...params } = req.body;
    const { id } = req.params;
    const result = await updateOrderService(params, id);
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

//delete Order by id

const deleteOrder = async (req, res) => {
    if (!req.params.id) { return res.status(400).json({ error: "no id found" }) }
    let result = await deleteOrderService(req.params.id)
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

const myOrder = async (req, res) => {
    let token = req.user.id
    if (token) {
        const result = await getOrdersIDServices(token)
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
                result.message, result.data 
            );
        }
    }
}

//count of orders

const orderCount = async (req, res) => {
    const result = await orderCancelCountServices()
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

//cancel Order count

const cancelCount = async (req, res) => {
    const id = req.params.id
    const result = await cancelOrderServices(id)
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
//total order placed count

const totalOrderCount = async (req, res) => {
    const result = await totalOrderServices()
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



module.exports = { createOrder, getorder, getsorting, getdate, listorder, getID, updateOrder, deleteOrder, myOrder, orderCount, cancelCount, totalOrderCount }







