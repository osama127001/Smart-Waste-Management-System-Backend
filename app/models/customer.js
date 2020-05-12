const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const customerSchema = mongoose.Schema ({
    name: { type: String, required: true },
    emailId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: false },
    location: { type: { lat: Number, lng: Number }, required: false },
    region: { type: String, required: false },
    cnic: { type: String, required: true },
    cellNo: { type: String, required: true }
});

customerSchema.plugin(uniqueValidator);


module.exports = mongoose.model("User", customerSchema);