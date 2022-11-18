const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, {
        errors: { wrap: { label: false } },
    });
    if (error) {
        res.status(422).json({status:422,message:error.details[0].message});
    } else {
        next();
    }
};

module.exports = validate;
