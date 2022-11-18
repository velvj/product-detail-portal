const { Router } = require("express");

const validate = require("../../middleware/joiMiddleware");
const { isAdmin } = require("../../middleware/userTypeMiddleware");
const { userValidation, loginValidation } = require("../../validator/userValidator");
const { errHandle } = require("../../utils/errHandle.js");
const { authMiddleware } = require("../../middleware/authMiddleware.js");
const { registration, logedin, getUserlist, getUserById, updateUser, deleteUser } = require("../../controllers/userControl");

const router = Router();

router.post("/add_user", validate(userValidation), errHandle(registration));
router.post("/login", validate(loginValidation), errHandle(logedin));
router.get("/user_list", [authMiddleware], isAdmin, getUserlist);
router.get("/:id", [authMiddleware], isAdmin, errHandle(getUserById));
router.put("/update/:id", [authMiddleware], isAdmin, errHandle(updateUser));
router.delete("/delete/:id", [authMiddleware], isAdmin, errHandle(deleteUser));

module.exports = router;