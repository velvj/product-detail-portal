const { createProductService, uploadProductService, listProductService, findUserbyIdService, productExistsService, updateProductService, deleteProductService } = require('../services/productService')
const { sendErrorResponse, sendSuccessResponse } = require('../response/response');
const csv = require('csvtojson');
const upload = require('../middleware/uploads')


//create products

const productCreate = async (req, res) => {
    const params = req.body;
    let productName = req.body.productName
    let model = req.body.model
    const clientExist = await productExistsService(productName, model)
    if (clientExist.data) {
        return res.status(400).json({ status: 400, message: "User already exists" });
    } else {
        const result = await createProductService({ ...params });
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
}

// file uploads  for products

const addfile = async (req, res) => {
    try {
        upload.single('uploads')
            (req, res, async function (error) {
                if (error) {
                    return res.json({ error: "Error uploading file" })
                }
                let csvpath = req.file.path
                console.log(csvpath, "Aa");
                csv()
                    .fromFile(csvpath)
                    .then(async (csvfile) => {
                        csvfile.forEach(async (obj) => {
                            const result = await uploadProductService(obj)
                        })
                        res.status(200).json({ status: 200, success: `data inserted succesfully ` })
                    })
            })
    } catch (err) {
        return res.status(400).send({ status: 400, message: err.message || err })
    }
}

const getproudctlist = async (req, res) => {
    let result = await listProductService()
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

const getbyid = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ error: "no id found" })
    }
    let result = await findUserbyIdService(req.params.id)
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

//update
const updateProduct = async (req, res) => {
    const { ...params } = req.body;
    const { id } = req.params;
    const result = await updateProductService(params, id);
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


//delete product

const deleteproduct = async (req, res) => {
    try {
        let id = req.params.id
        if (!id) { return res.status(400).json({ error: "no id found" }) }
        let delproduct = await deleteProductService(id)
        return res.status(200).send({ status: 200, message: "product deleted successfully", data: delproduct })
    } catch (err) {
        res.status(400).send({ status: 400, message: err.message || err })
    }
}


module.exports = { productCreate, getproudctlist, getbyid, deleteproduct, addfile, updateProduct }

