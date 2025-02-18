// routes/buyersList.js

const express = require("express");
const router = express.Router();
const Waste = require("../models/wasteModel"); // Import Waste model
const User = require('../models/userModel')
const {isBuyer} = require('../middleware/authMiddleware')

// Get buyers list
router.get("/list", async (req, res) => {
  try {
    const sellerId = req.user.id; // Get seller ID from JWT

    // Find all waste listings by the seller and populate buyers' names and waste images
    const wastes = await Waste.find({ seller: sellerId, buyers: { $ne: [] }  })
      .select("title price buyers imageUrl") // Include product image
      .populate({
        path: "buyers.buyerId",  // Populating buyer details from User model
        select: "name",  // Only fetch the name field
      })
      .lean();

    res.status(200).json(wastes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

 
// Get buyers purchased item lists
router.get('/history', isBuyer, async (req,res) => {
  try {
    const history = await User.findById(req.user.id).select("purchasedItems")
    res.status(200).json(history)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
})



// Add a buyer to the buyers list
router.post("/add/:wasteId", async (req, res) => {
  try {
    const buyerId = req.user.id; // Assuming buyer's ID is in req.user from JWT
    const { wasteId } = req.params;
    const { bidAmount } = req.body; // Amount the buyer is offering

    if (!bidAmount || bidAmount <= 0) {
      return res.status(400).json({ message: "Invalid bid amount" });
    }

    // Find the waste item by ID
    const waste = await Waste.findById(wasteId);
    if (!waste) {
      return res.status(404).json({ message: "Waste item not found" });
    }

    // Add the buyer to the waste item's buyers list
    waste.buyers.push({
      buyerId: buyerId,
      amount: bidAmount,
      timestamp: new Date(),
    });

    // Save the updated waste item with the new buyer offer
    await waste.save();

    res.status(200).json({ message: "Offer placed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// accept or rejct any bid
// routes/buyersList.js

// Accept or reject a buyer's offer
router.put("/accept-or-reject/:wasteId", async (req, res) => {
  try {
    const sellerId = req.user.id; // Assuming you are using JWT authentication and the seller's ID is in req.user
    const { wasteId } = req.params;
    const { buyerId, action,price } = req.body; // action: 'accept' or 'reject'

    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;   //get current month (1-12)
    const year = currentDate.getFullYear();    // get current year
 
    // Find the waste item by seller ID and the waste ID
    const waste = await Waste.findOne({ _id: wasteId, seller: sellerId });

    if (!waste) {
      return res.status(404).json({ message: "Waste item not found or you are not the seller" });
    }

    // Find the buyer in the buyers array
    const buyerIndex = waste.buyers.findIndex((buyer) => buyer.buyerId.toString() === buyerId);

    if (buyerIndex === -1) {
      return res.status(404).json({ message: "Buyer not found in the list" });
    }

    // If action is 'accept', remove the item from the database and mark it as sold
    if (action === "accept") {
     
      const buyer = await User.findById(buyerId)
  // Add item details to the buyer's purchasedItems array
      buyer.purchasedItems.push({
        itemId: waste._id,
        itemName: waste.title,
        price: waste.price, 
        imageUrl: waste.imageUrl,
        datePurchased: new Date(),
      })

      await buyer.save();  // Save the updated buyer record

      const seller = await User.findById(sellerId);
      if (seller) {
        seller.totalEarnings += price; // Add accepted bid amount to earnings

        // save seller monthly earning
        const earningsEntry = seller.earningsByMonth.find(
          (entry) => entry.month === month && entry.year === year
        );
    
        if (earningsEntry) {
          earningsEntry.amount += price; // Update existing month earnings
        } else {
          seller.earningsByMonth.push({ month, year, amount: price }); // Create new entry
        }
        await seller.save();
      }

      await Waste.deleteOne({ _id: wasteId });

      return res.status(200).json({ message: "Waste item sold, removed from listings." });
    }

    // If action is 'reject', remove the buyer from the buyers list
    if (action === "reject") {
      waste.buyers.splice(buyerIndex, 1); // Remove the rejected buyer

      await waste.save(); // Save the updated waste item

      return res.status(200).json({ message: "Buyer offer rejected." });
    }

    res.status(400).json({ message: "Invalid action" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});



module.exports = router;
