const express = require("express");
const router = express.Router();

const user = require('./user.routes');
const product = require('./product.routes');
const order = require('./order.routes');
const coupon = require('./coupon.routes');

router.use('/user', user);
router.use('/product', product);
router.use('/order', order);
router.use('/coupon', coupon);

module.exports = router;