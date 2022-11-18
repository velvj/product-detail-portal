const { Router } = require("express");

const { productValidation } = require("../../validator/productValidator");
const { errHandle } = require("../../utils/errHandle.js");
const validate = require("../../middleware/joiMiddleware");
const { isAdmin } = require("../../middleware/userTypeMiddleware");
const { authMiddleware } = require("../../middleware/authMiddleware.js");
// const upload = require('../../middleware/uploads')
const { productCreate, addfile, getproudctlist, getbyid, updateProduct, deleteproduct } = require("../../controllers/productControl");

const router = Router();

router.post("/add_product", [authMiddleware], isAdmin, validate(productValidation), errHandle(productCreate));
router.post("/upload_pro", [authMiddleware], isAdmin, addfile);
router.get("/list_pro", [authMiddleware], isAdmin, errHandle(getproudctlist));
router.get("/list_pro/:id", [authMiddleware], isAdmin, errHandle(getbyid));
router.put("/update_pro/:id", [authMiddleware], isAdmin, errHandle(updateProduct));
router.delete("/delete_pro/:id", [authMiddleware], isAdmin, errHandle(deleteproduct));


module.exports = router;