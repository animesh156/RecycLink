const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')
const User = require('../models/userModel')
 
// Get seller monthly earnings
router.get("/monthly-earning", async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("earningsByMonth")

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.earningsByMonth)
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// get seller total income
router.get('/total-earnings', async (req,res) => {
  try {
    const userId = req.user.id;

    // find user by ID and return their total earnings

    const user = await User.findById(userId).select("totalEarnings")

    if(!user) {
      return res.status(404).json({message: "User not found"})
    }

    res.status(200).json(user.totalEarnings);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
})

module.exports = router;
