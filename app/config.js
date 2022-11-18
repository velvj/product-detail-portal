
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(process.cwd(), `${process.argv[2]}`) });


module.exports = {
    tokenHeaderKey: process.env.TOKEN_HEADER_KEY,
    jwtSecretKey: process.env.JWT_SECRET_KEY
};