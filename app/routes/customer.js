const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Admin = require("../models/admin");
const Customer = require("../models/customer");
const admin = require('../models/admin');

const router = express.Router();


// Customer Login
router.post('/customerlogin', (req, res) => {
    Customer.findOne( {emailId: req.body.email} )
        .then((user) => {
            if (user) {
                fetchedUser = user;
                return bcrypt.compare(req.body.password, user.password);
            } else {
                return res.status(401).json({
                    message: "Customer Not Found, Please enter valid credentials!"
                });
            }
        })
        .then(isUser => {
            if (isUser) {
                const token = jwt.sign({ email: fetchedUser.email, id: fetchedUser._id }, 'Secret_Token', { expiresIn: '1h' });
                return res.status(200).json({
                    message: "Token Generated",
                    user: "customer",
                    token: token,
                    expiresIn: 3600
                });
            } else {
                return res.status(402).json({
                    message: "Please Enter valid Password!"
                });
            }
        })
        .catch(error => {
            res.status(404).json({
                message: "Cannot login Due to the following error: " + error
            });
        });
});

// Customer SignUp
router.post('/signup', (req, res, next) => {
    Customer.find({ emailId: req.body.email })
        .then((customerFound) => {
            if(customerFound) {
                return res.status(400).json({
                    message: "User Already Available!"
                });
            }
        })
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {   
            const customer = new Customer({
                name: req.body.name,
                emailId: req.body.email,
                password: hash,
                address: null,
                location: null,
                region: null
            });
            customer.save()
                .then((result) => {
                    res.status(201).json({
                        message: "customer created!",
                        result: result
                    })
                })
                .catch((err) => {
                    console.log("could not create customer: " + err);
                });
        });
});


//Test
router.get('/get', (req, res, next) => {
    Customer.find()
        .then(result => {
            res.json({
                result: result
            });
        });
});

// returning all the regions name and coords
router.get('/get-region-names-and-locations', (req, res) => {
    let regionDetails = [];
    Admin.find()
        .then((admins) => {
            admins.forEach(admin => {
                if (!admin.isSuperAdmin) {
                    regionDetails.push({regionName: admin.region, regionCode: admin.regionCode, regionLocation: admin.location});
                }
            });
            return res.status(200).json({
                regionDetails: regionDetails
            });
        })
        .catch((err) => {
            res.status(404).json({
                message: "Cannot send details due to the following error: " + err
            });
        });
});


module.exports = router;