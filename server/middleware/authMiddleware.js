const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const protect = async (req,resizeBy,next) => {
    let token;

    if(req.cookies.jwt){
        try {
            token = req.cookies.jwt
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password")
            next()
        } catch (error) {
            res.status(401).json({error: "Not authorized, toen failed"})
        }
    }
    else {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
}

module.exports = {protect}