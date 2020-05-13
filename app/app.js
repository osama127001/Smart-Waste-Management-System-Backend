const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const adminRoutes = require('./routes/admin');
const dustbinRoutes = require('./routes/dustbin');
const customerRoutes = require('./routes/customer');
const driverRoutes = require('./routes/driver');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const dbUrl = "mongodb+srv://Osama:WM0ZrIxDU5DliHBn@clusterswms-jovcm.mongodb.net/swms-database?retryWrites=true&w=majority";
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

app.use('/api/admin', adminRoutes);
app.use('/api/dustbin', dustbinRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/driver', driverRoutes);

app.get('/api/test', (req, res) => {
    res.json({msg: "hello"});
});



module.exports = app;


