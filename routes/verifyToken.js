const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.body('token');
    if (!token) {
        return res.status(401).json('Access Denied');
    }

    try {
        console.log(token);
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
       
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json('Invalid Token');
    }
}