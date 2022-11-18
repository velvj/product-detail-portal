const { Router } = require("express");

const { couponsValidation } = require("../../validator/couponValidator");
const { errHandle } = require("../../utils/errHandle.js");
const { authMiddleware } = require("../../middleware/authMiddleware.js");
const validate = require("../../middleware/joiMiddleware");
const { isAdmin } = require("../../middleware/userTypeMiddleware");
const { createCoupon, getcoupon, getbyID, updateCoupon, deleteCoupon } = require("../../controllers/couponControl");

const router = Router();

router.post('/add_coupon', [authMiddleware], isAdmin, validate(couponsValidation), errHandle(createCoupon))
router.get('/get_coupon', [authMiddleware], isAdmin, errHandle(getcoupon))
router.get('/getbyid_coupon/:id', [authMiddleware], isAdmin, errHandle(getbyID))
router.put('/update_coupon/:id', [authMiddleware], isAdmin, errHandle(updateCoupon))
router.delete('/delete_coupon/:id', [authMiddleware], isAdmin, errHandle(deleteCoupon))

module.exports = router;