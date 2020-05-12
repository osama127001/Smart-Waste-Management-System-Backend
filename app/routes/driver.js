const express = require('express');
const bcrypt = require('bcrypt');

const Driver = require("../models/driver");

const router = express.Router();

// adding driver 
router.post('/addDriver', (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hashedPassword => {
            const driver = new Driver({
                name: req.body.name,
                cellNo: req.body.cellNo,
                cnic: req.body.cnic,
                region: req.body.region,
                regionCode: req.body.regionCode,
                capacity: req.body.capacity,
                emailId: req.body.emailId,
                password: hashedPassword
            });
            driver.save()
                .then(result => {
                    res.status(200).json({
                        message: "Driver Added!",
                        driverDetails: driver
                    });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(401).json({
                message: "Cannot add Driver due to the error: " + err
            });
        });
    
});

router.get('/get-driver-by-region/:regionCode', (req, res) => {
    Driver.find({ regionCode: req.params.regionCode })
        .then((drivers) => {
            res.status(200).json({
                message: "Drivers Fetched!",
                driversData: drivers
            });
        })
        .catch(err => {
            res.status(401).json({
                message: "Drivers cannot be fetched due to an error: " + err
            });
        });
});


module.exports = router;