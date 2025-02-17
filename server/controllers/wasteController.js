const Waste = require('../models/wasteModel')

 
const WasteItem = async (req, res) => {
    const { title, description, category, location, price, imageUrl } = req.body;

    // Ensure the imageUrl is provided
    if (!imageUrl) {
        return res.status(400).json({ message: "Image URL is required" });
    }

    // Validate the other fields
    if (!title || !description || !category || !location || !price) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Create new waste entry in the database
        const waste = await Waste.create({
            title,
            description,
            category,
            location,
            price,
            imageUrl, // Save the Cloudinary URL
            seller: req.user.id, // Ensure the seller is logged in and the seller ID is included
        });

        res.status(201).json(waste);
    } catch (error) {
        console.error("Error creating waste item:", error);
        res.status(500).json({ message: "Server error" });
    }
};



// Fetch ALl Waste Listings
const WasteListings = async (req,res) => {
    const wastes = await Waste.find().populate("seller", "name email");
    res.json(wastes)
}


module.exports = {
    WasteItem, WasteListings
}