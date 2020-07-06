const express = require('express');

const Dustbin = require("../models/dustbin");

const router = express.Router();

// Get all dustbins by its region
router.get('/:region', (req, res) => {
    Dustbin.find({ region: req.params.region })
        .then((data) => {
            res.status(200).json({
                message: "All Dustbins Data is fetched Successfully",
                dustbins: data
            });
        })
        .catch(() => {
            res.status(401).json({
                message: "Dustbins Data cannot be fetched!"
            });
        });
});

// Add Dustbin by Regional Admin
router.post('/add/:region', (req, res) => {
    Dustbin.findOne({ id: req.body.dustbinId })
        .then((dustbin) => {
            if (dustbin) {
                return res.json({
                    message: "Dustbin Already Exist"
                });
            }
        })
    const dBin = new Dustbin({
        id: req.body.dustbinId,
        location: req.body.location,
        stopover: true,
        region: req.params.region,
        status: -1,
        address: req.body.dustbinAddress,
        owner: "none"
    });
    dBin.save()
        .then((dBin) => {
            res.status(200).json({
                message: "Dustbin Added!",
                dustbin: dBin
            });
            console.log('dustbin Added!');
        })
        .catch(err => {
            res.json({
                message: "Cannot add dustbin due to the following error: " + err
            });
        })
});




module.exports = router;

