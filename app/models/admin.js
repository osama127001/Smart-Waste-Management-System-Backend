const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const adminSchema = mongoose.Schema({
    name: { type: String, required: true },
    cnic: { type: String, required: true, unique: true },
    cellNo: { type: String, required: true },
    region: { type: String, required: true },
    regionCode: { type: String, required: true, unique: true },
    emailId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isSuperAdmin: { type: Boolean, required: true },
    location: { type: { lat: Number, lng: Number }, required: true },
});

adminSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Admin', adminSchema);