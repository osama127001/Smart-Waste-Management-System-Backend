const mongoose = require('mongoose');

const driverSchema = mongoose.Schema({
    name: { type: String, required: true },
    cellNo: { type: String, required: true },
    cnic: { type: String, required: true },
    region: { type: String, required: true },
    regionCode: { type: String, required: true },
    capacity: { type: Number, required: true },
    emailId: { type: String, required: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('Driver', driverSchema);