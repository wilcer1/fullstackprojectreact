const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json('Access Denied');
    }

    try {
        console.log(token);
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
    
        const tokenDecodablePart = token.split('.')[1];
        const decoded = Buffer.from(tokenDecodablePart, 'base64').toString();
        console.log(decoded);
       
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json('Invalid Token');
    }
}