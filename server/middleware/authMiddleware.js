const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
    try {
        // Ensure cookies exist and contain a JWT
        if (!req.cookies || !req.cookies.jwt) {
            return res.status(401).json({ error: "Not authorized, no token" });
        }

        const token = req.cookies.jwt;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {
            return res.status(401).json({ error: "Not authorized, user not found" });
        }

        next();
    } catch (error) {
        console.error("Auth error:", error);
        return res.status(401).json({ error: "Not authorized, token failed" });
    }
};

const isSeller = async (req,res,next) => {
    const user = await User.findById(req.user.id);
  if (user.role !== "seller") {
    return res.status(403).json({ message: "Access Denied! Only sellers can perform this action." });
  }
  next();
}

module.exports = { protect, isSeller };
