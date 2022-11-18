const { Router } = require("express");

const { orderValidation } = require("../../validator/orderValidator");
const { errHandle } = require("../../utils/errHandle.js");
const { authMiddleware } = require("../../middleware/authMiddleware.js");
const validate = require("../../middleware/joiMiddleware");
const { isAdmin } = require("../../middleware/userTypeMiddleware");
const { createOrder, getorder, getID, getsorting, getdate, listorder, totalOrderCount, updateOrder, deleteOrder, myOrder, orderCount, cancelCount } = require("../../controllers/orderControl");

const router = Router();

router.post("/add_order", [authMiddleware], validate(orderValidation), errHandle(createOrder));
router.get("/list_order", [authMiddleware], isAdmin, errHandle(getorder));
router.get("/listId_order/:id", [authMiddleware], isAdmin, errHandle(getID));
router.get("/sort_order", [authMiddleware], isAdmin, errHandle(getsorting));
router.get("/date_order", [authMiddleware], isAdmin, errHandle(getdate));
router.get("/list_name_order", [authMiddleware], isAdmin, errHandle(listorder));
router.put("/update_order/:id", [authMiddleware], isAdmin, errHandle(updateOrder));
router.delete("/delete_order/:id", [authMiddleware], isAdmin, errHandle(deleteOrder));
router.get("/my_order", [authMiddleware], isAdmin, errHandle(myOrder));
router.get("/cancel_order_count", [authMiddleware], isAdmin, errHandle(orderCount));
router.put("/cancel_order/:id", [authMiddleware], isAdmin, errHandle(cancelCount));
router.get("/total_order", [authMiddleware], isAdmin, errHandle(totalOrderCount));

module.exports = router;