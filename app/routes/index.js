const { Router } = require("express");
const router = Router();

// const v1 = require("./v1/user.routes.js");
const v1 = require('./v1/index')

// router.use('/api/v1', v1);
router.use('/api', v1);

module.exports = router;