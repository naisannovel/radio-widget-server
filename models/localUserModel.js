const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('joi');


const localUserSchema = new Schema({
    name: {
        type: String,
        required: [true, "please insert your name"],
        minlength: 2,
        maxlength: 1024
    },
    email: {
        type: String,
        required: [true, "please insert your email"],
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: [true, "password at least 5 characters"],
        minlength: 5,
        maxlength: 1024
    }
}, {
    timestamps: true
})

localUserSchema.methods.generateJWT = function () {
    const token = jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name
    }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1h'
    })
    return token;
}

const validateLocalUser = user => {
    const schema = joi.object({
        name: joi.string().required().min(1).max(255),
        email: joi.string().min(5).max(255).required().email(),
        password: joi.string().min(5).max(255).required()
    })
    return schema.validate(user)
}

module.exports.LocalUser = model('LocalUser', localUserSchema);
module.exports.validate = validateLocalUser;