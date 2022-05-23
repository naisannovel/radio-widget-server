const { Schema, model } = require('mongoose');
const joi = require('joi');


const radioStationSchema = new Schema({
    name: {
        type: String,
        required: [true, "please insert station name"],
        minlength: 2,
        maxlength: 1024
    },
    frequency: {
        type: Number,
        required: [true, "please insert station frequency"],
        minlength: 1,
        maxlength: 1024
    }
}, {
    timestamps: true
})

const validateStation = station =>{
    const schema = joi.object({
        name: joi.string().min(2).max(1024).required(),
        frequency: joi.number().required()
    })
    return schema.validate(station)
}

module.exports.Station = model('Station', radioStationSchema);
module.exports.validate = validateStation;