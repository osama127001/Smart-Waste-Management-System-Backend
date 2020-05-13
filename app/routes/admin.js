const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const app = express();

const Admin = require("../models/admin");

const router = express.Router();

//get all admins
router.get('/get', (req, res, next) => {
    Admin.find()
        .then((result) => {
            res.json({
                data: result
            })
        });
});


// Get all regiional-admins
router.get('/getAdmins', (req, res) => {
    Admin.find({ isSuperAdmin: false })
        .then((data) => {
            res.status(200).json({
                message: "All admins are fetched Successfully",
                dataOfAdmins: data
            });
        })
        .catch(() => {
            res.status(401).json({
                message: "All admins Data connot be fetched!"
            });
        });
});

//Admin Login
router.post('/adminlogin', (req, res) => {
    let fetchedUser;
    Admin.findOne( { emailId: req.body.email } )
        .then((user) => {
            if (user) {
                fetchedUser = user;
                return bcrypt.compare(req.body.password, user.password);
            } else {
                return res.status(400).json({
                    message: "Admin not found, please enter valid credentials."
                });
            }
        })
        .then(isUser => {
            if (isUser) {
                const token = jwt.sign({ email: fetchedUser.email, id: fetchedUser._id }, 'Secret_Token', { expiresIn: '1h' });
                if (fetchedUser.isSuperAdmin) {                    
                    res.status(200).json({
                        message: "Token Generated",
                        user: "superadmin",
                        token: token,
                        expiresIn: 3600
                    });
                } else {
                    res.status(200).json({
                        message: "Token Generated",
                        user: "regionaladmin",
                        token: token,
                        expiresIn: 3600,
                        regionData: fetchedUser
                    });
                }
            } else {
                return res.status(401).json({
                    message: "Please Enter Correct Password!"
                });
            }
        })
        .catch(error => {
            res.status(403).json({
                message: "Authentication Failed due to the following Error: " + error
            });
        })
});


// Delete all admins
router.delete('/deletealladmins', (req, res, next) => {
    Admin.deleteMany()
        .then((result) => {
            res.status(200).json({
                message: "Admin Deleted!"
            });
        })
});


//add admins with hashed password
router.post('/addadmin', (req, res) => {
    bcrypt.hash(req.body.regionAdminPassword, 10)
        .then((hashedPassword) => {
            const admin = new Admin ({
                name: req.body.regionAdminName,
                cnic: req.body.regionAdminCnic,
                cellNo: req.body.regionAdminPhone,
                region: req.body.regionName,
                regionCode: req.body.regionCode,
                emailId: req.body.regionAdminEmail,
                password: hashedPassword,
                isSuperAdmin: false,
                location: { lat: req.body.regionLatitude, lng: req.body.regionLongitude }           
            });
            admin.save()
                .then((result) => {
                    res.status(200).json({
                        message: "Admin is Added",
                        adminDetails: result
                    });
                });
        })
        .catch((err) => {
            res.status(400).json({
                message: "Cannot Add Admin Due to Following Error: " + err
            });
        })
});


// getting the region Admin Details
router.get('/getAdminDetails/:regionCode', (req, res) => {
    Admin.findOne({ regionCode: req.params.regionCode })
        .then((admin) => {
            if(admin) {
                res.status(200).json({
                    message: "Regional Admin Data Fetched",
                    adminDetails: admin
                });
            }
        })
        .catch(() => {
            res.status(500).json({
                message: "Cannot Find Admin in Database"
            });
        });
});


module.exports = router;
