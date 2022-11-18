const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const schema = mongoose.Schema

const userSchema = new schema({
    name:
    {
        type: String
    },
    email:
    {
        type: String,
        unique: true
    },
    phone:
    {
        type: String,
        unique: true
    },
    password:
    {
        type: String
    },
    admin: {
        type: Boolean,
        default: false
    }
}, { timestamp: true })

userSchema.methods.generateToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.ACCESS_TOKEN)
    return token;
}
userSchema.pre('save', async function () {
    return new Promise(async (resolve, reject) => {
        const mobileNumberExists = await userdatas.findOne({ phone: this.get('phone') })
            .then(doc => { return doc ? true : false })
            .catch(err => reject(err));
        const emailExists = await userdatas.findOne({ email: this.get('email') })
            .then(doc => { return doc ? true : false })
            .catch(err => reject(err));
        if (mobileNumberExists || emailExists) {
            const err = mobileNumberExists ? (emailExists ? "phone && Email" : "phone") : (emailExists ? "Email" : "");
            reject(new Error(err + ' already exist'))
        } else {
            resolve();
        }
    })
});


const userdatas = mongoose.model('userdatas', userSchema)

module.exports = userdatas;