const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const adminRoutes = require('./routes/admin');
const dustbinRoutes = require('./routes/dustbin');
const customerRoutes = require('./routes/customer');
const driverRoutes = require('./routes/driver');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const dbUrl = process.env.DB_LINK;
mongoose.connect(dbUrl, { keepAlive: 1, useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log('connected to db!');
    })
    .catch(() => {
        console.log('not connected to db!');
    });


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods", 
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});



// test for communication from hardware
app.post('/test/test', (req, res) => {
    console.log(req.body);
    res.json({
        message: "yes"
    });
});

// returning API key for Google maps API 
app.get('/get/api_key', (req, res) => {
    res.status(200).json({
        api_Key: process.env.API_KEY
    });
});

// Routes for actors
app.use('/api/admin', adminRoutes);
app.use('/api/dustbin', dustbinRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/driver', driverRoutes);



module.exports = app;


