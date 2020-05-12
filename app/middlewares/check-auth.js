const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 'Secret_Token');
        next();
    } catch {
        res.status(200).json({
            message: "Cannot Authorize, token not verified!"
        });
    }
};