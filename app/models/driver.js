const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");


const driverSchema = mongoose.Schema({
    name: { type: String, required: true },
    cellNo: { type: String, required: true },
    cnic: { type: String, required: true },
    region: { type: String, required: true },
    regionCode: { type: String, required: true },
    capacity: { type: Number, required: true },
    emailId: { type: String, required: true , unique: true},
    password: { type: String, required: true },
    isRouteAssigned: { type: Boolean, required: true }
});

driverSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Driver', driverSchema);