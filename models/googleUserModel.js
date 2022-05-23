const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('joi');

const googleUserSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    email:{
        type:String,
        unique:true,
        required:true,
        minlength:5,
        maxlength:255
    },
    googleId:{
        type:String,
        required:true,
        unique:true,
        minlength:2
    }
}, { timestamps: true })

googleUserSchema.methods.generateJWT = function(){
    const token = jwt.sign({
        _id:this._id,
        name:this.name,
        email:this.email
    },process.env.JWT_SECRET_KEY,{expiresIn:'1h'});
    return token;
}

const validateGoogleUser = user => {
    const schema = joi.object({
        name: joi.string().required().min(1).max(255),
        email: joi.string().min(5).max(255).required().email(),
        googleId: joi.string().min(2).required()
    })
    return schema.validate(user)
}

module.exports.GoogleUser = model('GoogleUser',googleUserSchema);
module.exports.validate = validateGoogleUser;